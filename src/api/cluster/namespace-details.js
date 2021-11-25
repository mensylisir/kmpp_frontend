import { get, post, del } from "@/plugins/request";

export function getNamespaceList(clustername) {
  const url = `/api/v1/kubernetes/namespace/all?clustername=${clustername}`;
  return get(url);
}

export function createNamespace(data) {
  return post(`/api/v1/kubeservice/service`, data);
}

// 删除Namespace
export function deleteNamespace(data) {
  return del(`/api/v1/kubeservice/service`, data);
}

// 获取单个 Namespace 信息
export function getNamespaceItem(clustername, name) {
  return get(
    `/api/v1/kubernetes/namespace/namespace?clusterName=${clustername}&name=${name}`
  );
}

// 更新 Namespace
export function updateNamespace(data) {
  return post("/api/v1/kubernetes/resource/update", data);
}

