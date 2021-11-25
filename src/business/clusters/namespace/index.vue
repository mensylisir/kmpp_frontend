<template>
  <layout-content header="命名空间">
    <div class="sel-action">
      <el-button type="primary" @click="createServices">
        <i class="el-icon-plus" style="margin-right: 4px"></i>命名空间
      </el-button>
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
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F9FAFC' }"
    >
      <el-table-column prop="name" label="名称" min-width="410">
        <template slot-scope="scope">
          <span class="active-domain" @click="winOpen(scope.row)">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="host" label="状态" min-width="239">
        <template slot-scope="scope">
          <span
            class="iconfont icon-checkbox-circle-fill2 icon-checkbox-circle"
          ></span
          ><span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="namespace" label="容器组数量" min-width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="创建时间" min-width="239">
        <template slot-scope="scope">
          <span>{{
            moment(scope.row.create_time).format("YYYY/MM/DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="64">
        <template slot-scope="scope">
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
    <NamespaceModal
      :namespaceObj="namespaceObj"
      @on-close="onClose"
    ></NamespaceModal>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { searchClusters } from "@/api/cluster";
import { getNamespaceList } from "@/api/cluster/namespace-details";
import { deleteNamespace, createNamespace } from "@/api/cluster/namespace";
import "./index.scss";
import moment from "moment";
import NamespaceModal from "./namespace-modal.vue";
export default {
  name: "",
  components: { LayoutContent, NamespaceModal },
  props: {},
  data() {
    return {
      searchClusters,
      getNamespaceList,
      deleteNamespace,
      createNamespace,
      moment,
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
      namespaceObj: {
        dialogVisible: false,
        cluster: "",
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
    createServices() {
      this.namespaceObj.cluster = this.clusterCurrent;
      this.namespaceObj.dialogVisible = true;
    },
    winOpen(data) {
      this.$router.push({
        name: "namespaceDetailsMod",
        params: {
          clusterName: data.clusterName,
          name: data.name,
        },
      });
    },
    // 复制
    onCopy: function () {
      this.$message({
        type: "success",
        message: "复制成功!",
      });
      // alert("复制成功： " + e.text);
    },
    onError: function () {
      this.$message({
        type: "error",
        message: "复制失败!",
      });
    },
    clusterChange() {
      this.paginationConfig.currentPage = 1;
      this.getNamespace();
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
    },

    confirmDel(data) {
      this.deleteNameSpaceItem(data);
    },

    onClose(flag, data) {
      if (flag) {
        // 请求namespace 列表数据
        // TODO
        console.log(data);
        const reBody = {
          apiVersion: "v1",
          kind: "Namespace",
          metadata: {
            name: data.namespace,
          },
        };
        this.createNamespaceItem(data.clustername, reBody);
      }
      this.namespaceObj.dialogVisible = false;
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

    async getNamespace() {
      // this.loading = true;
      const data = await this.getNamespaceList(this.clusterCurrent);
      this.tableDataAll = data || [];

      this.paginationConfig.total = this.tableDataAll.length;
      this.tableData = this.tableDataAll.slice(
        this.paginationConfig.currentPage - 1,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
    },

    async deleteNameSpaceItem(data) {
      await this.deleteNamespace(data.clusterName, data.name);

      this.clusterChange();
    },

    async createNamespaceItem(clusterName, data) {
      await this.createNamespace(clusterName, data);

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

.icon-checkbox-circle {
  font-size: 16px !important;
  color: #36b37e;
  margin-right: 4px;
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

.icon-copy-1 {
  font-size: 16px !important;
  color: #5354bb;
  cursor: pointer;
  margin-left: 8px;
}
</style>
