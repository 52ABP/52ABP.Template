import { Component, OnInit, Input, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';

import {
  RoleDto,
  PermissionDtoListResultDto,
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleEditDto,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styles: [],
})
export class EditRoleComponent extends ModalComponentBase implements OnInit {
  @Input() id: number;
  permissions: PermissionDtoListResultDto = null;
  role: RoleEditDto = null;

  getRoleForEditOutput: GetRoleForEditOutput = new GetRoleForEditOutput();
  permissionList = [];

  constructor(injector: Injector, private _roleService: RoleServiceProxy) {
    super(injector);
  }

  ngOnInit() {
    this._roleService
      .getAllPermissions()
      .subscribe((permissions: PermissionDtoListResultDto) => {
        console.log(permissions);
        this.permissions = permissions;

        this.fetchData();
      });
    //   console.log(this.permissions);
  }

  fetchData(): void {
    this._roleService
      .getRoleForEdit(this.id)
      .subscribe((result: GetRoleForEditOutput) => {
        this.getRoleForEditOutput = result;
        this.role = result.role;
        //    console.log(this.permissions);

        this.permissions.items.forEach(item => {
          this.permissionList.push({
            label: item.displayName,
            value: item.name,
            checked: this.checkPermission(item.name),
            disabled: this.role.isStatic,
          });
        });
      });
  }

  checkPermission(permissionName: string): boolean {
    console.log(this.getRoleForEditOutput.grantedPermissionNames);
    return (
      this.getRoleForEditOutput.grantedPermissionNames.indexOf(
        permissionName,
      ) != -1
    );
  }

  save(): void {
    this.saving = true;
    let tmpPermissions = [];

    this.permissionList.forEach(item => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

    const role = new RoleDto();
    role.init(this.role);
    role.grantedPermissions = tmpPermissions;

    this._roleService
      .update(role)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }
}
