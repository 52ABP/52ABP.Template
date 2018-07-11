# LTMCompanyName.YoyoCmsTemplate
## 一、什么是 52ABP ？

基于.NET  Core 版本为2.1， 整个框架使用的是ABP(ASP.NET Boilerplate)，前端这次使用的是ng-alain 。
可以说作为一个内容整合商，52abp 的第一个正式开源的免费项目，您可以基于这个项目进行升级和扩展属于自己自定义的功能模块。

关于ABP的后端文档，详情参看：https://aspnetboilerplate.com/Pages/Documents

关于ng-alain的官方文档，详情参考：https://ng-alain.com/docs/getting-started

本次着重说明的是前端项目的文档。 本文档的大部分内容是从ng-alain官方摘录，因为是你的前端框架嘛。。 


## 二、前端项目的说明

**如何阅读文档**

在开始之前有一些文档描述约定说明，这有助于更好的阅读：

- API相关
  - `[]` 表示属性
  - `()` 表示事件
  - `[()]` 表示双向绑定
  - `ng-content` 表示组件内容占位符
  - `#tpl` 开头表示 `<ng-template #tpl>`
- 对象相关，一般在类描述时
  - `[]` 表示属性
  - `()` 结尾表示方法

## 三、环境准备

本地环境需要您安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。我们的技术栈基于 [Typescript](https://www.tslang.cn/)、[Angular](https://angular.io/)、[g2](http://g2.alipay.com/)、[@delon](https://github.com/cipchk/delon) 和 [ng-zorro-antd](https://ng.ant.design/)，提前了解和学习这些知识会非常有帮助。

## 四、目录结构

本项目是通过Angular CLI构建的项目，但是为了符合ABP的开发方式，以及满足DDD的架构模式，将各个模块进行了剥离和拆分。所以目录结构也和标准的NG CLI 项目结构发生了变化。

```
├─src
│  │  AppPreBootstrap.ts    # ABP前端项目的启动组件，
│  │  delon.module.ts          # ng-alian的核心组件，delon
│  │  favicon.ico
│  │  hmr.ts
│  │  index.html
│  │  main.ts
│  │  polyfills.ts
│  │  root-routing.module.ts   # 最外部的根路由，判断是否登录
│  │  root.component.ts          # 根组件
│  │  root.module.ts               #根模块
│  │  styles.less                      #全局样式
│  │  typings.d.ts               # 定义的abp框架中会使用到的方法和模块名称的一些常量
│  │  
│  ├─account
│  │  │  account.module.ts           # 负责整个账号体系的模块如：登录、注册、布局、租户管理等
│  │  ├─layout
│  │  │      account-languages.component.ts  # 控制登录、注册、租户登录的布局控件
│  │  ├─login
│  │  │      login.service.ts # 提供登录注册的方法
│  │  ├─register
│  │  │      register.component.ts # 注册组件
│  │  └─tenant
│  │          tenant-change.component.ts   # 切换租户名称登录的组件
│  ├─app
│  │  │  app-routing.module.ts    # 中后台管理的路由总控
│  │  │  app.component.ts  # 52abp应用的核心组件
│  │  │  app.module.ts   # 52abp应用的核心模块
│  │  ├─home
│  │  │      home.component.ts  # 后端首页组件-类似控制台
│  │  │      
│  │  ├─layout
│  │  │  │  layout.module.ts # 后端的布局模块
│  │  │  │  
│  │  │  ├─default
│  │  │  │  │  default.component.ts  # 布局的默认内容
│  │  │  │  │  
│  │  │  │  ├─header
│  │  │  │  │  │  header.component.ts# 布局的头部组件
│  │  │  │  │          
│  │  │  │  └─sidebar
│  │  │  │          sidebar.component.ts# 布局的左侧菜单栏组件
│  ├─assets
│  │  │  .gitkeep
│  │  │  appconfig.json #与后端交互配置的 端口号和域名
│  │     
│  │    
│  │              
│  ├─environments          # 环境变量配置
│  ├─shared
│  │  │  │  shared.module.ts  # 整个项目通用贡献的模块
│  │  │  
│  │  ├─animations                    # 路由的动画效果
│  │  │      routerTransition.ts
│  │  │      
│  │  ├─auth                          # ABP的授权管理
│  │  │      app-auth.service.ts
│  │  │      auth-route-guard.ts
│  │  │      
│  │  ├─helpers                        # 字面意思，实时通讯
│  │  │      SignalRAspNetCoreHelper.ts
│  │  │      UrlHelper.ts
│  │  │      
│  │  ├─layout            # 菜单组件
│  │  │      menu-item.ts
│  │  │      
│  │  ├─nav            #链接的服务类
│  │  │      app-url.service.ts
│  │  │      
│  │  ├─service-proxies                # 动态生成的crud接口的代理类
│  │  │      service-proxies.ts
│  │  │      service-proxy.module.ts
│  │  │      
│  │  └─session                                   # ABP所提供的Session 服务方法，提供一些基本的用户信息
│  │          app-session.service.ts
│  │          
│  ├─styles                  # 可以基于ng-alain 的基础样式上进行调整
│  │      index.less
│  │      theme.less
│  │      
│  └─testing
│          common.spec.ts
│          
├─_mock                      # Mock 数据规则
        
```

 # 启动项目
从事前端开发由yarn和npm两个包管理器，个人推荐使用yarn，还原上比npm有点优势。


```

yarn install            还原组件信息


npm start        启动项目


```

以上就是项目的简单说明，以后有时间，再继续给大家交流。也欢迎大家来完善内容。




