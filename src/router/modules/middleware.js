import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/middleware",
  sort: 7,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "中间件管理",
    icon: "iconfont icon-middleware",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
