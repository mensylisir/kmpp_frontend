(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7dfbae8a"],{"174e":function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("layout-content",[a("el-row",{staticStyle:{"margin-top":"20px"}},[a("el-col",{attrs:{span:4}},[a("br")]),a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-form",{ref:"form",attrs:{"label-position":"left",model:e.form,"label-width":"200px"}},[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),prop:"metadata.name",rules:e.nameRules}},[a("el-input",{attrs:{size:"small"},model:{value:e.form.metadata.name,callback:function(r){e.$set(e.form.metadata,"name",r)},expression:"form.metadata.name"}}),a("div",[a("span",{staticClass:"input-help"},[e._v(e._s(e.$t("commons.validate.common_name_help")))])])],1),a("el-form-item",{attrs:{label:e.$t("cluster.detail.storage.provisioner_short"),required:""}},[a("el-select",{staticStyle:{width:"100%"},attrs:{size:"small","value-key":"name",clearable:""},on:{change:function(r){return e.changeClassType()}},model:{value:e.provisioner,callback:function(r){e.provisioner=r},expression:"provisioner"}},e._l(e.provisioners,(function(r){return a("el-option",{key:r.name,attrs:{disabled:"Running"!==r.status,label:"["+r.type+"]"+r.name,value:r}},[e._v("["+e._s(r.type)+"]"+e._s(r.name))])})),1)],1),"nfs"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("cluster.detail.storage.provisioner_name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1)],1):e._e(),"external-ceph"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1),a("el-form-item",{attrs:{label:"Monitor",prop:"parameters.monitors",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" 172.16.10.10:6389",clearable:""},model:{value:e.form.parameters["monitors"],callback:function(r){e.$set(e.form.parameters,"monitors",r)},expression:"form.parameters['monitors']"}})],1),a("el-form-item",{attrs:{label:"OSD Pool",prop:"parameters.pool",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" kube",clearable:""},model:{value:e.form.parameters["pool"],callback:function(r){e.$set(e.form.parameters,"pool",r)},expression:"form.parameters['pool']"}})],1),a("el-form-item",{attrs:{label:"Admin Id",prop:"parameters.adminId",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" secret",clearable:""},model:{value:e.form.parameters["adminId"],callback:function(r){e.$set(e.form.parameters,"adminId",r)},expression:"form.parameters['adminId']"}})],1),a("el-form-item",{attrs:{label:"Admin Secret Name",prop:"parameters.adminSecretName",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" secret",clearable:""},model:{value:e.form.parameters["adminSecretName"],callback:function(r){e.$set(e.form.parameters,"adminSecretName",r)},expression:"form.parameters['adminSecretName']"}})],1),a("el-form-item",{attrs:{label:"Admin Secret Namespace",prop:"parameters.adminSecretName",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" kube-system",clearable:""},model:{value:e.form.parameters["adminSecretNamespace"],callback:function(r){e.$set(e.form.parameters,"adminSecretNamespace",r)},expression:"form.parameters['adminSecretNamespace']"}})],1),a("el-form-item",{attrs:{label:"User Id",prop:"parameters.userId",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" kube",clearable:""},model:{value:e.form.parameters["userId"],callback:function(r){e.$set(e.form.parameters,"userId",r)},expression:"form.parameters['userId']"}})],1),a("el-form-item",{attrs:{label:"User Secret Name",prop:"parameters.userSecretName",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" secret",clearable:""},model:{value:e.form.parameters["userSecretName"],callback:function(r){e.$set(e.form.parameters,"userSecretName",r)},expression:"form.parameters['userSecretName']"}})],1),a("el-form-item",{attrs:{label:"FS Type",prop:"parameters.fsType",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" ext4",clearable:""},model:{value:e.form.parameters["fsType"],callback:function(r){e.$set(e.form.parameters,"fsType",r)},expression:"form.parameters['fsType']"}})],1),a("el-form-item",{attrs:{label:"ImageFormat",prop:"parameters.imageFormat",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" 2",clearable:""},model:{value:e.form.parameters["imageFormat"],callback:function(r){e.$set(e.form.parameters,"imageFormat",r)},expression:"form.parameters['imageFormat']"}})],1)],1):e._e(),"rook-ceph"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1)],1):e._e(),"cinder"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1)],1):e._e(),"vsphere"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1),a("el-form-item",{attrs:{label:e.$t("cluster.detail.storage.class.storage_policy_type")}},[a("el-radio-group",{model:{value:e.form.parameters["storagePolicyType"],callback:function(r){e.$set(e.form.parameters,"storagePolicyType",r)},expression:"form.parameters['storagePolicyType']"}},[a("el-radio",{attrs:{label:"BuiltIn"}},[e._v(e._s(e.$t("cluster.detail.storage.class.build_in")))]),a("el-radio",{attrs:{label:"Custom"}},[e._v(e._s(e.$t("cluster.detail.storage.class.custom")))])],1)],1),"BuiltIn"===e.form.parameters["storagePolicyType"]?a("el-form-item",{attrs:{label:e.$t("cluster.detail.storage.class.storage_policy"),prop:"parameters.storagePolicyName",rules:e.requiredRules}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.form.parameters["storagePolicyName"],callback:function(r){e.$set(e.form.parameters,"storagePolicyName",r)},expression:"form.parameters['storagePolicyName']"}},[a("el-option",{attrs:{value:"vSAN Default Storage Policy",label:"vSAN Default Storage Policy"}}),a("el-option",{attrs:{value:"Management Storage Policy - Large",label:"Management Storage Policy - Large"}}),a("el-option",{attrs:{value:"Management Storage Policy - Single Node",label:"Management Storage Policy - Single Node"}}),a("el-option",{attrs:{value:"Management Storage policy - Thin",label:"Management Storage policy - Thin"}}),a("el-option",{attrs:{value:"Management Storage Policy - Stretched",label:"Management Storage Policy - Stretched"}})],1)],1):e._e(),"Custom"===e.form.parameters["storagePolicyType"]?a("el-form-item",{attrs:{label:e.$t("cluster.detail.storage.class.storage_policy"),prop:"parameters.storagePolicyName",rules:e.requiredRules}},[a("el-input",{staticStyle:{width:"100%"},model:{value:e.form.parameters["storagePolicyName"],callback:function(r){e.$set(e.form.parameters,"storagePolicyName",r)},expression:"form.parameters['storagePolicyName']"}})],1):e._e()],1):e._e(),"glusterfs"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1),a("el-form-item",{attrs:{label:"resturl",prop:"parameters.resturl",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" 172.0.0.1:8081",clearable:""},model:{value:e.form.parameters["resturl"],callback:function(r){e.$set(e.form.parameters,"resturl",r)},expression:"form.parameters['resturl']"}})],1),a("el-form-item",{attrs:{label:"restuser",prop:"parameters.restuser",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" admin",clearable:""},model:{value:e.form.parameters["restuser"],callback:function(r){e.$set(e.form.parameters,"restuser",r)},expression:"form.parameters['restuser']"}})],1),a("el-form-item",{attrs:{label:"restpassword",prop:"parameters.restuserkey",rules:e.passwordRules}},[a("el-input",{attrs:{type:"password",name:"restuserkey",clearable:""},model:{value:e.form.parameters["restuserkey"],callback:function(r){e.$set(e.form.parameters,"restuserkey",r)},expression:"form.parameters['restuserkey']"}})],1),a("el-form-item",{attrs:{label:"Namespace",prop:"parameters.secretNamespace",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" kube-system",clearable:""},model:{value:e.form.parameters["secretNamespace"],callback:function(r){e.$set(e.form.parameters,"secretNamespace",r)},expression:"form.parameters['secretNamespace']"}})],1),a("el-form-item",{attrs:{label:"secretName",prop:"parameters.secretName",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" heketi-secret",clearable:""},model:{value:e.form.parameters["secretName"],callback:function(r){e.$set(e.form.parameters,"secretName",r)},expression:"form.parameters['secretName']"}})],1),a("el-form-item",{attrs:{label:"clusterid",prop:"parameters.clusterid",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" 8a4ff57af81910e8324368a23afe3bdc",clearable:""},model:{value:e.form.parameters["clusterid"],callback:function(r){e.$set(e.form.parameters,"clusterid",r)},expression:"form.parameters['clusterid']"}})],1),a("el-form-item",{attrs:{label:"gidmin",prop:"parameters.gidMin",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" 40000",clearable:""},model:{value:e.form.parameters["gidMin"],callback:function(r){e.$set(e.form.parameters,"gidMin",r)},expression:"form.parameters['gidMin']"}})],1),a("el-form-item",{attrs:{label:"gidmax",prop:"parameters.gidMax",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" 50000",clearable:""},model:{value:e.form.parameters["gidMax"],callback:function(r){e.$set(e.form.parameters,"gidMax",r)},expression:"form.parameters['gidMax']"}})],1),a("el-form-item",{attrs:{label:"volumetype",prop:"parameters.volumetype",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:" replicate:3",clearable:""},model:{value:e.form.parameters["volumetype"],callback:function(r){e.$set(e.form.parameters,"volumetype",r)},expression:"form.parameters['volumetype']"}})],1)],1):e._e(),"oceanstor"===e.createType?a("div",[a("el-form-item",{attrs:{label:e.$t("commons.table.name"),required:""}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.provisioner,callback:function(r){e.$set(e.form,"provisioner",r)},expression:"form.provisioner"}})],1),a("el-form-item",{attrs:{label:"volumeType",prop:"parameters.volumeType",rules:e.requiredRules}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.form.parameters["volumeType"],callback:function(r){e.$set(e.form.parameters,"volumeType",r)},expression:"form.parameters['volumeType']"}},[a("el-option",{attrs:{value:"lun",label:"lun"}},[e._v("lun")]),a("el-option",{attrs:{value:"fs",label:"fs"}},[e._v("fs")])],1)],1),"fs"===e.form.parameters["volumeType"]?a("el-form-item",{attrs:{label:"authClient",prop:"parameters.authClient",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:"demo1,demo2"},model:{value:e.form.parameters["authClient"],callback:function(r){e.$set(e.form.parameters,"authClient",r)},expression:"form.parameters['authClient']"}})],1):e._e(),a("el-form-item",{attrs:{label:"allocType",prop:"parameters.allocType",rules:e.requiredRules}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.form.parameters["allocType"],callback:function(r){e.$set(e.form.parameters,"allocType",r)},expression:"form.parameters['allocType']"}},[a("el-option",{attrs:{value:"thin",label:"thin"}},[e._v("thin")]),a("el-option",{attrs:{value:"thick",label:"thick"}},[e._v("thick")])],1)],1),a("el-form-item",{attrs:{label:"cloneFrom",prop:"parameters.cloneFrom",rules:e.requiredRules}},[a("el-input",{attrs:{clearable:""},model:{value:e.form.parameters["cloneFrom"],callback:function(r){e.$set(e.form.parameters,"cloneFrom",r)},expression:"form.parameters['cloneFrom']"}}),a("div",[a("span",{staticClass:"input-help"},[e._v(e._s(e.$t("cluster.detail.storage.class.clone_form_help")))])])],1),a("el-form-item",{attrs:{label:"cloneSpeed",prop:"parameters.cloneSpeed",rules:e.requiredRules}},[a("el-input",{attrs:{placeholder:"1-4"},model:{value:e.form.parameters["cloneSpeed"],callback:function(r){e.$set(e.form.parameters,"cloneSpeed",r)},expression:"form.parameters['cloneSpeed']"}}),a("div",[a("span",{staticClass:"input-help"},[e._v(e._s(e.$t("cluster.detail.storage.class.clone_speed_help")))])])],1),a("el-form-item",{attrs:{label:"fsType",prop:"parameters.fsType",rules:e.requiredRules}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.form.parameters["fsType"],callback:function(r){e.$set(e.form.parameters,"fsType",r)},expression:"form.parameters['fsType']"}},[a("el-option",{attrs:{value:"ext2",label:"ext2"}},[e._v("ext2")]),a("el-option",{attrs:{value:"ext3",label:"ext3"}},[e._v("ext3")]),a("el-option",{attrs:{value:"ext4",label:"ext4"}},[e._v("ext4")])],1),a("div",[a("span",{staticClass:"input-help"},[e._v(e._s(e.$t("commons.validate.common_name_help")))])])],1)],1):e._e(),a("el-form-item",[a("div",{staticStyle:{float:"right"}},[a("el-button",{on:{click:function(r){return e.onCancel()}}},[e._v(e._s(e.$t("commons.button.cancel")))]),a("el-button",{attrs:{type:"primary",disabled:!(e.createType&&e.form.metadata.name)||e.submitLoading},on:{click:e.onSubmit}},[e._v(e._s(e.$t("commons.button.submit")))])],1)])],1)],1)])],1)],1)},s=[],l=(a("f5bd"),a("be17")),o=a("2429"),i=a("0792"),m={name:"ClusterStorageClassCreate",components:{LayoutContent:l["a"]},data:function(){return{submitLoading:!1,provisioners:[],createType:"",createName:"",provisioner:{},form:{apiVersion:"storage.k8s.io/v1",kind:"StorageClass",metadata:{name:""},provisioner:"",parameters:{storagePolicyType:""}},nameRules:[i["a"].CommonNameRule],requiredRules:[i["a"].RequiredRule],passwordRules:[i["a"].RequiredRule]}},methods:{getProvisioner:function(){var e=this;Object(o["j"])(this.clusterName).then((function(r){e.provisioners=r,e.provisioners.push({name:"kubernetes.io/no-provisioner",type:"local-storage",parameters:{},status:"Running"}),e.dialogClassVisible=!0}))},onSubmit:function(){var e=this;this.$refs["form"].validate((function(r){if(!r)return!1;if(e.submitLoading=!0,"glusterfs"===e.provisioner.type){var a=e.newV1Secrets();Object(o["c"])(e.clusterName,e.form.parameters["secretNamespace"],a).then((function(){e.form.parameters["restuserkey"]&&delete e.form.parameters["restuserkey"],e.addStorageClass()})).catch((function(){e.form.parameters["restuserkey"]&&delete e.form.parameters["restuserkey"],e.addStorageClass()}))}else e.addStorageClass()}))},addStorageClass:function(){var e=this;this.form.parameters["storagePolicyType"]&&delete this.form.parameters["storagePolicyType"],Object(o["d"])(this.clusterName,this.form).then((function(){e.$message({type:"success",message:e.$t("commons.msg.save_success")}),e.submitLoading=!1,e.$router.push({name:"ClusterStorage"})})).catch((function(){e.submitLoading=!1}))},onCancel:function(){this.$router.push({name:"ClusterStorage"})},changeClassType:function(){switch(this.createType=this.provisioner.type,this.form.provisioner=this.provisioner.name,this.createType){case"rook-ceph":this.form.parameters={clusterID:"rook-ceph",pool:"replicapool",imageFormat:"2",imageFeatures:"layering","csi.storage.k8s.io/provisioner-secret-name":"rook-csi-rbd-provisioner","csi.storage.k8s.io/provisioner-secret-namespace":"rook-ceph","csi.storage.k8s.io/controller-expand-secret-name":"rook-csi-rbd-provisioner","csi.storage.k8s.io/controller-expand-secret-namespace":"rook-ceph","csi.storage.k8s.io/node-stage-secret-name":"rook-csi-rbd-node","csi.storage.k8s.io/node-stage-secret-namespace":"rook-ceph","csi.storage.k8s.io/fstype":"ext4"};break;case"vsphere":this.form.parameters={datastore:this.provisioner.vars["datastore"],storagePolicyName:"vSAN Default Storage Policy",storagePolicyType:"BuiltIn"};break;case"glusterfs":this.form.parameters={secretNamespace:"kube-system",restauthenabled:"true",gidMin:"40000",gidMax:"50000",volumetype:"replicate:3"};break;case"cinder":this.form={allowVolumeExpansion:!0};break}},newV1Secrets:function(){return{apiVersion:"v1",kind:"Secret",metadata:{name:this.form.parameters["secretName"],namespace:this.form.parameters["secretNamespace"]},stringData:{key:this.form.parameters["restuserkey"]},type:"kubernetes.io/glusterfs"}}},created:function(){this.clusterName=this.$route.params.name,this.getProvisioner()}},n=m,c=a("5d22"),p=Object(c["a"])(n,t,s,!1,null,"67b82c2c",null);r["default"]=p.exports},2429:function(e,r,a){"use strict";a.d(r,"j",(function(){return u})),a.d(r,"b",(function(){return f})),a.d(r,"l",(function(){return d})),a.d(r,"f",(function(){return b})),a.d(r,"a",(function(){return v})),a.d(r,"i",(function(){return g})),a.d(r,"k",(function(){return y})),a.d(r,"d",(function(){return h})),a.d(r,"h",(function(){return k})),a.d(r,"e",(function(){return _})),a.d(r,"c",(function(){return $})),a.d(r,"g",(function(){return x}));a("2769"),a("0756");var t=a("ff66"),s="/proxy/kubernetes/{cluster_name}/{resource_url}",l=10,o="api/v1/persistentvolumes",i="apis/storage.k8s.io/v1/storageclasses",m="api/v1/persistentvolumes/{name}",n="apis/storage.k8s.io/v1/storageclasses/{name}",c="/api/v1/clusters/provisioner/{cluster_name}",p="api/v1/namespaces/{namespace}/secrets";function u(e){return Object(t["c"])(c.replace("{cluster_name}",e))}function f(e,r){return Object(t["e"])(c.replace("{cluster_name}",e),r)}function d(e,r){var a="/api/v1/clusters/provisioner/sync/{cluster_name}",s=a.replace("{cluster_name}",e);return Object(t["e"])(s,r)}function b(e,r){var a="/api/v1/clusters/provisioner/delete/{cluster_name}",s=a.replace("{cluster_name}",e);return Object(t["e"])(s,r)}function v(e,r){var a=s.replace("{cluster_name}",e).replace("{resource_url}",o);return Object(t["e"])(a,r)}function g(e,r){var a=s.replace("{cluster_name}",e).replace("{resource_url}",o);return a+="?limit="+l,void 0!==r&&null!==r&&(a+="&continue="+r),Object(t["c"])(a)}function y(e,r,a){var o=s.replace("{cluster_name}",e).replace("{resource_url}",i);return a||(o+="?limit="+l),void 0!==r&&null!==r&&(o+="&continue="+r),Object(t["c"])(o)}function h(e,r){var a=s.replace("{cluster_name}",e).replace("{resource_url}",i);return Object(t["e"])(a,r)}function k(e,r){var a=s.replace("{cluster_name}",e).replace("{resource_url}",n).replace("{name}",r);return Object(t["b"])(a)}function _(e,r){var a=s.replace("{cluster_name}",e).replace("{resource_url}",m).replace("{name}",r);return Object(t["b"])(a)}function $(e,r,a){var l=s.replace("{cluster_name}",e).replace("{resource_url}",p.replace("{namespace}",r));return Object(t["e"])(l,a)}function x(e,r,a){var l=s.replace("{cluster_name}",e).replace("{resource_url}",p.replace("{namespace}",r)+"/"+a);return Object(t["b"])(l)}}}]);
//# sourceMappingURL=chunk-7dfbae8a.71e58f39.js.map