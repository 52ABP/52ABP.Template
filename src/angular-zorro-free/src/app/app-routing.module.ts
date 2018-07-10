import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    // canActivate: [AppRouteGuard],
    // canActivateChild: [AppRouteGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AppRouteGuard],
      },
      {
        path: 'main',
        loadChildren: 'app/main/main.module#MainModule',
        // canActivate: [AppRouteGuard],
      },
      // {
      //   path: 'admin',
      //   loadChildren: 'app/admin/admin.module#AdminModule',
      //   canActivate: [AppRouteGuard],
      // },
      {
        path: '**',
        redirectTo: 'main',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
