<template>
  <layout-content
    :header="$t('commons.button.create')"
    :back-to="{ name: fromName }"
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
            <el-form-item label="类型" prop="type" required>
              <el-radio-group v-model="form.type">
                <el-radio label="common">普通证书</el-radio>
                <el-radio label="root">根证书</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              required
              label="根证书"
              prop="ca_id"
              v-if="form.type === 'common'"
            >
              <el-select
                v-model="form.ca_id"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                  v-for="item in certification"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="大小" prop="key.size">
              <el-select
                v-model="form.key.size"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option label="1024" value="1024"> </el-option>
                <el-option label="2048" value="2048"> </el-option>
                <el-option label="4096" value="4096"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              required
              label="CN"
              prop="cn"
              v-if="form.type === 'root'"
            >
              <el-input v-model="form.cn" clearable></el-input>
            </el-form-item>
            <el-form-item
              required
              label="hosts"
              prop="hosts"
              v-if="form.type === 'common'"
            >
              <el-input v-model="form.hosts" clearable></el-input>
            </el-form-item>
            <el-form-item required label="O" prop="names.organization">
              <el-input v-model="form.names.organization" clearable></el-input>
            </el-form-item>
            <el-form-item label="C" prop="names.country" required>
              <el-input v-model="form.names.country" clearable></el-input>
            </el-form-item>
            <el-form-item label="S" prop="names.province">
              <el-input v-model="form.names.province" clearable></el-input>
            </el-form-item>
            <el-form-item label="L" prop="names.locality" required>
              <el-input v-model="form.names.locality" clearable></el-input>
            </el-form-item>
            <el-form-item label="STREET" prop="names.streetaddress" required>
              <el-input v-model="form.names.streetaddress" clearable></el-input>
            </el-form-item>
            <el-form-item label="PostalCode" prop="names.postalcode">
              <el-input v-model="form.names.postalcode" clearable></el-input>
            </el-form-item>
             <el-form-item label="OU" prop="names.organizationunit" required>
              <el-input v-model="form.names.organizationunit" clearable></el-input>
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
import { listCredentialAll } from "@/api/credentials";
import { addCertificates, getAllCertificates } from "@/api/certificates";

import { getClusterByProject } from "@/api/cluster";
import Rule from "@/utils/rules";

export default {
  name: "HostCreate",
  components: { LayoutContent },
  data() {
    return {
      credentialType: "new",
      form: {
        name: "",
        cn: "",
        type: "common",
        ca_id: undefined,
        hosts: "",
        key: {
          algo: "rsa",
          size: 1024,
        },
        names: {
          organization: "",
          country: "",
          province: "",
          locality: "",
          streetaddress: "",
          postalcode: "",
          organizationunit: ""
        },
      },
      rules: {
        name: [Rule.NameRule],
        cn: [Rule.RequiredRule],
        ca_id: [Rule.RequiredRule],
        hosts: [Rule.RequiredRule],
        key: {
          size: [Rule.RequiredRule],
        },
        names: {
          organization: [Rule.RequiredRule],
          country: [Rule.RequiredRule],
          // province: [Rule.RequiredRule],
          locality: [Rule.RequiredRule],
          streetaddress: [Rule.RequiredRule],
          organizationunit: [Rule.RequiredRule],
        },
      },
      certification: [],
      fromName: "",
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let params = {
            key: {},
            names: {}
          };
          params.is_ca = this.form.type === "common" ? false : true;
          params.names.organization = [this.form.names.organization];
          params.names.country = [this.form.names.country];
          params.names.province = [this.form.names.province];
          params.names.locality = [this.form.names.locality];
          params.names.streetaddress = [this.form.names.streetaddress];
          params.names.postalcode = [this.form.names.postalcode];
          params.names.organizationunit = [this.form.names.organizationunit];
          
          params.key.algo = "rsa";
          params.key.size = Number(this.form.key.size);
          params.name = this.form.name;
          if (!params.is_ca) {
            params.hosts = [this.form.hosts];
            params.ca_id = this.form.ca_id;
          } else {
            params.cn = this.form.cn;
          }
          addCertificates(params).then(() => {
            this.$message({
              type: "success",
              message: this.$t("commons.msg.create_success"),
            });
            this.$router.push({ name: 'certification' });
          });
        } else {
          return false;
        }
      });
    },
    updateCredentialType() {
      this.form.credentialId =
        this.credentialType === "exists" ? this.form.credentialId : "";
    },
    getCredentials() {
      listCredentialAll().then((data) => {
        this.credentialList = data.items;
      });
    },
    getCertification() {
      getAllCertificates(1, 1000)
        .then((data) => {
          this.certification = [...data.items];
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getClusters() {
      this.clusterList = [];
      this.form.cluster = "";
      if (this.form.project === "") {
        return;
      }
      if (this.form.project) {
        getClusterByProject(this.form.project).then((data) => {
          this.clusterList = [];
          for (const clu of data) {
            if (clu.provider !== "plan") {
              this.clusterList.push(clu.name);
            }
          }
        });
      }
    },
    onCancel() {
      this.$router.push({ name: this.fromName });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromName = from.name;
    });
  },
  created() {
    this.getCredentials();
    this.getCertification();
  },
};
</script>

<style scoped>
</style>
