<template>
  <layout-content header="" class="app-watch">
    <div class="top">
      <div style="display: flex; align-items: center">
        <div class="detail">告警</div>
        <el-menu
          :default-active="activeKey"
          mode="horizontal"
          @select="tabChange"
        >
          <el-menu-item index="notice"> 告警消息 </el-menu-item>
          <el-menu-item index="strategy"> 告警策略 </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="bottom">
      <router-view ></router-view>
    </div>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";

export default {
  name: "appWatch",
  components: { LayoutContent },
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
      if (index === "notice") {
        // 告警消息
        this.$router.push({ name: "notice" });
      } else if (index === "strategy") {
        // 告警策略
        // this.$router.push({ name: "strategy" });
      }
    },
  },
  created() {
    this.tabChange(this.activeKey)
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
.app-watch {
  background: #f4f5f7;
  padding: 0;
  position: relative;
  .top {
    background: white;
    padding: 0 16px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 0 0 #e4e7f0;
  }
  .bottom {
    min-height: calc(100% - 56px);
    width: 100%;
    .card-group {
      display: flex;
      .item {
        min-width: 329px;
        background: white;
        padding: 24px;
        display: flex;
        svg {
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }
        .right {
          display: flex;
          flex-flow: column;
          h5 {
            font-size: 16px;
            color: #2c2e33;
            line-height: 24px;
            font-weight: 500;
          }
          .description {
            font-size: 12px;
            color: #4b5059;
            line-height: 20px;
            font-weight: 400;
            margin: 8px 0;
            span {
              margin-top: 8px;
              background: #4b5059;
            }
          }
          .status {
            font-size: 12px;
            color: #2c2e33;
            line-height: 20px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
.detail {
  font-size: 16px;
  color: #2c2e33;
  line-height: 24px;
  font-weight: 500;
  border-right: 1px solid #e4e7f0;
  height: 24px;
  padding-right: 12px;
}
/deep/ .el-menu-item {
  height: 56px;
  font-size: 16px;
  color: #2c2e33;
}
</style>
