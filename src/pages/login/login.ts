import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {HttpService} from "../../services/HttpService";
import {ConversationsPage} from "../conversations/conversations";
// import {Socket} from "ng-socket-io";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage
{

  public loading = undefined;

  public user = {
    login: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
              // public socket: Socket,
              public Loading: LoadingController,
              public Toast: ToastController,
              public http: HttpService,
              public navParams: NavParams) {

    // this.socket.on('login-success', this.success);
    // this.socket.on('login-fail', this.fail);

  }

  public login()
  {
    if(typeof this.loading === 'undefined') {
      this.loading = this.Loading.create();
      this.loading.present();
      if (this.user.login && this.user.login.length &&
        this.user.password && this.user.password.length) {
        const body = {
          login: this.user.login,
          password: this.user.password
        };
        this.http.post('user/login', body, data => this.success(data), error => this.failure(error));
      } else {
        let errors = [];
        if (!this.user.login || !this.user.login.length) errors.push('Please fill login field.');
        if (!this.user.password || !this.user.password.length) errors.push('Please fill password field.');
        this.loading.dismiss();
        this.loading = undefined;
        this.showToasts(errors);
      }
    }
  }

  public register()
  {
    this.navCtrl.push(RegisterPage, {
      callback: (login, password) => {
        this.user.login = login;
        this.user.password = password;
        this.showToasts(['Account has been successfully created, please check Your email, we send you an activation link.'], false);
      }
    });
  }

  private success(data)
  {
    localStorage.setItem('token', data.token);

    this.navCtrl.setRoot(ConversationsPage);

    this.loading.dismiss();
    this.loading = undefined;

  }

  private failure(errors)
  {
    this.loading.dismiss();
    this.loading = undefined;
    this.showToasts(errors);
  }

  private showToasts(info, error = true)
  {
    const toast = this.Toast.create({
      message: info.join('\n'),
      duration: 10000,
      position: 'top',
      showCloseButton: true,
      dismissOnPageChange: true,
      cssClass: error ? 'errToast' : 'sucToast'
    });
    toast.present();
  }

}
