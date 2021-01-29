---
title: GitHub Actions入门教程：自动化部署静态博客
date: 2021-01-24
permalink: /auto-deploy-blog-by-github-actions.html
tags:
 - GitHub Actions
categories:
 - 工具
---

文章首发于公众号【Python七号】欢迎关注。

前天，我使用 GitHub Actions 实现了静态博客的自动化部署，觉得它非常强大，只要你提交到 GitHub，后面的部署完全由 GitHub 自动完成。

这里提到静态博客，所谓静态博客，就是通过生成工具（eg：Hexo、Hugo、VuePress 等），直接将作者所书写的博文编译成最终的 html、css、js 等静态文件。然后只需将生成的文件部署在服务器（eg：GitHub、Gitee、自建服务器）上面即可被在互联网中访问。

一般这类静态博客部署的流程是：

1. 写一篇 markdown 文章。
2. 执行命令生成静态文件，比如 `npm run build`。
3. 将静态文件推送到博客仓库，比如说 GitHub、Gitee 或者服务器，如果是 Gitee，还要手动点击重新部署按钮。 
4. 访问网址验证是否成功
5. 为了备份你的博客，你可能要将你写博客的项目也推送到仓库。

博客就是用来写文章的，每次写篇文章还要搞这么多操作，时间长了你一定会觉得很累。

现在，你不会觉得累了，使用了 GitHub Actions 之后，流程可以简化为：

1. 写一篇 markdown 文章。
2. 提交到 GitHub。（这一步相当于上面的第 5 步，不需要上传 node_modules 文件夹)

结束了，是不是很方便？

当然了，不止博客的部署，任意软件的持续集成，都可以由 GitHub Actions 来完成，比如拉取代码、运行测试、登录远程服务器，发布到第三方服务等。因此 GitHub Actions 是实现自动化发布最便捷的方式了，值得每一个程序员学习和使用。

接下来，我以 GitHub Actions 实现静态博客的自动化部署为例，带你入门 GitHub Actions，如有任何问题，欢迎文末留言讨论。

本文的方法可以大大简化静态博客的部署流程，从机械的流程中解脱，专注于写作，岂不美哉！那么现在就开始 GitHub Actions 之旅吧。

## 1. 先定一个小目标

假如有以下四个仓库：

1. git@github.com:somenzz/push_blog：写博客的项目仓库，里面有用于生成博客的 md 文件，和生成静态博客的脚手架，比如 VuePress，hexo 等，该仓库可以私有。
2. git@github.com:somenzz/somenzz.github.io：存放博客的静态资源文件，用于 GitHub Pages 展示博客，必须开源。
3. git@gitee.com/somenzz/somenzz：存放博客的静态资源文件，用于 Gitee Pages 展示博客，必须开源。
4. ip 地址：xxx.xxx.xxx.xxx，或者域名 somenzz.cn，路径 /xxxx/public/，是自己购买的服务器，用于存放静态博客资源文件。

现在的目标就是，写好一篇文章，向仓库 1 推送之后，仓库 2、3、4 自动更新静态资源文件。当然了，你也可以根据自己情况，选择性的更新 2、3、4 中的一个或多个，只需要将对应的步骤从 GitHub Actions 配置中注释或删除即可。

## 2. 理解 GitHub Actions 

这里说下我对 GitHub Actions 的理解，你提交到仓库 1 后，GitHub 会监控到，然后分配一台虚拟机先将你的项目 checkout 过去，然后按照你指定的 step 顺序执行定义好的 action，这些 action 就包括 `npm run build` 生成静态文件，push 到你指定的仓库等动作。

这就不可避免的涉及一些访问权限的控制，你要向 GitHub 证明你对这些仓库有控制权限，有些操作，还需要你提供 RSA 的私钥，登录的口令，当然了，这些口令都是加密存放的，不会泄漏，可放心使用。

为了实现上面的小目标，我们要让 GitHub 替我们做的事情如下：

