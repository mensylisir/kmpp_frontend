<template>
  <div class="deploy-detail">
    <div class="top">
      <div class="detail"><span @click="goBack">中间件 /</span> 中间件详情</div>
      <div class="basic-info">
        <h5>基本信息</h5>
        <el-popconfirm
          title="确定删除吗？"
          @confirm="deleteMiddle"
          class="detete"
        >
          <el-button type="danger" slot="reference">删除</el-button>
        </el-popconfirm>

        <div class="title">
          <img :src="middle.iconUrl" />
          <span>{{ middle.name }}</span>
        </div>
        <div class="text-info">
          <span>应用状态：</span>
          <span></span>
          <span>应用版本：</span>
          <span class="text-bg"
            >App: {{ middle.latestVersion.appVersion }}</span
          >
          <span class="text-bg"
            >Package: {{ middle.latestVersion.pkgVersion }}</span
          >
        </div>
        <div class="text-info">
          <span>应用描述：</span>
          <span style="color: #2c2e33">{{ middle.shortDescription }}</span>
        </div>
      </div>
      <div class="statistic-info">
        <div class="left">
          <div class="title">Pod</div>
          <div class="content">
            <el-progress
              type="circle"
              :percentage="percentage"
              color="#5354BB"
              :show-text="false"
              :width="96"
            ></el-progress>
            <div class="circleCenter">
              <div>{{ avilable }}/{{ total }}</div>
            </div>
            <div style="margin-left: 16px; width: 230px">
              <div>kubefed-controller-manager<span></span></div>
              <div>kubefed-admission-webhook<span></span></div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">Application Secrets</div>
          <el-table
            class="app-table"
            :data="tableData"
            style="width: 100%"
            :show-header="false"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column prop="label" label="access-key" width="180">
            </el-table-column>
            <el-table-column label="key.json">
              <template slot-scope="scope">
                {{ scope.row.eyeOpen ? scope.row.value : "*****************" }}
              </template>
            </el-table-column>

            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <svg
                  class="icon svg-icon"
                  aria-hidden="true"
                  @click="copyText(scope.row.value)"
                >
                  <use xlink:href="#icon-copy"></use>
                </svg>
                <svg
                  v-if="scope.row.eyeOpen"
                  class="icon svg-icon eyes"
                  aria-hidden="true"
                  @click="scope.row.eyeOpen = !scope.row.eyeOpen"
                >
                  <use xlink:href="#icon-eye-open"></use>
                </svg>
                <svg
                  v-else
                  class="icon svg-icon eyes"
                  aria-hidden="true"
                  @click="scope.row.eyeOpen = !scope.row.eyeOpen"
                >
                  <use xlink:href="#icon-eye-off"></use>
                </svg>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="middle">
      <h5>Installation Notes</h5>
      <div class="content">{{ detailData.postInstallationNotes }}</div>
    </div>
    <div class="bottom">
      <div
        style="
          display: flex;
          align-items: center;
          box-shadow: 0 1px 0 0 #e4e7f0;
          padding: 0 24px;
          height: 56px;
        "
      >
        <div class="title">应用资源</div>
        <el-menu
          mode="horizontal"
          :default-active="activeKey"
          v-model="activeKey"
          @select="tabChange"
        >
          <el-menu-item
            :index="item.name"
            :key="item.name"
            v-for="item in manifest"
          >
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div style="padding: 16px 24px" class="resouse">
        <el-table
          v-if="activeKey === 'deployment'"
          :data="currItem.tableData"
          border
        >
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">
              {{ scope.row.item.metadata.name }}
            </template>
          </el-table-column>
          <el-table-column label="最新" prop="name">
            <template slot-scope="scope">
              {{ scope.row.item.metadata.name }}
            </template>
          </el-table-column>
          <el-table-column label="可用" prop="name">
            <template slot-scope="scope">
              {{ scope.row.item.metadata.name }}
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="activeKey === 'secret'"
          :data="currItem.tableData"
          :span-method="objectSpanMethod"
          border
        >
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">
              {{ scope.row.item.metadata.name }}
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              {{ scope.row.item.type }}
            </template>
          </el-table-column>
          <el-table-column label="数据" class-name="inner">
            <template slot-scope="">
              <el-table
                class="inner-table"
                :data="tableData"
                style="width: 100%"
                border
                :show-header="false"
                :default-sort="{ prop: 'date', order: 'descending' }"
              >
                <el-table-column prop="label" label="access-key" width="180">
                </el-table-column>
                <el-table-column label="key.json">
                  <template slot-scope="scope">
                    {{
                      scope.row.eyeOpen ? scope.row.value : "*****************"
                    }}
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="80">
                  <template slot-scope="scope">
                    <svg
                      class="icon svg-icon"
                      aria-hidden="true"
                      @click="copyText(scope.row.value)"
                    >
                      <use xlink:href="#icon-copy"></use>
                    </svg>
                    <svg
                      v-if="scope.row.eyeOpen"
                      class="icon svg-icon eyes"
                      aria-hidden="true"
                      @click="scope.row.eyeOpen = !scope.row.eyeOpen"
                    >
                      <use xlink:href="#icon-eye-open"></use>
                    </svg>
                    <svg
                      v-else
                      class="icon svg-icon eyes"
                      aria-hidden="true"
                      @click="scope.row.eyeOpen = !scope.row.eyeOpen"
                    >
                      <use xlink:href="#icon-eye-off"></use>
                    </svg>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="activeKey === 'service'"
          :data="currItem.tableData"
          border
        >
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">
              {{ scope.row.item.metadata.name }}
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              {{ scope.row.item.spec.type }}
            </template>
          </el-table-column>
          <el-table-column label="集群 IP" prop="name"> </el-table-column>
          <el-table-column label="外部 IP" prop="name"> </el-table-column>
          <el-table-column label="PORTS" prop="name">
            <template slot-scope="scope">
              {{ scope.row.item.spec.ports.length }}
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="activeKey === '其他资源'"
          :data="currItem.tableData"
          border
        >
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">
              {{ scope.row.item.metadata.name }}
            </template>
          </el-table-column>
          <el-table-column label="类别">
            <template slot-scope="scope">
              {{ scope.row.item.kind }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="middle">
      <h5>Installation Values</h5>
      <div class="CodeMirror">
        <textarea ref="CodeMirror" class="temp-detail-editor"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import {
  getStorList,
  deleteMiddle,
  getDeployResource,
  getResourseDetail,
} from "@/api/middleware";
// 引用组件
import CodeMirror from "codemirror";
// 核心样式
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/xq-light.css";

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
// 如果有Java c++语言设置需求，需要 引入clike.js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/swift/swift.js";
import "codemirror/mode/yaml/yaml.js";

import "codemirror/addon/hint/anyword-hint";

// 设置光标所在行高亮工具包
import "codemirror/addon/selection/active-line";
// 快捷键
import "codemirror/keymap/sublime";

// 实现简单的搜索功能
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";

import { mode } from "@/assets/js/mode";
export default {
  name: "HostCreate",
  components: {},
  data() {
    const getYAMLJS = require("yamljs");
    return {
      mode,
      avilable: 0,
      total: 0,
      getYAMLJS,
      middle: {},
      detailData: {},
      tableData: [],
      manifest: [],
      resouseData: {},
      activeKey: "",
    };
  },
  computed: {
    currItem() {
      let result = this.manifest.filter((item) => {
        return item.name === this.activeKey;
      });
      console.log(this.manifest);
      return result[0];
    },
    prods() {
      let result = this.manifest.filter((item) => {
        let arr = ["deployment", "statefulset", "daemonset", "replicasSets"];
        return arr.indexOf(item.name) > -1;
      });
      console.log(result, "22");
      return result;
    },
    percentage() {
      let result = (this.avilable / this.total) * 100;
      return result ? result : 0;
    },
  },
  watch: {
    activeKey: {
      handler: function () {
        if (!this.$store.state.middle.monitor) {
          if (this.activeKey === "deployment" || this.activeKey === "service") {
            if (this.currItem.tableData.length > 0) {
              this.currItem.tableData.forEach((item) => {
                this.getResourseDetail(item.item);
              });
            }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    // 获取pro数量（deployment、statefulset、daemonset、replicasSets）
    getProNumber() {
      this.prods.forEach((item) => {
        if (item.tableData.length > 0) {
          this.getResourseDetail(item.item, true);
        }
      });
    },
    copyText(val) {
      console.log(val);
      this.$copyText(val).then(
        function () {
          Message({
            type: "success",
            message: "复制成功!",
          });
        },
        function () {
          Message({
            type: "error",
            message: "复制失败!",
          });
        }
      );
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column);
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    // 获取应用详情
    getResourseDetail(item, flag) {
      console.log(this.currItem);
      getResourseDetail(
        this.middle.nameSpace[0],
        this.middle.nameSpace[1],
        item.kind,
        item.metadata.name
      )
        .then((data) => {
          console.log(data, "22");
          if (flag) {
            // 计算prod
            this.total = this.total + data.spec.replicas;
            this.avilable = this.avilable + data.status.replicas;
          }
        })
        .catch(() => {});
    },
    webSocket(item) {
      let url = `ws:${location.host}/proxy/kubeapps/${this.middle.nameSpace[0]}/api/clusters/default/apis/apps/v1/namespaces/${this.middle.nameSpace[1]}/${item.kind}/${item.metadata.name}`;
      let aa = url.replace("http", "ws").replace("https", "ws");
      console.log(aa, "66666");
      let ws = new WebSocket(aa);
      console.log("ws连接状态：" + ws.readyState);
      //监听是否连接成功
      ws.onopen = function () {
        console.log("ws连接状态：" + ws.readyState);
        //连接成功则发送一个数据
        ws.send("test1");
      };
      //接听服务器发回的信息并处理展示
      ws.onmessage = function (data) {
        console.log("接收到来自服务器的消息：", data);
        //完成通信后关闭WebSocket连接
        // this.$store.commit("setMonitor", false);
        // ws.close();
      };

      //监听并处理error事件
      ws.onerror = function (error) {
        console.log(error);
      };
    },
    async editorInit(content) {
      this.jsonEditor = await CodeMirror.fromTextArea(this.$refs.CodeMirror, {
        mode: "yaml",
        lineNumbers: true, // 行号
        lint: true,
        styleActiveLine: true, // 高亮光标所在行
        indentUnit: 2, // 缩进
        smartIndent: true, // 开启自动缩进
        tabSize: 2,
        theme: "default",
        readOnly: false,
      });
      this.jsonEditor.setValue(content);
    },
    tabChange(index) {
      this.activeKey = index;

      let result = this.manifest.filter((item) => {
        return item.name === index;
      });
      if (result[0].tableData.length === 1) {
        this.jsonEditor.setValue(result[0].tableData[0].content);
      } else {
        this.jsonEditor.setValue("");
      }
    },
    goBack() {
      this.$router.push({ name: "MiddleDeploy" });
    },
    deleteMiddle() {
      deleteMiddle(
        this.middle.nameSpace[0],
        this.middle.nameSpace[1],
        this.middle.name
      )
        .then(() => {
          this.$router.push({ name: "MiddleDeploy" });
        })
        .catch(() => {});
    },
    // 获取列表
    getStorList() {
      let params = {
        cluster_name: this.middle.nameSpace[0],
        fun_name:
          "kubeappsapis.plugins.helm.packages.v1alpha1.HelmPackagesService.GetInstalledPackageDetail",
        use_tls: false,
        body: {
          installedPackageRef: {
            context: {
              cluster: "default",
              namespace: this.middle.nameSpace[1],
            },
            identifier: this.middle.installedPackageRef.identifier,
            plugin: {
              name: "",
              version: "",
            },
          },
        },
      };
      getStorList(params)
        .then((data) => {
          this.detailData = data.map_result.installedPackageDetail;
        })
        .catch(() => {});
    },
    getDeployResource() {
      getDeployResource(
        this.middle.nameSpace[0],
        this.middle.nameSpace[1],
        this.middle.name
      )
        .then((data) => {
          this.resouseData = data.data;
          let result = data.data.manifest.split("---").filter((item) => {
            return item;
          });
          let result1 = [];
          result.forEach((item) => {
            let obj = this.getYAMLJS.parse(item);
            result1.push({
              name: obj.kind.toLowerCase(),
              item: obj,
              content: item.split(".yaml")[1].trim(),
            });
            console.log(obj);
          });
          let deployment = result1.filter((item) => {
            return item.name === "deployment";
          });
          let secret = result1.filter((item) => {
            return item.name === "secret";
          });
          let service = result1.filter((item) => {
            return item.name === "service";
          });
          let other = result1.filter((item) => {
            return (
              item.name !== "service" &&
              item.name !== "secret" &&
              item.name !== "deployment"
            );
          });
          this.manifest = [
            {
              name: "deployment",
              tableData: deployment,
            },
            {
              name: "secret",
              tableData: secret,
            },
            {
              name: "service",
              tableData: service,
            },
            {
              name: "其他资源",
              tableData: other,
            },
          ];
          // console.log(this.manifest);
          this.activeKey = this.manifest[0].name;
          if (secret.length > 0) {
            // 设置Application Secrets
            this.applicationData = secret[0].item.data;
            let keys = Object.keys(this.applicationData);
            keys.forEach((item) => {
              this.tableData.push({
                label: item,
                value: this.applicationData[item]
                  ? this.applicationData[item]
                  : "--",
                eyeOpen: true,
              });
            });
          }
          if (deployment.length === 1) {
            // 只有一条数据
            this.editorInit(deployment[0].content);
          } else {
            this.editorInit("");
          }
          console.log(this.$store.state.middle.monitor, "444");
          if (this.$store.state.middle.monitor) {
            this.manifest.forEach((item) => {
              if (item.tableData.length > 0 && item.name !== "其他资源") {
                item.tableData.forEach((item1) => {
                  // 启动监控
                  this.webSocket(item1.item);
                });
              }
            });
          } else {
            // 安装完成
            this.getStorList();
            this.getProNumber();
          }
        })
        .catch(() => {});
    },
  },
  created() {
    this.middle = this.$route.params.item;
    this.getDeployResource();
  },
};
</script>

<style scoped lang='scss'>
.deploy-detail {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .top {
    position: relative;
    background: white;
    padding: 16px;
    margin-bottom: 8px;
    .detail {
      span {
        color: #797f8c;
        cursor: pointer;
      }
    }
    .detete {
      position: absolute;
      right: 16px;
      top: 54px;
    }
    .basic-info {
      border-bottom: 1px solid #e4e7f0;
      padding-bottom: 26px;
      h5 {
        font-size: 16px;
      }
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        img {
          width: 48px;
          height: 48px;
          margin-right: 16px;
        }
      }
      .text-info {
        span {
          font-size: 14px;
          color: #797f8c;
        }
        .text-bg {
          background: #dcdee4;
          padding: 0 4px;
          margin-right: 8px;
          border-radius: 2px;
        }
      }
    }
  }
  .statistic-info {
    display: flex;
    align-items: baseline;
    padding: 24px;
    .title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .left {
      width: 40%;
      margin-right: 56px;
      .content {
        display: flex;
        align-items: center;
        position: relative;
        text-align: center;
      }
    }
    .right {
      width: 60%;
      .icon {
        cursor: pointer;
        width: 14px;
        height: 14px;
        color: #797f8c;
      }
      .eyes {
        margin-left: 14.7px;
      }
    }
  }
  .middle {
    padding: 24px;
    background: #ffffff;
    h5 {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      margin: 0 0 16px 0;
    }
    .content {
      white-space: pre;
      padding: 16px;
      background: #f4f5f7;
      border-radius: 4px;
    }
  }
  .bottom {
    background: #ffffff;
    margin: 8px 0;
    .title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      border-right: 1px solid #e4e7f0;
      height: 24px;
      padding-right: 12px;
    }
  }
}

/deep/ .el-menu-item {
  height: 56px;
  font-size: 16px;
  color: #2c2e33;
}
/deep/.CodeMirror {
  height: 100%;
  .CodeMirror-scroll {
    .CodeMirror-sizer {
      padding-left: 16px;
      padding-top: 4px;
      .CodeMirror-gutter-wrapper {
        left: -99px !important;
        .CodeMirror-linenumber {
          font-size: 14px;
          color: #797f8c;
          line-height: 22px;
          font-weight: 400;
        }
      }
    }
    .CodeMirror-gutters {
      background: #e4e7f0;
      .CodeMirror-gutter {
        width: 62px;
      }
    }
  }
}
/deep/.app-table {
  tr {
    td {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
      &:first-child {
        background: #f9fafc;
        box-shadow: inset -1px 0 0 0 #e4e7f0, inset 0 -1px 0 0 #e4e7f0;
        border-bottom: 0;
      }
    }
    &:last-child {
      td {
        border-bottom: 0;
      }
      td:first-child {
        box-shadow: inset -1px 0 0 0 #e4e7f0;
        border-bottom: 0;
      }
    }
  }
  &::before {
    height: 0;
  }
}
/deep/.resouse {
  .el-table {
    tr {
      td {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
        &:first-child {
          background: white;
          box-shadow: unset;
        }
      }
      &:last-child {
        td {
          border-bottom: 0;
        }
        td:first-child {
          box-shadow: unset;
          border-bottom: 0;
        }
      }
    }
    &::before {
      height: 0;
    }
  }
}
/deep/.inner {
  padding: 0;
  .cell {
    padding: 0;
  }
}
/deep/.inner-table {
  border: 0;
  tr {
    td {
      padding: 16px 16px;
      border-bottom: 1px solid #dfe6ec !important;
    }
    &:last-child {
      td {
        border-bottom: 0;
      }
      td:first-child {
        box-shadow: unset !important;
        border-bottom: 0;
      }
    }
  }
  .icon {
    cursor: pointer;
    width: 14px;
    height: 14px;
    color: #797f8c;
  }
  .eyes {
    margin-left: 14.7px;
  }
  &::before {
    height: 0;
  }
}
.circleCenter {
  position: absolute;
  left: 28px;
  font-size: 24px;
  color: #2c2e33;
  font-weight: 700;
}
</style>
