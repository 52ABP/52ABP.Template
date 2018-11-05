# 教程
## 收费课程
- 网易课程地址：[https://study.163.com/provider/400000000309007/index.htm?share=2&shareId=400000000309007](https://study.163.com/provider/400000000309007/index.htm?share=2&shareId=400000000309007)
## 免费公开课：
- ABP的公开课地址：[https://study.163.com/course/introduction/1005208064.htm](https://study.163.com/course/introduction/1005208064.htm)
- .NET CORE 开发框架ABP的系统性学习路线图:https://www.bilibili.com/video/av31334354
- 在10分钟内上手Angular - Google的前后端分离框架快速体验  https://www.bilibili.com/video/av31231940
# 快速启动方式

首先保证自己已经安装了yarn

- 包还原工具。yarn下载地址：https://www.yarnpkg.com/zh-Hans/
- 推荐前端工具：Vscode 

通过Vscode打开文件夹，然后在客户端下输入



```
yarn install            还原组件信息

 

npm start        启动项目
```


# 前端项目结构说明

本项目是通过 Angular CLI 构建的项目，但是为了符合 ABP 的开发方式，以及满足 DDD 的架构模式，将各个模块进行了剥离和拆分。所以目录结构也和标准的 NG CLI 项目结构发生了变化。

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


# ng-alain 介绍

[Ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) 是蚂蚁金服推出的前端管理端框架

 
[在线DEMO](https://ng-alain.github.io/ng-alain/)

 
 
 

## 相关链接地址

+ [Document](http://ng-alain.com)
+ [@delon](https://github.com/cipchk/delon)
+ [在线DEMO](https://ng-alain.github.io/ng-alain/)


## Delon

[delong](https://github.com/cipchk/delon) is a production-ready solution for admin business components packages, Built on the design principles developed by Ant Design.

[![Build Status](https://travis-ci.org/cipchk/delon.svg?branch=master)](https://travis-ci.org/cipchk/delon)
[![Dependency Status](https://david-dm.org/cipchk/delon/status.svg)](https://david-dm.org/cipchk/delon)
[![DevDependency Status](https://david-dm.org/cipchk/delon/dev-status.svg)](https://david-dm.org/cipchk/delon?type=dev)

[![npm](https://img.shields.io/npm/l/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme)
[![npm](https://img.shields.io/npm/dm/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme)

| package name | version                                                                                                     | next version                                                                                                     |
| ------------ | :---------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: |
| @delon/theme | [![NPM version](https://img.shields.io/npm/v/@delon/theme.svg)](https://www.npmjs.com/package/@delon/theme) | [![NPM version](https://img.shields.io/npm/v/@delon/theme/next.svg)](https://www.npmjs.com/package/@delon/theme) |
| @delon/abc   | [![NPM version](https://img.shields.io/npm/v/@delon/abc.svg)](https://www.npmjs.com/package/@delon/abc)     | [![NPM version](https://img.shields.io/npm/v/@delon/abc/next.svg)](https://www.npmjs.com/package/@delon/abc)     |
| @delon/form  | [![NPM version](https://img.shields.io/npm/v/@delon/form.svg)](https://www.npmjs.com/package/@delon/form)   | [![NPM version](https://img.shields.io/npm/v/@delon/form/next.svg)](https://www.npmjs.com/package/@delon/form)   |
| @delon/acl   | [![NPM version](https://img.shields.io/npm/v/@delon/acl.svg)](https://www.npmjs.com/package/@delon/acl)     | [![NPM version](https://img.shields.io/npm/v/@delon/acl/next.svg)](https://www.npmjs.com/package/@delon/acl)     |
| @delon/auth  | [![NPM version](https://img.shields.io/npm/v/@delon/auth.svg)](https://www.npmjs.com/package/@delon/auth)   | [![NPM version](https://img.shields.io/npm/v/@delon/auth/next.svg)](https://www.npmjs.com/package/@delon/auth)   |
| @delon/mock  | [![NPM version](https://img.shields.io/npm/v/@delon/mock.svg)](https://www.npmjs.com/package/@delon/mock)   | [![NPM version](https://img.shields.io/npm/v/@delon/mock/next.svg)](https://www.npmjs.com/package/@delon/mock)   |
| @delon/cache | [![NPM version](https://img.shields.io/npm/v/@delon/cache.svg)](https://www.npmjs.com/package/@delon/cache) | [![NPM version](https://img.shields.io/npm/v/@delon/cache/next.svg)](https://www.npmjs.com/package/@delon/cache) |
| @delon/util  | [![NPM version](https://img.shields.io/npm/v/@delon/util.svg)](https://www.npmjs.com/package/@delon/util)   | [![NPM version](https://img.shields.io/npm/v/@delon/util/next.svg)](https://www.npmjs.com/package/@delon/util)   |

 
 
 
### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ng-alain/blob/master/LICENSE) file for the full text)
