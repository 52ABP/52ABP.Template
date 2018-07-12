import { Component, OnInit, Input, Injector } from '@angular/core';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';
import { RoleDto, ListResultDtoOfPermissionDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styles: []
})
export class EditRoleComponent extends ModalFormComponentBase<RoleDto> implements OnInit {

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

    this.validateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      description: [''],
      permissions: ['']
    });

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

        if (this.role.isStatic) {
          this.getFormControl('name').disable();
        }
        this.permissions.items.forEach((item) => {
          this.permissionList.push({
            label: item.displayName, value: item.name, checked: this.checkPermission(item.name), disabled: this.role.isStatic
          });
        });


        this.setFormValues(this.role);
      });
  }


  checkPermission(permissionName: string): boolean {
    return this.role.permissions.indexOf(permissionName) != -1;
  }

  protected submitExecute(finisheCallback: Function): void {
    let tmpPermissions = [];

    this.permissionList.forEach((item) => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

    this.role.permissions = tmpPermissions;

    this._roleService.update(this.role)
      .finally(() => {
        finisheCallback();
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success(true);
      });
  }
  protected setFormValues(entity: RoleDto): void {
    this.setControlVal('name', entity.name);
    this.setControlVal('displayName', entity.displayName);
    this.setControlVal('description', entity.description);
    this.setControlVal('permissions', this.permissionList);
  }
  protected getFormValues(): void {
    this.role.name = this.getControlVal('name');
    this.role.displayName = this.getControlVal('displayName');
    this.role.description = this.getControlVal('description');
    this.permissionList = this.getControlVal('permissions');
  }


}
