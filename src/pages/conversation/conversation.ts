import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public conversation = undefined;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.conversation = this.navParams.get('con')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

}

