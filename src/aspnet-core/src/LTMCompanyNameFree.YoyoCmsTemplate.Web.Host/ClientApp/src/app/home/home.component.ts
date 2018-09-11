import { Component, Injector, AfterViewInit, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { _HttpClient } from '@yoyo/theme';
import { NzMessageService } from 'ng-zorro-antd';

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

  notice: any[];
  loading = true;

  ngOnInit(): void {

  }
}
