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
        <el-select size="small" v-model="filterDay">
          <el-option value="1" label="最近1天"> </el-option>
          <el-option value="7" label="最近7天"> </el-option>
          <el-option value="30" label="最近1个月"> </el-option>
          <el-option value="90" label="最近3个月"> </el-option>
        </el-select>
        <el-button
          icon="el-icon-refresh-right"
          style="margin-left: 16px"
        ></el-button>
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
                  <span>{{ pageData.status || "--" }}</span>
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
          <div class="left" style="width: 30%">
            <div class="cpu">
              <div style="margin-bottom: 22px; font-size: 14px">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-copy"></use>
                </svg>
                CPU
              </div>
              <div class="flex-layout" style="justify-content: flex-start">
                <!-- :percentage="(pageData.cpuuse / pageData.cputotal) * 100" -->

                <el-progress
                  type="circle"
                  :percentage="30"
                  color="white"
                  :show-text="false"
                  :width="40"
                ></el-progress>
                <div style="margin: 0 16px">
                  <div>使用率</div>
                  <span
                    >{{
                      (pageData.cpuuse / pageData.cputotal) * 100 || "--"
                    }}%</span
                  >
                </div>
                <div>
                  <div>已使用/配额(Core)</div>
                  <span
                    >{{ pageData.cpuuse || 0 }}/{{
                      pageData.cputotal || 0
                    }}</span
                  >
                </div>
              </div>
            </div>
            <div class="storage">
              <div style="margin-bottom: 22px; font-size: 14px">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-copy"></use>
                </svg>
                内存
              </div>
              <div class="flex-layout" style="justify-content: flex-start">
                <!-- :percentage="(pageData.storage / pageData.storagetotal) * 100" -->

                <el-progress
                  type="circle"
                  :percentage="30"
                  color="#5455BC"
                  :show-text="false"
                  :width="40"
                ></el-progress>
                <div style="margin: 0 16px">
                  <div>使用率</div>
                  <span
                    >{{
                      (pageData.storage / pageData.storagetotal) * 100 || "--"
                    }}%</span
                  >
                </div>
                <div>
                  <div>已使用/配额(Core)</div>
                  <span
                    >{{ pageData.storage || 0 }}/{{
                      pageData.storagetotal || 0
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="right" style="width: 70%">
            <div class="four-grid">
              <div id="cpu-rate"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pannal">
        <h4>网络流量统计</h4>
        <div class="content">
          <div class="right" style="width: 100%">
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
      filterDay: "7",
      // CPU使用概况-cpu
      chartCus1: null,
      tableData: [],
      nameSpace: [],
      clusterList: [],
      pageData: {}, // 页面数据
      // 持久卷适量，查询任务数量，查询定时任务数量，查询服务数量，查询容器组数量，查询运行的容器组数量，cpu核心数，cpu已使用核心数,内存占用，内存配额
      queryParams: [
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
        // {
        //   attribute: "cputotal",
        //   value:
        //     "sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_limits{namespace=~",
        // },
        // {
        //   attribute: "cpuuse",
        //   value: "sum(irate(container_cpu_usage_seconds_total{namespace=~",
        // },
        // // 内存-todo
        // {
        //   attribute: "storage",
        //   value:
        //     "sum(cluster:namespace:pod_memory:active:kube_pod_container_resource_requests{namespace=~'.*'}) by (",
        // },
        // {
        //   attribute: "storagetotal",
        //   value:
        //     "sum(cluster:namespace:pod_memory:active:kube_pod_container_resource_limits{namespace=~'.*'}) by (",
        // },
      ],
      cpuRate: [
        { label: "使用量", year: "1750", value: 502 },
        { label: "使用量", year: "1800", value: 635 },
        { label: "使用量", year: "1850", value: 809 },
        { label: "使用量", year: "1900", value: 3268 },
        { label: "使用量", year: "1950", value: 4400 },
        { label: "使用量", year: "1999", value: 3634 },
        { label: "使用量", year: "2050", value: 947 },
      ],
      network: [
        { label: "使用量", year: "1750", value: 502 },
        { label: "使用量", year: "1800", value: 635 },
        { label: "使用量", year: "1850", value: 809 },
        { label: "使用量", year: "1900", value: 3268 },
        { label: "使用量", year: "1950", value: 4400 },
        { label: "使用量", year: "1999", value: 3634 },
        { label: "使用量", year: "2050", value: 947 },
        { label: "请求速率", year: "1750", value: 106 },
        { label: "请求速率", year: "1800", value: 107 },
        { label: "请求速率", year: "1850", value: 111 },
        { label: "请求速率", year: "1900", value: 1766 },
        { label: "请求速率", year: "1950", value: 221 },
        { label: "请求速率", year: "1999", value: 767 },
        { label: "请求速率", year: "2050", value: 133 },
      ],
    };
  },
  props: [""],
  watch: {
    nameSpace: {
      handler: function (val) {
        if (val.length === 2) {
          this.queryParams.forEach((item) => {
            this.getTableParam(item);
          });
          // this.getCPUParam(); // 获取cpu趋势图
        }
      },
      deep: true,
    },
  },
  computed: {
    time() {
      //       if(this.filterDay === '1'){
      // this.step =
      //       }
      //       this.filterDay
      let result = this.nameSpace.filter((item) => {
        return item.metadata.name === this.currSpace;
      });
      return result[0];
    },
  },
  methods: {
    change(item) {
      if (item.length === 1) {
        this.getNamespace(item[0]);
      }
    },
    init() {},
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
      if (params.value === "cpuuse") {
        params1 =
          params.value +
          `'${this.nameSpace[1]}'})*sum(count(node_cpu_seconds_total{mode="idle"}) by (instance))`;
      }
      if (params.value === "storage") {
        params1 = params.value + this.nameSpace[1] + ") / 2014 / 1024 / 1024";
      } else if (params.value === "storagetotal") {
        params1 = params.value + this.nameSpace[1] + ") / 2014 / 1024 / 1024";
      } else {
        params1 = params.value + `'${this.nameSpace[1]}'})`;
      }
      getTableParam(this.nameSpace[0], params1)
        .then((data) => {
          const result = data.data.result || [];
          this.pageData[params.attribute] = result[0] ? result[0].value[1] : "";
        })
        .catch(() => {});
    },
    getCPUParam() {
      getCPUParam(
        this.nameSpace[0],
        "100 - (avg(irate(node_cpu_seconds_total{mode='idle'}[5m])) * 100)",
        this.time[0],
        this.time[1],
        this.step
      )
        .then((data) => {
          const result = data.data.result || [];
          this.pageData.cpuRate = result;
        })
        .catch(() => {});
    },
    // 条形图
    dataInit() {
      const data = [
        {
          State: "守护进程集",
          运行中: 25635,
          处理中: 1890,
          异常: 9314,
          year: "1975",
        },
        {
          State: "有状态副本集",
          运行中: 30352,
          处理中: 20439,
          异常: 10225,
          year: "1985",
        },
        {
          State: "部署",
          运行中: 38253,
          处理中: 42538,
          异常: 15757,
          year: "1995",
        },
      ];

      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
        type: "fold",
        fields: ["运行中", "处理中", "异常"], // 展开字段集
        key: "年龄段", // key字段
        value: "人口数量", // value字段
        retains: ["State"], // 保留字段集，默认为除fields以外的所有字段
      });
      // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}
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
        });
        chart.scale("year", { nice: true });

        chart.axis("State", {
          label: {
            offset: 12,
          },
        });
        chart.tooltip({
          shared: true,
          showMarkers: false,
        });
        chart
          .interval()
          .adjust("stack")
          .position("State*人口数量")
          .size(12)
          .color("年龄段", ["#36B37E", "#F59326", "#CF0A1E"]);

        chart.interaction("active-region");
        chart.render();
      });
    },
    // 资源使用率
    initRate(container, data, lineColors, legends, areaColors, str, tab) {
      this.$nextTick(() => {
        const chart = new Chart({
          container: container,
          autoFit: true,
          height: 183,
          appendPadding: [20, 0, 0, 0], // 上，右，下，左
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

        chart.scale("year", {
          type: "linear",
          tickInterval: 50,
        });
        chart.scale("value", {
          nice: true,
        });

        chart.tooltip({
          showCrosshairs: true, // 是否显示 tooltips 辅助线。
          showMarkers: false,
          shared: true,
        });

        // chart.tooltip(false);

        // 设置总量 标题
        chart.annotation().text({
          position: ["0%", "0%"],
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
          .position("year*value")
          .color("label", areaColors)
          .tooltip(false);
        chart
          .line()
          .adjust("stack")
          .position("year*value")
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
    this.dataInit();
    // 资源使用率 - cpu
    const lineColor1 = ["#5354BB"];
    const areaColor1 = ["#e0e1f2"];
    const legends1 = [];
    this.initRate(
      "cpu-rate",
      this.cpuRate,
      lineColor1,
      legends1,
      areaColor1,
      "CPU使用概况（%）",
      1
    );
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
  },
};
</script>

<style scoped lang='scss'>
.useCondition {
  background: white;
  margin-top: 8px;
  height: calc(100%);
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
      background: #5354bb;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;
      font-weight: 500;
      padding: 16px 16px 24px 16px;
      div {
        font-size: 12px;
        color: #ffffff;
        line-height: 20px;
        font-weight: 400;
      }
      span {
        font-size: 16px;
        color: #ffffff;
        font-weight: 700;
      }
    }
    .storage {
      padding: 16px 16px 24px 16px;
      background: #f9fafc;
      border-radius: 4px;
      margin-top: 8px;
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
  }
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
