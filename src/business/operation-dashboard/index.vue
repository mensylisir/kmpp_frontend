<template>
  <div class="operation-container">
    <div class="container-header">运维大盘</div>
    <div class="container-one">
      <div class="grid-item">
        <div class="item-h">应用</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">12</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>正常
            </div>
            <div class="i-num">9</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #f59326"></span>处理中
            </div>
            <div class="i-num">1</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #cf0a1e"></span>异常
            </div>
            <div class="i-num">2</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{ width: (9 / 12) * 100 + '%' }"
          ></div>
          <div
            class="progress-two"
            :style="{ width: (1 / 12) * 100 + '%' }"
          ></div>
          <div
            class="progress-three"
            :style="{ width: (2 / 12) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div class="grid-item">
        <div class="item-h">集群</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">12</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>正常
            </div>
            <div class="i-num">9</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #f59326"></span>处理中
            </div>
            <div class="i-num">0</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #cf0a1e"></span>异常
            </div>
            <div class="i-num">2</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{ width: (9 / 12) * 100 + '%' }"
          ></div>
          <div
            class="progress-two"
            :style="{ width: (0 / 12) * 100 + '%' }"
            v-if="0"
          ></div>
          <div
            class="progress-three"
            :style="{ width: (3 / 12) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div class="grid-item">
        <div class="item-h">节点</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">12</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>正常
            </div>
            <div class="i-num">12</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #f59326"></span>处理中
            </div>
            <div class="i-num">0</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #cf0a1e"></span>异常
            </div>
            <div class="i-num">0</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{ width: (12 / 12) * 100 + '%' }"
          ></div>
          <div
            class="progress-two"
            :style="{ width: (0 / 12) * 100 + '%' }"
          ></div>
          <div
            class="progress-three"
            :style="{ width: (0 / 12) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div class="grid-item">
        <div class="item-h">容器组</div>
        <div class="item-info">
          <div class="i-total">
            <div class="i-title">总数</div>
            <div class="i-num">12</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #36b37e"></span>运行中
            </div>
            <div class="i-num">10</div>
          </div>
          <div class="i-option">
            <div class="i-title">
              <span class="circular" style="background: #bcc0cc"></span>其他
            </div>
            <div class="i-num">2</div>
          </div>
        </div>
        <div class="item-progress">
          <div
            class="progress-one"
            :style="{ width: (10 / 12) * 100 + '%' }"
          ></div>
          <div
            class="progress-four"
            :style="{ width: (2 / 12) * 100 + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="container-two">
      <div class="two-item">
        <div class="item-header">CPU (Core) 使用情况</div>
        <div id="cpu-info"></div>
      </div>
      <div class="two-item">
        <div class="item-header">内存 (Gi) 使用情况</div>
        <div id="gi-info"></div>
      </div>
      <div class="two-item">
        <div class="item-header-sel">
          <div class="info-title">集群资源使用率 Top5</div>
          <el-select v-model="optionCurrent1" placeholder="请选择">
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
          <el-table-column prop="date" label="集群名称" min-width="160">
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.date }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="CPU" min-width="100">
          </el-table-column>
          <el-table-column prop="address" label="内存"> </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="container-three">
      <div class="three-item">
        <div class="item-header-sel">
          <div class="info-title">节点资源用量 Top5</div>
          <el-select v-model="optionCurrent2" placeholder="请选择">
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
          <el-table-column prop="date" label="节点" min-width="185">
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.date }}</div>
              <span class="table-subtitle-cell">192.168.12.10</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="所属集群" min-width="140">
          </el-table-column>
          <el-table-column prop="name" label="CPU (Core）" min-width="184">
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.name }}</div>
              <span class="table-subtitle-cell">0.68/4 core</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="内存 (Gi）" min-width="148">
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.address }}</div>
              <span class="table-subtitle-cell">3.49/7.8 Gi</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="本地存储 (Gi）"
            min-width="185"
          >
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.address }}</div>
              <span class="table-subtitle-cell">29.98/128 GB</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="inode使用率" min-width="167">
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.address }}</div>
              <span class="table-subtitle-cell">442350/7864320</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="容器组" min-width="163">
            <template slot-scope="scope">
              <div class="table-active-cell">{{ scope.row.address }}</div>
              <span class="table-subtitle-cell">27/110</span>
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
            >
              <el-option
                v-for="item in podList"
                :key="item.value"
                :label="item.label"
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
          <el-select
            v-model="clusterStart"
            placeholder="请选择"
            @change="clusterChange"
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

        <div id="kmpp-num"></div>
      </div>
      <div class="five-grid-right">
        <div class="item-header-sel">
          <div class="info-title">告警触发次数</div>
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

        <div id="warning-num"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import moment from "moment";
