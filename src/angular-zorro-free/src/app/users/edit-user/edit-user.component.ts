import { Component, OnInit, Injector, Input, AfterViewInit } from '@angular/core';
import { RoleDto, RoleServiceProxy, ListResultDtoOfPermissionDto, UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { Validators, FormControl, AbstractControl } from '@angular/forms';
import { ModalComponentBase } from '@shared/component-base';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: []
})
export class EditUserComponent extends ModalComponentBase implements OnInit {


  @Input() id: number;
  user: UserDto = null;
  roles: RoleDto[] = null;
  roleList = [];


  constructor(
    injector: Injector,
    private _userService: UserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }



  fetchData(): void {
    this._userService.getRoles()
      .subscribe((result) => {
        this.roles = result.items;

        this._userService.get(this.id)
          .subscribe((result) => {
            this.user = result;
            this.roles.forEach((item) => {
              this.roleList.push({
                label: item.displayName, value: item.name, checked: this.userInRole(item, this.user)
              });
            });
          });

      });
  }

  userInRole(role: RoleDto, user: UserDto): boolean {
    return user.roleNames.indexOf(role.normalizedName) !== -1;
  }

  save(): void {
    let tmpRoleNames = [];
    this.roleList.forEach((item) => {
      if (item.checked) {
        tmpRoleNames.push(item.value);
      }
    });
    this.user.roleNames = tmpRoleNames;

    this._userService.update(this.user)
      .finally(() => { this.saving = false; })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }
}
