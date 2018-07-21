import { MockRequest } from '@delon/mock';

// region: mock data

const titles = [
  '.NET CORE',
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
  'NG-ZORRO',
  'Ng Alain',
  'ABP',
  '52ABP',
];

const avatars = [
  'https://docs.microsoft.com/zh-cn/dotnet/images/hub/netcore.svg', // .net core
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
  'https://ng.ant.design/assets/img/logo.svg', // NG-ZORRO  9
  'https://ng-alain.com/assets/img/logo-color.svg', // ng -alain 10
  'https://aspnetboilerplate.com/images/logos/abp-logo-long.png', // abp
  'https://avatars2.githubusercontent.com/u/33684174?s=200&v=4', // 52abp  12
];
const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/alaPpKWajEbIYEUvvVNf.png',
  'https://gw.alipayobjects.com/zos/rmsportal/RLwlKSYGSXGHuWSojyvp.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '卡色',
  'cipchk',
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

// endregion

function getFakeList(count: number = 20): any[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover:
        parseInt((i / 4).toString(), 10) % 2 === 0
          ? covers[i % 4]
          : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar:
            'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

function getNotice(): any[] {
  return [
    {
      id: 'xxx1',
      title: titles[0],
      logo: avatars[0],
      description:
        '.NET CORE 是微软新一代的跨平台的后端框架， 是.NET Framework的进化版本,.NET Core的核心点： 创新、开源、跨平台，当前版本为.net core2.x',
      updatedAt: new Date(),
      member: '科学搬砖组',
      href: '微软牛逼',
      memberLink: '.net core',
    },
    {
      id: 'xxx6',
      title: titles[11],
      logo: avatars[11],
      description:
        'ASP.NET Boilerplate是一个用最佳实践和流行技术开发现代WEB应用程序的新起点，它旨在成为一个通用的WEB应用程序框架和项目模板框架',
      updatedAt: new Date('2017-07-23'),
      member: '还在思考中',
      href: 'ABP框架  土牛威武  ',
      memberLink: '',
    },
    {
      id: 'xxx6',
      title: titles[12],
      logo: avatars[12],
      description:
        '52ABP是一个将目前流行的框架进行了整合，核心以ABP框架和ng-zorro为标准进行研发的应用型框架信息。',
      updatedAt: new Date('2017-07-23'),
      member: '还在思考中',
      href: 'ABP框架  土牛威武  ',
      memberLink: '',
    },
    {
      id: 'xxx2',
      title: titles[2],
      logo: avatars[2],
      description:
        'Angular 是一个开发平台。它能帮你更轻松的构建 Web 应用。Angular 集声明式模板、依赖注入、端到端工具和一些最佳实践于一身，为你解决开发方面的各种挑战。Angular 为开发者提升构建 Web、手机或桌面应用的能力。',
      updatedAt: new Date('2017-07-24'),
      member: '全组都是吴彦祖',
      href: 'Angular',
      memberLink: 'Angular',
    },

    {
      id: 'xxx4',
      title: titles[9],
      logo: avatars[9],
      description:
        '这里是 Ant Design 的 Angular 实现，开发和服务于企业级后台产品。也是52ABP框架的前端核心之一    ',
      updatedAt: new Date('2017-07-23'),
      member: '设计天团',
      href: 'NG-ZORRO',
      memberLink: 'NG-ZORRO',
    },
    {
      id: 'xxx5',
      title: titles[10],
      logo: avatars[10],
      description:
        '一个基于 Antd的设计，整合了NG-ZORRO的 中后台前端解决方案，提供更多通用性业务模块，让开发者更加专注于业务。',
      updatedAt: new Date('2017-07-23'),
      member: '骗你来学计算机',
      href: 'Ng Alain   ',
      memberLink: '',
    },
  ];
}

function getActivities(): any[] {
  return [
    {
      id: 'trend-1',
      updatedAt: new Date(),
      user: {
        name: '林东东',
        avatar: avatars[0],
      },
      group: {
        name: '高逼格设计天团',
        link: 'http://github.com/',
      },
      project: {
        name: '六月迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
    {
      id: 'trend-2',
      updatedAt: new Date(),
      user: {
        name: '付小小',
        avatar: avatars[1],
      },
      group: {
        name: '高逼格设计天团',
        link: 'http://github.com/',
      },
      project: {
        name: '六月迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
    {
      id: 'trend-3',
      updatedAt: new Date(),
      user: {
        name: '曲丽丽',
        avatar: avatars[2],
      },
      group: {
        name: '中二少女团',
        link: 'http://github.com/',
      },
      project: {
        name: '六月迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
    {
      id: 'trend-4',
      updatedAt: new Date(),
      user: {
        name: '周星星',
        avatar: avatars[3],
      },
      project: {
        name: '5 月日常迭代',
        link: 'http://github.com/',
      },
      template: '将 @{project} 更新至已发布状态',
    },
    {
      id: 'trend-5',
      updatedAt: new Date(),
      user: {
        name: '朱偏右',
        avatar: avatars[4],
      },
      project: {
        name: '工程效能',
        link: 'http://github.com/',
      },
      comment: {
        name: '留言',
        link: 'http://github.com/',
      },
      template: '在 @{project} 发布了 @{comment}',
    },
    {
      id: 'trend-6',
      updatedAt: new Date(),
      user: {
        name: '乐哥',
        avatar: avatars[5],
      },
      group: {
        name: '程序员日常',
        link: 'http://github.com/',
      },
      project: {
        name: '品牌迭代',
        link: 'http://github.com/',
      },
      template: '在 @{group} 新建项目 @{project}',
    },
  ];
}

export const APIS = {
  '/api/list': (req: MockRequest) => getFakeList(req.queryString.count),
  '/api/notice': () => getNotice(),
  '/api/activities': () => getActivities(),
};
