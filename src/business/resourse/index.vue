<template>
  <layout-content :header="$t('serviceMesh.title')">
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
    <storage :name="currCluster.name" v-if="cluster"></storage>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { searchClusters } from "@/api/cluster";
import { checkPermission } from "@/utils/permisstion";
import storage from "./detail/storage/index.vue";

export default {
  name: "serviceMesh",
  components: { LayoutContent, storage },
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
