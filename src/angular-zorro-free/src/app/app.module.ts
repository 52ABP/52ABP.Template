import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { LocalizationService } from 'abp-ng2-module/dist/src/localization/localization.service';
import { LayoutModule } from '@app/layout/layout.module';
import { HomeComponent } from '@app/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { CreateTenantComponent } from '@app/tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from '@app/tenants/edit-tenant/edit-tenant.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    AbpModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TenantsComponent,
    UsersComponent,
    RolesComponent,
    CreateTenantComponent,
    EditTenantComponent
  ],
  entryComponents: [
    CreateTenantComponent,
    EditTenantComponent,
  ],
  providers: [
    LocalizationService
  ]
})
export class AppModule { }
