import { Injector, ElementRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { FormGroup, FormBuilder } from '@angular/forms';

export abstract class ModalFormComponentBase<
  EntityDto
> extends ModalComponentBase {
  modalRef: NzModalRef;
  formBuilder: FormBuilder;
  validateForm: FormGroup;
  saving = false;

  constructor(injector: Injector) {
    super(injector);
    this.modalRef = injector.get(NzModalRef);
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

  getControlVal(name: string): any {
    return this.validateForm.controls[name].value;
  }

  setControlVal(name: string, val: any) {
    this.validateForm.controls[name].setValue(val);
  }

  submit() {
    this.getFormValues();

    this.saving = true;
    this.submitExecute(() => {
      this.saving = false;
    });
  }

  protected abstract submitExecute(finisheCallback: Function): void;
  protected abstract setFormValues(entity: EntityDto): void;
  protected abstract getFormValues(): void;
}
