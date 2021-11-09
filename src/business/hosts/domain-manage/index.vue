<template>
  <layout-content header="域名管理">
    <div class="sel-action">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          <i class="el-icon-plus" style="margin-right: 4px"></i>添加域名<i
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="cus-dropdown">
          <el-dropdown-item disabled>域名类型</el-dropdown-item>
          <el-dropdown-item command="http">http</el-dropdown-item>
          <el-dropdown-item command="https">https</el-dropdown-item>
        </el-dropdown-menu> </el-dropdown
      ><el-select
        v-model="clusterCurrent"
        placeholder="请选择"
        @change="clusterChange"
      >
        <el-option
          v-for="item in clusterList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F9FAFC' }"
    >
      <el-table-column prop="domain" label="域名" min-width="304">
        <template slot-scope="scope">
          <span class="active-domain" @click="winOpen(scope.row)">{{
            scope.row.ishttps
              ? `https://${scope.row.hosts[0]}`
              : `http://${scope.row.hosts[0]}`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="host" label="host" min-width="338">
        <template slot-scope="scope">
          <span>{{ scope.row.hosts[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="namespace" label="Namespace" min-width="214">
      </el-table-column>
      <el-table-column prop="clustername" label="所属集群" min-width="224">
      </el-table-column>
      <el-table-column label="操作" min-width="112">
        <template slot-scope="scope">
          <span
            @click="handleClickEdit(scope.row)"
            class="iconfont icon-edit-line action-icon"
          ></span>
          <el-popconfirm title="确定删除吗？" @confirm="confirmDel(scope.row)"
            ><span
              class="iconfont icon-delete-line action-icon"
              slot="reference"
            ></span>
          </el-popconfirm> </template
      ></el-table-column>
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
import { getIngress, delIngress } from "@/api/domain-manage";
import "./index.scss";
export default {
  name: "",
  components: { LayoutContent },
  props: {},
  data() {
    return {
      searchClusters,
      getIngress,
      delIngress,
      clusterList: [],
      clusterCurrent: "all",
      tableData: [],
      tableDataAll: [],
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.getClusters();
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    winOpen(data) {
      const url = data.ishttps
        ? `https://${data.hosts[0]}`
        : `http://${data.hosts[0]}`;

      window.open(url, "_blank");
    },
    handleCommand(command) {
      this.$router.push({
        name: "domainCreate",
        params: {
          type: command,
        },
      });
    },
    clusterChange() {
      this.paginationConfig.currentPage = 1;
      if (this.clusterCurrent == "all") {
        this.tableDataAll = [];
        const promiseList = [];
        this.clusterList.forEach((items) => {
          if (items.value != "all") {
            promiseList.push(this.getIngressList(items.name, "all"));
          }
        });

        Promise.all(promiseList).then(() => {
          this.paginationConfig.total = this.tableDataAll.length;
          this.tableData = this.tableDataAll.slice(
            this.paginationConfig.currentPage - 1,
            this.paginationConfig.currentPage * this.paginationConfig.pageSize
          );
        });
      } else {
        this.getIngressList(this.clusterCurrent, "cluster");
      }
    },
    handleSizeChange() {
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
    },

    handleClickEdit(data) {
      this.$router.push({
        name: "domainEdit",
        params: {
          type: data.ishttps ? "https" : "http",
        },
        query: {
          clustername: data.clustername,
          namespace: data.namespace,
          ingressname: data.ingressname,
        },
      });
    },

    confirmDel(data) {
      this.deleteIngress(data.clustername, data.namespace, data.ingressname);
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
        const promiseList = [];
        this.clusterList.forEach((items) => {
          items.value = items.label = items.name;
          promiseList.push(this.getIngressList(items.name, "all"));
        });

        this.clusterList.unshift({
          label: "全部集群",
          value: "all",
        });

        Promise.all(promiseList).then(() => {
          this.paginationConfig.total = this.tableDataAll.length;
          this.tableData = this.tableDataAll.slice(
            this.paginationConfig.currentPage - 1,
            this.paginationConfig.currentPage * this.paginationConfig.pageSize
          );
        });
      });
    },

    async getIngressList(cluster, type) {
      const data = await this.getIngress(cluster, "");
      if (type == "all") {
        const arr = data.ingresses || [];
        arr.forEach((item) => {
          item.clustername = data.clustername;
        });
        this.tableDataAll = this.tableDataAll.concat(arr || []);
      } else if (type == "cluster") {
        const arr = data.ingresses || [];
        arr.forEach((item) => {
          item.clustername = data.clustername;
        });
        this.tableDataAll = arr || [];

        this.paginationConfig.total = this.tableDataAll.length;
        this.tableData = this.tableDataAll.slice(
          this.paginationConfig.currentPage - 1,
          this.paginationConfig.currentPage * this.paginationConfig.pageSize
        );
      }
    },

    async deleteIngress(clustername, namespace, ingressname) {
      const reBody = {
        clustername,
        namespace,
        ingressname,
      };
      await this.delIngress(reBody);
      this.clusterChange();
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
  /deep/.cus-sel {
    .el-input__inner {
      background: #5354bb;
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
