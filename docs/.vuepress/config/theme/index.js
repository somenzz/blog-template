const themeReco = require('./themeReco.js')
const nav = require('../nav/')
const sidebar = require('../sidebar/')

module.exports = Object.assign({}, themeReco, {
  nav,
  // 搜索设置
  search: true,
  searchMaxSuggestions: 15,
  authorAvatar: '/profile.png',
  // 自动形成侧边导航
  sidebar: 'auto',
  valineConfig: {
    appId: 'OHdOwbnjq*******************z',// your appId
    appKey: '9B97Td1******************', // your appKey
    placeholder: '填写邮箱可以收到回复提醒哦！',
    verify: true,
  }
})
