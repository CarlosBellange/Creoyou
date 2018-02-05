import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';

/**
 * Generated class for the VideodetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videodetails',
  templateUrl: 'videodetails.html',
})
export class VideodetailsPage {
  @ViewChild(Navbar) navBar: Navbar;
  videodetails: any;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.videodetails = navParams.get('videodetails');
    console.log(this.videodetails);
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad VideodetailsPage');
  }

}
