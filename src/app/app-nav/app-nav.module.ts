import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DefaultComponent } from './default/default.component';
import { SignInDialogComponent } from './sign-in-dialog/sign-in.dialog';
import { CustomMaterialModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { NotallowedComponent } from './notallowed/notallowed.component';
import { OfflineComponent } from './offline/offline.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared/components/component.module';
import { RegisterDialogComponent } from './register-dialog/register.dialog';
import { ResetPasswordDialogComponent } from './resetpassword-dialog/password.reset.dialog';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    SidebarComponent,
    NotallowedComponent,
    OfflineComponent,
    LoginComponent,
    SignInDialogComponent,
    RegisterDialogComponent,
    ResetPasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,   // Voor reactive forms
    BrowserAnimationsModule,
    LayoutModule,
    CustomMaterialModule,
    SharedComponentsModule,
  ],
})

export class AppNavModule { }
