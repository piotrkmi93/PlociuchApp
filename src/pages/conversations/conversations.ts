import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Socket} from "ng-socket-io";
import {SearchPage} from "../search/search";
import {ConversationPage} from "../conversation/conversation";

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

  constructor(public socket: Socket,
              public navCtrl: NavController,
              public navParams: NavParams) {

    if(typeof this.token === 'undefined'){
      this.logout(false);
    } else {
      socket.connect();
      socket.emit('attach-user', this.token);
    }

    socket.on('invalid-token', () => {
      this.logout(false);
    });

    socket.on('contributors', data => {
      console.log('contributors');
      console.log(data);
      this.contributors = data;
    });
  }

  public ionViewDidLoad() {
    this.socket.emit('contributors', {token: this.token});


    // this.contributors.sort((a,b) => {
    //   if(a.lastMessage.date < b.lastMessage.date) return 1;
    //   if(a.lastMessage.date > b.lastMessage.date) return -1;
    //   return 0;
    // });
  }

  public logout(send = true)
  {
    // todo
    console.log('logout');
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

}
