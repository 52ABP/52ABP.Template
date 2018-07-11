import { Injector, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { FormGroup, FormBuilder } from '@angular/forms';

export abstract class ModalFormComponentBase extends ModalComponentBase {

    modalRef: NzModalRef;
    formBuilder: FormBuilder;
    validateForm: FormGroup;

    constructor(injector: Injector) {
        super(injector);
        this.modalRef = injector.get(NzModalRef);
        this.formBuilder = injector.get(FormBuilder);
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


    getFormControl(name: string) {
        return this.validateForm.controls[name];
    }

    resetForm($event?: MouseEvent) {
        if ($event) $event.preventDefault();

        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }

}