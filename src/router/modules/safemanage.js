import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/safemanage",
  sort: 5,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "安全管理",
    icon: "iconfont icon-safemanage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
