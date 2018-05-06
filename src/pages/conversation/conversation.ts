import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavParams} from 'ionic-angular';
import {Socket} from "ng-socket-io";
/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  @ViewChild(Content) content: Content;

  public login:string;

  public conversation = undefined;
  public messages = [];
  public message = '';

  constructor(public socket: Socket,
              public navParams: NavParams) {
    this.conversation = this.navParams.get('con');
    this.login = localStorage.getItem('login');
  }

  ionViewDidLoad()
  {
    this.socket.on('conversation', messages => {
      console.log('messages', messages);
      this.messages = [...messages];
      this.content.scrollToBottom();

      setTimeout(() => {
        this.content.scrollToBottom(250);
      }, 250);
    });

    this.socket.on('message', message => {
      console.log('message', message);
      if(this.conversation.conversationId === message.conversation){
        this.messages.push(message);

        setTimeout(() => {
          this.content.scrollToBottom(250);
        }, 250);
      }
    });

    this.message = '';
    this.socket.emit('conversation', {
      conversationId: this.conversation.conversationId
    });
  }

  ionViewCanLeave()
  {
    this.socket.removeListener('conversation');
    this.socket.removeListener('message');
  }

  public send()
  {
    if(this.message.length){
      this.socket.emit('send', {
        conversationId: this.conversation.conversationId,
        text: this.message,
        userId: this.conversation.user.id
      });
      this.message = '';
    }
  }

  public showDate(message)
  {
    message.showDate = !message.showDate;
  }

}

