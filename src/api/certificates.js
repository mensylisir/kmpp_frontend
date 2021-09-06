import {post} from "@/plugins/request"

const baseUrl = "/api/v1/certificates"

export function getAllCertificates(currentPage, pageSize,condition) {
  return post(`${baseUrl}/search?pageNum=${currentPage}&pageSize=${pageSize}`,condition)
}
export function addCertificates(data) {
  return post(`${baseUrl}`, data)
}
export function upload(data) {
  return post(`${baseUrl}/upload`, data)
}
