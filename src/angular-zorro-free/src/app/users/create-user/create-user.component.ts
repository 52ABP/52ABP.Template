import { Component, OnInit, Injector } from '@angular/core';
import { ModalFormComponentBase } from '@shared/component-base/modal-form-component-base';
import { CreateUserDto, UserServiceProxy, RoleDto } from '@shared/service-proxies/service-proxies';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styles: []
})
export class CreateUserComponent extends ModalFormComponentBase<CreateUserDto> implements OnInit {

  user: CreateUserDto = new CreateUserDto();
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
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmationValidator]],
      isActive: [true],
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

        this.roles.forEach((item) => {
          this.roleList.push({
            label: item.displayName, value: item.name, checked: true
          });
        });

        this.setControlVal('roles', this.roleList);
      });
  }


  protected submitExecute(finisheCallback: Function): void {
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
        this.success(true);
      });
  }
  protected setFormValues(entity: CreateUserDto): void {

  }
  protected getFormValues(): void {
    this.user.userName = this.getControlVal('userName');
    this.user.name = this.getControlVal('name');
    this.user.surname = this.getControlVal('surname');
    this.user.emailAddress = this.getControlVal('emailAddress');
    this.user.password = this.getControlVal('password');
    this.user.isActive = this.getControlVal('isActive');
    this.roleList = this.getControlVal('roles');
  }


}
