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

  constructor(public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.privacy = "blocked";
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    this.base_url = this.remotService.site_url;

  }
  initblockuser() {
    var url = 'myBlockedUser' + '/' + this.user_id + '/' + this.token;
    this.remotService.presentLoading('wait ...');
    this.remotService.getData(url).subscribe((response) => {
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.blockuser = response.data;
      }

    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }

  initunflowuser() {
    var url = 'myUnfollowUser' + '/' + this.user_id + '/' + this.token;
    this.remotService.getData(url).subscribe((response) => {
      console.log(response);
      if (response.success == 1) {
        this.unflowuser = response.data;
        console.log(this.unflowuser);
      }
      else {
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
    this.remotService.presentLoading('wait ...');
    this.remotService.postData(DataToSend, 'UnblockUser').subscribe((response) => {
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.initblockuser();
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad PrivacyPage');
    this.initblockuser();
    this.initunflowuser();
  }

}
