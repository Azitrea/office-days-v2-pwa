import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../../service/firebase-auth/firebase-auth.service';
import { filter, firstValueFrom } from 'rxjs';

export const alreadyLoggedInGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const firebaseAuthSerivce = inject(FirebaseAuthService);

  const user = await firstValueFrom(
    firebaseAuthSerivce.user$.pipe(filter((user) => user !== undefined))
  );

  if (user) {
    router.navigateByUrl('');
    return false;
  }

  return true;
};
