import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { UseStateService } from '../use-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const sessionService = inject(UseStateService);

  const accessToken = tokenService.getAccessToken();
  const username = sessionService.getUsername();

  if (accessToken && username) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
