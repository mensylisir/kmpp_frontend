import Layout from "@/business/app-layout/horizontal-layout"

const notification = {
  path: "/notification",
  sort: 4,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "日志中心",
    icon: "iconfont icon-notification",
    roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER", "COMMON"]
  },
  children: [
    {
      path: "/notification",
      name: "notification",
      hidden: true,
      props: true,
      component: () => import("@/business/notification"),
      meta: {
        activeMenu: "/notification",
        roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER", "COMMON"]
      }
    },
  ]
}
export default notification
