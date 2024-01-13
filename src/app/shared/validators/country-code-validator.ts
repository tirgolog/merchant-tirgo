import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

function countryCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const countryCode = control.value as string;
    // Define your country code validation criteria here.
    const validCountryCodes = ['US', 'CA', 'UK', 'DE', 'FR']; // Example valid country codes

    if (validCountryCodes.includes(countryCode.toUpperCase())) {
      return null; // Validation passed; the country code is valid.
    } else {
      return { 'countryCodeValidation': true }; // Validation failed; the country code is not valid.
    }
  };
}

// Usage in a FormGroup
// const form = new FormGroup({
//   userCountryCode: new FormControl('', [Validators.required, countryCodeValidator()]),
// });