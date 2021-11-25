<template>
  <div class="deploy-details">
    <div class="split-8"></div>
    <div class="mod-title">基本信息</div>
    <div class="mod-one" v-if="load">
      <svg class="icon deploy-icon" aria-hidden="true">
        <use xlink:href="#icon-namespacelogo"></use>
      </svg>
      <span class="deploy-name">{{ namespaceInfo["metadata"].name }}</span>
    </div>
    <div class="mod-two" v-if="load">
      <el-row :gutter="24">
        <el-col :span="8">
          <span class="tag-name">状态：</span
          ><span
            class="iconfont icon-checkbox-circle-fill2 icon-checkbox-circle"
          ></span
          ><span class="tag-content" style="margin-right: 6px">{{
            namespaceInfo["status"].phase
          }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">所属集群：</span
          ><span class="tag-content">{{ $route.params.clusterName }}</span>
        </el-col>
        <el-col :span="8">
          <span class="tag-name">创建时间：</span
          ><span class="tag-content">{{
            moment(namespaceInfo["metadata"].creationTimestamp).format(
              "YYYY/MM/DD HH:mm:ss"
            )
          }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24" class="cus-col">
          <span class="tag-name">标签：</span>
          <div class="tab-item-block">
            <span
              class="tag-content tag-content-bg tag-ml"
              v-for="(value, key, index) in namespaceInfo['metadata'].labels"
              :key="index"
              >{{ key }}:{{ value }}</span
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="split-8"></div>
    <div class="mod-title">容器组</div>
    <div class="data-table" v-if="load">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F9FAFC' }"
      >
        <el-table-column prop="name" label="名称" min-width="200">
          <template slot-scope="scope">
            <span class="active-domain" @click="winOpen(scope.row)">{{
              scope.row["metadata"].name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="96">
          <template slot-scope="scope">
            <span
              class="iconfont icon-time status-icon"
              style="color: #5354bb"
              v-if="scope.row['status'].phase == 'Running'"
            ></span
            ><span
              class="iconfont icon-safe-warning status-icon"
              style="color: #f59326"
              v-if="scope.row['status'].phase == 'Pending'"
            ></span
            ><span
              class="iconfont icon-checkbox-circle-fill2 status-icon"
              style="color: #36b37e"
              v-if="scope.row['status'].phase == 'Completed'"
            ></span
            ><span>{{
              scope.row["status"].phase == "Running"
                ? "运行中"
                : scope.row["status"].phase == "Pending"
                ? "挂起"
                : scope.row["status"].phase == "Completed"
                ? "已完成"
                : scope.row["status"].phase
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="container" label="运行容器" min-width="88">
          <template slot-scope="scope">
            <span
              >{{ scope.row.containerReday }}/{{
                scope.row.containerTotal
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="hostIP" label="节点" min-width="178">
          <template slot-scope="scope">
            <span
              >{{ scope.row.spec.nodeName }}({{
                scope.row["status"].hostIP
              }})</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="image" label="镜像" min-width="400">
          <template slot-scope="scope">
            <span>{{ scope.row["status"].containerStatuses[0].image }}</span>
            <span
              class="iconfont icon-copy-1"
              v-clipboard:copy="scope.row['status'].containerStatuses[0].image"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="pod" label="创建时间" min-width="166">
          <template slot-scope="scope">
            <span>{{
              moment(scope.row["metadata"].creationTimestamp).format(
                "YYYY/MM/DD HH:mm:ss"
              )
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-con">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginationConfig.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="paginationConfig.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationConfig.total"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getNamespaceItem } from "@/api/cluster/namespace-details";
import { getPods } from "@/api/work-load/pods";
import moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      getNamespaceItem,
      getPods,
      moment,
      tableData: [],
      tableDataAll: [],
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      namespaceInfo: {},
      load: false,
    };
  },
  created() {
    this.getNamespace();
    this.getPodsList(this.$route.params.clusterName, this.$route.params.name);
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    // 复制
    onCopy: function () {
      this.$message({
        type: "success",
        message: "复制成功!",
      });
      // alert("复制成功： " + e.text);
    },
    onError: function () {
      this.$message({
        type: "error",
        message: "复制失败!",
      });
    },

    handleSizeChange() {
      this.paginationConfig.currentPage = 1;
      this.tableData = this.tableDataAll.slice(
        0,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
    },
    handleCurrentChange() {
      this.tableData = this.tableDataAll.slice(
        (this.paginationConfig.currentPage - 1) *
          this.paginationConfig.pageSize,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
    },

    winOpen(data) {
      this.$router.push({
        name: "podsDetailsMod",
        params: {
          clusterName: this.$route.params.clusterName,
          podsName: data["metadata"].name,
          namespace: data["metadata"].namespace,
        },
      });
    },

    // ajax
    async getNamespace() {
      this.load = false;
      const data = await this.getNamespaceItem(
        this.$route.params.clusterName,
        this.$route.params.name
      );
      this.namespaceInfo = data || {};
      this.tableData = this.namespaceInfo.spec.ports
        ? this.namespaceInfo.spec.ports
        : [];
      this.load = true;
    },

    async getPodsList(cluster, namespace) {
      const data = await this.getPods(cluster, namespace);
      this.tableDataAll = data || [];
      this.tableDataAll.forEach((item) => {
        item.containerTotal = item.status.containerStatuses
          ? item.status.containerStatuses.length
          : 0;
        const arr = item.status.containerStatuses
          ? item.status.containerStatuses.filter((con) => {
              return con.ready == true;
            })
          : [];
        item.containerReday = arr.length;
      });
      // console.log(data, "deploylist");
      this.paginationConfig.total = this.tableDataAll.length;
      this.tableData = this.tableDataAll.slice(
        this.paginationConfig.currentPage - 1,
        this.paginationConfig.currentPage * this.paginationConfig.pageSize
      );
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.deploy-details {
  background: #fff;
  .split-8 {
    height: 8px;
    background: #edeff4;
  }
  .mod-title {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;
    padding: 16px 24px;
  }
  .data-table {
    background: #fff;

    padding: 16px 24px;
    padding-top: 0;

    .page-con {
      margin-top: 16px;
      text-align: right;
      /deep/.el-pagination {
        .btn-prev,
        .btn-next {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }
        .el-pager {
          .number,
          .el-icon-more {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.15);
          }
          .active {
            background: #ffffff !important;
            border: 1px solid #5354bb !important;
            color: #5354bb !important;
          }
        }
      }
    }
  }

  .mod-one {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 16px 24px;
    padding-top: 0;
    .deploy-icon {
      width: 56px;
      height: 56px;

      margin-right: 8px;
    }
    .deploy-name {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }
  }

  .mod-two {
    padding: 16px 24px;
    padding-top: 0;
    background: #fff;
  }
  .tag-name {
    font-size: 14px;
    color: #797f8c;
    line-height: 22px;
    font-weight: 400;
  }
  .tab-item-block {
    display: flex;
    flex-wrap: wrap;
  }
  .icon-checkbox-circle {
    font-size: 14px !important;
    color: #36b37e;
    margin-right: 2px;
  }
  .tag-content {
    font-size: 12px;
    color: #2c2e33;
    line-height: 20px;
    font-weight: 400;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tag-content-bg {
    background: #eff1f5;
    padding: 0 4px;
    border-radius: 2px;
  }
  .tag-ml {
    margin-right: 4px;
    margin-bottom: 4px;
  }
  .tag-content-active {
    cursor: pointer;
    color: #5354bb;
  }

  .icon-copy-1 {
    font-size: 16px !important;
    color: #5354bb;
    cursor: pointer;
    margin-left: 8px;
  }
}

/deep/.el-table--small .el-table__cell {
  font-size: 14px;
  padding: 10.3px 0;
}
/deep/.el-table {
  border-right: none;
  border-bottom: none;
}
/deep/.el-table--border .el-table__cell {
  border-right: none;
}
/deep/.el-row {
  margin-bottom: 14px;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }
}
/deep/.el-col {
  white-space: nowrap;

  display: flex;
  align-items: baseline;
}

.cus-col {
  align-items: baseline;
}

.active-domain {
  color: #5354bb;
  cursor: pointer;
}
</style>
