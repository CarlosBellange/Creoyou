import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the AudiodetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audiodetails',
  templateUrl: 'audiodetails.html',
})
export class AudiodetailsPage {
  @ViewChild(Navbar) navBar: Navbar;
  audiodetails: any;

  constructor(public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.audiodetails = navParams.get('audiodetails');
    console.log(this.audiodetails);
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad AudiodetailsPage');
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
