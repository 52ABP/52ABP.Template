import { AppComponentBase } from '@shared/component-base/app-component-base';
import { Component, Injector, OnInit } from '@angular/core';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="" nzSize="small" class="mr-sm"></nz-avatar>

    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i> {{l('Logout')}}</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector, private _authService: AppAuthService) {
    super(injector);
  }
  ngOnInit(): void { }
  logout(): void {
    this._authService.logout();
  }
}
