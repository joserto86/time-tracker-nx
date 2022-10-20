import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: AbstractControl) {
    if (!(formGroup instanceof FormGroup)) {
      console.warn('You are not passing a formGroup');
      return null;
    }

    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
