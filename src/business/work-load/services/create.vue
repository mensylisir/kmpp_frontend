<template>
  <div class="domain-manage">
    <div class="form-content">
      <div class="bread-crumb">
        <span class="bread-crumb-item" @click="resetForm">服务/</span
        ><span>创建服务</span>
      </div>
      <div class="domain-page-title">添加服务</div>
      <div class="module-name">基本信息</div>
      <el-form
        label-position="top"
        label-width="80px"
        :model="deployForm1"
        ref="deployForm1"
        :rules="rules1"
        validate-on-rule-change
      >
        <el-form-item label="服务名称" prop="name">
          <el-input
            v-model="deployForm1.name"
            placeholder="请输入服务名称"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="服务类型" prop="serviceType">
          <el-select
            v-model="deployForm1.serviceType"
            placeholder="请选择服务类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in namespacesList"
              :key="item['metadata'].name"
              :label="item['metadata'].name"
              :value="item['metadata'].name"
            >
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item class="cus-form-item" prop="namespace" label="集群信息">
          <div class="sel-prefix">集群信息</div>
          <el-select
            v-model="deployForm1.clusterName"
            placeholder="请选择集群"
            @change="clusterChange"
            class="cus-sel1"
          >
            <el-option
              v-for="item in clusterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="deployForm1.namespace"
            placeholder="请选择Namespace"
            class="cus-sel2"
            @change="namespaceChange"
          >
            <el-option
              v-for="item in namespacesList"
              :key="item['metadata'].name"
              :label="item['metadata'].name"
              :value="item['metadata'].name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="DeployLabels"
          prop="deployLabelsCopy"
          class="cus-tags"
        >
          <div slot="label" class="slot-label-tags">
            <span class="tags-title">标签</span>
            <span class="tags-btn" @click="addTags('d')">添加变量</span>
          </div>
          <div
            v-for="(item, index) in deployForm1.deployLabelsCopy"
            :key="index"
            class="tags-item"
          >
            <el-input
              v-model="deployForm1.deployLabelsCopy[index]"
              placeholder="请输入键-值对，例：app:devops-frontend"
            ></el-input>
            <span
              class="iconfont icon-close-line"
              v-if="deployForm1.deployLabelsCopy.length > 1"
              @click="delTags(index, 'd')"
            ></span>
          </div>

          <div class="tip-info">
            只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对
          </div>
        </el-form-item>

        <el-form-item
          label="标签选择器（选填）"
          prop="selector"
          class="cus-tags"
        >
          <el-select
            v-model="deployForm1.selector"
            placeholder="请选择服务 label selector"
            style="width: 100%"
          >
            <el-option
              v-for="(value, key, index) in deployList"
              :key="index"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="访问方式" prop="serviceType">
          <el-radio-group v-model="deployForm1.serviceType">
            <el-radio label="ClusterIP">ClusterIP（集群内访问）</el-radio>
            <el-radio label="Nodeport">Nodeport （VPC内访问）</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <div class="port-con">
      <el-button
        size="mini"
        type="primary"
        style="margin-bottom: 12px"
        @click="addPortInfo"
        >添加端口</el-button
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="serviceName" label="端口名称" min-width="396">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.serviceName"
              placeholder="请输入端口名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="servicePort" label="服务端口" min-width="398">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.servicePort"
              placeholder="请输入服务端口"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="targetPort" label="容器端口" min-width="398">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.targetPort"
              placeholder="请输入容器端口"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="nodePort"
          label="节点端口"
          min-width="398"
          v-if="deployForm1.serviceType == 'Nodeport'"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.nodePort"
              placeholder="请输入节点端口"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-button @click="resetForm">取消</el-button>
    <el-button @click="submitForm" type="primary">确定</el-button>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import { createServices } from "@/api/work-load/services";
