<template>
  <layout-content header="日志中心">
    <div class="noti-header">
      <div class="noti-header-1">
        <div class="option-item">
          <span class="option-title">集群名称：</span>
          <el-select
            v-model="cluster"
            filterable
            placeholder="请选择集群"
            @change="changeCluster"
          >
            <el-option
              v-for="item in clusterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="option-item">
          <span class="option-title">应用：</span>
          <el-select
            v-model="currentNamespace"
            filterable
            placeholder="请选择应用"
            @change="changeNamespace"
          >
            <el-option
              v-for="item in namespacesList"
              :key="item['metadata'].name"
              :label="item['metadata'].name"
              :value="item['metadata'].name"
            >
            </el-option>
          </el-select>
        </div>

        <div class="option-item">
          <span class="option-title">组件：</span>
          <el-select
            v-model="currentPod"
            filterable
            placeholder="请选择组件"
            @change="changePod"
          >
            <el-option
              v-for="item in podList"
              :key="item['metadata'].name"
              :label="item['metadata'].name"
              :value="item['metadata'].name"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="noti-header-2">
        <div class="option-item">
          <span class="option-title">查询条件：</span>
          <el-select
            v-model="currentQuery"
            filterable
            placeholder="支持 nodename/path/container,支持关键字查询,按回车确定,支持添加多个条件"
            multiple
            @change="changeQuery"
            @keydown.native="beginEnterQuery"
            ref="queryItem"
          >
            <el-option
              v-for="(item, index) in queryList"
              :key="item.value + index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            class="cus-btn"
            @click="beginQuery"
            :disabled="currentQuery.length == 0"
            >查询</el-button
          >
          <el-button @click="resetQuery" :disabled="currentQuery.length == 0"
            >重置</el-button
          >
        </div>
      </div>
    </div>

    <div class="t-title">
      <span> 日志列表</span>
      <el-popover
        placement="bottom-end"
        width="361"
        trigger="click"
        :visible-arrow="false"
        popper-class="popper-class-cus"
        v-model="popover"
      >
        <div class="pop-title">选择时间范围</div>
        <div class="cus-time">
          <span
            v-for="(item, index) in cusTime"
            :key="index"
            @click="handelTime(item)"
            class="cus-time-item"
            >{{ item.name }}</span
          >
        </div>
        <div class="pop-title">自定义时间范围</div>
        <div class="date-pick">
          <div class="option-item">
            <span class="option-title">开始时间：</span>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="开始时间"
              class="el-date-pick"
              format="yyyy-MM-dd HH:mm:ss"
              :clearable="false"
              popper-class="date-pop-cus"
            >
            </el-date-picker>
          </div>

          <div class="option-item">
            <span class="option-title">结束时间：</span>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="结束时间"
              class="el-date-pick"
              format="yyyy-MM-dd HH:mm:ss"
              :clearable="false"
              popper-class="date-pop-cus"
            >
            </el-date-picker>
          </div>
        </div>

        <div class="cus-pop-btn">
          <el-button @click="popover = false">取消</el-button>
          <el-button class="cus-btn" @click="configQuery">确定</el-button>
        </div>

        <el-button slot="reference"
          >{{ timeInfo }}<i class="el-icon-arrow-down"></i
        ></el-button>
      </el-popover>
    </div>

    <div class="table-title">
      <div class="col-1">采集时间</div>
      <div class="col-2">日志内容</div>
    </div>
    <div class="table-no-data" v-if="notiList.length == 0">
      <svg class="icon no-data" aria-hidden="true">
        <use xlink:href="#icontaolun"></use>
      </svg>
      <span class="no-data-info">暂无数据</span>
    </div>

    <div class="table-con" v-else>
      <div class="noti-item-con" v-for="(noti, index) in notiList" :key="index">
        <div class="noti-item-time">
          {{ moment(noti[0] / 1000 / 1000).format("YYYY-MM-DD HH:mm:ss.SSS") }}
          <!-- {{ noti[1].slice(0, 23) }} -->
        </div>
        <div class="noti-item-msg">{{ noti[1] }}</div>
      </div>
    </div>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import { listNotification } from "@/api/notification";
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import { listPod } from "@/api/cluster/cluster";
import "./pop.scss";
import moment from "moment";

