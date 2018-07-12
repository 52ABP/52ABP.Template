import { Component, OnInit, Injector, Input } from '@angular/core';
import { ListResultDtoOfPermissionDto, CreateRoleDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styles: []
})
export class CreateRoleComponent extends ModalFormComponentBase<CreateRoleDto> implements OnInit {

  permissions: ListResultDtoOfPermissionDto = null;
  role: CreateRoleDto = null;
  permissionList = [];

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {

    this.validateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      description: [''],
      permissions: []
    });

    this._roleService.getAllPermissions()
      .subscribe((permissions: ListResultDtoOfPermissionDto) => {
        this.permissions = permissions;

        this.permissions.items.forEach((item) => {
          this.permissionList.push({
            label: item.displayName, value: item.name, checked: true
          });
        });

        this.setControlVal('permissions', this.permissionList);
      });

  }

  protected submitExecute(finisheCallback: Function): void {
    let tmpPermissions = [];

    this.permissionList.forEach((item) => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

    this.role.permissions = tmpPermissions;

    this._roleService.create(this.role)
      .finally(() => {
        finisheCallback();
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success(true);
      });
  }
  protected setFormValues(entity: CreateRoleDto): void {

  }
  protected getFormValues(): void {
    if (!this.role) {
      this.role = new CreateRoleDto();
    }
    this.role.name = this.getControlVal('name');
    this.role.displayName = this.getControlVal('displayName');
    this.role.description = this.getControlVal('description');
    this.permissionList = this.getControlVal('permissions');
  }


}
