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
    ChatGptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
