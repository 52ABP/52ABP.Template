import {
  Component,
  Injector,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';


import { FormComponentBase } from '@shared/component-base/form-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import { LoginService } from '../login/login.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [appModuleAnimation()],
})
export class RegisterComponent extends FormComponentBase implements OnInit {

  model: RegisterInput;

  saving = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private readonly _loginService: LoginService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (!this.appSession.tenant) {
      this.back();
      return;
    }

    this.model = new RegisterInput();

    this.validateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  back(): void {
    this._router.navigate(['/']);
  }

  save(): void {
    this.saving = true;
    this._accountService
      .register(this.model)
      .finally(() => {
        this.saving = false;
      })
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(['/login']);
          return;
        }

        // Autheticate
        this.saving = true;
        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        this._loginService.authenticateModel.password = this.model.password;
        this._loginService.authenticate(() => {
          this.saving = false;
        });
      });
  }
}
