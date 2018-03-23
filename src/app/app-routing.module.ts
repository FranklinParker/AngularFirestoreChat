import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/components/login/login.component';
import {RegistrationComponent} from './user/components/registration/registration.component';
import {ChatMainComponent} from './chat/components/chat-main/chat-main.component';
import {AuthGuard} from './user/service/auth-guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'chat', component: ChatMainComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [
    AuthGuard
  ]
})


export class AppRoutingModule {
}
