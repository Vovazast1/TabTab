import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() message?: string;
  @Input() field?: AbstractControl;
  @Input() error?: string | null;

  constructor() {}

  shouldShowComponent() {
    return this.field?.touched && this.field.errors?.[this.error || ''];
  }

  ngOnInit() {}
}
