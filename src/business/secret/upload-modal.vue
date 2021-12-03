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
      class="import"
    >
      <el-form>
        <el-form-item class="item">
          <div :style="{ width: uploadObj.type === 'Opaque' ? '100%' : '50%' }">
            <div class="title">
              {{
                uploadObj.type === "Opaque" ? "上传配置文件" : "上传公钥文件"
              }}
            </div>
            <el-row type="flex" justify="center">
              <el-upload
                :file-list="fileList"
                ref="my-upload"
                :on-change="handleChange"
                action=""
                :auto-upload="false"
                class="upload-demo"
                drag
                :on-remove="removeFile"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <div class="subtitle">点击或将文件拖拽到这里上传</div>
                  <div class="tip">
                    {{ $t("cluster.detail.backup.local_recover_tips") }}
                  </div>
                </div>
              </el-upload>
            </el-row>
          </div>
          <div
            style="width: 50%; margin-left: 20px"
            v-if="uploadObj.type !== 'Opaque'"
          >
            <div class="title">上传私钥文件</div>
            <el-row type="flex" justify="center">
              <el-upload
                ref="my-upload"
                :on-change="handlePrivateChange"
                action=""
                :auto-upload="false"
                class="upload-demo"
                drag
                :file-list="privateFileList"
                :on-remove="removeFile1"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <div class="subtitle">点击或将文件拖拽到这里上传</div>
                  <div class="tip">
                    {{ $t("cluster.detail.backup.local_recover_tips") }}
                  </div>
                </div>
              </el-upload>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{
          $t("commons.button.cancel")
        }}</el-button>
        <el-button
          type="primary"
          :disabled="
            !(uploadObj.type === 'Opaque'
              ? file.name
              : privateFile.name && file.name)
          "
          @click="dialogConfirm()"
          >{{ $t("commons.button.ok") }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["uploadObj"],
  data() {
    return {
      file: {},
      privateFile: {},
      fileList: [],
      privateFileList: [],
    };
  },
  mounted() {},
  update() {},
  methods: {
    removeFile() {
      this.file = {};
    },
    removeFile1() {
      this.privateFile = {};
    },
    handleChange(file) {
      if (file && file.raw) {
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsText(file.raw, "UTF-8"); //读取文件
        let that = this;
        reader.onload = function (evt) {
          //读取完文件之后会回来这里
          that.file.content = evt.target.result; // 读取文件内容
        };
        this.file.name = file.name;
        this.fileList = [file];
      }
    },
    handlePrivateChange(file) {
      if (file && file.raw) {
        var reader = new FileReader(); //新建一个FileReader
        reader.readAsText(file.raw, "UTF-8"); //读取文件
        let that = this;
        reader.onload = function (evt) {
          //读取完文件之后会回来这里
          that.privateFile.content = evt.target.result; // 读取文件内容
        };
        this.privateFile.name = file.name;
        this.privateFileList = [file];
      }
    },
    dialogConfirm() {
      this.$emit("on-close", true, [this.file, this.privateFile]);
    },
    handleClose() {
      // true 表示创建成功，反之失败
      this.$emit("on-close", false);
    },
  },
  filter: {},
  computed: {},
  watch: {
    "uploadObj.dialogVisible": {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.file = {};
            this.privateFile = {};
            this.fileList = [];
            this.privateFileList = [];
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
.import {
  .item {
    padding: 24px 16px;
    background: #f9fafc;
    margin-bottom: 16px;
    .title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }
    .content {
      font-size: 14px;
      color: #797f8c;
      line-height: 22px;
      font-weight: 400;
      margin: 6px 0 12px 0;
    }
  }
  /deep/ .el-form-item__content {
    display: flex;
  }
  /deep/ .upload-demo {
    margin-top: 16px;
    width: 100%;
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
      .subtitle {
        font-size: 16px;
        color: #2c2e33;
        text-align: center;
        line-height: 24px;
        font-weight: 400;
      }
      .tip {
        font-size: 14px;
        color: #797f8c;
        text-align: center;
        line-height: 22px;
        font-weight: 400;
      }
    }
  }
}
</style>
