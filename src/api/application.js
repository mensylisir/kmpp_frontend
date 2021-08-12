import {get} from "@/plugins/request"

const baseUrl = "/api/project"
const userUrl = "/auth/sysUser"

export function getProjectAll() {
  return get(`${baseUrl}/getProjectAll`)
}
export function getAllUser() {
  return get(`${userUrl}/getAll`)
}
