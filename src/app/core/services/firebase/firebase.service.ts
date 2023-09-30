import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ToastService } from 'src/app/shared/services/toast.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public isLoading:boolean = false;

  constructor(
    private readonly afAuth       : AngularFireAuth,
    private readonly afs          : AngularFirestore,
    private readonly toastServices: ToastService,
    private readonly router       : Router,
  ) { }

  signUp( email:string, password:string, name:string, birthDay:string, phone:string  ) {

    this.isLoading = true;

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
      this.isLoading = false;
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
        this.isLoading = false;
        this.toastServices.openSuccessSnakcBar( 'Se registro correctamente', `Bienvenido ${dataUser.name}`);
        this.router.navigate(['login']);
      }

    }).catch( err => {
      this.isLoading = false;
      console.log(err);
    });
  }

  SignIn(email: string, password: string) {

    this.isLoading = true;

    this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {

      const { user } = result.user.multiFactor as any;

      if( user ) {

        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('userEmail', user.email);
        this.toastServices.openSuccessSnakcBar( 'Ingreso correctamente', `Bienvenido ${user.email}`);
        this.router.navigate(['home/pokemons']);
        this.isLoading = false;
      }

    }).catch( err => {
      this.isLoading = false;
      if( err.code == 'auth/invalid-login-credentials' ){
        this.toastServices.openErrorSnakcBar( 'Error en credenciales', 'Verifica tu correo y contraseña');
      }
    });

  }
  
}
