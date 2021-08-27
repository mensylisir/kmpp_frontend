import Layout from "@/business/app-layout/horizontal-layout"

const serviceMesh = {
  path: "/serviceMesh",
  sort: 6,
  component: Layout,
  name: "serviceMesh",
  meta: {
    title: "服务网格",
    icon: "iconfont icon-servicemesh",
  },
  children: [
    {
      path: "/serviceMesh",
      name: "serviceMeshIstio",
      hidden: true,
      props: true,
      component: () => import("@/business/serviceMesh"),
      meta: {
        activeMenu: "/serviceMesh",
        roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"]
      }
    },
  ]
}
export default serviceMesh