import { getDeploy } from "@/api/work-load/deploy";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    var tagsRule = (rule, value, callback) => {
      if (value[0] === "") {
        callback(new Error("请输入标签"));
      } else {
        callback();
      }
    };

    var visitRule = (rule, value, callback) => {
      if (value == "ClusterIP") {
        let flag = false;
        this.tableData.forEach((item) => {
          if (
            item.serviceName == "" ||
            item.servicePort == "" ||
            item.targetPort == ""
          ) {
            flag = true;
            return;
          }
        });
        flag ? callback(new Error("请设置端口信息")) : callback();
      } else if (value == "Nodeport") {
        let flag = false;
        this.tableData.forEach((item) => {
          if (
            item.serviceName == "" ||
            item.servicePort == "" ||
            item.targetPort == "" ||
            item.nodePort == ""
          ) {
            flag = true;
            return;
          }
        });
        flag ? callback(new Error("请设置端口信息")) : callback();
      } else {
        callback(new Error("请选择访问方式"));
      }
    };
    return {
      searchClusters,
      listNamespace,
      createServices,
      getDeploy,
      clusterList: [],
      namespacesList: [], // 命名空间列表
      deployList: [],

      deployForm1: {
        name: "",
        // serviceType: "",
        clusterName: "",
        namespace: "",
        deployLabelsCopy: [""],
        selector: "",
        serviceType: "ClusterIP",
      },

      rules1: {
        name: [{ required: true, message: "请输入服务名称", trigger: "blur" }],
        // serviceType: [
        //   {
        //     required: true,
        //     message: "请选择服务类型",
        //     trigger: "change",
        //   },
        // ],
        deployLabelsCopy: [
          {
            required: true,
            trigger: "blur",
            validator: tagsRule,
          },
          {
            message:
              "只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾；使用“:”分隔键-值对",
            pattern: /^[a-z][a-z0-9-]*:[a-z0-9-]*[a-z0-9]$/,
            trigger: "blur",
          },
        ],
        namespace: [
          {
            required: true,
            message: "请选择命名空间",
            trigger: "change",
          },
        ],
        serviceType: [
          {
            required: true,
            trigger: "change",
            validator: visitRule,
          },
        ],
      },

      tableData: [
        {
          serviceName: "",
          servicePort: "",
          targetPort: "",
          nodePort: "",
        },
      ],
    };
  },
  created() {
    this.deployForm1.clusterName = this.$route.params.cluster;
    this.getClusters();
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    addTags(flag) {
      switch (flag) {
        case "d":
          this.deployForm1.deployLabelsCopy.push("");
          break;
        default:
          break;
      }
    },
    delTags(i, flag) {
      switch (flag) {
        case "d":
          this.deployForm1.deployLabelsCopy.splice(i, 1);
          break;

        default:
          break;
      }
    },
    submitForm() {
      this.$refs.deployForm1.validate((valid1) => {
        if (valid1) {
          const data1 = this.deployForm1;

          data1.labels = {};
          data1.deployLabelsCopy.forEach((item) => {
            data1.labels[item.split(":")[0]] = item.split(":")[1];
          });

          this.tableData.forEach((item) => {
            item.servicePort = Number(item.servicePort);
            item.targetPort = Number(item.targetPort);
            item.nodePort = Number(item.nodePort);
          });
          data1.ports = this.tableData;
          this.createServicesItem(data1);

          // TODO
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.deployForm1.resetFields();

      this.$router.push({
        name: "services",
      });
    },
    clusterChange() {
      this.deployForm1.namespace = "";
      this.deployList = [];
      this.getNamespace(this.deployForm1.clusterName);
    },

    namespaceChange() {
      // this.getDeployList(
      //   this.deployForm1.clusterName,
      //   this.deployForm1.namespace
      // );
    },

    addPortInfo() {
      this.tableData.push({
        serviceName: "",
        servicePort: "",
        targetPort: "",
        nodePort: "",
      });
    },

    // ajax
    getClusters(condition) {
      const paginationConfig = {
        currentPage: 1,
        pageSize: 10000,
        total: 0,
      };
      // this.loading = true;
      const { currentPage, pageSize } = paginationConfig;
      this.searchClusters(currentPage, pageSize, condition).then((data) => {
        // this.loading = false;
        const list = data.items || [];
        this.clusterList = list.filter((item) => {
          return item.source != "external";
        });
        this.clusterList.forEach((items) => {
          items.value = items.label = items.name;
        });

        this.getNamespace(this.deployForm1.clusterName);
      });
    },

    getNamespace(cluster) {
      this.deployForm1.namespace = "";
      // this.loading = true;
      this.listNamespace(cluster)
        .then((data) => {
          this.namespacesList = data.items || [];
        })
        .catch(() => {
          // this.loading = false;
        });
    },

    async getDeployList(cluster, namespace) {
      this.deployList = [];
      const data = await this.getDeploy(cluster, namespace);
      const list = data || [];
      list.forEach((item) => {
        if (item.metadata.labels) {
          this.deployList.push(item.metadata.labels);
        }
      });
      console.log(this.deployList, "this.deployList");
    },

    async createServicesItem(data) {
      await this.createServices(data);
      this.resetForm();
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.domain-manage {
  background: #fff;
  padding: 16px 24px;

  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  .form-content {
    padding-right: 35%;
    .bread-crumb {
      font-size: 14px;
      color: #2c2e33;
      line-height: 22px;
      font-weight: 400;
      .bread-crumb-item {
        color: #797f8c;
        cursor: pointer;
      }
    }
    .domain-page-title {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;

      margin: 16px 0;
    }
    .module-name {
      font-size: 16px;
      color: #2c2e33;
      line-height: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .tip-info {
      font-size: 12px;
      color: #797f8c;
      line-height: 20px;
      font-weight: 400;
    }

    .cus-tags {
      /deep/.el-form-item__label {
        width: 100%;
        display: flex;
        .slot-label-tags {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .tags-title {
            font-size: 14px;
            color: #606266;
            line-height: 22px;
            font-weight: 400;
          }
          .tags-btn {
            font-size: 14px;
            color: #5354bb;
            line-height: 22px;
            font-weight: 400;

            cursor: pointer;
          }
        }

        .pvc-info {
          .pvc-title {
            font-size: 14px;
            color: #4b5059;
            line-height: 22px;
            font-weight: 400;

            margin-right: 16px;
          }
        }
      }
      /deep/.tags-item {
        display: flex;
        margin-bottom: 16px;
      }
      .icon-close-line {
        cursor: pointer;
        font-size: 16px !important;
        margin-left: 8px;
      }

      .data-pvc {
        display: flex;
        margin-bottom: 16px;
        position: relative;
        .el-input--small {
          width: 50%;
          /deep/.el-input__inner {
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        .cus-sel-data {
          width: 50%;
          /deep/.el-input__inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }

        .create-pvc {
          position: absolute;
          right: -140px;
          .tip-1 {
            font-size: 14px;
            color: #797f8c;
            line-height: 22px;
            font-weight: 400;
          }
          .tip-2 {
            font-size: 14px;
            color: #5354bb;
            line-height: 22px;
            font-weight: 400;
            cursor: pointer;
          }
        }
      }
    }
    .cus-form-item {
      /deep/.el-form-item__content {
        display: flex;
        .sel-prefix {
          background: #eff1f5;
          border: 1px solid #cbcfd9;
          border-right: none;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;

          font-size: 14px;
          color: #2c2e33;
          line-height: 19px;
          font-weight: 400;
          display: inline-block;

          padding: 5px 12px;
        }
        .cus-sel1 {
          width: calc(50% - 40px);
          .el-input__inner {
            border-radius: 0;
            border-right: none;
          }
        }
        .cus-sel2 {
          width: calc(50% - 41px);
          .el-input__inner {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    }
    .cus-input-item {
      display: flex;
      align-items: center;
      /deep/.el-input-group__prepend {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;
      }
      .split-1 {
        font-size: 14px;
        color: #2c2e33;
        font-weight: 400;

        margin: 0 12px;
      }
      .split-2 {
        font-size: 14px;
        color: #2c2e33;
        line-height: 22px;
        font-weight: 400;

        margin-left: 12px;
      }
    }
  }
  .port-con {
    margin-bottom: 32px;
    /deep/.el-button--mini {
      padding: 5px 15px;
    }
  }
}
</style>
