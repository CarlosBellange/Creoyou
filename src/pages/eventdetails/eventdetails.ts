import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the EventdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class EventdetailsPage {
  @ViewChild(Navbar) navBar: Navbar;
  eventdetails: any;
  base_url: any;

  constructor(public events: Events, public remotService: RemoteServiceProvider, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
    this.eventdetails = this.navParams.get('eventdetails');
    console.log(this.eventdetails);
    this.base_url = this.remotService.site_url;
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad EventdetailsPage');
  }
  editevent() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Edit your Event',
      buttons: [
        {
          text: 'Edit Event',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Delete Event',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },

      ]
    });

    actionSheet.present();
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }


}
