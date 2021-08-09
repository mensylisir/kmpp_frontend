<template>
  <el-button
    circle
    :class="['sidebar-toggle-button', icon]"
    @click="toggle"
    class="slidebar-position"
  ></el-button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SidebarToggleButton",
  methods: {
    toggle() {
      this.$store.dispatch("app/toggleSideBar");
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
    icon() {
      return this.sidebar.opened ? "iconfont iconfold" : "iconfont iconunfold";
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-toggle-button.el-button {
  font-size: 16px;
  background-color: white;
  color: #5b5d78;
}
.slidebar-position {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
</style>
