import Layout from "@/business/app-layout/horizontal-layout";

const Host = {
  sort: 0,
  path: '/hosts',
  component: Layout,
  name: 'Host',
  meta: {
    title: "route.host",
    icon: 'iconfont icon-resourcemanage',
    roles: ['ADMIN', "PROJECT_MANAGER"]
  },
  children: [
    {
      path: 'list',
      component: () => import('@/business/hosts'),
      name: "HostList",
      meta: {
        title: "计算",
        roles: ['ADMIN', "PROJECT_MANAGER"]
      },
    },
    {
      path: "create",
      hidden: true,
      name: "HostCreate",
      component: () => import('@/business/hosts/create'),
      meta: {
        activeMenu: "/hosts/list",
        roles: ['ADMIN']
      },
    },
    {
      path: 'storage',
      component: () => import('@/business/hosts/storage'),
      name: "storage",
      meta: {
        title: "存储",
        roles: ['ADMIN', "PROJECT_MANAGER"]
      },
    },
    {
      path: "storage-provisioner-create",
      name: "StorageProvionerCreate",
      hidden: true,
      props: true,
      component: () => import("@/business/hosts/storage/detail/provisioner-create"),
      meta: {
        activeMenu: "/hosts/list",
        roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"]
      }
    },
    {
      path: "storage-class-create",
      name: "StorageClassCreate",
      hidden: true,
      props: true,
      component: () => import("@/business/hosts/storage/detail/class-create"),
      meta: {
        activeMenu: "/hosts/list",
        roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"]
      }
    },
  ]
}
export default Host
