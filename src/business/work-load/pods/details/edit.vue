<template>
  <div class="deploy-edit">
    <div class="split-8"></div>
    <div class="domain-page-title">
      <span class="page-title">YAML文件</span>
      <el-button type="primary" disabled
        ><span class="iconfont icon-coding"></span>编辑YAML</el-button
      >
    </div>

    <div class="editor-header">
      <span class="iconfont icon-file-line"></span>YAML
    </div>
    <div class="temp-detail-editor">
      <textarea
        ref="CodeMirror2"
        :style="initing ? 'opacity: 0;' : ''"
      ></textarea>
    </div>

    <div class="action-btn">
      <el-button @click="resetForm">取消</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
// 引用组件
import CodeMirror from "codemirror";
// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/darcula.css";

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

import { getPodsItem, updatePods } from "@/api/work-load/pods";
import YAML from "json2yaml";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getPodsItem,
      updatePods,
      jsonEditor: null,
      value: "", // 默认显示的值
      initing: false,
      podsInfo: {},
    };
  },
  created() {
    this.getPods();
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    submitForm() {
      const value = this.jsonEditor.getValue();
      const reBody = {
        cluster_name: this.$route.params.clusterName,
        resource_type: "deployment",
        resource_name: this.podsInfo.metadata.name,
        namespace: this.podsInfo.metadata.namespace,
        data: value,
      };
      this.updatePodsItem(reBody);
      //
    },
    resetForm() {
      this.$router.push({
        name: "podsDetailsCheck",
        params: {
          clusterName: this.$route.params.clusterName,
          podsName: this.$route.params.podsName,
          namespace: this.$route.params.namespace,
        },
      });
    },

    async editorInit() {
      this.jsonEditor = await CodeMirror.fromTextArea(this.$refs.CodeMirror2, {
        mode: "text/x-yaml",
        lineNumbers: true, // 行号
        lint: true,
        styleActiveLine: true, // 高亮光标所在行
        indentUnit: 2, // 缩进
        smartIndent: true, // 开启自动缩进
        tabSize: 2,
        theme: "darcula",
        readOnly: false,
        // value:'',
        fixedGutter: false,
        lineWrapping: true, // CodeMirror是否可以滚动，默认为false ,true 可自动换行
      });

      this.jsonEditor.setValue(this.value);
    },

    // ajax
    async getPods() {
      this.initing = true;
      const data = await this.getPodsItem(
        this.$route.params.clusterName,
        this.$route.params.namespace,
        this.$route.params.podsName
      );

      this.podsInfo = data || {};

      this.value = YAML.stringify(data) || "";

      this.editorInit();
      this.initing = false;
    },

    async updatePodsItem(data) {
      await this.updatePods(data);
      this.resetForm();
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.deploy-edit {
  padding-bottom: 16px;
  .split-8 {
    height: 8px;
    background: #edeff4;
  }
  .domain-page-title {
    padding: 16px 24px;
    padding-bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }
    .icon-coding {
      font-size: 16px !important;
      margin-right: 6px;
    }

    margin-bottom: 12px;
  }

  .editor-header {
    margin: 0px 24px;

    // background: #f9fafc;
    background: #434343;
    // box-shadow: 0 1px 0 0 #e4e7f0;
    box-shadow: 0 1px 0 0 #555555;
    // box-shadow: inset 0 -1px 0 0 #555555;

    font-size: 14px;
    // color: #2c2e33;
    color: #999;
    line-height: 22px;
    font-weight: 500;

    // border: 1px solid #cbcfd9;
    border: 1px solid #555;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: none;

    display: flex;
    align-items: center;

    height: 40px;
    padding-left: 16px;
    box-sizing: border-box;

    .icon-file-line {
      font-size: 16px !important;
      color: #999;
      margin-right: 4px;
    }
  }

  .temp-detail-editor {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    // height: auto;
    margin: 0 24px;
    margin-bottom: 16px;
    // border: 1px solid #cbcfd9;
    border: 1px solid #555;
    // border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    /deep/.CodeMirror {
      height: calc(
        100vh - 56px - 37.6px - 56px - 8px - 52px - 40px - 32.8px - 16px - 16px -
          12px - 2.5px
      );
      .CodeMirror-scroll {
        .CodeMirror-sizer {
          padding-left: 16px;
          padding-top: 4px;
          .CodeMirror-gutter-wrapper {
            left: -99px !important;
            .CodeMirror-linenumber {
              // font-size: 14px;
              // color: #5354bb;
              // line-height: 22px;
              // font-weight: 400;
            }
          }
        }
        .CodeMirror-gutters {
          // background: #e4e7f0;
          background: #434343;
          .CodeMirror-gutter {
            width: 62px;
          }
        }
      }
    }
  }

  .action-btn {
    padding: 0 24px;
  }
}
</style>
