<template>
  <div class="sidebar-bottom">
    <i
      :class="['sidebar-toggle-button', icon]"
      @click="toggle"
      class="slidebar-position"
    ></i>
  </div>
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
      return this.sidebar.opened ? "iconfont icon-indent-decrease" : "iconfont icon-indent-increase";
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-bottom {
  border-top: 1px solid #E4E7F0;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.sidebar-toggle-button {
  font-size: 16px;
  color: #4B5059;
  cursor: pointer;
}
.slidebar-position {

}
</style>
