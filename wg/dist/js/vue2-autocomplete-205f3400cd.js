!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Vue2Autocomplete=t():e.Vue2Autocomplete=t()}(this,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../dist/",n(n.s=2)}([function(e,t,n){"use strict";var o=n(1),s=n(4),i=n(3)(o.a,s.a,null,null,null);i.options.__file="src/js/components/vue-autocomplete.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] vue-autocomplete.vue: functional components are not supported with templates, they should use render functions."),t.a=i.exports},function(e,t,n){"use strict";t.a={props:{id:String,name:String,className:String,classes:{type:Object,default:function(){return{wrapper:!1,input:!1,list:!1,item:!1}}},placeholder:String,required:Boolean,initValue:{type:String,default:""},options:Array,filterByAnchor:{type:Boolean,default:!0},anchor:{type:String,required:!0},label:String,debounce:Number,url:{type:String,required:!0},param:{type:String,default:"q"},encodeParams:{type:Boolean,default:!0},customParams:Object,customHeaders:Object,min:{type:Number,default:0},onShouldRenderChild:Function,process:Function,onInput:Function,onShow:Function,onBlur:Function,onHide:Function,onFocus:Function,onSelect:Function,onBeforeAjax:Function,onAjaxProgress:Function,onAjaxLoaded:Function,onShouldGetData:Function},data:function(){return{showList:!1,type:"",json:[],focusList:"",debounceTask:void 0}},watch:{options:function(e,t){if(this.filterByAnchor){var n=this.type,o=this.anchor,s=new RegExp(""+n,"i"),i=e.filter(function(e){return-1!==e[o].search(s)});this.json=i}else this.json=e}},methods:{getClassName:function(e){var t=this.classes,n=this.className;return t[e]?""+t[e]:n?n+"-"+e:""},clearInput:function(){this.showList=!1,this.type="",this.json=[],this.focusList=""},cleanUp:function(e){return JSON.parse(JSON.stringify(e))},handleInput:function(e){var t=this,n=e.target.value;if(this.showList=!0,this.onInput&&this.onInput(n),!this.debounce)return this.getData(n);void 0!==this.debounceTask&&clearTimeout(this.debounceTask),this.debounceTask=setTimeout(function(){return t.getData(n)},this.debounce)},handleKeyDown:function(e){var t=e.keyCode;if(this.showList){switch(t){case 40:e.preventDefault(),this.focusList++;break;case 38:e.preventDefault(),this.focusList--;break;case 13:e.preventDefault(),this.selectList(this.json[this.focusList]),this.showList=!1;break;case 27:this.showList=!1}var n=this.json.length-1,o=this.focusList>n,s=this.focusList<0,i=n,r=this.focusList;o&&(r=0),s&&(r=i),this.focusList=r}},setValue:function(e){this.type=e},handleDoubleClick:function(){this.json=[],this.getData(""),this.onShow&&this.onShow(),this.showList=!0},handleBlur:function(e){var t=this;this.onBlur&&this.onBlur(e),setTimeout(function(){t.onHide&&t.onHide(),t.showList=!1},250)},handleFocus:function(e){this.focusList=0,this.onFocus&&this.onFocus(e)},mousemove:function(e){this.focusList=e},activeClass:function(e){return""+(e===this.focusList?"focus-list":"")},selectList:function(e){var t=this.cleanUp(e);this.type=t[this.anchor],this.showList=!1,this.onSelect&&this.onSelect(t)},deepValue:function(e,t){for(var n=t.split("."),o=0;o<n.length;o++)e=e[n[o]];return e},composeParams:function(e){var t=this,n=function(e){return t.encodeParams?encodeURIComponent(e):e},o=this.param+"="+n(e);return this.customParams&&Object.keys(this.customParams).forEach(function(e){o+="&"+e+"="+n(t.customParams[e])}),o},composeHeader:function(e){var t=this;this.customHeaders&&Object.keys(this.customHeaders).forEach(function(n){e.setRequestHeader(n,t.customHeaders[n])})},doAjax:function(e){var t=this;this.onBeforeAjax&&this.onBeforeAjax(e);var n=this.composeParams(e),o=new XMLHttpRequest;o.open("GET",this.url+"?"+n,!0),this.composeHeader(o),o.addEventListener("progress",function(e){e.lengthComputable&&t.onAjaxProgress&&t.onAjaxProgress(e)}),o.addEventListener("loadend",function(e){var n=e.target.responseText,o=JSON.parse(n);t.onAjaxLoaded&&t.onAjaxLoaded(o),t.json=t.process?t.process(o):o}),o.send()},getData:function(e){e.length<this.min||!this.url||(this.onShouldGetData?this.manualGetData(e):this.doAjax(e))},manualGetData:function(e){var t=this,n=this.onShouldGetData(e);if(n&&n.then)return n.then(function(e){t.json=e})}},created:function(){this.type=this.initValue?this.initValue:null},mounted:function(){this.required&&this.$refs.input.setAttribute("required",this.required)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0);t.default=o.a},function(e,t){e.exports=function(e,t,n,o,s){var i,r=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(i=e,r=e.default);var u,c="function"==typeof r?r.options:r;if(t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns),o&&(c._scopeId=o),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=u):n&&(u=n),u){var l=c.functional,h=l?c.render:c.beforeCreate;l?c.render=function(e,t){return u.call(t),h(e,t)}:c.beforeCreate=h?[].concat(h,u):[u]}return{esModule:i,exports:r,options:c}}},function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.getClassName("wrapper")+" autocomplete-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],ref:"input",class:e.getClassName("input")+" autocomplete-input",attrs:{type:"text",id:e.id,placeholder:e.placeholder,name:e.name,autocomplete:"off"},domProps:{value:e.type},on:{input:[function(t){t.target.composing||(e.type=t.target.value)},e.handleInput],dblclick:e.handleDoubleClick,blur:e.handleBlur,keydown:e.handleKeyDown,focus:e.handleFocus}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showList&&e.json.length,expression:"showList && json.length"}],class:e.getClassName("list")+" autocomplete autocomplete-list"},[n("ul",e._l(e.json,function(t,o){return n("li",{class:e.activeClass(o)},[n("a",{attrs:{href:"#"},on:{click:function(n){n.preventDefault(),e.selectList(t)},mousemove:function(t){e.mousemove(o)}}},[e.onShouldRenderChild?n("div",{domProps:{innerHTML:e._s(e.onShouldRenderChild(t))}}):e._e(),e._v(" "),e.onShouldRenderChild?e._e():n("div",[n("b",{staticClass:"autocomplete-anchor-text"},[e._v(e._s(e.deepValue(t,e.anchor)))]),e._v(" "),n("span",{staticClass:"autocomplete-anchor-label"},[e._v(e._s(e.deepValue(t,e.label)))])])])])}))])])};o._withStripped=!0;var s={render:o,staticRenderFns:[]};t.a=s}])});