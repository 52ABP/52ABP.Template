import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AccountRoutingModule } from './account-routing.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';

import { SharedModule } from '@shared/shared.module';

import { AccountComponent } from './account.component';
import { TenantChangeComponent } from './tenant/tenant-change.component';
import { TenantChangeModalComponent } from './tenant/tenant-change-modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountLanguagesComponent } from './layout/account-languages.component';

import { LoginService } from './login/login.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbpModule } from '@abp/abp.module';
import { TenantRegisterComponent } from './tenant-register/tenant-register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    NgZorroAntdModule,
    AbpModule,
    SharedModule,
    ServiceProxyModule,
    AccountRoutingModule,
  ],
  declarations: [
    AccountComponent,
    TenantChangeComponent,
    TenantChangeModalComponent,
    LoginComponent,
    RegisterComponent,
    AccountLanguagesComponent,

    TenantRegisterComponent,
  ],
  entryComponents: [TenantChangeModalComponent],
  providers: [LoginService],
})
export class AccountModule { }
