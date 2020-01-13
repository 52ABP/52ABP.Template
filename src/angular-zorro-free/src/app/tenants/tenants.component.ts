import { Component, OnInit, Injector } from '@angular/core';
import {
  TenantServiceProxy,
  TenantDto,
  PagedResultDtoOfTenantDto,
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { EditTenantComponent } from '@app/tenants/edit-tenant/edit-tenant.component';
import {
  PagedRequestDto,
  PagedListingComponentBase,
} from '@shared/component-base/paged-listing-component-base';
import { CreateTenantComponent } from '@app/tenants/create-tenant/create-tenant.component';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styles: [],
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {
  constructor(injector: Injector, private _tenantService: TenantServiceProxy) {
    super(injector);
  }

  fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this._tenantService
      .getAll('', this.isActive, request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfTenantDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }
  create() {
    this.modalHelper
      .open(CreateTenantComponent, {}, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
  edit(item: TenantDto) {
    this.modalHelper
      .open(EditTenantComponent, { id: item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  delete(item: TenantDto): void {
    this.message.confirm(
      "Delete tenant '" + item.name + "'?",
      undefined,
      (result: boolean) => {
        if (result) {
          this._tenantService
            .delete(item.id)
            .finally(() => {
              this.notify.info('Deleted tenant: ' + item.name);
              this.refresh();
            })
            .subscribe(() => {});
        }
      },
    );
  }
}
