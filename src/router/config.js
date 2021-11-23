import Layout from "@/business/app-layout/horizontal-layout";

const configMap = {
  sort: 1,
  path: "/configMap",
  component: Layout,
  name: "configMap",
  meta: {
    title: "configMap",
    icon: "iconfont icon-config",
    roles: ["ADMIN", "PROJECT_MANAGER"]
  },
  children: [
    // 任务
    {
      path: "index",
      component: () => import("@/business/config-map/index"),
      name: "configMapIndex",
      meta: {
        title: "configMap",
        roles: ["ADMIN", "PROJECT_MANAGER"]
      }
    },
    {
      path: "create/:cluster",
      hidden: true,
      name: "create",
      component: () => import("@/business/config-map/create"),
      meta: {
        activeMenu: "/configMap/index",
        roles: ["ADMIN"]
    },
    {
      path: "details",
      hidden: true,
      name: "details",
      component: () => import("@/business/config-map/details/index"),
      meta: {
        activeMenu: "/configMap",
        roles: ["ADMIN"]
      },
      children: [
        {
          path: "details-mod/:clusterName/:deployName/:namespace",
          name: "taskDetailsMod",
          props: true,
          hidden: true,
          component: () => import("@/business/config-map/details/details"),
          meta: {
            activeMenu: "/configMap",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "details-check/:clusterName/:deployName/:namespace",
          name: "detailsCheck",
          props: true,
          hidden: true,
          component: () => import("@/business/config-map/details/check"),
          meta: {
            activeMenu: "/configMap",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "details-edit/:clusterName/:deployName/:namespace",
          name: "detailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/config-map/details/edit"),
          meta: {
            activeMenu: "/configMap",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    },
  ]
};

export default configMap;
