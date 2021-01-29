const autometa_options = {
  site: {
    name: 'somenzz',
    description: '禅与计算机编程艺术，公众号：Python七号',
  },
  canonical_base: 'https://somenzz.github.io',
};


const themeConfig = require('./config/theme/')

module.exports = {
  // locales: {
  //   '/': {
  //     lang: 'zh-CN'
  //   }
  // },
  title: "somenzz's blog",
  description: '禅与计算机编程艺术，公众号：Python七号',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#42b983' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon_vuepress_reco.png' }],
    ['link', { rel: 'mask-icon', href: '/icon_vuepress_reco.svg', color: '#42b983' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icon_vuepress_reco.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true,
    externalLinks: { target: '_blank', rel: 'noopener noreferrer' }
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新"
      },
    },
    'autometa': autometa_options,
    'sitemap': {
      hostname: "https://somenzz.github.io",
      // 排除无实际内容的页面
      exclude: ["/404.html"]
    },
    'vuepress-plugin-baidu-autopush': {},
  },


  'flowchart': {},
  '@vuepress/medium-zoom': {
    selector: 'img.zoom-custom-imgs',
    // medium-zoom options here
    // See: https://github.com/francoischalifour/medium-zoom#options
    options: {
      margin: 16
    }
  },
  'seo': {
    siteTitle: (_, $site) => $site.title,
    title: $page => $page.title,
    description: $page => $page.frontmatter.description,
    author: (_, $site) => $site.themeConfig.author,
    tags: $page => $page.frontmatter.tags,
    twitterCard: _ => 'summary_large_image',
    type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
    url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
    image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain || '') + $page.frontmatter.image),
    publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
    modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
  }
}
