import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Socket} from "ng-socket-io";


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public phrase = '';
  public results = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public socket: Socket) {}

  ionViewDidLoad()
  {
    this.socket.on('search-result', data => {
      console.log(data);
      this.results = data;
    });

    this.socket.on('add-contributor-success', data => {
      alert('Contributor added successfully');
      this.navCtrl.pop();
    });

    this.socket.on('add-contributor-failed', data => {
      alert('Contributor adding failed');
    });
  }

  ionViewCanLeave()
  {
    this.socket.removeListener('search-result');
    this.socket.removeListener('add-contributor-success');
    this.socket.removeListener('add-contributor-failed');
  }

  public onInput()
  {
      if(this.phrase.length)
      {
        this.socket.emit('search', {
          token: localStorage.getItem('token'),
          phrase: this.phrase
        });
      }
  }

  public onCancel()
  {
    this.results = [];
  }

  public add(contributor)
  {
    if(!contributor.in_contributors){
      this.socket.emit('add-contributor', {
        token: localStorage.getItem('token'),
        userId: contributor.id
      });
    }
  }

}
