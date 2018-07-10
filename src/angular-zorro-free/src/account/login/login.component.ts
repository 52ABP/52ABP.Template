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

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [appModuleAnimation()],
})
export class LoginComponent extends AppComponentBase implements OnInit {
  @ViewChild('cardBody') cardBody: ElementRef;

  validateForm: FormGroup;

  submitting = false;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public loginService: LoginService,
    private _router: Router,
    private _sessionService: AbpSessionService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
      mobile: [],
      captcha: [],
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {}

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.loginService.authenticate(() => (this.submitting = false));
  }
}
