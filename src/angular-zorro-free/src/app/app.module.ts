import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { HomeComponent } from '@app/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AboutComponent } from '@app/about/about.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { UsersComponent } from '@app/users/users.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateTenantComponent } from '@app/tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from '@app/tenants/edit-tenant/edit-tenant.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from '@app/roles/edit-role/edit-role.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';
import { AdvertisingComponent } from './advertising/advertising.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    TenantsComponent,
    UsersComponent,
    RolesComponent,
    CreateTenantComponent,
    EditTenantComponent,
    CreateRoleComponent,
    EditRoleComponent,
    CreateUserComponent,
    EditUserComponent,
    AdvertisingComponent,
  ],
  entryComponents: [
    CreateTenantComponent,
    EditTenantComponent,
    CreateRoleComponent,
    EditRoleComponent,
    CreateUserComponent,
    EditUserComponent,
    AdvertisingComponent,
  ],
  // providers: [LocalizationService, MenuService],
})
export class AppModule { }
