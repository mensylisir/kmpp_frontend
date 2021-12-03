import Layout from "@/business/app-layout/horizontal-layout"

const Authorize = {
  path: "/authorize",
  sort: 3,
  component: Layout,
  name: "Manifest",
  meta: {
    icon: "iconfont icon-task",
    roles: ["ADMIN","PROJECT_MANAGER", "COMMON"]
  },
  children: [
    {
      path: 'list',
      component: () => import('@/business/authorize'),
      name: "authorizeList",
      meta: {
        title: "授权中心",
      },
    },
    {
      path: "authorizeCreate",
      hidden: true,
      name: "authorizeCreate",
      component: () => import('@/business/authorize/create'),
      meta: {
        activeMenu: "/authorize/list",
        roles: ['ADMIN', "COMMON"]
      },
    },
  ]
}
export default Authorize
