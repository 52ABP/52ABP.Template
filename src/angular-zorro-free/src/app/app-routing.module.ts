import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
      {
        path: 'users',
        component: UsersComponent,
        data: { permission: 'Pages.Users' },
        canActivate: [AppRouteGuard],
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: { permission: 'Pages.Roles' },
        canActivate: [AppRouteGuard],
      },
      {
        path: 'tenants',
        component: TenantsComponent,
        data: { permission: 'Pages.Tenants' },
        canActivate: [AppRouteGuard],
      },
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
