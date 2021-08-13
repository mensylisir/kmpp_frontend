import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/middleware",
  sort: 6,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "中间件管理",
    icon: "iconfont icon-middleware",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [
    {
      path: 'list',
      component: () => import('@/business/middleware'),
      name: "middlewareList",
      meta: {
        title: "中间件管理",
      },
    },
  ]
}
export default Manifest
