import { HomeComponent } from './home/home.component';
import { MainModule } from './main/main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LocalizationService } from 'abp-ng2-module/dist/src/localization/localization.service';
import { LayoutModule } from '@app/layout/layout.module';
import { AppSharedModule } from '@app/app-shared';
import { DelonModule } from 'delon.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DelonModule.forRoot(),
    CoreModule,
    AppSharedModule,
    // LayoutModule,

    AbpModule,
    NgZorroAntdModule,
  ],
  declarations: [AppComponent, HomeComponent],
  providers: [LocalizationService],
})
export class AppModule {}
