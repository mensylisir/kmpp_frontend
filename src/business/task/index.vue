<template>
  <layout-content header="授权中心">
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
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('commons.table.type')"
        min-width="100"
        prop="type"
        fix
      >
        <!-- <template v-slot:default="{ row }">
          <span>{{ row.is_ca === "true" ? "根证书" : "普通证书" }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="创建时间" width="180px">
        <!-- <template v-slot:default="{ row }">
          {{ row.createdAt | datetimeFormat }}
        </template> -->
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
            field: "ip",
            label: this.$t("host.ip"),
            component: "FuComplexInput",
            defaultOperator: "eq",
          },
          {
            field: "created_at",
            label: this.$t("commons.table.create_time"),
            component: "FuComplexDateTime",
            valueFormat: "yyyy-MM-dd",
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
          this.paginationConfig.total = data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    create() {
      this.$router.push({ name: "taskCreate" });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-table {
  // height: calc(100% - 100px);
  overflow: auto;
}
/deep/ .el-pagination {
  text-align: right;
  margin-top: 20px;
}
.type {
  font-size: 12px;
  color: #4b5059;
  line-height: 20px;
  padding: 2px 4px;
  border-radius: 2px;
  display: inline-block;
}
/* 项目状态颜色 */
.project-status {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  border-radius: 10px;
  padding: 1px 10px;
  background: #ffffff;
  &--not-start {
    color: #0f73ee;
    border: 1px solid #0f73ee;
  }
  &--progress {
    color: #faa600;
    border: 1px solid #faa600;
  }
  &--completed {
    color: #1dbf72;
    border: 1px solid #1dbf72;
  }
  &--closed {
    color: #f5222d;
    border: 1px solid #f5222d;
  }
  &--pend {
    color: #13c2b8;
    border: 1px solid #13c2b8;
  }
  &--confirmed {
    color: #13c2b8;
    border: 1px solid #13c2b8;
  }
}
</style>
