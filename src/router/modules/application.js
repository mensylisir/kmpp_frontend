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
    {
      path: 'list',
      component: () => import('@/business/application'),
      name: "applicationList",
      meta: {
        title: "项目管理",
      },
    },
  ]
}
export default Manifest
