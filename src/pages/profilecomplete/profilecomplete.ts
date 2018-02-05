import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';

/**
 * Generated class for the ProfilecompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilecomplete',
  templateUrl: 'profilecomplete.html',
})
export class ProfilecompletePage {
  @ViewChild(Navbar) navBar: Navbar;
  usertype: any;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.usertype = navParams.get('usertype');
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad ProfilecompletePage');
  }

}
