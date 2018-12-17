import {
  Component,
  ViewContainerRef,
  OnInit,
  ViewEncapsulation,
  Injector,
} from '@angular/core';
import { LoginService } from './login/login.service';
import { AppComponentBase } from '@shared/component-base/app-component-base';

@Component({
  selector: 'layout-account',

  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent extends AppComponentBase {
  private viewContainerRef: ViewContainerRef;

  versionText: string;
  currentYear: number;

  links = [
    {
      title: 'ABP',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];

  public constructor(injector: Injector, private _loginService: LoginService) {
    super(injector);
    this.currentYear = new Date().getFullYear();
    this.versionText =
      this.appSession.application.version +
      ' [' +
      this.appSession.application.releaseDate.format('YYYYDDMM') +
      ']';
  }

  showTenantChange(): boolean {
    return abp.multiTenancy.isEnabled;
  }
}
