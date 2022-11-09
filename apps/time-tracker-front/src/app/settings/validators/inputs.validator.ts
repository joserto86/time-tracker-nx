import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function atLeastOne(
  validator: ValidatorFn,
  controls: string[] = []
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) return null;
    const formGroup = control as FormGroup;
    return formGroup && controls.some((k) => !validator(formGroup.controls[k]))
      ? null
      : {
          atLeastOne: true,
        };
  };
}
