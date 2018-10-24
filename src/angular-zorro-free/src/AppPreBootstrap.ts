import * as moment from 'moment';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { LocalizationService } from '@yoyo/abp';
import { environment } from '@env/environment';

export class AppPreBootstrap {
  static run(callback: () => void): void {

    console.log("由52ABP模板构建,详情请访问 https://www.52abp.com");

    AppPreBootstrap.getApplicationConfig(() => {
      AppPreBootstrap.getUserConfiguration(callback);
    });
  }

  static bootstrap<TM>(
    moduleType: Type<TM>,
    compilerOptions?: CompilerOptions | CompilerOptions[],
  ): Promise<NgModuleRef<TM>> {
    return platformBrowserDynamic().bootstrapModule(
      moduleType,
      compilerOptions,
    );
  }

  private static getApplicationConfig(callback: () => void) {
    let envName = '';
    if (environment.production) {
      envName = 'prod';
    } else {
      envName = 'dev';
    }
    return abp
      .ajax({
        url: '/assets/appconfig.' + envName + '.json',
        method: 'GET',
        headers: {
          'Abp.TenantId': abp.multiTenancy.getTenantIdCookie(),
        },
      })
      .done(result => {
        AppConsts.appBaseUrl = result.appBaseUrl;
        AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
        LocalizationService.localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
        callback();
      });
  }

  private static getCurrentClockProvider(
    currentProviderName: string,
  ): abp.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }

    return abp.timing.localClockProvider;
  }

  private static getUserConfiguration(
    callback: () => void,
  ): JQueryPromise<any> {

    let token = abp.auth.getToken();
    if (!token) {
      token = '';
    }

    return abp
      .ajax({
        url: AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          '.AspNetCore.Culture': abp.utils.getCookieValue(
            'Abp.Localization.CultureName',
          ),
          'Abp.TenantId': abp.multiTenancy.getTenantIdCookie(),
        },
      })
      .done(result => {
        $.extend(true, abp, result);

        abp.clock.provider = this.getCurrentClockProvider(
          result.clock.provider,
        );

        moment.locale(abp.localization.currentLanguage.name);

        // 注册语言,NG-Zorro的DataPicker要使用
        registerLocaleData(zh);

        if (abp.clock.provider.supportsMultipleTimezone) {
          moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
        }

        callback();
      });
  }
}
