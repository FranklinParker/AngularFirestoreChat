import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/components/header/header.component';
import { SidenavComponent } from './navigation/components/sidenav/sidenav.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import {UserModule} from './user/user.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../enviroments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {StoreModule} from '@ngrx/store';
import { reducers } from './app.reducer';
import {ChatModule} from './chat/chat.module';
import {ChatService} from './chat/services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ChatModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
