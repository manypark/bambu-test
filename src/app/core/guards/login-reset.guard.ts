import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginResetGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if( token != null ) router.navigate(['home/pokemons']);

  return token == null ? true : false;
};
