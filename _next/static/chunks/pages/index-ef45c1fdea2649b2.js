(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3685:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(1878)}])},6455:function(e,n,t){"use strict";function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function c(e){return"object"==typeof e&&(e=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),o.forEach((function(n){r(e,n,t[n])}))}return e}({},e,{key:Math.random()})),function(n,t){return[n,e,t]}}function a(e,n){var t=e.getBoundingClientRect().top+window.pageYOffset-80;document.querySelectorAll(".scroll-focus").forEach((function(e){return e.classList.remove("scroll-focus")})),e.classList.add("scroll-focus"),window.scrollTo({top:t,behavior:n?"auto":"smooth"})}function l(e){var n;return o(new Set((n=[]).concat.apply(n,o(e))))}function i(e,n){var t;switch(n){case"#":t="i";break;case".":t="c";break;case"::":t="s"}return"string"===typeof e?"".concat(t,"-").concat(e):"".concat(t,"-").concat(e.name)}function u(e){return e.charAt(0).toUpperCase()+e.slice(1)}t.d(n,{v_:function(){return c},kI:function(){return a},Dr:function(){return l},jK:function(){return i},aJ:function(){return u}})},578:function(e,n,t){"use strict";var r=t(5893),o=t(7294),c=t(8710),a=t(6455),l=t(5156),i=t(1664),u=t(347),s=t(5457),f=t(3743),p=t(1163);function d(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function b(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){h(e,n,t[n])}))}return e}function m(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function v(e,n){return!n||"object"!==w(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function j(e,n){return(j=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var w=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function O(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=y(e);if(n){var o=y(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return v(this,t)}}var k=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&j(e,n)}(h,e);var n,t,o,p=O(h);function h(){return d(this,h),p.apply(this,arguments)}return n=h,(t=[{key:"render",value:function(){var e=this,n=this.props.children;return n=n.replaceAll(/\{(.+?)\}/g,(function(e,t,r){var o;if(((null===(o=n.substr(0,r).match(/```/g))||void 0===o?void 0:o.length)||0)%2==1)return e;var c="/",l="";if(t.startsWith("file:"))if(c="/files/",t.includes(" ")){var i=t.substring(5).match(/^(.+?) (.+)$/);c+=i[1],l=i[2]}else{var u;c+=t.substring(5),l=null===(u=f[t.substring(5)])||void 0===u?void 0:u.title}else if(t.match(/[\.#]/g))t.split(/[\.#]/)[0].length>1&&(c="/objects/"+t.split(/[\.#]/)[0].replaceAll("::","/")),c+="#"+(0,a.jK)(t.split(/[\.#]/)[1],t.search(/[\.#]/)[0]),l=t;else{if(!t.match(/::/g))return e;c="/objects/"+t.replaceAll("::","/"),l=t}return"[".concat(l,"](").concat(c,")")})),(0,r.jsx)(c.D,{className:"markdown",components:{a:function(e){if(e.href.match(/^https?:\/\//))return(0,r.jsx)("a",g({},e));var n=g({},e);return delete n.children,(0,r.jsx)(i.default,g({href:e.href},n,{children:e.children[0]}))},code:function(e){e.node;var n,t=e.inline,o=e.className,c=e.children,a=m(e,["node","inline","className","children"]),l=(null===(n=/language-(\w+)/.exec(o||""))||void 0===n?void 0:n[1])||"plaintext";return t?(0,r.jsx)("code",g({className:o},a,{children:c})):(0,r.jsx)(s.d,{language:l,children:c[0].trim()})}},rehypePlugins:[l.Z,u.Z],transformImageUri:function(n){return n.startsWith("http")?n:"".concat(e.props.router.basePath,"/").concat(n)},children:n})}}])&&b(n.prototype,t),o&&b(n,o),h}(o.Component);n.Z=(0,p.withRouter)(k)},5457:function(e,n,t){"use strict";t.d(n,{d:function(){return l},O:function(){return a}});var r=t(5893),o=t(3226),c={'code[class*="language-"]':{color:"#2e3338",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#2e3338",fontFamily:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",fontSize:"1em",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",backgroundColor:"#f2f3f5"},'pre[class*="language-"]:hover':{backgroundColor:"#fef6e8",borderColor:"#faa81a"},'pre[class*="language-"]::-moz-selection':{background:"#073642"},'pre[class*="language-"] ::-moz-selection':{background:"#073642"},'code[class*="language-"]::-moz-selection':{background:"#073642"},'code[class*="language-"] ::-moz-selection':{background:"#073642"},'pre[class*="language-"]::selection':{background:"#073642"},'pre[class*="language-"] ::selection':{background:"#073642"},'code[class*="language-"]::selection':{background:"#073642"},'code[class*="language-"] ::selection':{background:"#073642"},':not(pre) > code[class*="language-"]':{backgroundColor:"#f2f3f5",padding:".1em",borderRadius:".3em"},comment:{color:"#c7ccd1"},prolog:{color:"#c7ccd1"},doctype:{color:"#c7ccd1"},cdata:{color:"#c7ccd1"},punctuation:{color:"#586e75"},namespace:{Opacity:".7"},property:{color:"#268bd2"},tag:{color:"#268bd2"},boolean:{color:"#268bd2"},number:{color:"#268bd2"},constant:{color:"#268bd2"},symbol:{color:"#268bd2"},deleted:{color:"#268bd2"},selector:{color:"#2aa198"},"attr-name":{color:"#2aa198"},string:{color:"#2aa198"},char:{color:"#2aa198"},builtin:{color:"#2aa198"},url:{color:"#2aa198"},inserted:{color:"#2aa198"},entity:{color:"#657b83",background:"#eee8d5",cursor:"help"},atrule:{color:"#859900"},"attr-value":{color:"#859900"},keyword:{color:"#859900"},function:{color:"#b58900"},"class-name":{color:"#b58900"},regex:{color:"#cb4b16"},important:{color:"#cb4b16",fontWeight:"bold"},variable:{color:"#cb4b16"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}};function a(e){var n,t=e.children;return t.startsWith('"')?n="hljs-string":t.match(/^\d/)?n="hljs-number":t.startsWith(":")?n="hljs-symbol":["nil","true","false"].includes(t)&&(n="hljs-literal"),(0,r.jsx)("span",{className:"".concat(n," font-mono"),children:t},Math.random())}function l(e){var n=e.children,t=e.language;return(0,r.jsx)(o.Z,{language:t,style:c,CustomElement:a,children:n})}},1878:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return b},default:function(){return h}});var r=t(5893),o=t(9008),c=t(578),a=t(7294);function l(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,n){return!n||"object"!==p(n)&&"function"!==typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function f(e,n){return(f=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}var p=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function d(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var t,r=u(e);if(n){var o=u(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return s(this,t)}}var b=!0,h=function(e){!function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&f(e,n)}(s,e);var n,t,a,u=d(s);function s(){return l(this,s),u.apply(this,arguments)}return n=s,(t=[{key:"getPath",value:function(){return[""]}},{key:"render",value:function(){var e=this.props.content;return(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen py-2",children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:"Create Next App"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen py-2",children:[(0,r.jsxs)(o.default,{children:[(0,r.jsx)("title",{children:"File: README.md"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)("main",{className:"w-full flex-1 px-20 sm:px-10",children:(0,r.jsx)(c.Z,{children:e})})]})]})}}])&&i(n.prototype,t),a&&i(n,a),s}(a.Component)}},function(e){e.O(0,[695,774,888,179],(function(){return n=3685,e(e.s=n);var n}));var n=e.O();_N_E=n}]);