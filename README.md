# blog-template

## 介绍

基于 VuePress 的静态博客生成器，主题为：[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

已完以下配置：

1. 评论模块。使用 [valine](https://valine.js.org/)，请自行配置 appId 及 appKey。
2. seo 的配置。参考[https://www.geekzl.com/vuepress-seo-tips.html](https://www.geekzl.com/vuepress-seo-tips.html)。
3. 访问量。 

## 使用方法非常简单


1. 克隆本项目。

```sh
git clone https://github.com/somenzz/blog-template.git
```

2. 运行看效果，修改成自己满意的配置。

```sh
cd blog-template
npm install && npm run dev
```

配置文件位于为 `docs/.vuepress`，请逐行检查哪些需要改成自己的即可。

评论取的 appId、appKey 见 `docs/.vuepress/config/theme/index.js` 文件，请先去 [valine](https://valine.js.org/)，申请自己的 appId 及 appKey。 

3. 写博客。

```sh
cd blog-template
vi docs/blog/2021/blog.md
npm run build
```

4. 提交到自己的 xxx.github.io 仓库

想创建一个 xxx.github.io 仓库

```sh
cd blog-template/public
git init
git add .
git commit -m "add article"
git push --force https://github.com/xxx/xxx.github.io.git master
```
push 之后去 xxx.github.io 仓库的设置页面，设置 githup pages 指定 master 分支的 root 路径即可。 

5. 访问自己的博客 https://xxx.github.io 

6. 如果需要提交后自动部署，请参考我的文章 [GitHub Actions入门教程：自动化部署静态博客](https://mp.weixin.qq.com/s/5lDtNppd3foWGHUJ1_RrDg?scene=156&subScene=10008)


## 最后

如果觉得本文不错，欢迎关注我的公众号「Python七号」，有任何问题，都可以公众号回复问题咨询哦。

![](python-seven.png)
