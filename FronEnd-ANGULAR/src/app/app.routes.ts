import { Routes } from '@angular/router';
import { UsersHomeComponent } from './users/users-home/users-home.component';
import { LayoutComponent } from './users/layout/layout.component';
import { UsersLoginComponent } from './users/users-login/users-login.component';
import { UsersRegisterComponent } from './users/users-register/users-register.component';

export const routes: Routes = [
  // users without authentication

  {
    path: '', component: LayoutComponent, children: [
        { path: 'login', component: UsersHomeComponent },
        { path: '', component: UsersLoginComponent },
        { path: 'register', component: UsersRegisterComponent },
    ],
  },
];
