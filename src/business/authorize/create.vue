<template>
  <layout-content
    :header="$t('commons.button.create')"
    :back-to="{ name: 'authorizeList' }"
  >
    <el-row>
      <el-col :span="4"><br /></el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light">
          <el-form
            label-position="left"
            ref="form"
            :model="form"
            :rules="rules"
            label-width="160px"
          >
            <el-form-item :label="$t('commons.table.name')" prop="username">
              <el-input v-model="form.username" clearable></el-input>
              <div>
                <span class="input-help">{{
                  $t("commons.validate.name_help")
                }}</span>
              </div>
            </el-form-item>
            <el-form-item required label="集群" prop="clustername">
              <el-select
                v-model="form.clustername"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="item.name"
                  :value="item.value"
                  :key="item.name"
                  v-for="item in clusterOptions"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="block">
              <div
                v-for="(item, index) in form.groupList"
                :key="index"
                class="item-group"
              >
                <div class="buttons">
                  <el-button @click="deleteItem(index)" v-show="index !== 0"
                    >删除</el-button
                  >
                </div>
                <el-form-item
                  label="TEMPLATE"
                  :prop="`groupList[${index}].rolename`"
                  :rules="{
                    required: true,
                    message: '输入项不能为空',
                    trigger: 'change',
                  }"
                >
                  <el-select
                    v-model="item.rolename"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      :key="item.name"
                      v-for="item in templateOptions"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="NameSpace"
                  :rules="{
                    required: true,
                    message: '输入项不能为空',
                    trigger: 'change',
                  }"
                  :prop="`groupList[${index}].namespace`"
                >
                  <el-select
                    v-model="item.namespace"
                    placeholder="请选择"
                    style="width: 100%"
                    :disabled="!form.clustername"
                    multiple
                  >
                    <el-option
                      :label="item.name"
                      :value="item.value"
                      :key="item.name"
                      v-for="item in nameSpaceOption"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-button type="primary" @click="add" class="add"
                >添加</el-button
              >
            </div>
            <el-form-item label="ACCESS" prop="radio" v-if="radioOption.length">
              <el-radio-group v-model="form.radio">
                <el-radio label="NONE">NONE</el-radio>
                <el-radio :label="radioOption[0].metadata.name"
                  >READ-ONLY</el-radio
                >
                <el-radio :label="radioOption[1].metadata.name"
                  >READ-WRITE</el-radio
                >
              </el-radio-group>
            </el-form-item>

            <el-form-item style="float: right">
              <el-button @click="onCancel()">{{
                $t("commons.button.cancel")
              }}</el-button>
              <el-button type="primary" @click="onSubmit">{{
                $t("commons.button.create")
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </layout-content>
</template>

<script>
import LayoutContent from "@/components/layout/LayoutContent";
import Rule from "@/utils/rules";
import { listNamespace } from "@/api/cluster/namespace";
import { searchClusters } from "@/api/cluster";
import {
  getRbacs,
  clusterrolebinding,
  kubeusers,
  rolebinding,
} from "@/api/authorize-center";

export default {
  name: "HostCreate",
  components: { LayoutContent },
  data() {
    return {
      credentialType: "new",
      type: "ingress-nginx",
      form: {
        username: "",
        radio: "NONE",
        clustername: undefined,
        groupList: [
          {
            namespace: [],
            rolename: undefined,
          },
        ],
      },
      rules: {
        username: [Rule.RequiredRule],
        // groupList: {
        //   type: "array",
        //   required: true,
        //   len: 2,
        //   fields: {
        //     0: { required: true },
        //     1: { required: true },
        //   },
        // },
        // namespace: [Rule.RequiredRule],
        clustername: [Rule.RequiredRule],
      },
      clusterOptions: [],
      nameSpaceOption: [],
      templateOptions: [],
      radioOption: [],
      groupList: [0],
      fromName: "",
    };
  },
    watch: {
    "form.clustername": {
      handler(newVal) {
        if (newVal) {
          this.listNamespace();
        }
      },
    },
  },
  methods: {
    add() {
      this.form.groupList.push({
        namespace: [],
        rolename: undefined,
      });
    },
    deleteItem(index) {
      this.form.groupList.splice(index, 1);
    },
    kubeusers() {
      kubeusers({
        clustername: this.form.clustername,
        username: this.form.username,
      }).then(() => {});
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.kubeusers();
          this.form.groupList.forEach((item) => {
            item.namespace.forEach((item1) => {
              let params = {
                clustername: this.form.clustername,
                rolebindingname: `${this.form.username}___${item.rolename}___${item1}`,
                rolename: item.rolename,
                rolekind: "ClusterRole",
                subjects: {
                  kind: "ServiceAccount",
                  name: this.form.username,
                  namespace: "permission-manager",
                },
                namespace: item1,
                username: this.form.username,
              };
              rolebinding(params).then(() => {
                this.$message({
                  type: "success",
                  message: this.$t("commons.msg.create_success"),
                });
                this.$router.push({ name: "authorizeList" });
              });
            });
          });
          if (this.form.radio !== "NONE") {
            let params1 = {
              clustername: this.form.clustername,
              clusterRolebindingName: `${this.form.username}___${this.form.radio}`,
              rolename: this.form.radio,
              subjects: {
                kind: "ServiceAccount",
                name: this.form.username,
                namespace: "permission-manager",
              },
              username: this.form.username,
            };
            clusterrolebinding(params1).then(() => {});
          }
        } else {
          return false;
        }
      });
    },
    listNamespace() {
      this.form.namespace = [];
      listNamespace(this.form.clustername)
        .then((data) => {
          this.nameSpaceOption = data.items;
          this.nameSpaceOption.forEach((items) => {
            items.value = items.label = items.metadata.name;
          });
        })
        .catch(() => {});
    },
    getClusters() {
      searchClusters(1, 1000, "").then((data) => {
        this.clusterOptions = data.items.filter((item) => {
          return item.source === "local";
        });
        this.clusterOptions.forEach((items) => {
          items.value = items.label = items.name;
        });
        this.form.clustername = this.clusterOptions[0].name;
        this.getRbacs();
      });
    },
    getRbacs() {
      getRbacs(this.form.clustername)
        .then((data) => {
          this.radioOption = data.items.clusterRoles.filter((item) => {
            return (
              item.metadata.name === "template-cluster-resources___admin" ||
              item.metadata.name === "template-cluster-resources___read-only"
            );
          });
          this.templateOptions = data.items.clusterRoles.filter((item) => {
            return (
              item.metadata.name ===
                "template-namespaced-resources___developer" ||
              item.metadata.name === "template-namespaced-resources___operation"
            );
          });
          this.templateOptions.forEach((items) => {
            items.value = items.metadata.name;
            items.name =
              items.metadata.name ===
              "template-namespaced-resources___developer"
                ? "developer"
                : "operation";
          });
        })
        .catch(() => {});
    },
    onCancel() {
      this.$router.push({ name: "authorizeList" });
    },
  },
  created() {
    this.getClusters();
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.block {
  margin-left: -59px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  width: calc(100% + 100px);
  background-color: rgba(247, 250, 252, 0.7);
  margin-bottom: 24px;
  .item-group {
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 16px;
    text-align: right;
  }
  .buttons {
    margin-bottom: 16px;
  }
}
/deep/ .el-radio-group {
  display: flex;
  padding-top: 10px;
}
</style>
