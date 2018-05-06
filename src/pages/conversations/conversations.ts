import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Socket} from "ng-socket-io";
import {SearchPage} from "../search/search";
import {ConversationPage} from "../conversation/conversation";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ConversationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversations',
  templateUrl: 'conversations.html',
})
export class ConversationsPage {

  private token = localStorage.getItem('token');
  public contributors = [];
  public login:string;

  constructor(public socket: Socket,
              public navCtrl: NavController,
              public navParams: NavParams) {

    this.login = localStorage.getItem('login');

    if(typeof this.token === 'undefined'){
      this.logout(false);
    } else {
      socket.connect();
      socket.emit('attach-user', this.token);
    }
  }

  ionViewDidLoad()
  {
    this.socket.on('invalid-token', () => {
      this.logout(false);
    });

    this.socket.on('contributors', data => {
      console.log('contributors');
      console.log(data);
      this.contributors = data;
      this.sort();
    });

    this.socket.on('message-menu', message => {
      const idx = this.contributors.findIndex(({conversationId}) => conversationId === message.conversation);
      if(idx !== -1){
        this.contributors[idx].lastMessage = {
          text: message.text,
          created: message.created
        };
        this.sort();
      }
    });

    this.socket.emit('contributors', {token: this.token});
  }

  public logout(send = true)
  {
    console.log('logout');
    localStorage.removeItem('token');
    this.socket.disconnect();
    this.navCtrl.setRoot(LoginPage);
  }

  public search()
  {
    this.navCtrl.push(SearchPage);
  }

  public conversation(con)
  {
    console.log(con);
    this.navCtrl.push(ConversationPage, {con});
  }

  private sort()
  {
    this.contributors = this.contributors.sort((a,b) => {
      if(a.lastMessage.date < b.lastMessage.date) return 1;
      if(a.lastMessage.date > b.lastMessage.date) return -1;
      return 0;
    });
  }

}


