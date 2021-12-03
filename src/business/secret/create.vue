<template>
  <div class="domain-manage">
    <div class="bread-crumb">
      <span class="bread-crumb-item" @click="resetForm">Secret/</span
      ><span>创建Secret</span>
    </div>
    <div class="domain-page-title">创建Secret</div>
    <div class="module-name">基本信息</div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="deployForm1"
      ref="deployForm1"
      :rules="rules1"
      validate-on-rule-change
    >
      <el-form-item label="Secret名称" prop="name">
        <el-input
          v-model="deployForm1.name"
          placeholder="请输入Secret名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="Secret类型" prop="type">
        <el-select
          v-model="deployForm1.type"
          placeholder="请选择Secret类型"
          style="width: 100%"
        >
          <el-option label="Opaque" value="Opaque"> </el-option>
          <el-option label="kubernetes.io" value="kubernetes.io"> </el-option>
        </el-select>
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
        <el-button
          type="primary"
          :disabled="deployForm1.type === 'kubernetes.io'"
          @click="addParams"
          class="add"
          size="small"
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
      class="block"
    >
      <el-row :gutter="24">
        <el-col :span="12" class="title">变量名称</el-col>
        <el-col :span="12" class="title">变量值</el-col>
        <div
          v-for="(item, index) in deployForm2.paramsList"
          :key="index"
          class="item-group"
        >
          <el-col :span="12" class="item">
            <el-form-item
              label=""
              :prop="`paramsList[${index}].label`"
              :rules="{
                required: true,
                message: '输入项不能为空',
                trigger: 'change',
              }"
            >
              <el-input
                v-model.trim="item.label"
                :disabled="deployForm1.type === 'kubernetes.io'"
                placeholder="请输入key值"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12" class="item">
            <el-form-item
              label=""
              :rules="{
                required: true,
                message: '输入项不能为空',
                trigger: 'change',
              }"
              :prop="`paramsList[${index}].value`"
            >
              <el-input
                style="width: calc(100% - 20px); margin-right: 6px"
                :disabled="deployForm1.type === 'kubernetes.io'"
                v-model.trim="item.value"
                placeholder="请输入value值"
              ></el-input>
              <span
                class="iconfont icon-close-line close-icon"
                v-if="deployForm2.paramsList.length > 1"
                @click="delparams(index, 'd')"
              ></span>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <el-button @click="resetForm">取消</el-button>
    <el-button @click="submitForm" type="primary">确定</el-button>
    <upload-modal :uploadObj="uploadObj" @on-close="onClose"></upload-modal>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import { createConfig } from "@/api/secret";
import uploadModal from "./upload-modal.vue";
export default {
  name: "",
  components: { uploadModal },
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
      file: [],
      memorylimitSwitch: false,
      cpulimitSwitch: false,
      uploadObj: {
        dialogVisible: false,
      },
      deployForm1: {
        name: "",
        deployLabelsCopy: [""],
        matchLabelsCopy: [""],
        templateLabelsCopy: [""],
        cluster_name: "",
        namespace: "",
        type: undefined,
      },
      valid2: true,
      rules1: {
        name: [
          { required: true, message: "请输入Secret名称", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择Secret类型", trigger: "change" },
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
        paramsList: [
          {
            label: "",
            value: "",
          },
        ],
      },
    };
  },
  created() {
    this.currType = this.$route.params.currType;
    this.deployForm1.cluster_name = this.$route.params.cluster;
    this.getClusters();
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    // 添加配置参数
    addParams() {
      this.deployForm2.paramsList.push({
        label: "",
        value: "",
      });
    },
    delparams(i) {
      this.deployForm2.paramsList.splice(i, 1);
    },
    // 文件上传
    fileUpload() {
      this.uploadObj.type = this.deployForm1.type;
      this.uploadObj.dialogVisible = true;
    },
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

          data1.labels = {};
          data1.deployLabelsCopy.forEach((item) => {
            data1.labels[item.split(":")[0]] = item.split(":")[1];
          });
          delete data1.deployLabelsCopy;
          delete data1.matchLabels;
          delete data1.matchLabelsCopy;
          delete data1.templateLabels;
          delete data1.templateLabelsCopy;
          if (this.file.length > 0) {
            data1.secret_data = {};
            if (data1.type === "Opaque") {
              data1.secret_data[this.file[0].name] = this.file[0].content;
            } else {
              data1.secret_data[this.file[0].name] = this.file[0].content;
              data1.secret_data[this.file[1].name] = this.file[1].content;
            }
            delete data1.type;
            this.createDeployItem(data1);
          } else {
            this.$refs.deployForm2.validate((valid2) => {
              if (valid2) {
                this.valid2 = true;
                const data2 = JSON.parse(JSON.stringify(this.deployForm2));
                data1.secret_string_data = {};
                data2.paramsList.forEach((item) => {
                  data1.secret_string_data[item.label] = item.value;
                });
                delete data1.type;
                this.createDeployItem(data1);
              } else {
                this.valid2 = false;
                return false;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.deployForm2.resetFields();
      this.$refs.deployForm1.resetFields();
      this.$router.push({
        name: "secretIndex",
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
    },

    onClose(flag, data) {
      if (flag) {
        // 请求pvc列表数据
        this.file = data;
        if (!this.valid2) {
          this.$refs.deployForm2.clearValidate();
        }
      }
      this.uploadObj.dialogVisible = false;
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
  },
  filter: {},
  computed: {},
  watch: {},
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

  /deep/.config {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button--small {
      padding: 5px 8px;
    }
  }
  /deep/.block {
    border: 1px solid #e4e7f0;
    margin-bottom: 32px;
    padding-bottom: 16px;

    .title {
      background: #f9fafc;
      padding: 11px 16px;
      box-shadow: inset 0 -1px 0 0 #e4e7f0;
    }
    .el-form-item {
      margin: 16px 0 0 0;
    }
    .close-icon {
      cursor: pointer;
    }
  }
  /deep/.el-row {
    margin: 0 !important;
  }
}
</style>
