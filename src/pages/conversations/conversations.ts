import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Socket} from "ng-socket-io";

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

  public contributors = [];

  constructor(public socket: Socket,
              public navCtrl: NavController,
              public navParams: NavParams) {
    socket.connect();
  }

  ionViewDidLoad() {
    for(let i=0; i<10; ++i)
    this.contributors.push({
      login: 'Marylson',
      unreadMessages: i*12,
      lastMessage: {
        text: 'Hello!',
        date: 1525184185414 + i*745836
      }
    });

    this.contributors.sort((a,b) => {
      if(a.lastMessage.date < b.lastMessage.date) return 1;
      if(a.lastMessage.date > b.lastMessage.date) return -1;
      return 0;
    })
  }



}
