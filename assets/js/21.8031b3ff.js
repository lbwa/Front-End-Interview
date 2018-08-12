(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{162:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._m(1),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6),t._m(7),a("ul",[t._m(8),t._m(9),a("li",[a("p",[t._v("使用 "),a("code",[t._v("SSR")]),t._v(" 服务端渲染，数据直接输出到 "),a("code",[t._v("HTML")]),t._v(" 中（"),a("a",{attrs:{href:"https://github.com/lbwa/vue-ssr",target:"_blank",rel:"noopener noreferrer"}},[t._v("示例仓库 vue-ssr"),a("OutboundLink")],1),t._v("）。")]),t._m(10)])]),t._m(11),a("ul",[t._m(12),a("li",[a("p",[t._v("可能频繁被调用的事件（如 "),a("code",[t._v("input")]),t._v(" 事件、"),a("code",[t._v("resize")]),t._v(" 事件等以高频率触发的事件）回调函数使用防抖或节流（"),a("a",{attrs:{href:"https://github.com/lbwa/lbwa.github.io/issues/10",target:"_blank",rel:"noopener noreferrer"}},[t._v("我的博客"),a("OutboundLink")],1),t._v("）")])]),t._m(13),t._m(14)]),t._m(15),t._m(16),t._m(17),t._m(18),t._m(19)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"web-性能优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-性能优化","aria-hidden":"true"}},[this._v("#")]),this._v(" web 性能优化")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"原则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#原则","aria-hidden":"true"}},[this._v("#")]),this._v(" 原则")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("p",[this._v("多使用内存、缓存或其他方法")])]),s("li",[s("p",[this._v("减少 CPU 计算、减少网络请求，减少 I/O（存储器读写）")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"核心"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心","aria-hidden":"true"}},[this._v("#")]),this._v(" 核心")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("p",[this._v("加载页面和静态资源的速度")])]),s("li",[s("p",[this._v("页面渲染")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"加载资源的优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#加载资源的优化","aria-hidden":"true"}},[this._v("#")]),this._v(" 加载资源的优化")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[s("p",[this._v("静态资源的压缩合并。")]),s("ul",[s("li",[this._v("一般通过构建工具（如，"),s("code",[this._v("webpack")]),this._v("）来合并模块。")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text/javascript"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("scr")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("a.js"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text/javascript"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("scr")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("b.js"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 合并为 --\x3e")]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text/javascript"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("scr")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("bundle.js"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[s("p",[this._v("使用 "),s("code",[this._v("CDN")]),this._v(" 让资源加载更快。")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",[a("p",[t._v("静态资源缓存。浏览器默认策略是在静态资源名称"),a("strong",[t._v("未改变")]),t._v("的情况下，"),a("strong",[t._v("优先")]),t._v("使用缓存。")]),a("ul",[a("li",[t._v("通过连接名称控制缓存，如对样式表设置只有内容改变的时候，浏览器才会请求新的样式表。此处，可联系 "),a("code",[t._v("webpack")]),t._v(" 中的静态资源输出名称 "),a("code",[t._v("[name]-[hash:8].[ext]")]),t._v("（"),a("code",[t._v("[ext]")]),t._v(" 表示文件后缀名）、"),a("code",[t._v("[chunkHash:8].js")]),t._v("、"),a("code",[t._v("[contentHash:8].js")]),t._v("等。")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ul",[a("li",[a("p",[t._v("使用 "),a("code",[t._v("SSR")]),t._v(" 必须有强大的服务端支持，因为 "),a("code",[t._v("SSR")]),t._v(" 将会给服务端带来更大的压力。")])]),a("li",[a("p",[t._v("原本 "),a("code",[t._v("HTML")]),t._v(" 是先被解析，后填充 "),a("code",[t._v("Ajax")]),t._v(" 请求返回的数据。"),a("code",[t._v("SSR")]),t._v(" 将直接在服务端填充数据，返回给客户端填充好数据的 "),a("code",[t._v("HTML")]),t._v(" 文档。")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"渲染优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#渲染优化","aria-hidden":"true"}},[this._v("#")]),this._v(" 渲染优化")])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[s("p",[this._v("CSS 放在 "),s("code",[this._v("head")]),this._v(" 标签中，外部 JS 文件放在 "),s("code",[this._v("body")]),this._v(" 标签的结尾处。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[s("p",[this._v("尽早执行操作，如在 "),s("code",[this._v("DOMContentLoaded")]),this._v(" 事件执行操作，那么此时留给操作的活动时间一定长于 "),s("code",[this._v("loaded")]),this._v(" 事件。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",[s("p",[this._v("外部图片资源懒加载，下拉加载更多。")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- img 默认显示默认图像 --\x3e")]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("pic"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("default.png"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("alt")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("img"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("data-src")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://example.com/a.png"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!-- 图像懒加载 --\x3e")]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{attrs:{class:"token script language-javascript"}},[t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" img "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("querySelector")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'#pic'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 判断进入视口内，替换 src 属性")]),t._v("\n  img"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" img"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getAttribute")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'data-src'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")]),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("减少 DOM 查询，对 DOM 查询结果做缓存。")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// targets 缓存了元素数组，对目标元素组只有一次查询")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" targets "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("querySelectorAll")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'.target'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" len "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" targets"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{attrs:{class:"token operator"}},[t._v("++")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("减少 DOM 操作，多个操作尽量合并在一起执行。")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" list "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("querySelector")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'ul.target'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fragment "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("createDocumentFragment")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("5")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{attrs:{class:"token operator"}},[t._v("++")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" li "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("createElement")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'li'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n  fragment"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("li"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 多次 li 元素插入改为一次插入一个包含目标个数的 li 元素的文档片段")]),t._v("\nlist"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fragment"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])])}],!1,null,null,null);s.default=e.exports}}]);