(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22b9a3"],{f058:function(e,r,o){"use strict";o.r(r);var s=function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("layout-content",{attrs:{header:e.$t("commons.button.create"),"back-to":{name:"UserList"}}},[o("el-row",[o("el-col",{attrs:{span:4}},[o("br")]),o("el-col",{attrs:{span:10}},[o("div",{staticClass:"grid-content bg-purple-light"},[o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"150px","label-position":"left"}},[o("el-form-item",{attrs:{label:e.$t("commons.table.name"),prop:"name",required:""}},[o("el-input",{model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}}),o("div",[o("span",{staticClass:"input-help"},[e._v(e._s(e.$t("commons.validate.name_help")))])])],1),o("el-form-item",{attrs:{label:e.$t("user.email"),prop:"email",required:""}},[o("el-input",{attrs:{type:"email"},model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),o("el-form-item",{attrs:{label:e.$t("user.password"),prop:"password",required:""}},[o("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),o("el-form-item",{attrs:{label:e.$t("user.confirm_password"),prop:"confirmPassword",required:""}},[o("el-input",{attrs:{type:"password"},model:{value:e.form.confirmPassword,callback:function(r){e.$set(e.form,"confirmPassword",r)},expression:"form.confirmPassword"}})],1),o("el-form-item",{attrs:{label:e.$t("user.role"),required:"",prop:"role"}},[o("el-radio-group",{model:{value:e.form.role,callback:function(r){e.$set(e.form,"role",r)},expression:"form.role"}},[o("el-radio",{attrs:{label:"admin"}},[e._v(e._s(e.$t("commons.role.admin")))]),o("el-radio",{attrs:{label:"user"}},[e._v(e._s(e.$t("commons.role.user")))])],1)],1),o("el-form-item",[o("div",{staticStyle:{float:"right"}},[o("el-button",{on:{click:function(r){return e.onCancel()}}},[e._v(e._s(e.$t("commons.button.cancel")))]),o("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.onSubmit("form")}}},[e._v(e._s(e.$t("commons.button.submit")))])],1)])],1)],1)]),o("el-col",{attrs:{span:4}},[o("br")])],1)],1)},t=[],a=(o("f5bd"),o("be17")),l=o("c24f"),n=o("0792"),m={name:"UserCreate",components:{LayoutContent:a["a"]},data:function(){return{form:{name:"",password:"",confirmPassword:"",role:"user"},rules:{name:[n["a"].NameRule,n["a"].RequiredRule],email:[n["a"].EmailRule,n["a"].RequiredRule],password:[n["a"].RequiredRule,n["a"].PasswordRule],confirmPassword:[n["a"].RequiredRule,n["a"].PasswordRule,{validator:this.checkPassword,trigger:"blur"}],role:[n["a"].RequiredRule]}}},methods:{onSubmit:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return!1;Object(l["a"])({name:r.form.name,password:r.form.password,email:r.form.email,role:r.form.role}).then((function(){r.$message({type:"success",message:r.$t("commons.msg.create_success")}),r.$router.push({name:"UserList"})}))}))},onCancel:function(){this.$router.push({name:"UserList"})},checkPassword:function(e,r,o){if(this.form.password!==this.form.confirmPassword)return o(new Error(this.$t("commons.personal.confirm_password1_info")));o()}}},i=m,u=o("5d22"),c=Object(u["a"])(i,s,t,!1,null,"a6f0992c",null);r["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d22b9a3.8ab05b3c.js.map