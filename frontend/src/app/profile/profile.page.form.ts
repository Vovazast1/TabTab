import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ProfilePageForm {
  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      avatar: ['', [Validators.min(1), Validators.max(5)]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    });
  }
}
