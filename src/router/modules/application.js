import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/application",
  sort: 2,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "项目管理",
    icon: "iconfont icon-apps-manage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
