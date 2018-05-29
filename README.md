# Front-End Interview

👉[在线浏览][online]

本存储库主要是梳理和强化自己在前端学习历程的 `JavaScript` 基础知识。

[online]:https://lbwa.github.io/Front-End-Interview/

# 思考原则

- 微观考点（现象）

透过现象看本质，通过面试题，首先想到的是，考点是什么。

- 宏观知识（本质）

通过该面试题，推广到的宏观知识点是什么，及其基本解决思路是什么。以有限的精力时间应对无尽的题目。

- 回归微观，拓展题目（拓展）

由宏观知识点拓展的其他相关知识点是什么，以及他们的基本解决思路是什么。由题目到知识再到题目。

# 常用标准

- `JavaScript` 基础语法和规则：

    - `ECMA 262` 标准（[最新版本][ecma262]、[草案][ECMA262-草案]），其中**只**包含 `JavaScript` 最基础的语法规则和实现原理。另外，该标准内亦包含了服务端的 JS 实现原理与规则。

    - `Promise` 标准（[Promises/A+][promises-a-plus]）

- `JavaScript Web API`：

    - `W3C` 标准（[最新版本][w3c]、[草案][W3C 草案]）
    
    - `WHATWG Standards`（`W3C` 的 [Living Standards]）
    
    - 以上二者均包含 `DOM`、`BOM`、事件绑定、`Ajax` 请求、`本地客户端存储` 等只针对浏览器客户端的 Web API。

`ECMA 262` 标准 和 `W3C` 两个标准**互不重合**。`W3C` 致力于现行标准的 snapshot，`WHATWG Standards` 致力于现行标准的拓展。`W3C` 与 `WHATWG Standards` 有很多重合。

注：`Node.js` 同样遵循 `ECMA 262` 标准，但它的 Server API 有其他的实现标准。

[ecma262]:https://www.ecma-international.org/ecma-262

[w3c]:https://www.w3.org/TR/html5/webappapis.html#webappapis

[ECMA262-草案]:https://tc39.github.io/ecma262/#sec-intro

[promises-a-plus]:https://promisesaplus.com/

[W3C 草案]:https://w3c.github.io/html/single-page.html#introduction

[Living Standards]:https://whatwg.org/