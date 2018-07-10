import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [AppComponent],
})
export class AppModule {}
