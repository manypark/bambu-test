import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector    : 'app-home',
  templateUrl : './home.component.html',
  styleUrls   : ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userEmailLogged:string = '';
  router = inject(Router);

  ngOnInit(): void {
    this.userEmailLogged = localStorage.getItem('userEmail');
  }


  closeSession() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
