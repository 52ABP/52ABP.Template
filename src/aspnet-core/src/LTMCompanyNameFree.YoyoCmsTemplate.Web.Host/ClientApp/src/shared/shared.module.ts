import { CustomComponentModule } from '@shared/components/custom-components.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@yoyo/abp';
import { RouterModule } from '@angular/router';

import { AppSessionService } from '@shared/session/app-session.service';
import { AppUrlService } from '@shared/nav/app-url.service';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';

/**
 * 第三方的一些组件模块
 */
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
  CustomComponentModule,
];
// import { DelonABCModule } from '../../node_modules/yoyo-ng-module/abc';
import { DelonABCModule, AdPageHeaderConfig } from '@yoyo/abc';
import { AlainThemeModule, ModalHelper } from '@yoyo/theme';

// endregion

import { EqualValidator } from './utils/validation/index';
const PIPES = [EqualValidator];

@NgModule({
  imports: [
    CommonModule,
    AbpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AlainThemeModule.forChild(),
    DelonABCModule,
    // DelonACLModule,
    // DelonFormModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [...PIPES],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    // DelonACLModule,
    // DelonFormModule,
    // third libs
    ...PIPES,
    ...THIRDMODULES,
  ],
  providers: [
    ModalHelper,
    // { provide: AdPageHeaderConfig, useFactory: pageHeaderConfig },
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard
      ],
    };
  }
}
