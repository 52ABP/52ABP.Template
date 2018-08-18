import { Component, OnInit, Injector } from '@angular/core';
import {
  TenantServiceProxy,
  CreateTenantDto,
} from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';
import { ModalComponentBase } from '@shared/component-base';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styles: [],
})
export class CreateTenantComponent
  extends ModalComponentBase
  implements OnInit {
  saving = false;
  tenant: CreateTenantDto = new CreateTenantDto();

  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.tenant.init({ isActive: true });
    this.tenant.connectionString;
  }

  save(): void {
    this.saving = true;
    this._tenantService
      .create(this.tenant)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
