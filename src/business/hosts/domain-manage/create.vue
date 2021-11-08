<template>
  <div class="domain-manage">
    <div class="bread-crumb">
      <span class="bread-crumb-item" @click="$router.push({ name: 'domain' })"
        >域名管理/</span
      ><span>添加域名</span>
    </div>
    <div class="domain-page-title">添加 {{ $route.params.type }} 域名</div>
    <div class="module-name" v-if="$route.params.type == 'https'">Secret</div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="secretForm"
      ref="secretForm"
      :rules="rules1"
      v-if="$route.params.type == 'https'"
    >
      <el-form-item label="Secret名称" prop="name">
        <el-input
          v-model="secretForm.name"
          placeholder="请输入应用名称"
        ></el-input>
      </el-form-item>

      <el-form-item class="cus-form-item" prop="namespace">
        <div class="sel-prefix">集群信息</div>
        <el-select
          v-model="secretForm.clustername"
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
          v-model="secretForm.namespace"
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

      <el-form-item label="CA ID" prop="ca_id">
        <el-select
          v-model="secretForm.ca_id"
          placeholder="请选择CA ID"
          style="width: 100%"
        >
          <el-option
            v-for="item in caList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="module-name">Ingress</div>
    <el-form
      label-position="top"
      label-width="80px"
      :model="formLabelAlign"
      ref="formLabelAlign"
      :rules="rules"
    >
      <el-form-item label="Ingress名称" prop="name">
        <el-input
          v-model="formLabelAlign.name"
          placeholder="请输入Ingress名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        class="cus-form-item"
        prop="namespace"
        v-if="$route.params.type == 'http'"
      >
        <div class="sel-prefix">集群信息</div>
        <el-select
          v-model="formLabelAlign.clustername"
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
          v-model="formLabelAlign.namespace"
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

      <el-form-item label="Host" prop="host">
        <el-input
          v-model="formLabelAlign.host"
          placeholder="请输入Host"
        ></el-input>
      </el-form-item>

      <el-form-item label="Path" prop="path">
        <el-input
          v-model="formLabelAlign.path"
          placeholder="请输入Path"
        ></el-input>
      </el-form-item>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="ServiceName" prop="servicename">
            <el-select
              v-model="formLabelAlign.servicename"
              placeholder="请选择ServiceName"
              style="width: 100%"
              @change="servicenameChange"
            >
              <el-option
                v-for="item in servicesList"
                :key="item.servicename"
                :label="item.servicename"
                :value="item.servicename"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="ServicePort" prop="serviceport">
            <el-select
              v-model="formLabelAlign.serviceport"
              placeholder="请选择ServicePort"
              style="width: 100%"
            >
              <el-option
                v-for="item in servicePortList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select> </el-form-item
        ></el-col>
      </el-row>
      <el-form-item label="UseTLS">
        <el-select
          v-model="formLabelAlign.usetls"
          placeholder="请选择UseTLS"
          style="width: 100%"
          disabled
        >
          <el-option label="true" value="true"></el-option>
          <el-option label="false" value="false"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button @click="submitForm" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";
