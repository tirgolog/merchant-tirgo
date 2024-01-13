import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

function creditCardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const cardNumber = control.value as string;
        // Define your credit card validation criteria here.
        const cardPattern = /^4[0-9]{12}(?:[0-9]{3})?$/; // Example: Visa card

        if (cardPattern.test(cardNumber)) {
            return null; // Validation passed; credit card format is valid.
        } else {
            return { 'creditCard': true }; // Validation failed; credit card format is invalid.
        }
    };
}

// Usage in a FormGroup
// const form = new FormGroup({
//   cardNumber: new FormControl('', [Validators.required, creditCardValidator()]),
// });