import { FormGroup } from '@angular/forms';

export const getFormString = (form: FormGroup | undefined, value: string) => {
  return String(form?.get(value)?.value);
};

export const getFormDate = (form: FormGroup | undefined, value: string) => {
  return new Date(form?.get(value)?.value);
};

export const getFormNumber = (form: FormGroup | undefined, value: string) => {
  return Number(form?.get(value)?.value);
};
