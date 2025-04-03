import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly ACCESS_TOKEN_KEY: string = 'tienda_token';
  private readonly REFRESH_TOKEN_KEY: string = 'tienda_refresh_token';

  constructor(
    private cookieService: CookieService,
  ) {
  }

  saveTokens(token: string, refreshToken: string) {
    this.cookieService.set(this.ACCESS_TOKEN_KEY, token, {
      path: "/",
      secure: environment.tokenSecure, // En producción esto tiene que ser true
      sameSite: "Strict"
    })

    this.cookieService.set(this.REFRESH_TOKEN_KEY, refreshToken, {
      path: "/",
      secure: environment.tokenSecure, // En producción esto tiene que ser true
      sameSite: "Strict"
    })
  }

  getAccessToken() {
    return this.cookieService.get(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    return this.cookieService.get(this.REFRESH_TOKEN_KEY);
  }

  removeToken() {
    this.cookieService.delete(this.ACCESS_TOKEN_KEY, '/', '', environment.tokenSecure, 'Strict'); // En producción esto tiene que ser true
    this.cookieService.delete(this.REFRESH_TOKEN_KEY, '/', '', environment.tokenSecure, 'Strict'); // En producción esto tiene que ser true
  }

}






