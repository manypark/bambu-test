import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthForms } from '../forms/auth-forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {

  loading : boolean = false;
  form    : FormGroup = new AuthForms().buildForm(this.formBuilder);

  constructor(
    // private readonly authServices: AuthService,
    private readonly formBuilder : FormBuilder,
  ) { }

  ngAfterViewInit(): void {
    this.delayAnimToElement();
  }

  delayAnimToElement() {
    const title = document.querySelector('h1');
    title?.style.setProperty('--animate-duration', '600ms');

    const subTitle = document.querySelector('h1');
    subTitle?.style.setProperty('--animate-duration', '700ms');

    
  }

  submit( event:any ) {

    this.form.markAsTouched();

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
