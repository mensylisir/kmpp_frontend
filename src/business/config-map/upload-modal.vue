<template>
  <div>
    <el-dialog
      title="导入Config文件"
      :visible.sync="uploadObj.dialogVisible"
      width="800"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="pvcRule"
        class="top"
      >
        <el-form-item label="" prop="fileType">
          <el-select
            v-model="uploadForm.fileType"
            placeholder="请选择文件类型"
            style="width: 100%"
          >
            <el-option label="json" value="json"> </el-option>
            <el-option label="yaml" value="yaml"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="fileFormat">
          <el-select
            v-model="uploadForm.fileFormat"
            placeholder="请选择文件编码格式"
            style="width: 100%"
          >
            <el-option label="UTF-8" value="UTF-8"> </el-option>
            <el-option label="GBK" value="GBK"> </el-option>
          </el-select>
        </el-form-item>

        <el-upload
          class="upload-demo"
          action=""
          :on-change="handleChange"
          :file-list="fileList"
          :show-file-list="false"
        >
          <el-button
            :disabled="!(uploadForm.fileType && uploadForm.fileFormat)"
          >
            <span class="iconfont icon-upload"></span>
            上传文件
          </el-button>
        </el-upload>
      </el-form>
      <div class="tip-info">请上传或者直接输入内容</div>
      <div class="editor-header">配置文件内容（读写）</div>
      <div class="temp-detail-editor">
        <textarea
          ref="CodeMirror1"
          :style="initing ? 'opacity: 0;' : ''"
        ></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm" :disabled="!fileValue"
          >添 加</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引用组件
import CodeMirror from "codemirror";
// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/darcula.css";
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

export default {
  name: "",
  components: {},
  props: ["uploadObj"],
  data() {
    return {
      jsonEditor: null,
      fileName: "file.properties",
      value: "", // 默认显示的值
      initing: false,
      fileString: "",
      fileList: [],
      uploadForm: {
        fileType: "",
        fileFormat: "",
      },
      pvcRule: {
        pvcName: [
          { required: true, message: "请输入PVC名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  update() {},
  methods: {
    handleChange(file) {
      if (file && file.raw) {
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsText(file.raw, "UTF-8"); //读取文件
        let that = this;
        reader.onload = function (evt) {
          //读取完文件之后会回来这里
          that.fileString = evt.target.result; // 读取文件内容
        };
        this.fileName = file.name;
        this.jsonEditor.setValue(this.fileString);
        this.fileList = [file];
      }
    },
    dialogConfirm() {
      this.$emit("on-close", true, {
        fileName: this.fileName,
        content: this.jsonEditor.getValue(),
      });
    },

    handleClose() {
      // true 表示创建成功，反之失败
      this.$emit("on-close", false);
    },
    async editorInit() {
      this.jsonEditor = await CodeMirror.fromTextArea(this.$refs.CodeMirror1, {
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
      });

      this.jsonEditor.setValue(this.value);
    },
  },
  filter: {},
  computed: {
    fileValue: {
      get: function () {
        let value = "";
        if (this.jsonEditor) {
          value = this.jsonEditor.getValue();
        }
        return value;
      },
      set: function () {},
    },
  },

  watch: {
    "uploadObj.dialogVisible": {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.jsonEditor = null;
            this.value = ""; // 默认显示的值
            this.fileString = "";
            this.fileList = [];
            this.uploadForm = {
              fileType: "",
              fileFormat: "",
            };
            this.$refs.uploadForm.resetFields();
            this.uploadForm.clustername = this.$route.params.cluster || "";
            this.editorInit();
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  /deep/.el-form-item {
    margin-bottom: 12px;
    margin-right: 16px;
    width: 50%;
  }
  button {
    margin-bottom: 12px;
  }
}

.tip-info {
  font-size: 12px;
  color: #797f8c;
  line-height: 20px;
  font-weight: 400;
}

/deep/.el-input-group__append {
  font-size: 14px;
  color: #2c2e33;
  line-height: 22px;
  font-weight: 400;
}

.editor-header {
  background: #313335;
  box-shadow: 0 1px 0 0 #313335;
  color: #5354bb;
  margin-top: 8px;

  font-size: 14px;
  color: white;
  line-height: 22px;
  font-weight: 500;

  border: 1px solid #313335;
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
    color: #5354bb;
    margin-right: 4px;
  }
}
::-webkit-scrollbar-track {
  background: #4a4b4d; //背景颜色
}
.temp-detail-editor {
  height: 480px;
  overflow: auto;
  box-shadow: inset 0 -1px 0 0 #555555;
  // border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  /deep/.CodeMirror {
    height: calc(100vh - 32px - 56px - 37.6px - 56px - 9px - 48px - 41.5px);
    .CodeMirror-scroll {
      .CodeMirror-sizer {
        padding-left: 16px;
        padding-top: 4px;
        .CodeMirror-gutter-wrapper {
          left: -99px !important;
          .CodeMirror-linenumber {
            font-size: 14px;
            color: #5354bb;
            line-height: 22px;
            font-weight: 400;
          }
        }
      }
      .CodeMirror-gutters {
        // background: #e4e7f0;
        .CodeMirror-gutter {
          width: 62px;
        }
      }
    }
    textarea {
      border: none;
    }
  }
}
</style>