import { searchClusters } from "@/api/cluster";
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
      paginationConfig: {
        currentPage: 1,
        pageSize: 10000,
        total: 0,
      },
      cpuData: [
        { label: "请求率60.8%", percent: 60.8 },
        { label: "使用率33.3%", percent: 33.3 },
      ],
      giData: [
        { label: "请求率60.8%", percent: 60.8 },
        { label: "使用率33.3%", percent: 33.3 },
      ],
      cpuRate: [
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
      memoryRate: [
        { label: "使用量", year: "1750", value: 502 },
        { label: "使用量", year: "1800", value: 635 },
        { label: "使用量", year: "1850", value: 809 },
        { label: "使用量", year: "1900", value: 3268 },
        { label: "使用量", year: "1950", value: 3400 },
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
      kmppRate: [
        { label: "运行中", year: "1750", value: 1502 },
        { label: "运行中", year: "1800", value: 635 },
        { label: "运行中", year: "1850", value: 809 },
        { label: "运行中", year: "1900", value: 268 },
        { label: "运行中", year: "1950", value: 400 },
        { label: "运行中", year: "1999", value: 634 },
        { label: "运行中", year: "2050", value: 947 },
        { label: "总数", year: "1750", value: 106 },
        { label: "总数", year: "1800", value: 107 },
        { label: "总数", year: "1850", value: 111 },
        { label: "总数", year: "1900", value: 766 },
        { label: "总数", year: "1950", value: 221 },
        { label: "总数", year: "1999", value: 767 },
        { label: "总数", year: "2050", value: 133 },
      ],
      tableClusterData: [
        {
          date: "2016-05-02",
          name: "60.23%",
          address: "60.23%",
        },
        {
          date: "2016-05-04",
          name: "60.23%",
          address: "60.23%",
        },
        {
          date: "2016-05-01",
          name: "60.23%",
          address: "60.23%",
        },
        {
          date: "2016-05-03",
          name: "60.23%",
          address: "60.23%",
        },
        {
          date: "2016-12-03",
          name: "60.23%",
          address: "60.23%",
        },
      ],
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
      clusterStart: moment().subtract(1, "d").format("X"),
      clusterEnd: moment().format("X"),
      // 资源使用率-时间
      resourcesStart: moment().subtract(1, "d").format("X"),
      resourcesEnd: moment().format("X"),

      selectOptions: [
        {
          label: "按照CPU使用率",
          value: "cpu",
        },
      ], // 集群/节点资源使用率 Top5 选项表
      optionCurrent1: "cpu", // 集群/节点资源使用率 Top5 当前选项
      optionCurrent2: "cpu", // 集群/节点资源使用率 Top5 当前选项
      clusterList: [], // 集群资 选项表
      clusterCurrent: "", // 集群资 当前选项
      podList: [], // 节点 选项表
      podCurrent: "", // 节点 当前选项

      // 几个图表对象
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
    this.getClusters();
    // CPU (Core) 使用情况
    const colors1 = ["#5354bb", "#8485d5"];
    this.cpuInit("cpu-info", this.cpuData, colors1);
    // 内存 (Gi) 使用情况
    const colors2 = ["#0a59cc", "#568ad6"];
    this.cpuInit("gi-info", this.cpuData, colors2);
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
    // 告警触发次数
    const colors3 = ["#CF0A1E", "#F59326", "#D42D7F"];
    this.initLine("warning-num", this.warnNum, colors3, "CPU (%)");
  },
  mounted() {
    this.$nextTick(() => {
      console.log(
        this.chartCus1,
        this.chartCus2,
        this.chartCus3,
        this.chartCus4
      );
    });
  },
  activited() {},
  update() {},
  methods: {
    cpuInit(container, data, colors) {
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
          content: "108.00",
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
          .color("percent", colors)
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

    // 告警触发次数-时间切换
    warningChange(data) {
      const arr = this.cusTime.filter((item) => {
        return item.start == data;
      });
      this.warningEnd = arr[0].end;
    },
    // 容器组数量-时间切换
    clusterChange(data) {
      const arr = this.cusTime.filter((item) => {
        return item.start == data;
      });
      this.clusterEnd = arr[0].end;
    },

    // 资源使用率-时间切换
    resourcesChange(data) {
      const arr = this.cusTime.filter((item) => {
        return item.start == data;
      });
      this.resourcesEnd = arr[0].end;
    },

    // 重置 资源使用率筛选
    resetResource() {
      // 资源使用率-时间
      const arr = this.cusTime.filter((item) => {
        return item.name == "最近 1 天";
      });

      this.clusterCurrent = "all";
      this.resourcesStart = arr[0].start;
      this.resourcesEnd = arr[0].end;
      this.chartCus1.appendPadding = [26, 0, 0, 19];
      this.chartCus1.changeData([]);
      this.chartCus2.appendPadding = [26, 0, 0, 19];
      this.chartCus2.changeData([]);
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

        this.clusterList.splice(0, 0, { label: "全部", value: "all" });
        this.clusterCurrent = "all";
        // this.cluster = this.clusterList[0].value;
      });
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

.table-subtitle-cell {
  font-size: 12px;
  color: #797f8c;
  line-height: 20px;
  font-weight: 400;
}
</style>
