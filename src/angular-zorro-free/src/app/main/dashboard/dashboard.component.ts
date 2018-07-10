import { concat } from 'rxjs';

import { Component, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MessageService } from 'abp-ng2-module/dist/src/message/message.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends AppComponentBase
  implements AfterViewInit, OnDestroy {
  constructor(injector: Injector, private msg: MessageService) {
    super(injector);
  }

  getDashboardStatisticsData(datePeriod): void {}

  ngAfterViewInit(): void {
    const self = this;
    setTimeout(() => {
      self.msg.warn('hello', '你好');
    }, 1000);
  }

  ngOnDestroy() {}
}
