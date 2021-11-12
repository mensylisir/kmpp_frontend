<template>
  <div class="deploy-detail">
    <div class="top">
      <div class="detail">
        <span @click="goBack">告警策略 /</span>告警策略组详情
      </div>
      <div class="basic-info">
        <div class="title">
          <span>{{ currentItem.group || "--" }}</span>
        </div>
        <div class="text-info">
          <span>告警组状态：</span>
          <svg
            class="icon alert-icon alert-red"
            aria-hidden="true"
            v-if="getGroupStatus(currentItem) === '告警中'"
          >
            <use xlink:href="#icon-alert"></use>
          </svg>
          <svg
            class="icon alert-icon"
            aria-hidden="true"
            v-else
            style="color: #36b37e"
          >
            <use xlink:href="#icon-checkbox-circle-fill2"></use>
          </svg>
          <span>{{ getGroupStatus(currentItem) }}</span>
          <span style="margin-left: 24px">告警策略：</span>
          <svg class="icon alert-icon" aria-hidden="true">
            <use xlink:href="#icon-alert"></use>
          </svg>
          <span style="margin-right: 26px; color: #2c2e33"
            >未触发 {{ currentItem.inactivecount }}</span
          >
          <svg class="icon alert-icon alert-yello" aria-hidden="true">
            <use xlink:href="#icon-alert"></use>
          </svg>
          <span style="margin-right: 26px; color: #2c2e33"
            >已激活 {{ currentItem.Pendingcount }}</span
          >
          <svg class="icon alert-icon alert-red" aria-hidden="true">
            <use xlink:href="#icon-alert"></use>
          </svg>
          <span style="color: #2c2e33"
            >告警中 {{ currentItem.firingcount }}</span
          >
        </div>
      </div>
    </div>
    <div class="bottom">
      <h5>告警策略·{{ currentItem.rules ? currentItem.rules.length : 0 }}</h5>
      <div class="list">
        <el-table :data="currentItem.rules" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand inner-form"
              >
                <el-form-item label="表达式：">
                  <span>{{ props.row.query }}</span>
                </el-form-item>
                <el-form-item label="标签：">
                  <span class="label"
                    >severity:{{ props.row.severity }}</span
                  ></el-form-item
                >
                <el-form-item label="描述：">{{
                  props.row.description
                || "--"}}</el-form-item>
                <el-form-item label="总结：">{{
                  props.row.summary || "--"
                }}</el-form-item>
                <el-form-item
                  label=""
                  style="width: 100%"
                  class="inner-label"
                  v-if="props.row.alerts && props.row.alerts.length > 0"
                >
                  <el-table :data="props.row.alerts" style="width: 100%">
                    <el-table-column prop="" label="标签">
                      <template slot-scope="scope1">
                        <span class="label">
                          alertname={{ scope1.row.alertname || "--" }}
                        </span>
                        <span class="label">
                          namespace={{ scope1.row.alertnamespsce || "--" }}
                        </span>
                        <span class="label">
                          pod={{ scope1.row.alertpod || "--" }}
                        </span>
                        <span class="label">
                          severity={{ scope1.row.alertseverity || "--" }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="状态" width="150">
                      <template slot-scope="scope1">
                        <svg
                          class="icon alert-icon"
                          aria-hidden="true"
                          :class="{
                            'alert-red': scope1.row.alertstate === 'firing',
                            'alert-yello': scope1.row.alertstate === 'inactive',
                          }"
                        >
                          <use xlink:href="#icon-alert"></use>
                        </svg>
                        <span>{{ getStatus(scope1.row.alertstate) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="触发时间"
                      width="180"
                    >
                      <template slot-scope="scope1">
                        <span>{{ rTime(scope1.row.alerttime) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="值" width="150">
                      <template slot-scope="scope1">
                        <span>{{
                          getStatus(scope1.row.alertstate) === "告警中" ? 1 : 0
                        }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="策略名称" prop="name"> </el-table-column>
          <el-table-column label="活跃告警数" prop="alertcount" width="180">
          </el-table-column>
          <el-table-column label="等级" prop="name" width="180">
            <template slot-scope="scope">
              <span
                :class="
                  scope.row.severity === 'info'
                    ? 'level-warning'
                    : scope.row.severity === 'none'
                    ? 'level-none'
                    : 'level-red'
                "
              >
                {{ levelMap[scope.row.severity] || "--" }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="告警状态" prop="desc" width="180">
            <template slot-scope="scope">
              <svg
                class="icon alert-icon"
                aria-hidden="true"
                :class="{
                  'alert-red': scope.row.state === 'firing',
                  'alert-yello': scope.row.state === 'inactive',
                }"
              >
                <use xlink:href="#icon-alert"></use>
              </svg>
              <span>{{
                scope.row.state
                  ? scope.row.state === "firing"
                    ? "告警中"
                    : scope.row.state === "pending"
                    ? "未触发"
                    : "已激活"
                  : "--"
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getTotalData } from "@/api/appWarning";
import { searchClusters } from "@/api/cluster";
export default {
  name: "HostCreate",
  components: {},
  data() {
    return {
      currentItem: {}, //当前选中数据
      levelMap: {
        info: "一般",
        warning: "警告",
        critical: "致命",
      },
    };
  },
  computed: {},
  watch: {
    activeKey: {
      handler: function () {},
      deep: true,
    },
  },
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
    getGroupStatus(item) {
      if (item.firingcount && item.firingcount > 0) {
        return "告警中";
      }
      if (!item.firingcount && !item.Pendingcount) {
        return "正常";
      }
    },
    getStatus(item) {
      if (item === "firing") {
        return "告警中";
      } else if (item === "pending") {
        return "未触发";
      } else {
        return "已激活";
      }
    },
    goBack() {
      this.$router.push({ name: this.$route.params.backName });
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
      getTotalData(cluster)
        .then((data) => {
          let data1 = data || [];
          data1.forEach((item) => {
            item.cluster = cluster;
          });
          this.currentItem = data1.filter((item) => {
            return item.group === this.$route.params.groupname;
          })[0];
          console.log(this.currentItem);
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
.deploy-detail {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: white;
  h5 {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;
    margin: 0 0 16px 0;
    padding: 0;
  }
  .top {
    position: relative;
    padding: 16px 24px 0 24px;
    .detail {
      span {
        color: #797f8c;
        cursor: pointer;
      }
    }
    .detete {
      position: absolute;
      right: 16px;
      top: 54px;
    }
    .basic-info {
      border-bottom: 1px solid #e4e7f0;
      padding-bottom: 16px;

      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      .title {
        font-size: 16px;
        color: #2c2e33;
        line-height: 24px;
        font-weight: 500;
        margin: 16px 0;
        img {
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }
      }
      .text-info {
        span {
          font-size: 14px;
          color: #797f8c;
        }

        .text-bg {
          background: #dcdee4;
          padding: 0 4px;
          margin-right: 8px;
          border-radius: 2px;
        }
      }
    }
    svg {
      margin-right: 4px;
    }
  }
  .bottom {
    padding: 16px 24px;
    .list {
    }
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
    vertical-align: middle;
    margin-right: 6px;
  }
  .alert-red {
    color: #cf0a1e;
  }
  .alert-yello {
    color: #d78700;
  }
  /deep/.inner-form {
    background: #eff1f5;
    padding: 12px 16px;
    .el-form-item {
      display: block;
      vertical-align: middle;
      margin-bottom: 12px;
    }
    .el-form-item__label {
      font-size: 14px;
      color: #797f8c;
      line-height: 22px;
      font-weight: 400;
      padding: 0;
    }
    .el-form-item__content {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
    }
    .label {
      font-size: 12px;
      color: #2c2e33;
      line-height: 20px;
      font-weight: 400;
      background: #e0e0f0;
      border-radius: 2px;
      padding: 2px 4px;
      margin-right: 12px;
    }
    .inner-label {
      .el-form-item__content {
        width: 100%;
      }
    }
  }
  /deep/.el-table__expanded-cell {
    padding: 0 16px 16px 16px;
    border-bottom: 0;
  }
  /deep/.expanded {
    .el-table__cell {
      border-bottom: 0;
    }
  }
  /deep/.el-table {
    border: 0;
    th {
      background: #f9fafc;
    }
  }
}
</style>
