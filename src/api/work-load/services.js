import { get, post, del } from "@/plugins/request";

export function getServices(clustername, namespace) {
  const url = namespace
    ? `/api/v1/kubeservice/all?clustername=${clustername}&namespace=${namespace}`
    : `/api/v1/kubeservice/all?clustername=${clustername}`;
  return get(url);
}

export function createServices(data) {
  return post(`/api/v1/kubeservice/service`, data);
}

// 删除Services
export function delServices(data) {
  return del(`/api/v1/certificates/ingress`, data);
}

// 获取单个 Services 信息
export function getServicesItem(clustername, namespace, servicesName) {
  return get(
    `/api/v1/kubeservice/service?clusterName=${clustername}&namespace=${namespace}&name=${servicesName}`
  );
}

// 更新 Services
// `json:"cluster_name"`  # 集群名称
// ResourceType      string                    `json:"resource_type"` # 资源类型；如deployment
// ResourceName      string                    `json:"resource_name"`# 资源名称，如depoyment名称
// Namespace         string                    `json:"namespace"` # 资源的namespace
// Data              string                    `json:"data"` # deployment的yaml
export function updateServices(data) {
  return post("/api/v1/kubernetes/resource/update", data);
}

// 获取单个 Services 信息
export function getEndpointItem(clustername, namespace, servicesName) {
  return get(
    `/api/v1/kubeservice/endpoint?clusterName=${clustername}&namespace=${namespace}&name=${servicesName}`
  );
}




