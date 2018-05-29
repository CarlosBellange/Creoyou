import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the PremiumuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-premiumuser',
  templateUrl: 'premiumuser.html',
})
export class PremiumuserPage {
  @ViewChild(Navbar) navBar: Navbar;
  user_id: any;
  token: any;
  membershipPlanData: any;
  pointsAccumulationData: any;
  usersCurrentPoints: any;
  premiumuser: any;
  enddate: any;

  constructor(public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {

    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    this.initgetPremiumUser();
  }


  initgetPremiumUser() {
    var data = {
      user_id: this.user_id,
      token: this.token
    }
    this.remotService.presentLoading();
    this.remotService.postData(data, 'premiumDetails').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.membershipPlanData = response.data.membershipPlanData;
        this.pointsAccumulationData = response.data.pointsAccumulationData;
        this.usersCurrentPoints = response.data.usersCurrentPoints;
        this.premiumuser = response.data.premiumUser;
        this.enddate = response.data.end_date;
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()

    }
    //console.log('ionViewDidLoad PremiumuserPage');
  }

}
