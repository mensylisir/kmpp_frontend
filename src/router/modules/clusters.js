import Layout from "@/business/app-layout/horizontal-layout";

const Cluster = {
  path: "/clusters",
  sort: 1,
  component: Layout,
  name: "Clusters",
  meta: {
    title: "集群管理",
    icon: "iconfont icon-clustermanage",
    roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
  },
  children: [
    {
      path: "/clusters",
      component: () => import("@/business/clusters"),
      name: "ClusterList",
      meta: {
        title: "集群",
        roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
      }
    },
    {
      path: "create",
      hidden: true,
      component: () => import("@/business/clusters/create"),
      name: "ClusterCreate",
      meta: {
        activeMenu: "/clusters",
        roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER"]
      }
    },
    {
      path: "upgrade/:name",
      hidden: true,
      component: () => import("@/business/clusters/upgrade"),
      name: "ClusterUpgrade",
      meta: {
        activeMenu: "/clusters",
        roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER"]
      }
    },
    {
      path: "import",
      hidden: true,
      component: () => import("@/business/clusters/import"),
      name: "ClusterImport",
      meta: {
        activeMenu: "/clusters",
        roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER"]
      }
    },
    {
      path: "detail/:name",
      props: true,
      hidden: true,
      component: () => import("@/business/clusters/detail/index"),
      name: "ClusterDetail",
      meta: {
        activeMenu: "/clusters",
        roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
      },
      children: [
        {
          path: "overview",
          name: "ClusterOverview",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/overview"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "node",
          name: "ClusterNode",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/node"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "namespace",
          name: "ClusterNamespace",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/namespace"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "tool",
          name: "ClusterTool",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/tool"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "monitor",
          name: "ClusterMonitor",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/monitor"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "backup",
          name: "ClusterBackup",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/backup"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "f5",
          name: "ClusterF5",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/f5"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "shell",
          name: "shell",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/shell"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "security",
          name: "ClusterSecurity",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/security"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "logging",
          name: "ClusterLogging",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/log/logging"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "loki",
          name: "ClusterLoki",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/log/loki"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "istio",
          name: "ClusterIstio",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/istio"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "event",
          name: "ClusterEvent",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/event"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "storage",
          name: "ClusterStorage",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/storage"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        },
        {
          path: "storage-provisioner-create",
          name: "ClusterStorageProvionerCreate",
          hidden: true,
          props: true,
          component: () =>
            import("@/business/clusters/detail/storage/provisioner-create"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER"]
          }
        },
        {
          path: "storage-class-create",
          name: "ClusterStorageClassCreate",
          hidden: true,
          props: true,
          component: () =>
            import("@/business/clusters/detail/storage/class-create"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER"]
          }
        },
        {
          path: "pv-create",
          name: "ClusterStoragePvCreate",
          hidden: true,
          props: true,
          component: () =>
            import("@/business/clusters/detail/storage/pv-create"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER"]
          }
        },
        {
          path: "grade",
          name: "ClusterGrade",
          hidden: true,
          props: true,
          component: () => import("@/business/clusters/detail/grade"),
          meta: {
            activeMenu: "/clusters",
            roles: ["ADMIN", "PROJECT_MANAGER", "CLUSTER_MANAGER", "COMMON"]
          }
        }
      ]
    },
    {
      path: "namespace",
      component: () => import("@/business/clusters/namespace/index"),
      name: "namespace",
      meta: {
        title: "命名空间",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "namespace-details",
      hidden: true,
      name: "namespaceDetails",
      component: () => import("@/business/clusters/namespace/details/index"),
      meta: {
        activeMenu: "/clusters/namespace",
        roles: ["ADMIN", "COMMON"]
      },
      children: [
        {
          path: "namespace-details-mod/:clusterName/:name",
          name: "namespaceDetailsMod",
          props: true,
          hidden: true,
          component: () =>
            import("@/business/clusters/namespace/details/details"),
          meta: {
            activeMenu: "/clusters/namespace",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "namespace-details-check/:clusterName/:name",
          name: "namespaceDetailsCheck",
          props: true,
          hidden: true,
          component: () =>
            import("@/business/clusters/namespace/details/check"),
          meta: {
            activeMenu: "/clusters/namespace",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "namespace-details-edit/:clusterName/:name",
          name: "namespaceDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/clusters/namespace/details/edit"),
          meta: {
            activeMenu: "/clusters/namespace",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    }
  ]
};
export default Cluster;
