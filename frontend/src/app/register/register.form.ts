import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

export class RegisterPageForm {
  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  createForm(): FormGroup {
    let form = this.formBuilder.group({
      nickname: ['', [Validators.required]],
      date: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });

    form
      .get('confirmPassword')
      ?.setValidators(matchPasswordAndConfirmPassword(form));

    return form;
  }
}

function matchPasswordAndConfirmPassword(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { isntMatching: true };
  };
}
