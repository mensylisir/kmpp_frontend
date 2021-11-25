<template>
  <div class="useCondition">
    <div class="top">
      <div class="top-select">
        <el-cascader
          @expand-change="change"
          :props="props"
          v-model="nameSpace"
          :options="clusterList"
          placeholder="请选择"
        ></el-cascader>
      </div>
      <div>
        <el-select size="small" v-model="filterDay" @change="changeTime(true)">
          <el-option value="30-min" label="最近30分钟"> </el-option>
          <el-option value="1-h" label="最近1小时"> </el-option>
          <el-option value="12-h" label="最近12小时"> </el-option>
          <el-option value="1-day" label="最近1天"> </el-option>
          <!-- <el-option value="3-day" label="最近3天"> </el-option>
          <el-option value="7-day" label="最近7天"> </el-option> -->
        </el-select>
        <!-- <el-button
          icon="el-icon-refresh-right"
          style="margin-left: 16px"
        ></el-button> -->
      </div>
    </div>
    <div class="bottom">
      <div class="pannal">
        <h4>应用资源用量</h4>
        <div class="content">
          <div class="left">
            <div class="left-top">
              <div class="item">
                <div class="label">
                  <div>应用状态</div>
                  <svg
                    class="icon status-icon"
                    aria-hidden="true"
                    v-if="pageData.status > 0"
                    style="color: #cf0a1e"
                  >
                    <use xlink:href="#icon-checkbox-circle-fill"></use>
                  </svg>
                  <svg
                    class="icon status-icon"
                    aria-hidden="true"
                    v-else
                    style="color: #36b37e"
                  >
                    <use xlink:href="#icon-checkbox-circle-fill2"></use>
                  </svg>
                  <span style="font-size: 14px; font-weight: 400">{{
                    pageData.status > 0 ? "异常" : "正常"
                  }}</span>
                </div>
                <div class="line"></div>
                <div class="label">
                  <div>命名空间数</div>
                  <span>1</span>
                </div>
              </div>
              <div
                class=""
                style="
                  margin-left: 8px;
                  padding: 26px 43px;
                  background: #f9fafc;
                  width: 50%;
                "
              >
                <div class="subtitle">容器组</div>
                <div class="flex-layout">
                  <div class="small-text">
                    <div>总数</div>
                    <span>{{ pageData.contain || "0" }}</span>
                  </div>
                  <div class="line1"></div>
                  <div class="small-text">
                    <div>
                      <div class="status"></div>
                      运行中
                    </div>
                    <span>{{ pageData.runningcontain || "0" }}</span>
                  </div>
                  <div class="small-text" style="margin-left: 16px">
                    <div>
                      <div class="status" style="background: #bcc0cc"></div>
                      其他
                    </div>
                    <span>{{
                      pageData.contain - pageData.runningcontain || "0"
                    }}</span>
                  </div>
                </div>
                <div style="margin-top: 6px">
                  <div class="item-progress">
                    <div
                      class="progress-one"
                      :style="{
                        width:
                          (pageData.runningcontain / pageData.contain) * 100 +
                          '%',
                      }"
                    ></div>
                    <div
                      class="progress-four"
                      :style="{
                        width:
                          ((pageData.contain - pageData.runningcontain) /
                            pageData.contain) *
                            100 +
                          '%',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="left-bottom">
              <div class="item" style="width: unset">
                <div class="label">
                  <div>持久卷</div>
                  <span>{{ pageData.volumeclaim || "--" }}</span>
                </div>
                <div class="line"></div>
                <div class="label">
                  <div>任务</div>
                  <span>{{ pageData.task || "--" }}</span>
                </div>
                <div class="line"></div>
                <div class="label">
                  <div>定时任务</div>
                  <span>{{ pageData.timetask || "--" }}</span>
                </div>
                <div class="line"></div>
                <div class="label">
                  <div>服务</div>
                  <span>{{ pageData.service || "--" }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="subtitle">计算组件</div>
            <div id="container"></div>
          </div>
        </div>
      </div>
      <div class="pannal">
        <h4>集群资源使用情况</h4>
        <div class="content flex-layout">
          <div class="left" style="width: 40%">
            <div
              class="cpu"
              @click="resourse = 'cpu'"
              :class="{ 'resourse-select': resourse === 'cpu' }"
            >
              <div style="margin-bottom: 22px; font-size: 14px">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-copy"></use>
                </svg>
                CPU
              </div>
              <div
                class="flex-layout cpu-progress"
                style="justify-content: flex-start"
              >
                <el-progress
                  type="circle"
                  :percentage="
                    getPercentage(pageData.cpuuse, pageData.cputotal)
                  "
                  :color="
                    resourse === 'cpu' ? 'rgba(255, 255, 255, 15)' : '#5455BC'
                  "
                  :show-text="false"
                  :width="40"
                ></el-progress>
                <div style="margin: 0 16px">
                  <div>使用率</div>
                  <span
                    >{{
                      getPercentage(pageData.cpuuse, pageData.cputotal)
                    }}%</span
                  >
                </div>
                <div>
                  <div>已使用/配额(Core)</div>
                  <span
                    >{{ parseFloat(pageData.cpuuse).toFixed(4) || 0 }}/
                    {{ parseFloat(pageData.cputotal) || "不限额" }}</span
                  >
                </div>
              </div>
            </div>
            <div
              class="storage"
              @click="resourse = 'storage'"
              :class="{ 'resourse-select': resourse === 'storage' }"
            >
              <div style="margin-bottom: 22px; font-size: 14px">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-copy"></use>
                </svg>
                内存
              </div>
              <div class="flex-layout" style="justify-content: flex-start">
                <el-progress
                  type="circle"
                  :percentage="
                    getPercentage(pageData.storage, pageData.storagetotal)
                  "
                  :color="
                    resourse === 'storage'
                      ? 'rgba(255, 255, 255, 15)'
                      : '#5455BC'
                  "
                  :show-text="false"
                  :width="40"
                ></el-progress>
                <div style="margin: 0 16px">
                  <div>使用率</div>
                  <span
                    >{{
                      getPercentage(pageData.storage, pageData.storagetotal)
                    }}%</span
                  >
                </div>
                <div>
                  <div>已使用/配额(Gi)</div>
                  <span
                    >{{ parseFloat(pageData.storage).toFixed(4) || 0 }}/{{
                      parseFloat(pageData.storagetotal) || "不限额"
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="right" style="width: 60%">
            <div class="four-grid">
              <div id="cpu-rate"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pannal">
        <h4>网络流量统计</h4>
        <div class="content">
          <div class="right" style="width: 100%; margin-left: 0">
            <div class="four-grid">
              <div id="network"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import DataSet from "@antv/data-set";
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import { getTableParam, getCPUParam } from "@/api/appWatch";

export default {
  name: "MiddleStore",
  components: {},
  data() {
    return {
      props: {
        emitPath: true,
        lazy: false,
      },
      resourse: "cpu",
      filterDay: "1-day",
      tableData: [],
      nameSpace: [],
      clusterList: [],
      currTime: [],
      pageData: {}, // 页面数据
      itemArry: {},
      // 状态，持久卷适量，查询任务数量，查询定时任务数量，查询服务数量，查询容器组数量，查询运行的容器组数量，cpu核心数，cpu已使用核心数,内存占用，内存配额，
      queryParams: [
        {
          attribute: "status",
          value:
            "count(kube_pod_status_phase{phase='Running', namespace=~'monitoring'} == 0) unless count(kube_job_info{namespace=~",
        },
        {
          attribute: "volumeclaim",
          value: "count(kube_persistentvolumeclaim_info{namespace=~",
        },
        {
          attribute: "task",
          value: "count(kube_job_info{namespace=~",
        },
        {
          attribute: "timetask",
          value: "count(kube_cronjob_info{namespace=~",
        },
        {
          attribute: "service",
          value: "count(kube_service_info{namespace=~",
        },
        {
          attribute: "contain",
          value: "count(kube_pod_info{namespace=~",
        },
        {
          attribute: "runningcontain",
          value: "sum(kube_pod_status_phase{phase='Running', namespace=~",
        },
        {
          attribute: "cputotal",
          value: "sum(container_spec_cpu_quota{namespace=~",
        },
        {
          attribute: "cpuuse",
          value: "sum(rate(container_cpu_usage_seconds_total{namespace=~",
        },
        // 内存
        {
          attribute: "storage",
          value: "sum(container_memory_rss{namespace=~",
        },
        {
          attribute: "storagetotal",
          value: "sum(container_spec_memory_limit_bytes{namespace=~",
        },
        // 可用部署数
        {
          attribute: "runningdeploy",
          value: "count(kube_deployment_status_replicas_ready{namespace=~",
        },
        // 不可用部署数
        {
          attribute: "unavailabledeploy",
          value:
            "count(kube_deployment_status_replicas_unavailable{namespace=~",
        },
        //  可用的有状态集数
        {
          attribute: "runningstatusdeploy",
          value: "count(kube_statefulset_status_replicas_ready{namespace=~",
        },
        // 不可用的有状态集数
        {
          attribute: "unavailablestatusdeploy",
          value: "count(kube_statefulset_replicas{namespace=~",
        },
        // 可用守护进程集数
        {
          attribute: "runningprogressdeploy",
          value: "count(kube_daemonset_status_number_ready{namespace=~",
        },
        // 不可用守护进程集数
        {
          attribute: "unavailableprogressdeploy",
          value: "count(kube_daemonset_status_number_unavailable{namespace=~",
        },
      ],
      cpuRate: [],
      network: [],
      component: [
        {
          State: "部署",
          type: "running",
          value: 0,
        },
        {
          State: "部署",
          type: "unvailable",
          value: 0,
        },
        {
          State: "有状态副本集",
          type: "running",
          value: 0,
        },
        {
          State: "有状态副本集",
          type: "unvailable",
          value: 0,
        },
        {
          State: "守护进程集",
          type: "running",
          value: 0,
        },
        {
          State: "守护进程集",
          type: "unvailable",
          value: 0,
        },
      ],
      step: 20,
      chartCus1: null,
      chartCus2: null,
      count: 0,
    };
  },
  props: [""],
  watch: {
    nameSpace: {
      handler: function (val) {
        if (val.length === 2) {
          this.pageData = {};
          this.queryParams.forEach((item) => {
            this.getTableParam(item);
          });
          this.changeTime(); // 获取cpu趋势图
        }
      },
      deep: true,
    },
    resourse: {
      handler: function () {
        this.getCPUParam(); // 获取cpu趋势图
      },
    },
  },
  computed: {},
  methods: {
    getPercentage(val, val1) {
      if (val && val1 && val1 !== "0") {
        return parseFloat(((val / val1) * 100).toFixed(2));
      } else {
        return 0;
      }
    },
    getTime() {
      let timeArry = this.filterDay.split("-");
      let currTime = Date.now();
      let result = [];
      let start = 0;
      if (timeArry[1] === "min") {
        this.step = 50;
        start = currTime - timeArry[0] * 60 * 1000;
      } else if (timeArry[1] === "h") {
        this.step = timeArry[0] > 10 ? 100 : 50;
        start = currTime - timeArry[0] * 60 * 60 * 1000;
      } else if (timeArry[1] === "day") {
        this.step = timeArry[1] > 1 ? 500 : 200;
        if (timeArry[0] === "7") {
          start = currTime - (timeArry[0] - 1) * 24 * 60 * 60 * 1000;
        } else {
          start = currTime - timeArry[0] * 24 * 60 * 60 * 1000;
        }
      }
      this.currTime = [parseInt(start / 1000), parseInt(currTime / 1000)];
      result = [parseInt(start / 1000), parseInt(currTime / 1000)];
      return result;
    },
    handalData(type) {
      let result = [];
      this.pageData[type].forEach((item) => {
        let year = this.formatTime(item[0] * 1000);
        result.push({
          label:
            type === "cpuRate"
              ? "使用量"
              : type === "netflow"
              ? "流入"
              : "流出",
          Data: year,
          value: parseFloat(Number(item[1]).toFixed(4)),
        });
      });
      return result;
    },
    change(item) {
      if (item.length === 1) {
        this.getNamespace(item[0]);
      }
    },
    // 格式化日期
    formatTime(time) {
      if (time) {
        var oDate = new Date(time * 1),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime =
            oYear +
            "-" +
            this.getBz(oMonth) +
            "-" +
            this.getBz(oDay) +
            " " +
            this.getBz(oHour) +
            ":" +
            this.getBz(oMin) +
            ":" +
            this.getBz(oSen); //拼接时间
        return oTime;
      } else {
        return "";
      }
    },
    getBz(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    // 修改时间段
    changeTime() {
      // 流入，流出
      let network = [
        {
          attribute: "netflow",
          value: "sum(irate(container_network_receive_bytes_total{namespace=~",
        },
        {
          attribute: "netout",
          value: "sum(irate(container_network_transmit_bytes_total{namespace=~",
        },
      ];
      this.getCPUParam(); // 获取cpu趋势图
      // 网络流入流出图
      network.forEach((item) => {
        this.getNetworkParam(item);
      });
    },
    // cpu 使用图
    initCpu() {
      this.cpuRate = this.handalData("cpuRate");
      if (this.chartCus1) {
        this.chartCus1.data(this.cpuRate);
        // 设置总量 标题
        this.chartCus1.annotation().text().option[0].content =
          this.resourse === "cpu" ? "CPU使用概况（%）" : "内存占用概况（%）";
        this.chartCus1.legend({
          position: "top-right",
          items: [
            {
              name: this.resourse === "cpu" ? "CPU使用" : "内存占用",
            },
          ],
        });
        this.chartCus1.render();
      } else {
        // 资源使用率 - cpu
        const lineColor1 = ["#5354BB"];
        const areaColor1 = ["#e0e1f2"];
        const legends1 = this.resourse === "cpu" ? ["CPU使用"] : ["内存占用"];
        this.initRate(
          "cpu-rate",
          this.cpuRate,
          lineColor1,
          legends1,
          areaColor1,
          this.resourse === "cpu" ? "CPU使用概况（%）" : "内存占用概况（%）",
          1
        );
      }
    },
    // 网络流出图
    initResouse() {
      let netflow = this.handalData("netflow");
      let netout = this.handalData("netout");
      this.network = netflow.concat(netout);
      if (this.chartCus2) {
        this.chartCus2.data(this.network);
        this.chartCus2.render();
      } else {
        // 资源使用率 - 内存
        const lineColor2 = ["#34A677", "#319DCE"];
        const areaColor2 = ["#f8ebdd", "#d7ebe5"];
        const legends2 = ["流入", "流出"];
        this.initRate(
          "network",
          this.network,
          lineColor2,
          legends2,
          areaColor2,
          "网络流量速率(Mbps）",
          2
        );
      }
    },
    // 获取集群信息
    getCluester() {
      searchClusters(1, 1000, "")
        .then((data) => {
          let result = data.items;
          result = result.filter((item) => {
            return item.source === "local";
          });
          result.forEach((item) => {
            item.label = item.value = item.name;
            item.leaf = false;
            item.children = [];
          });
          if (result.length > 0) {
            this.getNamespace(result[0].name);
          }
          this.clusterList = result;
        })
        .catch(() => {});
    },
    // 获取namespace
    getNamespace(name) {
      listNamespace(name)
        .then((data) => {
          let result = data.items || [];
          result.forEach((item) => {
            item.label = item.value = item.metadata.name;
            item.leaf = true;
          });
          let currentNode = this.clusterList.filter((item) => {
            return item.name === name;
          });
          currentNode[0].children = result;
          this.nameSpace = [];
          this.nameSpace.push(name);
          this.nameSpace.push(currentNode[0].children[0].metadata.name);
        })
        .catch(() => {});
    },
    // 获取列表
    getTableParam(params) {
      let params1 = "";
      if (params.attribute === "cpuuse") {
        params1 = params.value + `'${this.nameSpace[1]}'}[1m]))`;
      } else if (params.attribute === "cputotal") {
        params1 = params.value + `'${this.nameSpace[1]}'}/100000)`;
      } else if (
        params.attribute === "storage" ||
        params.attribute === "storagetotal"
      ) {
        params1 =
          params.value + `'${this.nameSpace[1]}'} / 1024 / 1024 / 1024)`;
      } else if (
        params.attribute === "runningdeploy" ||
        params.attribute === "unavailabledeploy" ||
        params.attribute === "runningstatusdeploy" ||
        params.attribute === "unavailableprogressdeploy"
      ) {
        params1 = params.value + `'${this.nameSpace[1]}'} != 0 )`;
      } else if (params.attribute === "unavailablestatusdeploy") {
        params1 =
          params.value +
          `'${this.nameSpace[1]}'})- count(kube_statefulset_status_replicas_ready{namespace=~'${this.nameSpace[1]}'} != 0)`;
      } else if (params.attribute === "cpurate") {
        params1 = params.value + `'${this.nameSpace[1]}'}[5m]) * 100)`;
      } else {
        params1 = params.value + `'${this.nameSpace[1]}'})`;
      }
      getTableParam(this.nameSpace[0], params1)
        .then((data) => {
          const result = data.data.result || [];
          this.itemArry[params.attribute] = result[0] ? result[0].value[1] : "";
          let compute = [
            "runningdeploy",
            "unavailabledeploy",
            "runningstatusdeploy",
            "unavailableprogressdeploy",
            "unavailablestatusdeploy",
            "runningprogressdeploy",
          ];
          this.count =
            this.count + (compute.indexOf(params.attribute) > -1 ? 1 : 0);
          if (this.count === compute.length) {
            this.component = this.handelComponentData();
            if (this.componentChart) {
              this.componentChart.data(this.component);
              this.componentChart.render();
            } else {
              this.dataInit();
            }
          }
          this.pageData = JSON.parse(JSON.stringify(this.itemArry));
        })
        .catch(() => {});
    },
    //CPU趋势图
    getCPUParam() {
      let time = this.getTime();
      let params = "";
      if (this.resourse === "cpu") {
        params = `sum(irate(container_cpu_usage_seconds_total{namespace=~'${this.nameSpace[1]}'}[5m]) * 100)`;
      } else {
        params = `sum(container_memory_working_set_bytes{namespace=~'${this.nameSpace[1]}'} / 1024 / 1024 / 1024) / sum(cluster:namespace:pod_memory:active:kube_pod_container_resource_limits{namespace=~'${this.nameSpace[1]}'} / 1024 / 1024 / 1024)`;
      }
      getCPUParam(this.nameSpace[0], params, time[0], time[1], this.step)
        .then((data) => {
          const result = data.data.result || [];
          this.itemArry.cpuRate = result[0] ? result[0].values : [];
          this.pageData = JSON.parse(JSON.stringify(this.itemArry));
          this.initCpu(); // 初始化cpu图
        })
        .catch(() => {});
    },
    //网络流量统计
    getNetworkParam(params) {
      let time = this.getTime();
      getCPUParam(
        this.nameSpace[0],
        params.value + `'${this.nameSpace[1]}'}[5m]) > 0) / 1024 / 1024`,
        time[0],
        time[1],
        this.step
      )
        .then((data) => {
          const result = data.data.result || [];
          this.itemArry[params.attribute] = result[0] ? result[0].values : [];
          this.pageData = JSON.parse(JSON.stringify(this.itemArry));
          this.initResouse();
        })
        .catch(() => {});
    },
    handelComponentData() {
      let result = [...this.component];
      result[0].value = Number(this.pageData.runningdeploy);
      result[1].value = Number(this.pageData.unavailabledeploy);
      result[2].value = Number(this.pageData.runningstatusdeploy);
      result[3].value = Number(this.pageData.unavailablestatusdeploy);
      result[4].value = Number(this.pageData.runningprogressdeploy);
      result[5].value = Number(this.pageData.unavailableprogressdeploy);
      return result;
    },
    // 条形图
    dataInit() {
      const ds = new DataSet();
      const dv = ds.createView().source(this.component);
      dv.transform({
        type: "fold",
        fields: ["running", "unvailable"], // 展开字段集
        retains: ["State"], // 保留字段集，默认为除fields以外的所有字段
      });
      this.$nextTick(() => {
        const chart = new Chart({
          container: "container",
          autoFit: true,
          height: 200,
          appendPadding: [20, 0, 0, 0], // 上，右，下，左
        });
        chart.coordinate().transpose();
        chart.data(dv.rows);
        // 图例位置
        chart.legend({
          position: "top-right",
          items: [
            {
              name: "运行中",
              marker: {
                symbol: "square",
                style: {
                  fill: "#36B37E",
                },
                clickable: false,
              },
            },
            {
              name: "异常",
              marker: {
                symbol: "square",
                style: {
                  fill: "#CF0A1E",
                },
                clickable: false,
              },
            },
          ],
        });
        chart.scale("value", { alias: "占比" });

        chart.axis("State", {
          label: {
            offset: 12,
          },
        });
        chart.axis("value", {
          label: null,
          title: {
            style: {
              fontSize: 14,
              fontWeight: 300,
            },
          },
          grid: null,
        });
        chart.tooltip({
          shared: true,
          showMarkers: false,
        });
        chart
          .interval()
          .adjust("stack")
          .position("State*value")
          .size(10)
          .color("type*State", (type) => {
            if (type === "unvailable") {
              return "#CF0A1E";
            }
            if (type === "running") {
              return "#36B37E";
            }
          });

        chart.interaction("active-region");
        chart.render();
        this.componentChart = chart;
      });
    },
    // 资源使用率
    initRate(container, data, lineColors, legends, areaColors, str, tab) {
      this.$nextTick(() => {
        const chart = new Chart({
          container: container,
          autoFit: true,
          height: 250,
          appendPadding: [20, 0, 0, 12], // 上，右，下，左
        });
        chart.data(data);

        // 图例位置
        chart.legend({
          position: "top-right",
          items: [
            {
              name: legends[0],
              marker: {
                symbol: "square",
                style: {
                  fill: lineColors[0],
                },
                clickable: false,
              },
            },
            {
              name: legends[1],
              marker: {
                symbol: "square",
                style: {
                  fill: lineColors[1],
                },
                clickable: false,
              },
            },
          ],
        });

        chart.scale("Data", {
          type: "timeCat",
          mask: "YY/MM/DD HH:mm:ss",
        });
        chart.scale("value", {
          nice: true,
        });

        chart.tooltip({
          showCrosshairs: true, // 是否显示 tooltips 辅助线。
          showMarkers: false,
          shared: true,
        });

        // 设置总量 标题
        chart.annotation().text({
          position: ["1%", "0%"],
          content: str,
          style: {
            fontSize: 14,
            fill: "#2c2e33",
            fontWeight: 500,
            lineHeight: 22,
          },
          offsetX: -34,
          offsetY: -38,
        });
        chart
          .area()
          .adjust("stack")
          .position("Data*value")
          .color("label", areaColors)
          .tooltip(false);
        chart
          .line()
          .adjust("stack")
          .position("Data*value")
          .color("label", lineColors);

        chart.interaction("element-highlight");

        chart.render();
        switch (tab) {
          case 1:
            this.chartCus1 = chart;
            break;
          case 2:
            this.chartCus2 = chart;
            break;
          case 3:
            this.chartCus3 = chart;
            break;
          default:
            break;
        }
      });
    },
  },
  created() {
    this.getCluester();
  },
};
</script>

<style scoped lang='scss'>
.useCondition {
  background: white;
  margin-top: 8px;
  min-height: calc(100vh - 120px);
  .top {
    box-shadow: 0 1px 0 0 #e4e7f0;
    padding: 8px 24px 8px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/.top-select {
      .el-dropdown-link {
        font-size: 16px;
        color: #2c2e33;
        line-height: 24px;
        font-weight: 500;
      }
      .el-icon-arrow-down {
        color: #2c2e33;
      }
    }
  }
  .bottom {
    .pannal {
      padding: 24px;
      box-shadow: 0 1px 0 0 #e4e7f0;
      &:last-child {
        box-shadow: unset;
      }
      .content {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .subtitle {
          font-size: 14px;
          color: #2c2e33;
          line-height: 22px;
          font-weight: 500;
          text-align: left;
          margin-bottom: 3px;
        }
        .left {
          width: 55%;
          .left-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .item {
            width: 50%;
            padding: 26px 43px;
            background: #f9fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .line {
            height: 40px;
            width: 1px;
            border-left: 1px solid #e4e7f0;
            margin: 0 39px;
          }
          .line1 {
            height: 24px;
            width: 1px;
            border-left: 1px solid #e4e7f0;
            margin: 0 16px;
          }
          .label {
            text-align: center;
            div {
              font-size: 14px;
              color: #4b5059;
              line-height: 22px;
              font-weight: 400;
              margin-bottom: 8px;
            }
            span {
              font-size: 28px;
              color: #2c2e33;
              font-weight: 700;
            }
          }
          .small-text {
            text-align: center;
            div {
              font-size: 12px;
              color: #797f8c;
              line-height: 20px;
              font-weight: 400;
              margin-bottom: 3px;
            }
            span {
              font-size: 16px;
              color: #4b5059;
              font-weight: 700;
            }
          }
          .status {
            background: #36b37e;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            display: inline-block;
            margin-bottom: 0 !important;
          }
        }
        .right {
          width: 45%;
          background: #f9fafc;
          padding: 16px;
          margin-left: 8px;
        }
      }
    }
    .cpu {
      background: #f9fafc;
      border-radius: 4px;
      font-size: 14px;
      line-height: 22px;
      font-weight: 500;
      padding: 26px 16px 26px 16px;
      cursor: pointer;
      div {
        font-size: 12px;
        color: #4b5059;
        line-height: 20px;
        font-weight: 400;
      }
      span {
        font-size: 16px;
        color: #2c2e33;
        font-weight: 700;
      }
    }
    .storage {
      padding: 26px 16px 26px 16px;
      background: #f9fafc;
      border-radius: 4px;
      margin-top: 12px;
      cursor: pointer;
      div {
        font-size: 12px;
        color: #4b5059;
        line-height: 20px;
        font-weight: 400;
      }
      span {
        font-size: 16px;
        color: #2c2e33;
        font-weight: 700;
      }
    }
    .resourse-icon {
      width: 13.4px;
      height: 13.4px;
    }
    h4 {
      margin: 0;
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
    }
    /deep/.resourse-select {
      background: #5354bb;
      span {
        color: #ffffff;
      }
      div {
        color: #ffffff;
      }
      svg path:first-child {
        stroke: rgba(255, 255, 255, 0.15);
      }
    }
  }
}
.status-icon {
  width: 13.33px;
  height: 13.33px;
  margin-right: 5.33px;
}
.flex-layout {
  display: flex;
  justify-content: space-between;
}
/deep/.el-dropdown-menu__item {
  padding: 3px 15px !important;
  font-size: 14px !important;
}
.item-progress {
  width: 100%;
  display: flex;
  .progress-one {
    background: #36b37e;
    border-right: 1px solid #fff;
    width: 100%;
    height: 12px;
    box-sizing: border-box;
  }
  .progress-two {
    background: #f59326;
    border-right: 1px solid #fff;
    width: 8%;
    height: 12px;
    box-sizing: border-box;
  }
  .progress-three {
    background: #cf0a1e;
    width: 16%;
    height: 12px;
    box-sizing: border-box;
  }
  .progress-four {
    background: #bcc0cc;
    width: 16%;
    height: 12px;
    box-sizing: border-box;
  }
}
</style>
