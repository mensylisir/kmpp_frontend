<template>
  <layout-content>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'ClusterList' }" class="first"
        >集群管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>集群详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-loading="loading">
      <div style="display: flex">
        <div class="detail">集群详情</div>
        <el-menu
          @select="search"
          router
          :default-active="$route.path"
          mode="horizontal"
        >
          <el-menu-item
            :index="'/clusters/detail/' + project + '/' + name + '/overview'"
          >
            {{ $t("cluster.detail.tag.overview") }}
          </el-menu-item>
          <!-- <el-menu-item
            :index="'/clusters/detail/' + project + '/' + name + '/node'"
            >{{ $t("cluster.detail.tag.node") }}</el-menu-item
          > -->
          <!-- <el-menu-item
            :index="'/clusters/detail/' + project + '/' + name + '/namespace'"
            >{{ $t("cluster.detail.tag.namespace") }}</el-menu-item
          > -->
          <!-- <el-menu-item :index="'/clusters/detail/'+project+'/'+name+'/storage'">{{$t('cluster.detail.tag.storage')}}</el-menu-item> -->
          <!-- <el-menu-item :index="'/clusters/detail/'+project+'/'+name+'/event'">{{$t('cluster.detail.tag.event')}}</el-menu-item> -->
          <el-menu-item
            v-if="isPrometheusOn"
            :index="'/clusters/detail/' + project + '/' + name + '/monitor'"
          >
            {{ $t("cluster.detail.tag.monitor") }}
          </el-menu-item>
          <el-menu-item
            v-if="isLoggingOn"
            :index="'/clusters/detail/' + project + '/' + name + '/logging'"
            >{{ $t("cluster.detail.tag.log") }}
          </el-menu-item>
          <el-menu-item
            v-if="isLokiOn"
            :index="'/clusters/detail/' + project + '/' + name + '/loki'"
            >{{ $t("cluster.detail.tag.log") }}
          </el-menu-item>
          <el-menu-item
            :index="'/clusters/detail/' + project + '/' + name + '/tool'"
            >{{ $t("cluster.detail.tag.tool") }}</el-menu-item
          >
          <!-- <el-menu-item v-if="arch === 'amd64'" :index="'/clusters/detail/'+project+'/'+name+'/istio'">Istio</el-menu-item> -->
          <el-menu-item
            :index="'/clusters/detail/' + project + '/' + name + '/backup'"
            >{{ $t("cluster.detail.tag.backup") }}</el-menu-item
          >
          <el-menu-item
            v-if="hasLicense"
            :index="'/clusters/detail/' + project + '/' + name + '/f5'"
            >F5</el-menu-item
          >
          <el-menu-item
            :index="'/clusters/detail/' + project + '/' + name + '/security'"
          >
            {{ $t("cluster.detail.tag.security") }}
          </el-menu-item>
          <el-menu-item
            v-if="hasLicense"
            :index="'/clusters/detail/' + project + '/' + name + '/grade'"
            >{{ $t("cluster.detail.tag.grade") }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="separate"></div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { listTool } from "@/api/cluster/tool";
import { getClusterByName } from "@/api/cluster";

export default {
  name: "ClusterDetail",
  props: ["project", "name"],
  components: { LayoutContent },
  data() {
    return {
      isLokiOn: null,
      isLoggingOn: null,
      isPrometheusOn: null,
      hasLicense: null,
      arch: null,
      loading: false,
    };
  },
  methods: {
    search() {
      this.loading = true;
      getClusterByName(this.$route.params.name)
        .then((data) => {
          if (data.spec.architectures) {
            this.arch = data.spec.architectures;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
      listTool(this.$route.params.name).then((data) => {
        data.forEach((item) => {
          if (item.name === "logging") {
            this.isLoggingOn = item.status === "Running";
          }
          if (item.name === "loki") {
            this.isLokiOn = item.status === "Running";
          }
          if (item.name === "prometheus") {
            this.isPrometheusOn = item.status === "Running";
          }
        });
      });
    },
  },
  mounted() {
    this.$store.dispatch("license/getLicense").then((data) => {
      this.hasLicense = data.status === "valid";
    });
    this.search();
  },
};
</script>

<style scoped lang='scss'>
.detail {
  font-size: 16px;
  color: #2c2e33;
  line-height: 24px;
  font-weight: 500;
  margin-right: 28px;
  margin-top: 21px;
  border-right: 1px solid #e4e7f0;
  height: 24px;
  padding-right: 12px;
}
.first {
  span {
    font-size: 14px;
    color: #797f8c;
    line-height: 22px;
    font-weight: 400;
  }
}
.separate{
  height: 8px;
  background: #E4E7F0;
  width: calc(100% + 40px);
  margin-left: -20px;
}
</style>
