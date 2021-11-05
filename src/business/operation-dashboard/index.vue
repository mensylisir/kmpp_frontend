<template>
  <div class="operation-container">
    <div class="container-header">运维大盘</div>
    <div class="container-one">
      <div class="grid-item">
        <div class="item-h">应用</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">{{ applicationDetail.total }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>正常
            </div>
            <div class="i-num">{{ applicationDetail.normal }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #f59326"></span>处理中
            </div>
            <div class="i-num">{{ applicationDetail.processing }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #cf0a1e"></span>异常
            </div>
            <div class="i-num">{{ applicationDetail.bug }}</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{
              width:
                (applicationDetail.normal / applicationDetail.total) * 100 +
                '%',
            }"
            v-if="applicationDetail.normal"
          ></div>
          <div
            class="progress-two"
            :style="{
              width:
                (applicationDetail.processing / applicationDetail.total) * 100 +
                '%',
            }"
            v-if="applicationDetail.processing"
          ></div>
          <div
            class="progress-three"
            :style="{
              width:
                (applicationDetail.bug / applicationDetail.total) * 100 + '%',
            }"
            v-if="applicationDetail.bug"
          ></div>
        </div>
      </div>

      <div class="grid-item">
        <div class="item-h">集群</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">{{ clusterDetail.total }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>正常
            </div>
            <div class="i-num">{{ clusterDetail.normal }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #f59326"></span>处理中
            </div>
            <div class="i-num">{{ clusterDetail.processing }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #cf0a1e"></span>异常
            </div>
            <div class="i-num">{{ clusterDetail.bug }}</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{
              width: (clusterDetail.normal / clusterDetail.total) * 100 + '%',
            }"
            v-if="clusterDetail.normal"
          ></div>
          <div
            class="progress-two"
            :style="{
              width:
                (clusterDetail.processing / clusterDetail.total) * 100 + '%',
            }"
            v-if="clusterDetail.processing"
          ></div>
          <div
            class="progress-three"
            :style="{
              width: (clusterDetail.bug / clusterDetail.total) * 100 + '%',
            }"
            v-if="clusterDetail.bug"
          ></div>
        </div>
      </div>

      <div class="grid-item">
        <div class="item-h">节点</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">{{ nodeDetail.total }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>正常
            </div>
            <div class="i-num">{{ nodeDetail.normal }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #f59326"></span>处理中
            </div>
            <div class="i-num">{{ nodeDetail.processing }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #cf0a1e"></span>异常
            </div>
            <div class="i-num">{{ nodeDetail.bug }}</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{
              width: (nodeDetail.normal / nodeDetail.total) * 100 + '%',
            }"
            v-if="nodeDetail.normal"
          ></div>
          <div
            class="progress-two"
            :style="{
              width: (nodeDetail.processing / nodeDetail.total) * 100 + '%',
            }"
            v-if="nodeDetail.processing"
          ></div>
          <div
            class="progress-three"
            :style="{ width: (nodeDetail.bug / nodeDetail.total) * 100 + '%' }"
            v-if="nodeDetail.bug"
          ></div>
        </div>
      </div>

      <div class="grid-item">
        <div class="item-h">容器组</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">{{ containerDetail.total }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>运行中
            </div>
            <div class="i-num">{{ containerDetail.processing }}</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #bcc0cc"></span>其他
            </div>
            <div class="i-num">{{ containerDetail.other }}</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{
              width:
                (containerDetail.processing / containerDetail.total) * 100 +
                '%',
            }"
            v-if="containerDetail.processing"
          ></div>
          <div
            class="progress-four"
            :style="{
              width:
                (containerDetail.other / containerDetail.total) * 100 + '%',
            }"
            v-if="containerDetail.other"
          ></div>
        </div>
      </div>
    </div>

    <div class="container-two">
      <div class="two-item">
        <div class="item-header">
          <span>CPU (Core) 使用情况</span>
          <el-select
            v-model="cpuClusterCurrent"
            placeholder="请选择"
            style="margin-right: 8px"
            class="cus-select"
            @change="cpuClusterChange"
          >
            <el-option
              v-for="item in nodeCluster"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
            <div slot="prefix" class="sel-prefix">集群：</div>
          </el-select>
        </div>
        <div id="cpu-info"></div>
      </div>
      <div class="two-item">
        <div class="item-header">
          <span>内存 (Gi) 使用情况</span
          ><el-select
            v-model="cpuClusterCurrent"
            placeholder="请选择"
            style="margin-right: 8px"
            class="cus-select"
            @change="cpuClusterChange"
          >
            <el-option
              v-for="item in nodeCluster"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
            <div slot="prefix" class="sel-prefix">集群：</div>
          </el-select>
        </div>
        <div id="gi-info"></div>
      </div>
      <div class="two-item">
        <div class="item-header-sel">
          <div class="info-title">集群资源使用率 Top5</div>
          <el-select
            v-model="optionCurrent1"
            placeholder="请选择"
            @change="optionClusterChange"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-table
          :data="tableClusterData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#F9FAFC' }"
        >
          <el-table-column prop="name" label="集群名称" min-width="160">
            <template slot-scope="scope">
              <div
                class="table-active-cell"
                @click="
                  $router.push({
                    name: 'ClusterOverview',
                    params: { name: scope.row.name },
                  })
                "
              >
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cpu" label="CPU" min-width="100">
          </el-table-column>
          <el-table-column prop="memory" label="内存"> </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="container-three">
      <div class="three-item">
        <div class="item-header-sel">
          <div class="info-title">节点资源用量 Top5</div>
          <div class="info-condition">
            <el-select
              v-model="nodeClusterCurrent"
              placeholder="请选择"
              style="margin-right: 8px"
              class="cus-select"
              @change="nodeClusterChange"
            >
              <el-option
                v-for="item in nodeCluster"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
              <div slot="prefix" class="sel-prefix">集群：</div>
            </el-select>

            <el-select
              v-model="optionCurrent2"
              placeholder="请选择"
              @change="optionPodChange"
            >
              <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <el-table
          :data="tableNodeData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#F9FAFC' }"
        >
          <el-table-column prop="node" label="节点" min-width="185">
            <template slot-scope="scope">
              <div
                class="table-active-cell"
                @click="$router.push({ name: 'recommend' })"
              >
                {{ scope.row.node }}
              </div>
              <span class="table-subtitle-cell">{{
                scope.row.internal_ip
              }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="所属集群" min-width="140">
          </el-table-column> -->
          <el-table-column prop="cpu" label="CPU (Core）" min-width="184">
            <template slot-scope="scope">
              <div class="table-no-active-cell">
                {{ Math.round(scope.row.cpu * 100) / 100 }}%
              </div>
              <span class="table-subtitle-cell"
                >{{
                  Math.round((scope.row.cpu / 100) * scope.row.cpuTotal * 100) /
                  100
                }}/{{ scope.row.cpuTotal }} core</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="memory" label="内存 (Gi）" min-width="148">
            <template slot-scope="scope">
              <div class="table-no-active-cell">
                {{
                  Math.round(
                    (scope.row.memory / scope.row.memoryTotal) * 10000
                  ) / 100
                }}%
              </div>
              <span class="table-subtitle-cell"
                >{{ Math.round(scope.row.memory * 100) / 100 }}/{{
                  Math.round(scope.row.memoryTotal * 100) / 100
                }}
                Gi</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="local" label="本地存储 (Gi）" min-width="185">
            <template slot-scope="scope">
              <div class="table-no-active-cell">
                {{
                  Math.round(
                    (scope.row.memory / scope.row.localTotal) * 10000
                  ) / 100
                }}%
              </div>
              <span class="table-subtitle-cell"
                >{{ Math.round(scope.row.local * 100) / 100 }}/{{
                  Math.round(scope.row.localTotal * 100) / 100
                }}
                GB</span
              >
            </template>
          </el-table-column>
          <!-- <el-table-column prop="address" label="inode使用率" min-width="167">
            <template slot-scope="scope">
              <div class="table-no-active-cell">{{ scope.row.address }}</div>
              <span class="table-subtitle-cell">442350/7864320</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="container" label="容器组" min-width="163">
            <template slot-scope="scope">
              <div class="table-no-active-cell">
                {{
                  Math.round(
                    (scope.row.memory / scope.row.containerTotal) * 10000
                  ) / 100
                }}%
              </div>
              <span class="table-subtitle-cell"
                >{{ Math.round(scope.row.container * 100) / 100 }}/{{
                  Math.round(scope.row.containerTotal * 100) / 100
                }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="container-four">
      <div class="three-item">
        <div class="item-header-sel">
          <div class="info-title">资源使用率</div>

          <div class="info-condition">
            <el-select
              v-model="clusterCurrent"
              placeholder="请选择"
              style="margin-right: 8px"
              class="cus-select"
              @change="clusterChange"
            >
              <el-option
                v-for="item in clusterList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              <div slot="prefix" class="sel-prefix">集群：</div>
            </el-select>

            <el-select
              v-model="podCurrent"
              placeholder="请选择"
              style="margin-right: 8px"
              class="cus-select"
              @change="podChange"
            >
              <el-option
                v-for="item in podList"
                :key="item.value"
                :label="item.label1"
                :value="item.value"
              >
              </el-option>

              <div slot="prefix" class="sel-prefix">节点：</div>
            </el-select>
            <el-select
              v-model="resourcesStart"
              placeholder="请选择"
              style="margin-right: 8px"
              @change="resourcesChange"
            >
              <el-option
                v-for="(item, index) in cusTime"
                :key="item.start + index"
                :label="item.name"
                :value="item.start"
              >
              </el-option>
            </el-select>
            <el-button
              icon="el-icon-refresh-right"
              @click="resetResource"
            ></el-button>
          </div>
        </div>

        <div class="four-grid">
          <div id="cpu-rate"></div>
          <div id="Memory-rate"></div>
        </div>
      </div>
    </div>

    <div class="container-five">
      <div class="five-grid-left">
        <div class="item-header-sel">
          <div class="info-title">容器组数量</div>
          <div class="info-condition">
            <el-select
              v-model="clusterCurrentCon"
              placeholder="请选择"
              style="margin-right: 8px"
              class="cus-select"
              @change="clusterChangeCon"
            >
              <el-option
                v-for="item in clusterList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              <div slot="prefix" class="sel-prefix">集群：</div>
            </el-select>

            <el-select
              v-model="containerStart"
              placeholder="请选择"
              @change="containerChange"
            >
              <el-option
                v-for="(item, index) in cusTime"
                :key="item.start + index"
                :label="item.name"
                :value="item.start"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div id="kmpp-num"></div>
      </div>
      <div class="five-grid-right">
        <div class="item-header-sel">
          <div class="info-title">告警触发次数</div>
          <div class="info-condition">
            <el-select
              v-model="clusterCurrentWarn"
              placeholder="请选择"
              style="margin-right: 8px"
              class="cus-select"
              @change="clusterChangeWarn"
            >
              <el-option
                v-for="item in clusterList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              <div slot="prefix" class="sel-prefix">集群：</div>
            </el-select>
            <el-select
              v-model="warningStart"
              placeholder="请选择"
              @change="warningChange"
            >
              <el-option
                v-for="(item, index) in cusTime"
                :key="item.start + index"
                :label="item.name"
                :value="item.start"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div id="warning-num"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import moment from "moment";
import { searchClusters } from "@/api/cluster";
import { getClusterUsedInfo, getClusterInfo } from "@/api/operation-dashboard";
// 更新数据
// chart.changeData(newData);
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      moment,
      searchClusters,
      getClusterUsedInfo,
      getClusterInfo,
      applicationDetail: {
        total: 0,
        normal: 0,
        processing: 0,
        bug: 0,
      },
      clusterDetail: {
        total: 0,
        normal: 0,
        processing: 0,
        bug: 0,
      },
      nodeDetail: {
        total: 0,
        normal: 0,
        processing: 0,
        bug: 0,
      },
      containerDetail: {
        total: 0,
        processing: 0,
        other: 0,
      },
      paginationConfig: {
        currentPage: 1,
        pageSize: 10000,
        total: 0,
      },
      cpuDetail: {
        // use: 0,
        // res: 0,
        total: 0,
      },
      cpuData: [
        { label: "请求率0%", percent: 0 },
        { label: "使用率0%", percent: 0 },
      ],
      giDetail: {
        // use: 0,
        // res: 0,
        total: 0,
      },
      giData: [
        { label: "请求率0%", percent: 0 },
        { label: "使用率0%", percent: 0 },
      ],
      cpuClusterCurrent: "", // CPU (Core) 使用情况 / 内存 (Gi) 使用情况 当前节点
      cpuRate: [],
      memoryRate: [],
      kmppRate: [],
      tableClusterData: [], // 集群资源用量 Top5 table 数据
      nodeCluster: [],
      nodeClusterCurrent: "",
      tableNodeData: [], // 节点资源用量 Top5 table 数据
      warnNum: [
        { month: "Jan", key: "series1", value: 125 },
        { month: "Jan", key: "series2", value: 51 },
        { month: "Feb", key: "series1", value: 132 },
        { month: "Feb", key: "series2", value: 91 },
        { month: "Mar", key: "series1", value: 141 },
        { month: "Mar", key: "series2", value: 34 },
        { month: "Apr", key: "series1", value: 158 },
        { month: "Apr", key: "series2", value: 47 },
        { month: "May", key: "series1", value: 133 },
        { month: "May", key: "series2", value: 63 },
        { month: "June", key: "series1", value: 143 },
        { month: "June", key: "series2", value: 58 },
        { month: "July", key: "series1", value: 176 },
        { month: "July", key: "series2", value: 56 },
        { month: "Aug", key: "series1", value: 194 },
        { month: "Aug", key: "series2", value: 77 },
        { month: "Sep", key: "series1", value: 115 },
        { month: "Sep", key: "series2", value: 99 },
        { month: "Oct", key: "series1", value: 134 },
        { month: "Oct", key: "series2", value: 106 },
        { month: "Nov", key: "series1", value: 110 },
        { month: "Nov", key: "series2", value: 88 },
        { month: "Dec", key: "series1", value: 910 },
        { month: "Dec", key: "series2", value: 56 },
      ],
      // 筛选部分的数据
      cusTime: [
        {
          name: "最近 15 分钟",
          start: moment().subtract(15, "m").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 30 分钟",
          start: moment().subtract(30, "m").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 1 小时",
          start: moment().subtract(1, "h").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 2 小时",
          start: moment().subtract(2, "h").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 5 小时",
          start: moment().subtract(5, "h").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 12 小时",
          start: moment().subtract(12, "h").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 1 天",
          start: moment().subtract(1, "d").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 3 天",
          start: moment().subtract(3, "d").format("X"),
          end: moment().format("X"),
        },
        {
          name: "最近 7 天",
          start: moment().subtract(7, "d").format("X"),
          end: moment().format("X"),
        },
      ],
      // 告警触发
      warningStart: moment().subtract(1, "d").format("X"),
      warningEnd: moment().format("X"),
      // 容器组数量
      containerStart: moment().subtract(1, "d").format("X"),
      containerEnd: moment().format("X"),
      // 资源使用率-时间
      resourcesStart: moment().subtract(1, "d").format("X"),
      resourcesEnd: moment().format("X"),

      selectOptions: [
        {
          label: "按照CPU使用率",
          value: "cpu",
        },
        {
          label: "按照内存使用率",
          value: "memo",
        },
      ], // 集群/节点资源使用率 Top5 选项表
      optionCurrent1: "cpu", // 集群/节点资源使用率 Top5 当前选项
      optionCurrent2: "cpu", // 集群/节点资源使用率 Top5 当前选项
      clusterList: [], // 集群资 选项表
      clusterCurrent: "", // 集群资 当前选项
      clusterCurrentCon: "", // 容器组数量 当前选项
      clusterCurrentWarn: "", // 告警触发次数 当前选项
      podList: [], // 节点 选项表
      podCurrent: "", // 节点 当前选项

      // 几个图表对象
      chartCpu: null,
      chartGi: null,
      // 资源使用率-cpu
      chartCus1: null,
      // 资源使用率-内存
      chartCus2: null,
      // 容器组数量-cpu
      chartCus3: null,
      // 告警触发次数-cpu
      chartCus4: null,
    };
  },
  created() {
    this.getClusterAll1();
    this.getClusters();
    // 告警触发次数
    const colors3 = ["#CF0A1E", "#F59326", "#D42D7F"];
    this.initLine("warning-num", this.warnNum, colors3, "CPU (%)");
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    cpuInit(container, data, colors, tab) {
      this.$nextTick(() => {
        const chart = new Chart({
          container: container,
          autoFit: true,
          height: 214,
          padding: "auto",
        });

        chart.data(data);

        chart.scale("percent", {
          min: 0,
          max: 100,
          nice: true,
        });

        chart.tooltip({
          title: "label",
          showMarkers: false,
        });
        // 关闭 tooltip
        // chart.tooltip(false);

        chart.legend(false); // 图例

        // 使用率 （标题）
        chart.axis("label", {
          grid: null,
          tickLine: null,
          line: null,
          label: {
            offset: 18, // 偏移量
            style: {
              fill: "#72767d",
              textAlign: "right",
            },
          },
        });

        chart
          .coordinate("polar", {
            innerRadius: 0.6, // 内半径
            radius: 1, // 外半径
            startAngle: (12 / 8) * Math.PI,
            endAngle: (-8 / 8) * Math.PI,
          })
          .transpose();

        // 设置总量 标题
        chart.annotation().text({
          position: ["50%", "43%"],
          content:
            container == "cpu-info"
              ? this.cpuDetail.total.toFixed(2)
              : this.giDetail.total.toFixed(2),
          style: {
            fontSize: 24,
            fill: "#2f3136",
            fontWeight: 500,
          },
          offsetX: -36,
          offsetY: 0,
        });

        // 设置总量 标题
        chart.annotation().text({
          position: ["50%", "55%"],
          content: "总量",
          style: {
            fontSize: 14,
            fill: "#909398",
            fontWeight: 500,
          },
          offsetX: -15,
          offsetY: 0,
        });

        // 每一条环的配置
        chart
          .interval({
            background: {
              style: { fill: "#e4e7f0", fillOpacity: 1 },
            },
          })
          .position("label*percent")
          .color("label", (val) => {
            if (val.indexOf("使用率") != -1) {
              return colors[0];
            } else if (val.indexOf("请求率") != -1) {
              return colors[1];
            }
          })
          .tooltip("percent", (val) => {
            return {
              name: "占比",
              value: val + "%",
            };
          })
          .label("percent", {
            offset: -2,
            content: (data) => {
              return data.percent * 100 + "%";
            },
          })
          .style({
            lineCap: "round",
          });

        chart.interaction("tooltip");

        chart.render();

        switch (tab) {
          case 1:
            this.chartCpu = chart;
            break;
          case 2:
            this.chartGi = chart;
            break;
          default:
            break;
        }
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
          // type: "linear",
          // tickInterval: 1,
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
          offsetX: -20,
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

    // 多条阶梯折线图
    initLine(container, data, colors, str) {
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
        });

        chart.scale("month", {
          range: [0, 1],
        });
        chart.scale("value", {
          nice: true,
        });

        chart.tooltip({
          showCrosshairs: true,
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
          offsetX: -27,
          offsetY: -51,
        });

        chart.line().position("month*value").shape("hv").color("key", colors);

        chart.interaction("element-highlight");

        chart.render();

        this.chartCus4 = chart;
      });
    },

    //
    cpuClusterChange() {
      this.cpuData = [];
      this.giData = [];

      const ProList = [
        this.getClusterCpuInfo(
          this.cpuClusterCurrent,
          '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
          "use1"
        ),
        this.getClusterCpuInfo(
          this.cpuClusterCurrent,
          "sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{})",
          "res"
        ),
        this.getClusterGiInfo(
          this.cpuClusterCurrent,
          "(1 - (sum(node_memory_MemAvailable_bytes{}) / sum((node_memory_MemTotal_bytes{}))))* 100",
          "use1"
        ),
        this.getClusterGiInfo(
          this.cpuClusterCurrent,
          "sum(kube_pod_init_container_resource_requests_memory_bytes{})/sum((node_memory_MemTotal_bytes{}))*100",
          "res"
        ),
        this.getCpuTotal(
          this.cpuClusterCurrent,
          "sum(count(node_cpu_seconds_total{mode='system'}) by (instance))"
        ),
        this.getMemoTotal(
          this.cpuClusterCurrent,
          "sum(sum(node_memory_MemTotal_bytes{}) by(instance)/(1024*1024*1024))"
        ),
      ];

      Promise.all(ProList).then(() => {
        // CPU (Core) 使用情况
        // const colors1 = ["#5354bb", "#8485d5"];
        this.chartCpu.changeData(this.cpuData);
        this.chartGi.changeData(this.giData);
        // this.cpuInit("cpu-info", this.cpuData, colors1);
        // 内存 (Gi) 使用情况
        // const colors2 = ["#0a59cc", "#568ad6"];
        // this.cpuInit("gi-info", this.giData, colors2);
      });
    },

    // 集群资源使用率 Top5 条件切换
    optionClusterChange() {
      this.getClusterAll2();
    },

    // 节点资源用量 Top5 条件切换
    nodeClusterChange() {
      this.getNodeList(
        this.nodeClusterCurrent,
        "sum(kube_node_info { }) by (node,internal_ip)"
      );
    },

    // 节点资源用量 Top5 条件切换
    optionPodChange() {
      this.getNodeList(
        this.nodeClusterCurrent,
        "sum(kube_node_info { }) by (node,internal_ip)"
      );
    },

    // 资源使用率 集群切换
    clusterChange() {
      this.getNodeListByCluster(this.clusterCurrent, "cluster");
    },

    clusterChangeCon() {
      this.handleContainerInfo("cluster");
    },
    clusterChangeWarn() {},
    // 资源使用率 节点切换
    podChange() {
      this.getNodeListByCluster(this.clusterCurrent, "node");
    },

    // 告警触发次数-时间切换
    warningChange(data) {
      const arr = this.cusTime.filter((item) => {
        return item.start == data;
      });
      this.warningEnd = arr[0].end;
    },
    // 容器组数量-时间切换
    containerChange(data) {
      const arr = this.cusTime.filter((item) => {
        return item.start == data;
      });
      this.containerEnd = arr[0].end;

      this.handleContainerInfo("time");
    },

    // 资源使用率-时间切换
    resourcesChange(data) {
      const arr = this.cusTime.filter((item) => {
        return item.start == data;
      });
      this.resourcesEnd = arr[0].end;

      this.getNodeListByCluster(this.clusterCurrent, "time");
    },

    // 重置 资源使用率筛选
    resetResource() {
      // 资源使用率-时间
      const arr = this.cusTime.filter((item) => {
        return item.name == "最近 1 天";
      });
      this.resourcesStart = arr[0].start;
      this.resourcesEnd = arr[0].end;
      this.chartCus1.appendPadding = [26, 0, 0, 0];
      this.chartCus2.appendPadding = [26, 0, 0, 0];
      this.clusterCurrent = this.clusterList[0].value || "";
      if (this.clusterCurrent) {
        this.getNodeListByCluster(this.clusterCurrent, "cluster");
      }
      // this.chartCus1.changeData([]);
      // this.chartCus2.changeData([]);
      // this.chartCus1.changeData([]);
    },

    // ajax
    getClusters(condition) {
      // this.loading = true;
      const { currentPage, pageSize } = this.paginationConfig;
      this.searchClusters(currentPage, pageSize, condition).then((data) => {
        // this.loading = false;
        const list = data.items || [];
        this.clusterList = list.filter((item) => {
          return item.source != "external";
        });
        this.clusterList.forEach((items) => {
          items.value = items.label = items.name;
        });
        this.clusterCurrent = this.clusterList[0].value || "";
        this.clusterCurrentCon = this.clusterList[0].value || "";
        this.clusterCurrentWarn = this.clusterList[0].value || "";
        if (this.clusterCurrent) {
          this.getNodeListByCluster(this.clusterCurrent, "init");
        }
        if (this.clusterCurrentCon) {
          this.handleContainerInfo("init");
        }
      });
    },

    // CPU (Core) 使用情况 / 内存 (Gi) 使用情况
    async getClusterAll1(condition) {
      this.tableClusterData = [];
      this.applicationDetail.total = 0;
      this.nodeDetail.total = 0;
      this.nodeDetail.normal = 0;
      this.nodeDetail.processing = 0;
      this.nodeDetail.bug = 0;
      this.containerDetail.total = 0;
      const { currentPage, pageSize } = this.paginationConfig;
      const data = await this.searchClusters(currentPage, pageSize, condition);
      const list = data.items || [];
      this.clusterDetail.total = list.length;
      const list1 = list.filter((item) => {
        return item.source != "external";
      });
      this.clusterDetail.normal = list1.length;
      this.clusterDetail.bug = list.length - list1.length;

      this.nodeCluster = list1;
      this.nodeClusterCurrent = this.nodeCluster[0].name || "";
      this.cpuClusterCurrent = this.nodeCluster[0].name || "";
      if (this.nodeClusterCurrent) {
        this.getNodeList(
          this.nodeClusterCurrent,
          "sum(kube_node_info { }) by (node,internal_ip)"
        );
      }

      const ProList = [
        this.getClusterCpuInfo(
          this.cpuClusterCurrent,
          '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
          "use1"
        ),
        this.getClusterCpuInfo(
          this.cpuClusterCurrent,
          "sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{})",
          "res"
        ),
        this.getClusterGiInfo(
          this.cpuClusterCurrent,
          "(1 - (sum(node_memory_MemAvailable_bytes{}) / sum((node_memory_MemTotal_bytes{}))))* 100",
          "use1"
        ),
        this.getClusterGiInfo(
          this.cpuClusterCurrent,
          "sum(kube_pod_init_container_resource_requests_memory_bytes{})/sum((node_memory_MemTotal_bytes{}))*100",
          "res"
        ),
        this.getCpuTotal(
          this.cpuClusterCurrent,
          "sum(count(node_cpu_seconds_total{mode='system'}) by (instance))"
        ),
        this.getMemoTotal(
          this.cpuClusterCurrent,
          "sum(sum(node_memory_MemTotal_bytes{}) by(instance)/(1024*1024*1024))"
        ),
      ];

      if (this.cpuClusterCurrent) {
        this.cpuData = [];
        this.giData = [];
        Promise.all(ProList).then(() => {
          // CPU (Core) 使用情况
          const colors1 = ["#5354bb", "#8485d5"];
          this.cpuInit("cpu-info", this.cpuData, colors1);
          // 内存 (Gi) 使用情况
          const colors2 = ["#0a59cc", "#568ad6"];
          this.cpuInit("gi-info", this.giData, colors2);
        });
      }

      const promiseList = [];
      await list1.forEach((item) => {
        this.tableClusterData.push({
          name: item.name,
          cpu: "0%",
          memory: "0%",
        });
        promiseList.push(this.getApplicationList(item.name));
        promiseList.push(this.getNodeListCount(item.name));
        promiseList.push(this.getNodeContainerCount(item.name));
        promiseList.push(
          this.getClusterCpuInfo(
            item.name,
            '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
            "use2"
          )
        );
        promiseList.push(
          this.getClusterGiInfo(
            item.name,
            "(1 - (sum(node_memory_MemAvailable_bytes{}) / sum((node_memory_MemTotal_bytes{}))))* 100",
            "use2"
          )
        );
      });

      Promise.all(promiseList).then(() => {
        if (this.optionCurrent1 == "cpu") {
          this.tableClusterData.sort((a, b) => {
            return b.cpu_c - a.cpu_c;
          });
        } else if (this.optionCurrent1 == "memo") {
          this.tableClusterData.sort((a, b) => {
            return b.memory_c - a.memory_c;
          });
        }
        this.tableClusterData = this.tableClusterData.slice(0, 5);

        this.applicationDetail.normal = this.applicationDetail.total;
        this.containerDetail.processing = this.containerDetail.total;
      });
    },

    // 集群资源使用率 Top5
    async getClusterAll2(condition) {
      this.tableClusterData = [];
      const { currentPage, pageSize } = this.paginationConfig;
      const data = await this.searchClusters(currentPage, pageSize, condition);
      const list = data.items || [];
      const list1 = list.filter((item) => {
        return item.source != "external";
      });

      const promiseList = [];
      await list1.forEach((item) => {
        this.tableClusterData.push({
          name: item.name,
          cpu: "0%",
          memory: "0%",
        });
        promiseList.push(
          this.getClusterCpuInfo(
            item.name,
            '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
            "use2"
          )
        );
        promiseList.push(
          this.getClusterGiInfo(
            item.name,
            "(1 - (sum(node_memory_MemAvailable_bytes{}) / sum((node_memory_MemTotal_bytes{}))))* 100",
            "use2"
          )
        );
      });

      Promise.all(promiseList).then(() => {
        if (this.optionCurrent1 == "cpu") {
          this.tableClusterData.sort((a, b) => {
            return b.cpu_c - a.cpu_c;
          });
        } else if (this.optionCurrent1 == "memo") {
          this.tableClusterData.sort((a, b) => {
            return b.memory_c - a.memory_c;
          });
        }
        this.tableClusterData = this.tableClusterData.slice(0, 5);
      });
    },
    // 获取CPU (Core) 使用情况
    async getClusterCpuInfo(cluster, query, type) {
      const data = await this.getClusterUsedInfo(cluster, query);
      const num = data.data.result ? Number(data.data.result[0].value[1]) : 0;
      if (type == "use1") {
        // 使用率
        this.cpuData.push({
          label: `使用率${Math.round(num * 100) / 100}%`,
          percent: Math.round(num * 100) / 100,
        });
      } else if (type == "use2") {
        this.tableClusterData.forEach((item) => {
          if (item.name == cluster) {
            item.cpu = `${Math.round(num * 100) / 100}%`;
            item.cpu_c = num;
            return;
          }
        });
      } else {
        this.cpuData.push({
          label: `请求率${Math.round(num * 100) / 100}%`,
          percent: Math.round(num * 100) / 100,
        });
      }
    },

    // 获取cpu总量
    async getCpuTotal(cluster, query) {
      const data = await this.getClusterUsedInfo(cluster, query);
      this.cpuDetail.total = data.data.result
        ? Number(data.data.result[0].value[1])
        : 0;
    },
    // 获取cpu总量
    async getMemoTotal(cluster, query) {
      const data = await this.getClusterUsedInfo(cluster, query);
      this.giDetail.total = data.data.result
        ? Number(data.data.result[0].value[1])
        : 0;
    },

    // 内存 (Gi) 使用情况
    async getClusterGiInfo(cluster, query, type) {
      const data = await this.getClusterUsedInfo(cluster, query);
      const num = data.data.result ? Number(data.data.result[0].value[1]) : 0;
      if (type == "use1") {
        // 使用率
        this.giData.push({
          label: `使用率${Math.round(num * 100) / 100}%`,
          percent: Math.round(num * 100) / 100,
        });
      } else if (type == "use2") {
        this.tableClusterData.forEach((item) => {
          if (item.name == cluster) {
            item.memory = `${Math.round(num * 100) / 100}%`;
            item.memory_c = num;
            return;
          }
        });
      } else {
        this.giData.push({
          label: `请求率${Math.round(num * 100) / 100}%`,
          percent: Math.round(num * 100) / 100,
        });
      }
    },

    // 节点资源用量 Top5 - 获取节点
    async getNodeList(cluster, query) {
      this.tableNodeData = [];
      const data = await this.getClusterUsedInfo(cluster, query);
      const list = data.data.result || [];

      const promiseList = [];
      list.forEach((node) => {
        this.tableNodeData.push(node.metric);
      });

      promiseList.push(this.getNodeCpuTotal(cluster));
      promiseList.push(this.getNodeCpu(cluster));

      promiseList.push(this.getNodeMemoryTotal(cluster));
      promiseList.push(this.getNodeMemory(cluster));

      promiseList.push(this.getNodeLocalTotal(cluster));
      promiseList.push(this.getNodeLocal(cluster));

      promiseList.push(this.getNodeContainerTotal(cluster));
      promiseList.push(this.getNodeContainer(cluster));

      Promise.all(promiseList).then(() => {
        if (this.optionCurrent2 == "cpu") {
          this.tableNodeData.sort((a, b) => {
            return b.cpu - a.cpu;
          });
        } else if (this.optionCurrent2 == "memo") {
          this.tableNodeData.sort((a, b) => {
            return b.memory - a.memory;
          });
        }

        this.tableNodeData = this.tableNodeData.slice(0, 5);
      });
    },

    // 节点资源用量 Top5 - 获取cpu 总
    async getNodeCpuTotal(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "count(node_cpu_seconds_total{mode='system'}) by (instance)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.instance) {
            this.$set(this.tableNodeData[index], "cpuTotal", node.value[1]);
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取cpu  占比
    async getNodeCpu(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "100 - (avg(irate(node_cpu_seconds_total{mode='idle'}[5m])) by(instance) * 100)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.instance) {
            this.$set(this.tableNodeData[index], "cpu", node.value[1]);
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取内存 总
    async getNodeMemoryTotal(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "sum(node_memory_MemTotal_bytes{}) by(instance)/(1024*1024*1024)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.instance) {
            this.$set(this.tableNodeData[index], "memoryTotal", node.value[1]);
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取内存 占比
    async getNodeMemory(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "(sum(node_memory_MemTotal_bytes{}) by(instance)-sum(node_memory_MemAvailable_bytes{}) by(instance)) /(1024*1024*1024)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.instance) {
            this.$set(this.tableNodeData[index], "memory", node.value[1]);
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取本地存储 总
    async getNodeLocalTotal(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "sum(node_filesystem_size_bytes)by(instance)/(1024*1024*1024)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.instance) {
            this.$set(this.tableNodeData[index], "localTotal", node.value[1]);
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取本地存储 占比
    async getNodeLocal(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "(sum(node_filesystem_size_bytes) by(instance)-sum(node_filesystem_avail_bytes)  by(instance))/(1024*1024*1024)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.instance) {
            this.$set(this.tableNodeData[index], "local", node.value[1]);
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取容器组 总
    async getNodeContainerTotal(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "sum(kube_node_status_allocatable{resource='pods'}) by(node)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.node) {
            this.$set(
              this.tableNodeData[index],
              "containerTotal",
              node.value[1]
            );
          }
        });
      });
    },
    // 节点资源用量 Top5 - 获取容器组 占比
    async getNodeContainer(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "count(kube_pod_info{created_by_kind!~'<none>|Job'}) by(node)"
      );
      this.tableNodeData.forEach((item, index) => {
        data.data.result.forEach((node) => {
          if (item.node == node.metric.node) {
            this.$set(this.tableNodeData[index], "container", node.value[1]);
          }
        });
      });
    },

    // 获取应用数量
    async getApplicationList(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "count(kube_namespace_annotations{})"
      );
      this.applicationDetail.total += Number(data.data.result[0].value[1]) || 0;
    },

    // 获取每个集群下的节点信息并统计
    async getNodeListCount(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "kube_node_status_condition{condition='Ready'}"
      );
      const list = data.data.result || [];
      list.forEach((item) => {
        if (item.metric.status == "false") {
          this.nodeDetail.bug += Number(item.value[1]);
        } else if (item.metric.status == "true") {
          this.nodeDetail.normal += Number(item.value[1]);
        } else {
          this.nodeDetail.processing += Number(item.value[1]);
        }

        this.nodeDetail.total += Number(item.value[1]);
      });
    },

    // 获取每个集群下容器组信息并统计
    async getNodeContainerCount(cluster) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "count(kube_pod_info{created_by_kind!~'<none>|Job'}) by(node)"
      );
      this.containerDetail.total += data.data.result.length || 0;
    },

    // 获取每个集群下容器组信息并统计(type为true表示 数据变更，false--初始化)
    async getNodeListByCluster(cluster, type) {
      const data = await this.getClusterUsedInfo(
        cluster,
        "sum(kube_node_info { }) by (node,internal_ip)"
      );

      this.podList = data.data.result || [];

      this.podList.forEach((items) => {
        items.value = items.label1 = items.metric.node;
      });

      if (type == "init" || type == "cluster") {
        this.podCurrent = this.podList[0].value || "";
      }

      const promiseList = [
        this.getCpuUseResInfo(
          this.clusterCurrent,
          '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
          this.resourcesStart,
          this.resourcesEnd,
          "use"
        ),
        this.getCpuUseResInfo(
          this.clusterCurrent,
          "sum(cluster:namespace:pod_cpu:active:kube_pod_container_resource_requests{})",
          this.resourcesStart,
          this.resourcesEnd,
          "res"
        ),
        this.getMemoryUseResInfo(
          this.clusterCurrent,
          "(1 - (sum(node_memory_MemAvailable_bytes{}) / sum((node_memory_MemTotal_bytes{}))))* 100",
          this.resourcesStart,
          this.resourcesEnd,
          "use"
        ),
        this.getMemoryUseResInfo(
          this.clusterCurrent,
          "sum(kube_pod_init_container_resource_requests_memory_bytes{})/sum((node_memory_MemTotal_bytes{}))*100",
          this.resourcesStart,
          this.resourcesEnd,
          "res"
        ),
      ];

      Promise.all(promiseList).then(() => {
        if (type == "time" || type == "node" || type == "cluster") {
          this.chartCus1.changeData(this.cpuRate);
          this.chartCus2.changeData(this.memoryRate);
          // this.chartCus3.changeData(this.kmppRate);
        } else {
          // 资源使用率 - cpu
          const lineColor1 = ["#5354bb", "#319dce"];
          const areaColor1 = ["#e0e1f2", "#ddebfa"];
          const legends1 = ["使用量", "请求速率"];
          this.initRate(
            "cpu-rate",
            this.cpuRate,
            lineColor1,
            legends1,
            areaColor1,
            "CPU (%)",
            1
          );
 console.log( this.cpuRate, '2')
          // 资源使用率 - 内存
          const lineColor2 = ["#f59326", "#34a677"];
          const areaColor2 = ["#f8ebdd", "#d7ebe5"];
          const legends2 = ["使用量", "请求速率"];
          this.initRate(
            "Memory-rate",
            this.memoryRate,
            lineColor2,
            legends2,
            areaColor2,
            "内存 (%)",
            2
          );
        }
      });
    },

    // 资源使用率
    // 获取 cpu 使用量和请求率
    async getCpuUseResInfo(cluster, query, start, end, type) {
      this.cpuRate = [];
      const data = await this.getClusterInfo(cluster, query, start, end);
      const list = data.data.result[0].values || [];
      if (type == "use") {
        list.forEach((item) => {
          const arr = this.cpuRate.filter((cpu) => {
            return (
              cpu.label == "使用量" &&
              cpu.year == this.moment.unix(item[0]).format("HH:mm:ss")
            );
          });
          if (!arr.length) {
            this.cpuRate.push({
              label: "使用量",
              year: this.moment.unix(item[0]).format("HH:mm:ss"),
              value: item[1] ? Number(Number(item[1]).toFixed(2)) : 0,
            });
          }
        });
      } else if (type == "res") {
        list.forEach((item) => {
          const arr = this.cpuRate.filter((cpu) => {
            return (
              cpu.label == "请求速率" &&
              cpu.year == this.moment.unix(item[0]).format("HH:mm:ss")
            );
          });
          if (!arr.length) {
            this.cpuRate.push({
              label: "请求速率",
              year: this.moment.unix(item[0]).format("HH:mm:ss"),
              value: item[1] ? Number(Number(item[1]).toFixed(2)) : 0,
            });
          }
        });
      }
    },

    // 获取内存使用信息
    // 获取 cpu 使用量和请求率
    async getMemoryUseResInfo(cluster, query, start, end, type) {
      this.memoryRate = [];
      const data = await this.getClusterInfo(cluster, query, start, end);
      const list = data.data.result[0].values || [];
      if (type == "use") {
        list.forEach((item) => {
          const arr = this.memoryRate.filter((cpu) => {
            return (
              cpu.label == "使用量" &&
              cpu.year == this.moment.unix(item[0]).format("HH:mm:ss")
            );
          });
          if (!arr.length) {
            this.memoryRate.push({
              label: "使用量",
              year: this.moment.unix(item[0]).format("HH:mm:ss"),
              value: item[1] ? Number(Number(item[1]).toFixed(2)) : 0,
            });
          }
        });
      } else if (type == "res") {
        list.forEach((item) => {
          const arr = this.memoryRate.filter((cpu) => {
            return (
              cpu.label == "请求速率" &&
              cpu.year == this.moment.unix(item[0]).format("HH:mm:ss")
            );
          });
          if (!arr.length) {
            this.memoryRate.push({
              label: "请求速率",
              year: this.moment.unix(item[0]).format("HH:mm:ss"),
              value: item[1] ? Number(Number(item[1]).toFixed(2)) : 0,
            });
          }
        });
      }
    },

    // 容器组数量
    handleContainerInfo(type) {
      const promiseList = [
        this.getContainerInfo(
          'count(kube_pod_info{created_by_kind!~"<none>|Job"})',
          this.containerStart,
          this.containerEnd,
          "total"
        ),
        this.getContainerInfo(
          "sum(kubelet_running_pods{})",
          this.containerStart,
          this.containerEnd,
          "ing"
        ),
      ];

      Promise.all(promiseList).then(() => {
        if (type == "init") {
          // 容器组数量 - CPU
          const lineColor3 = ["#319dce", "#34a677"];
          const areaColor3 = ["#ddebfa", "#d7ebe5"];
          const legends3 = ["运行中", "总数"];
          this.initRate(
            "kmpp-num",
            this.kmppRate,
            lineColor3,
            legends3,
            areaColor3,
            "CPU (%)",
            3
          );
        } else {
          this.chartCus3.changeData(this.kmppRate);
        }
      });
    },
    async getContainerInfo(query, start, end, type) {
      this.kmppRate = [];
      const data = await this.getClusterInfo(
        this.clusterCurrentCon,
        query,
        start,
        end
      );
      const list = data.data.result[0].values || [];
      if (type == "total") {
        list.forEach((item) => {
          const arr = this.kmppRate.filter((cpu) => {
            return (
              cpu.label == "总数" &&
              cpu.year == this.moment.unix(item[0]).format("HH:mm:ss")
            );
          });
          if (!arr.length) {
            this.kmppRate.push({
              label: "总数",
              year: this.moment.unix(item[0]).format("HH:mm:ss"),
              value: item[1] ? Number(Number(item[1]).toFixed(2)) : 0,
            });
          }
        });
      } else if (type == "ing") {
        list.forEach((item) => {
          const arr = this.kmppRate.filter((cpu) => {
            return (
              cpu.label == "运行中" &&
              cpu.year == this.moment.unix(item[0]).format("HH:mm:ss")
            );
          });
          if (!arr.length) {
            this.kmppRate.push({
              label: "运行中",
              year: this.moment.unix(item[0]).format("HH:mm:ss"),
              value: item[1] ? Number(Number(item[1]).toFixed(2)) : 0,
            });
          }
        });
      }
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.operation-container {
  // height: 100%;
  // padding-bottom: 8px;
  overflow-x: hidden;
  .container-header {
    font-size: 16px;
    color: #2c2e33;
    line-height: 24px;
    font-weight: 500;

    box-shadow: 0 1px 0 0 #e4e7f0;

    padding: 16px 24px;
    background: #fff;

    margin-bottom: 8px;
  }
  .container-one {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 8px;
    margin-bottom: 8px;
    .grid-item {
      box-sizing: border-box;
      height: 160px;
      background: #fff;

      padding: 24px;

      .item-h {
        font-size: 16px;
        color: #2c2e33;
        line-height: 24px;
        font-weight: 500;

        margin-bottom: 16px;
      }
      .item-info {
        display: flex;
        margin-bottom: 12px;
        .i-total {
          text-align: center;
          position: relative;
          padding-right: 16px;
          .i-title {
            font-size: 12px;
            color: #797f8c;
            line-height: 20px;
            font-weight: 400;
          }
          .i-num {
            font-size: 24px;
            color: #4b5059;
            font-weight: 700;
          }

          &::after {
            position: absolute;
            content: "";
            width: 1px;
            background: #e4e7f0;
            height: 32px;

            right: 0;
            top: 9px;
          }
        }
        .i-option {
          text-align: center;
          margin: 0 16px;
          .i-title {
            font-size: 12px;
            color: #797f8c;
            line-height: 20px;
            font-weight: 400;

            display: flex;
            align-items: center;

            .circular {
              height: 6px;
              width: 6px;
              border-radius: 50%;
              display: inline-block;

              margin-right: 4px;
            }
          }
          .i-num {
            font-size: 24px;
            color: #4b5059;
            font-weight: 700;
          }
        }
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
    }
  }
  .container-two {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 8px;
    margin-bottom: 8px;
    .two-item {
      background: #ffffff;
      box-sizing: border-box;
      padding: 24px;
      padding-top: 20px;
      // height: 352px;
      .item-header {
        font-size: 16px;
        color: #2c2e33;
        line-height: 24px;
        font-weight: 500;
        margin-bottom: 40px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        /deep/.cus-select {
          .el-input__inner {
            padding-left: 38px;
          }
          .el-input__prefix {
            .sel-prefix {
              line-height: 32px;
            }
          }
        }
      }

      /deep/.g2-tooltip {
        display: inline-block;
      }

      .item-header-sel {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 12px;
        .info-title {
          font-size: 16px;
          color: #2c2e33;
          line-height: 24px;
          font-weight: 500;
        }
      }
    }
  }

  .container-three {
    margin-bottom: 8px;
    .three-item {
      background: #ffffff;
      box-sizing: border-box;
      padding: 20px 24px;
      // height: 352px;

      padding-top: 20px;

      .item-header-sel {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 16px;
        .info-title {
          font-size: 16px;
          color: #2c2e33;
          line-height: 24px;
          font-weight: 500;
        }
        .info-condition {
          /deep/.cus-select {
            .el-input__inner {
              padding-left: 38px;
            }
            .el-input__prefix {
              .sel-prefix {
                line-height: 32px;
              }
            }
          }
        }
      }
    }
  }
  .container-four {
    margin-bottom: 8px;
    .three-item {
      background: #ffffff;
      box-sizing: border-box;
      padding: 20px 24px;
      // height: 352px;

      padding-top: 20px;

      .item-header-sel {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 16px;
        .info-title {
          font-size: 16px;
          color: #2c2e33;
          line-height: 24px;
          font-weight: 500;
        }
        .info-condition {
          /deep/.cus-select {
            .el-input__inner {
              padding-left: 38px;
            }
            .el-input__prefix {
              .sel-prefix {
                line-height: 32px;
              }
            }
          }
        }
      }
      .four-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 8px;
        #cpu-rate,
        #Memory-rate {
          background: #f9fafc;
          padding: 16px;
        }
      }
    }
  }
  .container-five {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 8px;
    margin-bottom: 8px;

    .five-grid-left {
      background: #ffffff;
      padding: 20px 24px;
      .item-header-sel {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 16px;
        .info-title {
          font-size: 16px;
          color: #2c2e33;
          line-height: 24px;
          font-weight: 500;
        }
        .info-condition {
          /deep/.cus-select {
            .el-input__inner {
              padding-left: 38px;
            }
            .el-input__prefix {
              .sel-prefix {
                line-height: 32px;
              }
            }
          }
        }
      }
      #kmpp-num {
        background: #f9fafc;
        padding: 16px;
      }
    }
    .five-grid-right {
      background: #fff;
      padding: 20px 24px;

      .item-header-sel {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 16px;
        .info-title {
          font-size: 16px;
          color: #2c2e33;
          line-height: 24px;
          font-weight: 500;
        }
        .info-condition {
          /deep/.cus-select {
            .el-input__inner {
              padding-left: 38px;
            }
            .el-input__prefix {
              .sel-prefix {
                line-height: 32px;
              }
            }
          }
        }
      }
      #warning-num {
        background: #f9fafc;
        padding: 16px;
      }
    }
  }
}

/deep/.el-table--small .el-table__cell {
  font-size: 14px;
  padding: 10.3px 0;
}
/deep/.el-table {
  border-right: none;
  border-bottom: none;
}
/deep/.el-table--border .el-table__cell {
  border-right: none;
}

// 表格头部 可操作列
.table-active-cell {
  font-size: 14px;
  color: #5354bb;
  line-height: 22px;
  font-weight: 500;
  cursor: pointer;
}

.table-no-active-cell {
  font-size: 14px;
  color: #2c2e33;
  line-height: 22px;
  font-weight: 400;
}

.table-subtitle-cell {
  font-size: 12px;
  color: #797f8c;
  line-height: 20px;
  font-weight: 400;
}
</style>
