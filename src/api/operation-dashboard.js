import { get } from "@/plugins/request";

const proxyUrl1 =
  "/proxy/kubernetes/{cluster_name}/api/v1/namespaces/monitoring/services/prometheus-k8s:web/proxy/api/v1/query";

const proxyUrl2 =
  "/proxy/kubernetes/{cluster_name}/api/v1/namespaces/monitoring/services/prometheus-k8s:web/proxy/api/v1/query_range";

// cpu占用率：100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
// CPU请求率：sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{})
// 内存占用率：(1 - (sum(node_memory_MemAvailable_bytes{}) / sum((node_memory_MemTotal_bytes{}))))* 100
// 内存请求率：sum(kube_pod_init_container_resource_requests_memory_bytes{})/sum((node_memory_MemTotal_bytes{}))*100
export function getClusterUsedInfo(clusterName, query) {
  let url = proxyUrl1.replace("{cluster_name}", clusterName);
  let url2 = `${url}?query=${query}`;

  return get(url2);
}

export function getClusterInfo(clusterName, query, start, end) {
  let url = proxyUrl2.replace("{cluster_name}", clusterName);
  let url2 = `${url}?query=${query}&start=${start}&end=${end}&step=50`;

  return get(url2);
}
