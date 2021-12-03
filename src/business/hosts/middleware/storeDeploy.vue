<template>
  <div class="deploy-detail">
    <div class="top">
      <div class="detail"><span @click="goBack">中间件 /</span> 部署应用</div>
      <div class="basic-info">
        <h5>基本信息</h5>
        <div class="title">
          <img :src="middle.iconUrl" />
          <span>{{ middle.name }}</span>
        </div>
        <div class="text-info">
          <span>应用版本：</span>
          <span class="text-bg"
            >App: {{ middle.latestVersion.appVersion }}</span
          >
          <span class="text-bg"
            >Package: {{ middle.latestVersion.pkgVersion }}</span
          >
          <span>Categories：</span
          ><span class="text-bg">{{ middle.categories.join(",") }}</span>
        </div>
        <div class="text-info">
          <span>应用描述：</span>
          <span style="color: #2c2e33">{{ middle.shortDescription }}</span>
        </div>
      </div>
    </div>
    <div class="bottom"  v-permission="['ADMIN']">
      <div
        style="
          display: flex;
          align-items: center;
          box-shadow: 0 1px 0 0 #e4e7f0;
          padding: 16px 24px;
        "
      >
        <div class="title">应用部署</div>
        <el-steps
          :active="active"
          finish-status="success"
          simple
          style="width: 340px"
        >
          <el-step title="基本信息配置">
            <div slot="icon" class="step">1</div>
          </el-step>
          <el-step title="YAML配置">
            <div slot="icon" class="step">2</div>
          </el-step>
        </el-steps>
      </div>
      <div class="config">
        <div v-if="active === 0">
          <div class="title">基本信息</div>
          <el-form
            ref="stepOneForm"
            :rules="rules"
            :model="stepOneForm"
            label-position="top"
            style="margin: 16px 588px 0 0"
          >
            <el-form-item label="应用名称" prop="name">
              <el-input
                v-model="stepOneForm.name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="nameSpace">
              <div class="combination">
                <el-input value="集群信息" :disabled="true" style="width: 85px">
                </el-input>
                <el-select
                  placeholder="请选择集群"
                  v-model="stepOneForm.cluster"
                  @change="getNamespace"
                  style="width: calc((100% - 85px) / 2)"
                >
                  <el-option
                    :label="item.name"
                    :value="item.name"
                    :key="item.name"
                    v-for="item in clusterList"
                  ></el-option>
                </el-select>
                <el-select
                  style="width: calc((100% - 85px) / 2)"
                  placeholder="请选择Namespace"
                  v-model="stepOneForm.nameSpace"
                  :disabled="!stepOneForm.cluster"
                >
                  <el-option
                    :label="item.metadata.name"
                    :value="item.metadata.name"
                    :key="item.metadata.name"
                    v-for="item in nameSpaceList"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
          <el-button style="margin-top: 12px" @click="next" type="primary"
            >下一步</el-button
          >
          <el-button style="margin-top: 12px" @click="resetForm"
            >恢复默认值</el-button
          >
        </div>
        <div v-show="active !== 0" style="height: calc(100% - 79px)">
          <textarea ref="CodeMirror" class="temp-detail-editor"></textarea>
          <el-button style="margin-top: 12px" @click="deploy" type="primary"
            >部署 {{ middle.latestVersion.pkgVersion }}</el-button
          >
          <el-button style="margin-top: 12px" @click="resetFile"
            >恢复默认值</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import { getStorList, deploy } from "@/api/middleware";
// 引用组件
import CodeMirror from "codemirror";
// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/xq-light.css";

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
// 如果有Java c++语言设置需求，需要 引入clike.js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/yaml/yaml.js";

import "codemirror/addon/hint/anyword-hint";

// 设置光标所在行高亮工具包
import "codemirror/addon/selection/active-line";
// 快捷键
import "codemirror/keymap/sublime";

// 实现简单的搜索功能
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";

import { mode } from "@/assets/js/mode";

