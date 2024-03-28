import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.form';

describe('LoginPageForm', () => {
  let loginPageForm: LoginPageForm;
  let form: FormGroup;

  beforeEach(() => {
    loginPageForm = new LoginPageForm(new FormBuilder());
    form = loginPageForm.createForm();
  });

  it('should create login form empty', () => {
    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('email')?.valid).toBeFalsy();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')?.value).toEqual('');
    expect(form.get('password')?.valid).toBeFalsy();
  });

  it('should have email invalid if email is not valid', () => {
    form.get('email')?.setValue('invalid email');

    expect(form.get('email')?.valid).toBeFalsy();
  });

  it('should have email valid if email is valid', () => {
    form.get('email')?.setValue('valid@email.com');

    expect(form.get('email')?.valid).toBeTruthy();
  });

  it('should have a valid form', () => {
    form.get('email')?.setValue('valid@email.com');
    form.get('password')?.setValue('anyPAssword');

    expect(form.valid).toBeTruthy();
  });
});

// const loginPage = {
//   getForm: () => new LoginPageForm(new FormBuilder()).createForm(),
//   getEmail: () => loginPage.getForm().get('email'),
//   getPassword: () => loginPage.getForm().get('password'),
// };

// describe('LoginPageForm', () => {
//   it('should create login form empty', () => {
//     expect(loginPage.getForm()).not.toBeNull();
//     expect(loginPage).not.toBeNull();
//     expect(loginPage.getEmail()?.value).toEqual('');
//     expect(loginPage.getEmail()?.valid).toBeFalsy();
//     expect(loginPage.getPassword()).not.toBeNull();
//     expect(loginPage.getEmail()?.value).toEqual('');
//     expect(loginPage.getEmail()?.valid).toBeFalsy();
//   });

//   it('should have email invalid if email is not valid', () => {
//     loginPage.getEmail()?.setValue('invalid email');

//     expect(loginPage.getEmail()?.valid).toBeFalsy();
//   });

//   it('should have email valid if email is valid', () => {
//     loginPage.getEmail()?.setValue('valid@email.com');
//     setTimeout(() => {
//       expect(loginPage.getEmail()?.valid).toBeTruthy();
//       done();
//     }, 1000);
//   });

//   it('should have a valid form', () => {
//     loginPage.getEmail()?.setValue('valid@email.com');
//     loginPage.getPassword()?.setValue('anyPAssword');
//     setTimeout(() => {
//       expect(loginPage.getForm().valid).toBeTruthy();
//       done();
//     }, 1000);
//   });
// });
// function done() {
//   throw new Error('Function not implemented.');
// }
