import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent implements OnInit {
  constructor(
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
  ) {}

  ngOnInit(): void {
    // 覆盖abp自带的通知和mssage
    //   AppConsts.overrideAbpMessage(this.modalService);
    AppConsts.overrideAbpNotify(this.notifyService);
  }
}
