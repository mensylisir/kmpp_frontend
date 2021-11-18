<template>
  <layout-content header="服务">
    <div class="sel-action">
      <el-button type="primary" @click="createServices">
        <i class="el-icon-plus" style="margin-right: 4px"></i>服务
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
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F9FAFC' }"
    >
      <el-table-column prop="domain" label="名称" min-width="200">
        <template slot-scope="scope">
          <span class="active-domain" @click="winOpen(scope.row)">{{
            scope.row["metadata"].name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="host" label="状态" min-width="112">
        <template>
          <span
            class="iconfont icon-checkbox-circle-fill2 icon-checkbox-circle"
          ></span
          ><span>Active</span>
        </template>
      </el-table-column>
      <el-table-column prop="namespace" label="命名空间" min-width="104">
        <template slot-scope="scope">
          <span>{{ scope.row["metadata"].namespace }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="pod" label="运行/期望Pod数量" min-width="158">
        <template slot-scope="scope">
          <span
            >{{ scope.row["status"].readyReplicas }}/{{
              scope.row["status"].replicas
            }}</span
          >
        </template>
      </el-table-column> -->
      <el-table-column prop="serviceType" label="Service类型" min-width="118">
        <template slot-scope="scope">
          <span>{{ scope.row["spec"].type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" min-width="176">
        <template slot-scope="scope">
          <span>{{ scope.row["spec"].clusterIP }}</span>
          <span
            class="iconfont icon-copy-1"
            v-clipboard:copy="scope.row['spec'].clusterIP"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="创建时间" min-width="162">
        <template slot-scope="scope">
          <span>{{
            moment(scope.row["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="90">
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
import { getServices } from "@/api/work-load/services";
import { listNamespace } from "@/api/cluster/namespace";
import "./index.scss";
import moment from "moment";
export default {
  name: "",
  components: { LayoutContent },
  props: {},
  data() {
    return {
      searchClusters,
      getServices,
      listNamespace,
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
      this.$router.push({
        name: "servicesCreate",
        params: {
          cluster: this.clusterCurrent,
        },
      });
    },
    winOpen(data) {
      this.$router.push({
        name: "servicesDetailsMod",
        params: {
          clusterName: this.clusterCurrent,
          servicesName: data["metadata"].name,
          namespace: data["metadata"].namespace,
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
      this.currentNamespace = "全部";
      this.getNamespace();
    },
    changeNamespace() {
      this.paginationConfig.currentPage = 1;
      if (this.currentNamespace == "全部") {
        this.getServicesList(this.clusterCurrent, undefined);
      } else {
        this.getServicesList(this.clusterCurrent, this.currentNamespace);
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
    },

    handleClickEdit(data) {
      this.$router.push({
        name:
          this.disableNamespaceList.indexOf(data["metadata"].namespace) != -1
            ? "servicesDetailsCheck"
            : "servicesDetailsEdit",
        params: {
          clusterName: this.clusterCurrent,
          servicesName: data["metadata"].name,
          namespace: data["metadata"].namespace,
        },
      });
    },

    confirmDel() {
      // this.deleteIngress(data.clustername, data.namespace, data.ingressname);
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

    async getServicesList(cluster, namespace) {
      const data = await this.getServices(cluster, namespace);
      this.tableDataAll = data || [];
      console.log(data, "deploylist");
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

      // 获取列表
      this.getServicesList(this.clusterCurrent, undefined);
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
