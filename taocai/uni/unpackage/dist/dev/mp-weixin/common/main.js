(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!********************************!*\
  !*** D:/taocai-uniapp/main.js ***!
  \********************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){n(/*! uni-pages */4);var e=l(n(/*! vue */2)),o=l(n(/*! ./App */5)),r=c(n(/*! @/util/navTo.js */11)),a=l(n(/*! @/util/api.js */12));function u(){if("function"!==typeof WeakMap)return null;var t=new WeakMap;return u=function(){return t},t}function c(t){if(t&&t.__esModule)return t;if(null===t||"object"!==typeof t&&"function"!==typeof t)return{default:t};var e=u();if(e&&e.has(t))return e.get(t);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){var a=o?Object.getOwnPropertyDescriptor(t,r):null;a&&(a.get||a.set)?Object.defineProperty(n,r,a):n[r]=t[r]}return n.default=t,e&&e.set(t,n),n}function l(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){p(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s=function(){n.e(/*! require.ensure | colorui/components/cu-custom */"colorui/components/cu-custom").then(function(){return resolve(n(/*! ./colorui/components/cu-custom.vue */252))}.bind(null,n)).catch(n.oe)};e.default.prototype.$navTo=r,e.default.prototype.$http=a.default,e.default.component("cu-custom",s);var d=function(){Promise.all(/*! require.ensure | components/lb-picker/index */[n.e("common/vendor"),n.e("components/lb-picker/index")]).then(function(){return resolve(n(/*! ./components/lb-picker */257))}.bind(null,n)).catch(n.oe)};e.default.component("lb-picker",d),e.default.config.productionTip=!1,o.default.mpType="app";var b=new e.default(f({},o.default));t(b).$mount()}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,
/*!********************************!*\
  !*** D:/taocai-uniapp/App.vue ***!
  \********************************/
/*! no static exports found */,function(t,e,n){"use strict";n.r(e);var o=n(/*! ./App.vue?vue&type=script&lang=js& */6);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n(/*! ./App.vue?vue&type=style&index=0&lang=scss& */8);var a,u,c,l,i=n(/*! ../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),f=Object(i["default"])(o["default"],a,u,!1,null,null,null,!1,c,l);f.options.__file="App.vue",e["default"]=f.exports},
/*!*********************************************************!*\
  !*** D:/taocai-uniapp/App.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),r=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=r.a},
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/taocai-uniapp/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n(/*! vue */2));function r(t){return t&&t.__esModule?t:{default:t}}var a={onLaunch:function(){this.updateManager(),t.getSystemInfo({success:function(t){o.default.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();e?(o.default.prototype.Custom=e,o.default.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight):o.default.prototype.CustomBar=t.statusBarHeight+50}}),o.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{updateManager:function(){var e=t.getUpdateManager();e.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})}))}}};e.default=a}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},
/*!******************************************************************!*\
  !*** D:/taocai-uniapp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../学习资料/学习软件/HBuilderX.2.6.5.20200314.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */9),r=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=r.a},
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/taocai-uniapp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map