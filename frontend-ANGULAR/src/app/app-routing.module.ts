import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './user/layout/layout.component';
import { HomeNoAuthComponent } from './user/home-no-auth/home-no-auth.component';
import { LoginComponent} from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BackofficeAdminComponent } from './admin/backoffice-admin/backoffice-admin.component';

const routes: Routes = [
  // users without authentication
  {
    path: '', component:LayoutComponent, children:[
      { path: '', component: HomeNoAuthComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
  },

  // users with authentication
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
