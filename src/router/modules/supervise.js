import Layout from "@/business/app-layout/horizontal-layout";

const Manifest = {
  path: "/supervise",
  sort: 2,
  component: Layout,
  name: "Manifest",
  meta: {
    icon: "iconfont icon-certificationmanage",
    roles: ["ADMIN", "PROJECT_MANAGER"],
    title: "监控中心"
  },
  children: [
    // {
    //   path: "list",
    //   component: () => import("@/business/supervise"),
    //   name: "list",
    //   meta: {
    //     title: "监控中心"
    //   }
    // },
    {
      path: "dashboard",
      component: () => import("@/business/operation-dashboard"),
      name: "dashboard",
      meta: {
        title: "运维大盘"
      }
    }
  ]
};
export default Manifest;