export default {
  name: "HostCreate",
  components: {},
  data() {
    return {
      mode,
      jsonEditor: null,
      fileContent: "",
      nameSpaceList: [],
      clusterList: [],
      active: 0,
      middle: {},
      stepOneForm: {
        name: "",
        cluster: undefined,
        nameSpace: undefined,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        nameSpace: [
          { required: true, message: "请选择集群信息", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async editorInit() {
      this.jsonEditor = await CodeMirror.fromTextArea(this.$refs.CodeMirror, {
        mode: "yaml",
        lineNumbers: true, // 行号
        lint: true,
        styleActiveLine: true, // 高亮光标所在行
        indentUnit: 2, // 缩进
        smartIndent: true, // 开启自动缩进
        tabSize: 2,
        theme: "default",
        readOnly: false,
      });
      let content = this.fileContent;
      this.jsonEditor.setValue(content);
    },
    // 获取集群信息
    getCluester() {
      searchClusters(1, 1000, "")
        .then((data) => {
          let result = data.items.filter((item) => {
            return item.source === "local";
          });
          this.clusterList = result;
        })
        .catch(() => {
          return [];
        });
    },
    // 获取namespace
    getNamespace() {
      listNamespace(this.stepOneForm.cluster)
        .then((data) => {
          this.nameSpaceList = data.items;
        })
        .catch(() => {});
    },
    // 获取列表
    getStorDetail() {
      let params = {
        cluster_name: this.middle.nameSpace,
        fun_name:
          "kubeappsapis.plugins.helm.packages.v1alpha1.HelmPackagesService.GetAvailablePackageDetail",
        use_tls: false,
        body: {
          availablePackageRef: {
            context: {
              cluster: "default",
              namespace: "kubeapps",
            },
            identifier: this.middle.availablePackageRef.identifier,
            plugin: {
              name: "",
              version: "",
            },
          },
        },
        pkgVersion: "",
      };
      getStorList(params)
        .then((data) => {
          this.fileContent =
            data.map_result.availablePackageDetail.defaultValues;
          console.log(
            JSON.parse(data.map_result.availablePackageDetail.valuesSchema)
          );
        })
        .catch(() => {});
    },
    deploy() {
      let params = {
        appRepositoryResourceName:
          this.middle.availablePackageRef.identifier.split("/")[0],
        appRepositoryResourceNamespace: "kubeapps",
        chartName: this.middle.availablePackageRef.identifier.split("/")[1],
        releaseName: this.stepOneForm.name,
        values: this.jsonEditor.getValue(),
        version: this.middle.latestVersion.pkgVersion,
      };
      deploy(this.stepOneForm.cluster, this.stepOneForm.nameSpace, params)
        .then((data) => {
          console.log(data);
          // this.$router.push({ name: "MiddleDeploy" });
          this.$router.push({
            name: "middle",
            params: {
              monitor: true,
              name: data.data.name,
              cluster: this.stepOneForm.cluster,
              nameSpace: this.stepOneForm.nameSpace,
            },
          });
        })
        .catch(() => {});
    },
    resetFile() {
      this.jsonEditor.setValue(this.fileContent);
    },
    next() {
      this.submitForm();
    },
    goBack() {
      this.$router.push({ name: "MiddleStore" });
    },
    // 获取namespace
    getNameSpace() {},
    // 获取我的部署
    getDeploy() {},
    submitForm() {
      this.$refs.stepOneForm.validate((valid) => {
        if (valid) {
          this.editorInit();
          if (this.active++ > 1) this.active = 0;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.stepOneForm.resetFields();
      this.stepOneForm.cluster = undefined;
    },
  },
  created() {
    this.middle = this.$route.params.item;

    this.getCluester();
    this.getStorDetail();
  },
};
</script>

<style scoped lang='scss'>
.deploy-detail {
  position: absolute;
  top: 0;
  width: calc(100%);
  height: calc(100%);
  .top {
    background: white;
    padding: 16px;
    margin-bottom: 8px;
    .detail {
      span {
        color: #797f8c;
        cursor: pointer;
      }
    }
    .basic-info {
      h5 {
        font-size: 16px;
      }
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        img {
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }
      }
      .text-info {
        span {
          font-size: 14px;
          color: #797f8c;
        }
        .text-bg {
          background: #dcdee4;
          padding: 0 4px;
          margin-right: 8px;
          border-radius: 2px;
        }
      }
    }
  }
  .bottom {
    background: white;
    padding: 0 16px 16px 0;
    height: calc(100% - 300px);
    .title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      border-right: 1px solid #e4e7f0;
      height: 24px;
      padding-right: 12px;
      margin-right: 10px;
    }
    .config {
      height: calc(100% - 79px);
      padding: 24px;
      .title {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 500;
        margin-bottom: 0 0 16px 0;
      }
    }
    .temp-detail-editor {
      // height: auto;
      border: 1px solid #cbcfd9;
      border-top: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  /deep/.el-steps--simple {
    padding: 0;
    background: unset;
  }
  /deep/.el-step__icon {
    background: #5354bb;
    border-color: #5354bb;
    color: white;
    width: 24px;
    height: 24px;
  }
  /deep/ .is-wait {
    .el-step__icon {
      background: #e4e7f0;
      border-color: #e4e7f0;
      color: #797f8c;
    }
  }
  /deep/.el-step__title.is-success {
    color: #2c2e33;
  }
  /deep/.CodeMirror {
    height: 100%;
    .CodeMirror-scroll {
      .CodeMirror-sizer {
        padding-left: 16px;
        padding-top: 4px;
        .CodeMirror-gutter-wrapper {
          left: -99px !important;
          .CodeMirror-linenumber {
            font-size: 14px;
            color: #797f8c;
            line-height: 22px;
            font-weight: 400;
          }
        }
      }
      .CodeMirror-gutters {
        background: #e4e7f0;
        .CodeMirror-gutter {
          width: 62px;
        }
      }
    }
  }
  /deep/.combination {
    .el-input {
          input {
      border-radius: 0;
    }
      &:first-child {
        input {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }
      &:last-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }


  }
}
</style>
