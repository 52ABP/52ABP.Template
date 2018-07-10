import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpModule, JsonpModule } from '@angular/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { MainRoutingModule } from './main-routing.module';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { LocalizationService } from 'abp-ng2-module/dist/src/localization/localization.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AbpModule,
    NgZorroAntdModule,
    SharedModule,
    ServiceProxyModule,
    MainRoutingModule,
  ],
  declarations: [DashboardComponent],
  providers: [LocalizationService],
})
export class MainModule { }
