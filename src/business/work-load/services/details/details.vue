<template>
  <div class="deploy-details">
    <div class="split-8"></div>
    <div class="mod-title">基本信息</div>
    <div class="mod-one" v-if="load">
      <svg class="icon deploy-icon" aria-hidden="true">
        <use xlink:href="#icon-servicelogo"></use>
      </svg>
      <span class="deploy-name">{{ servicesInfo["metadata"].name }}</span>
    </div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">运行状态：</span
          ><span
            class="iconfont icon-checkbox-circle-fill2 icon-checkbox-circle"
          ></span
          ><span class="tag-content" style="margin-right: 6px">Active</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">服务类型：</span
          ><span class="tag-content">{{
            servicesInfo["spec"].type
          }}</span></el-col
        >

        <el-col :span="8">
          <span class="tag-name">集群信息：</span
          ><span class="tag-content"
            >{{ $route.params.clusterName }}/{{
              servicesInfo["metadata"].namespace
            }}</span
          ></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">ClusterIP：</span
          ><span class="tag-content">{{ servicesInfo["spec"].clusterIP }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">Nodeport： </span
          ><span class="tag-content tag-content-active">{{
            servicesInfo["spec"].ports[0].nodePort
              ? servicesInfo["spec"].ports[0].nodePort
              : "-"
          }}</span></el-col
        >
        <el-col :span="8">
          <span class="tag-name">会话保持：</span
          ><span class="tag-content">{{
            servicesInfo["spec"].sessionAffinity
          }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">创建时间：</span
          ><span class="tag-content">{{
            moment(servicesInfo["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">更新时间：</span
          ><span class="tag-content">{{
            moment(servicesInfo["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">Endpoints：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in endpointList"
              :key="index"
              >{{ value.ip }}</span
            >
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">Labels：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in servicesInfo['metadata'].labels"
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
              v-for="(value, key, index) in servicesInfo['spec'].selector"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <span class="tag-name">注释：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in servicesInfo['metadata']
                .annotations"
              :key="index"
              style="white-space: normal"
              >{{ key }}:{{ value }}</span
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div class="split-8"></div>
    <div class="mod-title">服务端口</div>
    <div class="data-table" v-if="load">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F9FAFC' }"
      >
        <el-table-column prop="name" label="端口名称" min-width="260">
        </el-table-column
        ><el-table-column prop="protocol" label="端口协议" min-width="140">
        </el-table-column
        ><el-table-column prop="port" label="服务端口" min-width="264">
        </el-table-column
        ><el-table-column prop="targetPort" label="容器端口" min-width="264">
        </el-table-column>
        <el-table-column prop="nodePort" label="节点端口" min-width="264">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getServicesItem, getEndpointItem } from "@/api/work-load/services";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getServicesItem,
      getEndpointItem,
      moment,
      tableData: [],
      servicesInfo: {},
      load: false,
      endpointList: [],
    };
  },
  created() {
    this.getServices();
    this.getEndpoints();
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
    async getServices() {
      this.load = false;
      const data = await this.getServicesItem(
        this.$route.params.clusterName,
        this.$route.params.namespace,
        this.$route.params.servicesName
      );
      this.servicesInfo = data || {};
      this.tableData = this.servicesInfo.spec.ports
        ? this.servicesInfo.spec.ports
        : [];
      this.load = true;
    },

    async getEndpoints() {
      this.load = false;
      const data = await this.getEndpointItem(
        this.$route.params.clusterName,
        this.$route.params.namespace,
        this.$route.params.servicesName
      );

      this.endpointList = data.subsets ? data.subsets[0].addresses : [];
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
  .icon-checkbox-circle {
    font-size: 14px !important;
    color: #36b37e;
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
  align-items: baseline;
}

.cus-col {
  align-items: baseline;
}
</style>
