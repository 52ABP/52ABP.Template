import { Component, OnInit, Input, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { RoleDto, ListResultDtoOfPermissionDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styles: []
})
export class EditRoleComponent extends ModalComponentBase implements OnInit {

  @Input() id: number;
  permissions: ListResultDtoOfPermissionDto = null;
  role: RoleDto = null;

  permissionList = [];

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this._roleService.getAllPermissions()
      .subscribe((permissions: ListResultDtoOfPermissionDto) => {
        this.permissions = permissions;

        this.fetchData();
      });
  }

  fetchData(): void {
    this._roleService.get(this.id)
      .finally(() => {

      })
      .subscribe((result: RoleDto) => {
        this.role = result;
        this.permissions.items.forEach((item) => {
          this.permissionList.push({
            label: item.displayName, value: item.name, checked: this.checkPermission(item.name), disabled: this.role.isStatic
          });
        });
      });
  }


  checkPermission(permissionName: string): boolean {
    return this.role.permissions.indexOf(permissionName) != -1;
  }

  save(): void {
    this.saving = true;
    let tmpPermissions = [];

    this.permissionList.forEach((item) => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

    this.role.permissions = tmpPermissions;

    this._roleService.update(this.role)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
