# blog-template

## 介绍

基于 VuePress 的静态博客生成器，主题为：[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

已完以下配置：

1. 评论模块。使用 [valine](https://valine.js.org/)，请自行配置 appId 及 appKey。
2. seo 的配置。参考[https://www.geekzl.com/vuepress-seo-tips.html](https://www.geekzl.com/vuepress-seo-tips.html)。
3. 访问量。 

## 使用方法

非常简单。

1. 克隆本项目。

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
npm run build
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

5. 访问自己的博客，比如 https://somenzz.github.io 

6. 如果需要提交后自动部署，请参考我的文章 [GitHub Actions入门教程：自动化部署静态博客](https://mp.weixin.qq.com/s/5lDtNppd3foWGHUJ1_RrDg?scene=156&subScene=10008)


## 最后

如果觉得本文不错，欢迎关注我的公众号「Python七号」，有任何问题，都可以公众号回复问题咨询哦。

![](python-seven.png)
