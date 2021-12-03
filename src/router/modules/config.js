import Layout from "@/business/app-layout/horizontal-layout";

const configMap = {
  sort: 2,
  path: "/config",
  component: Layout,
  name: "config",
  meta: {
    title: "配置",
    icon: "iconfont icon-config",
    roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
  },
  children: [
    {
      path: "index",
      component: () => import("@/business/config-map/index"),
      name: "configMapIndex",
      meta: {
        title: "configMap",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "create/:cluster",
      hidden: true,
      name: "create",
      component: () => import("@/business/config-map/create"),
      meta: {
        activeMenu: "/config/index",
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
        roles: ["ADMIN", "COMMON"]
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
    // secret
    {
      path: "secret",
      component: () => import("@/business/secret/index"),
      name: "secretIndex",
      meta: {
        title: "secret",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "secret/create/:cluster",
      hidden: true,
      name: "secretCreate",
      component: () => import("@/business/secret/create"),
      meta: {
        activeMenu: "/config/secret",
        roles: ["ADMIN"]
      }
    },
    {
      path: "secret-details",
      hidden: true,
      name: "secretDetails",
      component: () => import("@/business/secret/details/index"),
      meta: {
        activeMenu: "/config/secret",
        roles: ["ADMIN", "COMMON"]
      },
      children: [
        {
          path: "secret-details-mod/:clusterName/:deployName/:namespace",
          name: "secretDetailsMod",
          props: true,
          hidden: true,
          component: () => import("@/business/secret/details/details"),
          meta: {
            activeMenu: "/config/secret",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "secret-details-check/:clusterName/:deployName/:namespace",
          name: "secretDetailsCheck",
          props: true,
          hidden: true,
          component: () => import("@/business/secret/details/check"),
          meta: {
            activeMenu: "/config/secret",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "secret-details-edit/:clusterName/:deployName/:namespace",
          name: "secretDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/secret/details/edit"),
          meta: {
            activeMenu: "/config/secret",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    },
  ]
};

export default configMap;
