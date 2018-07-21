import { Component, OnInit, Injector } from '@angular/core';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';
import {
  TenantServiceProxy,
  CreateTenantDto,
} from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styles: [],
})
export class CreateTenantComponent
  extends ModalFormComponentBase<CreateTenantDto>
  implements OnInit {
  saving = false;
  tenant: CreateTenantDto = new CreateTenantDto();

  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.tenant.init({ isActive: true });
    this.tenant.connectionString;
    this.validateForm = this.formBuilder.group({
      tenancyName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      connectionString: [''],
      adminEmailAddress: ['', [Validators.required, Validators.email]],
      isActive: [true],
    });
  }

  protected submitExecute(finisheCallback: Function): void {
    this._tenantService
      .create(this.tenant)
      .finally(() => {
        finisheCallback();
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success(true);
      });
  }

  protected setFormValues(entity: CreateTenantDto): void {}

  protected getFormValues(): void {
    this.tenant.tenancyName = this.getControlVal('tenancyName');
    this.tenant.name = this.getControlVal('name');
    this.tenant.connectionString = this.getControlVal('connectionString');
    this.tenant.adminEmailAddress = this.getControlVal('adminEmailAddress');
    this.tenant.isActive = this.getControlVal('isActive');
  }
}
