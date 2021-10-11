<template>
  <layout-content header="监控中心">
    <complex-table
      :data="data"
      local-key="host_columns"
      :pagination-config="paginationConfig"
      @search="search"
      :selects.sync="hostSelections"
      v-loading="loading"
      :search-config="searchConfig"
    >
      <template #header>
        <div>
          <el-button
            size="small"
            type="primary"
            @click="create()"
            v-permission="['ADMIN']"
            icon="el-icon-plus"
            >{{ $t("commons.button.create") }}</el-button
          >
        </div>
      </template>
      <el-table-column type="selection" fix></el-table-column>
      <el-table-column
        :label="$t('commons.table.name')"
        show-overflow-tooltip
        min-width="120"
        fix
      >
        <template v-slot:default="{ row }">
          <span class="name">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="集群名称" width="180" prop="clustername" fix>
        <template v-slot:default="{ row }">
          <span>{{ row.clustername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="NameSpace" width="350px">
        <template v-slot:default="{ row }">
          {{ row.namespaces ? row.namespaces.join(",") : "--" }}
        </template>
      </el-table-column>
    </complex-table>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { getClusterrole } from "@/api/authorize-center";
import ComplexTable from "@/components/complex-table";

export default {
  name: "serviceMesh",
  components: { LayoutContent, ComplexTable },
  data() {
    return {
      content: "",
      config: false,
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      condition: "",
      loading: false,
      data: [],
      clusterrole: [],
      hostSelections: [],
      searchConfig: {
        quickPlaceholder: this.$t("commons.search.quickSearch"),
        components: [
          {
            field: "name",
            label: this.$t("commons.table.name"),
            component: "FuComplexInput",
            defaultOperator: "eq",
          },
          {
            field: "clustername",
            label: "集群名称",
            component: "FuComplexInput",
            defaultOperator: "eq",
          },
          {
            field: "NameSpace",
            label: "NameSpace",
            component: "FuComplexDateTime",
          },
          {
            field: "kubeconfig",
            label: "kubeconfig",
            component: "FuComplexDateTime",
          },
        ],
      },
    };
  },
  mounted() {
    this.search();
  },
  computed: {},
  methods: {
    search() {
      this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      getClusterrole(currentPage, pageSize, this.condition)
        .then((data) => {
          this.loading = false;
          this.data = [...data.items];
          this.data.forEach((item) => {
            this.$set(item, "type", item.namespaces ? item.namespaces[0] : "");
          });
          this.paginationConfig.total = data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    create() {
      this.$router.push({ name: "authorizeCreate" });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-table {
  overflow: auto;
}
/deep/ .el-pagination {
  text-align: right;
  margin-top: 20px;
}
.name {
  cursor: pointer;
}
</style>