1. 编译项目，生成静态文件。也就是对仓库 1: git@github.com:somenzz/push_blog，执行 npm run build 生成博客的静态资源。
2. 将静态资源 push 到 GitHub，也就是 push 到仓库 2: git@github.com:somenzz/somenzz.github.io，这一步完成后 GitHub Pages 就部署完成了。
3. 将仓库 2 同步给仓库 3，也就是 git@github.com:somenzz/somenzz.github.io 同步给 git@gitee.com/somenzz/somenzz，这样两个项目的静态资源就一致了。
4. 部署 Gitee Pages，因为 Gitee 的限制，需要手动点一下更新，现在把这一步变成一个 GitHub action。
5. 使用 rsync 增量同步工具，将静态资源同步的自购服务器的对应目录上。 


## 3.  一步一步跟我操作

现在，我们一步一步来。

首先在仓库 1 的根目录下，创建 `.github/workflows/main.yml` 文件，这就是 GitHub Actions 功能的配置文件，用于告诉 GitHub 要做哪些事情，写入以下内容

```yml
name: Deploy GitHub Pages

# 触发条件：在 push 到 master 分支后
on:
  push:
    branches:
      - master

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 1、生成静态文件
      - name: Build
        run: npm install && npm run build

      # 2、部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          REPOSITORY_NAME: somenzz/somenzz.github.io
          BRANCH: master
          FOLDER: public  
          #注意这里的 public 是仓库根目录下的 public，也就是 npm run build 生成静态资源的路径，比如有的人是 `docs/.vuepress/dist`

      # 3、同步到 gitee 的仓库
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:somenzz/somenzz.github.io.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:somenzz/somenzz.git

      # 4、部署到 Gitee Pages
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: somenzz
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: somenzz/somenzz
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: master

      # 5、部署到 somenzz.cn 服务器
      - name: rsync deployments
        uses: burnett01/rsync-deployments@4.1
        with:
          # 这里是 rsync 的参数 switches: -avzh --delete --exclude="" --include="" --filter=""
          switches: -avzh
          path: public/
          remote_path: /home/ubuntu/public/
          remote_host: somenzz.cn
          remote_port: 22
          remote_user: ubuntu
          remote_key: ${{ secrets.MY_UBUNTU_RSA_PRIVATE_KEY }}
```

稍微有点长，为了便于你理解，每一步我都有注释，这就是实现这个小目标需要的全部内容，内容遵循 YAML 格式，这里我做一个大致的说明：

- on 表示触发条件
- jobs 表示要做的工作
- jobs 下的 step 表示要做的步骤，前一步失败，后面不会继续执行。
- jobs 下的 step 下有 name、uses、with 等，表示一个 action。
- name 表示 action 的名称，uses 表示使用哪个插件，with 表示传给插件的参数。
- `secrets.XXX` 这个 XXX 表示本仓库的环境变量，配置在仓库设置里面的 secrets 菜单栏，都是加密的。

uses 中用的就是别人写好的插件，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等，这些操作都用共性，GitHub 就允许其他人把写好的插件共享到插件市场供其他人使用，因此如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，你说方便不方便，插件市场见本文的学习资源小节。。

上述文件 `.github/workflows/main.yml` 写好之后，先别着急 push，一旦 push，这些 actions 就会执行，在参数正确的配置之前，报错那是肯定的。

接下来我说一下一些参数的意义以及如何确定这些参数的值。

### 1、secrets.ACCESS_TOKEN 

对应的配置代码：
```yml
      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          REPOSITORY_NAME: somenzz/somenzz.github.io
          BRANCH: master
          FOLDER: public
```

这个 ACCESS_TOKEN 是访问 GitHub API 的令牌，可以在 GitHub 主页，点击个人头像，Settings -> Developer settings -> Personal access tokens 进行生成或更新，第一次生成后你可以看到这个令牌，然后再也不会显示，因此你需要记下来，假如这个字符串是 aaa，然后打开仓库 1 的设置页面，设置 secrets，加入环境变量， name 是 ACCESS_TOKEN，value 是 aaa。如下图所示：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzkfeqcwvj325y0u076a.jpg)
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzlyrgndrj316p0u0dg8.jpg)
![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzkjd71okj324m0u0gnx.jpg)

