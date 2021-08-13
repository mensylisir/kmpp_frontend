<template>
  <layout-content header="任务管理">

  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";

export default {
  name: "serviceMesh",
  components: { LayoutContent },
  data() {
    return{}
  },
  mounted() {
   
  },
  computed: {},
  methods: {

  }
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
