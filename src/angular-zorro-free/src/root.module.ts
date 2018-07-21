import { NgModule, Injector } from '@angular/core';
import { CommonModule, PlatformLocation } from '@angular/common';

import { RootComponent } from 'root.component';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppPreBootstrap } from 'AppPreBootstrap';
import { AppConsts } from '@shared/AppConsts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module/dist/src/abpHttpInterceptor';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { APP_INITIALIZER } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { DelonModule } from 'delon.module';
import { RootRoutingModule } from 'root-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AppModule } from '@app/app.module';
export function appInitializerFactory(injector: Injector) {
  return () => {
    //  abp.ui.setBusy();
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise<boolean>((resolve, reject) => {
      AppPreBootstrap.run(() => {
        abp.event.trigger('abp.dynamicScriptsInitialized');
        const appSessionService: AppSessionService = injector.get(
          AppSessionService,
        );
        appSessionService.init().then(
          result => {
            abp.ui.clearBusy();
            resolve(result);
          },
          err => {
            //   abp.ui.clearBusy();
            reject(err);
          },
        );
      });
    });
  };
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
  return abp.localization.currentLanguage.name;
}
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AbpModule,
    // 引入DelonMdule
    DelonModule.forRoot(),
    ServiceProxyModule,
    RootRoutingModule,
    HttpClientModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /** 必须导入 ng-zorro 才能导入此项 */
    SharedModule.forRoot(),
    AppModule,
  ],
  declarations: [RootComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage,
    },
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
