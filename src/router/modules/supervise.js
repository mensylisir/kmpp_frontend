import Layout from "@/business/app-layout/horizontal-layout";

const Manifest = {
  path: "/supervise",
  sort: 2,
  component: Layout,
  name: "Manifest",
  meta: {
    icon: "iconfont icon-apps-manage",
    roles: ["ADMIN", "PROJECT_MANAGER", "COMMON"],
    title: "监控告警"
  },
  children: [
    {
      path: "dashboard",
      component: () => import("@/business/operation-dashboard"),
      name: "dashboard",
      meta: {
        title: "运维大盘"
      }
    },
    {
      path: "appWatch",
      component: () => import("@/business/app-watch/index"),
      name: "appWatch",
      meta: {
        title: "应用资源",
        activeKey: "recommend"
      },
      children: [{
        path: "recommend",
        name: "recommend",
        props: true,
        hidden: true,
        component: () => import('@/business/app-watch/recommend'),
        meta: {
          activeMenu: "/supervise/appWatch",
          activeKey: "recommend"
        }
      },
      {
        path: "useCondition",
        name: "useCondition",
        props: true,
        hidden: true,
        component: () => import('@/business/app-watch/useCondition'),
        meta: {
          activeMenu: "/supervise/appWatch",
          activeKey: "useCondition"
        }
      }]
    },
    {
      path: "warning",
      component: () => import("@/business/app-warning/index"),
      name: "warning",
      meta: {
        title: "告警",
        activeKey: "notice"
      },
      children: [
        {
          path: "notice",
          name: "notice",
          props: true,
          hidden: true,
          component: () => import('@/business/app-warning/notice'),
          meta: {
            activeMenu: "/supervise/warning",
            activeKey: "notice"
          }
        },
      {
        path: "strategy",
        name: "strategy",
        props: true,
        hidden: true,
        component: () => import('@/business/app-warning/strategy'),
        meta: {
          activeMenu: "/supervise/warning",
          activeKey: "strategy"
        }
      }
    ]
    },
    {
      path: ":groupname/strategyDetail",
      name: "strategyDetail",
      props: true,
      hidden: true,
      component: () => import('@/business/app-warning/strategyDetail'),
      meta: {
        activeMenu: "/supervise/warning",
        activeKey: "strategy"
      }
    }
  ]
};
export default Manifest;
