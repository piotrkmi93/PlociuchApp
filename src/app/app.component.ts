import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ConversationsPage} from "../pages/conversations/conversations";
import {LoginPage} from "../pages/login/login";
// import {Socket} from "ng-socket-io";
// socket: Socket

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if( !!localStorage.getItem('token') ) {

        this.rootPage = ConversationsPage;

      } else {

        this.rootPage = LoginPage;

      }

    });
  }
}

