import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login-page.form';

const loginPage = {
  getForm: () => new LoginPageForm(new FormBuilder()).createForm(),
  getEmail: () => loginPage.getForm().get('email'),
  getPassword: () => loginPage.getForm().get('password'),
};

describe('LoginPageForm', () => {
  it('should create login form empty', () => {
    expect(loginPage.getForm()).not.toBeNull();
    expect(loginPage).not.toBeNull();
    expect(loginPage.getEmail()?.value).toEqual('');
    expect(loginPage.getEmail()?.valid).toBeFalsy();
    expect(loginPage.getPassword()).not.toBeNull();
    expect(loginPage.getEmail()?.value).toEqual('');
    expect(loginPage.getEmail()?.valid).toBeFalsy();
  });

  it('should have email invalid if email is not valid', () => {
    loginPage.getEmail()?.setValue('invalid email');

    expect(loginPage.getEmail()?.valid).toBeFalsy();
  });

  it('should have email valid if email is valid', () => {
    loginPage.getEmail()?.setValue('valid@email.com');
    setTimeout(() => {
      expect(loginPage.getEmail()?.valid).toBeTruthy();
      done();
    }, 1000);
  });

  it('should have a valid form', () => {
    loginPage.getEmail()?.setValue('valid@email.com');
    loginPage.getPassword()?.setValue('anyPAssword');
    setTimeout(() => {
      expect(loginPage.getForm().valid).toBeTruthy();
      done();
    }, 1000);
  });
});
function done() {
  throw new Error('Function not implemented.');
}
