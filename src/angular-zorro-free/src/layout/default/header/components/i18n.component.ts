import { Component, Inject, Input, OnInit, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '@delon/theme';
import { AppComponentBase } from '@shared/component-base';
import { UserServiceProxy, ChangeUserLanguageDto } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
// import { I18NService } from '@core/i18n/i18n.service';

@Component({
  selector: 'header-i18n',
  template: `

  <nz-dropdown  nzPlacement="bottomRight">
  <div nz-dropdown class="alain-default__item">
    <i class="anticon {{currentLanguage.icon}}"></i>
    {{currentLanguage.displayName}}
    <i nz-icon type="down"></i>
  </div>
  <ul nz-menu>
    <li nz-menu-item *ngFor="let item of languages" [nzSelected]="item.name == currentLanguage.name" (click)="change(item.name)">
      <i class="anticon {{item.icon}}"></i>
      <span>{{item.displayName}}</span>
    </li>
  </ul>
</nz-dropdown>

  `,
})
export class HeaderI18nComponent extends AppComponentBase implements OnInit {
  languages: abp.localization.ILanguageInfo[];
  currentLanguage: abp.localization.ILanguageInfo;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.languages = _.filter(this.localization.languages, l => !l.isDisabled);
    this.currentLanguage = this.localization.currentLanguage;
  }

  change(languageName: string): void {
    const input = new ChangeUserLanguageDto();
    input.languageName = languageName;

    this._userService.changeLanguage(input).subscribe(() => {
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        languageName,
        new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
        abp.appPath,
      );

      window.location.reload();
    });
  }
}
