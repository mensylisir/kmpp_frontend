(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bd5f80be"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"1a55":function(t,e,n){"use strict";n("648b")},"648b":function(t,e,n){t.exports={theme:"#5354bb"}},6638:function(t,e,n){"use strict";n("b147")},"841c":function(t,e,n){"use strict";var i=n("d784"),o=n("825a"),a=n("1d80"),s=n("129f"),c=n("577e"),r=n("14c3");i("search",(function(t,e,n){return[function(e){var n=a(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,n):new RegExp(e)[t](c(n))},function(t){var i=o(this),a=c(t),l=n(e,i,a);if(l.done)return l.value;var u=i.lastIndex;s(u,0)||(i.lastIndex=0);var f=r(i,a);return s(i.lastIndex,u)||(i.lastIndex=u),null===f?-1:f.index}]}))},"845c":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("layout-content",{attrs:{header:"存储"}},[n("complex-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data,"local-key":"host_columns","pagination-config":t.paginationConfig,selects:t.hostSelections,"search-config":t.searchConfig},on:{search:t.search,"update:selects":function(e){t.hostSelections=e}},scopedSlots:t._u([{key:"header",fn:function(){return[n("div",[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["ADMIN"],expression:"['ADMIN']"}],attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(e){return t.create()}}},[t._v(t._s(t.$t("commons.button.create")))]),n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["ADMIN"],expression:"['ADMIN']"}],attrs:{disabled:t.hostSelections.length<1,size:"small"},on:{click:function(e){return t.onDelete()}}},[t._v(" "+t._s(t.$t("commons.button.delete"))+" ")])],1)]},proxy:!0}])},[n("el-table-column",{attrs:{type:"selection",fix:""}}),n("el-table-column",{attrs:{label:t.$t("commons.table.name"),"show-overflow-tooltip":"","min-width":"120",fix:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("span",[t._v(t._s(i.name))])]}}])}),n("el-table-column",{attrs:{label:t.$t("commons.table.type"),"min-width":"100",prop:"type",fix:""}}),n("el-table-column",{attrs:{label:"大小（MB）","min-width":"100px",prop:"size"}}),n("el-table-column",{attrs:{label:t.$t("commons.table.status"),"min-width":"100",prop:"status",fix:""},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return["Initializing"===i.status?n("div",[n("i",{staticClass:"el-icon-loading"}),t._v("      "),n("el-link",{attrs:{type:"info"},on:{click:function(e){return t.openXterm(i)}}},[t._v(" "+t._s(t.$t("commons.status.initializing")))])],1):t._e(),"Terminating"===i.status?n("div",[n("i",{staticClass:"el-icon-loading"}),t._v("      "),n("el-link",{attrs:{type:"info"},on:{click:function(e){return t.openXterm(i)}}},[t._v(" "+t._s(t.$t("commons.status.terminating")))])],1):t._e(),"Failed"===i.status?n("div",[n("span",{staticClass:"iconfont iconerror",staticStyle:{color:"#fa4147"}}),t._v("       "),n("el-link",{attrs:{type:"info"},on:{click:function(e){return t.getErrorInfo(i)}}},[t._v(t._s(t.$t("commons.status.failed")))])],1):t._e(),"Running"==i.status?n("div",[n("span",{staticClass:"iconfont iconduihao",staticStyle:{color:"#32b350"}}),t._v(" "+t._s(t.$t("commons.status.running"))+" ")]):t._e(),"NotReady"==i.status?n("div",[n("span",{staticClass:"iconfont iconerror",staticStyle:{color:"#fa4147"}}),t._v(" "+t._s(t.$t("commons.status.not_ready"))+" ")]):t._e(),"Synchronizing"===i.status?n("div",[n("i",{staticClass:"el-icon-loading"}),t._v("      "),n("span",[t._v(t._s(t.$t("commons.status.synchronizing")))])]):t._e(),"Creating"===i.status?n("div",[n("i",{staticClass:"el-icon-loading"}),t._v("      "),n("span",[t._v(t._s(t.$t("commons.status.creating")))])]):t._e(),"Waiting"===i.status?n("div",[n("i",{staticClass:"el-icon-loading"}),t._v("      "),n("span",[t._v(t._s(t.$t("commons.status.waiting")))])]):t._e()]}}])}),n("el-table-column",{attrs:{label:"创建时间",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v(" "+t._s(t._f("datetimeFormat")(n.createdAt))+" ")]}}])}),t.isAdmin?n("fu-table-operations",{attrs:{fixed:"right",buttons:t.buttons,label:t.$t("commons.table.action"),fix:""}}):t._e()],1),n("el-dialog",{attrs:{title:t.$t("commons.button.sync"),width:"30%",visible:t.dialogSyncVisible},on:{"update:visible":function(e){t.dialogSyncVisible=e}}},[n("span",[t._v(t._s(t.$t("host.ensure_host_sync")))]),t._l(t.hostSelections,(function(e){return n("ul",{key:e.name,staticStyle:{"margin-left":"5%"}},[n("li",[t._v(t._s(e.name)+" ("+t._s(e.ip)+")")])])})),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogSyncVisible=!1}}},[t._v(t._s(t.$t("commons.button.cancel")))]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitSync()}}},[t._v(t._s(t.$t("commons.button.ok")))])],1)],2),n("el-dialog",{attrs:{title:t.$t("host.err_title"),width:"30%",visible:t.dialogErrorVisible},on:{"update:visible":function(e){t.dialogErrorVisible=e}}},[n("span",[t._v(t._s(t._f("errorFormat")(t.errMsg)))]),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogErrorVisible=!1}}},[t._v(t._s(t.$t("commons.button.cancel")))])],1)]),n("el-dialog",{staticClass:"import",attrs:{title:t.$t("commons.button.batch_import"),width:"66.7%",visible:t.dialogImportVisible},on:{"update:visible":function(e){t.dialogImportVisible=e}}},[n("el-form",[n("div",{staticClass:"item"},[n("div",{staticClass:"title"},[t._v("1. 下载导入模板")]),n("div",{staticClass:"content"},[t._v("根据提示信息完成表格内容")]),n("el-button",{attrs:{icon:"el-icon-download"},on:{click:function(e){return t.download()}}},[t._v("下载空白模板")])],1),n("el-form-item",{staticClass:"item"},[n("div",{staticClass:"title"},[t._v("2. 上传完善后的表格")]),n("el-row",{attrs:{type:"flex",justify:"center"}},[n("el-upload",{ref:"my-upload",staticClass:"upload-demo",attrs:{"on-change":t.onUploadChange,action:"","auto-upload":!1,drag:""}},[n("i",{staticClass:"el-icon-upload"}),n("div",{staticClass:"el-upload__text"},[n("div",{staticClass:"subtitle"},[t._v("点击或将文件拖拽到这里上传")]),n("div",{staticClass:"tip"},[t._v(" "+t._s(t.$t("cluster.detail.backup.local_recover_tips"))+" ")])]),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icontishi11"}})])])])],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogImportVisible=!1}}},[t._v(t._s(t.$t("commons.button.cancel")))]),n("el-button",{attrs:{type:"primary",disabled:t.isUploadDisable},on:{click:function(e){return t.onUploadFile()}}},[t._v(t._s(t.$t("commons.button.ok")))])],1)],1)],1)},o=[],a=n("2909"),s=n("b85c"),c=(n("b0c0"),n("159b"),n("ac1f"),n("841c"),n("d3b7"),n("3ca3"),n("ddb0"),n("5319"),n("be17")),r=n("f253"),l=n("86ca"),u=n("c43c"),f=n("b21e"),d={name:"HostList",components:{ComplexTable:l["a"],LayoutContent:c["a"]},data:function(){var t=this;return{buttons:[{label:this.$t("commons.button.delete"),icon:"el-icon-delete",click:function(e){t.onDelete(e.name)},disabled:function(t){return"Running"!==t.status&&"Failed"!==t.status}}],paginationConfig:{currentPage:1,pageSize:10,total:0},data:[],dialogErrorVisible:!1,dialogDetailVisible:!1,errMsg:"",currentHost:{},hostSelections:[],syncHostList:[],dialogSyncVisible:!1,dialogImportVisible:!1,isUploadDisable:!0,file:{},searchConfig:{quickPlaceholder:this.$t("commons.search.quickSearch"),components:[{field:"name",label:this.$t("commons.table.name"),component:"FuComplexInput",defaultOperator:"eq"},{field:"ip",label:this.$t("host.ip"),component:"FuComplexInput",defaultOperator:"eq"},{field:"created_at",label:this.$t("commons.table.create_time"),component:"FuComplexDateTime",valueFormat:"yyyy-MM-dd"}]},loading:!1,isAdmin:Object(f["a"])("ADMIN"),timer:{},cluster:""}},methods:{create:function(){var t=this;Object(u["a"])().then((function(){t.$router.push({name:"storageCreate"})}))},sync:function(){this.dialogSyncVisible=!0},submitSync:function(){var t=this;this.syncHostList=[],this.hostSelections.forEach((function(e){t.syncHostList.push({hostName:e.name,hostStatus:e.status})})),Object(r["g"])(this.syncHostList).then((function(){t.search(),t.$message({type:"success",message:t.$t("host.start_host_sync")}),t.dialogSyncVisible=!1,t.hostSelections=[]})).catch((function(){t.hostSelections=[]}))},onUploadChange:function(t){this.isUploadDisable=!1,this.file=t},onImport:function(){var t=this;Object(u["a"])().then((function(){t.dialogImportVisible=!0,t.isUploadDisable=!0,t.$refs["my-upload"]&&t.$refs["my-upload"].clearFiles()}))},download:function(){window.open("/api/v1/hosts/template")},getErrorInfo:function(t){this.dialogErrorVisible=!0,this.errMsg=t.message},getDetailInfo:function(t){this.dialogDetailVisible=!0,this.currentHost=t},onUploadFile:function(){var t=this,e=this.file.name.lastIndexOf(".");if(-1===e)return this.$message({type:"error",message:this.$t("host.not_support_format")}),void(this.dialogImportVisible=!1);var n=this.file.name.substring(e+1,this.file.name.length).toLowerCase();if("xlsx"!==n)return this.$message({type:"error",message:this.$t("host.not_support_format")}),void(this.dialogImportVisible=!1);var i=new FormData;i.append("file",this.file.raw),Object(r["d"])(i).then((function(){t.$message({type:"success",message:t.$t("commons.msg.import_success")}),t.search(),t.dialogImportVisible=!1}),(function(){t.search(),t.dialogImportVisible=!1}))},onDelete:function(t){var e=this;this.$confirm(this.$t("commons.confirm_message.delete"),this.$t("commons.message_box.prompt"),{confirmButtonText:this.$t("commons.button.confirm"),cancelButtonText:this.$t("commons.button.cancel"),type:"warning"}).then((function(){var n=[];if(t)n.push(Object(r["c"])(t));else{var i,o=Object(s["a"])(e.hostSelections);try{for(o.s();!(i=o.n()).done;){var a=i.value;n.push(Object(r["c"])(a.name))}}catch(c){o.e(c)}finally{o.f()}}Promise.all(n).then((function(){e.search(),e.$message({type:"success",message:e.$t("commons.msg.delete_success")}),e.hostSelections=[]})).catch((function(){e.search(),e.hostSelections=[]}))}))},onGrant:function(){this.$router.push({name:"ProjectAuthorizationList"})},search:function(t){var e=this;this.loading=!0;var n=this.paginationConfig,i=n.currentPage,o=n.pageSize;Object(r["f"])(i,o,t).then((function(t){e.loading=!1,e.data=Object(a["a"])(t.items),e.data.forEach((function(t){t.size=0,t.volumes.forEach((function(e){var n=e.size.replace(/[^a-zA-Z]/g,""),i=e.size.replace(/[^\d]/g,"");"TB"===n?t.size=t.size+1024*i*1024:"GB"===n?t.size=t.size+1024*i:"MB"===n&&(t.size=t.size+i)}))})),e.paginationConfig.total=t.total})).catch((function(){e.loading=!1}))},polling:function(){var t=this;this.timer=setInterval((function(){var e,n=!1,i=["Initializing","Terminating","Synchronizing","Waiting","Creating"],o=Object(s["a"])(t.data);try{for(o.s();!(e=o.n()).done;){var a=e.value;if(-1!==i.indexOf(a.status)){n=!0;break}}}catch(f){o.e(f)}finally{o.f()}if(n){var c=t.paginationConfig,l=c.currentPage,u=c.pageSize;Object(r["f"])(l,u).then((function(e){t.data=e.items,t.paginationConfig.total=e.total}))}}),1e4)}},mounted:function(){this.search(),this.polling()},beforeDestroy:function(){clearInterval(this.timer)}},m=d,p=(n("6638"),n("2877")),h=Object(p["a"])(m,i,o,!1,null,"884e659c",null);e["default"]=h.exports},"86ca":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"complex-table"},[t.$slots.header||t.header?n("div",{staticClass:"complex-table__header"},[t._t("header",(function(){return[t._v(t._s(t.header))]})),t.$slots.toolbar||t.searchConfig?n("div",{staticClass:"complex-table__toolbar"},[n("div",[t._t("toolbar")],2),n("fu-search-bar",t._b({on:{exec:t.search},scopedSlots:t._u([{key:"complex",fn:function(){return[t._t("complex")]},proxy:!0}],null,!0)},"fu-search-bar",t.searchConfig,!1),[t._t("buttons"),n("fu-table-column-select",{attrs:{columns:t.columns}})],2)],1):t._e()],2):t._e(),n("div",{staticClass:"complex-table__body"},[n("fu-table",t._g(t._b({attrs:{columns:t.columns,"local-key":t.localKey},on:{"selection-change":t.handleSelectionChange}},"fu-table",t.$attrs,!1),t.$listeners),[t._t("default")],2)],1),t.$slots.pagination||t.paginationConfig?n("div",{staticClass:"complex-table__pagination"},[t._t("pagination",(function(){return[n("fu-table-pagination",t._b({attrs:{"current-page":t.paginationConfig.currentPage,"page-size":t.paginationConfig.pageSize},on:{"update:currentPage":function(e){return t.$set(t.paginationConfig,"currentPage",e)},"update:current-page":function(e){return t.$set(t.paginationConfig,"currentPage",e)},"update:pageSize":function(e){return t.$set(t.paginationConfig,"pageSize",e)},"update:page-size":function(e){return t.$set(t.paginationConfig,"pageSize",e)},change:t.search}},"fu-table-pagination",t.paginationConfig,!1))]}))],2):t._e()])},o=[],a={name:"ComplexTable",props:{columns:{type:Array,default:function(){return[]}},localKey:String,header:String,searchConfig:Object,paginationConfig:Object,selects:Array},data:function(){return{condition:{}}},methods:{search:function(t,e){t&&(this.condition=t),this.$emit("search",this.condition,e)},handleSelectionChange:function(t){this.$emit("update:selects",t)}}},s=a,c=(n("1a55"),n("2877")),r=Object(c["a"])(s,i,o,!1,null,null,null);e["a"]=r.exports},"992c":function(t,e,n){t.exports={theme:"#5354bb"}},a026:function(t,e,n){"use strict";n("992c")},b147:function(t,e,n){},b21e:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("caad"),n("2532");var i=n("4360"),o=function(t){var e=i["a"].getters&&i["a"].getters.roles;return e.some((function(e){return t.includes(e)}))}},b85c:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0");var i=n("06c5");function o(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=Object(i["a"])(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,r=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){r=!0,s=t},f:function(){try{c||null==n["return"]||n["return"]()}finally{if(r)throw s}}}}},be17:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-container"},[t.$slots.description||t.description?n("div",{staticClass:"content-container__description"},[n("el-alert",{attrs:{title:t.description,type:"info"}}),n("br")],1):t._e(),t.$slots.header||t.header?n("div",{staticClass:"content-container__header"},[t._t("header",(function(){return[t.showBack?n("back-button",{attrs:{path:t.backPath,name:t.backName,to:t.backTo}}):t._e(),t._v(" "+t._s(t.header)+" ")]}))],2):t._e(),t.$slots.toolbar?n("div",{staticClass:"content-container__toolbar"},[t._t("toolbar")],2):t._e(),t._t("default")],2)},o=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-icon",{staticClass:"back-button",attrs:{name:"back"},nativeOn:{click:function(e){return t.jump.apply(null,arguments)}}})},s=[],c=(n("b0c0"),{name:"BackButton",props:{path:String,name:String,to:Object},methods:{jump:function(){var t=this.path,e=this.name,n=this.to;t&&this.$router.push(t),e&&this.$router.push(e),n&&this.$router.push(n)}}}),r=c,l=(n("eb9f"),n("2877")),u=Object(l["a"])(r,a,s,!1,null,null,null),f=u.exports,d={name:"LayoutContent",components:{BackButton:f},props:{header:String,description:String,backPath:String,backName:String,backTo:Object},computed:{showBack:function(t){var e=t.backPath,n=t.backName,i=t.backTo;return e||n||i}}},m=d,p=(n("a026"),Object(l["a"])(m,i,o,!1,null,null,null));e["a"]=p.exports},c43c:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("99af");var i=n("ff66"),o="/api/v1/settings";function a(){return Object(i["c"])("".concat(o,"/registry"))}},eb9f:function(t,e,n){"use strict";n("f574")},f253:function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return r})),n.d(e,"e",(function(){return l})),n.d(e,"f",(function(){return u})),n.d(e,"g",(function(){return f})),n.d(e,"d",(function(){return d}));n("99af");var i=n("ff66"),o="/api/v1/hosts",a="/api/v1/volumes";function s(t){return Object(i["e"])(o,t)}function c(t){return Object(i["e"])(a,t)}function r(t){return Object(i["b"])("".concat(o,"/").concat(t))}function l(t,e,n){return Object(i["e"])("".concat(o,"/search?pageNum=").concat(t,"&pageSize=").concat(e),n)}function u(t,e,n){return Object(i["e"])("".concat(a,"/search?pageNum=").concat(t,"&pageSize=").concat(e),n)}function f(t){var e="".concat(o,"/sync/");return Object(i["e"])(e,t)}function d(t){var e="".concat(o,"/upload");return Object(i["e"])(e,t)}},f574:function(t,e,n){t.exports={theme:"#5354bb"}}}]);
//# sourceMappingURL=chunk-bd5f80be.f10ae01d.js.map