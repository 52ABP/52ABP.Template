import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  ElementRef,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { IsTenantAvailableInput } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';

@Component({
  selector: 'tenantChangeModal',
  templateUrl: './tenant-change-modal.component.html',
})
export class TenantChangeModalComponent extends ModalFormComponentBase<any>
  implements OnInit {
  @Input() tenancyName = '';

  saving = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      tenancyName: [''],
    });
  }

  protected submitExecute(finisheCallback: Function): void {
    if (!this.tenancyName || this.tenancyName === '') {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.close();
      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;

    this._accountService
      .isTenantAvailable(input)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(result => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            this.success();
            location.reload();
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
            break;
          case AppTenantAvailabilityState.NotFound: // NotFound
            this.message.warn(
              this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName),
            );
            break;
        }
      });
  }

  protected setFormValues(entity: any): void {
    this.setControlVal('tenancyName', this.tenancyName);
  }
  protected getFormValues(): void {
    this.tenancyName = this.getControlVal('tenancyName');
  }
}
