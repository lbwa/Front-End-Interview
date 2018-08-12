(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{160:function(e,t,r){"use strict";r.r(t);var _=r(0),o=Object(_.a)({},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[e._m(0),e._m(1),e._m(2),e._m(3),r("p",[e._v("那么始终有：")]),e._m(4),e._m(5),r("p",[e._v("在 "),r("code",[e._v("HTTP 1.0/1.1")]),e._v(" 的情况下，"),r("code",[e._v("Chrome")]),e._v(" 浏览器 "),r("a",{attrs:{href:"https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing#_1",target:"_blank",rel:"noopener noreferrer"}},[e._v("最大同域并发数"),r("OutboundLink")],1),e._v(" 为 "),r("code",[e._v("6")]),e._v("。若将部分依赖部署于其他子域时，可扩大当前页面的并发请求为 "),r("code",[e._v("N*6")]),e._v("。")]),r("p",[e._v("因为 "),r("code",[e._v("HTTP 2")]),e._v(" 协议建立的单个 "),r("code",[e._v("TCP")]),e._v(" 通道实现了并行请求（"),r("a",{attrs:{href:"https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing#_1",target:"_blank",rel:"noopener noreferrer"}},[e._v("多路复用链接"),r("OutboundLink")],1),e._v("），而不再是原始的串行请求，那么此时最大同域并发数不再是 "),r("code",[e._v("6")]),e._v("（further reading: "),r("a",{attrs:{href:"https://set.sh/blog/writings/http-protocol#http-2",target:"_blank",rel:"noopener noreferrer"}},[e._v("HTTP 协议"),r("OutboundLink")],1),e._v("）。")]),e._m(6),r("p",[r("code",[e._v("load")]),e._v(" 事件（触发时机："),r("a",{attrs:{href:"https://html.spec.whatwg.org/multipage/indices.html#event-load",target:"_blank",rel:"noopener noreferrer"}},[e._v("HTML5 whatwg"),r("OutboundLink")],1),e._v(" 和 "),r("a",{attrs:{href:"https://w3c.github.io/html/single-page.html#eventdef-global-load",target:"_blank",rel:"noopener noreferrer"}},[e._v("W3C 5.3 草案"),r("OutboundLink")],1),e._v(" ）表示当前页面的 "),r("strong",[e._v("全部")]),e._v(" 依赖资源加载完时成才会触发事件，包括图片、视频等一切依赖。")]),e._m(7),r("p",[r("code",[e._v("DOMContentLoaded")]),e._v("（触发时机："),r("a",{attrs:{href:"https://html.spec.whatwg.org/multipage/parsing.html#the-end",target:"_blank",rel:"noopener noreferrer"}},[e._v("HTML5 whatwg"),r("OutboundLink")],1),e._v(" 和 "),r("a",{attrs:{href:"https://w3c.github.io/html/single-page.html#the-end",target:"_blank",rel:"noopener noreferrer"}},[e._v("W3C 5.3 草案"),r("OutboundLink")],1),e._v(" ）表示在 DOM 树"),r("strong",[e._v("建立")]),e._v("完成后就会触发，无需等待"),r("strong",[e._v("样式表")]),e._v("（"),r("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded",target:"_blank",rel:"noopener noreferrer"}},[e._v("MDN"),r("OutboundLink")],1),e._v("和 "),r("code",[e._v("JS 高程 p390")]),e._v("）、图像等外部资源加载完成。")]),e._m(8),r("ol",[e._m(9),r("li",[r("p",[e._v("当 "),r("code",[e._v("HTML")]),e._v(" 中存在阻塞式脚本时，那么 "),r("code",[e._v("DOMContentLoaded")]),e._v(" 一定是在 JS 脚本执行之后触发，而 JS 可能包含查询 "),r("code",[e._v("CSSOM")]),e._v(" 的语句，那么阻塞式 JS 脚本必须阻塞至 "),r("code",[e._v("CSSOM")]),e._v(" 构建完成之后执行（与 "),r("code",[e._v("DOM")]),e._v(" 的暂停解析不同，"),r("code",[e._v("CSSOM")]),e._v(" 的解析构建优先级高于阻塞式 JS 执行）。那么此时， "),r("code",[e._v("DOMContentLoaded")]),e._v(" 触发的时机一定是在 "),r("code",[e._v("CSSOM")]),e._v(" 完成构建，且阻塞式脚本已经执行完成时（"),r("a",{attrs:{href:"https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp#adding_javascript_and_css_into_the_mix",target:"_blank",rel:"noopener noreferrer"}},[e._v("google web fundamentals"),r("OutboundLink")],1),e._v("）。")])])]),e._m(10),e._m(11),e._m(12),e._m(13),r("ul",[r("li",[r("p",[r("a",{attrs:{href:"https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp#adding_javascript_and_css_into_the_mix",target:"_blank",rel:"noopener noreferrer"}},[e._v("google web fundamentals"),r("OutboundLink")],1)])]),r("li",[r("p",[r("a",{attrs:{href:"http://blog.51cto.com/zhoulujun/2118990",target:"_blank",rel:"noopener noreferrer"}},[e._v("再谈 DOMContentLoaded "),r("OutboundLink")],1)])])]),e._m(14),r("ol",[e._m(15),r("li",[e._m(16),r("ul",[r("li",[r("code",[e._v("HTTP/HTTPS")]),e._v(" 协议（"),r("a",{attrs:{href:"https://lbwa.github.io/2018/06/06/180606-http-protocol/",target:"_blank",rel:"noopener noreferrer"}},[e._v("My blog"),r("OutboundLink")],1),e._v("）")])])]),e._m(17),e._m(18)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"页面加载原理的应用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#页面加载原理的应用","aria-hidden":"true"}},[this._v("#")]),this._v(" 页面加载原理的应用")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"load-事件和-domcontentloaded-事件的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#load-事件和-domcontentloaded-事件的区别","aria-hidden":"true"}},[this._v("#")]),t("code",[this._v("load")]),this._v(" 事件和 "),t("code",[this._v("DOMContentLoaded")]),this._v(" 事件的区别")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"前置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前置","aria-hidden":"true"}},[this._v("#")]),this._v(" 前置")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("p",[r("code",[e._v("CSS")]),e._v(" 文件下载 "),r("em",[r("strong",[e._v("不阻塞")])]),r("code",[e._v("DOM")]),e._v(" 树的构建与解析。但是因为浏览器是根据渲染树生成最终页面，而渲染树是由 "),r("code",[e._v("DOM")]),e._v(" 树与 "),r("code",[e._v("CSSOM")]),e._v(" 树合并而成，那么 "),r("code",[e._v("CSS")]),e._v(" 文件的下载与解析将 "),r("em",[r("strong",[e._v("阻塞")])]),e._v(" 页面的渲染。")])]),r("li",[r("p",[e._v("阻塞式 "),r("code",[e._v("JS")]),e._v(" 文件（即 "),r("code",[e._v("blocking JS files")]),e._v(", 除了具有 "),r("code",[e._v("async")]),e._v(" 或 "),r("code",[e._v("defer")]),e._v(" 属性的 "),r("em",[r("strong",[e._v("外联")])]),e._v(" 脚本以外的其他形式脚本）因可能存在查询 "),r("code",[e._v("DOM")]),e._v(" 树的语句，那么它一定 "),r("em",[r("strong",[e._v("阻塞")])]),r("code",[e._v("DOM")]),e._v(" 树的解析构建进程。")]),r("ul",[r("li",[r("p",[r("code",[e._v("async")]),e._v(" 或 "),r("code",[e._v("defer")]),e._v(" 属性只对外联脚本生效。")])]),r("li",[r("p",[e._v("JS 下载执行的优先级高于 "),r("code",[e._v("DOM")]),e._v(" 树的解析生成是出于避免 "),r("code",[e._v("DOM")]),e._v(" 树的构建冲突，并且 "),r("em",[r("strong",[e._v("一次性")])]),e._v("（可与 "),r("code",[e._v("CSSOM")]),e._v(" 的下载构建优先级高于 JS 脚本执行做对比。） 构建出 "),r("code",[e._v("DOM")]),e._v(" 树的目的。")])]),r("li",[r("p",[e._v("阻塞式 "),r("code",[e._v("JS")]),e._v(" 脚本执行之前，其中可能包含查询 "),r("code",[e._v("CSSOM")]),e._v(" 的语句，那么阻塞式 "),r("code",[e._v("JS")]),e._v(" 脚本执行一定是在 "),r("code",[e._v("CSSOM")]),e._v(" 下载并完成构建之后。")])]),r("li",[r("p",[e._v("阻塞式脚本文件对于 "),r("code",[e._v("DOM")]),e._v(" 与 "),r("code",[e._v("CSSOM")]),e._v(" 是不同的优先级，这是浏览器的实现，即可理解为 "),r("code",[e._v("DOM < blocking JS")]),e._v(" 和 "),r("code",[e._v("CSSOM > blocking JS")]),e._v("，但 "),r("code",[e._v("DOM")]),e._v(" 与 "),r("code",[e._v("CSSOM")]),e._v(" 二者之间不具有可比性。")])])])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ol",[r("li",[r("p",[r("code",[e._v("CSS")]),e._v(" 加载不阻塞 "),r("code",[e._v("DOM")]),e._v(" 树的解析构建")])]),r("li",[r("p",[r("code",[e._v("CSS")]),e._v(" 加载阻塞渲染树的解析构建，即阻塞渲染进程")])]),r("li",[r("p",[r("code",[e._v("CSS")]),e._v(" 加载阻塞其后的阻塞式 JS 文件的执行。")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("注：现代浏览器实现了并发预加载外部依赖，即当 "),t("code",[this._v("DOM")]),this._v(" 树解析器被阻塞时，浏览器会识别该阻塞脚本的后续外部依赖进行预加载。但是，后续外部依赖的执行顺序依然是按照原始 "),t("code",[this._v("DOM")]),this._v(" 树的结构执行。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"load-事件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#load-事件","aria-hidden":"true"}},[this._v("#")]),this._v(" Load 事件")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"domcontentloaded-事件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#domcontentloaded-事件","aria-hidden":"true"}},[this._v("#")]),this._v(" DOMContentLoaded 事件")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v("值得注意的是，当 "),r("code",[e._v("HTML")]),e._v(" 中包含阻塞式 "),r("code",[e._v("JS")]),e._v(" 脚本时，"),r("code",[e._v("DOMContentLoaded")]),e._v(" 需要等到 "),r("code",[e._v("HTML")]),e._v(" 中阻塞式脚本执行完成后触发，而阻塞式脚本执行的时机 "),r("em",[r("strong",[e._v("一定")])]),e._v(" 是在 "),r("code",[e._v("CSSOM")]),e._v(" 构建完成之后。")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",[r("p",[e._v("当 "),r("code",[e._v("HTML")]),e._v(" 中不存在阻塞式脚本时，那么 "),r("code",[e._v("DOMContentLoaded")]),e._v(" 在 "),r("code",[e._v("DOM")]),e._v(" 树被解析构建完成时触发，而不用等待其他如 "),r("code",[e._v("CSS")]),e._v(" 等依赖的下载解析完成。")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"事件目标的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事件目标的区别","aria-hidden":"true"}},[this._v("#")]),this._v(" 事件目标的区别")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("load")]),this._v(" 事件在 "),t("code",[this._v("window")]),this._v(" 和 "),t("code",[this._v("document")]),this._v(" 对象上触发。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("DOMContentLoaded")]),this._v(" 事件在 "),t("code",[this._v("document")]),this._v(" 对象上触发。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"reference"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reference","aria-hidden":"true"}},[this._v("#")]),this._v(" Reference")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"从输入-url-到得到-html-的详细过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到得到-html-的详细过程","aria-hidden":"true"}},[this._v("#")]),this._v(" 从输入 "),t("code",[this._v("url")]),this._v(" 到得到 "),t("code",[this._v("HTML")]),this._v(" 的详细过程")])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("p",[this._v("浏览器根据 "),t("code",[this._v("DNS")]),this._v(" 服务器（本地 "),t("code",[this._v("DNS")]),this._v(" 优先级最高）得到域名的 "),t("code",[this._v("IP")]),this._v(" 地址")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("向该 "),t("code",[this._v("IP")]),this._v(" 的服务器发送请求（"),t("code",[this._v("http")]),this._v(" 或 "),t("code",[this._v("https")]),this._v("）")])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("p",[this._v("服务端接受请求，处理之后并返回请求")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("p",[this._v("客户端得到服务端返回的内容")])])}],!1,null,null,null);t.default=o.exports}}]);