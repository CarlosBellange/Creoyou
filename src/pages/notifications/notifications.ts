import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events ,Navbar} from 'ionic-angular';
import {TimeagoPipe} from '../../pipes/timeago/timeago';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  base_url : any;
  @ViewChild(Navbar) navBar: Navbar;
  notiPageOffset = 0;
  notiData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events
    ,public remotService: RemoteServiceProvider) {

      this.base_url = this.remotService.site_url;
      this.initDataLoad();
  }


  initDataLoad(){

    var notiparams = {
      startinglimit: this.notiPageOffset,
      token: window.localStorage['token']
    };
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(notiparams, 'notificationDetails').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        var resData = response.data.userNotification;
        if(resData!=null){
          
                    resData.forEach((item, key, index) => {
                      
                                this.notiData.push(item);
                      
                   })
          
       }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');
    
        //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    console.log('ionViewDidLoad NotificationsPage');
  }

  fetchNotificationdata(infiniteScroll) {
    
    this.notiPageOffset = this.notiPageOffset+15;
    var notiparams = {
      startinglimit: this.notiPageOffset,
      token: window.localStorage['token']
    };
   
    this.remotService.postData(notiparams, 'notificationDetails').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        var resData = response.data.userNotification;
        if(resData!=null){

          resData.forEach((item, key, index) => {
            
                      this.notiData.push(item);
            
         })

        }
        


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      infiniteScroll.complete();
      this.remotService.presentToast('Error loading data.');
    });
    
  }

}
