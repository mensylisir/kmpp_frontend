<template>
  <div>
    <div class="example" style="margin-left: -20px">
      <el-row>
        <el-col :span="7">
          <el-card style="padding-left: 24px">
            <div slot="header" class="clearfix">
              <span>{{ $t("cluster.detail.overview.base_info") }}</span>
            </div>
            <div>
              <el-col :span="12">
                <ul style="margin-top: 19px">
                  <span> {{ $t("cluster.creation.name") }}</span>
                  <span> {{ currentCluster.name }}</span>
                </ul>
                <ul>
                  <span> {{ $t("cluster.version") }}</span>

                  <span> {{ currentCluster.spec.version }}</span>
                </ul>
                <ul>
                  <span> {{ $t("cluster.creation.arch") }}</span>

                  <span> {{ currentCluster.spec.architectures }}</span>
                </ul>
              </el-col>
              <el-col :span="12">
                <ul style="margin-top: 19px">
                  <span style="width: 70px">{{
                    $t("cluster.creation.network_type")
                  }}</span
                  ><span> {{ currentCluster.spec.networkType }}</span>
                </ul>
                <ul>
                  <span style="width: 70px">{{
                    $t("cluster.creation.runtime_type")
                  }}</span
                  ><span> {{ currentCluster.spec.runtimeType }}</span>
                </ul>
                <ul>
                  <span style="width: 70px">{{
                    $t("cluster.detail.overview.source")
                  }}</span
                  ><span> {{ currentCluster.source }}</span>
                </ul>
              </el-col>
            </div>
          </el-card>
        </el-col>
        <el-col :span="17">
          <el-card
            v-loading="loading_chart"
            style="padding-left: 24px"
            class="right"
          >
            <div slot="header" class="clearfix">
              <span>{{ $t("cluster.detail.overview.capacity_info") }}</span>
            </div>
            <el-row type="flex" justify="center">
              <el-col :span="8" style="padding-bottom: 30px">
                <div align="center">
                  <el-progress
                    :stroke-width="20"
                    type="circle"
                    :width="100"
                    :percentage="cpuUsagePercent"
                    color="#36B37E"
                  ></el-progress>
                  <br />
                  <span class="info-text">{{
                    $t("cluster.detail.overview.cpu")
                  }}</span>
                </div>
              </el-col>
              <el-col :span="8" style="padding-bottom: 30px">
                <div align="center">
                  <el-progress
                    :stroke-width="20"
                    type="circle"
                    :width="100"
                    :percentage="memUsagePercent"
                    color="#0F73EE"
                  ></el-progress>
                  <br />
                  <span class="info-text">{{
                    $t("cluster.detail.overview.memory")
                  }}</span>
                </div>
              </el-col>
              <el-col :span="8" style="padding-bottom: 30px">
                <div align="center">
                  <el-progress
                    :stroke-width="20"
                    type="circle"
                    :width="100"
                    :percentage="podUsagePercent"
                    color="#5354BB"
                  ></el-progress>
                  <br />
                  <span class="info-text">{{
                    $t("cluster.detail.overview.docker")
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="separate"></div> -->
    <el-tabs v-model="activeName" class="bottom">
      <el-tab-pane name="Nodes">
        <div slot="label" class="tab-label">
          <i class="iconfont icon-node_normal"></i>
          <span>
            Nodes<br />
            <span class="number">{{ nodes.length }}</span>
          </span>
        </div>
        <node :name="name"></node>
      </el-tab-pane>
      <el-tab-pane label="Namespaces" name="Namespaces">
        <div slot="label" class="tab-label">
          <i class="iconfont icon-namespace_normal"></i>
          <span
            >Namespaces<br /><span class="number">{{
              namespaces.length
            }}</span></span
          >
        </div>
        <namespace :name="name"></namespace
      ></el-tab-pane>
      <el-tab-pane label="Deployments" name="Deployments">
        <div slot="label" class="tab-label">
          <i class="iconfont icon-deployment_normal"></i>
          <span
            >Deployments<br /><span class="number">{{
              deployments.length
            }}</span></span
          >
        </div>
        <div>
          <complex-table
            v-loading="loading"
            @search="search1"
            v-if="deployments.length > 0"
            :data="deploymentList"
            :pagination-config="paginationConfig"
          >
            <el-table-column prop="name" label="名称">
              <template v-slot:default="{ row }">
                <span>{{ row.metadata.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="ready" width="120">
              <template v-slot:default="{ row }">
                {{ row.status.availableReplicas }}/{{ row.spec.replicas }}
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180">
              <template v-slot:default="{ row }">
                {{ rTime(row.metadata.creationTimestamp) }}
              </template>
            </el-table-column>
          </complex-table>
          <div class="empty" v-else>
            <img src="@/assets/images/data-empty.svg" /><br />
            <span>暂无数据~</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Pods" name="Pods">
        <div slot="label" class="tab-label">
          <i class="iconfont icon-pod_select"></i>
          <span
            >Pods<br /><span class="number">{{ pods.length }}</span></span
          >
        </div>
        <div>
          <complex-table
            v-if="pods.length > 0"
            :data="podsList"
            :pagination-config="paginationConfig1"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <span>{{ scope.row.metadata.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.status.phase }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180">
              <template slot-scope="scope">
                {{ rTime(scope.row.metadata.creationTimestamp) }}
              </template>
            </el-table-column>
          </complex-table>
          <div class="empty" v-else>
            <img src="@/assets/images/data-empty.svg" /><br />
            <span>暂无数据~</span>
          </div>
        </div></el-tab-pane
      >
    </el-tabs>
    <!--执行 WebKubeCtl 命令行 -->
    <el-card style="margin-top: 20px" v-loading="loading_xterm">
      <div slot="header" style="height: 20px">
        <el-button v-if="!opened" @click="onOpen()" style="float: right">{{
          $t("cluster.detail.overview.connect")
        }}</el-button>
        <el-tooltip
          v-if="opened"
          effect="dark"
          :content="$t('cluster.detail.overview.open_in_new_windows')"
          placement="bottom"
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
import {
  listPod,
  listDeployment,
  getClusterToken,
} from "@/api/cluster/cluster";
import { listNodeInCluster, listNodesUsage } from "@/api/cluster/node";
import { listNamespace } from "@/api/cluster/namespace";
import { getClusterByName } from "@/api/cluster";
import node from "../node/index.vue";
import namespace from "../namespace/index.vue";
import ComplexTable from "@/components/complex-table";

export default {
  name: "ClusterOverview",
  components: { node, namespace, ComplexTable },
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
  computed: {
    deploymentList() {
      let result = this.deployments.filter((item, index) => {
        return (
          this.paginationConfig.pageSize *
            (this.paginationConfig.currentPage - 1) <=
            index &&
          index <
            this.paginationConfig.pageSize * this.paginationConfig.currentPage
        );
      });
      return result;
    },
    podsList() {
      let result = this.pods.filter((item, index) => {
        return (
          this.paginationConfig1.pageSize *
            (this.paginationConfig1.currentPage - 1) <=
            index &&
          index <
            this.paginationConfig1.pageSize * this.paginationConfig1.currentPage
        );
      });
      return result;
    },
  },
  methods: {
    rTime(timestamp) {
      let date = new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000);
      date = date.toJSON();
      date = date.substring(0, 19).replace("T", " ");
      return date;
    },
    downloadKubeConfig() {
      window.open(`/api/v1/clusters/kubeconfig/${this.clusterName}`, "_blank");
    },
    search1() {
      // const { currentPage, pageSize } = this.paginationConfig;
    },
    search() {
      this.loading_chart = true;
      this.clusterName = this.$route.params.name;
      getClusterByName(this.clusterName).then((data) => {
        this.currentCluster = data;
      });
      this.loadNameSpaces();
      this.loadNodes();
      this.loadDeployments();
    },
    onOpen() {
      this.loading_xterm = true;
      this.opened = true;
      getClusterToken(this.clusterName).then((data) => {
        this.url = "/webkubectl/terminal/?token=" + data.token;
        console.log();
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
    loadNameSpaces() {
      listNamespace(this.clusterName).then((data) => {
        this.namespaces = data.items;
      });
    },
    loadPods() {
      listPod(this.clusterName).then((data) => {
        this.pods = data.items;
        this.pods.forEach((pod) => {
          this.containerNumber =
            this.containerNumber + pod.spec.containers.length;
        });
        this.podUsagePercent = Math.round(
          (this.pods.length / this.podLimit) * 100
        );
        this.paginationConfig1.total = data.items.length;
      });
    },
    loadNodes() {
      listNodeInCluster(this.clusterName).then((data) => {
        this.nodes = data.items;
        this.nodes.forEach((node) => {
          this.cpuTotal = this.cpuTotal + Number(node.status.capacity.cpu);
          const mem = node.status.capacity.memory.replace("Ki", "");
          this.memTotal = this.memTotal + Number(mem);
          this.podLimit = this.podLimit + Number(node.status.capacity.pods);
        });
        this.loadNodesUsages();
        this.loadPods();
      });
    },
    loadDeployments() {
      listDeployment(this.clusterName).then((data) => {
        this.deployments = data.items;
        this.paginationConfig.total = data.items.length;
      });
    },
    loadNodesUsages() {
      listNodesUsage(this.clusterName).then((data) => {
        let metrics = data.items;
        let unit = "";
        metrics.forEach((me) => {
          let c = "";
          if (me.usage.cpu.indexOf("m") > -1) {
            c = me.usage.cpu.replace("m", "");
            unit = "m";
          }
          if (me.usage.cpu.indexOf("n") > -1) {
            c = me.usage.cpu.replace("n", "");
            unit = "n";
          }
          this.cpuUsage = this.cpuUsage + Number(c);
          const m = me.usage.memory.replace("Ki", "");
          this.memUsage = this.memUsage + Number(m);
        });
        this.memUsagePercent = Math.round(
          (this.memUsage / this.memTotal) * 100
        );
        if (unit === "n") {
          this.cpuUsage = this.cpuUsage / (1000 * 1000 * 1000);
          this.cpuUsagePercent = Math.round(
            (this.cpuUsage / this.cpuTotal) * 100
          );
        } else if (unit === "m") {
          this.cpuUsagePercent = Math.round(
            (this.cpuUsage / (this.cpuTotal * 1000)) * 100
          );
        }
        this.loading_chart = false;
      });
    },
  },
  created() {
    // this.project = this.$route.params.project;
    this.name = this.$route.params.name;
  },
  mounted() {
    this.search();
    this.activeName = "Nodes";
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
