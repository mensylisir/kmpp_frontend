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
      path: "createStorage",
      hidden: true,
      name: "storageCreate",
      component: () => import('@/business/hosts/storage/create'),
      meta: {
        activeMenu: "/hosts/storage",
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
    {
      path: ":name/:cluster/:namespace/deployDetail",
      name: "DeployDetail",
      props: true,
      hidden: true,
      component: () => import('@/business/hosts/middleware/deployDetail'),
      meta: {
        title: "中间件",
        activeMenu: "/hosts/middle",
        roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"],
        activeKey: "deploy"
      }
    },
    {
      path: 'middle',
      component: () => import('@/business/hosts/middleware/index'),
      name: "middle",
      props: true,
      hidden: false,
      meta: {
        title: "中间件",
        activeKey: "deploy",
        roles: ['ADMIN', "PROJECT_MANAGER"]
      },
      children: [{
        path: "deploy",
        name: "MiddleDeploy",
        props: true,
        hidden: true,
        component: () => import('@/business/hosts/middleware/deploy'),
        meta: {
          title: "中间件",
          activeMenu: "/hosts/middle",
          roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"],
          activeKey: "deploy"
        }
      },
      {
        path: "store",
        name: "MiddleStore",
        props: true,
        hidden: true,
        component: () => import('@/business/hosts/middleware/store'),
        meta: {
          title: "中间件",
          activeMenu: "/hosts/middle",
          roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"],
          activeKey: "store"
        }
      },
      {
        path: "storeDeploy",
        name: "StoreDeploy",
        props: true,
        hidden: true,
        component: () => import('@/business/hosts/middleware/storeDeploy'),
        meta: {
          title: "中间件",
          activeMenu: "/hosts/middle",
          roles: ["ADMIN","PROJECT_MANAGER","CLUSTER_MANAGER"],
          activeKey: "store"
        }
      }]
    },

    {
      path: 'tool',
      component: () => import('@/business/hosts/tool/index'),
      name: "tool",
      meta: {
        title: "工具",
        roles: ['ADMIN', "PROJECT_MANAGER"]
      },
    },
    {
      path: 'certification',
      component: () => import('@/business/hosts/certification/index'),
      name: "certification",
      meta: {
        title: "证书",
        roles: ['ADMIN', "PROJECT_MANAGER"]
      },
    },
    {
      path: "createCertification",
      hidden: true,
      name: "certificationCreate",
      component: () => import('@/business/hosts/certification/create'),
      meta: {
        activeMenu: "/hosts/certification",
        roles: ['ADMIN']
      },
    },
    {
      path: 'apiNetWork',
      component: () => import('@/business/hosts/apiNetWork/index'),
      name: "certification",
      meta: {
        title: "api网关",
        roles: ['ADMIN', "PROJECT_MANAGER"]
      },
    },
  ]
}
export default Host
