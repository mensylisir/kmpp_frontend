import Layout from "@/business/app-layout/horizontal-layout"

const Manifest = {
  path: "/certification",
  sort: 9,
  component: Layout,
  name: "Manifest",
  meta: {
    icon: "iconfont icon-certificationmanage",
    roles: ["ADMIN","PROJECT_MANAGER"]
  },
  children: [
    {
      path: 'list',
      component: () => import('@/business/certification'),
      name: "certificationList",
      meta: {
        title: "认证授权",
      },
    },
  ]
}
export default Manifest
