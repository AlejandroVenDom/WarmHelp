import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from '../auth/token.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const accessToken = tokenService.getAccessToken();
  const refreshToken = tokenService.getRefreshToken();

  if (accessToken) {
    router.navigate(['']);
    return false;
  }

  return true;
};
