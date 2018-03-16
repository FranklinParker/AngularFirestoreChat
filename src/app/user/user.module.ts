import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {SharedModule} from '../shared/shared.module';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './service/auth.service';
import {AngularFireModule} from 'angularfire2';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent],
  exports: [
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    AuthService
  ]
})
export class UserModule { }
