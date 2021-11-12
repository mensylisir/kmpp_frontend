import { get, post, del } from "@/plugins/request";

export function getDeploy(clustername, namespace) {
  const url = namespace
    ? `/api/v1/kubedeploy/all?clustername=${clustername}&namespace=${namespace}`
    : `/api/v1/kubedeploy/all?clustername=${clustername}`;
  return get(url);
}

export function createDeploy(data) {
  return post(`/api/v1/kubedeploy/deployment`, data);
}

// 删除Deploy
export function delDeploy(data) {
  return del(`/api/v1/certificates/ingress`, data);
}

// 获取单个 Deploy 信息
export function getDeployItem(clustername, namespace, deployName) {
  return get(
    `/api/v1/kubedeploy/deployment?clusterName=${clustername}&namespace=${namespace}&deployName=${deployName}`
  );
}

// 更新 Deploy
// `json:"cluster_name"`  # 集群名称
// ResourceType      string                    `json:"resource_type"` # 资源类型；如deployment
// ResourceName      string                    `json:"resource_name"`# 资源名称，如depoyment名称
// Namespace         string                    `json:"namespace"` # 资源的namespace
// Data              string                    `json:"data"` # deployment的yaml
export function updateDeploy(data) {
  return post("/api/v1/kubernetes/resource/update", data);
}

// {
//   "clusterName":"xiang-cluster",
//   "pvcName": "xiang-test",
//   "namespace" :"xiang",
//   "accessMode": "ReadWriteOnce",
//   "storageClassName": "nfs-client",
//   "requestStorage": "12M"
//   }
export function createPvc(data) {
  return post(`/api/v1/kubepvc/pvc`, data);
}

// 获取 storageClass
export function getStorageClass(clustername) {
  const url = `/api/v1/kubedeploy/allstorageclass?clustername=${clustername}`;
  return get(url);
}

export function newGetDeployItem(clustername, namespace) {
  return get(
    `/api/v1/kubernetes/resource?clustername=${clustername}&namespace=${namespace}&resourcetype=deployment&resourcename=xiang-deploy`
  );
}
