import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { Router } from '@angular/router';
import { LoginService } from 'account/login/login.service';
import {
  TenantRegistrationServiceProxy,
  CreateTenantDto,
} from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tenant-register',
  templateUrl: './tenant-register.component.html',
  styleUrls: ['./tenant-register.component.less'],
  animations: [appModuleAnimation()],
})
export class TenantRegisterComponent extends AppComponentBase
  implements OnInit {
  model: CreateTenantDto = new CreateTenantDto();

  constructor(
    injector: Injector,
    private _router: Router,
    private readonly _loginService: LoginService,
    private readonly _tenantRegisterService: TenantRegistrationServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.titleSrvice.setTitle(this.l('TenantRegister'));
  }

  back(): void {
    this._router.navigate(['/account/login']);
  }

  save(): void {
    this.saving = true;
    this._tenantRegisterService
      .registerTenant(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe(result => {
        this.notify.info(this.l('SavedSuccessfully'));

        this.saving = true;
        abp.multiTenancy.setTenantIdCookie(result.id);

        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.adminEmailAddress;
        this._loginService.authenticateModel.password = this.model.adminPassword;
        this._loginService.authenticate(() => {
          this.saving = false;
        });
      });
  }
}
