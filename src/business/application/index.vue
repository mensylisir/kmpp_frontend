<template>
  <layout-content header="项目列表">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="rowClassName"
    >
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          {{
            (paginationConfig.currentPage - 1) * paginationConfig.pageSize +
            (scope.row.index + 1)
          }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称"> </el-table-column>
      <el-table-column label="项目类型" width="120">
        <template slot-scope="scope">
          <span
            :style="{
              background: typeColorMap[scope.row.type],
              color: typeFontColorMap[scope.row.type],
            }"
            class="type"
            >{{ typeMap[scope.row.type] }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="department" label="研发部门" width="180">
      </el-table-column>
      <el-table-column prop="leader" label="项目负责人" width="120">
        <template slot-scope="scope">
          {{ currentUser(scope.row.leader) || "--" }}
        </template>
      </el-table-column>
      <el-table-column label="开始日期" width="120">
        <template slot-scope="scope">
          {{ scope.row.startTime || "--" }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="截止日期" width="120">
        <template slot-scope="scope">
          {{ scope.row.endTime || "--" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span :class="statusColor[scope.row.status]" class="project-status">{{
            statusData[scope.row.status]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进度" width="180">
        <template slot-scope="scope">
          <el-progress :percentage="Number(scope.row.progress)"></el-progress>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationConfig.currentPage"
      :page-sizes="[15,20, 30, 40, 50]"
      :page-size="paginationConfig.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationConfig.total"
    >
    </el-pagination>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { getProjectAll, getAllUser } from "@/api/application";

export default {
  name: "serviceMesh",
  components: { LayoutContent },
  data() {
    return {
      tableData: [],
      paginationConfig: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      // 项目类型
      typeMap: {
        general: "一般项目",
        supervision: "重点督促",
        short_fast: "2021短平快",
      },
      // 项目类型背景色
      typeColorMap: {
        general: "#DEEBFF",
        supervision: "#FFEFCC",
        short_fast: "#E4F8EF",
      },
      // 项目类型字体颜色
      typeFontColorMap: {
        general: "#0747A6",
        supervision: "#F59326",
        short_fast: "#168669",
      },
      statusData: {
        notstart: "未开始",
        progress: "进行中",
        completed: "已完成",
        closed: "已关闭",
      },
      statusColor: {
        notstart: "project-status--not-start",
        progress: "project-status--progress",
        completed: "project-status--completed",
        closed: "project-status--closed",
        pend: "project-status--pend",
        confirmed: "project-status--confirmed",
      },
      userList: [],
      proList: [],
    };
  },
  mounted() {
    this.getAll();
    this.getAllUser();
  },
  computed: {},
  methods: {
    getAll() {
      getProjectAll().then((data) => {
        if (data.result === "SUCCESS") {
          this.proList = data.data || [];
          this.paginationConfig.total = this.proList.length;
          this.tableData = this.proList.filter((item, index) => {
            return (
              this.paginationConfig.pageSize *
                (this.paginationConfig.currentPage - 1) <=
                index &&
              index <
                this.paginationConfig.pageSize *
                  this.paginationConfig.currentPage
            );
          });
        }
      });
    },
    getAllUser() {
      getAllUser().then((data) => {
        if (data.result === "SUCCESS") {
          this.userList = data.data || [];
        }
      });
    },
    currentUser(val) {
      let result = this.userList.filter((item) => {
        return item.username === val;
      });
      return result[0] ? result[0].cname : "";
    },
    //获取当前的行数
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleSizeChange(val) {
      this.paginationConfig.currentPage = 1;
      this.paginationConfig.pageSize = val;
      this.tableData = this.proList.filter((item, index) => {
        return (
          this.paginationConfig.pageSize *
            (this.paginationConfig.currentPage - 1) <=
            index &&
          index <
            this.paginationConfig.pageSize * this.paginationConfig.currentPage
        );
      });
    },
    handleCurrentChange(val) {
      this.paginationConfig.currentPage = val;
      this.tableData = this.proList.filter((item, index) => {
        return (
          this.paginationConfig.pageSize *
            (this.paginationConfig.currentPage - 1) <=
            index &&
          index <
            this.paginationConfig.pageSize * this.paginationConfig.currentPage
        );
      });
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
