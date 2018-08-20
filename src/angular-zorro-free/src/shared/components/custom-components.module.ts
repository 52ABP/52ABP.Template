import { EqualValidator } from './validation-messages/validation/equal-validator.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { ValidationMessagesComponent } from '@shared/components/validation-messages/validation-messages.component';
import { AutoFocusDirective } from '@shared/components/validation-messages/auto-focus.directive';
import { MinValueValidator } from '@shared/components/validation-messages/validation/min-value-validator.directive';
import { PasswordComplexityValidator } from '@shared/components/validation-messages/validation/password-complexity-validator.directive';
const COMPONENTS = [NoDataComponent, ValidationMessagesComponent];

const ThirdDirectives = [
  AutoFocusDirective,
  EqualValidator,
  MinValueValidator,
  PasswordComplexityValidator,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS, ...ThirdDirectives],
  exports: [...COMPONENTS],
})

/**自定义组件模块 */
export class CustomComponentModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: CustomComponentModule };
  }
}
