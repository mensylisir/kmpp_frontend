<template>
  <div class="deploy-details">
    <div class="split-8"></div>
    <div class="mod-title">基本信息</div>
    <div class="mod-one" v-if="load">
      <svg class="icon deploy-icon" aria-hidden="true">
        <use xlink:href="#icon-joblogo"></use>
      </svg>
      <span class="deploy-name">{{ deployInfo.name }}</span>
      <div class="job-count" v-if="currType === 'task'">
        <div class="item">
          <div>
            {{
              deployInfo.json_data["status"].active
                ? deployInfo.json_data["status"].active
                : 0
            }}
          </div>
          <span>运行</span>
        </div>
        <div class="space"></div>
        <div class="item">
          <div>
            {{
              deployInfo.json_data["spec"].parallelism
                ? deployInfo.json_data["spec"].parallelism
                : 0
            }}
          </div>
          <span>并行</span>
        </div>
        <div class="space"></div>
        <div class="item">
          <div>
            {{ completeCount }}
          </div>
          <span>完成</span>
        </div>
        <div class="space"></div>
        <div class="item">
          <div>
            {{ failCount }}
          </div>
          <span>失败</span>
        </div>
      </div>
    </div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8" v-if="currType === 'task'">
          <span class="tag-name">运行状态：</span>
          <span v-if="deployInfo.json_data['status'].active">
            <i class="iconfont icon-refresh-fill" style="color: #5354bb"></i>
            运行中
          </span>
          <span v-else-if="deployInfo.json_data['status'].conditions">
            <span
              v-if="
                deployInfo.json_data['status'].conditions[0].status == 'True'
              "
              style="margin-right: 6px"
            >
              <i
                style="color: #36b37e"
                class="iconfont icon-checkbox-circle-fill2"
                v-if="
                  deployInfo.json_data['status'].conditions[0].type ===
                  'Complete'
                "
              ></i>
              <i
                class="iconfont icon-refresh-fill"
                style="color: #5354bb"
                v-if="
                  deployInfo.json_data['status'].conditions[0].type ===
                  'Running'
                "
              ></i>
              <!-- 已停止 -->
              <i
                style="color: #cf0a1e"
                class="iconfont icon-checkbox-circle-fill"
                v-if="
                  deployInfo.json_data['status'].conditions[0].type === 'Failed'
                "
              ></i>
              <!-- 已挂起 -->
              <i
                style="color: #f59326"
                class="iconfont icon-safe-warning"
                v-if="
                  deployInfo.json_data['status'].conditions[0].type ===
                  'Suspended'
                "
              ></i>

              {{
                statusMap[deployInfo.json_data["status"].conditions[0].type]
              }}</span
            >
            <span
              v-if="
                deployInfo.json_data['status'].conditions[1] &&
                deployInfo.json_data['status'].conditions[1].status == 'True'
              "
            >
              <i
                style="color: #36b37e"
                class="iconfont icon-checkbox-circle-fill2"
                v-if="
                  deployInfo.json_data['status'].conditions[1].type ===
                  'Complete'
                "
              ></i>
              <i
                class="iconfont icon-refresh-fill"
                style="color: #5354bb"
                v-if="
                  deployInfo.json_data['status'].conditions[1].type ===
                  'Running'
                "
              ></i>
              <!-- 已停止 -->
              <i
                style="color: #cf0a1e"
                class="iconfont icon-checkbox-circle-fill"
                v-if="
                  deployInfo.json_data['status'].conditions[1].type === 'Failed'
                "
              ></i>
              <!-- 已挂起 -->
              <i
                style="color: #f59326"
                class="iconfont icon-safe-warning"
                v-if="
                  deployInfo.json_data['status'].conditions[1].type ===
                  'Suspended'
                "
              ></i>
              {{
                statusMap[deployInfo.json_data["status"].conditions[1].type]
              }}</span
            >
          </span>
          <span v-else>--</span>
        </el-col>
        <el-col :span="8" v-else>
          <span class="tag-name">运行状态：</span>
          <span class="tag-content">
            <span v-if="deployInfo.json_data['status'].active">
              <i
                style="color: #36b37e"
                class="iconfont icon-checkbox-circle-fill2"
              ></i>
              活动中
            </span>
            <span v-else>
              <!-- 已停止 -->
              <i style="color: #f59326" class="iconfont icon-safe-warning"></i>
              不活动
            </span>
          </span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">集群信息：</span
          ><span class="tag-content">{{
            $route.params.clusterName
          }}</span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">重启策略：</span
          ><span class="tag-content"
            >{{
              currType === "task"
                ? deployInfo.json_data["spec"].template.spec.restartPolicy ||
                  "--"
                : deployInfo.json_data["spec"].jobTemplate.spec.template.spec
                    .restartPolicy
            }}
          </span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <!-- <el-col :span="8">
          <span class="tag-name">副本数量：</span
          ><span class="tag-content">{{ deployInfo["status"].replicas }}</span>
        </el-col> -->
        <!-- <el-col :span="8">
          <span class="tag-name">CPU使用量：</span
          ><span class="tag-content"
            >containernamecontainernamecontainernamecontainernamecontainernamecontainernamecontainernamecontainername</span
          ></el-col
        > -->
        <!-- <el-col :span="8">
          <span class="tag-name">内存使用量：</span
          ><span class="tag-content"
            >containernamecontainernamecontainernamecontainernamecontainernamecontainernamecontainernamecontainername</span
          ></el-col
        > -->
        <el-col :span="8">
          <span class="tag-name">创建时间：</span
          ><span class="tag-content">{{
            moment(deployInfo.json_data["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
        <el-col :span="8" v-if="currType === 'task'">
          <span class="tag-name">重试次数：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"]
              ? deployInfo.json_data["spec"].parallelism
              : "--"
          }}</span></el-col
        >
         <el-col :span="8" v-if="currType === 'timeTask'">
          <span class="tag-name">保留完成Job数：</span
          ><span class="tag-content">{{
             deployInfo.successful_jobs_history_limit
              ?  deployInfo.successful_jobs_history_limit
              : "--"
          }}</span></el-col
        >
         <el-col :span="8" v-if="currType === 'timeTask'">
          <span class="tag-name">保留失败Job数：</span
          ><span class="tag-content">{{
            deployInfo.failed_jobs_history_limit
              ?  deployInfo.failed_jobs_history_limit
              : "--"
          }}</span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">注释：</span
          ><span class="tag-content tag-content-bg"
            >deployment.kubernetes.io/revision={{
              deployInfo.json_data["metadata"].annotations
                ? deployInfo.json_data["metadata"].annotations[
                    "deployment.kubernetes.io/revision"
                  ]
                : "--"
            }}</span
          ></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">Labels：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in deployInfo.json_data['metadata']
                .labels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">Selector：</span>
          <div
            class="tab-item-block"
            v-if="deployInfo.json_data['spec'].selector"
          >
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in deployInfo.json_data['spec']
                .selector.matchLabels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
          <div v-else>--</div>
        </el-col>
      </el-row>
    </div>
    <div class="split-8"></div>
    <div class="mod-title">数据卷</div>
    <div class="data-table" v-if="load">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F9FAFC' }"
      >
        <el-table-column prop="name" label="数据卷名称" min-width="399">
        </el-table-column>
        <el-table-column prop="pvc" label="挂载PVC" min-width="793">
          <template slot-scope="scope">
            <span>{{
              scope.row.persistentVolumeClaim
                ? scope.row.persistentVolumeClaim.claimName
                : "-"
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="split-8"></div>
    <div class="mod-title">实例内容器</div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24" v-if="currType === 'task'">
        <el-col :span="8">
          <span class="tag-name">容器名称：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].template
              ? deployInfo.json_data["spec"].template.spec.containers[0].name
              : "--"
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">镜像：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].template.spec.containers[0].image
          }}</span
          ><span
            class="iconfont icon-copy-1"
            v-clipboard:copy="
              deployInfo.json_data['spec'].template.spec.containers[0].image
            "
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </el-col>
        <!-- <el-col :span="8">
          <span class="tag-name">容器端口名称：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].template.spec.containers[0].ports
              ? deployInfo.json_data["spec"].template.spec.containers[0]
                  .ports[0].name
              : "-"
          }}</span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">端口：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].template.spec.containers[0].ports
              ? deployInfo.json_data["spec"].template.spec.containers[0]
                  .ports[0].containerPort
              : "-"
          }}</span></el-col
        > -->
      </el-row>

      <el-row :gutter="24" v-else>
        <el-col :span="8">
          <span class="tag-name">容器名称：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].jobTemplate.spec.template.spec
              ? deployInfo.json_data["spec"].jobTemplate.spec.template.spec
                  .containers[0].name
              : "--"
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">镜像：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].jobTemplate.spec.template.spec
              .containers[0].image
          }}</span
          ><span
            class="iconfont icon-copy-1"
            v-clipboard:copy="
              deployInfo.json_data['spec'].jobTemplate.spec.template.spec
                .containers[0].image
            "
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="16">
        <el-col :span="8">
          <span class="tag-name">端口协议：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].template.spec.containers[0].protocol ||
            "http"
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">镜像：</span
          ><span class="tag-content">{{
            deployInfo.json_data["spec"].template.spec.containers[0].image
          }}</span
          ><span
            class="iconfont icon-copy-1"
            v-clipboard:copy="
              deployInfo.json_data['spec'].template.spec.containers[0].image
            "
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">CPU request/limited：</span
          ><span class="tag-content"
            >{{
              deployInfo.json_data["spec"].template.spec.containers[0].resources
                .requests
                ? deployInfo.json_data["spec"].template.spec.containers[0]
                    .resources.requests.cpu
                : "-"
            }}/{{
              deployInfo.json_data["spec"].template.spec.containers[0].resources
                .limits
                ? deployInfo.json_data["spec"].template.spec.containers[0]
                    .resources.limits.cpu
                : "-"
            }}</span
          >
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">内存 request/limited：</span
          ><span class="tag-content"
            >{{
              deployInfo.json_data["spec"].template.spec.containers[0].resources
                .requests
                ? deployInfo.json_data["spec"].template.spec.containers[0]
                    .resources.requests.memory
                : "-"
            }}/{{
              deployInfo.json_data["spec"].template.spec.containers[0].resources
                .limits
                ? deployInfo.json_data["spec"].template.spec.containers[0]
                    .resources.limits.memory
                : "-"
            }}</span
          >
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import {
  getJobItem,
  newGetDeployItem,
  getCronjobItem,
} from "@/api/work-load/task";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getJobItem,
      getCronjobItem,
      newGetDeployItem,
      moment,
      tableData: [],
      content: "",
      deployInfo: {},
      load: false,
      statusMap: {
        Running: "执行中",
        Complete: "已完成",
        Failed: "已停止",
        Suspended: "已挂起",
      },
    };
  },
  created() {
    this.getJobDetail();
    // this.newGetDeploy();
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
    async getJobDetail() {
      this.load = false;
      if (this.currType === "task") {
        const data = await this.getJobItem(
          this.$route.params.clusterName,
          this.$route.params.namespace,
          this.$route.params.deployName
        );
        this.deployInfo = data[0] || {};
        this.tableData = this.deployInfo.json_data.spec.template.spec.volumes
          ? this.deployInfo.json_data.spec.template.spec.volumes
          : [];
      } else {
        const data = await this.getCronjobItem(
          this.$route.params.clusterName,
          this.$route.params.namespace,
          this.$route.params.deployName
        );
        this.deployInfo = data[0] || {};
        this.tableData = this.deployInfo.json_data.spec.jobTemplate.spec
          .template.spec
          ? this.deployInfo.json_data.spec.jobTemplate.spec.template.spec
              .volumes
          : [];
      }
      this.load = true;
      console.log(this.tableData, "deployInfo");
    },

    // async newGetDeploy() {
    //   this.load = false;
    //   const data = await this.newGetDeployItem(
    //     this.$route.params.clusterName,
    //     this.$route.params.namespace
    //   );
    //   this.deployInfo = data || {};
    //   this.tableData = this.deployInfo.spec.template.spec.volumes
    //     ? this.deployInfo.spec.template.spec.volumes
    //     : [];
    //   this.load = true;
    //   console.log(this.deployInfo, "deployInfo");
    // },
  },
  filter: {},
  computed: {
    completeCount() {
      let result = 0;
      if (this.load && this.deployInfo.json_data["status"].conditions) {
        result = this.deployInfo.json_data["status"].conditions.filter(
          (item) => {
            return item.status === "True" && item.type === "Complete";
          }
        ).length;
      }
      return result;
    },
    failCount() {
      let result = 0;
      if (this.load && this.deployInfo.json_data["status"].conditions) {
        result = this.deployInfo.json_data["status"].conditions.filter(
          (item) => {
            return item.status === "True" && item.type === "Failed";
          }
        ).length;
      }
      return result;
    },
    currType: {
      get: function () {
        let value = this.$route.params.currType;
        return value;
      },
      set: function () {},
    },
  },
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

  .mod-two {
    padding: 16px 24px;
    padding-top: 0;
    background: #fff;
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
}
.job-count {
  display: flex;
  align-items: center;
  margin-left: 24px;
  .item {
    padding: 0 16px;
    div {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }
  }
  .space {
    height: 32px;
    width: 1px;
    background: #e4e7f0;
  }
  span {
    font-size: 12px;
    color: #797f8c;
    line-height: 20px;
    font-weight: 400;
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
