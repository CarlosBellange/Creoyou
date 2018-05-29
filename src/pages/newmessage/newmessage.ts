import { Component, ViewChild } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { TaguserPage } from '../../pages/taguser/taguser';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import { MessagesPage } from '../../pages/messages/messages';


@IonicPage()
@Component({
  selector: 'page-newmessage',
  templateUrl: 'newmessage.html',
})
export class NewmessagePage {
  @ViewChild(Navbar) navBar: Navbar;
  statustags: any;
  username: any;
  messageText: any;

  constructor(public events: Events, public remotService: RemoteServiceProvider, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  searchConnection() {
    /*Invite connection for event */

    let connectionModal = this.modalCtrl.create(TaguserPage, { pagename: 'Search your connections' });
    connectionModal.onDidDismiss(data => {

      if (data.tags.length > 0) {

        data.tags.forEach((item) => {
          this.statustags = item.user_id;

          this.username = item.users_full_name;
        })

      }
      // console.log(this.statustags);
    });
    connectionModal.present();
  }

  sendMessage() {
    var sendTextparams = {
      to_userid: this.statustags,
      token: window.localStorage['token'],
      content: this.messageText,
      from_userid: window.localStorage['userid']

    };
    this.remotService.postData(sendTextparams, 'sendMessages').subscribe((response) => {
      if (response.success == 1) {
        this.navCtrl.push(MessagesPage);
      }
      else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      // this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });


  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      //   this.navParams.get("parentPage").initViewwithconnectionsdata();
      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
   // console.log('ionViewDidLoad NewmessagePage');
  }

}
