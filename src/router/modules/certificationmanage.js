import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/certificationmanage",
  sort: 4,
  component: Layout,
  name: "Manifest",
  meta: {
    icon: "iconfont icon-certificationmanage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [
    {
      path: 'list',
      component: () => import('@/business/certificationManage'),
      name: "list",
      meta: {
        title: "证书管理",
      },
    },
  ]
}
export default Manifest
