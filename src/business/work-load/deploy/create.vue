<template>
  <div class="domain-manage">
    <div class="bread-crumb">
      <span class="bread-crumb-item" @click="resetForm">部署/</span
      ><span>创建部署</span>
    </div>
    <div class="domain-page-title">添加部署</div>
    <div class="module-name">基本信息</div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="deployForm1"
      ref="deployForm1"
      :rules="rules1"
      validate-on-rule-change
    >
      <el-form-item label="部署名称" prop="deployName">
        <el-input
          v-model="deployForm1.deployName"
          placeholder="请输入应用名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="DeployLabels"
        prop="deployLabelsCopy"
        class="cus-tags"
      >
        <div slot="label" class="slot-label-tags">
          <span class="tags-title">元数据标签</span>
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

      <el-form-item label="MatchLabels" prop="matchLabelsCopy" class="cus-tags">
        <div slot="label" class="slot-label-tags">
          <span class="tags-title">选择器标签</span>
          <span class="tags-btn" @click="addTags('m')">添加变量</span>
        </div>
        <div
          v-for="(item, index) in deployForm1.matchLabelsCopy"
          :key="index"
          class="tags-item"
        >
          <el-input
            v-model="deployForm1.matchLabelsCopy[index]"
            placeholder="请输入键-值对，例：app:devops-frontend"
          ></el-input>
          <span
            class="iconfont icon-close-line"
            v-if="deployForm1.matchLabelsCopy.length > 1"
            @click="delTags(index, 'm')"
          ></span>
        </div>

        <div class="tip-info">
          只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对
        </div>
      </el-form-item>

      <el-form-item
        label="TemplateLabels"
        prop="templateLabelsCopy"
        class="cus-tags"
      >
        <div slot="label" class="slot-label-tags">
          <span class="tags-title">模板标签</span>
          <span class="tags-btn" @click="addTags('t')">添加变量</span>
        </div>
        <div
          v-for="(item, index) in deployForm1.templateLabelsCopy"
          :key="index"
          class="tags-item"
        >
          <el-input
            v-model="deployForm1.templateLabelsCopy[index]"
            placeholder="请输入键-值对，例：app:devops-frontend"
          ></el-input>
          <span
            class="iconfont icon-close-line"
            v-if="deployForm1.templateLabelsCopy.length > 1"
            @click="delTags(index, 't')"
          ></span>
        </div>

        <div class="tip-info">
          只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对
        </div>
      </el-form-item>

      <el-form-item class="cus-form-item" prop="namespace" label="命名空间">
        <div class="sel-prefix">集群信息</div>
        <el-select
          v-model="deployForm1.clustername"
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
    <div class="module-name">实例内容器</div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="deployForm2"
      ref="deployForm2"
      :rules="rules"
    >
      <el-form-item label="容器名称" prop="containerName">
        <el-input
          v-model="deployForm2.containerName"
          placeholder="请输入容器名称，只能包含小写字母、数字及分隔符(“-”),且不能以分隔符开头或结尾"
        ></el-input>
      </el-form-item>

      <!-- <el-form-item label="容器端口名称" prop="portname">
        <el-input
          v-model="deployForm2.portname"
          placeholder="请输入容器端口名称"
        ></el-input>
      </el-form-item> -->

      <el-form-item label="容器端口" prop="containerPort" class="cus-tags">
        <el-input
          v-model="deployForm2.containerPort"
          placeholder="请输入容器端口"
        ></el-input>
      </el-form-item>

      <el-form-item label="镜像" prop="image">
        <el-input
          v-model="deployForm2.image"
          placeholder="请输入镜像"
        ></el-input>
      </el-form-item>

      <el-form-item label="标签" prop="data" class="cus-tags">
        <div slot="label" class="pvc-info">
          <span class="pvc-title">添加数据卷</span>
          <el-switch v-model="pvcSwitch" active-text="添加数据卷"> </el-switch>
        </div>
        <div class="data-pvc" v-if="pvcSwitch">
          <el-input
            v-model="deployForm2.dataName"
            placeholder="请输入数据卷名称"
          ></el-input>
          <el-select
            v-model="deployForm2.data"
            placeholder="请选择PVC"
            class="cus-sel-data"
          >
            <el-option
              v-for="item in pvcList"
              :key="item['metadata'].name"
              :label="item['metadata'].name"
              :value="item['metadata'].name"
            >
            </el-option>
          </el-select>

          <div class="create-pvc">
            <span class="tip-1">没有PVC？</span
            ><span class="tip-2" @click="pvcObj.dialogVisible = true"
              >去创建 →</span
            >
          </div>
        </div>
        <div class="tip-info">
          为容器提供存储，目前支持文件存储
          NFS、PVC，还需挂载到容器的指定路径中。
        </div>
        <el-input
          placeholder="请输入内容"
          v-model="deployForm2.mountPath"
          class="cus-con-path"
          v-if="pvcSwitch"
        >
          <template slot="prepend">容器挂载路径</template>
        </el-input>
      </el-form-item>

      <el-form-item label="CPU限制（选填）" prop="cpulimit">
        <div slot="label" class="pvc-info">
          <span class="pvc-title">CPU限制（选填）</span>
          <el-switch v-model="cpulimitSwitch" active-text="添加CPU限制">
          </el-switch>
        </div>
        <div class="cus-input-item" v-if="cpulimitSwitch">
          <el-input
            placeholder="请输入内容"
            v-model="deployForm2.cpulimit.request"
            type="number"
            min="0"
          >
            <template slot="prepend">request</template>
          </el-input>
          <span class="split-1">-</span>
          <el-input
            placeholder="请输入内容"
            v-model="deployForm2.cpulimit.limit"
            type="number"
            min="0"
          >
            <template slot="prepend">limit</template>
          </el-input>
          <span class="split-2">核</span>
        </div>
      </el-form-item>

      <el-form-item
        label="内存限制（选填）"
        prop="memorylimit"
        class="cus-tags"
      >
        <div slot="label" class="pvc-info">
          <span class="pvc-title">内存限制（选填）</span>
          <el-switch v-model="memorylimitSwitch" active-text="添加内存限制">
          </el-switch>
        </div>
        <div class="cus-input-item" v-if="memorylimitSwitch">
          <el-input
            placeholder="请输入内容"
            v-model="deployForm2.memorylimit.request"
            type="number"
            min="0"
          >
            <template slot="prepend">request</template>
          </el-input>
          <span class="split-1">-</span>
          <el-input
            placeholder="请输入内容"
            v-model="deployForm2.memorylimit.limit"
            type="number"
            min="0"
          >
            <template slot="prepend">limit</template>
          </el-input>
          <span class="split-2">MB</span>
        </div>
      </el-form-item>

      <el-form-item label="副本数量" prop="replicas">
        <el-input-number
          v-model="deployForm2.replicas"
          placeholder="请输入副本数量"
        >
        </el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button @click="submitForm" type="primary">确定</el-button>
      </el-form-item>
    </el-form>

    <pvc-modal :pvcObj="pvcObj" @on-close="onClose"></pvc-modal>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import {
  createDeploy,
  createPvc,
  getStorageClass,
} from "@/api/work-load/deploy";
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

    var dataRule = (rule, value, callback) => {
      if (this.deployForm2.dataName == "") {
        callback(new Error("请输入数据卷名称"));
      } else if (this.deployForm2.data == "") {
        callback(new Error("请选择PVC"));
      } else if (this.deployForm2.mountPath == "") {
        callback(new Error("请输入容器挂载路径"));
      } else {
        callback();
      }
    };

    var cpulimitRule = (rule, value, callback) => {
      if (this.cpulimitSwitch) {
        if (Number(value.limit) < Number(value.request)) {
          callback(new Error("limit值不能大于request值！"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    var memorylimitRule = (rule, value, callback) => {
      if (this.memorylimitSwitch) {
        if (Number(value.limit) < Number(value.request)) {
          callback(new Error("limit值不能大于request值！"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      searchClusters,
      listNamespace,
      createDeploy,
      createPvc,
      getStorageClass,
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
        deployName: "",
        deployLabelsCopy: [""],
        matchLabelsCopy: [""],
        templateLabelsCopy: [""],
        clustername: "",
        namespace: "",
      },
      rules1: {
        deployName: [
          { required: true, message: "请输入部署名称", trigger: "blur" },
        ],
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
        containerName: "", // 容器名称
        // portname: "",
        containerPort: "",
        image: "",
        data: "",
        dataName: "",
        mountPath: "",
        cpulimit: {
          request: "",
          limit: "",
        },
        memorylimit: {
          request: "",
          limit: "",
        },
        replicas: 1,
      },
      rules: {
        containerName: [
          { required: true, message: "请输入容器名称", trigger: "blur" },
        ],
        // portname: [
        //   { required: true, message: "请输入容器端口名称", trigger: "blur" },
        // ],
        containerPort: [
          { required: true, message: "请输入容器端口", trigger: "blur" },
        ],
        image: [{ required: true, message: "请输入镜像", trigger: "blur" }],
        data: [
          {
            required: true,
            trigger: "change",
            validator: dataRule,
          },
        ],
        cpulimit: [{ validator: cpulimitRule }],
        memorylimit: [{ validator: memorylimitRule }],
        replicas: [
          {
            required: true,
            message: "请输入副本数量",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.deployForm1.clustername = this.$route.params.cluster;
    this.getClusters();
  },
  mounted() {
    this.getStorageClassList();
  },
  activited() {},
  update() {},
  methods: {
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
          const data1 = this.deployForm1;

          data1.deployLabels = {};
          data1.deployLabelsCopy.forEach((item) => {
            data1.deployLabels[item.split(":")[0]] = item.split(":")[1];
          });

          data1.matchLabels = {};
          data1.matchLabelsCopy.forEach((item) => {
            data1.matchLabels[item.split(":")[0]] = item.split(":")[1];
          });

          data1.templateLabels = {};
          data1.templateLabelsCopy.forEach((item) => {
            data1.templateLabels[item.split(":")[0]] = item.split(":")[1];
          });

          this.$refs.deployForm2.validate((valid2) => {
            if (valid2) {
              const data2 = this.deployForm2;
              if (!this.pvcSwitch) {
                delete data2.data;
                delete data2.dataName;
              } else {
                // 数据卷-pvc
                data2.volumes = [
                  {
                    name: data2.dataName,
                    claimName: data2.data,
                  },
                ];
                data2.volumeMounts = [
                  {
                    name: data2.dataName,
                    mountPath: data2.mountPath,
                  },
                ];
              }

              if (!this.cpulimitSwitch) {
                delete data2.cpulimit;
              } else {
                data2.limitCPU = `${data2.cpulimit.limit}m`;
                data2.requestCPU = `${data2.cpulimit.request}m`;
              }
              if (!this.memorylimitSwitch) {
                delete data2.memorylimit;
              } else {
                data2.requestMemory = `${data2.memorylimit.request}Mi`;
                data2.limitMemory = `${data2.memorylimit.limit}Mi`;
              }

              data2.containerPort = Number(data2.containerPort);

              const reBody = Object.assign(data1, data2);
              this.createDeployItem(reBody);
              console.log(reBody, "reBody");
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.deployForm2.resetFields();
      this.$refs.deployForm1.resetFields();

      this.$router.push({
        name: "deploy",
      });
    },
    clusterChange() {
      this.getNamespace(this.deployForm1.clustername);
    },

    namespaceChange() {
      if (this.$route.params.type == "http") {
        // this.getServiceList();
      }

      if (this.$route.params.type == "https") {
        // this.getServiceList();
      }
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

        this.getNamespace(this.deployForm1.clustername);
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
      await this.createDeploy(data);
      this.resetForm();
    },

    async createPvcItem(data) {
      const pvc = await this.createPvc(data);
      this.pvcList.push(pvc);
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
          if (rule.required) {
            if (this.deployForm2.dataName == "") {
              callback(new Error("请输入数据卷名称"));
            } else if (this.deployForm2.data == "") {
              callback(new Error("请选择PVC"));
            } else if (this.deployForm2.mountPath == "") {
              callback(new Error("请输入容器挂载路径"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        };
        this.$set(this.rules, "data", [
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

  .cus-con-path {
    margin-top: 16px;
    /deep/.el-input-group__prepend {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
    }
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
}
</style>
