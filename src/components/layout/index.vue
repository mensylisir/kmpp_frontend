<template>
  <el-container class="layout-container">
    <slot>
      <layout-sidebar/>
      <layout-main>
        <layout-header>
          <slot name="header"></slot>
        </layout-header>
        <layout-view/>
      </layout-main>
    </slot>
  </el-container>
</template>

<script>
import LayoutSidebar from "@/components/layout/LayoutSidebar";
import LayoutMain from "@/components/layout/LayoutMain";
import LayoutHeader from "@/components/layout/LayoutHeader";
import LayoutView from "@/components/layout/LayoutView";

export default {
  name: "Layout",
  components: {LayoutView, LayoutHeader, LayoutMain, LayoutSidebar},
}
</script>

<style lang="scss">
@import "~@/styles/common/variables";

.layout-container {
  min-width: 1024px;
  height: 100%;
  background-color: #F4F5F7;
}

.main-container {
  position: relative;
}

.sidebar-container {
  position: relative;
  transition: width 0.28s;
  width: $sidebar-open-width;
  min-width: $sidebar-open-width;
  // background-color: #222740;
  // background-image: $sidebar-bg-gradient;

  &.is-collapse {
    width: $sidebar-close-width;
    min-width: $sidebar-close-width;
  }
}

.header-container {
  // padding: 0 15px;
  box-shadow: inset 0 -1px 0 0 #DCDEE4;
}

.view-container {
  display: block;
  flex: auto;
  overflow: auto;
  box-sizing: border-box;
}
</style>
