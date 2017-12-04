import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
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
  eventdetails: any;
  base_url: any;

  constructor(public remotService: RemoteServiceProvider, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
    this.eventdetails = this.navParams.get('eventdetails');
    this.base_url = this.remotService.site_url;
  }

  ionViewDidLoad() {
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


}
