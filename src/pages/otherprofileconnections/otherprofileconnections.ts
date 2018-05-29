import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { HomePage } from '../home/home';
/**
 * Generated class for the OtherprofileconnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherprofileconnections',
  templateUrl: 'otherprofileconnections.html',
})
export class OtherprofileconnectionsPage {
  @ViewChild(Navbar) navBar: Navbar;
  connectionandfollowing: string;
  connections = [];
  shownone: number = 0;
  base_url: any;
  touserid = 0;
  followingOffset: any;
  followerOffset: any;
  following: any;
  followers: any;
  currentuserid = 0;

  constructor(public events: Events, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.touserid = navParams.get('touserid');
    this.currentuserid = window.localStorage['userid']
    this.connectionandfollowing = 'connections';
    this.initViewwithconnectionsdata();
  }

  segmentChanged(event) {

    if (this.connectionandfollowing == 'connections')
      this.initViewwithconnectionsdata();
    else if (this.connectionandfollowing == 'followings')
      this.loadFollowings();
    else if (this.connectionandfollowing == 'followers')
      this.loadFollowers();
  }


  initViewwithconnectionsdata() {

    this.shownone = 0
    var searchparams = {
      user_id: this.touserid,
      token: window.localStorage['token']
    };
    this.connections = [];
    this.remotService.presentLoading();
    this.remotService.postData(searchparams, 'getConnections').subscribe((response) => {

      this.remotService.dismissLoader();
      this.shownone = 1
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.connections = response.data;
        //console.log(this.connections);
      } else {
        this.remotService.dismissLoader();
        // this.remotService.presentToast(response.message);
      }
    }, () => {

      this.shownone = 1
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });
  }

  loadFollowings() {

    this.followingOffset = 0;
    var followingparams = {
      user_id: this.touserid,
      token: window.localStorage['token'],
      limit: this.followingOffset
    };

    this.following = [];

    this.remotService.presentLoading();
    this.remotService.postData(followingparams, 'following').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        if (response.data != null) {

          response.data.forEach((item, key, index) => {
            this.following.push(item);
            //console.log(this.following);
          })

        }

      } else {
        this.remotService.dismissLoader();
        // this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  loadFollowers() {
    this.followerOffset = 0;
    var followerParams = {
      user_id: this.touserid,
      token: window.localStorage['token'],
      limit: this.followerOffset
    };

    this.followers = [];

    this.remotService.presentLoading();
    this.remotService.postData(followerParams, 'followers').subscribe((response) => {

      this.remotService.dismissLoader();

      if (response.success == 1) {
        this.remotService.dismissLoader();
        if (response.data != null) {

          response.data.forEach((item, key, index) => {

            this.followers.push(item);
            // console.log(this.followers);
          })

        }


      } else {
        this.remotService.dismissLoader();
        //this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }


  OtherFrofileView(connection) {
    var data = {
      user_id: connection.id,
      user_type: connection.user_type
    }
    if (this.currentuserid == connection.user_id) {
      this.navCtrl.setRoot(HomePage);
    }
    else {
      this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });
    }

  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }

    //console.log('ionViewDidLoad OtherprofileconnectionsPage');
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