export default {
  name: "",
  components: { LayoutContent },
  props: {},
  data() {
    return {
      listNotification,
      searchClusters,
      listNamespace,
      listPod,
      moment,
      notiList: [], // 日志列表
      paginationConfig: {
        currentPage: 1,
        pageSize: 10000,
        total: 0,
      },
      cluster: "", // 当前选中的集群
      clusterList: [], // 集群列表
      currentNamespace: "", // 命名空间列表
      namespacesList: [], // 命名空间列表
      currentPod: "", // 当前选择pod
      podList: [], // pod列表
      currentQuery: [], // 当前查询条件
      queryList: [], // 查询条件列表
      timeInfo: "", // 时间查询按钮要显示的内容
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      popover: false,
      cusTime: [
        {
          name: "最近 15 分钟",
          start: moment().subtract(15, "m"),
          end: moment(),
        },
        {
          name: "最近 30 分钟",
          start: moment().subtract(30, "m"),
          end: moment(),
        },
        {
          name: "最近 1 小时",
          start: moment().subtract(1, "h"),
          end: moment(),
        },
        {
          name: "最近 2 小时",
          start: moment().subtract(2, "h"),
          end: moment(),
        },
        {
          name: "最近 5 小时",
          start: moment().subtract(5, "h"),
          end: moment(),
        },
        {
          name: "最近 12 小时",
          start: moment().subtract(12, "h"),
          end: moment(),
        },
        // {
        //   name: "最近 1 天",
        //   start: moment().subtract(1, "d"),
        //   end: moment(),
        // },
        // {
        //   name: "最近 3 天",
        //   start: moment().subtract(3, "d"),
        //   end: moment(),
        // },
        // {
        //   name: "最近 7 天",
        //   start: moment().subtract(7, "d"),
        //   end: moment(),
        // },
      ],
    };
  },
  created() {},
  mounted() {
    this.getClusters();
    // this.$nextTick(() => {
    //   // TODO
    //   console.log(this.cusTime);
    // });

    this.startTime = this.cusTime[0].start;
    this.endTime = this.cusTime[0].end;

    this.cusTime.forEach((item) => {
      if (item.start == this.startTime) {
        this.timeInfo = item.name;
        return;
      }
    });
  },
  activited() {},
  update() {},
  methods: {
    getNotification(keyword = "") {
      // 重置列表数据
      this.notiList = [];
      let query = "{}";
      query = this.handleQuery('pod="' + this.currentPod + '"');
      // let query = '{job="monitoring/prometheus-operator"}';

      this.currentQuery.forEach((item) => {
        query = this.handleQuery(item, query);
      });

      this.listNotification(
        this.cluster,
        query,
        this.moment(this.startTime).format("X"),
        this.moment(this.endTime).format("X")
      ).then((data) => {
        const list = data.data.result || [];
        list.length &&
          list.forEach((item) => {
            Object.keys(item.stream).forEach((key) => {
              if (key != "pod") {
                this.queryList.push({
                  name: `${key}：${item.stream[key]}`,
                  value: `${key}="${item.stream[key]}"`,
                });
              }
            });
            this.notiList = this.notiList.concat(item.values);
          });
        // console.log(this.notiList, "**********notiList", this.queryList);
        if (keyword) {
          console.log("keyword");
          this.notiList.filter((noti) => {
            return noti[1].indexOf(keyword) != -1;
          });
        }
      });
    },

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
        this.cluster = this.clusterList[0].value;

        // console.log(this.clusterList, "**********clusterList", this.cluster);

        this.getNamespace();
      });
    },

    getNamespace() {
      // this.loading = true;
      this.listNamespace(this.cluster)
        .then((data) => {
          this.namespacesList = data.items;
          if (data.items.length > 0) {
            this.currentNamespace = this.currentNamespace
              ? this.currentNamespace
              : this.namespacesList[0].metadata.name;
          }
          // console.log(
          //   this.namespacesList,
          //   "**********namespacesList",
          //   this.currentNamespace
          // );

          this.getPods();
        })
        .catch(() => {
          // this.loading = false;
        });
    },

    getPods() {
      this.listPod(this.cluster, "", this.currentNamespace).then((data) => {
        this.podList = data.items;
        this.currentPod = this.podList.length
          ? this.podList[0]["metadata"].name
          : "";

        // console.log(this.podList, "**********namespacesList", this.currentPod);
        this.getNotification();
      });
    },

    handleQuery(addStr, currentStr = "{}") {
      const len = currentStr.length;
      let newStr = "{}";
      if (currentStr == "{}") {
        newStr = `{${addStr}}`;
      } else {
        newStr =
          currentStr.slice(0, len - 1) +
          "," +
          addStr +
          currentStr.slice(len - 1);
      }

      console.log(newStr, "*********");
      return newStr;
    },

    handelTime(data) {
      this.timeInfo = data.name;
      this.startTime = data.start;
      this.endTime = data.end;
      this.popover = false;
      this.getNotification();
    },

    configQuery() {
      if (this.moment(this.startTime).isBefore(this.moment(this.endTime))) {
        this.timeInfo =
          this.moment(this.startTime).format("YYYY-MM-DD HH:mm:ss") +
          " - " +
          this.moment(this.endTime).format("YYYY-MM-DD HH:mm:ss");
        this.getNotification();
      } else {
        this.$message({
          duration: 1000,
          type: "warning",
          message: "结束时间不能小于开始时间！",
        });
        return;
      }
      this.popover = false;
    },

    changeCluster() {
      this.getNamespace();
    },
    changeNamespace() {
      this.getPods();
    },
    changePod() {
      this.getNotification();
    },
    changeQuery() {
      // this.getNotification();
    },
    beginQuery() {
      this.getNotification();
    },
    resetQuery() {
      this.currentQuery = [];
      this.getNotification();
    },
    beginEnterQuery(e) {
      // if (this.$refs.queryItem.query == "" && this.currentQuery.length == 0) {
      //   return;
      // }
      if (e.keyCode == 13) {
        this.getNotification(this.$refs.queryItem.query);
      }
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.noti-header {
  .noti-header-1 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 32px;

    margin-bottom: 16px;
    .option-item {
      display: flex;
      align-items: center;
      .option-title {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
        margin-right: 4px;
      }
      /deep/.el-select {
        // margin-bottom: 0 !important;
        flex: 1;
      }
    }
  }
  .noti-header-2 {
    margin-bottom: 24px;
    .option-item {
      display: flex;
      align-items: center;
      .option-title {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
        margin-right: 4px;
      }
      /deep/.el-select {
        // margin-bottom: 0 !important;
        flex: 1;
        margin-right: 8px;
      }
      .cus-btn {
        background: #5354bb;
        color: #ffffff;
      }
    }
  }
}

