(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7aeed5b6"],{1130:function(e,s,t){var i=t("cdcb"),r=t("b074"),a=t("7aeb"),l=t("d362"),o=t("429f"),u=t("3d27").f,n=t("a5e4e").f,c=t("7cd8"),_=t("f91c"),g=t("4cee"),p=t("6c39"),m=t("d50e"),f=t("8801"),b=t("817b").enforce,y=t("d4b8"),d=t("9bc6"),v=t("3dc9"),w=t("2e4d"),C=d("match"),h=r.RegExp,x=h.prototype,$=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,S=/a/g,q=/a/g,k=new h(S)!==S,R=g.UNSUPPORTED_Y,O=i&&(!k||R||v||w||m((function(){return q[C]=!1,h(S)!=S||h(q)==q||"/a/i"!=h(S,"i")}))),N=function(e){for(var s,t=e.length,i=0,r="",a=!1;i<=t;i++)s=e.charAt(i),"\\"!==s?a||"."!==s?("["===s?a=!0:"]"===s&&(a=!1),r+=s):r+="[\\s\\S]":r+=s+e.charAt(++i);return r},E=function(e){for(var s,t=e.length,i=0,r="",a=[],l={},o=!1,u=!1,n=0,c="";i<=t;i++){if(s=e.charAt(i),"\\"===s)s+=e.charAt(++i);else if("]"===s)o=!1;else if(!o)switch(!0){case"["===s:o=!0;break;case"("===s:$.test(e.slice(i+1))&&(i+=2,u=!0),r+=s,n++;continue;case">"===s&&u:if(""===c||f(l,c))throw new SyntaxError("Invalid capture group name");l[c]=!0,a.push([c,n]),u=!1,c="";continue}u?c+=s:r+=s}return[r,a]};if(a("RegExp",O)){for(var L=function(e,s){var t,i,r,a,u,n,g=this instanceof L,p=c(e),m=void 0===s,f=[],y=e;if(!g&&p&&m&&e.constructor===L)return e;if((p||e instanceof L)&&(e=e.source,m&&(s="flags"in y?y.flags:_.call(y))),e=void 0===e?"":String(e),s=void 0===s?"":String(s),y=e,v&&"dotAll"in S&&(i=!!s&&s.indexOf("s")>-1,i&&(s=s.replace(/s/g,""))),t=s,R&&"sticky"in S&&(r=!!s&&s.indexOf("y")>-1,r&&(s=s.replace(/y/g,""))),w&&(a=E(e),e=a[0],f=a[1]),u=l(h(e,s),g?this:x,L),(i||r||f.length)&&(n=b(u),i&&(n.dotAll=!0,n.raw=L(N(e),t)),r&&(n.sticky=!0),f.length&&(n.groups=f)),e!==y)try{o(u,"source",""===y?"(?:)":y)}catch(d){}return u},D=function(e){e in L||u(L,e,{configurable:!0,get:function(){return h[e]},set:function(s){h[e]=s}})},j=n(h),A=0;j.length>A;)D(j[A++]);x.constructor=L,L.prototype=x,p(r,"RegExp",L)}y("RegExp")},"3d5f":function(e,s,t){"use strict";t.d(s,"b",(function(){return i})),t.d(s,"a",(function(){return r}));t("2769"),t("0756"),t("1130"),t("c5ce8");function i(e){for(var s in e)if(-1!==s.indexOf("_")){var t=s.replace(new RegExp("__","g"),"-").replace(new RegExp("_","g"),".");e[t]=e[s],delete e[s]}return e}function r(e){for(var s in e)if(-1!==s.indexOf("-")||-1!==s.indexOf(".")){var t=s.replace(new RegExp("-","g"),"__").replace(/\./g,"_");e[t]=e[s],delete e[s]}return e}},c5ce8:function(e,s,t){"use strict";var i=t("6c39"),r=t("9f69"),a=t("d50e"),l=t("f91c"),o="toString",u=RegExp.prototype,n=u[o],c=a((function(){return"/a/b"!=n.call({source:"a",flags:"b"})})),_=n.name!=o;(c||_)&&i(RegExp.prototype,o,(function(){var e=r(this),s=String(e.source),t=e.flags,i=String(void 0===t&&e instanceof RegExp&&!("flags"in u)?l.call(e):t);return"/"+s+"/"+i}),{unsafe:!0})},d4dc:function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("layout-content",[t("div",[t("el-collapse",{model:{value:e.activeNames,callback:function(s){e.activeNames=s},expression:"activeNames"}},[t("el-collapse-item",{attrs:{title:"Istio-Pilot",name:"1"}},[t("el-form",{ref:"pilotCfg",attrs:{model:e.pilotCfg,"label-width":"200px"}},[e.pilotCfg.cluster_istio.message?t("el-form-item",[t("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:e.pilotCfg.cluster_istio.message,placement:"right-end"}},[t("el-button",{staticStyle:{color:"red"},attrs:{icon:"el-icon-error",type:"text"}},[e._v(e._s(e.$t("cluster.detail.istio.err_title")))])],1)],1):e._e(),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.cpu_request"),prop:"vars.pilot_resources_requests_cpu",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.pilotCfg.vars["pilot_resources_requests_cpu"],callback:function(s){e.$set(e.pilotCfg.vars,"pilot_resources_requests_cpu",s)},expression:"pilotCfg.vars['pilot_resources_requests_cpu']"}})],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.memory_request"),prop:"vars.pilot_resources_requests_memory",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.pilotCfg.vars["pilot_resources_requests_memory"],callback:function(s){e.$set(e.pilotCfg.vars,"pilot_resources_requests_memory",s)},expression:"pilotCfg.vars['pilot_resources_requests_memory']"}})],1)],1),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.cpu_limit"),prop:"vars.pilot_resources_limits_cpu",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.pilotCfg.vars.pilot_resources_limits_cpu,callback:function(s){e.$set(e.pilotCfg.vars,"pilot_resources_limits_cpu",e._n(s))},expression:"pilotCfg.vars.pilot_resources_limits_cpu"}})],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.memory_limit"),prop:"vars.pilot_resources_limits_memory",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.pilotCfg.vars["pilot_resources_limits_memory"],callback:function(s){e.$set(e.pilotCfg.vars,"pilot_resources_limits_memory",s)},expression:"pilotCfg.vars['pilot_resources_limits_memory']"}})],1)],1),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.trace"),prop:"vars.pilot_traceSampling",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.pilotCfg.vars["pilot_traceSampling"],callback:function(s){e.$set(e.pilotCfg.vars,"pilot_traceSampling",s)},expression:"pilotCfg.vars['pilot_traceSampling']"}})],1)],1)],1)],1),t("el-collapse-item",{attrs:{title:"Istio-Ingress",name:"2"}},[t("el-switch",{model:{value:e.ingressCfg.enable,callback:function(s){e.$set(e.ingressCfg,"enable",s)},expression:"ingressCfg.enable"}}),e.ingressCfg.enable?t("div",[t("el-form",{ref:"ingressCfg",attrs:{model:e.ingressCfg,"label-width":"200px"}},[e.ingressCfg.cluster_istio.message?t("el-form-item",[t("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:e.ingressCfg.cluster_istio.message,placement:"right-end"}},[t("el-button",{staticStyle:{color:"red"},attrs:{icon:"el-icon-error",type:"text"}},[e._v(e._s(e.$t("cluster.detail.istio.err_title")))])],1)],1):e._e(),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.cpu_request"),prop:"vars.gateways_istio__ingressgateway_resources_requests_cpu",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.ingressCfg.vars["gateways_istio__ingressgateway_resources_requests_cpu"],callback:function(s){e.$set(e.ingressCfg.vars,"gateways_istio__ingressgateway_resources_requests_cpu",s)},expression:"ingressCfg.vars['gateways_istio__ingressgateway_resources_requests_cpu']"}})],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.memory_request"),prop:"vars.gateways_istio__ingressgateway_resources_requests_memory",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.ingressCfg.vars["gateways_istio__ingressgateway_resources_requests_memory"],callback:function(s){e.$set(e.ingressCfg.vars,"gateways_istio__ingressgateway_resources_requests_memory",s)},expression:"ingressCfg.vars['gateways_istio__ingressgateway_resources_requests_memory']"}})],1)],1),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.cpu_limit"),prop:"vars.gateways_istio__ingressgateway_resources_limits_cpu",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.ingressCfg.vars["gateways_istio__ingressgateway_resources_limits_cpu"],callback:function(s){e.$set(e.ingressCfg.vars,"gateways_istio__ingressgateway_resources_limits_cpu",s)},expression:"ingressCfg.vars['gateways_istio__ingressgateway_resources_limits_cpu']"}})],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.memory_limit"),prop:"vars.gateways_istio__ingressgateway_resources_limits_memory",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.ingressCfg.vars["gateways_istio__ingressgateway_resources_limits_memory"],callback:function(s){e.$set(e.ingressCfg.vars,"gateways_istio__ingressgateway_resources_limits_memory",s)},expression:"ingressCfg.vars['gateways_istio__ingressgateway_resources_limits_memory']"}})],1)],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.gateways_type"),prop:"vars.gateways_istio__ingressgateway_type",rules:e.requiredRules}},[t("el-select",{staticStyle:{width:"206px"},attrs:{clearable:""},model:{value:e.ingressCfg.vars["gateways_istio__ingressgateway_type"],callback:function(s){e.$set(e.ingressCfg.vars,"gateways_istio__ingressgateway_type",s)},expression:"ingressCfg.vars['gateways_istio__ingressgateway_type']"}},[t("el-option",{attrs:{value:"NodePort"}},[e._v("NodePort")]),t("el-option",{attrs:{value:"LoadBalancer"}},[e._v("LoadBalancer")])],1)],1)],1)],1):e._e()],1),t("el-collapse-item",{attrs:{title:"Istio-Egress",name:"3"}},[t("el-switch",{model:{value:e.egressCfg.enable,callback:function(s){e.$set(e.egressCfg,"enable",s)},expression:"egressCfg.enable"}}),e.egressCfg.enable?t("div",[t("el-form",{ref:"egressCfg",attrs:{model:e.egressCfg,"label-width":"200px"}},[e.egressCfg.cluster_istio.message?t("el-form-item",[t("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:e.egressCfg.cluster_istio.message,placement:"right-end"}},[t("el-button",{staticStyle:{color:"red"},attrs:{icon:"el-icon-error",type:"text"}},[e._v(e._s(e.$t("cluster.detail.istio.err_title")))])],1)],1):e._e(),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.cpu_limit"),prop:"vars.gateways_istio__egressgateway_resources_requests_cpu",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.egressCfg.vars["gateways_istio__egressgateway_resources_requests_cpu"],callback:function(s){e.$set(e.egressCfg.vars,"gateways_istio__egressgateway_resources_requests_cpu",s)},expression:"egressCfg.vars['gateways_istio__egressgateway_resources_requests_cpu']"}})],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.memory_request"),prop:"vars.gateways_istio__egressgateway_resources_requests_memory",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.egressCfg.vars["gateways_istio__egressgateway_resources_requests_memory"],callback:function(s){e.$set(e.egressCfg.vars,"gateways_istio__egressgateway_resources_requests_memory",s)},expression:"egressCfg.vars['gateways_istio__egressgateway_resources_requests_memory']"}})],1)],1),t("el-row",{attrs:{type:"flex"}},[t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.cpu_limit"),prop:"vars.gateways_istio__egressgateway_resources_limits_cpu",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.egressCfg.vars["gateways_istio__egressgateway_resources_limits_cpu"],callback:function(s){e.$set(e.egressCfg.vars,"gateways_istio__egressgateway_resources_limits_cpu",s)},expression:"egressCfg.vars['gateways_istio__egressgateway_resources_limits_cpu']"}})],1),t("el-form-item",{attrs:{label:e.$t("cluster.detail.istio.memory_request"),prop:"vars.gateways_istio__egressgateway_resources_limits_memory",rules:e.numberRules}},[t("el-input-number",{staticStyle:{width:"100%"},attrs:{step:1,"step-strictly":""},model:{value:e.egressCfg.vars["gateways_istio__egressgateway_resources_limits_memory"],callback:function(s){e.$set(e.egressCfg.vars,"gateways_istio__egressgateway_resources_limits_memory",s)},expression:"egressCfg.vars['gateways_istio__egressgateway_resources_limits_memory']"}})],1)],1)],1)],1):e._e()],1)],1),"Running"!==e.baseCfg.cluster_istio.status?t("div",[t("el-button",{attrs:{disabled:e.submitLoading,size:"mini"},on:{click:function(s){return e.onSubmit("start")}}},[e._v(e._s(e.$t("commons.button.enable")))])],1):e._e(),"Running"===e.baseCfg.cluster_istio.status?t("div",[t("el-button",{attrs:{disabled:e.submitLoading,size:"mini"},on:{click:function(s){return e.onSubmit("restart")}}},[e._v(e._s(e.$t("cluster.detail.istio.resave")))]),t("el-button",{attrs:{size:"mini"},on:{click:function(s){return e.onDisable()}}},[e._v(e._s(e.$t("commons.button.disable")))])],1):e._e(),t("el-dialog",{attrs:{title:e.$t("cluster.detail.istio.disable_istio"),width:"30%",visible:e.dialogShutupVisible},on:{"update:visible":function(s){e.dialogShutupVisible=s}}},[t("span",[e._v(e._s(e.$t("cluster.detail.istio.ensure_disable_istio")))]),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(s){e.dialogShutupVisible=!1}}},[e._v(e._s(e.$t("commons.button.cancel")))]),t("el-button",{attrs:{disabled:e.submitLoading},on:{click:function(s){return e.submitDisable()}}},[e._v(e._s(e.$t("commons.button.ok")))])],1)])],1)])},r=[],a=t("30d5"),l=(t("f5bd"),t("2769"),t("ecf1"),t("be17")),o=(t("0756"),t("ff66")),u="/api/v1/clusters/istio/{operation}/{cluster_name}";function n(e){return Object(o["c"])(u.replace("/{operation}","").replace("{cluster_name}",e))}function c(e,s){return Object(o["e"])(u.replace("{operation}","enable").replace("{cluster_name}",e),s)}function _(e,s){return Object(o["e"])(u.replace("{operation}","disable").replace("{cluster_name}",e),s)}var g=t("3d5f"),p=t("0792"),m={name:"ClusterIstio",components:{LayoutContent:l["a"]},data:function(){return{submitLoading:!1,clusterName:"",activeNames:["1","2","3"],accordionLoading:!1,baseCfg:{cluster_istio:{},enable:!1,operation:"",vars:{}},pilotCfg:{cluster_istio:{},enable:!1,operation:"",vars:{}},ingressCfg:{cluster_istio:{},enable:!1,operation:"",vars:{}},egressCfg:{cluster_istio:{},enable:!1,operation:"",vars:{}},numberRules:[p["a"].NumberRule],requiredRules:[p["a"].RequiredRule],dialogShutupVisible:!1}},methods:{search:function(){var e=this;this.loading=!0,n(this.clusterName).then((function(s){var t,i=Object(a["a"])(s);try{for(i.s();!(t=i.n()).done;){var r=t.value;switch(r.cluster_istio.name){case"base":"Waiting"!==r.cluster_istio.status?e.baseCfg.vars=Object(g["a"])(JSON.parse(r.cluster_istio.vars)):e.setDefaultBaseCfg(),e.baseCfg.enable="Waiting"!==r.cluster_istio.status,e.baseCfg.cluster_istio=r.cluster_istio;break;case"pilot":"Waiting"!==r.cluster_istio.status?e.pilotCfg.vars=Object(g["a"])(JSON.parse(r.cluster_istio.vars)):e.setDefaultPilotCfg(),e.pilotCfg.enable="Waiting"!==r.cluster_istio.status,e.pilotCfg.cluster_istio=r.cluster_istio;break;case"ingress":"Waiting"!==r.cluster_istio.status?e.ingressCfg.vars=Object(g["a"])(JSON.parse(r.cluster_istio.vars)):e.setDefaultIngressCfg(),e.ingressCfg.enable="Waiting"!==r.cluster_istio.status&&"Terminated"!==r.cluster_istio.status,e.ingressCfg.cluster_istio=r.cluster_istio;break;case"egress":"Waiting"!==r.cluster_istio.status?e.egressCfg.vars=Object(g["a"])(JSON.parse(r.cluster_istio.vars)):e.setDefaultEgressCfg(),e.egressCfg.enable="Waiting"!==r.cluster_istio.status&&"Terminated"!==r.cluster_istio.status,e.egressCfg.cluster_istio=r.cluster_istio;break}e.loading=!1}}catch(l){i.e(l)}finally{i.f()}}))},onSubmit:function(e){var s=this;this.submitLoading=!0,Object(g["b"])(this.pilotCfg.vars),Object(g["b"])(this.ingressCfg.vars),Object(g["b"])(this.egressCfg.vars);var t=[];"start"===e&&(this.baseCfg.enable=!0,this.getOperation(t,this.baseCfg)),this.pilotCfg.enable=!0,this.getOperation(t,this.pilotCfg),this.getOperation(t,this.ingressCfg),this.getOperation(t,this.egressCfg),c(this.clusterName,t).then((function(){"start"===e?s.$message({type:"success",message:s.$t("commons.msg.enable_success")}):s.$message({type:"success",message:s.$t("commons.msg.re_enable_success")}),s.search(),s.submitLoading=!1})).catch((function(){s.submitLoading=!1}))},onDisable:function(){this.dialogShutupVisible=!0},submitDisable:function(){var e=this;this.submitLoading=!0;var s=[];this.disAble(s,this.baseCfg),this.disAble(s,this.pilotCfg),this.disAble(s,this.ingressCfg),this.disAble(s,this.egressCfg),_(this.clusterName,s).then((function(){e.$message({type:"success",message:e.$t("commons.msg.disable_success")}),e.submitLoading=!1,e.dialogShutupVisible=!1,e.search()})).catch((function(){e.submitLoading=!1}))},disAble:function(e,s){"Waiting"!==s.cluster_istio.status&&(s.operation="disable",s.enable=!1,e.push(s))},getOperation:function(e,s){s.enable?(s.operation="enable",e.push(s)):s.enable||"Waiting"===s.cluster_istio.status||(s.operation="disable",e.push(s))},setDefaultBaseCfg:function(){this.baseCfg.vars={"global.istiod.enableAnalysis":!0}},setDefaultPilotCfg:function(){this.pilotCfg.vars={pilot_resources_requests_cpu:500,pilot_resources_requests_memory:2048,pilot_resources_limits_cpu:500,pilot_resources_limits_memory:2048,pilot_traceSampling:1}},setDefaultIngressCfg:function(){this.ingressCfg.vars={gateways_istio__ingressgateway_type:"NodePort",gateways_istio__ingressgateway_resources_requests_cpu:100,gateways_istio__ingressgateway_resources_requests_memory:128,gateways_istio__ingressgateway_resources_limits_cpu:2e3,gateways_istio__ingressgateway_resources_limits_memory:1024}},setDefaultEgressCfg:function(){this.egressCfg.vars={gateways_istio__egressgateway_resources_requests_cpu:100,gateways_istio__egressgateway_resources_requests_memory:128,gateways_istio__egressgateway_resources_limits_cpu:2e3,gateways_istio__egressgateway_resources_limits_memory:1024}}},created:function(){this.clusterName=this.$route.params.name,this.search()}},f=m,b=t("5d22"),y=Object(b["a"])(f,i,r,!1,null,null,null);s["default"]=y.exports}}]);
//# sourceMappingURL=chunk-7aeed5b6.4acad24d.js.map