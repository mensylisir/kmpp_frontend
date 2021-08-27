<template>
  <div id="app">
    <router-view />
    <div class="change-platform" v-show="$store.state.app.changeForm">
      <i class="iconfont close-icon icon-close-line" @click="close"></i>
      <el-row type="flex" justify="center">
        <el-col :span="4" :class="{ actve: activeItem === 'xzpt' }">
          <div
            class="platform-item"
            @mouseenter="activeItem = 'xzpt'"
            @click="changeplatform('cbpt')"
          >
            <svg class="icon icon-xzpt-1" aria-hidden="true">
              <use xlink:href="#icon-xzpt"></use>
            </svg>
            <span class="name">项目协作平台</span>
            <span class="description"
              >打开即用的敏捷开发工作流，让研发管理自动化、数据化、智能化、让项目团队高效协作，帮助企业提升研发效能</span
            >
          </div>
        </el-col>
        <el-col :span="4" :class="{ actve: activeItem === 'CICD' }">
          <div
            @mouseenter="activeItem = 'CICD'"
            class="platform-item"
            @click="close"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-CICD"></use>
            </svg>
            <span class="name">持续交付平台</span>
            <span class="description">
              企业级持续集成和持续交付工具，支持应用架构守护、灰度发布、流程管控等能力，让您的软件简单，快捷，安全，高效的交付</span
            >
          </div>
        </el-col>
        <el-col :span="4" :class="{ actve: activeItem === 'kubeoperator' }">
          <div @mouseenter="activeItem = 'kubeoperator'" class="platform-item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-kubeoperator"></use>
            </svg>
            <span class="name">太初容器平台</span>
            <span class="description"
              >一站式的完备的分布式系统支撑平台，
              支持多层安全防护、准入机制、多租户应用支撑， 助企业降低 IT
              成本，提升运维效率
            </span>
          </div>
        </el-col>
        <el-col :span="4" :class="{ actve: activeItem === 'develop' }">
          <div @mouseenter="activeItem = 'develop'" class="platform-item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-develop"></use>
            </svg>
            <span class="name">开发者平台</span>
            <span class="description"
              >面向开发者打造的一站式开发平台，实现企业内技术共享、框架复用，做到开发的规范，快速上手、高效交付，助力企业快速开发交付分布式应用系统</span
            >
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeItem: "kubeoperator",
    };
  },
  methods: {
    // 跳转平台
    changeplatform(target) {
      if (target === "cbpt") {
        window.open("https://project.dev.rdev.tech/#/my");
      }
    },
    // 关闭弹窗
    close() {
      this.$store.state.app.changeForm = false;
    },
  },
  computed: {
    // 是否切换平台
    changeForm() {
      return this.$store.state.app.changeForm;
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  .change-platform {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    opacity: 0.95;
    background: #1a2334;
    .active-item {
      background: #0a59cc;
    }
    .close-icon {
      font-size: 24px;
      float: right;
      margin: 40px 40px 0 0;
      color: #ffffff;
      &:hover {
        cursor: pointer !important;
      }
    }
    .el-row {
      height: 100%;
    }
    .actve {
      background: #0a59cc;
    }
    .platform-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
      svg {
        width: 64.8px;
        height: 53px;
      }
      .name {
        font-size: 24px;
        color: #ffffff;
        line-height: 32px;
        font-weight: 500;
        margin: 25px 0 27px;
      }
      .description {
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 20px;
        font-weight: 400;
        padding: 0 40px;
      }
    }
  }
}
</style>
