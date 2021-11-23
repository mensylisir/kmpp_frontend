<template>
  <div class="domain-manage">
    <div class="bread-crumb">
      <span class="bread-crumb-item" @click="$router.push({ name: 'domain' })"
        >域名管理/</span
      ><span>添加域名</span>
    </div>
    <div class="domain-page-title">
      <span class="page-title">编辑 Ingress YAML 文件</span>
      <div class="action-btn">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </div>

    <div class="temp-detail-editor">
      <textarea
        ref="CodeMirror"
        :style="initing ? 'opacity: 0;' : ''"
      ></textarea>
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

import { getIngressItem, updateIngress } from "@/api/domain-manage";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getIngressItem,
      updateIngress,
      jsonEditor: null,
      value: "", // 默认显示的值
      initing: false,
    };
  },
  created() {
    this.getIngressItemInfo();
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    submitForm() {
      this.updateIngressInfo();
    },
    resetForm() {
      this.$router.push({
        name: "domain",
      });
    },

    // ajax
    async getIngressItemInfo() {
      this.initing = true;
      const data = await this.getIngressItem(
        this.$route.query.clustername,
        this.$route.query.namespace,
        this.$route.query.ingressname
      );

      this.value = data.ingress;
      this.editorInit();
      this.initing = false;
    },

    async editorInit() {
      this.jsonEditor = await CodeMirror.fromTextArea(this.$refs.CodeMirror, {
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

    async updateIngressInfo() {
      const value = this.jsonEditor.getValue();
      const reBody = {
        clustername: this.$route.query.clustername,
        namespace: this.$route.query.namespace,
        ingressname: this.$route.query.ingressname,
        ingress: value,
      };
      await this.updateIngress(reBody);
      this.resetForm();
    },
  },
  filter: {},
  computed: {},
  watch: {},
  beforeDestroy() {
    this.jsonEditor = null;
  },
};
</script>

<style lang="scss" scoped>
.domain-manage {
  background: #fff;
  padding: 16px 24px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }

    margin: 16px 0;
  }

  .temp-detail-editor {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    // height: auto;
    margin: 0 24px;
    // border: 1px solid #cbcfd9;
    border: 1px solid #555;
    // border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    /deep/.CodeMirror {
      height: calc(100vh - 32px - 56px - 21.6px - 65.8px - 1.3px);
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
}
</style>
