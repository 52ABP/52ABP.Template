import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

// Got from: https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2

@Directive({
  selector:
    '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualValidator),
      multi: true,
    },
  ],
})
export class EqualValidator implements Validator {
  constructor(
    @Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string,
  ) {}

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }

    return this.reverse === 'true';
  }

  validate(control: AbstractControl): { [key: string]: any } {
    const pairControl = control.root.get(this.validateEqual);
    if (!pairControl) {
      return null;
    }

    const value = control.value;
    const pairValue = pairControl.value;

    if (!value && !pairValue) {
      return null;
    }

    if (this.isReverse) {
      if (value === pairValue) {
        if (pairControl.errors) {
          delete pairControl.errors['validateEqual'];
        }

        if (!Object.keys(pairControl.errors).length) {
          pairControl.setErrors(null);
        }
      } else {
        pairControl.setErrors({
          validateEqual: false,
        });
      }

      return null;
    } else {
      if (value !== pairValue) {
        return {
          validateEqual: false,
        };
      }
    }
  }
}
