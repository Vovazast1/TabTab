import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './register.form';
import { AbstractControl } from '@angular/forms';

describe('RegisterPageForm', () => {
  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

  beforeEach(() => {
    registerPageForm = new RegisterPageForm(new FormBuilder());
    form = registerPageForm.getForm();
  });

  it('should empty nickname be invalid', () => {
    expect(form.get('nickname')?.valid).toBeFalsy();
  });

  it('should empty email be invalid', () => {
    expect(form.get('email')?.valid).toBeFalsy();
  });

  it('should invalid email be invalid', () => {
    form.get('email')?.setValue('invalid email');

    expect(form.get('email')?.valid).toBeFalsy();
  });

  it('should empty date be invalid', () => {
    expect(form.get('date')?.valid).toBeFalsy();
  });

  it('should empty password be invalid', () => {
    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should password be less than 8 characters be invalid', () => {
    form.get('password')?.setValue('1234567');

    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should password match the confirmation password', () => {
    form.get('password')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password123');

    expect(form.get('password')?.value).toEqual(form.get('confirmPassword')?.value);
    expect(form.get('confirmPassword')?.valid).toBeTruthy();
  });

  it('should password not match the confirmation password be invalid', () => {
    form.get('password')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password456');

    expect(form.get('password')?.value).not.toEqual(form.get('confirmPassword')?.value);
    expect(form.get('confirmPassword')?.valid).toBeFalsy();
  });
});
