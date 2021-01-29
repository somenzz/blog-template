---
title: 免费搭建一个简洁优雅的静态博客
date: 2021-01-28 22:00:00
permalink: /vuepress-github-pages.html
tags:
 - 博客
categories:
 - 工具
---

你可能会问，现在写作平台都这么多了，还有必要自己折腾博客么？ 

一开始我遇到这个问题，总觉得自己弄个博客，太麻烦了，也不一定坚持写下去，直接在平台上写得了。于是 CSDN、简书、知乎上开始写。

写着写着，我就发现他们有一些缺点。

CSDN 上的广告太多，简书虽然广告比较少，但是一旦出现公众号或一些涉及到 ID 推广的，直接就限制只有自己可见了，知乎更严格，最开始有几篇文章放了公众号的二维码，为及时修改，直接永久禁言了。看来这些内容平台都很害怕公众号，烦事涉及公众号的，都会被提示违规，公众号平台目前是我非常满意的，但是没有评论，一天只能发一篇，而且修改文章内容受到限制，只能改 20 个字。

在平台上写文章，就好像在别人家的地盘上耕种，总有一种受各种约束的感觉，于是我还是决定自己搞个博客。需求就是简洁、优雅、能评论、能检索、有标签。

一开始我找到了用 django 开发博客系统的开源项目，就在本地部署用了下，还不错，但是如果要真正用起来，还需要购买服务器，维护起来有一定的成本，于是就放弃了动态博客，转而尝试着静态博客，先试了下 hexo，虽然也还行，但是我就是觉得不太美观，然后尝试了 VuePress，最终对 VuePress 的简约风格特别满意，目前我的博客「somenzz.github.io」使用的就是基于 VuePress 一款主题：vuepress-theme-reco。可以先瞄一下：

![首页](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3rohvl7kj31e70u07wh.jpg)

![文章](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3rpinhdrj31hi0u078t.jpg)

![评论](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3sw164enj31a00u03yz.jpg)

![标签](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3sx66eqsj30hs0zmq4m.jpg)

很多样式是可以自定义的，比如说这个博客：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3t08qtflj31cq0u040w.jpg)

如果你心动了，想建一个属于自己的静态博客，那么请跟着我继续向下看吧，非常简单易上手。


### 前提条件

1、你需要会使用 Git 和 GitHub 的基本功能，比如拉取，提交，推送，创建分支，如果不会，请去这个[网站](https://www.liaoxuefeng.com/wiki/896043488029600)学习：

2、你的电脑已经安装 Node.js，还没有安装的，请去[官网](https://nodejs.org/en/)安装。

### 直接使用

主题 vuepress-theme-reco 也提供了快速生成博客的模版，但是没有配置评论、阅读量、SEO 等设置，我这里直接全部配置好，你直接从我的仓库 fork，然后 clone 代码到本地，替换一些配置文件的文本内容，还有自己的一些图片，就可以快速生成属于自己的博客。

基于这个仓库进行 [https://github.com/zhengzhengshu/zhengzhengshu.github.io](https://github.com/zhengzhengshu/zhengzhengshu.github.io)

以下是操作步骤。











