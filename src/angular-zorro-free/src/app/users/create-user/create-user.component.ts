import { Component, OnInit, Injector } from '@angular/core';
import { CreateUserDto, UserServiceProxy, RoleDto } from '@shared/service-proxies/service-proxies';
import { ModalComponentBase } from '@shared/component-base';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styles: []
})
export class CreateUserComponent extends ModalComponentBase implements OnInit {

  user: CreateUserDto = new CreateUserDto();
  roles: RoleDto[] = null;

  roleList = [];

  confirmPassword: string = '';

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

        this.roles.forEach((item) => {
          this.roleList.push({
            label: item.displayName, value: item.name, checked: true
          });
        });
      });
  }


  save(): void {
    let tmpRoleNames = [];
    this.roleList.forEach((item) => {
      if (item.checked) {
        tmpRoleNames.push(item.value);
      }
    });
    this.user.roleNames = tmpRoleNames;

    this._userService.create(this.user)
      .finally(() => { this.saving = false; })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
