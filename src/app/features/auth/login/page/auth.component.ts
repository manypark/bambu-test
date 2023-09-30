import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthForms } from '../forms/login-forms';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector    : 'app-auth',
  templateUrl : './auth.component.html',
  styleUrls   : ['./auth.component.scss']
})
export class AuthComponent {

  hide    : boolean = true;
  form    : FormGroup = new AuthForms().buildForm(this.formBuilder);

  constructor(
    private readonly formBuilder    : FormBuilder,
    public readonly firebaseServices : FirebaseService,
  ) { }

  submit( ev:any ) {

    this.form.markAsTouched();

    if( !this.form.valid ) return;

    const { email, password } = this.form.value;

    this.firebaseServices.SignIn(email, password);

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

}
