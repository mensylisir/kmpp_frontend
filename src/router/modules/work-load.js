import Layout from "@/business/app-layout/horizontal-layout";

const Work = {
  sort: 0,
  path: "/work",
  component: Layout,
  name: "Work",
  meta: {
    title: "工作负载",
    icon: "iconfont icon-resourcemanage",
    roles: ["ADMIN", "PROJECT_MANAGER"]
  },
  children: [
    {
      path: "deploy",
      component: () => import("@/business/work-load/deploy/index"),
      name: "deploy",
      meta: {
        title: "部署",
        roles: ["ADMIN", "PROJECT_MANAGER"]
      }
    },
    {
      path: "deploy-create/:cluster",
      hidden: true,
      name: "deployCreate",
      component: () => import("@/business/work-load/deploy/create"),
      meta: {
        activeMenu: "/work/deploy",
        roles: ["ADMIN"]
      }
    },
    {
      path: "deploy-details",
      hidden: true,
      name: "deployDetails",
      component: () => import("@/business/work-load/deploy/details/index"),
      meta: {
        activeMenu: "/work/deploy",
        roles: ["ADMIN"]
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
    }
  ]
};

export default Work;
