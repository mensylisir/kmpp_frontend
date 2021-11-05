import { get, post, del } from "@/plugins/request";

// clustername: 集群名称
// namespace: service所属namespace
export function getService(clustername, namespace) {
  const url = `/api/v1/certificates/service?clustername=${clustername}&namespace=${namespace}`;
  return get(url);
}

// clustername: 集群名称
// namespace: service所属namespace
export function getIngress(clustername, namespace) {
  const url = `/api/v1/certificates/ingress?clustername=${clustername}&namespace=${namespace}`;
  return get(url);
}

// 创建Secret
// "clustername": "mm",                                # 集群名称
// "name": "aaaa",                                     # Secret名称
// "namespace": "test",                                # Secret所属的namespace
// "ca_id": "04d7134c-149f-4177-9a17-496afb2b3284"     # 证书ID
export function createSecret(data) {
  return post(`/api/v1/certificates/create/secret`, data);
}

// 创建Ingress
// "clustername": "mm",                             # 集群名称
// "name": "aaaa",                                  # ingress名称
// "namespace": "test",                             # ingress所属namespace
// "secretname": "aaaaa",                           # secret名称
// "host": "dev.test.tech",                         # 域名
// "path": "/",                                     # PATH路径
// "servicename": "bbb",                            # Service名称
// "serviceport": 90,                               # Service端口
// "usetls": true                                   # 是否使用https,true表示为https，且需要创建Secret，false为http且不需要创建Secret
export function createIngress(data) {
  return post(`/api/v1/certificates/create/ingress`, data);
}

// api/v1/certificates/cert?pageNum=1&pageSize=10 可以不要参数
export function getCA() {
  return post("/api/v1/certificates/cert");
}

// 删除ingress
export function delIngress(data) {
  return del(`/api/v1/certificates/ingress`, data);
}

// 获取单个 ingress 信息
export function getIngressItem(clustername, namespace, ingressname) {
  return get(
    `/api/v1/certificates/special/ingress?clustername=${clustername}&namespace=${namespace}&ingressname=${ingressname}`
  );
}

// 更新 Ingress
export function updateIngress(data) {
  return post("/api/v1/certificates/ingress", data);
}
