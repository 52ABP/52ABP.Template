import { Component, OnInit, Injector, Input, AfterViewInit } from '@angular/core';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';
import { RoleDto, RoleServiceProxy, ListResultDtoOfPermissionDto, UserServiceProxy, UserDto } from '@shared/service-proxies/service-proxies';
import { Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: []
})
export class EditUserComponent extends ModalFormComponentBase<UserDto> implements OnInit {


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
    this.validateForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      isActive: [false],
      roles: ['']
    });

    this.fetchData();
  }

  updateConfirmValidator(): void {
    this.getFormControl('confirmPassword').updateValueAndValidity();
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.getControlVal('password')) {
      return { confirm: true, error: true };
    }
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
            this.setFormValues(this.user);
          });

      });
  }

  userInRole(role: RoleDto, user: UserDto): boolean {
    return user.roleNames.indexOf(role.normalizedName) !== -1;
  }

  protected submitExecute(finisheCallback: Function): void {
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
        this.success(true);
      });
  }
  protected setFormValues(entity: UserDto): void {
    this.setControlVal('userName', entity.userName);
    this.setControlVal('name', entity.name);
    this.setControlVal('surname', entity.surname);
    this.setControlVal('emailAddress', entity.emailAddress);
    this.setControlVal('isActive', entity.isActive);
    this.setControlVal('roles', this.roleList);
  }
  protected getFormValues(): void {
    this.user.userName = this.getControlVal('userName');
    this.user.name = this.getControlVal('name');
    this.user.surname = this.getControlVal('surname');
    this.user.emailAddress = this.getControlVal('emailAddress');
    this.user.isActive = this.getControlVal('isActive');
    this.roleList = this.getControlVal('roles');
  }


}
