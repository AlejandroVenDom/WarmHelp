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
import { MisPublicacionesComponent } from './user/mis-publicaciones/mis-publicaciones.component';
import { ChatGptComponent } from './user/chat-gpt/chat-gpt.component';
import { PublicProfileComponent } from './user/public-profile/public-profile.component';
import { MisIncidenciasComponent } from './user/mis-incidencias/mis-incidencias.component';
import { IncidenciasComponent } from './admin/incidencias/incidencias.component';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { adminGuard } from './services/auth/guards/admin.guard';
import { LikesAdminComponent } from './admin/likes-admin/likes-admin.component';
import { PostsAdminComponent } from './admin/posts-admin/posts-admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { ServiciosAdminComponent } from './admin/servicios-admin/servicios-admin.component';
import { ComentariosAdminComponent } from './admin/comentarios-admin/comentarios-admin.component';
import { ControlEvent } from '@angular/forms';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { ReportsAdminComponent } from './admin/reports-admin/reports-admin.component';
import { ReportsPostsAdminComponent } from './admin/reports-posts-admin/reports-posts-admin.component';
import { VerifyComponent } from './user/verify/verify.component';
import { StripePayComponent } from './user/stripe-pay/stripe-pay.component';

const routes: Routes = [
  // users without authentication
  {
    path: '', component:LayoutComponent, children:[
      { path: '',component: HomeNoAuthComponent},
      { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
      {path:  'perfil-publico/:username', component: PublicProfileComponent, canActivate: [authGuard]},
      { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [publicGuard] },
      { path: 'posts', component: PostsComponent, canActivate: [authGuard] },
      { path: 'tienda', component: TiendaComponent , canActivate: [authGuard] },
      { path: 'mis-publicaciones', component: MisPublicacionesComponent , canActivate: [authGuard] },
      { path: 'mis-incidencias', component: MisIncidenciasComponent, canActivate: [authGuard]},
      { path: 'chat-gpt', component: ChatGptComponent , canActivate: [authGuard]},
      { path: 'servicioscr', component: BackofficeAdminComponent},
      { path: 'verify', component: VerifyComponent, canActivate: [authGuard] },
      { path: 'servicioscr', component: BackofficeAdminComponent, canActivate: [roleGuard]},
      { path: 'stripe-pay', component: StripePayComponent, canActivate: [authGuard]}
    ]
  },
    // admins
  {
    path: "app", canActivate:[adminGuard],  component: LayoutAdminComponent, children: [ // -> www.ejemplo.com/app
      {path: "", redirectTo: "admin-control-panel", pathMatch: "full"}, // -> www.ejemplo.com/app
      {path: 'control-panel', component: ControlPanelComponent},
      { path: 'incidencias-admin', component: IncidenciasComponent},
      { path: 'likes-admin', component: LikesAdminComponent},
      { path: 'users-admin', component: UsersAdminComponent},
      { path: 'posts-admin', component: PostsAdminComponent},
      { path: 'servicios-admin', component: ServiciosAdminComponent},
      { path: 'comentarios-admin', component: ComentariosAdminComponent},
      { path: 'reports-admin', component: ReportsAdminComponent},
      { path: 'reports-posts-admin', component: ReportsPostsAdminComponent}
    ]
  },
  {path: "**", component: PageNotFoundComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
