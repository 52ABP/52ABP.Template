import { Component, OnInit, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends AppComponentBase implements OnInit {
  shownLoginName: string = "";
  emailAddress: string = "";

  constructor(
    injector: Injector,
    private authService: AppAuthService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
    this.emailAddress = this.appSession.user.emailAddress;
  }


  logout() {
    this.authService.logout();
  }
}