.t-title {
  font-size: 16px;
  color: #2c2e33;
  line-height: 24px;
  font-weight: 500;

  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  /deep/.el-icon-arrow-down {
    margin-left: 47px;
  }
}

.table-title {
  display: flex;
  background: #f9fafc;

  font-size: 14px;
  color: #2c2e33;
  line-height: 22px;
  font-weight: 500;

  border: 1px solid #e4e7f0;
  border-bottom: none;
  .col-1 {
    width: 176px;
    padding: 11px 16px;
  }
  .col-2 {
    flex: 1;
    padding: 11px 16px;
  }
}

.table-no-data {
  height: 172px;
  background: #ffffff;
  border: 1px solid #e4e7f0;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .no-data {
    height: 56px;
    width: 56px;
    margin-bottom: 16px;
  }
  .no-data-info {
    font-size: 12px;
    color: #bcc0cc;
    line-height: 20px;
    font-weight: 400;
  }
}

.table-con {
  border: 1px solid #e4e7f0;
  .noti-item-con {
    font-size: 14px;
    color: #2c2e33;
    line-height: 22px;
    font-weight: 400;

    display: flex;
    .noti-item-time {
      width: 176px;
      padding: 12px 15px 10px 16px;
    }
    .noti-item-msg {
      flex: 1;
      padding: 12px 16px;
    }
  }
}
</style>
