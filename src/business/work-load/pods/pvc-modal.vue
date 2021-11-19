<template>
  <div>
    <el-dialog
      title="创建PVC"
      :visible.sync="pvcObj.dialogVisible"
      width="800"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <el-form
        ref="pvcForm"
        :model="pvcForm"
        :rules="pvcRule"
        label-width="112px"
      >
        <el-form-item label="PVC名称" prop="pvcName">
          <el-input v-model="pvcForm.pvcName" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item class="cus-form-item" prop="namespace" label="命名空间">
          <div class="sel-prefix">集群信息</div>
          <el-select
            v-model="pvcForm.clustername"
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
            v-model="pvcForm.namespace"
            placeholder="请选择该集群下的Namespace"
            class="cus-sel2"
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

        <!-- <el-form-item label="注释" prop="notes">
          <div class="cus-input-item">
            <el-input
              value="volume.beta.kubernetes.io/storage-class"
              placeholder="请输入标签值"
              disabled=""
            ></el-input>
            <span class="split-1">=</span>
            <el-input
              v-model="pvcForm.notes"
              placeholder="请输入标签值"
            ></el-input>
          </div>

          <div class="tip-info" style="margin-top: 16px">
            只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾
          </div>
        </el-form-item> -->

        <el-form-item label="访问模式" prop="accessMode">
          <el-select
            v-model="pvcForm.accessMode"
            placeholder="请选择访问模式"
            style="width: 100%"
          >
            <el-option
              v-for="item in modeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="存储容量" prop="requestStorage">
          <el-input
            v-model="pvcForm.requestStorage"
            placeholder="请输入存储容量"
            type="number"
            min="0"
            style="width: 50%"
          >
            <template slot="append">GiB</template></el-input
          >
        </el-form-item>

        <el-form-item label="StorageClass" prop="storageClassName">
          <el-select
            v-model="pvcForm.storageClassName"
            placeholder="请选择StorageClass"
            style="width: 100%"
          >
            <el-option
              v-for="item in pvcObj.storageClassList"
              :key="item['metadata'].uid"
              :label="item['metadata'].name"
              :value="item['metadata'].name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchClusters } from "@/api/cluster";
import { listNamespace } from "@/api/cluster/namespace";

export default {
  name: "",
  components: {},
  props: ["pvcObj"],
  data() {
    return {
      searchClusters,
      listNamespace,
      clusterList: [],
      namespacesList: [], // 命名空间列表
      pvcForm: {
        pvcName: "",
        clustername: "",
        namespace: "",
        // notes: "",
        accessMode: "",
        requestStorage: 0,
        storageClassName: "",
      },
      pvcRule: {
        pvcName: [
          { required: true, message: "请输入PVC名称", trigger: "blur" },
        ],
        namespace: [
          {
            required: true,
            message: "请选择命名空间",
            trigger: "change",
          },
        ],
        // notes: [
        //   { required: true, message: "请输入标签值", trigger: "blur" },
        //   {
        //     message:
        //       "只能包含小写字母、数字及分隔符(“-”),且必须以小写字母开头，数字或小写字母结尾",
        //     pattern: /^[a-z][a-z0-9-]*[a-z0-9]$/,
        //     trigger: "blur",
        //   },
        // ],
        accessMode: [
          { required: true, message: "请选择访问模式", trigger: "change" },
        ],
        requestStorage: [
          { required: true, message: "请输入存储容量", trigger: "blur" },
        ],
        storageClassName: [
          { required: true, message: "请选择StorageClass", trigger: "change" },
        ],
      },
      modeList: [
        {
          label: "ReadWriteOnce",
          value: "ReadWriteOnce",
        },
        {
          label: "ReadOnlyMany",
          value: "ReadOnlyMany",
        },
        {
          label: "ReadWriteMany",
          value: "ReadWriteMany",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  methods: {
    clusterChange() {
      this.pvcForm.namespace = "";
      this.getNamespace(this.pvcForm.clustername);
    },
    dialogConfirm() {
      this.$refs.pvcForm.validate((valid) => {
        if (valid) {
          this.$emit("on-close", true, this.pvcForm);
        } else {
          return false;
        }
      });
    },

    handleClose() {
      // true 表示创建成功，反之失败
      this.$emit("on-close", false);
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

        this.getNamespace(this.pvcForm.clustername);
      });
    },

    getNamespace(cluster) {
      this.pvcForm.namespace = "";
      // this.loading = true;
      this.listNamespace(cluster)
        .then((data) => {
          this.namespacesList = data.items || [];
        })
        .catch(() => {
          // this.loading = false;
        });
    },
  },
  filter: {},
  computed: {},

  watch: {
    "pvcObj.dialogVisible": {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.pvcForm = {
              pvcName: "",
              clustername: "",
              namespace: "",
              // notes: "",
              accessMode: "",
              requestStorage: 0,
              storageClassName: "",
            };
            this.$refs.pvcForm.resetFields();
            this.pvcForm.clustername = this.$route.params.cluster || "";
            this.getClusters();
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
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

.tip-info {
  font-size: 12px;
  color: #797f8c;
  line-height: 20px;
  font-weight: 400;
}

/deep/.el-input-group__append {
  font-size: 14px;
  color: #2c2e33;
  line-height: 22px;
  font-weight: 400;
}
</style>
