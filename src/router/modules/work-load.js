import Layout from "@/business/app-layout/horizontal-layout";

const Work = {
  sort: 1,
  path: "/work",
  component: Layout,
  name: "Work",
  meta: {
    title: "工作负载",
    icon: "iconfont icon-workloads",
    roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
  },
  children: [
    {
      path: "pods",
      component: () => import("@/business/work-load/pods/index"),
      name: "pods",
      meta: {
        title: "Pods",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "pods-details",
      hidden: true,
      name: "podsDetails",
      component: () => import("@/business/work-load/pods/details/index"),
      meta: {
        activeMenu: "/work/pods",
        roles: ["ADMIN", "COMMON"]
      },
      children: [
        {
          path: "pods-details-mod/:clusterName/:podsName/:namespace",
          name: "podsDetailsMod",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/pods/details/details"),
          meta: {
            activeMenu: "/work/pods",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "pods-details-check/:clusterName/:podsName/:namespace",
          name: "podsDetailsCheck",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/pods/details/check"),
          meta: {
            activeMenu: "/work/pods",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "pods-details-edit/:clusterName/:podsName/:namespace",
          name: "podsDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/pods/details/edit"),
          meta: {
            activeMenu: "/work/pods",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    },
    {
      path: "deploy",
      component: () => import("@/business/work-load/deploy/index"),
      name: "deploy",
      meta: {
        title: "部署",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "deploy-create/:cluster",
      hidden: true,
      name: "deployCreate",
      component: () => import("@/business/work-load/deploy/create"),
      meta: {
        activeMenu: "/work/deploy",
        roles: ["ADMIN", "COMMON"]
      }
    },
    {
      path: "deploy-details",
      hidden: true,
      name: "deployDetails",
      component: () => import("@/business/work-load/deploy/details/index"),
      meta: {
        activeMenu: "/work/deploy",
        roles: ["ADMIN", "COMMON"]
      },
      children: [
        {
          path: "deploy-details-mod/:clusterName/:deployName/:namespace",
          name: "deployDetailsMod",
          props: true,
          hidden: true,
          component: () =>
            import("@/business/work-load/deploy/details/details"),
          meta: {
            activeMenu: "/work/deploy",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "deploy-details-check/:clusterName/:deployName/:namespace",
          name: "deployDetailsCheck",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/deploy/details/check"),
          meta: {
            activeMenu: "/work/deploy",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "deploy-details-edit/:clusterName/:deployName/:namespace",
          name: "deployDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/deploy/details/edit"),
          meta: {
            activeMenu: "/work/deploy",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    },
    // 任务
    {
      path: "task",
      component: () => import("@/business/work-load/task/index"),
      name: "task",
      meta: {
        title: "任务",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "task-create/:cluster/:currType ",
      hidden: true,
      name: "taskCreate",
      component: () => import("@/business/work-load/task/create"),
      meta: {
        activeMenu: "/work/task",
        roles: ["ADMIN", "COMMON"]
      }
    },
    {
      path: "task-details",
      hidden: true,
      name: "taskDetails",
      component: () => import("@/business/work-load/task/details/index"),
      meta: {
        activeMenu: "/work/task",
        roles: ["ADMIN", "COMMON"]
      },
      children: [
        {
          path: "task-details-mod/:clusterName/:deployName/:namespace/:currType",
          name: "taskDetailsMod",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/task/details/details"),
          meta: {
            activeMenu: "/work/task",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "task-details-check/:clusterName/:deployName/:namespace/:currType",
          name: "taskDetailsCheck",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/task/details/check"),
          meta: {
            activeMenu: "/work/task",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "task-details-edit/:clusterName/:deployName/:namespace/:currType",
          name: "taskDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/task/details/edit"),
          meta: {
            activeMenu: "/work/task",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    },
    {
      path: "services",
      component: () => import("@/business/work-load/services/index"),
      name: "services",
      meta: {
        title: "服务",
        roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"]
      }
    },
    {
      path: "services-create/:cluster",
      hidden: true,
      name: "servicesCreate",
      component: () => import("@/business/work-load/services/create"),
      meta: {
        activeMenu: "/work/services",
        roles: ["ADMIN"]
      }
    },
    {
      path: "services-details",
      hidden: true,
      name: "servicesDetails",
      component: () => import("@/business/work-load/services/details/index"),
      meta: {
        activeMenu: "/work/services",
        roles: ["ADMIN", "COMMON"]
      },
      children: [
        {
          path: "services-details-mod/:clusterName/:servicesName/:namespace",
          name: "servicesDetailsMod",
          props: true,
          hidden: true,
          component: () =>
            import("@/business/work-load/services/details/details"),
          meta: {
            activeMenu: "/work/services",
            activeKey: "details",
            action: "check"
          }
        },
        {
          path: "services-details-check/:clusterName/:servicesName/:namespace",
          name: "servicesDetailsCheck",
          props: true,
          hidden: true,
          component: () =>
            import("@/business/work-load/services/details/check"),
          meta: {
            activeMenu: "/work/services",
            activeKey: "yaml",
            action: "check"
          }
        },
        {
          path: "services-details-edit/:clusterName/:servicesName/:namespace",
          name: "servicesDetailsEdit",
          props: true,
          hidden: true,
          component: () => import("@/business/work-load/services/details/edit"),
          meta: {
            activeMenu: "/work/services",
            activeKey: "yaml",
            action: "edit"
          }
        }
      ]
    }
  ]
};

export default Work;
