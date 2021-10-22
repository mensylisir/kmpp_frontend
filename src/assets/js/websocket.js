
// import { storeService } from "@/core/storeService";
// let client = {};

// export default {

// 	// 自定义打开函数 
//  openWs(ws) { // 参数是当前ws实例对象
// 	  // 可以在此处传递参数
// 	  wsCase.send("params:{}");
// 	},
// 	// 自定义错误函数 
//  wsError(err) {
// 	  // 可以在有异常时重置websocket，创建新的websocket实例连接
// 	  wsCase.close();
// 	  wsCase = null;
// 	  initWs();
// 	},
// 	 // 自定义数据处理函数
//  getWsData(ws) { // 参数是当前ws实例对象
// 	  // 可以在此处处理数据
// 	  console.log(JSON.parse(ws));
// 	},
// 	 // 自定义关闭参数	 
// openWs(ws) { // 参数是当前ws实例对象
// 	  wsCase.close();
// 	  wsCase = null;
// 	},



//   // 通过mqtt建立连接
//   startWebsocket() {
//     return new Promise((resove, reject) => {
//     	const wsUrl ="ws://services address/";
// 	const ws = new WebSocket(wsUrl);
//     ws.onopen = function () {
//       console.log('ws连接状态：' + ws.readyState);
//       resove()
//   }
//     });
//   },
// };