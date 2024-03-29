import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { RegisterScreenComponent } from './pages/register-screen/register-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';


@NgModule({
  declarations: [
    LoginScreenComponent,
    RegisterScreenComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NavBarModule
  ]
})
export class AuthModule { }
