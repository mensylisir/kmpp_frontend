(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d53a7bb"],{"30d5":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("79fd"),n("45af"),n("b1fa"),n("1ec5"),n("2e6f"),n("af21");var r=n("ec81");function a(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=Object(r["a"])(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var a=0,c=function(){};return{s:c,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){s=!0,o=t},f:function(){try{i||null==n["return"]||n["return"]()}finally{if(s)throw o}}}}},"396f":function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return o}));var r=n("ff66"),a="/api/v1/manifests";function c(){return Object(r["c"])("".concat(a,"/group"))}function o(){return Object(r["c"])("".concat(a,"/active"))}},"43dd":function(t,e,n){t.exports={theme:"#5354bb"}},"7ea2":function(t,e,n){"use strict";n.d(e,"e",(function(){return i})),n.d(e,"f",(function(){return s})),n.d(e,"a",(function(){return u})),n.d(e,"p",(function(){return l})),n.d(e,"c",(function(){return d})),n.d(e,"k",(function(){return f})),n.d(e,"b",(function(){return h})),n.d(e,"d",(function(){return p})),n.d(e,"l",(function(){return b})),n.d(e,"m",(function(){return m})),n.d(e,"q",(function(){return v})),n.d(e,"h",(function(){return g})),n.d(e,"g",(function(){return _})),n.d(e,"i",(function(){return y})),n.d(e,"n",(function(){return w})),n.d(e,"o",(function(){return k})),n.d(e,"j",(function(){return V}));n("a5c9"),n("2769"),n("0756");var r=n("ff66"),a="/api/v1/clusters",c="/api/v1/clusters/logger/{cluster_name}",o="/api/v1/clusters/provisioner/log/{cluster_name}/{log_id}";function i(t){return Object(r["c"])("".concat(a,"/").concat(t))}function s(t){return Object(r["c"])("".concat(a,"/name/").concat(t))}function u(t){return Object(r["c"])("".concat(a,"/existence/").concat(t))}function l(t,e,n){return Object(r["e"])("".concat(a,"/search?pageNum=").concat(t,"&pageSize=").concat(e),n)}function d(t){return Object(r["e"])("".concat(a),t)}function f(t){return Object(r["c"])("".concat(a,"/health/").concat(t))}function h(t){return Object(r["e"])("".concat(a,"/recover/").concat(t),{})}function p(t,e){return Object(r["b"])("".concat(a,"/").concat(t,"?force=").concat(e))}function b(t){return Object(r["e"])("".concat(a,"/import/"),t)}function m(t){return Object(r["e"])("".concat(a,"/init/").concat(t,"/"),{})}function v(t,e){var n={clusterName:t,version:e};return Object(r["e"])("".concat(a,"/upgrade/"),n)}function g(t){return Object(r["c"])("".concat(a,"/status/").concat(t))}function _(t){return Object(r["c"])(c.replace("{cluster_name}",t))}function y(t,e){return Object(r["c"])(o.replace("{cluster_name}",t).replace("{log_id}",e))}function w(t){window.open("/ui/#/logger?clusterName=".concat(t),"_blank","height=865, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no")}function k(t,e){window.open("/ui/#/logger?clusterName=".concat(t,"&logId=").concat(e),"_blank","height=865, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no")}function V(t){return Object(r["c"])("".concat(a,"/secret/").concat(t))}},8639:function(t,e,n){"use strict";var r=n("6c87"),a=n("7cd8"),c=n("9f69"),o=n("e08f"),i=n("7f45"),s=n("952c"),u=n("a4fc"),l=n("1392"),d=n("eb5b"),f=n("4cee"),h=n("d50e"),p=f.UNSUPPORTED_Y,b=[].push,m=Math.min,v=4294967295,g=!h((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));r("split",(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(o(this)),c=void 0===n?v:n>>>0;if(0===c)return[];if(void 0===t)return[r];if(!a(t))return e.call(r,t,c);var i,s,u,l=[],f=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,p=new RegExp(t.source,f+"g");while(i=d.call(p,r)){if(s=p.lastIndex,s>h&&(l.push(r.slice(h,i.index)),i.length>1&&i.index<r.length&&b.apply(l,i.slice(1)),u=i[0].length,h=s,l.length>=c))break;p.lastIndex===i.index&&p.lastIndex++}return h===r.length?!u&&p.test("")||l.push(""):l.push(r.slice(h)),l.length>c?l.slice(0,c):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var a=o(this),c=void 0==e?void 0:e[t];return void 0!==c?c.call(e,a,n):r.call(String(a),e,n)},function(t,a){var o=n(r,this,t,a,r!==e);if(o.done)return o.value;var d=c(this),f=String(t),h=i(d,RegExp),b=d.unicode,g=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(p?"g":"y"),_=new h(p?"^(?:"+d.source+")":d,g),y=void 0===a?v:a>>>0;if(0===y)return[];if(0===f.length)return null===l(_,f)?[f]:[];var w=0,k=0,V=[];while(k<f.length){_.lastIndex=p?0:k;var j,S=l(_,p?f.slice(k):f);if(null===S||(j=m(u(_.lastIndex+(p?k:0)),f.length))===w)k=s(f,k,b);else{if(V.push(f.slice(w,k)),V.length===y)return V;for(var O=1;O<=S.length-1;O++)if(V.push(S[O]),V.length===y)return V;k=w=j}}return V.push(f.slice(w)),V}]}),!g,p)},8767:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("layout-content",{attrs:{header:t.$t("commons.button.upgrade"),"back-to":{name:"ClusterList"}}},[n("el-row",[n("el-col",{attrs:{span:4}},[n("br")]),n("el-col",{attrs:{span:10}},[n("div",{staticClass:"grid-content bg-purple-light"},[n("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"120px"}},[n("el-form-item",{attrs:{label:t.$t("cluster.version"),prop:"version"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{clearable:""},on:{change:t.changeUpgradeVersions},model:{value:t.form.version,callback:function(e){t.$set(t.form,"version",e)},expression:"form.version"}},t._l(t.upgradeVersions,(function(e){return n("el-option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1),0===t.upgradeVersions.length?n("div",[n("span",{staticClass:"input-help"},[t._v(t._s(t.$t("cluster.upgrade.upgrade_help")))])]):t._e()],1),n("el-form-item",[0!==t.newManifest.coreVars.length&&0!==t.oldManifest.coreVars?n("div",[n("table",{staticClass:"myTable",staticStyle:{width:"100%"}},[n("tr",[n("td",{staticStyle:{width:"40%"}},[t._v(t._s(t.$t("commons.table.name")))]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.$t("cluster.upgrade.current_version")))]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.$t("cluster.upgrade.upgrade_version")))])]),n("tr",[n("td",{staticStyle:{width:"40%"}},[t._v("Kubernetes")]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("kubernetes",t.oldManifest.coreVars)))]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("kubernetes",t.newManifest.coreVars)))])]),t.getVersion("etcd",t.oldManifest.coreVars)!==t.getVersion("etcd",t.newManifest.coreVars)?n("tr",[n("td",{staticStyle:{width:"40%"}},[t._v("ETCD")]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("etcd",t.oldManifest.coreVars)))]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("etcd",t.newManifest.coreVars)))])]):t._e(),"docker"==t.currentCluster.spec.runtimeType&&t.getVersion("docker",t.oldManifest.coreVars)!==t.getVersion("docker",t.newManifest.coreVars)?n("tr",[n("td",{staticStyle:{width:"40%"}},[t._v("Docker")]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("docker",t.oldManifest.coreVars)))]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("docker",t.newManifest.coreVars)))])]):t._e(),"containerd"==t.currentCluster.spec.runtimeType&&t.getVersion("containerd",t.oldManifest.coreVars)!==t.getVersion("containerd",t.newManifest.coreVars)?n("tr",[n("td",{staticStyle:{width:"40%"}},[t._v("Containerd")]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("containerd",t.oldManifest.coreVars)))]),n("td",{staticStyle:{width:"30%"}},[t._v(t._s(t.getVersion("containerd",t.newManifest.coreVars)))])]):t._e()])]):t._e()]),n("el-form-item",{staticStyle:{float:"right"}},[n("el-button",{on:{click:function(e){return t.onCancel()}}},[t._v(t._s(t.$t("commons.button.cancel")))]),n("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.loadding,expression:"loadding"}],attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.$t("commons.button.ok")))])],1)],1)],1)])],1)],1)},a=[],c=n("30d5"),o=(n("f5bd"),n("2769"),n("8639"),n("e1d4"),n("6afd"),n("be17")),i=n("7ea2"),s=n("396f"),u=n("0792"),l={name:"ClusterUpgrade",props:["name"],components:{LayoutContent:o["a"]},data:function(){return{loadding:!1,form:{clusterName:"",version:""},rules:{version:[u["a"].RequiredRule]},oldManifest:{coreVars:[]},newManifest:{coreVars:[]},upgradeVersions:[],manifestList:[]}},methods:{onSubmit:function(){var t=this;this.$refs["form"].validate((function(e){e&&(t.loadding=!0,Object(i["q"])(t.form.clusterName,t.form.version).then((function(){t.loadding=!1,t.$message({type:"success",message:t.$t("commons.msg.upgrade_start_success")}),t.$router.push({name:"ClusterList"})})).catch((function(){t.loadding=!1})))}))},loadInfo:function(t){var e=this;Object(i["e"])(t).then((function(t){e.currentCluster=t,e.form.clusterName=t.name;var n=t.spec.version,r=n.split("."),a=r[0],o=r[1],i=r[2].split("-ko"),u=Number(i[0]),l=Number(i[1]);e.upgradeVersions=[],Object(s["b"])().then((function(t){var n,r=Object(c["a"])(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;i.clusterManifests.forEach((function(t){e.manifestList.push(t)}))}}catch(_){r.e(_)}finally{r.f()}var s,d=Object(c["a"])(e.manifestList);try{for(d.s();!(s=d.n()).done;){var f=s.value;if(f.isActive){var h=f.name.split("-ko"),p=h[0].split("."),b=Number(h[1]),m=p[0],v=p[1],g=Number(p[2]);a===m&&o===v&&(g>u&&e.upgradeVersions.push(f.name),g===u&&l<b&&e.upgradeVersions.push(f.name))}}}catch(_){d.e(_)}finally{d.f()}}))}))},changeUpgradeVersions:function(){var t,e=Object(c["a"])(this.manifestList);try{for(e.s();!(t=e.n()).done;){var n=t.value;-1!==n.name.indexOf(this.currentCluster.spec.version)&&(this.oldManifest=n),n.name===this.form.version&&(this.newManifest=n)}}catch(r){e.e(r)}finally{e.f()}},getVersion:function(t,e){var n,r=Object(c["a"])(e);try{for(r.s();!(n=r.n()).done;){var a=n.value;if(a.name===t)return a.version}}catch(o){r.e(o)}finally{r.f()}},onCancel:function(){this.$router.push({name:"ClusterList"})}},created:function(){this.loadInfo(this.$route.params.name)}},d=l,f=n("5d22"),h=Object(f["a"])(d,r,a,!1,null,"9d2e1136",null);e["default"]=h.exports},a026:function(t,e,n){"use strict";n("f5c4")},be17:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-container"},[t.$slots.description||t.description?n("div",{staticClass:"content-container__description"},[n("el-alert",{attrs:{title:t.description,type:"info"}}),n("br")],1):t._e(),t.$slots.header||t.header?n("div",{staticClass:"content-container__header"},[t._t("header",(function(){return[t.showBack?n("back-button",{attrs:{path:t.backPath,name:t.backName,to:t.backTo}}):t._e(),t._v(" "+t._s(t.header)+" ")]}))],2):t._e(),t.$slots.toolbar?n("div",{staticClass:"content-container__toolbar"},[t._t("toolbar")],2):t._e(),t._t("default")],2)},a=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-icon",{staticClass:"back-button",attrs:{name:"back"},nativeOn:{click:function(e){return t.jump.apply(null,arguments)}}})},o=[],i=(n("f5bd"),{name:"BackButton",props:{path:String,name:String,to:Object},methods:{jump:function(){var t=this.path,e=this.name,n=this.to;t&&this.$router.push(t),e&&this.$router.push(e),n&&this.$router.push(n)}}}),s=i,u=(n("eb9f"),n("5d22")),l=Object(u["a"])(s,c,o,!1,null,null,null),d=l.exports,f={name:"LayoutContent",components:{BackButton:d},props:{header:String,description:String,backPath:String,backName:String,backTo:Object},computed:{showBack:function(t){var e=t.backPath,n=t.backName,r=t.backTo;return e||n||r}}},h=f,p=(n("a026"),Object(u["a"])(h,r,a,!1,null,null,null));e["a"]=p.exports},eb9f:function(t,e,n){"use strict";n("43dd")},f5c4:function(t,e,n){t.exports={theme:"#5354bb"}}}]);
//# sourceMappingURL=chunk-3d53a7bb.8ecff8a3.js.map