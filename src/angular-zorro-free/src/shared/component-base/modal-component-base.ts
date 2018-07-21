import { Injector, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/app-component-base';

export abstract class ModalComponentBase extends AppComponentBase {
  title = '';
  modalRef: NzModalRef;

  constructor(injector: Injector) {
    super(injector);
    this.modalRef = injector.get(NzModalRef);
  }

  success(result?: any) {
    if (result) {
      this.modalRef.close(result);
    } else {
      this.close();
    }
  }

  close($event?: MouseEvent): void {
    this.modalRef.close();
  }
}
