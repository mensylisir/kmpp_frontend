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
    {
      path: "taskCreate",
      hidden: true,
      name: "taskCreate",
      component: () => import('@/business/task/create'),
      meta: {
        activeMenu: "/task/list",
        roles: ['ADMIN']
      },
    },
  ]
}
export default Manifest
