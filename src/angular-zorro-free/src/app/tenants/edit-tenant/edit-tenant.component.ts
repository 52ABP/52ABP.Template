import { Component, OnInit, Injector, Input } from '@angular/core';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';
import {
  TenantServiceProxy,
  TenantDto,
} from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styles: [],
})
export class EditTenantComponent extends ModalFormComponentBase<TenantDto>
  implements OnInit {
  @Input() id: number;
  tenant: TenantDto = null;

  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      tenancyName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      isActive: [false],
    });

    this.fetchData();
  }

  fetchData() {
    this._tenantService
      .get(this.id)
      .finally(() => {})
      .subscribe(result => {
        this.tenant = result;
        this.setFormValues(this.tenant);
      });
  }

  protected submitExecute(finisheCallback: Function): void {
    this._tenantService
      .update(this.tenant)
      .finally(() => {
        finisheCallback();
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success(true);
      });
  }

  protected setFormValues(entity: TenantDto): void {
    this.setControlVal('tenancyName', entity.tenancyName);
    this.setControlVal('name', entity.name);
    this.setControlVal('isActive', entity.isActive);
  }

  protected getFormValues(): void {
    this.tenant.tenancyName = this.getControlVal('tenancyName');
    this.tenant.name = this.getControlVal('name');
    this.tenant.isActive = this.getControlVal('isActive');
  }
}
