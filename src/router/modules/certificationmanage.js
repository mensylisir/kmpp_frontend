import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/certificationmanage",
  sort: 5,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "证书管理",
    icon: "iconfont icon-certificationmanage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
