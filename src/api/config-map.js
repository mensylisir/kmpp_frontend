import { get, post, del } from "@/plugins/request";

export function getConfigmap(clustername, namespace) {
  const url = namespace
    ? `/api/v1/kubernetes/configmap?clustername=${clustername}&namespace=${namespace}`
    : `/api/v1/kubernetes/configmap?clustername=${clustername}`;
  return get(url);
}

export function getCronjob(clustername, namespace) {
  const url = namespace
    ? `/api/v1/kubernetes/cronjob?clustername=${clustername}&namespace=${namespace}`
    : `/api/v1/kubernetes/cronjob?clustername=${clustername}`;
  return get(url);
}

export function createConfig(data) {
  return post(`/api/v1/kubernetes/configmap`, data);
}

// 删除Deploy
export function delJob(data) {
  return del(`/api/v1/kubernetes/configmap`, data);
}


// 获取单个 Deploy 信息
export function getConfigItem(clustername, namespace, name) {
  return get(
    `/api/v1/kubernetes/configmap?clusterName=${clustername}&namespace=${namespace}&name=${name}`
  );
}

// 更新 Deploy
// `json:"cluster_name"`  # 集群名称
// ResourceType      string                    `json:"resource_type"` # 资源类型；如deployment
// ResourceName      string                    `json:"resource_name"`# 资源名称，如depoyment名称
// Namespace         string                    `json:"namespace"` # 资源的namespace
// Data              string                    `json:"data"` # deployment的yaml
export function updateJob(data) {
  return post("/api/v1/kubernetes/configmap/update", data);
}

export function createPvc(data) {
  return post(`/api/v1/kubepvc/pvc`, data);
}

// 获取 storageClass
export function getStorageClass(clustername) {
  const url = `/api/v1/kubedeploy/allstorageclass?clustername=${clustername}`;
  return get(url);
}

// 获取 pvclist
export function getPvcList(clustername, namespace) {
  const url = `/proxy/kubernetes/${clustername}/api/v1/namespaces/${namespace}/persistentvolumeclaims`;
  return get(url);
}

