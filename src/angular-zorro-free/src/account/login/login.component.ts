import {
  Component,
  Injector,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'account/login/login.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { FormComponentBase } from '@shared/component-base/form-component-base';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [appModuleAnimation()],
})
export class LoginComponent extends FormComponentBase implements OnInit {

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
      remember: [true],
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

  login(): void {
    this.submitting = true;
    this.loginService.authenticate(() => (this.submitting = false));
  }
}
