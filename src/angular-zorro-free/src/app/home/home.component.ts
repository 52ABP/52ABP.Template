import { Component, Injector, AfterViewInit, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ACLService } from '@delon/acl';
import { AdvertisingComponent } from '@app/advertising/advertising.component';
// import { AdvertisingComponent } from '@app/advertising/advertising.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],

  animations: [appModuleAnimation()],
})
export class HomeComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private http: _HttpClient,
    public msg: NzMessageService,
    private aclService: ACLService
  ) {
    super(injector);
  }

  members = [
    {
      id: 'members-1',
      title: '52ABP社区',
      logo: 'https://avatars2.githubusercontent.com/u/33684174?s=200&v=4',
      link:
        // tslint:disable-next-line:max-line-length
        'https://www.52abp.com',
    },
    {
      id: 'members-2',
      title: '视频课程：网易云云课堂',
      logo: 'http://pp.myapp.com/ma_icon/0/icon_11357537_1529483301/256',
      link:
        'http://study.163.com/provider/400000000309007/course.htm?share=2&shareId=400000000309007',
    },
    {
      id: 'members-1',
      title: '微信公众号-角落的白板报',
      logo:
        'http://wx.qlogo.cn/mmhead/Q3auHgzwzM6PQV7JWIpJ2seavD5UuzCVWPyZs0SVqFkdYRyc3HQUkg/0',
      link:
        // tslint:disable-next-line:max-line-length
        'https://mp.weixin.qq.com/profile?src=3&timestamp=1532171698&ver=1&signature=hRm1TI4zh80GpKxR5LYIc9SyUcyUPiM1EE8qlUdm4dbNzP06DOfA0HKfgajY2Dyj2xku0anPcrOwE8f7mjlwxg==',
    },
    {
      id: 'members-3',
      title: '视频课程：腾讯课堂',
      logo:
        'http://is4.mzstatic.com/image/thumb/Purple111/v4/06/e9/d3/06e9d3e2-4e07-f556-a765-7c8749f09c12/source/1200x630bb.jpg',
      link: 'https://ke.qq.com/course/287301?tuin=2522cdf3',
    },

    {
      id: 'members-5',
      title: 'github源代码',
      logo: 'https://major.io/wp-content/uploads/2014/08/github.png',
      link: 'https://github.com/52ABP/LTMCompanyNameFree.YoyoCmsTemplate',
    },
    {
      id: 'members-5',
      title: '微软MVP',
      logo: 'https://mvp.microsoft.com/Content/Images/mvp-banner.png',
      link: 'https://mvp.microsoft.com/zh-CN/PublicProfile/5002741',
    },
    {
      id: 'members-4',
      title: '博客园-博文地址',
      logo: '',
      link: 'https://www.cnblogs.com/wer-ltm/',
    },

    {
      id: 'members-5',
      title: '博文地址:知乎专栏',
      logo:
        'http://wx.qlogo.cn/mmhead/Q3auHgzwzM6PQV7JWIpJ2seavD5UuzCVWPyZs0SVqFkdYRyc3HQUkg/0',
      link: 'https://zhuanlan.zhihu.com/52abp',
    },
    // 、、https://github.com/52ABP/LTMCompanyNameFree.YoyoCmsTemplate
  ];

  notice: any[] = [
    {
      logo: 'https://docs.microsoft.com/zh-cn/dotnet/images/hub/netcore.svg',
      title: '.NET Core',
      href: 'https://dotnet.github.io/',
      description: '.NET CORE 是微软新一代的跨平台的框架， 是.NET Framework的进化版本,.NET Core的核心点： 创新、开源、跨平台，当前版本为.net core2.x'
    },
    {
      logo: 'https://aspnetboilerplate.com/images/logos/abp-logo-long.png',
      title: 'ABP',
      href: 'https://aspnetboilerplate.com/',
      description: 'ASP.NET Boilerplate是一个用最佳实践和流行技术开发现代WEB应用程序的新起点，它旨在成为一个通用的WEB应用程序框架和项目模板框架'
    },
    {
      logo: 'https://avatars2.githubusercontent.com/u/33684174?s=200&v=4',
      title: '52ABP',
      href: 'https://www.52abp.com',
      description: '52ABP是一个将目前流行的框架进行了整合，核心以ABP框架和ng-zorro为标准进行研发的应用型框架信息。'
    },
    {
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: 'Angular',
      href: 'https://aspnetboilerplate.com/',
      description: 'Angular 是一个开发平台。它能帮你更轻松的构建 Web 应用。Angular 集声明式模板、依赖注入、端到端工具和一些最佳实践于一身，为你解决开发方面的各种...'
    },
    {
      logo: 'https://ng.ant.design/assets/img/logo.svg',
      title: 'NG-ZORRO',
      href: 'https://ng.ant.design',
      description: '这里是 Ant Design 的 Angular 实现，开发和服务于企业级后台产品。也是52ABP框架的前端核心之一'
    },
    {
      logo: 'https://ng-alain.com/assets/img/logo-color.svg',
      title: 'NG Alain',
      href: 'https://ng-alain.com/',
      description: '一个基于 Antd的设计，整合了NG-ZORRO的 中后台前端解决方案，提供更多通用性业务模块，让开发者更加专注于业务。'
    }
  ];
  loading = false;

  ngOnInit(): void {

  }

  showAdvertising() {
    this.modalHelper.open(AdvertisingComponent)
      .subscribe(() => {

      });
  }
}
