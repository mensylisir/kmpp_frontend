<template>
  <layout-content header="日志中心">
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
    <event :name="currCluster.name" v-if="cluster"></event>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { searchClusters } from "@/api/cluster";
import { checkPermission } from "@/utils/permisstion";
import event from "./detail/event/index.vue";

export default {
  name: "serviceMesh",
  components: { LayoutContent, event },
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
