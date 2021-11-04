<template>
  <div class="recommend">
    <div class="top">
      <div style="width: 100%">
        <div class="noti-header-1">
          <div class="option-item">
            <span class="option-title">所属集群：</span>
            <el-select
              v-model="cluster"
              clearable
              placeholder="请选择集群"
              @change="changeCluster"
            >
              <el-option
                v-for="item in clusterList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </div>

          <div class="option-item">
            <span class="option-title">告警组：</span>
            <el-select
              v-model="currentGroup"
              filterable
              placeholder="请选择告警组"
              @change="changeGroup"
            >
              <el-option
                v-for="item in groupList"
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
              v-model="currentLevel"
              clearable
              placeholder="请选择告警等级"
              @change="changeLevel"
            >
              <el-option label="一般" value="info"> </el-option>
              <el-option label="警告" value="warning"> </el-option>
              <el-option label="致命" value="critical"> </el-option>
            </el-select>
          </div>
          <div class="option-item">
            <span class="option-title">告警状态：</span>
            <el-select
              v-model="currentStatus"
              clearable
              placeholder="请选择告警状态"
              @change="changeStatus"
            >
              <el-option label="告警中" value="firing"> </el-option>
              <el-option label="未触发" value="inactive"> </el-option>
              <el-option label="已激活" value="pending"> </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="告警策略">
          <template slot-scope="scope">
            <span
              style="cursor: pointer; color: #5354bb"
              @click="goDetail(scope.row)"
              >{{ scope.row.labels.alertname || "--" }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="" label="告警描述" width="280">
          <template slot-scope="scope">
            <span style="cursor: pointer">{{
              scope.row.annotations.description || "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="memoryUse" label="告警组" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.memoryUse || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="等级" width="120">
          <template slot-scope="scope">
            <span
              :class="
                scope.row.labels.severity === 'info'
                  ? 'level-warning'
                  : scope.row.labels.severity === 'none'
                  ? 'level-none'
                  : 'level-red'
              "
            >
              {{ levelMap[scope.row.labels.severity] || "--" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="告警状态" width="130">
          <template slot-scope="scope">
            <svg
              class="icon alert-icon"
              aria-hidden="true"
              :class="{
                'alert-red': scope.row.state === 'firing',
                'alert-yello':
                  scope.row.state === 'pending',
              }"
            >
              <use xlink:href="#icon-alert"></use>
            </svg>
            <span>{{
              scope.row.state === "firing"
                ? "告警中"
                : (scope.row.state === "pending" ? "已激活" : "未触发") || "--"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activeAt" label="触发时间" sortable width="180">
          <template slot-scope="scope">
            <span>{{ rTime(scope.row.activeAt) }}</span>
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
          :total="totalData.length"
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
          <td>告警策略</td>
          <td>{{ currItem.labels.alertname || "--" }}</td>
        </tr>
        <tr>
          <td>告警等级</td>
          <td>
            <span
              :class="
                currItem.labels.severity === 'info'
                  ? 'level-warning'
                  : currItem.labels.severity === 'none'
                  ? 'level-none'
                  : 'level-red'
              "
              >{{ levelMap[currItem.labels.severity] }}</span
            >
          </td>
        </tr>
        <tr>
          <td>告警状态</td>
          <td>
            <svg
              class="icon alert-icon"
              aria-hidden="true"
              :class="{
                'alert-red': currItem.state === 'firing',
                'alert-yello': currItem.state === '已激活',
              }"
            >
              <use xlink:href="#icon-alert"></use></svg
            >{{
              currItem.state === "firing"
                ? "告警中"
                : (currItem.state === "pending" ? "未触发" : "已激活") || "--"
            }}
          </td>
        </tr>
        <tr>
          <td>告警组</td>
          <td>{{ "--" }}</td>
        </tr>
        <tr>
          <td>告警描述</td>
          <td>{{ currItem.annotations.description }}</td>
        </tr>
        <tr>
          <td>告警总结</td>
          <td>{{ currItem.annotations.summary }}</td>
        </tr>
        <tr>
          <td>触发时间</td>
          <td>{{ rTime(currItem.activeAt) }}</td>
        </tr>
        <tr>
          <td>持续时间</td>
          <td>{{ "--" }}</td>
        </tr>
        <tr>
          <td>表达式</td>
          <td>{{ "--" }}</td>
        </tr>
      </table>
    </el-drawer>
  </div>
</template>

<script>
import { getTableData } from "@/api/appWarning";
import { searchClusters } from "@/api/cluster";

export default {
  name: "MiddleStore",
  components: {},
  data() {
    return {
      drawer: false,
      currItem: {
        labels: {
          alertname: "",
        },
        annotations: {},
      },
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
          status: "firing",
        },
      ],
      levelMap: {
        info: "一般",
        warning: "警告",
        critical: "致命",
      },
      cluster: "", // 当前选中的集群
      clusterList: [], // 集群列表
      currentGroup: "", // 当前选择告警组
      currentStatus: "", // 当前选中状态
      statusList: [], // 状态列表
      groupList: [], // 命名空间列表
      currentLevel: "", // 当前选择告警等级
      levelList: [], // pod列表
      currentQuery: "", // 当前查询条件
    };
  },
  props: [""],
  methods: {
    rTime(timestamp) {
      if (timestamp) {
        let date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000);
        date = date.toJSON();
        date = date.substring(0, 19).replace("T", " ");
        return date;
      } else {
        return "";
      }
    },
    changeCluster() {
      this.getTableData(this.cluster);
    },
    changeGroup() {},
    changeLevel() {
      this.filterData();
    },
    changeStatus() {
      this.filterData();
    },
    // 详情
    goDetail(item) {
      this.drawer = true;
      this.currItem = item;
    },
    // 数据分页
    pageration(result) {
      this.tableData = result.filter((item, index) => {
        return (
          this.page.currSize * (this.page.currentPage - 1) <= index &&
          index < this.page.currSize * this.page.currentPage
        );
      });
    },
    filterData() {
      let result = this.totalData;
      if (this.cluster) {
        result = result.filter((item) => {
          return item.cluster === this.cluster;
        });
      }
      if (this.currentStatus) {
        result = result.filter((item) => {
          return item.state === this.currentStatus;
        });
      }
      if (this.currentLevel) {
        result = result.filter((item) => {
          return item.labels.severity === this.currentLevel;
        });
      }
      this.pageration(result);
    },
    handleSizeChange(val) {
      this.page.currSize = val;
      this.page.currentPage = 1;
      this.filterData();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.filterData();
    },
    // 获取集群信息
    getCluester() {
      searchClusters(1, 1000, "")
        .then((data) => {
          this.clusterList = data.items.filter((item) => {
            return item.source === "local";
          });
          this.clusterList.forEach((item) => {
            this.getTableData(item.name);
          });
        })
        .catch(() => {});
    },
    // 获取列表
    getTableData(cluster) {
      getTableData(cluster)
        .then((data) => {
          this.totalData = data.data.alerts || [];
          this.totalData.forEach((item) => {
            item.cluster = cluster;
          });
          console.log(this.totalData, "1");
          this.filterData();
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
  min-height: calc(100vh - 175px);
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
  .level-none {
    color: #2c2e33;
    background: unset;
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
  .alert-yello {
    color: #d78700;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
}
</style>
