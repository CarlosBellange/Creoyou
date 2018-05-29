import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';

/**
 * Generated class for the AdvertisementdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advertisementdetails',
  templateUrl: 'advertisementdetails.html',
})
export class AdvertisementdetailsPage {
  @ViewChild(Navbar) navBar: Navbar;
  adddetails: any;
  base_url: any;
  constructor(public events: Events, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.adddetails = this.navParams.get('adddetails');
  }


  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    // console.log('ionViewDidLoad AdvertisementdetailsPage');
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
