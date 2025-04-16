import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UseStateService } from '../use-state.service';

export const roleGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionService = inject(UseStateService);
  const role = sessionService.getTypeRole();

  // Solo permitir PROFESSIONAL o ADMIN
  if (role === 'PROFESSIONAL' || role === 'ADMIN') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
