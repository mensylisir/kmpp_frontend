<template>
  <layout-content header="">
    <div class="task-button">
      <div :class="{ active: currType === 'task' }" @click="currType = 'task'">
        任务
      </div>
      <div
        :class="{ active: currType === 'timeTask' }"
        @click="currType = 'timeTask'"
      >
        定时任务
      </div>
    </div>
    <div class="sel-action">
      <el-button type="primary" @click="createDeploy">
        <i class="el-icon-plus" style="margin-right: 4px"></i>任务
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
      v-loading="loading"
      element-loading-text="正在删除，请稍后"
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F9FAFC' }"
    >
      <el-table-column prop="domain" label="名称" min-width="200">
        <template slot-scope="scope">
          <span class="active-domain" @click="winOpen(scope.row)">{{
            scope.row.json_data["metadata"].name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="host" label="状态" min-width="128">
        <template slot-scope="scope">
          <span v-if="scope.row.json_data['status'].active">
            <i class="iconfont icon-refresh-fill" style="color: #5354bb"></i>
            运行中
          </span>
          <span v-else-if="scope.row.json_data['status'].conditions">
            <span
              v-if="
                scope.row.json_data['status'].conditions[0].status == 'True'
              "
              style="margin-right: 6px"
            >
              <i
                style="color: #36b37e"
                class="iconfont icon-checkbox-circle-fill2"
                v-if="
                  scope.row.json_data['status'].conditions[0].type ===
                  'Complete'
                "
              ></i>
              <i
                class="iconfont icon-refresh-fill"
                style="color: #5354bb"
                v-if="
                  scope.row.json_data['status'].conditions[0].type === 'Running'
                "
              ></i>
              <!-- 已停止 -->
              <i
                style="color: #cf0a1e"
                class="iconfont icon-checkbox-circle-fill"
                v-if="
                  scope.row.json_data['status'].conditions[0].type === 'Failed'
                "
              ></i>
              <!-- 已挂起 -->
              <i
                style="color: #f59326"
                class="iconfont icon-safe-warning"
                v-if="
                  scope.row.json_data['status'].conditions[0].type ===
                  'Suspended'
                "
              ></i>

              {{
                statusMap[scope.row.json_data["status"].conditions[0].type]
              }}</span
            >
            <span
              v-if="
                scope.row.json_data['status'].conditions[1] &&
                scope.row.json_data['status'].conditions[1].status == 'True'
              "
            >
              <i
                style="color: #36b37e"
                class="iconfont icon-checkbox-circle-fill2"
                v-if="
                  scope.row.json_data['status'].conditions[1].type ===
                  'Complete'
                "
              ></i>
              <i
                class="iconfont icon-refresh-fill"
                style="color: #5354bb"
                v-if="
                  scope.row.json_data['status'].conditions[1].type === 'Running'
                "
              ></i>
              <!-- 已停止 -->
              <i
                style="color: #cf0a1e"
                class="iconfont icon-checkbox-circle-fill"
                v-if="
                  scope.row.json_data['status'].conditions[1].type === 'Failed'
                "
              ></i>
              <!-- 已挂起 -->
              <i
                style="color: #f59326"
                class="iconfont icon-safe-warning"
                v-if="
                  scope.row.json_data['status'].conditions[1].type ===
                  'Suspended'
                "
              ></i>
              {{
                statusMap[scope.row.json_data["status"].conditions[1].type]
              }}</span
            >
          </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="namespace" label="命名空间" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.json_data["metadata"].namespace }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        label="镜像"
        min-width="496"
        v-if="currType === 'task'"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.json_data["spec"].template.spec.containers[0].image
          }}</span>
          <span
            class="iconfont icon-copy-1 copy-icon"
            v-clipboard:copy="scope.row.json_data['spec'].template.spec.containers[0].image"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pod"
        label="完成/期望Pod数量"
        min-width="130"
        v-if="currType === 'task'"
      >
        <template slot-scope="scope">
          <span
            >{{
              scope.row.json_data["status"].succeeded
                ? scope.row.json_data["status"].succeeded
                : 0
            }}/{{ scope.row.json_data["spec"].parallelism }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        label="定时规则"
        min-width="496"
        v-if="currType === 'timeTask'"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.json_data["spec"].template.spec.containers[0].image
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        label="正在运行任务数"
        min-width="300"
        v-if="currType === 'timeTask'"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.json_data["spec"].template.spec.containers[0].image
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="image"
        label="创建时间"
        min-width="496"
        v-if="currType === 'timeTask'"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.json_data["spec"].template.spec.containers[0].image
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="64">
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
import { getJob, delJob } from "@/api/work-load/task";
import { listNamespace } from "@/api/cluster/namespace";
import "./index.scss";
export default {
  name: "",
  components: { LayoutContent },
  props: {},
  data() {
    return {
      searchClusters,
      getJob,
      delJob,
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
      currType: "task",
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
    createDeploy() {
      this.$router.push({
        name: "taskCreate",
        params: {
          cluster: this.clusterCurrent,
        },
      });
    },
    winOpen(data) {
      this.$router.push({
        name: "taskDetailsMod",
        params: {
          clusterName: this.clusterCurrent,
          deployName: data.json_data["metadata"].name,
          namespace: data.json_data["metadata"].namespace,
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
        this.getJobList(this.clusterCurrent, undefined);
      } else {
        this.getJobList(this.clusterCurrent, this.currentNamespace);
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
          this.disableNamespaceList.indexOf(data.json_data["metadata"].namespace) != -1
            ? "taskDetailsCheck"
            : "taskDetailsEdit",
        params: {
          clusterName: this.clusterCurrent,
          deployName: data.json_data["metadata"].name,
          namespace: data.json_data["metadata"].namespace,
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
        this.getJobList(
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

    async getJobList(cluster, namespace) {
      const data = await this.getJob(cluster, namespace);
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
      // 获取列表
      this.getJobList(this.clusterCurrent, undefined);
    },
  },
  filter: {},
  computed: {},
  watch: {
    currType: {
      handler: function () {
        
        this.getClusters();
        console.log(this.currType);
      },
    },
  },
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
.copy-icon{
  margin-left: 10px;
  color:  #5354BB;
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
