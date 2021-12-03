<template>
  <div class="card-group">
    <div
      class="item"
      :key="item.name"
      v-for="item in deployList"
      @click="goDetail(item)"
    >
      <img :src="item.iconUrl" />
      <div class="right">
        <h5>{{ item.name }}</h5>
        <div class="description">
          {{ item.shortDescription }}
          <div style="margin-top: 8px">
            <span
              >App:
              {{
                item.latestVersion ? item.latestVersion.appVersion : "--"
              }}</span
            >
            <span
              >Package:
              {{
                item.latestVersion ? item.latestVersion.pkgVersion : "--"
              }}</span
            >
          </div>
        </div>
        <!-- <div class="status">
          <svg></svg>
         <span>状态：{{item.status.userReason}}</span>
        </div> -->
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
      deployList: [],
    };
  },
  watch: {
    "$props.nameSpace": function () {
      this.getStorList();
    },
  },
  props: ["nameSpace"],
  methods: {
    // 跳转部署详情
    goDetail(item, monitor) {
      item.nameSpace = this.nameSpace;
      this.$store.commit("setMonitor", monitor);
      this.$router.push({
        name: "DeployDetail",
        params: {
          name: item.name,
          cluster: this.nameSpace[0],
          namespace: this.nameSpace[1],
        },
      });
    },
    // 获取集群信息
    getCluester() {},
    // 获取列表
    getStorList() {
      this.deployList = [];
      let params = {
        cluster_name: this.nameSpace[0],
        fun_name:
          "kubeappsapis.plugins.helm.packages.v1alpha1.HelmPackagesService.GetInstalledPackageSummaries",
        use_tls: false,
        body: {
          context: {
            cluster: "default",
            namespace: this.nameSpace[1],
          },
          paginationOptions: {
            pageSize: 0,
            pageToken: "",
          },
        },
      };
      getStorList(params)
        .then((data) => {
          this.deployList = data.map_result.installedPackageSummaries;
          if (this.$route.params.middleName) {
            let result = this.deployList.filter((item) => {
              return item.name === this.$route.params.middleName;
            });
            this.goDetail(result[0], true);
          }
        })
        .catch(() => {
        });
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
        margin: 8px 0 0 8px;
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
        span {
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
