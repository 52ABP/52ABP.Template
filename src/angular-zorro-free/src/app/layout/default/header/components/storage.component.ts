import { Component, HostListener, Injector } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/component-base/app-component-base';

@Component({
  selector: 'header-storage',
  template: `
  <div (click)="click()">
    <i class="anticon anticon-tool"></i>
    {{l('ClearAllLocalStorage')}}
  </div>
  `
})
export class HeaderStorageComponent extends AppComponentBase {

  clicked: boolean = true;

  constructor(
    injector: Injector,
    private confirmServ: NzModalService,
    private messageServ: NzMessageService
  ) {
    super(injector);
  }

  click() {
    this.confirmServ.confirm({
      nzTitle: this.l('MakeSureClearAllLocalStorage'),
      nzOnOk: () => {
        localStorage.clear();
        this.messageServ.success(this.l('ClearFinished'));
      },
      nzOnCancel: () => {

      }
    });
  }
}
