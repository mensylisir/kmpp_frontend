(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92826db8"],{"43dd":function(t,e,n){t.exports={theme:"#5354bb"}},5671:function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return i})),n.d(e,"d",(function(){return u}));var c=n("ff66"),r="/api/v1/clusters/tool";function a(t){return Object(c["c"])("".concat(r,"/").concat(t))}function o(t,e){return Object(c["e"])("".concat(r,"/enable/").concat(t),e)}function i(t,e){return Object(c["e"])("".concat(r,"/disable/").concat(t),e)}function u(t,e){return Object(c["e"])("".concat(r,"/upgrade/").concat(t),e)}},"78d4":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"7ea2":function(t,e,n){"use strict";n.d(e,"e",(function(){return i})),n.d(e,"f",(function(){return u})),n.d(e,"a",(function(){return s})),n.d(e,"p",(function(){return l})),n.d(e,"c",(function(){return d})),n.d(e,"k",(function(){return f})),n.d(e,"b",(function(){return m})),n.d(e,"d",(function(){return p})),n.d(e,"l",(function(){return h})),n.d(e,"m",(function(){return b})),n.d(e,"q",(function(){return g})),n.d(e,"h",(function(){return v})),n.d(e,"g",(function(){return _})),n.d(e,"i",(function(){return j})),n.d(e,"n",(function(){return O})),n.d(e,"o",(function(){return k})),n.d(e,"j",(function(){return x}));n("a5c9"),n("2769"),n("0756");var c=n("ff66"),r="/api/v1/clusters",a="/api/v1/clusters/logger/{cluster_name}",o="/api/v1/clusters/provisioner/log/{cluster_name}/{log_id}";function i(t){return Object(c["c"])("".concat(r,"/").concat(t))}function u(t){return Object(c["c"])("".concat(r,"/name/").concat(t))}function s(t){return Object(c["c"])("".concat(r,"/existence/").concat(t))}function l(t,e,n){return Object(c["e"])("".concat(r,"/search?pageNum=").concat(t,"&pageSize=").concat(e),n)}function d(t){return Object(c["e"])("".concat(r),t)}function f(t){return Object(c["c"])("".concat(r,"/health/").concat(t))}function m(t){return Object(c["e"])("".concat(r,"/recover/").concat(t),{})}function p(t,e){return Object(c["b"])("".concat(r,"/").concat(t,"?force=").concat(e))}function h(t){return Object(c["e"])("".concat(r,"/import/"),t)}function b(t){return Object(c["e"])("".concat(r,"/init/").concat(t,"/"),{})}function g(t,e){var n={clusterName:t,version:e};return Object(c["e"])("".concat(r,"/upgrade/"),n)}function v(t){return Object(c["c"])("".concat(r,"/status/").concat(t))}function _(t){return Object(c["c"])(a.replace("{cluster_name}",t))}function j(t,e){return Object(c["c"])(o.replace("{cluster_name}",t).replace("{log_id}",e))}function O(t){window.open("/ui/#/logger?clusterName=".concat(t),"_blank","height=865, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no")}function k(t,e){window.open("/ui/#/logger?clusterName=".concat(t,"&logId=").concat(e),"_blank","height=865, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no")}function x(t){return Object(c["c"])("".concat(r,"/secret/").concat(t))}},a026:function(t,e,n){"use strict";n("f5c4")},be17:function(t,e,n){"use strict";var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-container"},[t.$slots.description||t.description?n("div",{staticClass:"content-container__description"},[n("el-alert",{attrs:{title:t.description,type:"info"}}),n("br")],1):t._e(),t.$slots.header||t.header?n("div",{staticClass:"content-container__header"},[t._t("header",(function(){return[t.showBack?n("back-button",{attrs:{path:t.backPath,name:t.backName,to:t.backTo}}):t._e(),t._v(" "+t._s(t.header)+" ")]}))],2):t._e(),t.$slots.toolbar?n("div",{staticClass:"content-container__toolbar"},[t._t("toolbar")],2):t._e(),t._t("default")],2)},r=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-icon",{staticClass:"back-button",attrs:{name:"back"},nativeOn:{click:function(e){return t.jump.apply(null,arguments)}}})},o=[],i=(n("f5bd"),{name:"BackButton",props:{path:String,name:String,to:Object},methods:{jump:function(){var t=this.path,e=this.name,n=this.to;t&&this.$router.push(t),e&&this.$router.push(e),n&&this.$router.push(n)}}}),u=i,s=(n("eb9f"),n("5d22")),l=Object(s["a"])(u,a,o,!1,null,null,null),d=l.exports,f={name:"LayoutContent",components:{BackButton:d},props:{header:String,description:String,backPath:String,backName:String,backTo:Object},computed:{showBack:function(t){var e=t.backPath,n=t.backName,c=t.backTo;return e||n||c}}},m=f,p=(n("a026"),Object(s["a"])(m,c,r,!1,null,null,null));e["a"]=p.exports},e4fc:function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("layout-content",{attrs:{header:t.$t("cluster.cluster_detail"),"back-to":{name:"ClusterList"}}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[n("el-menu",{attrs:{router:"","default-active":t.$route.path,mode:"horizontal"},on:{select:t.search}},[n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/overview"}},[t._v(t._s(t.$t("cluster.detail.tag.overview")))]),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/node"}},[t._v(t._s(t.$t("cluster.detail.tag.node")))]),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/namespace"}},[t._v(t._s(t.$t("cluster.detail.tag.namespace")))]),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/storage"}},[t._v(t._s(t.$t("cluster.detail.tag.storage")))]),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/event"}},[t._v(t._s(t.$t("cluster.detail.tag.event")))]),t.isPrometheusOn?n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/monitor"}},[t._v(" "+t._s(t.$t("cluster.detail.tag.monitor"))+" ")]):t._e(),t.isLoggingOn?n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/logging"}},[t._v(t._s(t.$t("cluster.detail.tag.log"))+" ")]):t._e(),t.isLokiOn?n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/loki"}},[t._v(t._s(t.$t("cluster.detail.tag.log"))+" ")]):t._e(),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/tool"}},[t._v(t._s(t.$t("cluster.detail.tag.tool")))]),"amd64"===t.arch?n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/istio"}},[t._v("Istio")]):t._e(),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/backup"}},[t._v(t._s(t.$t("cluster.detail.tag.backup")))]),t.hasLicense?n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/f5"}},[t._v("F5")]):t._e(),n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/security"}},[t._v(" "+t._s(t.$t("cluster.detail.tag.security"))+" ")]),t.hasLicense?n("el-menu-item",{attrs:{index:"/clusters/detail/"+t.project+"/"+t.name+"/grade"}},[t._v(t._s(t.$t("cluster.detail.tag.grade"))+" ")]):t._e()],1),n("br"),n("div",[n("router-view")],1)],1)])},r=[],a=(n("f5bd"),n("6afd"),n("2769"),n("ecf1"),n("be17")),o=n("5671"),i=n("7ea2"),u={name:"ClusterDetail",props:["project","name"],components:{LayoutContent:a["a"]},data:function(){return{isLokiOn:null,isLoggingOn:null,isPrometheusOn:null,hasLicense:null,arch:null,loading:!1}},methods:{search:function(){var t=this;this.loading=!0,Object(i["e"])(this.$route.params.name).then((function(e){e.spec.architectures&&(t.arch=e.spec.architectures,t.loading=!1)})).catch((function(){t.loading=!1})),Object(o["c"])(this.$route.params.name).then((function(e){e.forEach((function(e){"logging"===e.name&&(t.isLoggingOn="Running"===e.status),"loki"===e.name&&(t.isLokiOn="Running"===e.status),"prometheus"===e.name&&(t.isPrometheusOn="Running"===e.status)}))}))}},mounted:function(){var t=this;this.$store.dispatch("license/getLicense").then((function(e){t.hasLicense="valid"===e.status})),this.search()}},s=u,l=n("5d22"),d=Object(l["a"])(s,c,r,!1,null,"76e47f6a",null);e["default"]=d.exports},eb9f:function(t,e,n){"use strict";n("43dd")},ecf1:function(t,e,n){"use strict";var c=n("6c87"),r=n("9f69"),a=n("e08f"),o=n("78d4"),i=n("1392");c("search",(function(t,e,n){return[function(e){var n=a(this),c=void 0==e?void 0:e[t];return void 0!==c?c.call(e,n):new RegExp(e)[t](String(n))},function(t){var c=n(e,this,t);if(c.done)return c.value;var a=r(this),u=String(t),s=a.lastIndex;o(s,0)||(a.lastIndex=0);var l=i(a,u);return o(a.lastIndex,s)||(a.lastIndex=s),null===l?-1:l.index}]}))},f5c4:function(t,e,n){t.exports={theme:"#5354bb"}}}]);
//# sourceMappingURL=chunk-92826db8.a52ac5a5.js.map