<template>
  <layout-content header="Secret">
    <div class="sel-action">
      <div>
        <el-button
          type="primary"
          @click="createDeploy"
          v-permission="['ADMIN']"
        >
          <i class="el-icon-plus" style="margin-right: 4px"></i>Secret
        </el-button>
      </div>
      <div>
        <el-select
          v-model="clusterCurrent"
          placeholder="请选择"
          @change="clusterChange"
          style="margin-right: 8px"
          class="cus-select"
        >
          <el-option
            v-for="item in clusterList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
          <div slot="prefix" class="sel-prefix">集群：</div>
        </el-select>
        <el-select
          v-model="currentNamespace"
          placeholder="请选择"
          @change="changeNamespace"
          class="cus-select1"
        >
          <el-option
            v-for="item in namespacesList"
            :key="item['metadata'].name"
            :label="item['metadata'].name"
            :value="item['metadata'].name"
          >
          </el-option>
          <div slot="prefix" class="sel-prefix">命名空间：</div>
        </el-select>
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="正在删除，请稍后"
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F9FAFC' }"
    >
      <el-table-column prop="name" label="名称" min-width="200">
        <template slot-scope="scope">
          <span class="active-domain" @click="winOpen(scope.row)">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="namespace" label="命名空间" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.namespace }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="Labels" min-width="496">
        <template slot-scope="scope">
          <span v-if="scope.row.labels">
            <span
              class="labels"
              :key="item.label"
              v-for="item in formatLabels(scope.row.labels)"
            >
              {{ item.label }}:{{ item.value }}
            </span>
          </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="pod" label="创建时间" min-width="150">
        <template slot-scope="scope">
          <span>{{
            moment(scope.row.create_time).format("YYYY/MM/DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span
            v-permission="['ADMIN']"
            @click="handleClickEdit(scope.row)"
            class="iconfont icon-edit-line action-icon"
          ></span>
          <el-popconfirm title="确定删除吗？" @confirm="confirmDel(scope.row)"
            ><span
              v-permission="['ADMIN']"
              class="iconfont icon-delete-line action-icon"
              slot="reference"
            ></span>
          </el-popconfirm>
        </template>
        <template slot-scope="" slot="header">
          <span v-permission="['ADMIN']">操作</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-con">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paginationConfig.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="paginationConfig.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationConfig.total"
        background
      >
      </el-pagination>
    </div>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { searchClusters } from "@/api/cluster";
import { getSecret, delJob, getCronjob, delCronjob } from "@/api/secret";
import { listNamespace } from "@/api/cluster/namespace";
import "./index.scss";
import moment from "moment";
export default {
  name: "",
  components: { LayoutContent },
  props: {},
  data() {
    return {
      moment,
      searchClusters,
      getSecret,
      getCronjob,
      delJob,
      delCronjob,
      listNamespace,
      clusterList: [],
      clusterCurrent: "",
      currentNamespace: "全部", // 命名空间列表
      namespacesList: [], // 命名空间列表
      tableData: [],
      tableDataAll: [],
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      // 系统命名空间，禁止编辑
      disableNamespaceList: [
        "ingress-nginx",
        "istio-system",
        "kube-federation-system",
        "kube-node-lease",
        "kube-public",
        "kube-system",
        "kubeapps",
        "loki-stack",
        "monitoring",
        "permission-manager",
      ],
      statusMap: {
        Running: "执行中",
        Complete: "已完成",
        Failed: "已停止",
        Suspended: "已挂起",
      },
      loading: false,
    };
  },
  created() {
    this.getClusters();
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    formatLabels(val) {
      let keys = Object.keys(val);
      let values = Object.values(val);
      let result = [];
      keys.forEach((item, index) => {
        result.push({
          label: item,
          value: values[index],
        });
      });
      return result;
    },
    createDeploy() {
      this.$router.push({
        name: "secretCreate",
        params: {
          cluster: this.clusterCurrent,
        },
      });
    },
    winOpen(data) {
      this.$router.push({
        name: "secretDetailsMod",
        params: {
          clusterName: this.clusterCurrent,
          deployName: data.name,
          namespace: data.namespace,
        },
      });
    },
    clusterChange() {
      this.currentNamespace = "全部";
      this.getNamespace();
    },
    changeNamespace() {
      this.paginationConfig.currentPage = 1;
      if (this.currentNamespace == "全部") {
        this.getMapList(this.clusterCurrent, undefined);
      } else {
        this.getMapList(this.clusterCurrent, this.currentNamespace);
      }
    },
    handleSizeChange() {
      this.paginationConfig.currentPage = 1;
      this.tableData = this.tableDataAll.slice(
        0,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
    },
    handleCurrentChange() {
      this.tableData = this.tableDataAll.slice(
        (this.paginationConfig.currentPage - 1) *
          this.paginationConfig.pageSize,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
      console.log(this.tableData, "22");
    },

    handleClickEdit(data) {
      this.$router.push({
        name:
          this.disableNamespaceList.indexOf(data.namespace) != -1
            ? "secretDetailsMod"
            : "secretDetailsEdit",
        params: {
          clusterName: this.clusterCurrent,
          deployName: data.name,
          namespace: data.namespace,
        },
      });
    },
    async confirmDel(data) {
      await this.delJob({
        cluster_name: data.cluster_name,
        namespace: data.namespace,
        name: data.name,
      });

      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getMapList(
          this.clusterCurrent,
          this.currentNamespace === "全部" ? undefined : this.currentNamespace
        );
      }, 3000);
    },
    // ajax
    getClusters(condition) {
      this.tableDataAll = [];
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

        this.clusterCurrent = this.clusterList.length
          ? this.clusterList[0].name
          : "";

        this.getNamespace();
      });
    },

    async getMapList(cluster, namespace) {
      const data = await this.getSecret(cluster, namespace);
      this.tableDataAll = data || [];

      this.paginationConfig.total = this.tableDataAll.length;
      this.tableData = this.tableDataAll.slice(
        this.paginationConfig.currentPage - 1,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
    },

    async getNamespace() {
      // this.loading = true;
      const data = await this.listNamespace(this.clusterCurrent);
      this.namespacesList = data.items || [];
      this.namespacesList.unshift({
        metadata: {
          name: "全部",
        },
      });
      this.currentNamespace = "全部";
      // 获取列表
      this.getMapList(this.clusterCurrent, undefined);
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.sel-action {
  display: flex;
  justify-content: space-between;

  margin-bottom: 16px;
  /deep/.cus-select {
    .el-input__inner {
      padding-left: 38px;
    }
    .el-input__prefix {
      .sel-prefix {
        line-height: 32px;
      }
    }
  }
  /deep/.cus-select1 {
    .el-input__inner {
      padding-left: 68px;
    }
    .el-input__prefix {
      .sel-prefix {
        line-height: 32px;
      }
    }
  }
}
.active-domain {
  color: #5354bb;
  cursor: pointer;
}

.action-icon {
  margin-right: 14px;
  font-size: 16px !important;
  cursor: pointer;
  &:hover {
    color: #5354bb;
  }
}

.labels {
  font-size: 12px;
  color: #4b5059;
  line-height: 20px;
  font-weight: 400;
  margin-right: 8px;
  background: #eff1f5;
  border-radius: 2px;
  padding: 2px 6px;
}

.page-con {
  margin-top: 16px;
  text-align: right;
  /deep/.el-pagination {
    .btn-prev,
    .btn-next {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
    .el-pager {
      .number,
      .el-icon-more {
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
      }
      .active {
        background: #ffffff !important;
        border: 1px solid #5354bb !important;
        color: #5354bb !important;
      }
    }
  }
}

.task-button {
  background: #eff1f5;
  border: 1px solid #cbcfd9;
  border-radius: 4px;
  display: flex;
  width: 162px;
  margin-bottom: 16px;
  div {
    font-size: 16px;
    color: #797f8c;
    line-height: 31px;
    font-weight: 500;
    width: 50%;
    cursor: pointer;
    text-align: center;
  }
  .active {
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
}
.copy-icon {
  margin-left: 10px;
  color: #5354bb;
  cursor: pointer;
}

/deep/.el-table--small .el-table__cell {
  font-size: 14px;
  padding: 10.3px 0;
}
/deep/.el-table {
  border-right: none;
  border-bottom: none;
}
/deep/.el-table--border .el-table__cell {
  border-right: none;
}
</style>
