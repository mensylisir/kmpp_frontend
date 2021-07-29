<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebar-logo-fade" mode="out-in">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="collapseLogo"
          :src="collapseLogo"
          class="sidebar-logo"
          alt="Sidebar Logo"
        />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" alt="Sidebar Logo" />
      </router-link>
    </transition>
  </div>
</template>

<script>
import { getTheme } from "@/api/theme";

export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    getTheme().then((data) => {
      if (data.logo) {
        this.logo = data.logo;
      }
      if (data.systemName) {
        this.title = data.systemName;
      }
    });
  },
  data() {
    return {
      title: "FIT2CLOUD",
      logo: require("@/assets/KubeOperator-white.svg"),
      collapseLogo: require("@/assets/favicon.svg"),
    };
  },
};
</script>

<style lang="scss">
@import "~@/styles/common/variables";

.sidebar-logo-container {
  position: relative;
  height: 80px;
  line-height: $header-height;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0.2;
  }

  & .sidebar-logo-link {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 100%;
    width: auto;

    & .sidebar-logo {
      height: 36px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo-link {
      padding: 0 10px;
    }

    .sidebar-logo {
      margin: auto;
    }
  }
}

.sidebar-logo-fade-enter-active {
  transition: opacity 0.1s;
  transition-delay: 0.1s;
}

.sidebar-logo-fade-leave-active {
  opacity: 0;
}

.sidebar-logo-fade-enter,
.sidebar-logo-fade-leave-to {
  opacity: 0;
}
</style>
