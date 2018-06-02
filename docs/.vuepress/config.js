const title = require('./titleList')

module.exports = {
  base: 'Front-End-Interview',
  title: 'Front End Interview',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '目录', link: '/SUMMARY' }
    ],

    sidebar: {
      '/js-essentials/': [
        title.base
      ],
      '/advance/': [
        title.advance
      ],
      '/web-api/': [
        title.web_api
      ],
      '/browser/': [
        title.browser
      ],
      '/project-experience/': [
        title.project
      ]
    },

    lastUpdated: 'Last Updated',

    docsBranch: 'master',

    repo: 'lbwa/front-end-interview',

    repoLabel: 'Github',
  },
  markdown: {
    lineNumbers: true
  }
}
