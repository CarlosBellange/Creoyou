import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';


@IonicPage()
@Component({
  selector: 'page-invitefriend',
  templateUrl: 'invitefriend.html',
})
export class InvitefriendPage {

  tags: any;
  inviteemail: any;
  isvalidemail: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteService: RemoteServiceProvider) {

    this.tags = [];
    this.isvalidemail = true;

  }


  addInvitemail() {

    var reeml = /\S+@\S+\.\S+/;
    // console.log("very", this.inviteemail);
    this.isvalidemail = true;
    if (!reeml.test(this.inviteemail)) {

      this.isvalidemail = false;

    } else {

      if (this.tags.indexOf(this.inviteemail) !== -1) {

        this.remoteService.presentAlert("You already added this email.");

      } else {
        this.tags.push(this.inviteemail);
        this.inviteemail = '';
        this.isvalidemail = true;
      }

    }
  }

  removeTag(index) {
    this.tags.splice(index, 1);
  }

  sendInvitations() {
    if (this.inviteemail != '') {
      // this.tags.push(this.inviteemail);
      var reeml = /\S+@\S+\.\S+/;
      // console.log("very", this.inviteemail);
      this.isvalidemail = true;
      if (!reeml.test(this.inviteemail)) {
        this.isvalidemail = false;
      } else {
        if (this.tags.indexOf(this.inviteemail) !== -1) {
          this.remoteService.presentAlert("You already added this email.");
        } else {
          this.tags.push(this.inviteemail);
          this.inviteemail = '';
          this.isvalidemail = true;
        }
      }
    }
    var inviteParam = {
      user_id: window.localStorage['userid'],
      friendsEmail: JSON.stringify(this.tags),
      token: window.localStorage['token']

    };

    this.remoteService.presentLoading();
    this.remoteService.postData(inviteParam, 'invitefreind').subscribe((response) => {
      this.remoteService.dismissLoader();
      if (response.success == 1) {
        this.remoteService.presentAlert(response.message);
        this.tags = [];
        this.inviteemail = '';
        this.isvalidemail = true;

      } else {

        this.remoteService.presentToast(response.message);
      }
    }, () => {
      this.remoteService.dismissLoader();
      this.remoteService.presentToast('Error loading data.');
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitefriendPage');
  }

}
