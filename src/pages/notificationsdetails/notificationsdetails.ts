import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AudioProvider } from 'ionic-audio';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommentPage } from '../comment/comment';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-notificationsdetails',
  templateUrl: 'notificationsdetails.html',
})
export class NotificationsdetailsPage {
  notification: any;
  notdetails = [];
  base_url: any;
  myTracks: any[];
  allTracks: any[];
  selectedTrack: any;

  constructor(public modalCtrl: ModalController, private socialSharing: SocialSharing, private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.notification = navParams.get('notificationDetails');
    this.base_url = this.remotService.site_url;
    console.log('get notification details', this.notification);
    this.initgetNotificationDetails();
  }
  initgetNotificationDetails() {
    var data = {
      token: window.localStorage['token'],
      notificationId: this.notification.id,
      userId: window.localStorage['userid']
    }
    console.log(data);
    this.remotService.presentLoading();
    this.remotService.postData(data, 'seenotificationDetails').subscribe((response) => {
      this.remotService.dismissLoader();
      //this.modiFyitemasnecessary(this.notdetails);
      // this.notdetails = response.data;
      response.data.forEach((item, key, index) => {
        this.modiFyitemasnecessary(item);
        this.notdetails.push(item);
        console.log(this.notdetails);
      });

      console.log(this.notdetails);

    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });
  }


  /**
   * modify home-data as necessary
   * @param item 
   */
  modiFyitemasnecessary(item) {

    if (item.incident_type === 'Audio') {

      var audiosource = (item.audio_name != null && item.audio_name != '') ? this.base_url + item.audio_name : item.audio_source;

      item.myTracks = [{
        src: audiosource,
        artist: 'No Artist',
        title: item.audio_title,
        art: 'img/johnmayer.jpg',
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      }];

    }

    // return item;

  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

  /**
   * share post on social media
   * @param item 
   */
  shareThisPost(item) {

    var type = item.incident_type.toLowerCase()
    var link = this.base_url + "user/things/share/" + type + "/" + item.id
    console.log(link)
    //var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }

  /**
  * show comments
  */
  showComments(item) {
    let commentModal = this.modalCtrl.create(CommentPage, { incidentitem: item });
    commentModal.onDidDismiss(data => {
      item.comments = data.commentlength;
    });
    commentModal.present();
  }

  likeThisitem(item) {
    item.likeCheck = item.likeCheck == '' ? 'fillit' : '';

    var DataToSend = {
      user_id: window.localStorage['userid'],
      incidentTypeId: item.incident_id,
      incidentId: item.id,
      incidentType: item.incident_type,
      fname: item.users_full_name,
      token: window.localStorage['token']
    }
    this.remotService.presentToast('Saving ...');
    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {

      if (response.success == 1) {
        item.likes = response.data.count;
        this.remotService.presentToast('Saved.');

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error!');
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsdetailsPage');
  }
  OtherFrofileView(item) {
    console.log(item);
    if (window.localStorage['userid'] == item.user_id) {
      this.navCtrl.setRoot(HomePage);
    }
    else {
      this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': item });
    }


  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
