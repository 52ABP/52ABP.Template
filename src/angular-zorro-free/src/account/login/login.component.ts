import {
  Component,
  Injector,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FormComponentBase } from '@shared/component-base/form-component-base';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [appModuleAnimation()],
})
export class LoginComponent extends FormComponentBase<any> implements OnInit {
  submitting = false;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public loginService: LoginService,
    private _router: Router,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [true],
    });
  }

  get multiTenancySideIsTeanant(): boolean {
    return this.appSession.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this.appSession.tenantId) {
      return false;
    }
    return true;
  }

  protected submitExecute(finisheCallback: Function): void {
    this.loginService.authenticate(() => (this.submitting = false));
  }
  protected setFormValues(entity: any): void {}
  protected getFormValues(): void {
    this.loginService.authenticateModel.userNameOrEmailAddress = this.getControlVal(
      'userName',
    );
    this.loginService.authenticateModel.password = this.getControlVal(
      'password',
    );
    this.loginService.authenticateModel.rememberClient = this.getControlVal(
      'rememberMe',
    );
  }
}
