import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Navbar, Events, AlertController, ModalController } from 'ionic-angular';
import { EventcreatePage } from '../../pages/eventcreate/eventcreate';
import { EventdetailsPage } from '../../pages/eventdetails/eventdetails';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { EventscalenderPage } from '../eventscalender/eventscalender';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the EventlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventlist',
  templateUrl: 'eventlist.html',
})
export class EventlistPage {
  @ViewChild(Navbar) navBar: Navbar;
  pagename: any;
  eventlist: any;
  base_url: any;
  constructor(private socialSharing: SocialSharing, public modalCtrl: ModalController, private alertCtrl: AlertController, public remotService: RemoteServiceProvider, public events: Events, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.initeventlist();
    this.pagename = this.navParams.get('name');
    /* console.log(this.pagename); */
  }


  initeventlist() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    }
    this.remotService.presentLoading('wait ...');
    this.remotService.postData(DataToSend, 'fullEvents').subscribe((response) => {
      this.remotService.dismissLoader();
      if (this.pagename == 'Past') {
        this.eventlist = response.data.past;
        console.log(this.eventlist);
      }
      else {
        this.eventlist = response.data.upcoming;
      }

    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad EventlistPage');
  }

  editevent(event) {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Edit your Event',
      buttons: [
        {
          text: 'Edit Event',
          role: 'destructive',
          handler: () => {
            /* console.log('Destructive clicked');
            console.log(event); */
            this.navCtrl.push(EventcreatePage, { "Eventdetails": event, "parentPage": this });
          }
        },
        {
          text: 'Delete Event',
          role: 'destructive',
          handler: () => {
            this.deleteEvent(event);
            /*  console.log('Destructive clicked'); */
          }
        },

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
  }

  createEvent() {
    this.navCtrl.push(EventcreatePage, { "parentPage": this });
  }
  eventcalender() {
    this.navCtrl.push(EventscalenderPage, { 'eventcaldetails': this.eventlist });
  }
  eventDetails(event) {
    this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
  }
  deleteEvent(event) {
    let alert = this.alertCtrl.create({
      title: 'Confirm To Delete Event',
      message: 'Do you want to Delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            /*  console.log('Cancel clicked'); */
          }
        },
        {
          text: 'Yes',
          handler: () => {
            var DataToSends = {
              event_id: event.id,
              token: window.localStorage['token']
            }
            this.remotService.presentLoading("Saving ...");
            this.remotService.postData(DataToSends, 'eventDelete').subscribe((response) => {
              this.remotService.dismissLoader();
              if (response.success == 1) {
                this.initeventlist();
              }

            }, () => {
              this.remotService.dismissLoader();
              this.remotService.presentToast('Error getting about details.');
            });

          }
        }
      ]
    });
    alert.present();
  }
  likeThisitem(event) {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      incidentTypeId: event.id,
      incidentId: event.incidentId,
      incidentType: event.incident_type,
      token: window.localStorage['token']
    }
    console.log(event);
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
    var link = this.base_url + "user/things/share/" + type + "/" + event.id
    console.log(link)
    var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }

  addtocalendarEvent(event) {
    var DataToSends = {
      userId: window.localStorage['userid'],
      eventId: event.id,
      token: window.localStorage['token']
    }
    console.log(DataToSends);
    this.remotService.presentLoading("Saving ...");
    this.remotService.postData(DataToSends, 'addToCalender').subscribe((response) => {
      this.remotService.dismissLoader();
      console.log(response);
      if (response.success == 1) {
      }

    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
  }
}
