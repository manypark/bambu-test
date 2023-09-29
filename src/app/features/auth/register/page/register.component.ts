import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterForms } from '../forms/register-forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading : boolean = false;
  form    : FormGroup = new RegisterForms().buildForm(this.formBuilder);

  constructor(
    // private readonly authServices: AuthService,
    private readonly formBuilder : FormBuilder,
  ) { }

  submit( event:any ) {

    this.form.markAsTouched();

    console.log(this.form.value);
    

    // this.loading = true;

    // if( !this.form.valid ) return;

    // this.authServices.login( this.emailValue, this.passwordValue ).subscribe( res => {
    //   this.loading = false;
    // }, err => console.log(err) );

  }

  get emailValue() {
    return this.form.get('email')?.value;
  }

  get passwordValue() {
    return this.form.get('password')?.value;
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
