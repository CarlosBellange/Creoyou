import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
  @ViewChild(Navbar) navBar: Navbar;
  user_id: any;
  token: any;
  privacy: any;
  blockuser: any;
  base_url: any;
  touserid: any;
  unflowuser: any;
  unflowmsg: any;
  unblocked: any;
  rejectuser: any;
  rejectmsg: any;

  constructor(public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.privacy = "blocked";
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    this.base_url = this.remotService.site_url;
    this.initblockuser();

  }
  initblockuser() {
    var datatosend = {
      user_id: this.user_id,
      token: this.token
    }
    this.remotService.presentLoading();
    this.remotService.postData(datatosend, 'myBlockedUser').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.blockuser = response.data;
      }
      else {
        this.remotService.dismissLoader();
        this.blockuser = response.data;
        this.unblocked = response.message;
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }

  initunflowuser() {
    //var url = 'myUnfollowUser' + '/' + this.user_id + '/' + this.token;
    var data = {
      user_id: this.user_id,
      token: this.token
    }
    this.remotService.postData(data, 'myUnfollowUser').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.unflowuser = response.data;
      }
      else {
        this.remotService.dismissLoader();
        this.unflowuser = response.data;
        this.unflowmsg = response.message;
      }

    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }
  unblockUser(bluser) {
    this.touserid = bluser.user_id
    var DataToSend = {
      user_id: window.localStorage['userid'],
      to_userid: this.touserid,
      token: window.localStorage['token']
    }
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'UnblockUser').subscribe((response) => {

      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.initblockuser();
      }
      else {
        this.remotService.dismissLoader();
        this.initblockuser();
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }


  Seepost(bluser) {
    this.touserid = bluser.user_id
    var DataToSend = {
      userId: window.localStorage['userid'],
      unfollowedFriendId: this.touserid,
      token: window.localStorage['token']
    }
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'removeUnfollow').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.initunflowuser();
      }
      else {
        this.remotService.dismissLoader();
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }

  segmentChanged(event) {
    if (this.privacy == 'blocked')
      this.initblockuser();
    else if (this.privacy == 'hiddenposts')
      this.initunflowuser();
    else if (this.privacy == 'rejectedlist')
      this.initrejectedlist();
  }

  acceptRequest(conn) {
    var token = window.localStorage['token'];
    var DataToSend = {
      from_useid: conn.user_id,
      to_userid: window.localStorage['userid'],
      token: token
    };
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'acceptRequest').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.initrejectedlist();
      } else {
        this.initrejectedlist();
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader()
      this.remotService.presentToast('Error loading data.');
    });


  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad PrivacyPage');
    /* this.initblockuser();
    this.initunflowuser(); */
  }

  initrejectedlist() {
    var DataToSend = {
      token: this.token,
      user_id: this.user_id
    }
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'rejectedUserList').subscribe((response) => {
      this.remotService.dismissLoader();
      this.rejectuser = response.data;
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }
}
