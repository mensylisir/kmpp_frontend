import {get, post, del} from "@/plugins/request"

export function deploy(cluster,nameSpace,data) {
  return post(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases`, data)
}

export function deleteMiddle(cluster,nameSpace,name) {
  return del(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases/${name}?purge=true`)
}

// CPU
export function getTableData(cluster) {
  return get(`/proxy/kubernetes/${cluster}/api/v1/namespaces/monitoring/services/prometheus-k8s:web/proxy/api/v1/alerts`)
}

export function getTotalData(cluster) {
  return get(`/api/v1/monitor/rules?clustername=${cluster}`)
}

export function getStrategyData(cluster) {
  return get(`/proxy/kubernetes/${cluster}/api/v1/namespaces/monitoring/services/prometheus-k8s:web/proxy/api/v1/rules`)
}


