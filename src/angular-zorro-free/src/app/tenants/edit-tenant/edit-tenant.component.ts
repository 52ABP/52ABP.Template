import { Component, OnInit, Injector, Input } from '@angular/core';
import {
  TenantServiceProxy,
  TenantDto,
} from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';
import { ModalComponentBase } from '@shared/component-base';

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styles: [],
})
export class EditTenantComponent extends ModalComponentBase
  implements OnInit {
  @Input() id: number;
  tenant: TenantDto = null;

  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this._tenantService
      .get(this.id)
      .finally(() => { })
      .subscribe(result => {
        this.tenant = result;
      });
  }

  save(): void {
    this.saving = false;
    this._tenantService
      .update(this.tenant)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }
}
