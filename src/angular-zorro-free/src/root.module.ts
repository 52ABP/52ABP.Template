import { NgModule, Injector } from '@angular/core';
import { CommonModule, PlatformLocation } from '@angular/common';

import { RootComponent } from 'root.component';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppPreBootstrap } from 'AppPreBootstrap';
import { AppConsts } from '@shared/AppConsts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NzIconService } from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { APP_INITIALIZER } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RootRoutingModule } from 'root-routing.module';
import { SharedModule } from '@shared/shared.module';

import { TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';


import { DelonModule } from './delon.module';
import { ICONS_AUTO } from './style-icons-auto';
import { ICONS } from './style-icons';

import { AbpModule } from '@abp/abp.module';
import { LocalizationService } from '@shared/i18n/localization.service';


export function appInitializerFactory(injector: Injector) {

    // 导入图标
    const iconSrv = injector.get(NzIconService);
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);

    return () => {
        return new Promise<boolean>((resolve, reject) => {
            AppPreBootstrap.run(injector, () => {

                const appSessionService: AppSessionService = injector.get(
                    AppSessionService,
                );
                appSessionService.init().then(
                    result => {
                        resolve(result);
                    },
                    err => {
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


export function getBaseHref(platformLocation: PlatformLocation): string {
    var baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

function getDocumentOrigin() {
    if (!document.location.origin) {
        return document.location.protocol + "//" + document.location.hostname + (document.location.port ? ':' + document.location.port : '');
    }

    return document.location.origin;
}

const I18NSERVICE_PROVIDES = [
    // { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }
    { provide: ALAIN_I18N_TOKEN, useClass: LocalizationService, multi: false }
];


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
    ],
    declarations: [RootComponent],
    providers: [
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        { provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [Injector, PlatformLocation], multi: true },
        { provide: LOCALE_ID, useFactory: getCurrentLanguage, },
        I18NSERVICE_PROVIDES,
    ],
    bootstrap: [RootComponent],
})
export class RootModule { }
