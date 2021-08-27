<template>
  <layout-content header="服务网格">
    <span>集群名称：</span>
    <el-select
      v-model="cluster"
      filterable
      placeholder="请选择"
      style="margin-bottom: 24px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <istio v-if="arch === 'amd64'" :name="currCluster.name"></istio>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { searchClusters } from "@/api/cluster";
import { checkPermission } from "@/utils/permisstion";
import istio from "./detail/istio/index.vue";
import { getClusterByName } from "@/api/cluster";

export default {
  name: "serviceMesh",
  components: { LayoutContent, istio },
  data() {
    return {
      isAdmin: checkPermission("ADMIN"),
      paginationConfig: {
        currentPage: 1,
        pageSize: 10000,
        total: 0,
      },
      cluster: "",
      options: [],
      arch: "",
    };
  },
  mounted() {
    this.search();
  },
  watch: {
    cluster: function () {
      this.getDetail();
    },
  },
  computed: {
    currCluster() {
      let result = this.options.filter((item) => {
        return item.value === this.cluster;
      });
      return result[0] || [];
    },
  },
  methods: {
    search(condition) {
      this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      searchClusters(currentPage, pageSize, condition).then((data) => {
        this.loading = false;
        this.options = data.items;
        this.options.forEach((items) => {
          items.value = items.label = items.name;
        });
        this.cluster = this.options[0].value;
      });
    },
    getDetail() {
      this.loading = true;
      getClusterByName(this.currCluster.name)
        .then((data) => {
          if (data.spec.architectures) {
            this.arch = data.spec.architectures;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  /deep/ .el-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
  }
}
</style>
