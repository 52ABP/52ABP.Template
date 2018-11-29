import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent implements OnInit {
  constructor(
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _notifyService: NzNotificationService,
  ) { }

  ngOnInit(): void {
    // 覆盖abp自带的通知和mssage
    AppConsts.overrideAbpMessageByMini(
      this._messageService,
      this._modalService,
    );
    //  覆盖abp.message替换为ng-zorro的全局message
    //  AppConsts.overrideAbpMessageByNgModal(this._modalService); /// 覆盖abp.message替换为ng-zorro的模态框

    AppConsts.overrideAbpNotify(this._notifyService);
  }
}
