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
      }
    },
    {
      path: "config-details",
      hidden: true,
      name: "configDetails",
      component: () => import("@/business/config-map/details/index"),
      meta: {
        activeMenu: "/configMap/index",
        roles: ["ADMIN"]
      },
      children: [
        {
          path: "config-details-mod/:clusterName/:deployName/:namespace",
          name: "configDetailsMod",
          props: true,
          hidden: true,
          component: () => import("@/business/config-map/details/details"),
          meta: {
            activeMenu: "/configMap/index",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "config-details-check/:clusterName/:deployName/:namespace",
          name: "configDetailsCheck",
          props: true,
          hidden: true,
          component: () => import("@/business/config-map/details/check"),
          meta: {
            activeMenu: "/configMap/index",

            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "config-details-edit/:clusterName/:deployName/:namespace",
          name: "configDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/config-map/details/edit"),
          meta: {
            activeMenu: "/configMap/index",

            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    },
  ]
};

export default configMap;
