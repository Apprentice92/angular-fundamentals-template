import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '@app/shared/directives/email.directive';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      email: ['', [
        Validators.required,
        emailValidator()
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }
  onFormSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.registrationForm.reset();
    } else {
      alert('Form is not valid');
      this.registrationForm.markAllAsTouched(); 
    }
  }
}