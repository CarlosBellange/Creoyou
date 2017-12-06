import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ActionSheetController } from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import { InvitefriendPage } from '../../pages/invitefriend/invitefriend';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';

@IonicPage()
@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})

export class FollowPage {

  base_url: any;
  @ViewChild(Navbar) navBar: Navbar;
  followActiveTab: any;
  followers: any;
  following: any;
  followingOffset: any;
  followerOffset: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events
    , public remotService: RemoteServiceProvider, public actionSheetCtrl: ActionSheetController) {

    this.base_url = this.remotService.site_url;
    this.followActiveTab = "following";
    this.loadFollowings();
  }


  loadFollowers() {

    this.followerOffset = 0;
    var followerParams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      limit: this.followerOffset
    };

    this.followers = [];

    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(followerParams, 'followers').subscribe((response) => {

      this.remotService.dismissLoader();

      if (response.success == 1) {

        if (response.data != null) {

          response.data.forEach((item, key, index) => {

            this.followers.push(item);
            console.log(this.followers);
          })

        }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  loadFollowings() {

    this.followingOffset = 0;
    var followingparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      limit: this.followingOffset
    };

    this.following = [];

    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(followingparams, 'following').subscribe((response) => {

      this.remotService.dismissLoader();
      console.log(response);
      if (response.success == 1) {

        if (response.data != null) {

          response.data.forEach((item, key, index) => {

            this.following.push(item);
          })

        }



      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  presentActionSheet(user, type, index) {
    const actionSheet = this.actionSheetCtrl.create({
      //title: 'Edit your post',
      buttons: [
        {
          text: 'Unfollow',
          role: 'destructive',
          handler: () => {

            this.remotService.presentToast('wait...');
            this.remotService.postData({ 'user_id': user.id, 'to_userid': window.localStorage['userid'] }, 'unfollowUser').subscribe((response) => {

              if (response.success == 1) {

                if (type == 1) {
                  this.following.splice(index, 1);
                } else {
                  this.followers.splice(index, 1);
                }


              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {

              this.remotService.presentToast('Error loading data.');
            });

          }
        },

      ]
    });

    actionSheet.present();
  }

  fetchFollowerData(infiniteScroll) {

    this.followerOffset = this.followerOffset + 15;
    var followerparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      limit: this.followerOffset
    };

    this.remotService.postData(followerparams, 'followers').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        if (response.data != null) {

          response.data.forEach((item, key, index) => {

            this.followers.push(item);
          })

        }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      infiniteScroll.complete();
      this.remotService.presentToast('Error loading data.');
    });

  }

  fetchFollowingData(infiniteScroll) {


    this.followingOffset = this.followingOffset + 15;
    var followingparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      limit: this.followingOffset
    };

    this.remotService.postData(followingparams, 'following').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        if (response.data != null) {

          response.data.forEach((item, key, index) => {

            this.following.push(item);
          })

        }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      infiniteScroll.complete();
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

    console.log('ionViewDidLoad NotificationsPage');
  }

  segmentChanged(event) {

    if (this.followActiveTab == 'following')
      this.loadFollowings();
    else
      this.loadFollowers();

  }

  inviteFriend() {

    this.navCtrl.push(InvitefriendPage);

  }

  OtherProfile(user) {
    var data = {
      user_id: user.id
    }
    this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });
    //this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data, 'friendcheck': connection.is_friend });
  }

}
