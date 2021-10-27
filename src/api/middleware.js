import {get, post, del} from "@/plugins/request"

const middleUrl = "/api/v1/grpc"

export function getStorList(data) {
  return post(`${middleUrl}/function/invoke`, data)
}

export function deploy(cluster,nameSpace,data) {
  return post(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases`, data)
}

export function deleteMiddle(cluster,nameSpace,name) {
  return del(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases/${name}?purge=true`)
}

export function getApplication(cluster,nameSpace,name) {
  return get(`/proxy/kubeapps/${cluster}/api/clusters/default/api/v1/namespaces/${nameSpace}/secrets/${name}`)
}

export function getDeployResource(cluster,nameSpace,name) {
  return get(`/proxy/kubeapps/${cluster}/api/kubeops/v1/clusters/default/namespaces/${nameSpace}/releases/${name}`)
}

export function getResourseDetail(cluster,nameSpace,type,name) {
  return get(`/proxy/kubeapps/${cluster}/api/clusters/default/apis/apps/v1/namespaces/${nameSpace}/${type}/${name}`)
}

export function getServiceDetail(cluster,nameSpace,type,name) {
  return get(`/proxy/kubeapps/${cluster}/api/clusters/default/api/v1/namespaces/${nameSpace}/${type}/${name}`)
}