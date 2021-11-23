<template>
  <div class="domain-manage">
    <div class="bread-crumb">
      <span class="bread-crumb-item" @click="resetForm">ConfigMap/</span
      ><span>创建ConfigMap</span>
    </div>
    <div class="domain-page-title">创建ConfigMap</div>
    <div class="module-name">基本信息</div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="deployForm1"
      ref="deployForm1"
      :rules="rules1"
      validate-on-rule-change
    >
      <el-form-item label="配置项名称" prop="name">
        <el-input
          v-model="deployForm1.name"
          placeholder="请输入配置项名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="DeployLabels"
        prop="deployLabelsCopy"
        class="cus-tags"
      >
        <div slot="label" class="slot-label-tags">
          <span class="tags-title">标签</span>
          <span class="tags-btn" @click="addTags('d')">添加变量</span>
        </div>
        <div
          v-for="(item, index) in deployForm1.deployLabelsCopy"
          :key="index"
          class="tags-item"
        >
          <el-input
            v-model="deployForm1.deployLabelsCopy[index]"
            placeholder="请输入键-值对，例：app:devops-frontend"
          ></el-input>
          <span
            class="iconfont icon-close-line"
            v-if="deployForm1.deployLabelsCopy.length > 1"
            @click="delTags(index, 'd')"
          ></span>
        </div>

        <div class="tip-info">
          只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对
        </div>
      </el-form-item>

      <el-form-item class="cus-form-item" prop="namespace" label="集群信息">
        <div class="sel-prefix">集群信息</div>
        <el-select
          v-model="deployForm1.cluster_name"
          placeholder="请选择集群"
          @change="clusterChange"
          class="cus-sel1"
        >
          <el-option
            v-for="item in clusterList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="deployForm1.namespace"
          placeholder="请选择Namespace"
          class="cus-sel2"
          @change="namespaceChange"
        >
          <el-option
            v-for="item in namespacesList"
            :key="item['metadata'].name"
            :label="item['metadata'].name"
            :value="item['metadata'].name"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="module-name config">
      配置数据
      <div>
        <el-button type="primary" @click="addParams" class="add" size="small"
          >手动添加</el-button
        >
        <el-button @click="fileUpload" class="add" size="small"
          >文件配置</el-button
        >
      </div>
    </div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="deployForm2"
      ref="deployForm2"
      :rules="rules"
      class="block"
      :gutter="24"
    >
      <el-row :gutter="24">
        <el-col :span="12" class="title">变量名称</el-col>
        <el-col :span="12" class="title">变量值</el-col>
        <div
          v-for="(item, index) in deployForm2.paramsList"
          :key="index"
          class="item-group"
        >
          <div class="buttons">
            <el-button @click="deleteItem(index)" v-show="index !== 0"
              >删除</el-button
            >
          </div>
          <el-form-item
            label="TEMPLATE"
            :prop="`paramsList[${index}].key`"
            :rules="{
              required: true,
              message: '输入项不能为空',
              trigger: 'change',
            }"
          >
            <el-input v-model="item.key" placeholder="请输入key值"></el-input>
          </el-form-item>
          <el-form-item
            label=""
            :rules="{
              required: true,
              message: '输入项不能为空',
              trigger: 'change',
            }"
            :prop="`groupList[${index}].value`"
          >
            <el-input
              v-model="item.value"
              placeholder="请输入value值"
            ></el-input>
          </el-form-item>
        </div>
      </el-row>
    </el-form>
    <el-button @click="resetForm">取消</el-button>
    <el-button @click="submitForm" type="primary">确定</el-button>
    <pvc-modal :pvcObj="pvcObj" @on-close="onClose"></pvc-modal>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import { createConfig } from "@/api/config-map";
