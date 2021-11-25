<template>
  <div class="deploy-details">
    <div class="split-8"></div>
    <div class="mod-title">基本信息</div>
    <div class="mod-one" v-if="load">
      <svg class="icon deploy-icon" aria-hidden="true">
        <use xlink:href="#icon-configmaplogo"></use>
      </svg>
      <span class="deploy-name">{{ deployInfo.name }}</span>
    </div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8">
          <span>集群信息：</span
          ><span class=""
            >{{ $route.params.namespace }}/{{ $route.params.clusterName }}</span
          ></el-col
        >
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">创建时间：</span
          ><span>{{
            moment(deployInfo.create_time).format("YYYY/MM/DD HH:mm:ss")
          }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">Labels：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in deployInfo.labels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="split-8"></div>
    <div class="mod-title">配置数据</div>
    <div class="data-table" v-if="load">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F9FAFC' }"
      >
        <el-table-column prop="name" label="变量名称" min-width="399">
        </el-table-column>
        <el-table-column prop="value" label="变量值" min-width="793">
          <template slot-scope="scope">
            <span>{{ scope.row.value || "-" }}</span>
            <span
              class="iconfont icon-copy-1"
              v-clipboard:copy="scope.row.value"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="split-8"></div>
  </div>
</template>

<script>
import {
  getConfigItem,
  newGetDeployItem,
  getCronjobItem,
} from "@/api/config-map";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getConfigItem,
      getCronjobItem,
      newGetDeployItem,
      moment,
      tableData: [],
      content: "",
      deployInfo: {},
      load: false,
    };
  },
  created() {
    this.getJobDetail();
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
      this.tableData = [];
      this.load = false;
      const data = await this.getConfigItem(
        this.$route.params.clusterName,
        this.$route.params.namespace,
        this.$route.params.deployName
      );
      this.deployInfo = data[0] || {};
      let keys = this.deployInfo.json_data.data
        ? Object.keys(this.deployInfo.json_data.data)
        : [];
      keys.forEach((item) => {
        this.tableData.push({
          name: item,
          value: this.deployInfo.json_data.data[item],
        });
      });
      this.load = true;
      console.log(this.tableData, "deployInfo");
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
