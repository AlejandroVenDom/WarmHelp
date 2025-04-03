import { HttpInterceptorFn } from '@angular/common/http';
import {TokenService} from '../auth/token.service';
import {inject} from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  /*

  a = {
  name: camilo
  }
  {...a, age: 27}


  header = {
  'Content-Type': 'application/json',
  }
  {
  ...header,
  'Authentication': 'Bearer ' + accessToken -> if accessToken
  }

   */

  const tokenService = inject(TokenService);
  const accessToken = tokenService.getAccessToken();

  const cloneReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      ...(accessToken ? {'Authorization': 'Bearer ' + accessToken} : undefined)
    },
    withCredentials: true
  });

  return next(cloneReq);

};
