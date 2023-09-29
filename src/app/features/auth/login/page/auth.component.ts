import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthForms } from '../forms/login-forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector    : 'app-auth',
  templateUrl : './auth.component.html',
  styleUrls   : ['./auth.component.scss']
})
export class AuthComponent {

  hide    : boolean = true;
  form    : FormGroup = new AuthForms().buildForm(this.formBuilder);

  constructor(
    private readonly formBuilder  : FormBuilder,
    private readonly afAuth       : AngularFireAuth,
    private readonly toastServices: ToastService,
    private readonly router       : Router,
  ) { }

  submit( event:any ) {

    this.form.markAsTouched();

    if( !this.form.valid ) return;

    const { email, password } = this.form.value

    this.SignIn(email, password);

  }

   // Sign in with email/password
   SignIn(email: string, password: string) {

    this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {

      const { user } = result.user.multiFactor as any;

      if( user ) {
        localStorage.setItem('token', user.accessToken);
        this.toastServices.openSuccessSnakcBar( 'Ingreso correctamente', `Bienvenido ${user.email}`);

        this.router.navigate(['home']);
      }

    }).catch( err => {
      console.log(err);
    });
    ;

    // this.afAuth.authState.subscribe((user) => {});
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
