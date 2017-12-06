import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';

/**
 * Generated class for the NotificationsettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificationsettings',
  templateUrl: 'notificationsettings.html',
})
export class NotificationsettingsPage {
  @ViewChild(Navbar) navBar: Navbar;
  autoManufacturers: any;
  request: any;
  comment: any;
  like: any;
  message: any;
  invite: any;

  requests: any;
  comments: any;
  likes: any;
  messages: any;
  eventinvites: any;
  DataToSendFrnd: any;

  constructor(public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {

    this.getnotificationDetails();
  }

  getnotificationDetails() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    }
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(DataToSend, 'notificationSettingDetails').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        if (response.data[0].can_sent_friend_request_any == 1) {
          this.autoManufacturers = 1;
        }
        else {
          this.autoManufacturers = 2;
        }
        if (response.data[0].friend_requests == 1) {
          this.request = true;
          this.requests = 1;
        }
        else {
          this.requests = 0;
        }
        if (response.data[0].event_invites == 1) {
          this.invite = true;
          this.eventinvites = 1;
        }
        else {
          this.eventinvites = 0;
        }
        if (response.data[0].likes == 1) {
          this.like = true;
          this.likes = 1;
        }
        else {
          this.likes = 0;
        }
        if (response.data[0].comments == 1) {
          this.comment = true;
          this.comments = 1;
        }
        else {
          this.comments = 0;
        }
        if (response.data[0].messages == 1) {
          this.message = true;
          this.messages = 1;
        }
        else {
          this.messages = 0;
        }
        console.log(response.data);
      }

    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
  }

  select2() {
    this.DataToSendFrnd = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      can_sent_friend_request_any: 0,
      can_sent_friend_request_by_mobile: 1
    }
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(this.DataToSendFrnd, 'requestCheck').subscribe((response) => {
      this.remotService.dismissLoader();

      console.log(response);
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting data');
    });
  }

  select() {
    this.DataToSendFrnd = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      can_sent_friend_request_any: 1,
      can_sent_friend_request_by_mobile: 0
    }
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(this.DataToSendFrnd, 'requestCheck').subscribe((response) => {
      this.remotService.dismissLoader();

      console.log(response);
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting data');
    });

  }

  Change_Togglerequest(request, comment, like, message, invite) {
    if (request == true) {
      this.requests = 1;
    }
    else if (request == false) {
      this.requests = 0;
    }
    if (comment == true) {
      this.comments = 1;
    }
    else if (comment == false) {
      this.comments = 0;
    }
    if (like == true) {
      this.likes = 1;
    }
    else if (like == false) {
      this.likes = 0;
    }
    if (message == true) {
      this.messages = 1;
    }

    else if (message == false) {
      this.messages = 0;
    }

    if (invite == true) {
      this.eventinvites = 1;
    }
    else if (invite == false) {
      this.eventinvites = 0;
    }
    var DataToSend = {
      user_id: window.localStorage['userid'],
      comments: this.comments,
      event_invites: this.eventinvites,
      friend_requests: this.requests,
      likes: this.likes,
      messages: this.messages,
      token: window.localStorage['token']
    }
    console.log(DataToSend);
    // this.remotService.presentLoading("Wait ...");
    this.remotService.postData(DataToSend, 'notificationSettings').subscribe((response) => {
      // this.remotService.dismissLoader();
      console.log(response);
    }, () => {
      // this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting data');
    });

  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');


    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad NotificationsettingsPage');
  }

}
