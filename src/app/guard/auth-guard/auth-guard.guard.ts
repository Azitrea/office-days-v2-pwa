import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = true;
  if (isLoggedIn) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
