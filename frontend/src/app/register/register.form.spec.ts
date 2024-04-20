import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './register.form';

describe('RegisterPageForm', () => {
  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

  beforeEach(() => {
    registerPageForm = new RegisterPageForm(new FormBuilder());
    form = registerPageForm.getForm();
  });

  it('should empty username be invalid', () => {
    expect(form.get('username')?.valid).toBeFalsy();
  });

  it('should empty email be invalid', () => {
    expect(form.get('email')?.valid).toBeFalsy();
  });

  it('should invalid email be invalid', () => {
    form.get('email')?.setValue('invalid email');

    expect(form.get('email')?.valid).toBeFalsy();
  });

  it('should empty birthday be invalid', () => {
    expect(form.get('birthday')?.valid).toBeFalsy();
  });

  it('should empty password be invalid', () => {
    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should password be less than 8 characters be invalid', () => {
    form.get('password')?.setValue('1234567');

    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should username more then 20 characters be invalid', () => {
    form.get('username')?.setValue('qwertyuioplkjhgfdsazx');

    expect(form.get('username')?.valid).toBeFalsy();
  });

  it('should password match the confirmation password', () => {
    form.get('password')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password123');

    expect(form.get('password')?.value).toEqual(form.get('confirmPassword')?.value);
    expect(form.get('confirmPassword')?.valid).toBeTruthy();
  });

  it('should password not match the confirm password be invalid', () => {
    form.get('password')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password456');

    expect(form.get('password')?.value).not.toEqual(form.get('confirmPassword')?.value);
    expect(form.get('confirmPassword')?.valid).toBeFalsy();
  });

  it('should form be valid', () => {
    form.get('username')?.setValue('anyUsername');
    form.get('email')?.setValue('any@email.com');
    form.get('password')?.setValue('anyPassword');
    form.get('confirmPassword')?.setValue('anyPassword');
    form.get('birthday')?.setValue('date');

    expect(form.valid).toBeTruthy();
  });
});
