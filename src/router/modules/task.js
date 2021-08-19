import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/task",
  sort: 4,
  component: Layout,
  name: "Manifest",
  meta: {
    icon: "iconfont icon-task",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [
    {
      path: 'list',
      component: () => import('@/business/task'),
      name: "taskList",
      meta: {
        title: "授权中心",
      },
    },
  ]
}
export default Manifest
