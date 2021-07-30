import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/notification",
  sort: 8,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "消息中心",
    icon: "iconfont icon-notification",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
