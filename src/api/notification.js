import { get } from "@/plugins/request";

const proxyUrl =
  "/proxy/kubernetes/{cluster_name}/api/v1/namespaces/loki-stack/services/loki:http-metrics/proxy/loki/api/v1/query_range";

export function listNotification(clusterName, query, start, end) {
  let url = proxyUrl.replace("{cluster_name}", clusterName);
  let url2 = `${url}?direction=BACKWARD&limit=878&query=${query}&start=${start}&end=${end}&step=5`;

  return get(url2);
}
