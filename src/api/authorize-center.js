import {post,get} from "@/plugins/request"

const baseUrl = "/api/v1/rbacs"

export function getClusterrole(currentPage, pageSize,condition) {
  return get(`/api/v1/kubeusers/mm?pageNum=${currentPage}&pageSize=${pageSize}&condition=${condition}`)
}
export function getRbacs() {
  return get(`${baseUrl}/mm`)
}
export function rolebinding(data) {
  return post(`${baseUrl}/rolebinding`, data)
}
export function clusterrolebinding(data) {
  return post(`${baseUrl}/clusterrolebinding`, data)
}
export function kubeconfig(data) {
  return post(`${baseUrl}/kubeconfig`, data)
}
export function kubeusers(data) {
  return post(`/api/v1/kubeusers`, data)
}

