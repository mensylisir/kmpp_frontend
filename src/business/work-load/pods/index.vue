<template>
  <layout-content header="Pods">
    <div class="sel-action">
      <!-- <el-button type="primary" @click="createPods">
        <i class="el-icon-plus" style="margin-right: 4px"></i>部署
      </el-button> -->
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
      <el-table-column prop="name" label="名称" min-width="200">
        <template slot-scope="scope">
          <span class="active-domain" @click="winOpen(scope.row)">{{
            scope.row["metadata"].name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="96">
        <template slot-scope="scope">
          <span
            class="iconfont icon-time status-icon"
            style="color: #5354bb"
            v-if="scope.row['status'].phase == 'Running'"
          ></span
          ><span
            class="iconfont icon-safe-warning status-icon"
            style="color: #f59326"
            v-if="scope.row['status'].phase == 'Pending'"
          ></span
          ><span
            class="iconfont icon-checkbox-circle-fill2 status-icon"
            style="color: #36b37e"
            v-if="scope.row['status'].phase == 'Completed'"
          ></span
          ><span>{{
            scope.row["status"].phase == "Running"
              ? "运行中"
              : scope.row["status"].phase == "Pending"
              ? "挂起"
              : scope.row["status"].phase == "Completed"
              ? "已完成"
              : scope.row["status"].phase
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="container" label="运行容器" min-width="88">
        <template slot-scope="scope">
          <span
            >{{ scope.row.containerReday }}/{{ scope.row.containerTotal }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="hostIP" label="节点" min-width="178">
        <template slot-scope="scope">
          <span
            >{{ scope.row.spec.nodeName }}({{
              scope.row["status"].hostIP
            }})</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="image" label="镜像" min-width="400">
        <template slot-scope="scope">
          <span>{{ scope.row["status"].containerStatuses[0].image }}</span>
          <span
            class="iconfont icon-copy-1"
            v-clipboard:copy="scope.row['status'].containerStatuses[0].image"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </template>
      </el-table-column>
      <el-table-column prop="pod" label="创建时间" min-width="166">
        <template slot-scope="scope">
          <span>{{
            moment(scope.row["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="64">
        <template slot-scope="scope">
          <!-- <span
            @click="handleClickEdit(scope.row)"
            class="iconfont icon-edit-line action-icon"
          ></span> -->
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
import { getPods, delPods } from "@/api/work-load/pods";
import { listNamespace } from "@/api/cluster/namespace";
import moment from "moment";
import "./index.scss";
export default {
  name: "",
  components: { LayoutContent },
  props: {},
  data() {
    return {
      searchClusters,
      getPods,
      delPods,
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
    createPods() {
      this.$router.push({
        name: "deployCreate",
        params: {
          cluster: this.clusterCurrent,
        },
      });
    },
    winOpen(data) {
      this.$router.push({
        name: "podsDetailsMod",
        params: {
          clusterName: this.clusterCurrent,
          podsName: data["metadata"].name,
          namespace: data["metadata"].namespace,
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
        this.getPodsList(this.clusterCurrent, undefined);
      } else {
        this.getPodsList(this.clusterCurrent, this.currentNamespace);
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

    handleClickEdit(data) {
      this.$router.push({
        name:
          this.disableNamespaceList.indexOf(data["metadata"].namespace) != -1
            ? "podsDetailsCheck"
            : "podsDetailsEdit",
        params: {
          clusterName: this.clusterCurrent,
          deployName: data["metadata"].name,
          namespace: data["metadata"].namespace,
        },
      });
    },

    confirmDel(data) {
      const reBody = {
        clusterName: this.clusterCurrent,
        name: data.metadata.name,
        namespace: data.metadata.namespace,
      };
      this.deletePods(reBody);
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

    async getPodsList(cluster, namespace) {
      const data = await this.getPods(cluster, namespace);
      this.tableDataAll = data || [];
      this.tableDataAll.forEach((item) => {
        item.containerTotal = item.status.containerStatuses.length;
        const arr = item.status.containerStatuses.filter((con) => {
          return con.ready == true;
        });
        item.containerReday = arr.length;
      });
      // console.log(data, "deploylist");
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
      this.getPodsList(this.clusterCurrent, undefined);
    },

    async deletePods(data) {
      await this.delPods(data);

      this.changeNamespace();
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
  justify-content: flex-end;

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

.status-icon {
  font-size: 16px !important;
  margin-right: 4px;
}
</style>
