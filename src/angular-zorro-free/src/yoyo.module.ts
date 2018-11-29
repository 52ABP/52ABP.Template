/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://github.com/ng-alain/ng-alain/issues/180
 */
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';

import { AlainThemeModule } from '@yoyo/theme';
import { DelonABCModule, STConfig, PageHeaderConfig } from '@yoyo/abc';
import { DelonChartModule } from '@yoyo/chart';
import { DelonCacheModule } from '@yoyo/cache';
import { DelonUtilModule } from '@yoyo/util';

// #region mock
import { DelonMockModule } from '@yoyo/mock';
import { environment } from '@env/environment';

// #endregion

// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
import { RouteReuseStrategy } from '@angular/router';
import { ReuseTabService, ReuseTabStrategy } from '@yoyo/abc/reuse-tab';
const REUSETAB_PROVIDES = [
  {
    provide: RouteReuseStrategy,
    useClass: ReuseTabStrategy,
    deps: [ReuseTabService],
  },
];
// #endregion

// #region global config functions

export function fnPageHeaderConfig(): PageHeaderConfig {
  let config = new PageHeaderConfig();
  config.icon = {
    type: "icon",
    value: "home",
  };
  config.homeI18n = 'Home';
  config.home = '首页';
  return config;
}



export function fnSTConfig(): STConfig {
  return Object.assign(new STConfig(), <STConfig>{
    modal: { size: 'lg' },
  });
}

const GLOBAL_CONFIG_PROVIDES = [
  // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
  { provide: STConfig, useFactory: fnSTConfig },
  { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
];

// #endregion

@NgModule({
  imports: [
    AlainThemeModule.forRoot(),
    DelonABCModule.forRoot(),
    DelonChartModule.forRoot(),
    DelonCacheModule.forRoot(),
    DelonUtilModule.forRoot(),
    // mock
  ],
})
export class YoYoModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: YoYoModule,
  ) {
    if (parentModule) {
      throw new Error(`YoYoModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: YoYoModule,
      providers: [...REUSETAB_PROVIDES, ...GLOBAL_CONFIG_PROVIDES],
    };
  }
}
