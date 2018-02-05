import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';

/**
 * Generated class for the VisitedprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitedprofile',
  templateUrl: 'visitedprofile.html',
})
export class VisitedprofilePage {
  @ViewChild(Navbar) navBar: Navbar;
  visited: any;
  base_url: any;

  constructor(public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.initVisitedData();
  }


  initVisitedData() {

    var visitedData = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };

    this.remotService.presentLoading();
    this.remotService.postData(visitedData, 'countView').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.visited = response.data.details;
        console.log(this.visited);
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {


      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

    var pendingreqparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
  }

  otherProfile(visit) {
    console.log(visit);
    var data = {
      user_id: visit.id,
      user_type: visit.user_type
    }
    this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });

  }


  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad VisitedprofilePage');
  }

}
