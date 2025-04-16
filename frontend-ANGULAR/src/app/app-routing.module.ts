import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './user/layout/layout.component';
import { HomeNoAuthComponent } from './user/home-no-auth/home-no-auth.component';
import { LoginComponent} from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BackofficeAdminComponent } from './admin/backoffice-admin/backoffice-admin.component';
import { PostsComponent } from './user/posts/posts.component';
import { TiendaComponent } from './user/tienda/tienda.component';
import { publicGuard } from './services/auth/guards/public.guard';
import { authGuard } from './services/auth/guards/auth.guard';
import { roleGuard } from './services/auth/guards/role.guard';
import { PerfilComponent } from './user/perfil/perfil.component';

const routes: Routes = [
  // users without authentication
  {
    path: '', component:LayoutComponent, children:[
      { path: '',component: HomeNoAuthComponent},
      { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
      { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [publicGuard] },
      { path: 'posts', component: PostsComponent, canActivate: [authGuard] },
      { path: 'tienda', component: TiendaComponent , canActivate: [authGuard] },
      { path: 'servicioscr', component: BackofficeAdminComponent , canActivate: [roleGuard] },
    ],
  },

  // users with authentication
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
