<template>
  <layout-content
    :header="$t('commons.button.create')"
    :back-to="{ name: 'taskList' }"
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
            <el-form-item :label="$t('commons.table.name')" prop="name">
              <el-input v-model="form.name" clearable></el-input>
              <div>
                <span class="input-help">{{
                  $t("commons.validate.name_help")
                }}</span>
              </div>
            </el-form-item>
            <el-form-item required label="集群" prop="cluster">
              <el-select
                v-model="form.cluster"
                placeholder="请选择"
                style="width: 100%"
                @change="listNamespace"
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
            <el-form-item required label="NameSpace" prop="namespace">
              <el-select
                v-model="form.namespace"
                placeholder="请选择"
                style="width: 100%"
                :disabled="!form.cluster"
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
import { getRbacs, clusterrolebinding } from "@/api/authorize-center";

export default {
  name: "HostCreate",
  components: { LayoutContent },
  data() {
    return {
      credentialType: "new",
      form: {
        name: "",
        namespace: [],
        cluster: undefined,
      },
      rules: {
        name: [Rule.NameRule],
        namespace: [Rule.RequiredRule],
        cluster: [Rule.RequiredRule],
      },
      clusterOptions: [],
      nameSpaceOption: [],
      fromName: "",
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let params = {};
          clusterrolebinding(params).then(() => {
            this.$message({
              type: "success",
              message: this.$t("commons.msg.create_success"),
            });
            this.$router.push({ name: "taskList" });
          });
        } else {
          return false;
        }
      });
    },
    listNamespace() {
      this.form.namespace = [];
      listNamespace(this.clusterName)
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
        this.clusterOptions = data.items;
        this.clusterOptions.forEach((items) => {
          items.value = items.label = items.name;
        });
        this.cluster = this.options[0].value;
      });
    },
    getRbacs() {
      getRbacs()
        .then((data) => {
          this.clusterrole = [...data.items];
          this.$router.push({ name: "taskCreate" });
        })
        .catch(() => {});
    },
    onCancel() {
      this.$router.push({ name: "taskList" });
    },
  },
  created() {
    this.getRbacs();
    this.getClusters();
  },
  computed: {
    clusterName() {
      let result = this.clusterOptions.filter((item) => {
        return item.id === this.cluster;
      });
      return result[0] ? result[0].name : "";
    },
  },
};
</script>

<style scoped>
</style>