import {
  getService,
  createIngress,
  createSecret,
  getCA,
} from "@/api/domain-manage";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      searchClusters,
      listNamespace,
      getService,
      createIngress,
      createSecret,
      getCA,
      clusterList: [],
      namespacesList: [], // 命名空间列表
      servicesList: [], // 命名空间列表
      servicePortList: [], // 命名空间列表
      caList: [],
      secretForm: {
        name: "",
        clustername: "",
        namespace: "",
        ca_id: "",
      },
      formLabelAlign: {
        name: "", // ingress名称
        clustername: "",
        namespace: "",
        host: "",
        path: "",
        servicename: "",
        serviceport: "",
        usetls: this.$route.params.type == "https",
      },
      rules: {
        name: [
          { required: true, message: "请输入Ingress名称", trigger: "blur" },
        ],
        host: [{ required: true, message: "请输入Host", trigger: "blur" }],
        path: [{ required: true, message: "请输入Path", trigger: "blur" }],
        servicename: [
          { required: true, message: "请选择ServiceName", trigger: "blur" },
        ],
        serviceport: [
          { required: true, message: "请选择ServicePort", trigger: "blur" },
        ],
        namespace: [
          {
            required: this.$route.params.type == "http",
            message: "请选择Namespace",
            trigger: "blur",
          },
        ],
      },
      rules1: {
        name: [{ required: true, message: "请输入应用名称", trigger: "blur" }],
        ca_id: [{ required: true, message: "请选择CA ID", trigger: "blur" }],
        namespace: [
          {
            required: this.$route.params.type == "https",
            message: "请选择Namespace",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getClusters();
    if (this.$route.params.type == "https") {
      this.getCAList();
    }
  },
  mounted() {},
  activited() {},
  update() {},
  methods: {
    submitForm() {
      if (this.$route.params.type == "http") {
        this.$refs.formLabelAlign.validate((valid) => {
          if (valid) {
            this.createIngressBtn(this.formLabelAlign);
          } else {
            return false;
          }
        });
      } else {
        this.$refs.secretForm.validate((valid) => {
          if (valid) {
            this.createSecretBtn(this.secretForm);
          } else {
            return false;
          }
        });
      }
    },
    resetForm() {
      if (this.$route.params.type == "http") {
        this.$refs.formLabelAlign.resetFields();
      } else {
        this.$refs.formLabelAlign.resetFields();
        this.$refs.secretForm.resetFields();
      }

      this.$router.push({
        name: "domain",
      });
    },
    clusterChange() {
      if (this.$route.params.type == "http") {
        this.getNamespace(this.formLabelAlign.clustername);
      }

      if (this.$route.params.type == "https") {
        this.getNamespace(this.secretForm.clustername);
      }
    },

    namespaceChange() {
      if (this.$route.params.type == "http") {
        this.getServiceList();
      }

      if (this.$route.params.type == "https") {
        this.getServiceList();
      }
    },

    servicenameChange() {
      const arr = this.servicesList.filter((item) => {
        return item.servicename == this.formLabelAlign.servicename;
      });

      this.servicePortList = arr[0].serviceports || [];
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

        this.formLabelAlign.clustername = this.clusterList[0].value || "";
        this.secretForm.clustername = this.clusterList[0].value || "";

        if (
          this.$route.params.type == "http" &&
          this.formLabelAlign.clustername
        ) {
          this.getNamespace(this.formLabelAlign.clustername);
        }

        if (this.$route.params.type == "https" && this.secretForm.clustername) {
          this.getNamespace(this.secretForm.clustername);
        }
      });
    },

    getNamespace(cluster) {
      this.secretForm.namespace = "";
      this.formLabelAlign.namespace = "";
      // this.loading = true;
      this.listNamespace(cluster)
        .then((data) => {
          this.namespacesList = data.items;
        })
        .catch(() => {
          // this.loading = false;
        });
    },

    async getServiceList() {
      this.formLabelAlign.servicename = "";
      this.formLabelAlign.serviceport = "";
      let clustername = "";
      let namespace = "";
      if (this.$route.params.type == "http") {
        clustername = this.formLabelAlign.clustername;
        namespace = this.formLabelAlign.namespace;
      } else {
        clustername = this.secretForm.clustername;
        namespace = this.secretForm.namespace;
      }

      if (namespace != "") {
        const { services } = await this.getService(clustername, namespace);
        this.servicesList = services || [];
      }
    },

    async createIngressBtn(reBody) {
      await this.createIngress(reBody);
      this.$router.push({
        name: "domain",
      });
    },

    async createSecretBtn(reBody) {
      await this.createSecret(reBody);
      this.$refs.formLabelAlign.validate((valid) => {
        if (valid) {
          const reBody = this.formLabelAlign;
          reBody.secretname = this.secretForm.name;
          reBody.clustername = this.secretForm.clustername;
          reBody.namespace = this.secretForm.namespace;
          this.createIngressBtn(reBody);
        } else {
          return false;
        }
      });
    },

    async getCAList() {
      const { items } = await this.getCA();
      this.caList = items || [];
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
  padding-right: 35%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
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
    font-size: 14px;
    color: #2c2e33;
    line-height: 22px;
    font-weight: 500;
    margin-bottom: 16px;
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
}
</style>
