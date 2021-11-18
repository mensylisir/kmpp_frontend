<template>
  <div class="deploy-details">
    <div class="split-8"></div>
    <div class="mod-title">基本信息</div>
    <div class="mod-one" v-if="load">
      <svg class="icon deploy-icon" aria-hidden="true">
        <use xlink:href="#icon-podlogo"></use>
      </svg>
      <span class="deploy-name">{{ podsInfo["metadata"].name }}</span>
    </div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">运行状态：</span>
          <span
            class="iconfont icon-time status-icon"
            style="color: #5354bb"
            v-if="podsInfo['status'].phase == 'Running'"
          ></span
          ><span
            class="iconfont icon-safe-warning status-icon"
            style="color: #f59326"
            v-if="podsInfo['status'].phase == 'Pending'"
          ></span
          ><span
            class="iconfont icon-checkbox-circle-fill2 status-icon"
            style="color: #36b37e"
            v-if="podsInfo['status'].phase == 'Completed'"
          ></span>
          <span class="tag-content">{{
            podsInfo["status"].phase == "Running"
              ? "运行中"
              : podsInfo["status"].phase == "Pending"
              ? "挂起"
              : podsInfo["status"].phase == "Completed"
              ? "已完成"
              : podsInfo["status"].phase
          }}</span>
        </el-col>

        <el-col :span="8">
          <span class="tag-name">集群信息：</span
          ><span class="tag-content"
            >{{ $route.params.clusterName }}/{{
              podsInfo["metadata"].namespace
            }}</span
          ></el-col
        >
        <el-col :span="8">
          <span class="tag-name">Node信息：</span
          ><span class="tag-content"
            >{{ podsInfo.spec.nodeName }} ({{
              podsInfo["status"].hostIP
            }})</span
          ></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">容器组IP：</span
          ><span class="tag-content">{{
            podsInfo["status"].podIP ? podsInfo["status"].podIP : "-"
          }}</span>
        </el-col>

        <el-col :span="8">
          <span class="tag-name">重启策略：</span
          ><span class="tag-content">{{ podsInfo["spec"].restartPolicy }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">重启总数：</span
          ><span class="tag-content">{{ podsInfo.restartCount }}</span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">创建时间：</span
          ><span class="tag-content">{{
            moment(podsInfo["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
        <el-col :span="16" class="cus-col">
          <span class="tag-name">Labels：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in podsInfo['metadata'].labels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div class="split-8"></div>
    <div class="pods-num" v-if="load">
      容器·{{ podsInfo.status.containerStatuses.length }}
    </div>
    <div
      class="mod-two-pods-border-bottom"
      v-for="(item, index) in podsInfo['status'].containerStatuses"
      :key="index"
    >
      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">容器名称：</span>
          <span class="tag-content">{{ item.name }}</span>
        </el-col>

        <el-col :span="8">
          <span class="tag-name">容器端口名称：</span
          ><span class="tag-content">-</span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">端口：</span
          ><span class="tag-content">-</span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">端口协议：</span
          ><span class="tag-content">-</span>
        </el-col>

        <el-col :span="8">
          <span class="tag-name">启动时间：</span
          ><span class="tag-content">{{
            item.state.waiting
              ? "-"
              : moment(
                  item.state.terminated
                    ? item.state.terminated.startedAt
                    : item.state.running.startedAt
                ).format("YYYY/MM/DD HH:mm:ss")
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">重启次数：</span
          ><span class="tag-content">{{ item.restartCount }}</span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">上次结束状态：</span
          ><span class="tag-content">
            {{
              item.lastState.terminated
                ? "已完成"
                : item.lastState.running
                ? "运行中"
                : item.lastState.waiting
                ? "挂起"
                : "未知"
            }}
          </span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">CPU request/limited：</span>
          <span class="tag-content">-</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">内存 request/limited：</span
          ><span class="tag-content">-</span>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">镜像：</span
          ><span class="tag-content">{{ item.image }}</span
          ><span
            class="iconfont icon-copy-1"
            v-clipboard:copy="item.image"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </el-col>
      </el-row>
    </div>

    <div class="split-8"></div>
    <div class="mod-title">存储挂载</div>
    <div class="data-table" v-if="load">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F9FAFC' }"
      >
        <el-table-column prop="name" label="名称" min-width="260">
        </el-table-column
        ><el-table-column
          prop="containersName"
          label="挂载容器"
          min-width="204"
        >
        </el-table-column
        ><el-table-column prop="pvc" label="类型" min-width="142">
        </el-table-column
        ><el-table-column prop="readOnly" label="读写权限" min-width="142">
          <template slot-scope="scope">
            <span>{{ scope.row.readOnly ? "只读" : "非只读" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mountPath" label="容器内路径" min-width="450">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="split-8"></div>
    <div class="mod-title">健康检查</div>
    <div class="mod-three" v-if="load">
      <div class="pods-info-item">
        <span
          class="iconfont icon-checkbox-circle-fill2 posd-status-icon"
        ></span>
        <div class="posd-item-right">
          <svg class="icon posd-item-icon" aria-hidden="true">
            <use xlink:href="#icon-deploymentlogo"></use>
          </svg>
          <div class="pods-title-sub">
            <div class="pods-title">PodScheduled</div>
            <div class="pods-sub">容器组已经被安排到一个节点中</div>
          </div>
        </div>
      </div>

      <div class="pods-info-item">
        <span
          class="iconfont icon-checkbox-circle-fill2 posd-status-icon"
        ></span>
        <div class="posd-item-right">
          <svg class="icon posd-item-icon" aria-hidden="true">
            <use xlink:href="#icon-deploymentlogo"></use>
          </svg>
          <div class="pods-title-sub">
            <div class="pods-title">PodScheduled</div>
            <div class="pods-sub">容器组已经被安排到一个节点中</div>
          </div>
        </div>
      </div>

      <div class="pods-info-item">
        <span
          class="iconfont icon-checkbox-circle-fill2 posd-status-icon"
        ></span>
        <div class="posd-item-right">
          <svg class="icon posd-item-icon" aria-hidden="true">
            <use xlink:href="#icon-deploymentlogo"></use>
          </svg>
          <div class="pods-title-sub">
            <div class="pods-title">PodScheduled</div>
            <div class="pods-sub">容器组已经被安排到一个节点中</div>
          </div>
        </div>
      </div>

      <div class="pods-info-item">
        <span
          class="iconfont icon-checkbox-circle-fill2 posd-status-icon"
        ></span>
        <div class="posd-item-right">
          <svg class="icon posd-item-icon" aria-hidden="true">
            <use xlink:href="#icon-deploymentlogo"></use>
          </svg>
          <div class="pods-title-sub">
            <div class="pods-title">PodScheduled</div>
            <div class="pods-sub">容器组已经被安排到一个节点中</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getPodsItem } from "@/api/work-load/pods";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getPodsItem,
      moment,
      tableData: [],
      podsInfo: {
        status: { containerStatuses: [] },
      },
      load: false,
    };
  },
  created() {
    this.getPods();
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

    // ajax
    async getPods() {
      this.load = false;
      const data = await this.getPodsItem(
        this.$route.params.clusterName,
        this.$route.params.namespace,
        this.$route.params.podsName
      );
      this.podsInfo = data || {};
      this.podsInfo.spec.containers.forEach((con) => {
        con.volumeMounts.forEach((vol) => {
          vol.containersName = con.name;
        });
        this.tableData = this.tableData.concat(con.volumeMounts);
      });
      this.tableData.forEach((table) => {
        const arr = this.podsInfo.spec.volumes.filter((vol) => {
          return vol.name == table.name;
        });
        // 默认是其他类型
        table.pvc = "其他v";
        if (arr.length) {
          table.pvc = arr[0].persistentVolumeClaim ? "pvc" : "其他";
        }
      });
      let count = 0;
      this.podsInfo.status.containerStatuses.forEach((item) => {
        count += item.restartCount;
      });
      this.podsInfo.restartCount = count;
      this.load = true;
      console.log(this.podsInfo, "podsInfo");
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.deploy-details {
  background: #fff;
  .split-8 {
    height: 8px;
    background: #edeff4;
  }
  .mod-title {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;
    padding: 16px 24px;
  }
  .data-table {
    background: #fff;

    padding: 16px 24px;
    padding-top: 0;
  }

  .mod-one {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 16px 24px;
    padding-top: 0;
    .deploy-icon {
      width: 56px;
      height: 56px;

      margin-right: 8px;
    }
    .deploy-name {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }
  }

  .pods-num {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;

    padding: 16px 24px;
    padding-bottom: 0;
  }

  .mod-two {
    padding: 16px 24px;
    padding-top: 0;
    background: #fff;
  }
  .mod-two-pods-border-bottom {
    margin: 16px 24px;
    margin-bottom: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #e4e7f0;
  }
  .tag-name {
    font-size: 14px;
    color: #797f8c;
    line-height: 22px;
    font-weight: 400;
  }
  .tab-item-block {
    display: flex;
    flex-wrap: wrap;
  }
  .status-icon {
    font-size: 14px !important;
    margin-right: 2px;
  }
  .tag-content {
    font-size: 12px;
    color: #2c2e33;
    line-height: 20px;
    font-weight: 400;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tag-content-bg {
    background: #eff1f5;
    padding: 0 4px;
    border-radius: 2px;
  }
  .tag-ml {
    margin-right: 4px;
    margin-bottom: 4px;
  }
  .tag-content-active {
    cursor: pointer;
    color: #5354bb;
  }

  .icon-copy-1 {
    font-size: 16px !important;
    color: #5354bb;
    cursor: pointer;
    margin-left: 8px;
  }

  .mod-three {
    padding: 16px 24px;
    padding-top: 0;
    background: #fff;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 12px;

    .pods-info-item {
      display: flex;
      align-items: center;

      border: 1px solid #e4e7f0;
      border-radius: 4px;
      height: 64px;
      padding-left: 16px;

      box-sizing: border-box;
      .posd-status-icon {
        font-size: 24px !important;
        margin-right: 15px;
        color: #36b37e;
      }
      .posd-item-right {
        display: flex;
        align-items: center;
        .posd-item-icon {
          width: 40px;
          height: 40px;

          margin-right: 8px;
        }
        .pods-title-sub {
          .pods-title {
            font-size: 16px;
            color: #2c2e33;
            line-height: 24px;
            font-weight: 500;
          }
          .pods-sub {
            font-size: 12px;
            color: #797f8c;
            line-height: 20px;
            font-weight: 400;
          }
        }
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
/deep/.el-row {
  margin-bottom: 14px;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }
}
/deep/.el-col {
  white-space: nowrap;

  display: flex;
  align-items: center;
}

.cus-col {
  align-items: baseline;
}
</style>
