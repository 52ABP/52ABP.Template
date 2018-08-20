/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://github.com/cipchk/ng-alain/issues/180
 */
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@yoyo/theme';
import { DelonABCModule, ReuseTabService, ReuseTabStrategy } from '@yoyo/abc';
import { DelonCacheModule } from '@yoyo/cache';
import { DelonUtilModule } from '@yoyo/util';


import { environment } from '@env/environment';

// region: global config functions
import { AdPageHeaderConfig } from '@yoyo/abc';
export function pageHeaderConfig(): AdPageHeaderConfig {
  return Object.assign(new AdPageHeaderConfig(), { home_i18n: 'home' });
}


// endregion

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forRoot(),
    DelonABCModule.forRoot(),
    DelonCacheModule.forRoot(),
    DelonUtilModule.forRoot(),
  ],
})
export class YoYoModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: YoYoModule,
  ) { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: YoYoModule,
      providers: [
        // TIPS：若不需要路由复用需要移除以下代码及模板`<reuse-tab></reuse-tab>`
        {
          provide: RouteReuseStrategy,
          useClass: ReuseTabStrategy,
          deps: [ReuseTabService],
        },
        // TIPS：@yoyo/abc 有大量的全局配置信息，例如设置所有 `simple-table` 的页码默认为 `20` 行
        // { provide: SimpleTableConfig, useFactory: simpleTableConfig }
        { provide: AdPageHeaderConfig, useFactory: pageHeaderConfig },
      ],
    };
  }
}
