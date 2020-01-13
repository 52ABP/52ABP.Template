import { Component, HostListener, Injector } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/component-base';

@Component({
  selector: 'header-storage',
  template: `
    <div (click)="_click()">
      <i nz-icon type="tool"></i>
      {{ l('ClearAllLocalStorage') }}
    </div>
  `,
  host: {
    '[class.d-block]': 'true',
  },
})
export class HeaderStorageComponent extends AppComponentBase {
  clicked: boolean = true;

  constructor(injector: Injector) {
    super(injector);
  }

  @HostListener('click')
  _click() {
    this.message.confirm(
      this.l('MakeSureClearAllLocalStorage'),
      undefined,
      res => {
        if (res) {
          localStorage.clear();
          this.message.success(this.l('ClearFinished'));
        }
      },
    );
  }
}
