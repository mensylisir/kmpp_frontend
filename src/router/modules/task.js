import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/task",
  sort: 9,
  component: Layout,
  name: "Manifest",
  meta: {
    title: "任务管理",
    icon: "iconfont icon-task",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [

  ]
}
export default Manifest
