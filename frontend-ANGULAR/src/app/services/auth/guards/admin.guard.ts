import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UseStateService } from '../use-state.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionService = inject(UseStateService);
  const role = sessionService.getTypeRole();

  // Solo permitir ADMIN
  if (role === 'ADMIN') {
    return true;
  }

  // Redirigir si no es admin
  router.navigate(['/**']);
  return false;
};
