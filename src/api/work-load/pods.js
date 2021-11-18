import { get, post, del } from "@/plugins/request";

export function getPods(clustername, namespace) {
  const url = namespace
    ? `/api/v1/kubepod/all?clustername=${clustername}&namespace=${namespace}`
    : `/api/v1/kubepod/all?clustername=${clustername}`;
  return get(url);
}

export function createPods(data) {
  return post(`/api/v1/kubedeploy/deployment`, data);
}

// 删除Deploy
export function delPods(data) {
  return del(`/api/v1/certificates/ingress`, data);
}

// 获取单个 Deploy 信息
export function getPodsItem(clustername, namespace, name) {
  return get(
    `/api/v1/kubepod/pod?clusterName=${clustername}&namespace=${namespace}&name=${name}`
  );
}

// 更新 Deploy
// `json:"cluster_name"`  # 集群名称
// ResourceType      string                    `json:"resource_type"` # 资源类型；如deployment
// ResourceName      string                    `json:"resource_name"`# 资源名称，如depoyment名称
// Namespace         string                    `json:"namespace"` # 资源的namespace
// Data              string                    `json:"data"` # deployment的yaml
export function updatePods(data) {
  return post("/api/v1/kubernetes/resource/update", data);
}
