<template>
  <layout-content header="证书">
    <complex-table
      :data="data"
      local-key="host_columns"
      :pagination-config="paginationConfig"
      @search="search"
      :selects.sync="hostSelections"
      v-loading="loading"
      :search-config="searchConfig"
    >
      <template #header>
        <div>
          <el-button
            size="small"
            type="primary"
            @click="create()"
            v-permission="['ADMIN']"
            icon="el-icon-plus"
            >{{ $t("commons.button.create") }}</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="add()"
            v-permission="['ADMIN']"
            icon="el-icon-upload2"
            >导入</el-button
          >
        </div>
      </template>
      <el-table-column type="selection" fix></el-table-column>
      <el-table-column
        :label="$t('commons.table.name')"
        show-overflow-tooltip
        min-width="120"
        fix
      >
        <template v-slot:default="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('commons.table.type')"
        min-width="100"
        prop="type"
        fix
      >
        <template v-slot:default="{ row }">
          <span>{{ row.is_ca === "true" ? "根证书" : "普通证书" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px">
        <template v-slot:default="{ row }">
          {{ row.createdAt | datetimeFormat }}
        </template>
      </el-table-column>
      <!-- <fu-table-operations
        v-if="isAdmin"
        fixed="right"
        :buttons="buttons"
        :label="$t('commons.table.action')"
        fix
      /> -->
    </complex-table>

    <el-dialog
      title="导入"
      width="66.7%"
      :visible.sync="dialogImportVisible"
      class="import"
    >
      <el-form>
        <el-form-item class="item">
          <div style="width: 50%">
            <div class="title">上传公钥文件</div>
            <el-row type="flex" justify="center">
              <el-upload
                ref="my-upload"
                :on-change="onUploadChange"
                action=""
                :auto-upload="false"
                class="upload-demo"
                drag
                :limit="1"
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
          <div style="width: 50%; margin-left: 20px">
            <div class="title">上传私钥文件</div>
            <el-row type="flex" justify="center">
              <el-upload
                ref="my-upload"
                :on-change="onPrivateUpload"
                action=""
                :auto-upload="false"
                class="upload-demo"
                drag
                :limit="1"
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
        <el-button @click="dialogImportVisible = false">{{
          $t("commons.button.cancel")
        }}</el-button>
        <el-button
          type="primary"
          :disabled="!(privateFile.name && file.name)"
          @click="onUploadFile()"
          >{{ $t("commons.button.ok") }}</el-button
        >
      </div>
    </el-dialog>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { getAllCertificates, upload } from "@/api/certificates";
import ComplexTable from "@/components/complex-table";
import { listRegistryAll } from "@/api/system-setting";
import { checkPermission } from "@/utils/permisstion";

export default {
  name: "HostList",
  components: { ComplexTable, LayoutContent },
  data() {
    return {
      buttons: [
        {
          label: this.$t("commons.button.delete"),
          icon: "el-icon-delete",
          click: (row) => {
            this.onDelete(row.name);
          },
          disabled: (row) => {
            return row.status !== "Running" && row.status !== "Failed";
          },
        },
      ],
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      data: [],
      dialogErrorVisible: false,
      dialogDetailVisible: false,
      errMsg: "",
      currentHost: {},
      hostSelections: [],
      syncHostList: [],
      dialogSyncVisible: false,
      dialogImportVisible: false,
      isUploadDisable: true,
      file: {},
      privateFile: {},
      searchConfig: {
        quickPlaceholder: this.$t("commons.search.quickSearch"),
        components: [
          {
            field: "name",
            label: this.$t("commons.table.name"),
            component: "FuComplexInput",
            defaultOperator: "eq",
          },
          {
            field: "ip",
            label: this.$t("host.ip"),
            component: "FuComplexInput",
            defaultOperator: "eq",
          },
          {
            field: "created_at",
            label: this.$t("commons.table.create_time"),
            component: "FuComplexDateTime",
            valueFormat: "yyyy-MM-dd",
          },
        ],
      },
      loading: false,
      isAdmin: checkPermission("ADMIN"),
      timer: {},
      cluster: "",
    };
  },
  methods: {
    create() {
      listRegistryAll().then((data) => {
        if (data.items !== null) {
          this.$router.push({ name: "certificationCreate" });
        } else {
          this.$message({
            type: "info",
            message: this.$t("cluster.creation.repo_err"),
          });
        }
      });
    },

    // 上传证书
    add() {
      this.dialogImportVisible = true;
    },
    sync() {
      this.dialogSyncVisible = true;
    },
    submitSync() {},
    onUploadChange(file) {
      this.file = file;
    },
    onPrivateUpload(file) {
      this.privateFile = file;
      // if (this.privateFile.name && this.file.name) {
      //   this.isUploadDisable = false;
      // } else {
      //   this.isUploadDisable = true;
      // }
    },
    removeFile() {
      this.file = {};
    },
    removeFile1() {
      this.privateFile = {};
    },
    onImport() {
      listRegistryAll().then((data) => {
        if (data.items !== null) {
          this.dialogImportVisible = true;
          this.isUploadDisable = true;
          if (this.$refs["my-upload"]) {
            this.$refs["my-upload"].clearFiles();
          }
        } else {
          this.$message({
            type: "info",
            message: this.$t("cluster.creation.repo_err"),
          });
        }
      });
    },
    download() {
      window.open("/api/v1/hosts/template");
    },
    getErrorInfo(row) {
      this.dialogErrorVisible = true;
      this.errMsg = row.message;
    },
    getDetailInfo(row) {
      this.dialogDetailVisible = true;
      this.currentHost = row;
    },
    onUploadFile() {
      let supportType = ["pem", "key", "crt"];

      const startIndex = this.file.name.lastIndexOf(".");
      if (startIndex !== -1) {
        const fileType = this.file.name
          .substring(startIndex + 1, this.file.name.length)
          .toLowerCase();
        if (supportType.indexOf(fileType) < 0) {
          this.$message({
            type: "error",
            message: this.$t("host.not_support_format"),
          });
          return;
        }
      } else {
        this.$message({
          type: "error",
          message: this.$t("host.not_support_format"),
        });
        return;
      }

      const startIndex1 = this.privateFile.name.lastIndexOf(".");
      if (startIndex1 !== -1) {
        const fileType1 = this.privateFile.name
          .substring(startIndex1 + 1, this.privateFile.name.length)
          .toLowerCase();
        if (supportType.indexOf(fileType1) < 0) {
          this.$message({
            type: "error",
            message: this.$t("host.not_support_format"),
          });
          return;
        }
      } else {
        this.$message({
          type: "error",
          message: this.$t("host.not_support_format"),
        });
        return;
      }

      const formData = new FormData();
      formData.append("cert", this.file.raw);
      formData.append("key", this.privateFile.raw);

      upload(formData).then(
        () => {
          this.$message({
            type: "success",
            message: this.$t("commons.msg.import_success"),
          });
          this.search();
          this.dialogImportVisible = false;
        },
        () => {
          this.search();
          this.dialogImportVisible = false;
        }
      );
    },
    onDelete() {},
    onGrant() {
      this.$router.push({ name: "ProjectAuthorizationList" });
    },
    search(condition) {
      this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      getAllCertificates(currentPage, pageSize, condition)
        .then((data) => {
          this.loading = false;
          this.data = [...data.items];
          this.paginationConfig.total = data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    polling() {
      this.timer = setInterval(() => {
        let flag = false;
        const needPolling = [
          "Initializing",
          "Terminating",
          "Synchronizing",
          "Waiting",
          "Creating",
        ];
        for (const item of this.data) {
          if (needPolling.indexOf(item.status) !== -1) {
            flag = true;
            break;
          }
        }
        if (flag) {
          const { currentPage, pageSize } = this.paginationConfig;
          getAllCertificates(currentPage, pageSize).then((data) => {
            this.data = data.items;
            this.paginationConfig.total = data.total;
          });
        }
      }, 10000);
    },
  },
  mounted() {
    this.search();
    this.polling();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
.hDivider {
  margin: 8px 0;
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
.node-detail {
  .dialog {
    height: 100%;
  }
  /deep/ .el-drawer__header {
    font-size: 14px;
    color: #2c2e33;
    line-height: 22px;
    font-weight: 500;
    box-shadow: 0 1px 0 0 #e4e7f0;
    padding: 17px;
    margin-bottom: 24px;
  }
  /deep/ .el-drawer__body {
    padding: 0 24px;
    span {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 400;
    }
  }
  .myTable {
    td {
      &:nth-child(2n) {
        font-weight: 500;
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
      }
      &:nth-child(2n + 1) {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
      }
    }
  }
  /deep/ .el-table {
    td div {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
    }
    th div {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 500;
    }
  }
  /deep/ .complex-table__header {
    display: block;
  }
}
</style>
