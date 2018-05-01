import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ConversationsPage} from "../pages/conversations/conversations";
import {ConversationPage} from "../pages/conversation/conversation";
import {SearchPage} from "../pages/search/search";
import {HttpModule} from "@angular/http";
import {HttpService} from "../services/HttpService";

import { SocketIoModule, SocketIoConfig } from "ng-socket-io";
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ConversationsPage,
    ConversationPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ConversationsPage,
    ConversationPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
