
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';

const COMPONENTS = [
  NoDataComponent,
  ValidationMessagesComponent
];



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
})

/**自定义组件模块 */
export class CustomComponentModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: CustomComponentModule };
  }
}
