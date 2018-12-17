import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzModalService, NzNotificationService, NzMessageService, VERSION as VERSION_ZORRO } from 'ng-zorro-antd';
import { TitleService, VERSION as VERSION_ALAIN } from '@delon/theme';
import { MessageExtension } from '@shared/helpers/message.extension';

import { preloaderFinished } from '@delon/theme';
preloaderFinished();


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class RootComponent implements OnInit {
  constructor(
    private _modalService: NzModalService,
    private _messageService: NzMessageService,
    private _notifyService: NzNotificationService,
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
  ) {

    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
  }

  ngOnInit(): void {
    // 覆盖abp自带的通知和mssage
    // MessageExtension.overrideAbpMessageByMini(
    //   this._messageService,
    //   this._modalService,
    // );

    //  覆盖abp.message替换为ng-zorro的模态框
    MessageExtension.overrideAbpMessageByNgModal(this._modalService);

    //  覆盖abp.notify替换为ng-zorro的notify
    MessageExtension.overrideAbpNotify(this._notifyService);

    //  设置标题
    this.titleSrv.prefix = '52ABP';

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        this.titleSrv.setTitle();
        this._modalService.closeAll();
      });
  }
}
