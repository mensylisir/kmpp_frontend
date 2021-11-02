<template>
  <div class="recommend">
    <div class="top">
      <div class="search">
        <div class="noti-header-1">
          <div class="option-item">
            <span class="option-title">所属集群：</span>
            <el-select
              v-model="cluster"
              filterable
              placeholder="请选择集群"
              @change="changeCluster"
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

          <div class="option-item">
            <span class="option-title">告警组：</span>
            <el-select
              v-model="currentNamespace"
              filterable
              placeholder="请选择应用"
              @change="changeNamespace"
            >
              <el-option
                v-for="item in namespacesList"
                :key="item['metadata'].name"
                :label="item['metadata'].name"
                :value="item['metadata'].name"
              >
              </el-option>
            </el-select>
          </div>

          <div class="option-item">
            <span class="option-title">告警等级：</span>
            <el-select
              v-model="currentPod"
              filterable
              placeholder="请选择组件"
              @change="changePod"
            >
              <el-option
                v-for="item in podList"
                :key="item['metadata'].name"
                :label="item['metadata'].name"
                :value="item['metadata'].name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="noti-header-2">
          <div class="option-item">
            <span class="option-title">查询条件：</span>
            <el-select
              v-model="currentQuery"
              filterable
              placeholder="支持 nodename/path/container,支持关键字查询,按回车确定,支持添加多个条件"
              multiple
              @change="changeQuery"
              @keydown.native="beginEnterQuery"
              ref="queryItem"
            >
              <el-option
                v-for="(item, index) in queryList"
                :key="item.value + index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button
              class="cus-btn"
              @click="beginQuery"
              :disabled="currentQuery.length == 0"
              >查询</el-button
            >
            <el-button @click="resetQuery" :disabled="currentQuery.length == 0"
              >重置</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="namespace" label="告警资源">
          <template slot-scope="scope">
            <span style="cursor: pointer" @click="goDetail(scope.row)">{{
              scope.row.namespace || "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cluster" label="告警描述" width="200">
        </el-table-column>
        <el-table-column prop="memoryUse" label="告警策略" width="280">
          <template slot-scope="scope">
            <div>{{ fixData(scope.row.memoryUse) }}Gi</div>
            <span class="bottom-text"
              >配额：{{ fixData(scope.row.memoryQuota) }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="container1" label="等级" width="120">
          <template slot-scope="scope">
            <span
              :class="
                scope.row.level === '严重' ? 'level-red' : 'level-warning'
              "
            >
              {{ scope.row.level || "--" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="告警状态" width="180">
          <template slot-scope="scope">
            <svg
              class="icon svg-icon"
              aria-hidden="true"
              v-if="scope.row.status === '已恢复'"
              style="color: #36b37e"
            >
              <use xlink:href="#icon-checkbox-circle-fill2"></use>
            </svg>
            <svg
              class="icon alert-icon"
              aria-hidden="true"
              v-else
              :class="{ 'alert-red': scope.row.status === '告警中' }"
            >
              <use xlink:href="#icon-alert"></use>
            </svg>
            <span>{{ scope.row.status || "活跃" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cpuCore" label="持续时间" sortable width="180">
          <template slot-scope="scope">
            <div>{{ fixData(scope.row.cpuCore) }}Core</div>
            <span class="bottom-text"
              >配额：{{ fixData(scope.row.cpuQuota) }}</span
            >
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
    <el-drawer
      title="告警详情"
      :visible.sync="drawer"
      class="drawer"
      size="51%"
    >
      <table style="width: 100%" class="myTable">
        <tr>
          <td>告警资源</td>
          <td>{{ currItem.ip }}</td>
        </tr>
        <tr>
          <td>告警等级</td>
          <td>
            <span
              :class="currItem.level === '严重' ? 'level-red' : 'level-warning'"
              >{{ currItem.cpuCore }}</span
            >
          </td>
        </tr>
        <tr>
          <td>告警状态</td>
          <td>
            <svg
              class="icon svg-icon"
              aria-hidden="true"
              v-if="currItem.status === '已恢复'"
              style="color: #36b37e"
            >
              <use xlink:href="#icon-checkbox-circle-fill2"></use>
            </svg>
            <svg
              class="icon alert-icon"
              aria-hidden="true"
              v-else
              :class="{ 'alert-red': currItem.status === '告警中' }"
            >
              <use xlink:href="#icon-alert"></use></svg
            >{{ currItem.gpuNum }}
          </td>
        </tr>
        <tr>
          <td>告警策略</td>
          <td>{{ currItem.memory }}</td>
        </tr>
        <tr>
          <td>告警描述</td>
          <td>{{ currItem.os }}</td>
        </tr>
        <tr>
          <td>触发时间</td>
          <td>{{ currItem.architecture }}</td>
        </tr>
        <tr>
          <td>持续时间</td>
          <td>{{ currItem.createdAt | datetimeFormat }}</td>
        </tr>
        <tr>
          <td>表达式</td>
          <td>{{ currItem.createdAt | datetimeFormat }}</td>
        </tr>
      </table>
    </el-drawer>
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
      drawer: false,
      currItem: {},
      page: {
        currentPage: 1,
        currSize: 10,
        size: [10, 20, 30, 40],
      },
      totalData: [],
      tableData: [
        {
          level: "一般",
          status: "未触发",
        },
        {
          level: "严重",
          status: "告警中",
        },
      ],
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
    // 详情
    goDetail(item) {
      this.drawer = true;
      this.currItem = item;
    },
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
      // this.tableData = this.totalData.filter((item, index) => {
      //   return (
      //     this.page.currSize * (this.page.currentPage - 1) <= index &&
      //     index < this.page.currSize * this.page.currentPage
      //   );
      // });
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
                  item.value.length === 0 || item.value[1] == 0
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
  height: calc(100vh - 175px);
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
  svg {
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
  .level-red {
    padding: 0 8px;
    font-size: 12px;
    color: #cf0a1e;
    background: #ffe8e6;
    border-radius: 2px;
  }
  .level-warning {
    padding: 0 8px;
    font-size: 12px;
    color: #d78700;
    background: #ffefcc;
    border-radius: 2px;
  }
  .alert-icon {
    color: #bcc0cc;
    width: 16px;
    height: 16px;
  }
  .alert-red {
    color: #cf0a1e;
  }
  .drawer {
    .content {
      margin: 24px;
    }
  }
  /deep/.el-drawer__header {
    box-shadow: 0 1px 0 0 #e4e7f0;
    padding: 17px 0 17px 24px;
    font-size: 14px;
    color: #2c2e33;
    line-height: 22px;
    font-weight: 500;
  }
  /deep/.el-drawer__body {
    margin: 0 24px 24px 24px;
  }
  .myTable {
    td {
      &:nth-child(2n) {
        font-weight: 500;
        font-size: 14px;
        color: #2c2e33;
        width: calc(100% - 180px);
        padding: 11px 0 11px 16px;
      }
      &:nth-child(2n + 1) {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
        background: #f9fafc;
        width: 180px;
        padding: 11px 0 11px 16px;
      }
    }
  }
  .noti-header-1 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 32px;

    margin-bottom: 16px;
    .option-item {
      display: flex;
      align-items: center;
      .option-title {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
        margin-right: 4px;
      }
      /deep/.el-select {
        // margin-bottom: 0 !important;
        flex: 1;
      }
    }
  }
  .noti-header-2 {
    margin-bottom: 24px;
    .option-item {
      display: flex;
      align-items: center;
      .option-title {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
        margin-right: 4px;
      }
      /deep/.el-select {
        // margin-bottom: 0 !important;
        flex: 1;
        margin-right: 8px;
      }
      .cus-btn {
        background: #5354bb;
        color: #ffffff;
      }
    }
  }
}
</style>
