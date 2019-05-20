import { Component, OnInit, Injector } from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';
import {
  RoleDto,
  RoleServiceProxy,
  PagedResultDtoOfRoleDto,
} from '@shared/service-proxies/service-proxies';
import { EditRoleComponent } from '@app/roles/edit-role/edit-role.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [],
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {
  constructor(injector: Injector, private rolesService: RoleServiceProxy) {
    super(injector);
  }

  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this.rolesService
      .getAll('', request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfRoleDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }
  protected delete(entity: RoleDto): void {
    this.message.confirm(
      "Remove Users from Role and delete Role '" + entity.displayName + "'?",
      'Permanently delete this Role',
      (result: boolean) => {
        if (result) {
          this.rolesService
            .delete(entity.id)
            .finally(() => {
              this.notify.info('Deleted Role: ' + entity.displayName);
              this.refresh();
            })
            .subscribe(() => {});
        }
      },
    );
  }

  create(): void {
    this.modalHelper
      .open(CreateRoleComponent, {}, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  edit(item: RoleDto): void {
    this.modalHelper
      .open(EditRoleComponent, { id: item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}
