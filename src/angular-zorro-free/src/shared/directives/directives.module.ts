import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";


import { AutoFocusDirective } from "./auto-focus/auto-focus.directive";
import { MinValueValidator } from "./validation/min-value-validator.directive";
import { PasswordComplexityValidator } from "./validation/password-complexity-validator.directive";
import { EqualValidator } from "./validation/equal-validator.directive";


const ThirdDirectives = [
    AutoFocusDirective,
    EqualValidator,
    MinValueValidator,
    PasswordComplexityValidator,
];

@NgModule({
    imports: [CommonModule],
    declarations: [...ThirdDirectives],
    exports: [],
})


/**自定义指令模块 */
export class DirectivesModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: DirectivesModule };
    }
}
