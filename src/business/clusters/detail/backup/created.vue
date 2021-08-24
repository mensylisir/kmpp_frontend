<template>
  <div class="dialog">
    <el-dialog title="新建备份账号" :visible.sync="visible" @close="onCancel()">
      <el-form
        ref="createForm"
        label-position="left"
        :rules="rules"
        :model="form"
        label-width="160px"
      >
        <el-form-item :label="$t('commons.table.name')" prop="name">
          <el-input v-model="form.name" @blur="getBucketOption"></el-input>
          <div>
            <span class="input-help">{{
              $t("commons.validate.name_help")
            }}</span>
          </div>
        </el-form-item>
        <el-form-item :label="$t('commons.table.type')" required>
          <el-select
            style="width: 100%"
            v-model="form.type"
            :placeholder="$t('commons.validate.select')"
            @change="getBucketOption"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.type === 'OSS' || form.type === 'MINIO'"
          label="AccessKey"
          prop="credentialVars.accessKey"
        >
          <el-input v-model="form.credentialVars['accessKey']" @blur="getBucketOption"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type === 'OSS' || form.type === 'MINIO'"
          label="SecretKey"
          prop="credentialVars.secretKey"
        >
          <el-input
            type="password"
            @blur="getBucketOption"
            v-model="form.credentialVars['secretKey']"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type === 'AZURE'"
          :label="$t('backup_account.table.accountName')"
          prop="credentialVars.accountName"
        >
          <el-input v-model="form.credentialVars['accountName']" @blur="getBucketOption"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type === 'AZURE'"
          :label="$t('backup_account.table.accountKey')"
          prop="credentialVars.accountKey"
        >
          <el-input
            type="password"
            v-model="form.credentialVars['accountKey']"
            @blur="getBucketOption"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type === 'MINIO'"
          :label="$t('backup_account.table.region')"
          prop="credentialVars.region"
        >
          <el-input v-model="form.credentialVars['region']" @blur="getBucketOption"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type !== 'SFTP'"
          :label="$t('backup_account.table.endpoint')"
          prop="credentialVars.endpoint"
        >
          <el-input v-model="form.credentialVars['endpoint']" @blur="getBucketOption"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type !== 'SFTP'"
          :label="$t('backup_account.table.bucket')"
          prop="bucket"
        >
          <el-select
            style="width: 100%"
            v-model="form.bucket"
            :placeholder="$t('commons.validate.select')"
            :disabled="!bucketShow"
          >
            <el-option v-for="item in buckets" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- SFTP Option start-->
        <div v-if="form.type === 'SFTP'">
          <el-form-item
            :label="$t('backup_account.table.address')"
            prop="credentialVars.address"
          >
            <el-input
              placeholder="172.16.10.100"
              v-model="form.credentialVars['address']"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('backup_account.table.port')"
            prop="credentialVars.port"
          >
            <el-input-number
              v-model="form.credentialVars['port']"
              :min="0"
              :max="65535"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            :label="$t('backup_account.table.username')"
            prop="credentialVars.username"
          >
            <el-input v-model="form.credentialVars['username']"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('backup_account.table.password')"
            prop="credentialVars.password"
          >
            <el-input
              type="password"
              v-model="form.credentialVars['password']"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('backup_account.table.path')" prop="bucket">
            <el-input v-model="form.bucket"></el-input>
          </el-form-item>
        </div>
        <!-- SFTP Option end-->
        <!-- <el-form-item :label="$t('host.project_auth')" prop="projects" required>
          <el-select
            v-model="form.projects"
            multiple
            style="width: 100%"
            filterable
            @change="getClusters"
            reserve-keyword
          >
            <el-option
              v-for="(item, index) in projects"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="$t('host.cluster_auth')" prop="clusters">
          <el-select
            v-model="form.clusters"
            multiple
            style="width: 100%"
            filterable
            reserve-keyword
          >
            <el-option :label="clusterName" :value="clusterName"> </el-option>
          </el-select>
        </el-form-item>
        <!-- <div >
          <el-form-item>
            <el-button v-if="form.type !== 'SFTP'" plain @click="getBuckets">{{
              $t("commons.button.getBucket")
            }}</el-button>
            <el-button @click="onCancel()">{{
              $t("commons.button.cancel")
            }}</el-button>
            <el-button type="primary" @click="onSubmit">{{
              $t("commons.button.submit")
            }}</el-button>
          </el-form-item>
        </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createBackupAccounts, listBuckets } from "@/api/backup-account";
