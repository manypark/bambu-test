import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RegisterForms } from '../forms/register-forms';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector    : 'app-register',
  templateUrl : './register.component.html',
  styleUrls   : ['./register.component.scss']
})
export class RegisterComponent {

  hide  : boolean = true;
  form  : FormGroup = new RegisterForms().buildForm(this.formBuilder);

  constructor(
    private readonly formBuilder  : FormBuilder,
    public readonly firebaseServices : FirebaseService,
  ) { }

  submit( event:any ) {

    this.form.markAsTouched();

    if( !this.form.valid ) return;

    const { email, password, name, birthDay, phone } = this.form.value;

    this.firebaseServices.signUp(email, password, name, birthDay, phone);
  }

  get passwordRequired() {
    return this.form.get('password')?.hasError('required');
  }

  get passwordMinlength() {
    return this.form.get('password')?.hasError('minlength');
  }

  get emailError() {
    return this.form.get('email')?.hasError('pattern');
  }

  get emailErrorRequired() {
    return this.form.get('email')?.hasError('required');
  }

  get nameErrorRequired() {
    return this.form.get('name')?.hasError('required');
  }

  get birthDayErrorRequired() {
    return this.form.get('birthDay')?.hasError('required');
  }

  get phoneErrorRequired() {
    return this.form.get('phone')?.hasError('required');
  }
  

}
