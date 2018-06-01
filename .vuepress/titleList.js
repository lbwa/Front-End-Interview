const utils = require('./utils')

const base = {
  title: '基础',
  collapsable: false,
  children: [
    ...utils.genChildTitle(
      'js-',
      'variable',
      'hoisting',
      'lexical-environments',
      'prototype',
      'prototype-application',
      'object-this',
      'execution-context/js-execution-context',
      'async',
      'event-loops',
      'promise',
      'async-function',
      'modules',
      'class',
      'common-functions'
    )
  ]
}

const advance = {
  title: '进阶',
  collapsable: false,
  children: [
    ...utils.genChildTitle(
      'adv-',
      'virtual-dom',
      'mvvm/adv-mvvm'
    )
  ]
}

const web_api = {
  title: 'Web API',
  collapsable: false,
  children: [
    ...utils.genChildTitle(
      'web-api-',
      'document-object-model',
      'broswer-object-model',
      'event',
      'ajax/web-api-ajax',
      'storage'
    )
  ]
}

const browser = {
  title: '客户端运行环境',
  collapsable: false,
  children: [
    ...utils.genChildTitle(
      'browser-',
      'loading',
      'loading-sample',
      'optimization'
    )
  ]
}

const project = {
  title: '项目相关',
  collapsable: false,
  children: [
    ...utils.genChildTitle(
      'project-',
      'launch'
    )
  ]
}

module.exports = {
  base,
  advance,
  web_api,
  browser,
  project
}
