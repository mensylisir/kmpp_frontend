<template>
  <div class="recommend">
    <div class="top">
      <h4>用量排行列表</h4>
      <div>
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in sortOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <!-- <el-button icon="el-icon-edit" @click="sort"></el-button>
        <el-button icon="el-icon-refresh-right" @click="reset"></el-button> -->
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="namespace" label="项目">
          <template slot-scope="scope">
            <span style="color: #5354bb">{{
              scope.row.namespace || "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cluster" label="所属集群" width="150">
        </el-table-column>
        <el-table-column prop="name" label="状态" width="100">
          <template slot-scope="scope">
            <svg class="icon svg-icon" aria-hidden="true" v-if="scope.row.status === '异常'" style="color: #CF0A1E">
              <use xlink:href="#icon-checkbox-circle-fill"></use>
            </svg>
                <svg class="icon svg-icon" aria-hidden="true" v-else style="color: #36B37E">
              <use xlink:href="#icon-checkbox-circle-fill2"></use>
            </svg>
            <span>{{ scope.row.status || "活跃"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cpuCore" label="CPU使用量" sortable width="150">
          <template slot-scope="scope">
            <div>{{ fixData(scope.row.cpuCore) }}Core</div>
            <span class="bottom-text"
              >配额：{{ fixData(scope.row.cpuQuota) }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="memoryUse"
          label="内存使用量"
          sortable
          width="150"
        >
          <template slot-scope="scope">
            <div>{{ fixData(scope.row.memoryUse) }}Gi</div>
            <span class="bottom-text"
              >配额：{{ fixData(scope.row.memoryQuota) }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="storage" label="存储使用量" sortable width="150">
          <template slot-scope="scope">
            <span>{{ fixData(scope.row.storage) }}Gi</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="container1"
          label="容器组数量"
          sortable
          width="120"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.container1 || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="networkthrout"
          label="网络流出速率"
          sortable
          width="150"
        >
          <template slot-scope="scope">
            <span>{{ fixData(scope.row.networkthrout) }}Mbps</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="networkflow"
          label="网络流入速率"
          sortable
          width="150"
        >
          <template slot-scope="scope">
            <span>{{ fixData(scope.row.networkflow) }}Mbps</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="page.size"
          :page-size="page.currSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getTableParam } from "@/api/appWatch";
import { searchClusters } from "@/api/cluster";

export default {
  name: "MiddleStore",
  components: {},
  data() {
    return {
      page: {
        currentPage: 1,
        currSize: 10,
        size: [10, 20, 30, 40],
      },
      totalData: [],
      tableData: [],
      // CPU占用核心数,CPU配额数,内存占用,内存配额,容器组数量,网络流入量,单位M,网络流出量,单位M,存储
      queryParams: [
        {
          attribute: "cpuCore",
          value:
            "sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{namespace=~'.*'}) by (namespace)",
        },
        {
          attribute: "cpuQuota",
          value:
            "sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{namespace=~'.*'}) by (namespace) ",
        },
        {
          attribute: "memoryUse",
          value:
            "sum(cluster:namespace:pod_memory:active:kube_pod_container_resource_requests{namespace=~'.*'}) by (namespace) / 2014 / 1024 / 1024",
        },
        {
          attribute: "memoryQuota",
          value:
            "sum(cluster:namespace:pod_memory:active:kube_pod_container_resource_limits{namespace=~'.*'}) by (namespace)/ 2014 / 1024 / 1024",
        },
        {
          attribute: "container1",
          value:
            "count(node_namespace_pod:kube_pod_info:{namespace=~'.*'}) by (namespace)",
        },
        {
          attribute: "networkflow",
          value:
            "sum(irate(container_network_receive_bytes_total{namespace=~'.*'}[5m]) > 0) by (namespace) / 1024 / 1024",
        },
        {
          attribute: "networkthrout",
          value:
            "sum(irate(container_network_transmit_bytes_total{namespace=~'.*'}[5m]) > 0)by (namespace) / 1024 / 1024",
        },
        {
          attribute: "storage",
          value:
            "sum(kube_persistentvolumeclaim_resource_requests_storage_bytes{namespace=~'.*'}) by (namespace) / 1024 / 1024 / 1024",
        },
        {
          attribute: "status",
          value:
            "count(kube_pod_status_phase{phase='Running', namespace=~'.*'} == 0) by (namespace) unless count(kube_job_info{namespace=~'.*'}) by (namespace)",
        },
      ],
    };
  },
  props: [""],
  methods: {
    // 格式化数据
    fixData(val) {
      let result = "--";
      if (val) {
        result = val.toFixed(2);
      }
      return result;
    },
    // 数据分页
    pageration() {
      this.tableData = this.totalData.filter((item, index) => {
        return (
          this.page.currSize * (this.page.currentPage - 1) <= index &&
          index < this.page.currSize * this.page.currentPage
        );
      });
      console.log(this.tableData);
    },
    handleSizeChange(val) {
      this.page.currSize = val;
      this.page.currentPage = 1;
      this.pageration();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.pageration();
    },
    sort() {},
    reset() {},
    // 获取集群信息
    getCluester() {
      searchClusters(1, 1000, "")
        .then((data) => {
          this.clusterList = data.items.filter((item) => {
            return item.source === "local";
          });
          this.getTableData();
        })
        .catch(() => {});
    },
    // 获取表格数据
    getTableData() {
      this.clusterList.forEach((item) => {
        this.queryParams.forEach((params) => {
          this.getTableParam(item.name, params);
        });
      });
    },
    // 获取列表
    getTableParam(cluster, params) {
      getTableParam(cluster, params.value)
        .then((data) => {
          const result = data.data.result || [];
          result.forEach((item) => {
            let index = this.totalData.findIndex((item1) => {
              return (
                item1.namespace === item.metric.namespace &&
                item1.cluster === cluster
              );
            });
            if (index === -1) {
              if (item.metric.namespace) {
                let tableItem = {
                  namespace: item.metric.namespace,
                  cluster: cluster,
                };
                if (params.attribute === "status") {
                  tableItem[params.attribute] =
                    item.value.length === 0 || item.value[1] == 0
                      ? "活跃"
                      : "异常";
                } else {
                  tableItem[params.attribute] = Number(item.value[1]);
                }
                this.totalData.push(tableItem);
              }
            } else {
              if (params.attribute === "status") {
                this.totalData[index][params.attribute] =
                  (item.value.length === 0 || item.value[1] == 0)
                    ? "活跃"
                    : "异常";
              } else {
                this.totalData[index][params.attribute] = Number(item.value[1]);
              }
            }
          });
          this.pageration();
        })
        .catch(() => {});
    },
  },
  created() {
    this.getCluester();
  },
};
</script>

<style scoped lang='scss'>
.recommend {
  background: white;
  padding: 24px;
  margin-top: 8px;
  height: calc(100% - 48px);
  .top {
    padding: 0 0 13px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      margin: 0;
    }
    .sort {
      margin: 0 16px 0 8px;
    }
  }
  .block {
    text-align: right;
    margin: 15px 0;
  }
  svg{
    width: 13.33px;
    height: 13.33px;
    margin-right: 5.33px;
  }
  /deep/ table {
    td {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
    }
  }
  .bottom-text {
    font-size: 12px;
    color: #797f8c;
    line-height: 20px;
    font-weight: 400;
  }
}
</style>
