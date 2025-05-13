import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackofficeAdminComponent } from './admin/backoffice-admin/backoffice-admin.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeNoAuthComponent } from './user/home-no-auth/home-no-auth.component';
import { LayoutComponent } from './user/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderClienteComponent } from './user/header-cliente/header-cliente.component';
import { FooterComponent } from './user/footer/footer.component';
import { PostsComponent } from './user/posts/posts.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { TiendaComponent } from './user/tienda/tienda.component';
import { CommonModule } from '@angular/common';
import { MisPublicacionesComponent } from './user/mis-publicaciones/mis-publicaciones.component';
import { ChatGptComponent } from './user/chat-gpt/chat-gpt.component';
import { PublicProfileComponent } from './user/public-profile/public-profile.component';
import { MisIncidenciasComponent } from './user/mis-incidencias/mis-incidencias.component';
import { IncidenciasComponent } from './admin/incidencias/incidencias.component';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { LikesAdminComponent } from './admin/likes-admin/likes-admin.component';
import { PostsAdminComponent } from './admin/posts-admin/posts-admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { ServiciosAdminComponent } from './admin/servicios-admin/servicios-admin.component';
import { ComentariosAdminComponent } from './admin/comentarios-admin/comentarios-admin.component';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { ReportsAdminComponent } from './admin/reports-admin/reports-admin.component';
import { ReportsPostsAdminComponent } from './admin/reports-posts-admin/reports-posts-admin.component';
import { CartComponent } from './user/cart/cart.component';
import { BaseChartDirective  } from 'ng2-charts';
import { VerifyComponent } from './user/verify/verify.component';
import { StripePayComponent } from './user/stripe-pay/stripe-pay.component';
import { FiltrosComponent } from './user/tienda/filtros/filtros.component';
import { PaymentSuccessComponent } from './user/payment-success/payment-success.component';
import { PaymentDeniedComponent } from './user/payment-denied/payment-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    BackofficeAdminComponent,
    LoginComponent,
    RegisterComponent,
    HomeNoAuthComponent,
    LayoutComponent,
    HeaderClienteComponent,
    FooterComponent,
    PerfilComponent,
    TiendaComponent,
    PostsComponent,
    MisPublicacionesComponent,
    ChatGptComponent,
    PublicProfileComponent,
    MisIncidenciasComponent,
    IncidenciasComponent,
    PageNotFoundComponent,
    LayoutAdminComponent,
    HeaderAdminComponent,
    LikesAdminComponent,
    PostsAdminComponent,
    UsersAdminComponent,
    ServiciosAdminComponent,
    ComentariosAdminComponent,
    ControlPanelComponent,
    ReportsAdminComponent,
    ReportsPostsAdminComponent,
    CartComponent,
    VerifyComponent,
    StripePayComponent,
    FiltrosComponent,
    PaymentSuccessComponent,
    PaymentDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    BaseChartDirective,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
