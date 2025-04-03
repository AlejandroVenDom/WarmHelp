import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserServiceService } from '../auth/user-service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserServiceService);
  const router = inject(Router);

  const userRole = userService.getRole();

  if (userRole === 'CLIENT') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
