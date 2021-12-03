<template>
  <layout-content header="" class="middle">
    <div class="top">
      <div style="display: flex; align-items: center">
        <div class="detail">中间件</div>
        <el-menu
          :default-active="activeKey"
          mode="horizontal"
          @select="tabChange"
        >
          <el-menu-item index="deploy"> 我的部署 </el-menu-item>
          <el-menu-item index="store"> 应用商店 </el-menu-item>
        </el-menu>
      </div>
      <el-cascader
        @expand-change="change"
        v-show="activeKey === 'deploy'"
        :props="props"
        v-model="nameSpace"
        :options="clusterList"
        placeholder="请选择"
      ></el-cascader>
    </div>
    <div class="bottom">
      <router-view
        :nameSpace="nameSpace"
        v-if="nameSpace.length === 2"
      ></router-view>
    </div>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";

export default {
  name: "HostCreate",
  components: { LayoutContent },
  data() {
    return {
      clusterList: [],
      nameSpace: [],
      props: {
        emitPath: true,
        lazy: false,
        lazyLoad: this.lazyLoad,
      },
    };
  },
  methods: {
    lazyLoad(node, resolve) {
      this.getCluester(node, resolve);
    },
    tabChange(index) {
      this.activeKey = index;
      if (index === "deploy") {
        if (this.$route.params.monitor) {
          this.$router.push({
            name: "MiddleDeploy",
            params: {
              middleName: this.$route.params.name,
            },
          });
        } else {
          this.$router.push({ name: "MiddleDeploy" });
        }
      } else if (index === "store") {
        this.$router.push({ name: "MiddleStore" });
      }
    },
    change(item) {
      if (item.length === 1) {
        this.getNamespace(item[0], true);
      }
    },
    // 获取集群信息
    getCluester() {
      searchClusters(1, 1000, "")
        .then((data) => {
          if (data) {
            let result = data.items.filter((item) => {
              return item.source === "local";
            });
            result.forEach((item) => {
              item.label = item.value = item.name;
              item.leaf = false;
              item.children = [];
            });
            if (result.length > 0) {
              this.getNamespace(
                this.$route.params.monitor
                  ? this.$route.params.cluster
                  : result[0].name
              );
            }
            this.clusterList = result;
          }
        })
        .catch(() => {
        });
    },
    // 获取namespace
    getNamespace(name, flag) {
      listNamespace(name)
        .then((data) => {
          let result = data.items;
          result.forEach((item) => {
            item.label = item.value = item.metadata.name;
            item.leaf = true;
          });
          let currentNode = this.clusterList.filter((item) => {
            return item.name === name;
          });
          currentNode[0].children = result;
          this.nameSpace = [];
          this.nameSpace.push(name);
          if (this.$route.params.monitor) {
            this.nameSpace.push(this.$route.params.nameSpace);
          } else {
            this.nameSpace.push(currentNode[0].children[0].metadata.name);
          }
          if (!flag) {
            this.tabChange(this.activeKey);
          }
        })
        .catch(() => {});
    },
    // 获取我的部署
    init() {
      this.activeKey = "deploy";
      this.getCluester();
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      if (this.$route.params.monitor) {
        this.init();
      }
    },
  },
  computed: {
    activeKey: {
      get: function () {
        let value = this.$route.meta.activeKey;
        return value;
      },
      set: function () {},
    },
  },
};
</script>

<style scoped lang='scss'>
.middle {
  background: #f4f5f7;
  padding: 0;
  position: relative;
  .top {
    background: white;
    padding: 0 16px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 0 0 #e4e7f0;
  }
  .bottom {
    height: calc(100% - 65px);
    width: 100%;
    .card-group {
      display: flex;
      .item {
        min-width: 329px;
        background: white;
        padding: 24px;
        display: flex;
        svg {
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }
        .right {
          display: flex;
          flex-flow: column;
          h5 {
            font-size: 16px;
            color: #2c2e33;
            line-height: 24px;
            font-weight: 500;
          }
          .description {
            font-size: 12px;
            color: #4b5059;
            line-height: 20px;
            font-weight: 400;
            margin: 8px 0;
            span {
              margin-top: 8px;
              background: #4b5059;
            }
          }
          .status {
            font-size: 12px;
            color: #2c2e33;
            line-height: 20px;
            font-weight: 400;
          }
        }
      }
    }
  }
}
.detail {
  font-size: 16px;
  color: #2c2e33;
  line-height: 24px;
  font-weight: 500;
  border-right: 1px solid #e4e7f0;
  height: 24px;
  padding-right: 12px;
}
/deep/ .el-menu-item {
  height: 56px;
  font-size: 16px;
  color: #2c2e33;
}
</style>
