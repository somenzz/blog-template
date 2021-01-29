module.exports = {
  type: 'blog',
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: 'Category' // 默认 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: 'Tag' // 默认 “标签”
    }
  },
  friendLink: [
      {
        title: 'Python七号',
        desc: '一个值得关注的Python打怪升级的学习号',
        email: 'somenzz@163.com',
        link: '/views/python/python_seven.html'
      },
      {
        title: '虚位以待',
        desc: 'A simple and beautiful',
        // avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: '/views/python/python_seven.html'
      },
  ],
  logo: '/favicon.jpg', 
  // 最后更新时间
  lastUpdated: 'Last Updated', // string | boolean
  // 作者
  author: 'somenzz',
  // 备案号
  record: 'Python七号',
  recordLink: '/views/python/python_seven.html',
  // 项目开始时间
  startYear: '2018'
}
