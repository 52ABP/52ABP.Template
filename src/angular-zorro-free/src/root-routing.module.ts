import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: 'app/app.module#AppModule', // Lazy load app module
    data: { preload: true },
  },
  {
    path: 'account',
    loadChildren: 'account/account.module#AccountModule', // Lazy load account module
    data: { preload: true },
  },  
  {
    path: '**',
    redirectTo: 'app',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RootRoutingModule {}
