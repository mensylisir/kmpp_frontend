<template>
  <div>
    <!--执行 WebKubeCtl 命令行 -->
    <el-card  v-loading="loading_xterm">
      <div slot="header" style="height: 20px">
        <el-button v-if="!opened" @click="onOpen()" style="float: right">{{
          $t("cluster.detail.overview.connect")
        }}</el-button>
        <el-tooltip
          v-if="opened"
          effect="dark"
          :content="$t('cluster.detail.overview.open_in_new_windows')"
          placement="bottom"
          style="margin-bottom: 15px"
        >
          <el-button @click="newWindow()" style="float: right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconchuangkou"></use>
            </svg>
          </el-button>
        </el-tooltip>
        <el-button
          v-if="currentCluster.source === 'local'"
          icon="el-icon-document"
          @click="downloadKubeConfig()"
          style="float: right; margin-right: 10px"
          >{{ $t("cluster.detail.overview.download_kube_config") }}</el-button
        >
      </div>
      <div v-if="opened">
        <iframe style="width: 100%; height: 512px" :src="url"></iframe>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getClusterToken } from "@/api/cluster/cluster";
import { getClusterByName } from "@/api/cluster";

export default {
  name: "ClusterOverview",
  components: {},
  data() {
    return {
      loading_chart: false,
      loading_xterm: false,
      clusterName: "",
      currentCluster: {
        name: "",
        spec: {
          version: "",
          architectures: "",
          networkType: "",
          kubeProxyMode: "",
          runtimeType: "",
          flannelBackend: "",
          calicoIpv4PoolIpip: "",
        },
        source: "",
      },
      namespaces: [],
      pods: [],
      nodes: [],
      deployments: [],
      containerNumber: 0,
      cpuTotal: 0,
      cpuUsage: 0,
      cpuUsagePercent: 0.0,
      memTotal: 0,
      memUsage: 0,
      memUsagePercent: 0.0,
      podLimit: 0,
      podUsagePercent: 0.0,
      opened: false,
      url: "",
      activeName: "",
      project: "",
      name: "",
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      paginationConfig1: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      loading: false,
    };
  },
  watch: {
    activeName: function () {},
  },
  computed: {},
  methods: {
    search() {
      this.loading_chart = true;
      this.clusterName = this.$route.params.name;
      getClusterByName(this.clusterName).then((data) => {
        this.currentCluster = data;
        this.onOpen();
      });
    },
    downloadKubeConfig() {
      window.open(`/api/v1/clusters/kubeconfig/${this.clusterName}`, "_blank");
    },
    onOpen() {
      this.loading_xterm = true;
      this.opened = true;
      console.log(this.clusterName, "11");
      getClusterToken(this.clusterName).then((data) => {
        this.url = "/webkubectl/terminal/?token=" + data.token;
        this.loading_xterm = false;
      });
    },
    newWindow() {
      this.opened = true;
      getClusterToken(this.clusterName).then((data) => {
        this.url = `/webkubectl/terminal/?token=${data.token}`;
        window.open(
          this.url,
          "_blank",
          "weight=300,height=200,alwaysRaised=yes,depended=yes"
        );
      });
    },
  },
  created() {},
  mounted() {
    this.search();
  },
};
</script>

<style lang="scss" scoped>
.example {
  ul {
    height: 20px;
  }
}
/deep/ .el-card {
  border: 1px solid #e4e7f0;
  border-left: 0;
  border-bottom: 0;
  box-shadow: unset;
  border-radius: unset;
  .el-card__header {
    padding: 24px 20px 5px 0;
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;
  }
  .el-card__body {
    padding: 0;
    .el-col {
      padding-bottom: 40px;
      ul {
        text-align: left;
        margin: 0 0 12px 0;
        padding: unset;

        span {
          &:first-child {
            font-size: 14px;
            color: #797f8c;
            line-height: 22px;
            font-weight: 400;
            display: inline-block;
            margin-right: 32px;
          }
          &:last-child {
            font-size: 14px;
            color: #2c2e33;
            line-height: 22px;
            font-weight: 500;
          }
        }
      }
      .info-text {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
      }
    }
  }
  /deep/ .right {
    .el-card__header {
      padding-bottom: 5px !important;
    }
  }
}
.bottom {
  margin-left: -20px;
  border: 1px solid #e4e7f0;
  /deep/ .el-tabs__nav {
    width: 100%;
    .el-tabs__active-bar {
      width: 25%;
    }
    .el-tabs__item {
      padding: 11px 0 0 0;
      width: 25%;
      height: 77px;
      &:hover {
        background: #f9fafc;
      }
      i {
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        font-size: 14px;
        color: #4b5059;
        line-height: 22px;
        font-weight: 400;
      }
      .number {
        font-size: 24px;
        color: #2c2e33;
        font-weight: 700;
        padding-top: 8px;
        display: inline-block;
      }
      .tab-label {
        line-height: 53px;
        padding-left: 33px;
        display: flex;
        align-items: center;
      }
    }
  }
  /deep/ .el-tab-pane {
    padding-left: 24px;
  }
}
.separate {
  height: 8px;
  background: #e4e7f0;
  width: calc(100% + 40px);
  margin-left: -20px;
}
.empty {
  text-align: center;
  padding: 150px;
}
/deep/ .el-tabs__nav-wrap::after {
  height: 1px;
}
</style>