// import { allProjects } from "@/api/projects";
import { getClusterByProject } from "@/api/cluster";
import Rule from "@/utils/rules";

export default {
  name: "RegistryCreate",
  components: {},
  props: ["dialogFormVisible", "clusterName"],
  data() {
    return {
      form: {
        projects: ["kubeoperator"],
        clusters: [],
        name: "",
        type: "MINIO",
        bucket: "",
        credentialVars: {},
      },
      rules: {
        name: [Rule.NameRule],
        bucket: [Rule.RequiredRule],
        credentialVars: {
          accessKey: [Rule.RequiredRule],
          secretKey: [Rule.RequiredRule],
          accountName: [Rule.RequiredRule],
          accountKey: [Rule.RequiredRule],
          region: [Rule.RequiredRule],
          endpoint: [Rule.RequiredRule],
          port: [Rule.RequiredRule],
          username: [Rule.RequiredRule],
          address: [Rule.RequiredRule],
          password: [Rule.RequiredRule],
        },
      },
      typeOptions: [
        // {
        //   value: "OSS",
        // },
        {
          value: "MINIO",
        },
        // {
        //   value: "SFTP",
        // },
        // {
        //   label: "Azure",
        //   value: "AZURE",
        // },
      ],
      formLabelWidth: "120px",
      buckets: [],
      loading: false,
      projects: [],
      clusters: [],
      visible: false,
    };
  },
  watch: {
    dialogFormVisible: function (val) {
      if (val) {
        this.visible = val;
      } else {
        this.visible = false;
      }
    },
  },
  computed: {
    bucketShow() {
      let result =
        this.form.name &&
        this.form.type &&
        this.form.credentialVars.region &&
        this.form.credentialVars.endpoint
          ? true
          : false;
      console.log(result);
      return result;
    },
  },
  methods: {
    // 获取桶选项
    getBucketOption() {
      if (this.bucketShow) {
        this.getBuckets();
      }
    },
    onSubmit() {
      this.$refs.createForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        createBackupAccounts({
          bucket: this.form.bucket,
          credentialVars: this.form.credentialVars,
          name: this.form.name,
          type: this.form.type,
          projects: this.form.projects,
          clusters: this.form.clusters,
        })
          .then(() => {
            this.loading = false;
            this.$message({
              type: "success",
              message: this.$t("commons.msg.create_success"),
            });
            this.onCancel('submit')
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    onCancel(val) {
      this.$refs.createForm.resetFields();
      if(val === 'submit'){
        this.$emit("cancel", true);
      }
       this.$emit("cancel");
    },
    getClusters() {
      this.clusters = [];
      this.form.clusters = [];
      if (this.form.projects.length === 0) {
        return;
      }
      let pros = this.form.projects.join(",");
      getClusterByProject(pros).then((data) => {
        this.clusters = [];
        for (const clu of data) {
          this.clusters.push(clu.name);
        }
      });
    },
    getBuckets() {
      this.loading = true;
      console.log(this.form.credentialVars);
      listBuckets({
        name: this.form.name,
        type: this.form.type,
        credentialVars: this.form.credentialVars,
      })
        .then((data) => {
          this.loading = false;
          this.buckets = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.form.clusters.push(this.clusterName);
    // allProjects().then((res) => {
    //   this.projects = res.items;
    // });
  },
};
</script>

<style scoped>
</style>
