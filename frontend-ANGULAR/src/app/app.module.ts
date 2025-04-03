import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackofficeAdminComponent } from './admin/backoffice-admin/backoffice-admin.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeNoAuthComponent } from './user/home-no-auth/home-no-auth.component';
import { LayoutComponent } from './user/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    BackofficeAdminComponent,
    LoginComponent,
    RegisterComponent,
    HomeNoAuthComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
