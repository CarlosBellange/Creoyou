import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';

/**
 * Generated class for the PhotodetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photodetails',
  templateUrl: 'photodetails.html',
})
export class PhotodetailsPage {
  @ViewChild(Navbar) navBar: Navbar;
  details: any;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.details = this.navParams.get('details');
    //console.log(this.details);
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad PhotodetailsPage');
  }

}