import pvcModal from "./pvc-modal.vue";
export default {
  name: "",
  components: { pvcModal },
  props: {},
  data() {
    var tagsRule = (rule, value, callback) => {
      if (value[0] === "") {
        callback(new Error("请输入标签"));
      } else {
        callback();
      }
    };
    return {
      searchClusters,
      listNamespace,
      createConfig,
      clusterList: [],
      namespacesList: [], // 命名空间列表
      servicesList: [], // 命名空间列表
      servicePortList: [], // 命名空间列表
      pvcList: [],
      pvcSwitch: true,
      memorylimitSwitch: false,
      cpulimitSwitch: false,
      pvcObj: {
        dialogVisible: false,
        storageClassListL: [],
      },
      deployForm1: {
        name: "",
        deployLabelsCopy: [""],
        matchLabelsCopy: [""],
        templateLabelsCopy: [""],
        cluster_name: "",
        namespace: "",
      },
      rules1: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        deployLabelsCopy: [
          {
            required: true,
            trigger: "blur",
            validator: tagsRule,
          },
          {
            message:
              "只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对",
            pattern: /^[a-z][a-z0-9-]*:[a-z0-9-]*[a-z0-9]$/,
            trigger: "blur",
          },
        ],
        matchLabelsCopy: [
          {
            required: true,
            trigger: "blur",
            validator: tagsRule,
          },
          {
            message:
              "只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对",
            pattern: /^[a-z][a-z0-9-]*:[a-z0-9-]*[a-z0-9]$/,
            trigger: "blur",
          },
        ],
        templateLabelsCopy: [
          {
            required: true,
            trigger: "blur",
            validator: tagsRule,
          },
          {
            message:
              "只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对",
            pattern: /^[a-z][a-z0-9-]*:[a-z0-9-]*[a-z0-9]$/,
            trigger: "blur",
          },
        ],
        namespace: [
          {
            required: true,
            message: "请选择命名空间",
            trigger: "change",
          },
        ],
      },
      deployForm2: {
        paramsList: [],
      },
      rules: {},
    };
  },
  created() {
    this.currType = this.$route.params.currType;
    this.deployForm1.cluster_name = this.$route.params.cluster;
    this.getClusters();
  },
  mounted() {
    this.getStorageClassList();
  },
  activited() {},
  update() {},
  methods: {
    // 添加配置参数
    addParams() {},
    // 文件上传
    fileUpload() {},
    addTags(flag) {
      switch (flag) {
        case "d":
          this.deployForm1.deployLabelsCopy.push("");
          break;
        case "m":
          this.deployForm1.matchLabelsCopy.push("");
          break;
        case "t":
          this.deployForm1.templateLabelsCopy.push("");
          break;
        default:
          break;
      }
    },
    delTags(i, flag) {
      switch (flag) {
        case "d":
          this.deployForm1.deployLabelsCopy.splice(i, 1);
          break;
        case "m":
          this.deployForm1.matchLabelsCopy.splice(i, 1);
          break;
        case "t":
          this.deployForm1.templateLabelsCopy.splice(i, 1);
          break;
        default:
          break;
      }
    },
    submitForm() {
      this.$refs.deployForm1.validate((valid1) => {
        if (valid1) {
          let data1 = JSON.parse(JSON.stringify(this.deployForm1));

          data1.Labels = {};
          data1.deployLabelsCopy.forEach((item) => {
            data1.Labels[item.split(":")[0]] = item.split(":")[1];
          });

          data1.matchLabels = {};
          data1.matchLabelsCopy.forEach((item) => {
            data1.matchLabels[item.split(":")[0]] = item.split(":")[1];
          });

          data1.templateLabels = {};
          data1.templateLabelsCopy.forEach((item) => {
            data1.templateLabels[item.split(":")[0]] = item.split(":")[1];
          });
          delete data1.deployLabelsCopy;
          delete data1.matchLabels;
          delete data1.matchLabelsCopy;
          delete data1.templateLabels;
          delete data1.templateLabelsCopy;
          if (this.currType == "task") {
            this.validateContain(data1);
          } else {
            this.$refs.deployForm4.validate((valid4) => {
              if (valid4) {
                let data4 = JSON.parse(JSON.stringify(this.deployForm4));
                let result = Object.assign(data1, data4);
                this.validateContain(result);
              } else {
                return false;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    validateContain(data1) {
      this.$refs.deployForm2.validate((valid2) => {
        if (valid2) {
          const data2 = JSON.parse(JSON.stringify(this.deployForm2));
          let data2New = {
            containers: [],
          };
          if (!this.pvcSwitch) {
            delete data2.data;
            delete data2.dataName;
            delete data2.mount_path;
          } else {
            // 数据卷-pvc
            data2.volume_mounts = [
              {
                name: data2.dataName,
                // claimName: data2.data,
                mount_path: data2.mount_path,
                // read_only: false,
              },
            ];
            (data2New.volumes = []),
              data2New.volumes.push({
                name: data2.dataName,
                persistent_volume_claim_name: data2.data,
                persistent_volume_claim_read_only: false,
              });
            delete data2.data;
            delete data2.dataName;
            delete data2.mount_path;
          }
          if (!this.cpulimitSwitch) {
            delete data2.cpulimit;
          } else {
            if (data2.cpulimit.request) {
              data2.request.cpu = `${data2.cpulimit.request}m`;
            }
            if (data2.cpulimit.limit) {
              data2.limits.cpu = `${data2.cpulimit.limit}m`;
            }
            delete data2.cpulimit;
          }
          if (!this.memorylimitSwitch) {
            delete data2.memorylimit;
          } else {
            if (data2.memorylimit.request) {
              data2.request.memory = `${data2.memorylimit.request}Mi`;
            }
            if (data2.memorylimit.limit) {
              data2.limits.memory = `${data2.memorylimit.limit}Mi`;
            }
            delete data2.memorylimit;
          }
          if (!this.cpulimitSwitch && !this.memorylimitSwitch) {
            delete data2.limits;
            delete data2.request;
          }
          if (!data2.args) {
            delete data2.args;
          } else {
            let a = data2.args;
            data2.args = [];
            data2.args.push(a.split("]")[0].split("[")[1]);
          }
          if (!data2.commands) {
            delete data2.commands;
          } else {
            let a = data2.commands;
            data2.commands = [];
            data2.commands.push(a.split("]")[0].split("[")[1]);
          }

          if (data2.containerPort) {
            data2.port = {
              name: "http",
              container_port: Number(data2.containerPort),
            };
          }
          delete data2.containerPort;
          data2New.containers.push(data2);

          if (this.currType == "task" && this.deployForm3.parallelism) {
            data2New.parallelism = this.deployForm3.parallelism;
          }
          if (this.currType == "task" && this.deployForm3.backoffLimit) {
            data2New.backoffLimit = this.deployForm3.backoffLimit;
          }
          if (this.currType == "task" && this.deployForm3.completions) {
            data2New.completions = this.deployForm3.completions;
          }
          data2New.restart_policy = this.deployForm3.restart_policy;
          const reBody = Object.assign(data1, data2New);
          console.log(reBody, "reBody");

          this.createDeployItem(reBody);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.deployForm2.resetFields();
      this.$refs.deployForm1.resetFields();
      this.$router.push({
        name: "configMapIndex",
      });
    },
    clusterChange() {
      this.getNamespace(this.deployForm1.cluster_name);
    },

    namespaceChange() {
      if (this.$route.params.type == "http") {
        // this.getServiceList();
      }

      if (this.$route.params.type == "https") {
        // this.getServiceList();
      }
      this.deployForm2.data = "";
      this.getPvcOption();
    },

    servicenameChange() {
      const arr = this.servicesList.filter((item) => {
        return item.servicename == this.deployForm2.servicename;
      });

      this.servicePortList = arr[0].serviceports || [];
    },

    onClose(flag, data) {
      if (flag) {
        // 请求pvc 列表数据
        // TODO

        data.requestStorage += "Gi";
        this.createPvcItem(data);
      }
      this.pvcObj.dialogVisible = false;
    },

    // ajax
    getClusters(condition) {
      const paginationConfig = {
        currentPage: 1,
        pageSize: 10000,
        total: 0,
      };
      // this.loading = true;
      const { currentPage, pageSize } = paginationConfig;
      this.searchClusters(currentPage, pageSize, condition).then((data) => {
        // this.loading = false;
        const list = data.items || [];
        this.clusterList = list.filter((item) => {
          return item.source != "external";
        });
        this.clusterList.forEach((items) => {
          items.value = items.label = items.name;
        });

        this.getNamespace(this.deployForm1.cluster_name);
      });
    },

    getNamespace(cluster) {
      this.deployForm1.namespace = "";
      // this.loading = true;
      this.listNamespace(cluster)
        .then((data) => {
          this.namespacesList = data.items || [];
        })
        .catch(() => {
          // this.loading = false;
        });
    },

    async createDeployItem(data) {
      await this.createConfig(data);
      this.resetForm();
    },

    async createPvcItem(data) {
      const pvc = await this.createPvc(data);
      console.log(pvc);
      this.getPvcOption();
      // this.pvcList.push(pvc);
    },

    async getPvcOption() {
      const data = await this.getPvcList(
        this.deployForm1.cluster_name,
        this.deployForm1.namespace
      );
      this.pvcList = data.items || [];
    },

    async getStorageClassList() {
      const data = await this.getStorageClass(this.$route.params.cluster);
      this.pvcObj.storageClassList = data || [];
    },
  },
  filter: {},
  computed: {},
  watch: {
    pvcSwitch: {
      handler(val) {
        var dataRule = (rule, value, callback) => {
          if (val) {
            if (rule.required) {
              if (this.deployForm1.dataName == "") {
                callback(new Error("请输入数据卷名称"));
              } else if (this.deployForm1.data == "") {
                callback(new Error("请选择PVC"));
              } else {
                callback();
              }
            } else {
              callback();
            }
          } else {
            callback();
          }
        };
        this.$set(this.rules1, "data", [
          {
            required: val,
            trigger: "change",
            validator: dataRule,
          },
        ]);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.domain-manage {
  background: #fff;
  padding: 16px 24px;
  padding-right: 35%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .bread-crumb {
    font-size: 14px;
    color: #2c2e33;
    line-height: 22px;
    font-weight: 400;
    .bread-crumb-item {
      color: #797f8c;
      cursor: pointer;
    }
  }
  .domain-page-title {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;

    margin: 16px 0;
  }
  .module-name {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .tip-info {
    font-size: 12px;
    color: #797f8c;
    line-height: 20px;
    font-weight: 400;
  }

  .cus-tags {
    /deep/.el-form-item__label {
      width: 100%;
      display: flex;
      .slot-label-tags {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .tags-title {
          font-size: 14px;
          color: #606266;
          line-height: 22px;
          font-weight: 400;
        }
        .tags-btn {
          font-size: 14px;
          color: #5354bb;
          line-height: 22px;
          font-weight: 400;

          cursor: pointer;
        }
      }

      .pvc-info {
        .pvc-title {
          font-size: 14px;
          color: #4b5059;
          line-height: 22px;
          font-weight: 400;

          margin-right: 16px;
        }
      }
    }
    /deep/.tags-item {
      display: flex;
      margin-bottom: 16px;
    }
    .icon-close-line {
      cursor: pointer;
      font-size: 16px !important;
      margin-left: 8px;
    }

    .data-pvc {
      display: flex;
      margin-bottom: 16px;
      position: relative;
      .el-input--small {
        width: 50%;
        /deep/.el-input__inner {
          border-right: none;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      .cus-sel-data {
        width: 50%;
        /deep/.el-input__inner {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }

      .create-pvc {
        position: absolute;
        right: -140px;
        .tip-1 {
          font-size: 14px;
          color: #797f8c;
          line-height: 22px;
          font-weight: 400;
        }
        .tip-2 {
          font-size: 14px;
          color: #5354bb;
          line-height: 22px;
          font-weight: 400;
          cursor: pointer;
        }
      }
    }
  }
  .cus-form-item {
    /deep/.el-form-item__content {
      display: flex;
      .sel-prefix {
        background: #eff1f5;
        border: 1px solid #cbcfd9;
        border-right: none;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;

        font-size: 14px;
        color: #2c2e33;
        line-height: 19px;
        font-weight: 400;
        display: inline-block;

        padding: 5px 12px;
      }
      .cus-sel1 {
        width: calc(50% - 40px);
        .el-input__inner {
          border-radius: 0;
          border-right: none;
        }
      }
      .cus-sel2 {
        width: calc(50% - 41px);
        .el-input__inner {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
  .pvc-path {
    margin-top: 16px;
    /deep/.el-input-group__prepend {
      font-size: 14px;
      color: #2c2e33;
    }
  }
  .cus-input-item {
    display: flex;
    align-items: center;
    /deep/.el-input-group__prepend {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
    }
    .split-1 {
      font-size: 14px;
      color: #2c2e33;
      font-weight: 400;

      margin: 0 12px;
    }
    .split-2 {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;

      margin-left: 12px;
    }
  }

  .config {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/.el-button--small {
      padding: 5px 8px;
    }
  }
  .block {
    border: 1px solid #e4e7f0;
    margin-bottom: 32px;
    // box-shadow: inset 0 -1px 0 0 #e4e7f0;
    .title {
      background: #f9fafc;
      padding: 11px 16px;
      box-shadow: inset 0 -1px 0 0 #e4e7f0;
    }
  }
}
</style>
