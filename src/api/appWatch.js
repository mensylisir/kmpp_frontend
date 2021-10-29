import {get, post, del} from "@/plugins/request"

export function deploy(cluster,nameSpace,data) {
  return post(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases`, data)
}

export function deleteMiddle(cluster,nameSpace,name) {
  return del(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases/${name}?purge=true`)
}

// CPU
export function getTableParam(cluster,params) {
  return get(`/proxy/kubernetes/${cluster}/api/v1/namespaces/monitoring/services/prometheus-k8s:web/proxy/api/v1/query?query=${params}`)
}

export function getCPUParam(cluster,params,start,end,step) {
  return get(`/proxy/kubernetes/${cluster}/api/v1/namespaces/monitoring/services/prometheus-k8s:web/proxy/api/v1/query_range?query=${params}&start=${start}&end=${end}&step=${step}`)
}


