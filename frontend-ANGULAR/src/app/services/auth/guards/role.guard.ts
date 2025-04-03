import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UseStateService } from '../use-state.service';

export const roleGuard = (allowedRoles: Array<'CLIENT' | 'PROFESSIONAL' | 'ADMIN'>): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const sessionService = inject(UseStateService);
    const role = sessionService.getTypeRole();

    if (role && allowedRoles.includes(role as any)) {
      return true;
    }

    router.navigate(['/']);
    return false;
  };
};
