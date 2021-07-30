import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/servicemesh",
  sort: 6,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "服务网格",
    icon: "iconfont icon-servicemesh",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
