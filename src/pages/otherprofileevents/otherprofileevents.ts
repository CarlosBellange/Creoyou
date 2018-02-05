import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ModalController, ActionSheetController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { EventdetailsPage } from '../../pages/eventdetails/eventdetails';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the OtherprofileeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherprofileevents',
  templateUrl: 'otherprofileevents.html',
})
export class OtherprofileeventsPage {
  @ViewChild(Navbar) navBar: Navbar;
  otherprofileeventstab: string;
  eventlist: any;
  base_url: any;
  otheruser: any;
  otheruser_id: any;
  constructor(public actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, public modalCtrl: ModalController, public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.otherprofileeventstab = 'upcoming';
    this.base_url = this.remotService.site_url;
    this.otheruser = this.navParams.get('events');
    this.otheruser_id = this.otheruser.user_id;
    this.initeventlist();
  }

  segmentChanged(event) {

    if (this.otherprofileeventstab == 'upcoming')
      this.initeventlist();
    else if (this.otherprofileeventstab == 'past')
      this.initeventlist();

  }

  initeventlist() {
    var DataToSend = {
      user_id: this.otheruser.user_id,
      token: window.localStorage['token']
    }
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'fullEventsOne').subscribe((response) => {
      this.remotService.dismissLoader();
      if (this.otherprofileeventstab == 'past') {
        this.eventlist = response.data.past;

      }
      else if (this.otherprofileeventstab == 'upcoming') {
        this.eventlist = response.data.upcoming;
      }
      console.log(this.eventlist);
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }

  eventDetails(event) {
    this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
  }

  likeThisitem(event) {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      incidentTypeId: event.id,
      incidentId: event.incidentId,
      incidentType: event.incident_type,
      token: window.localStorage['token']
    }
    this.remotService.presentToast('Saving ...');
    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {
      if (response.success == 1) {
        if (response.data.count > event.likes) {
          event.likeActive = 1;
        } else {
          event.likeActive = 0;
        }
        event.likes = response.data.count;
        this.remotService.presentToast('Saved.');

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error!');
    });

  }

  /**
  * show comments
  */
  showComments(event) {
    console.log(event);
    var data = {
      incident_type: event.incident_type,
      id: event.incidentId,
      incident_id: event.id
    }
    let commentModal = this.modalCtrl.create(CommentPage, { incidentitem: data });
    commentModal.onDidDismiss(data => {
      event.count = data.commentlength;

    });
    commentModal.present();
  }

  shareThisPost(event) {

    var type = event.incident_type.toLowerCase()
    var link = this.base_url + "user/things/share/" + type + "/" + event.incidentId + "/" + 1
    console.log(link)
    var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }
  /* eventaddtocalender(event) {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Edit your Event',
      buttons: [
        {
          text: 'Add to Calendar',
          role: 'destructive',
          handler: () => {
            this.addtocalendarEvent(event);
          }
        },

      ]
    });

    actionSheet.present();
  } */


  addtocalendarEvent(event) {
    var DataToSends = {
      userId: window.localStorage['userid'],
      eventId: event.id,
      token: window.localStorage['token']
    }
    console.log(DataToSends);
    this.remotService.presentLoading();
    this.remotService.postData(DataToSends, 'addToCalender').subscribe((response) => {
      this.remotService.dismissLoader();
      console.log(response);
      if (response.success == 1) {

      }
      else {
        this.remotService.presentToast('This event has been already added to your calender.');
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad OtherprofileeventsPage');
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
}
