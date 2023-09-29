import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { RegisterForms } from '../forms/register-forms';
import { User } from 'src/app/core/interfaces/user';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

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
    private readonly afAuth       : AngularFireAuth,
    private readonly afs          : AngularFirestore,
    private readonly toastServices: ToastService,
    private readonly router       : Router,
  ) { }

  submit( event:any ) {

    this.form.markAsTouched();

    if( !this.form.valid ) return;

    const { email, password, name, birthDay, phone } = this.form.value;

    this.signUp(email, password, name, birthDay, phone);
  }

  signUp( email:string, password:string, name:string, birthDay:string, phone:string  ) {

    this.afAuth.createUserWithEmailAndPassword(email, password).then( res => {

      const { user } = res.user.multiFactor as any;

      const dataUser:User = {
        name,
        birthDay,
        phone,
        credentials: {
          uid: user.uid,
          email,
          password
        }
      };

      this.saveUserNew( dataUser );

    }).catch( err => {
      if( err.code == 'auth/email-already-in-use') {
        this.toastServices.openErrorSnakcBar( 'Hubo un error', `El correo ya esta registrado`);
      }
    });

  }

  saveUserNew( dataUser:User ) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${dataUser.credentials.uid}`
    );

    userRef.set(dataUser, { merge: true }).then( res => {

      if( res == undefined ) {
        this.toastServices.openSuccessSnakcBar( 'Se registro correctamente', `Bienvenido ${dataUser.name}`);
        this.router.navigate(['login']);
      }

    }).catch( err => {
      console.log(err);
    });
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
