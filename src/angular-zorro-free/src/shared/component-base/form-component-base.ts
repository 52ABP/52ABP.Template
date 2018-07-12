import { Injector, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';

export abstract class FormComponentBase<EntityDto> extends AppComponentBase {

    formBuilder: FormBuilder;
    validateForm: FormGroup;
    saving: boolean = false;

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

    getControlVal(name: string) {
        return this.validateForm.controls[name].value;
    }

    setControlVal(name: string, val: any) {
        this.validateForm.controls[name].setValue(val);
    }


    enter() {
        this.getFormValues();

        this.saving = true;
        this.save(() => {
            this.saving = false;
        });
    }

    protected abstract save(finisheCallback: Function): void;
    protected abstract setFormValues(entity: EntityDto): void;
    protected abstract getFormValues(): void;
}