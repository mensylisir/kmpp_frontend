<template>
  <div class="card-group">
    <div
      class="item"
      :key="item.name"
      v-for="item in storList"
      @click="goDeploy(item)"
    >
      <img :src="item.iconUrl" />
      <div class="right">
        <h5>{{ item.name }}</h5>
        <div class="description">
          {{ item.shortDescription }}
          <div style="margin-top: 8px">
            <span>App: {{ item.latestVersion.appVersion }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorList } from "@/api/middleware";

export default {
  name: "MiddleStore",
  components: {},
  data() {
    return {
      storList: [],
    };
  },
  props: ["nameSpace"],
  methods: {
    // 跳转部署详情
    goDeploy(item) {
      item.nameSpace = this.nameSpace[0];
      this.$router.push({
        name: "StoreDeploy",
        params: {
          item: item,
        },
      });
    },
    // 获取列表
    getStorList() {
      let params = {
        cluster_name: this.nameSpace[0],
        fun_name:
          "kubeappsapis.plugins.helm.packages.v1alpha1.HelmPackagesService.GetAvailablePackageSummaries",
        use_tls: false,
        body: {
          context: {
            cluster: "default",
            namespace: "kubeapps",
          },
        },
      };
      getStorList(params)
        .then((data) => {
          this.storList = data.map_result.availablePackageSummaries;
        })
        .catch(() => {});
    },
    // 获取我的部署
    getDeploy() {},
  },
  created() {
    this.getStorList();
  },
};
</script>

<style scoped lang='scss'>
.card-group {
  display: flex;
  flex-wrap: wrap;
  .item {
    cursor: pointer;
    width: 28%;
    background: white;
    padding: 24px;
    display: flex;
    border: 1px solid #e4e7f0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin: 16px;
    &:hover {
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
        0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }
    img {
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
        margin: 0;
      }
      .description {
        font-size: 12px;
        color: #4b5059;
        line-height: 20px;
        font-weight: 400;
        margin: 8px 0;
        span {
          margin-top: 8px;
          background: #dcdee4;
          padding: 0 4px;
          margin-right: 8px;
          border-radius: 2px;
        }
      }
      .status {
        svg {
          width: 11.6px;
          height: 11.6px;
          margin-right: 3px;
        }
        font-size: 12px;
        color: #2c2e33;
        line-height: 20px;
        height: 20px;
        font-weight: 400;
      }
    }
  }
}
</style>