这一段配置文件的作用就是，将 public 目录内的文件 push 到 somenzz/somenzz.github.io 的 master 分支，其中 public 就是 `npm run build` 生成的静态资源所在的位置。

### 2、secrets.GITEE_RSA_PRIVATE_KEY

没错，这里就是 RSA 的私钥，这里如果你不熟悉 RSA，可能会产生困惑，不是说公钥在网上传输，私钥不公开吗？ 没错，确实是这样，Gitee 上保存你账户对应的公钥，GitHub 仓库的 secrets.GITEE_RSA_PRIVATE_KEY 保存着私钥，因为 GitHub 的服务器不会让你亲自登录设置密钥对，因此需要配置 secrets.GITEE_RSA_PRIVATE_KEY 来告知 GitHub，解密操作需要的私钥并不是在网上传输，只有自己知道。

GitHub Actions 的服务器会使用你的账户登录 Gitee，Gitee 使用你的公钥加密后传输给这台服务器，这台服务器使用你设置的私钥才能解密成功，通讯完成。如果想搞懂 RSA 算法可以看我之前写的文章[一文搞懂 RSA 算法](https://mp.weixin.qq.com/s/k0FhH0RC2qxh-uljBNwbHw)，是全网讲的最明白的文章。

这里说下如何生成 RSA 的公钥和私钥。

打开终端，输入以下命令：

```python
ssh-keygen -t ed25519 -C "your_email@example.com"
```

这里的邮箱是你 Gitee 的注册邮箱。如果服务器不支持 ed25519 算法，可以这样：

```python
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
我这里使用的就是第二种，然后一路回车即可。执行完成后，在 `~/.ssh` 目录下可以看到 id_rsa、id_rsa.pub 等文件，其中私钥就是 id_rsa，公钥就是 id_rsa.pub，这就是密钥对，一个可用于加密，另一个可用于解密。

打开 gitee.com 并登录，点击自己头像右下角，选择设置-> ssh 公钥，将 id_rsa.pub 的内容复制到公钥的输入框里，公钥的标题可以自己填写，如下图所示：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmznupkkmzj31cg0u076z.jpg)

接下来设置 secrets.GITEE_RSA_PRIVATE_KEY ，在 GitHub 上打开仓库 1 的设置页面，点击 secrets，增加环境变量，name 就填写 secrets.GITEE_RSA_PRIVATE_KEY，value 就填写 id_rsa 文件的内容，如下图所示：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzo0jpt2aj31740u0tad.jpg)

id_rsa 文件的内容通常如下所示：

```sh
$ cat id_rsa
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAgEA4v2D0sH/puF4GWZdCfeontuoInVna7jxmtrnHxiOHkoIt5Mp/lMO
6kHWxpSxumQ+CAuqdVYGcsE+8FL0wCBBolpAK7jmX+S7l9wTkPJxYduOPxRBbKFKZp07R/
......
C2FVan1VGNpJ/wAAAA9zb21lbnp6QDE2My5jb20BAg==
-----END OPENSSH PRIVATE KEY-----
```

注意第一行和最后一行也是要添加进去的，不然 GitHub actions 会提示 id_rsa 格式不正确。

### 3、secrets.GITEE_PASSWORD

对应的配置文件代码段：

```yml
      # 4、部署到 Gitee Pages
      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: somenzz
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: somenzz/somenzz
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: master
```

这里就很简单了，用户名可以明文，密码一定要放在 secrets 环境变量中，即使仓库开源，也不至于泄漏自己的登录密码信息，这一步依然是在仓库 1 的设置页面添加 secrets 环境变量，和前述的操作一样，不在赘述。


### 4、secrets.MY_UBUNTU_RSA_PRIVATE_KEY

对应的配置文件代码段

```yml
      # 5、部署到 somenzz.cn 服务器
      - name: rsync deployments
        uses: burnett01/rsync-deployments@4.1
        with:
          # 这里是 rsync 的参数 switches: -avzh --delete --exclude="" --include="" --filter=""
          switches: -avzh
          path: public/
          remote_path: /home/ubuntu/public/
          remote_host: somenzz.cn
          remote_port: 22
          remote_user: ubuntu
          remote_key: ${{ secrets.MY_UBUNTU_RSA_PRIVATE_KEY }}

```

这个是自购服务器的私钥，一般情况下云服务器都会提供一个私钥文件，推荐你使用私钥登录服务器，和第二个参数的原理是一致的，如果服务器没有给你这个私钥，请自行生成一个可用于登录的私钥。

这里用到了 rsync，是一个增量同步工具，可以只传输有变化的文件，大大减轻网络带宽，具体的使用方法可参考阮一峰老师的教程：[https://www.ruanyifeng.com/blog/2020/08/rsync.html](https://www.ruanyifeng.com/blog/2020/08/rsync.html)

## 执行、验证、结果通知

以上 4 个参数配置完成之后，就可以对仓库 1 push，然后点开 GitHub 上的 actions 看下执行过程。

```sh
$ cd xxx/push_blog/
$ git add -u
$ git commit -m "add article"
$ git push
```

打开 GitHub 上的 push_blog 仓库，点击 Actions，可以看到部署的结果，结果的标题就是 commit 信息，如下图所示：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzoxfq7odj31hb0u0dij.jpg)

点击标题，可以看到详细情况：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzp5b5pakj31m00u0wg8.jpg)

再点击，可以看到每一个 action 的详情：

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzp6yi080j31bc0u0778.jpg)

接下来就是访问下网站是否正常：

- https://somenzz.github.io
- https://somenzz.gitee.io
- https://somenzz.cn
 
强制刷新下，看看新增的文章是否已经到位。

你会问了，如果报错了怎么收到通知？ 点击 Notifications 添加接受通知的邮件即可，如下图所示： 

![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzpgd1umnj31am0u0abm.jpg)

如果觉得邮件不方便，想发送到微信，可以自己编写 Python 爬取 Actions 的结果，再使用 Server酱发送到微信，使用方法参考前文[为什么很多开源项目都使用了 Server酱](https://mp.weixin.qq.com/s/ibBaPbMg202XMEaG-zifVA)


## 5. 学习资源

如果要学习 GitHub Actions 来实现自己的部署流程，以下学习资源供你参考：

1. GitHub Actions 入门教程 [http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)。

2. GitHub Actions 官方文档 [https://docs.github.com/en/actions](https://docs.github.com/en/actions)。

3. GitHub Actions 官方插件市场[https://github.com/marketplace?type=actions](https://github.com/marketplace?type=actions)。

4. awesome-actions [https://github.com/sdras/awesome-actions](https://github.com/sdras/awesome-actions)。

## 最后的话

GitHub 的 Actions 除了支持 push 触发，也支持 schedule 触发，这就可以玩出很多花样了，比如你可以在仓库中写一个脚本，然后编写 workflow 让 GitHub 每天定时执行，相当于免费获得了服务器的计算资源，可以参考阮一峰老师的文章[GitHub Actions 教程：定时发送天气邮件](http://www.ruanyifeng.com/blog/2019/12/github_actions.html), 对于没有服务器跑定时任务的人来说真的是一大福利。

本文讲述了如何编写 workflow，让 GitHub Actions 自动化部署静态博客，可以让程序员专心的写博客，无需处理重复的部署操作，提升写作效率。在这里抛砖引玉，供各位博客大佬参考使用，不写博客，也可以修改下，变成自己的部署工作流。最后，GitHub Actions 是一个 CI/CD（持续集成/持续部署）工具，值得每一个程序员学习使用。

如果你觉得本文有价值，请点赞、在看、转发，谢谢支持。

![扫一扫关注我](https://tva1.sinaimg.cn/large/008eGmZEgy1gmzvzenklmj31gd0hcjue.jpg)
