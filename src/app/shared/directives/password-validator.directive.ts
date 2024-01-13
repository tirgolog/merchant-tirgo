import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective {

  @Input('appPasswordValidator') requiredPattern!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const pattern = new RegExp(this.requiredPattern);
      const isValid = pattern.test(control.value);

      if (!isValid) {
        return { passwordPattern: true };
      }
    }
    return null;
  }

}
