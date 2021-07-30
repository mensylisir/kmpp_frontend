import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/certification",
  sort: 2,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "认证授权",
    icon: "iconfont icon-certificationmanage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
