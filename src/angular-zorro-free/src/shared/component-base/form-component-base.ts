import { Injector, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

export abstract class FormComponentBase extends AppComponentBase {

    formBuilder: FormBuilder;
    validateForm: FormGroup;

    constructor(injector: Injector) {
        super(injector);
        this.formBuilder = injector.get(FormBuilder);
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