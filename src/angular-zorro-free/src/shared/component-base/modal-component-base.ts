import { Injector, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/app-component-base';

export abstract class ModalComponentBase extends AppComponentBase {

    title: string = '';
    modalRef: NzModalRef;

    constructor(injector: Injector) {
        super(injector);
        this.modalRef = injector.get(NzModalRef);
    }

    success(result?: any) {
        if (result) {
            this.modalRef.triggerCancel();
        }
        else {
            this.modalRef.triggerOk();
        }
    }

    close($event?: MouseEvent): void {
        this.modalRef.triggerCancel();
    }

}