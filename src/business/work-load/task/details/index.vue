<template>
  <div class="domain-manage">
    <div class="bread-crumb">
      <span class="bread-crumb-item" @click="$router.push({ name: 'deploy' })"
        >任务/</span
      ><span>任务详情</span>
    </div>
    <div class="top">
      <div style="display: flex; align-items: center">
        <div class="detail">任务详情</div>
        <el-menu
          :default-active="activeKey"
          mode="horizontal"
          @select="tabChange"
        >
          <el-menu-item index="details"> 详情 </el-menu-item>
          <el-menu-item index="yaml"> YAML </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="bottom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "appWatch",
  components: {},
  data() {
    return {
      clusterList: [],
      nameSpace: [],
      count: 0,
    };
  },
  methods: {
    tabChange(index) {
      this.activeKey = index;
      if (index === "details") {
        // 用量排行
        this.$router.push({
          name: "deployDetailsMod",
          params: {
            clusterName: this.$route.params.clusterName,
            deployName: this.$route.params.deployName,
            namespace: this.$route.params.namespace,
          },
        });
      } else if (index === "yaml") {
        // 使用情况
        this.$router.push({
          name:
            this.$route.meta.action == "check"
              ? "deployDetailsCheck"
              : "deployDetailsEdit",
          params: {
            clusterName: this.$route.params.clusterName,
            deployName: this.$route.params.deployName,
            namespace: this.$route.params.namespace,
          },
        });
      }
    },
  },
  created() {
    this.tabChange(this.activeKey);
  },
  watch: {
    $route() {},
  },
  computed: {
    activeKey: {
      get: function () {
        let value = this.$route.meta.activeKey;
        return value;
      },
      set: function () {},
    },
  },
};
</script>

<style scoped lang='scss'>
.domain-manage {
  background: #fff;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .bread-crumb {
    font-size: 14px;
    color: #2c2e33;
    line-height: 22px;
    font-weight: 400;

    padding: 16px 24px;
    padding-bottom: 0;
    background: #fff;
    .bread-crumb-item {
      color: #797f8c;
      cursor: pointer;
    }
  }
  .top {
    background: white;
    padding: 0 16px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 0 0 #e4e7f0;
    .detail {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      border-right: 1px solid #e4e7f0;
      height: 24px;
      padding-right: 12px;
    }
  }
  .bottom {
    height: calc(100% - 102px);
    width: 100%;
    background: #fff;
  }
}

/deep/ .el-menu-item {
  height: 56px;
  font-size: 16px;
  color: #2c2e33;
}
</style>
