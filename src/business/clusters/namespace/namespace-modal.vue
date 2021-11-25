<template>
  <div>
    <el-dialog
      title="创建命名空间"
      :visible.sync="namespaceObj.dialogVisible"
      width="800"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <el-form
        ref="namespaceForm"
        :model="namespaceForm"
        :rules="pvcRule"
        label-width="112px"
      >
        <el-form-item label="集群信息" prop="clustername">
          <el-select
            v-model="namespaceForm.clustername"
            placeholder="请选择集群"
            style="width: 100%"
          >
            <el-option
              v-for="item in clusterList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="命名空间名称" prop="namespace">
          <el-input
            v-model="namespaceForm.namespace"
            placeholder="请输入命名空间名称"
          ></el-input>
          <div class="tip-info" style="margin-top: 16px">
            只能包含小写字母、分隔符(“-”),且必须以小写字母开头或结尾
          </div>
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

export default {
  name: "",
  components: {},
  props: ["namespaceObj"],
  data() {
    return {
      searchClusters,
      clusterList: [],
      namespaceForm: {
        clustername: "",
        namespace: "",
      },
      pvcRule: {
        clustername: [
          {
            required: true,
            message: "请选择集群",
            trigger: "change",
          },
        ],
        namespace: [
          { required: true, message: "请输入命名空间名称", trigger: "blur" },
          {
            message: "只能包含小写字母、分隔符(“-”),且必须以小写字母开头或结尾",
            pattern: /^[a-z][a-z-]*[a-z]$/,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  methods: {
    dialogConfirm() {
      this.$refs.namespaceForm.validate((valid) => {
        if (valid) {
          this.$emit("on-close", true, this.namespaceForm);
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
      });
    },
  },
  filter: {},
  computed: {},

  watch: {
    "namespaceObj.dialogVisible": {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.namespaceForm = {
              clustername: "",
              namespace: "",
            };
            this.$refs.namespaceForm.resetFields();
            this.namespaceForm.clustername = this.namespaceObj.cluster || "";
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
