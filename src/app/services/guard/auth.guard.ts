import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    const router = new Router();
    router.navigate(['/people']);
    return false;
  }
  return true;
};

export const authGuard2: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
  return true;
};
