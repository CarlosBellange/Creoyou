import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, Content } from 'ionic-angular';
import { TimeagoPipe } from '../../pipes/timeago/timeago';
import { NotificationsdetailsPage } from '../../pages/notificationsdetails/notificationsdetails';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {


  base_url: any;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;
  notiPageOffset = 0;
  notiData = [];
  showbubble: boolean = true;
  responsedata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events
    , public remotService: RemoteServiceProvider) {

    this.base_url = this.remotService.site_url;
    this.initDataLoad();
    this.readnotification();
  }
  ionViewWillEnter() {
    this.content.resize();
  }

  readnotification() {
    var reddata = {
      token: window.localStorage['token'],
      user_id: window.localStorage['userid']
    }
    this.remotService.postData(reddata, 'readNotification').subscribe((response) => {
      /*   console.log(response);
   */
    }, () => {
      /*  this.remotService.presentToast('Error loading data.'); */
    });
  }

  initDataLoad() {

    var notiparams = {
      startinglimit: this.notiPageOffset,
      token: window.localStorage['token']
    };
    this.remotService.presentLoading();
    this.remotService.postData(notiparams, 'notificationDetails').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.showbubble = false;
        var resData = response.data.userNotification;
        this.responsedata = response.data.userNotification;
        if (resData != null) {

          resData.forEach((item, key, index) => {

            this.notiData.push(item);

          })

        }
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      //this.remotService.presentToast('Error loading data.');
    });

  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.setRoot(HomePage)
    }

    //console.log('ionViewDidLoad NotificationsPage');
  }

  fetchNotificationdata(infiniteScroll) {

    this.notiPageOffset = this.notiPageOffset + 15;
    var notiparams = {
      startinglimit: this.notiPageOffset,
      token: window.localStorage['token']
    };

    this.remotService.postData(notiparams, 'notificationDetails').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        var resData = response.data.userNotification;
        if (resData != null) {

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


  notificationDetails(notifications) {
    if (notifications.user_status == 4) {
      this.remotService.presentToast('Your are not allowed to view that profile.');
    }
    else if (notifications.incident_type == "Connection") {
      var data = {
        user_id: notifications.from_userid
      }
      this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data })
    }
    else {
      this.navCtrl.push(NotificationsdetailsPage, { 'notificationDetails': notifications });
    }

  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
