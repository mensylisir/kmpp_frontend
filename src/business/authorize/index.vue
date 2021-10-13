<template>
  <layout-content header="授权中心">
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
      <el-table-column label="kubeconfig" width="400px">
        <template v-slot:default="{ row }">
          <div class="config" v-if="row.namespaces">
            <el-select v-model="row.type" placeholder="请选择">
              <el-option
                :label="item"
                :value="item"
                :key="item"
                v-for="item in row.namespaces"
              >
              </el-option>
            </el-select>
            <el-button type="primary" @click="showConfig(row)" size="small">
              show
            </el-button>
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </complex-table>
    <el-dialog
      title="kubeconfig"
      width="66.7%"
      :visible.sync="config"
      class="dailog"
    >
      <el-button type="primary" @click="copy(content)" size="small">
        复制
      </el-button>
      <div class="content">{{ content }}</div>
    </el-dialog>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { getClusterrole } from "@/api/authorize-center";
import ComplexTable from "@/components/complex-table";
import { kubeconfig } from "@/api/authorize-center";
import { searchClusters } from "@/api/cluster";

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
      cluster: undefined,
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
    this.getCluster();
  },
  computed: {},
  watch: {
    cluster: {
      handler(newVal) {
        if (newVal) {
          this.search();
        }
      },
    },
  },
  methods: {
    copy(val) {
      let that = this;
      this.$copyText(val).then(
        function () {
          that.$message({ type: "success", message: "复制成功" });
        },
        function () {
          that.$message({ type: "info", message: "复制失败" });
        }
      );
    },
    handelChange(val) {
      console.log(val);
    },
    showConfig(item) {
      kubeconfig({
        clustername: item.clustername,
        username: item.username,
        namespace: item.type,
      }).then((data) => {
        this.content = data;
        this.config = true;
      });
    },
    getCluster() {
      this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      searchClusters(currentPage, pageSize, "").then((data) => {
        this.loading = false;
        this.options = [...data.items];
        this.options = this.options.filter(item => {
          return item.source === 'local'
        })
        this.options.forEach((items) => {
          items.value = items.label = items.name;
        });
        if (this.options[0]) {
          this.cluster = this.options[0].value;
        }
      });
    },
    search() {
      this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      getClusterrole(this.cluster, currentPage, pageSize, this.condition)
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
.config {
  display: flex;
  button {
    height: 28px;
    line-height: 10px;
    margin-left: 8px;
    // width: 100px;
  }
  /deep/ .el-input--small {
    width: 160px;
  }
}
.dailog {
  button {
    float: right;
  }
  .content {
    margin-top: 46px;
    border: 1px solid #e2e8f0;
    padding: 24px;
    white-space: pre-wrap;
  }
}
</style>
