<template>
  <layout-content header="存储">
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
          <!-- <el-button size="small" @click="onImport()">{{
            $t("commons.button.batch_import")
          }}</el-button> -->
          <!-- <el-button size="small" @click="onGrant()">{{
            $t("commons.button.authorize")
          }}</el-button>
          <el-button
            :disabled="hostSelections.length < 1"
            size="small"
            @click="sync()"
            >{{ $t("commons.button.sync") }}</el-button
          > -->
          <el-button
            v-permission="['ADMIN']"
            :disabled="hostSelections.length < 1"
            size="small"
            @click="onDelete()"
          >
            {{ $t("commons.button.delete") }}
          </el-button>
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
      />
      <el-table-column label="大小（MB）" min-width="100px" prop="size" />
      <el-table-column
        :label="$t('commons.table.status')"
        min-width="100"
        prop="status"
        fix
      >
        <template v-slot:default="{ row }">
          <div v-if="row.status === 'Initializing'">
            <i class="el-icon-loading" />&nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="openXterm(row)">
              {{ $t("commons.status.initializing") }}</el-link
            >
          </div>
          <div v-if="row.status === 'Terminating'">
            <i class="el-icon-loading" />&nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="openXterm(row)">
              {{ $t("commons.status.terminating") }}</el-link
            >
          </div>
          <div v-if="row.status === 'Failed'">
            <span class="iconfont iconerror" style="color: #fa4147"></span>
            &nbsp; &nbsp; &nbsp;
            <el-link type="info" @click="getErrorInfo(row)">{{
              $t("commons.status.failed")
            }}</el-link>
          </div>
          <div v-if="row.status == 'Running'">
            <span class="iconfont iconduihao" style="color: #32b350"></span>
            {{ $t("commons.status.running") }}
          </div>
          <div v-if="row.status == 'NotReady'">
            <span class="iconfont iconerror" style="color: #fa4147"></span>
            {{ $t("commons.status.not_ready") }}
          </div>
          <div v-if="row.status === 'Synchronizing'">
            <i class="el-icon-loading" />&nbsp; &nbsp; &nbsp;
            <span>{{ $t("commons.status.synchronizing") }}</span>
          </div>
          <div v-if="row.status === 'Creating'">
            <i class="el-icon-loading" />&nbsp; &nbsp; &nbsp;
            <span>{{ $t("commons.status.creating") }}</span>
          </div>
          <div v-if="row.status === 'Waiting'">
            <i class="el-icon-loading" />&nbsp; &nbsp; &nbsp;
            <span>{{ $t("commons.status.waiting") }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180px">
        <template v-slot:default="{ row }">
          {{ row.createdAt | datetimeFormat }}
        </template>
      </el-table-column>

      <fu-table-operations
        v-if="isAdmin"
        fixed="right"
        :buttons="buttons"
        :label="$t('commons.table.action')"
        fix
      />
    </complex-table>

    <el-dialog
      :title="$t('commons.button.sync')"
      width="30%"
      :visible.sync="dialogSyncVisible"
    >
      <span>{{ $t("host.ensure_host_sync") }}</span>
      <ul
        style="margin-left: 5%"
        :key="host.name"
        v-for="host of hostSelections"
      >
        <li>{{ host.name }} ({{ host.ip }})</li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSyncVisible = false">{{
          $t("commons.button.cancel")
        }}</el-button>
        <el-button type="primary" @click="submitSync()">{{
          $t("commons.button.ok")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- <el-drawer
      :title="$t('host.detail')"
      :visible.sync="dialogDetailVisible"
      size="51%"
      class="node-detail"
    >
      <div>
        <span>{{ $t("host.base_info") }}</span>
        <div style="margin-top: 15px">
          <table style="width: 100%" class="myTable">
            <tr>
              <td>IP</td>
              <td>{{ currentHost.ip }}</td>
            </tr>
            <tr>
              <td>{{ $t("host.cpu") }}</td>
              <td>{{ currentHost.cpuCore }}</td>
            </tr>
            <tr>
              <td>{{ $t("host.gpu") }}</td>
              <td>{{ currentHost.gpuNum }}</td>
            </tr>
            <tr>
              <td>{{ $t("host.memory") }}</td>
              <td>{{ currentHost.memory }}</td>
            </tr>
            <tr>
              <td>{{ $t("host.os") }}</td>
              <td>{{ currentHost.os }}</td>
            </tr>
            <tr>
              <td>{{ $t("host.architecture") }}</td>
              <td>{{ currentHost.architecture }}</td>
            </tr>
            <tr>
              <td>{{ $t("commons.table.create_time") }}</td>
              <td>{{ currentHost.createdAt | datetimeFormat }}</td>
            </tr>
          </table>
        </div>
        <br />
        <span>{{ $t("host.disk_size") }}</span>
        <div style="margin-top: 15px">
          <el-table :data="currentHost.volumes" border style="width: 100%">
            <el-table-column prop="name" :label="$t('commons.table.name')" />
            <el-table-column prop="size" :label="$t('host.disk_size')" />
          </el-table>
        </div>
        <div v-if="currentHost.hasGpu">
          <span>{{ $t("host.disk_size") }}</span>
          <div style="margin-top: 15px">
            <el-table :data="currentHost.hasGpu" border style="width: 100%">
              <el-table-column
                prop="gpuInfo"
                :label="$t('commons.table.name')"
              />
            </el-table>
          </div>
        </div>
      </div>
    </el-drawer> -->

    <el-dialog
      :title="$t('host.err_title')"
      width="30%"
      :visible.sync="dialogErrorVisible"
    >
      <span>{{ errMsg | errorFormat }}</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogErrorVisible = false">{{
          $t("commons.button.cancel")
        }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('commons.button.batch_import')"
      width="66.7%"
      :visible.sync="dialogImportVisible"
      class="import"
    >
      <el-form>
        <div class="item">
          <div class="title">1. 下载导入模板</div>
          <div class="content">根据提示信息完成表格内容</div>
          <el-button icon="el-icon-download" @click="download()"
            >下载空白模板</el-button
          >
        </div>
        <el-form-item class="item">
          <div class="title">2. 上传完善后的表格</div>
          <el-row type="flex" justify="center">
            <el-upload
              ref="my-upload"
              :on-change="onUploadChange"
              action=""
              :auto-upload="false"
              class="upload-demo"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <div class="subtitle">点击或将文件拖拽到这里上传</div>
                <div class="tip">
                  {{ $t("cluster.detail.backup.local_recover_tips") }}
                </div>
              </div>
              <div class="el-upload__tip" slot="tip">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icontishi11"></use>
                </svg>
              </div>
            </el-upload>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">{{
          $t("commons.button.cancel")
        }}</el-button>
        <el-button
          type="primary"
          :disabled="isUploadDisable"
          @click="onUploadFile()"
          >{{ $t("commons.button.ok") }}</el-button
        >
      </div>
    </el-dialog>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { deleteHost, searchVolume, syncHosts, importHosts } from "@/api/hosts";
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
      listRegistryAll().then(() => {
        this.$router.push({ name: "storageCreate" });
      });
    },
    sync() {
      this.dialogSyncVisible = true;
    },
    submitSync() {
      this.syncHostList = [];
      this.hostSelections.forEach((item) => {
        this.syncHostList.push({
          hostName: item.name,
          hostStatus: item.status,
        });
      });
      syncHosts(this.syncHostList)
        .then(() => {
          this.search();
          this.$message({
            type: "success",
            message: this.$t("host.start_host_sync"),
          });
          this.dialogSyncVisible = false;
          this.hostSelections = [];
        })
        .catch(() => {
          this.hostSelections = [];
        });
    },
    onUploadChange(file) {
      this.isUploadDisable = false;
      this.file = file;
    },
    onImport() {
      listRegistryAll().then(() => {
        this.dialogImportVisible = true;
        this.isUploadDisable = true;
        if (this.$refs["my-upload"]) {
          this.$refs["my-upload"].clearFiles();
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
      const startIndex = this.file.name.lastIndexOf(".");
      if (startIndex !== -1) {
        const fileType = this.file.name
          .substring(startIndex + 1, this.file.name.length)
          .toLowerCase();
        if (fileType !== "xlsx") {
          this.$message({
            type: "error",
            message: this.$t("host.not_support_format"),
          });
          this.dialogImportVisible = false;
          return;
        }
      } else {
        this.$message({
          type: "error",
          message: this.$t("host.not_support_format"),
        });
        this.dialogImportVisible = false;
        return;
      }
      const formData = new FormData();
      formData.append("file", this.file.raw);
      importHosts(formData).then(
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
    onDelete(name) {
      this.$confirm(
        this.$t("commons.confirm_message.delete"),
        this.$t("commons.message_box.prompt"),
        {
          confirmButtonText: this.$t("commons.button.confirm"),
          cancelButtonText: this.$t("commons.button.cancel"),
          type: "warning",
        }
      ).then(() => {
        const ps = [];
        if (name) {
          ps.push(deleteHost(name));
        } else {
          for (const item of this.hostSelections) {
            ps.push(deleteHost(item.name));
          }
        }
        Promise.all(ps)
          .then(() => {
            this.search();
            this.$message({
              type: "success",
              message: this.$t("commons.msg.delete_success"),
            });
            this.hostSelections = [];
          })
          .catch(() => {
            this.search();
            this.hostSelections = [];
          });
      });
    },
    onGrant() {
      this.$router.push({ name: "ProjectAuthorizationList" });
    },
    search(condition) {
      this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      searchVolume(currentPage, pageSize, condition)
        .then((data) => {
          this.loading = false;
          this.data = [...data.items];
          this.data.forEach((item) => {
            item.size = 0;
            item.volumes.forEach((item1) => {
              let unit = item1.size.replace(/[^a-zA-Z]/g, "");
              let number = item1.size.replace(/[^\d]/g, "");
              if (unit === "TB") {
                item.size = item.size + number * 1024 * 1024;
              } else if (unit === "GB") {
                item.size = item.size + number * 1024;
              } else if (unit === "MB") {
                item.size = item.size + number;
              }
            });
          });
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
          searchVolume(currentPage, pageSize).then((data) => {
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
  /deep/ .upload-demo {
    margin-top: 16px;
    width: 100%;
    .el-upload {
      width: 100%;
      height: 100%;
      .el-upload-dragger {
        height: 100%;
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
