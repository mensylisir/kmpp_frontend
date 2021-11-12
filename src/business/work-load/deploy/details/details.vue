<template>
  <div class="deploy-details">
    <div class="split-8"></div>
    <div class="mod-title">基本信息</div>
    <div class="mod-one" v-if="load">
      <svg class="icon deploy-icon" aria-hidden="true">
        <use xlink:href="#icon-deploymentlogo"></use>
      </svg>
      <span class="deploy-name">{{ deployInfo["metadata"].name }}</span>
    </div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">运行状态：</span
          ><span
            class="tag-content"
            v-if="deployInfo['status'].conditions[0].status == 'True'"
            style="margin-right: 6px"
            >{{ deployInfo["status"].conditions[0].type }}</span
          >
          <span
            class="tag-content"
            v-if="deployInfo['status'].conditions[1].status == 'True'"
            >{{ deployInfo["status"].conditions[1].type }}</span
          >
        </el-col>
        <el-col :span="8">
          <span class="tag-name">所属服务：</span
          ><span class="tag-content tag-content-active">{{
            deployInfo["metadata"].namespace
          }}</span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">集群信息：</span
          ><span class="tag-content">{{
            $route.params.clusterName
          }}</span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">副本数量：</span
          ><span class="tag-content">{{ deployInfo["status"].replicas }}</span>
        </el-col>
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
            moment(deployInfo["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">更新策略：</span
          ><span class="tag-content">{{
            deployInfo["spec"].strategy.type
          }}</span></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <!-- <el-col :span="8">
          <span class="tag-name">创建时间：</span
          ><span class="tag-content">{{
            moment(deployInfo["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">更新策略：</span
          ><span class="tag-content">{{
            deployInfo["spec"].strategy.type
          }}</span></el-col
        > -->
        <el-col :span="8">
          <span class="tag-name">注释：</span
          ><span class="tag-content tag-content-bg"
            >deployment.kubernetes.io/revision={{
              deployInfo["metadata"].annotations[
                "deployment.kubernetes.io/revision"
              ]
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
              v-for="(value, key, index) in deployInfo['metadata'].labels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">Selector：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in deployInfo['spec'].selector
                .matchLabels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
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
        <el-table-column prop="date" label="数据卷名称" min-width="399">
        </el-table-column>
        <el-table-column prop="name" label="挂载PVC" min-width="793">
        </el-table-column>
      </el-table>
    </div>
    <div class="split-8"></div>
    <div class="mod-title">实例内容器</div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">容器名称：</span
          ><span class="tag-content">{{
            deployInfo["spec"].template.spec.containers[0].name
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">容器端口名称：</span
          ><span class="tag-content">{{
            deployInfo["spec"].template.spec.containers[0].ports
              ? deployInfo["spec"].template.spec.containers[0].ports[0].name
              : "-"
          }}</span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">端口：</span
          ><span class="tag-content">{{
            deployInfo["spec"].template.spec.containers[0].ports
              ? deployInfo["spec"].template.spec.containers[0].ports[0]
                  .containerPort
              : "-"
          }}</span></el-col
        >
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">镜像：</span
          ><span class="tag-content">{{
            deployInfo["spec"].template.spec.containers[0].image
          }}</span
          ><span
            class="iconfont icon-copy-1"
            v-clipboard:copy="content"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">CPU request/limited：</span
          ><span class="tag-content"
            >{{
              deployInfo["spec"].template.spec.containers[0].resources.requests
                ? deployInfo["spec"].template.spec.containers[0].resources
                    .requests.cpu
                : "-"
            }}/{{
              deployInfo["spec"].template.spec.containers[0].resources.limits
                ? deployInfo["spec"].template.spec.containers[0].resources
                    .limits.cpu
                : "-"
            }}</span
          >
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">内存 request/limited：</span
          ><span class="tag-content"
            >{{
              deployInfo["spec"].template.spec.containers[0].resources.requests
                ? deployInfo["spec"].template.spec.containers[0].resources
                    .requests.memory
                : "-"
            }}/{{
              deployInfo["spec"].template.spec.containers[0].resources.limits
                ? deployInfo["spec"].template.spec.containers[0].resources
                    .limits.memory
                : "-"
            }}</span
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDeployItem } from "@/api/work-load/deploy";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getDeployItem,
      moment,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      content: "sdfidshfoshfuishfsjihjio",
      deployInfo: {},
      load: false,
    };
  },
  created() {
    this.getDeploy();
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
    async getDeploy() {
      this.load = false;
      const data = await this.getDeployItem(
        this.$route.params.clusterName,
        this.$route.params.namespace,
        this.$route.params.deployName
      );
      this.deployInfo = data || {};
      this.load = true;
      console.log(this.deployInfo, "deployInfo");
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
