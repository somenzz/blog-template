---
title: 5 分钟搭建一个简洁优雅的静态博客
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

## 为什么需要博客

CSDN 上的广告太多，简书虽然广告比较少，但是一旦出现公众号或一些涉及到 ID 推广的，直接就限制只有自己可见了，知乎更严格，最开始有几篇文章放了公众号的二维码，未及时修改，直接永久禁言了。看来这些内容平台都很害怕公众号，生怕公众号引流，凡涉及公众号引流的，都会被提示违规，公众号平台目前是我非常满意的，但是没有评论功能，一天只能发一篇，而且修改文章内容受到限制，只能改 20 个字。

在平台上写文章，就好像在别人家的地盘上耕种，总有一种受各种约束的感觉，于是我还是决定自己搞个博客。需求就是简洁、优雅、能评论、能检索、有标签。

一开始我找到了用 django 开发博客系统的开源项目，就在本地部署用了下，还不错，但是如果要真正用起来，还需要购买服务器，维护起来有一定的成本，于是就放弃了动态博客，转而尝试着静态博客，先试了下 hexo，虽然也还行，但是我就是觉得不太美观，然后尝试了 VuePress，最终对 VuePress 的简约风格特别满意，目前我的博客「somenzz.github.io」使用的就是基于 VuePress 一款主题：vuepress-theme-reco。可以先瞄一下：

![首页](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3rohvl7kj31e70u07wh.jpg)

![文章](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3rpinhdrj31hi0u078t.jpg)

![评论](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3sw164enj31a00u03yz.jpg)

![标签](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3sx66eqsj30hs0zmq4m.jpg)

很多样式是可以自定义的，比如说这个博客：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3t08qtflj31cq0u040w.jpg)

如果你心动了，想建一个属于自己的静态博客，那么请跟着我继续向下看吧，非常简单易上手。

## 前提条件

1、你需要会使用 Git 和 GitHub 的基本功能，比如拉取，提交，推送，创建分支，如果不会，请去这个[网站](https://www.liaoxuefeng.com/wiki/896043488029600)学习。

2、你的电脑已经安装 Node.js，还没有安装的，请去[官网](https://nodejs.org/en/)安装。

## 直接使用

主题 vuepress-theme-reco 也提供了快速生成博客的模版，但是没有配置评论、阅读量、SEO 等设置，我这里直接全部配置好，你直接从我的仓库 fork，然后 clone 代码到本地，替换一些配置文件的文本内容，还有自己的一些图片，就可以快速生成属于自己的静态博客。

基于这个仓库进行 [https://github.com/somenzz/blog-template.git](https://github.com/somenzz/blog-template.git)。

以下是操作步骤，非常简单。

1. 克隆仓库到本地。

```sh
git clone https://github.com/somenzz/blog-template.git
```

2. 运行看效果，修改成自己满意的配置。

```sh
cd blog-template
npm install && npm run dev
```

配置文件位于为 `docs/.vuepress`，请逐行检查，把博客名称，描述，图片位置，颜色配置等，改成自己满意的的即可。

评论取的 appId、appKey 见 `docs/.vuepress/config/theme/index.js` 文件，请先去 [valine](https://valine.js.org/)，申请自己的 appId 及 appKey。 

3. 写博客。

```sh
cd blog-template
vi docs/blog/2021/blog.md
npm run build #生成静态文件，一般在 public 目录下，该目录可以部署到服务器，使用 nginx 驱动
```

4. 提交到自己的 xxx.github.io 仓库。

先在 github 上创建一个 xxx.github.io 仓库

```sh
cd blog-template/public
git init
git add .
git commit -m "add article"
git push --force https://github.com/xxx/xxx.github.io.git master #可以强制提交，这个仓库仅保留静态文件
```
push 之后去 xxx.github.io 仓库的设置页面，设置 githup pages 指定 master 分支的 root 路径即可。 

看到一些人会使用同一个仓库设置两个分支，比如说 master 用于些博客，gh-pages 用于保存静态资源。

我反对这种做法，因为这违背了 github 分支的用途，一般 master 分支不够用的时候，我们创建 develop 分支，用于开发时，修改任何代码不会影响 master 分支，开发、测试完成，形成稳定版本，再将 develop 分支合并到 master 分支，其实 master 和 develop 就是同一个仓库的两个指针，指向不同的时间点，所谓的合并就是将 master 的指针指向 develop 的位置。

而本应用中 master 存放些博客的脚手架，如 md 文件，VuePress 等配置信息，gh-pages 只存放静态文件，两个仓库的文件没有任何共同之处，应该使用两个仓库，而不是两个分支。而且就算用，这两个分支也永远没有合并的可能，何况这样做相当麻烦，每次提交到 gh-pages 你都需要先切换到 gh-pages 分支，然后将 master 分支下的 `.git` 文件夹先移走，提交完在移动回来。

博客生成的 public 目录，也可以再部署到 gitee pages，或自己的服务器，也可以同时部署。

5. 访问自己的博客，比如 https://somenzz.github.io 

6. 如果需要提交 GitHub 后自动部署，请参考我的文章 [GitHub Actions入门教程：自动化部署静态博客](https://mp.weixin.qq.com/s/5lDtNppd3foWGHUJ1_RrDg?scene=156&subScene=10008)


## 最后

静态博客部署是 0 成本，高效率，无需担心网络安全等问题，值得每一个写作者尝试，省下的精力可以专心写做，此外，你也可以申请一个个性的域名直接指向 xxx.github.io 这个网站，比如我的 https://somenzz.cn 。

如果觉得本文不错，欢迎关注我的公众号「Python七号」，有任何问题，都可以公众号聊天界面直接咨询哦，我会第一时间回复。