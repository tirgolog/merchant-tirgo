import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

function numericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        // Define your numeric validation criteria here.
        const numericPattern = /^\d+$/;

        if (numericPattern.test(value)) {
            return null; // Validation passed; the input contains only numbers.
        } else {
            return { 'numeric': true }; // Validation failed; the input contains non-numeric characters.
        }
    };
}

// Usage in a FormGroup
// const form = new FormGroup({
//   quantity: new FormControl('', [Validators.required, numericValidator()]),
// });