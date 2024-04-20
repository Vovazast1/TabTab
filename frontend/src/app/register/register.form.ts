import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class RegisterPageForm {
  private formBuilder: FormBuilder;
  private form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    let form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    });
    form.get('password')?.addValidators(matchPasswordAndConfirmPassword(form, 'confirmPassword'));
    form.get('confirmPassword')?.addValidators(matchPasswordAndConfirmPassword(form, 'password'));

    return form;
  }

  getForm(): FormGroup {
    return this.form;
  }
}

function matchPasswordAndConfirmPassword(form: FormGroup, field: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = form.get(field)?.value;
    const confirmPassword = control.value;
    if (!password) return null;
    return password === confirmPassword ? null : { isntMatching: true };
  };
}
