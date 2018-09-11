import { Component, OnInit, Injector } from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppComponentBase } from '@shared/component-base/app-component-base';

@Component({
  selector: 'abp-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styles: [],
})
export class SidebarUserComponent extends AppComponentBase implements OnInit {
  shownLoginName = '';
  emailAddress = '';

  constructor(injector: Injector, private authService: AppAuthService) {
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
