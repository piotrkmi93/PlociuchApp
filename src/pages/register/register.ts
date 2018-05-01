import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpService} from "../../services/HttpService";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  /**
   * User template
   *
   * @type {{login: string; email: string; password: string}}
   */
  public user: any = {
    login: '',
    email: '',
    password: ''
  };

  /**
   * Loader instance
   *
   * @type {}
   */
  public loading = undefined;

  /**
   * Callback function to login page
   */
  private callback;

  /**
   * Register Page Constructor
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {LoadingController} Loading
   * @param {ToastController} Toast
   * @param {HttpService} http
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Loading: LoadingController,
              public Toast: ToastController,
              public http: HttpService) {
    this.callback = this.navParams.get('callback');
  }

  /**
   * Go back to login
   */
  public login(success = false){
    if(success && this.callback) this.callback(this.user.login, this.user.password);
    this.navCtrl.pop();
  }

  /**
   * Register button handler
   */
  public register()
  {
    if(typeof this.loading === 'undefined') {
      this.loading = this.Loading.create();
      this.loading.present();
      if (this.user.login && this.user.login.length &&
        this.user.email && this.user.email.length &&
        this.user.password && this.user.password.length) {
        const body = {
          login: this.user.login,
          email: this.user.email,
          password: this.user.password
        };
        this.http.post('user/register', body, data => this.success(data), error => this.failure(error));
      } else {
        let errors = [];
        if (!this.user.login || !this.user.login.length) errors.push('Please fill login field.');
        if (!this.user.email || !this.user.email.length) errors.push('Please fill email field.');
        if (!this.user.password || !this.user.password.length) errors.push('Please fill password field.');
        this.loading.dismiss();
        this.loading = undefined;
        this.showToasts(errors);
      }
    }
  }

  /**
   * On success
   *
   * @param data
   */
  private success(data)
  {
    this.login(true);
    this.loading.dismiss();
    this.loading = undefined;
  }

  /**
   * On error
   *
   * @param errors
   */
  private failure(errors)
  {
    console.log('errors', errors);
    this.loading.dismiss();
    this.loading = undefined;
    this.showToasts(errors);
  }

  private showToasts(errors)
  {
    const toast = this.Toast.create({
      message: errors.join('\n'),
      duration: 10000,
      position: 'top',
      showCloseButton: true,
      dismissOnPageChange: true,
      cssClass: 'errToast'
    });
    toast.present();
  }

}
