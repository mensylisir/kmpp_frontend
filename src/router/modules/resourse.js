import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/resourse",
  sort: 0,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "资源管理",
    icon: "iconfont icon-resourcemanage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
