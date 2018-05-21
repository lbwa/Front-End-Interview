# BOM

```js
// 客户端信息对象
navigator

// 屏幕信息对象
screen

/**
 * 地址栏 url 信息对象
 * 实际应用：Vue router 的路由信息对象 vm.$route 和路由实例 vm.$router 的应用
 * vm.$route.path 对应 location.pathname
 * vm.$route.query 对应 location.search
 * vm.$route.hash 对应 location.hash
 * vm.$route.fullPath 对应 location.href
 * vm.$router.push(path) 对应 location.assign(path)
 * vm.$router.replace(path) 对应 location.replace(path)
 */
location
location.href // 全 url
location.protocol // 当前 url 协议，如 https:，http:，file:
location.host // 域名主机
location.pathname // 路径，即主机后的字符串
location.search // 查询字符串，即 ? 后字符串
location.hash // 路由 hash 值，即 # 后字符串

// 历史记录信息对象（Vue router 的路由实例 vm.$router 应用，如 vm.$router.back()，vm.$router.go(n)）
history
history.go(n)
history.back()
history.forward()
```

## 浏览器类型检测

```js
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
```

原则：根据目标浏览器的 ua 字段制定特殊的过滤器。
