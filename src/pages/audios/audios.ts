import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AudioProvider } from 'ionic-audio';
import { AudiuploadPage } from '../../pages/audiupload/audiupload';
import { AudiocommentPage } from '../../pages/audiocomment/audiocomment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AudiodetailsPage } from '../../pages/audiodetails/audiodetails';


/**
 * Generated class for the AudiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audios',
  templateUrl: 'audios.html',
})
export class AudiosPage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;
  allmyaudios: any;
  allTracks: any[];
  selectedTrack: any;
  base_url: string;
  currentTrack: any;
  currentTrackNumber: number = 0;
  isPlaying: Boolean = false;
  arr: any = [];
  arr1: any = [];
  extraoudio: any;
  constructor(public events: Events, private socialSharing: SocialSharing, public modalCtrl: ModalController, private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {

    this.base_url = this.remotService.site_url;
    this.initaudio();
  }


  playThisTrack(event, track) {
    if (track.select) {
      track.select = false;

    }
    else {
      track.select = true;
    }
    this.currentTrack = track // This should change the track no?
    this.currentTrackNumber = (track.id);
    this.arr.push(track.id);
    for (let i = 0; i < this.arr.length; i++) {
      if (this.currentTrackNumber != this.arr[i]) {
        this._audioProvider.stop(this.arr[i]);
        for (let g of this.allmyaudios) {
          this.extraoudio = g;
          for (let xc of g.myTracks) {
            if (xc.id != track.id) {
              xc.select = true;
            }

          }
        }

        var index = this.arr.indexOf(this.arr[i]);
        if (index > -1) {
          this.arr.splice(index, 1);
        }

      }
    }
    this._audioProvider.play(this.currentTrackNumber);
    if (this.currentTrackNumber == (track.id)) {

      this._audioProvider.pause(this.currentTrackNumber);
    }
    // Gets the track number from the track id

    // playback actually works but the audio-track-progress-bar doesn't react for me

  }


  uploadyouraudio() {
    this.navCtrl.push(AudiuploadPage, { "parentPage": this });

  }

  initaudio() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      type: 'Audio'
    }

    this.allmyaudios = [];
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'mediaListing').subscribe((response) => {
      this.remotService.dismissLoader();
      //console.log(response);
      response.data.forEach((item, key, index) => {


        var audiosource = (item.audio_source != null && item.audio_source != '') ? item.audio_name : this.base_url + item.audio_name;
        item.myTracks = [{
          src: audiosource,
          artist: 'No Artist',
          title: item.audio_title,
          art: 'img/johnmayer.jpg',
          select: true,
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
        }];
        this.allmyaudios.push(item);


        //console.log(this.allmyaudios);

      });
      /*  for (let g of this.allmyaudios) {
         this.extraoudio = this.allmyaudios;
       } */
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }

  presentActionSheetforaudio(ado, event) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Edit Audio',
        handler: () => {
          this.navCtrl.push(AudiuploadPage, { "audio": ado, "parentPage": this });
        }
      },
      {
        text: 'Delete this Audio',
        handler: () => {
          if (ado.is_ad == 1) {
            this.remotService.presentToast("You can't delete this audio because you have advertised this audio");
          }
          else {
            let confirm = this.alertCtrl.create({
              title: 'Remove Audio',
              message: 'Are you sure?',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {

                    var DataToSend = {
                      userId: window.localStorage['userid'],
                      token: window.localStorage['token'],
                      portfolioType: 'Audio',
                      userType: window.localStorage['usertype'],
                      portfolioId: ado.audio_id
                    };

                    this.remotService.presentLoading();
                    this.remotService.postData(DataToSend, 'deletePortfolio').subscribe((response) => {
                      this.remotService.dismissLoader();
                      if (response.success == 1) {
                        this.initaudio();
                      } else {
                        this.remotService.presentToast(response.message);
                      }
                    }, () => {

                      this.remotService.dismissLoader();
                      this.remotService.presentToast('Error!');
                    });
                  }
                },
                {
                  text: 'Cancel',
                  handler: () => {
                    //console.log('Agree clicked');
                  }
                }
              ]
            });
            confirm.present();

            //action sheet handler end
          }
        }
      }
      ]
    });

    actionSheet.present();


    event.stopPropagation();

  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad AudiosPage');
  }

  likeThisaudio(track) {

    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      incidentId: track.IncidentId,
      incidentTypeId: track.audio_id,
      incidentType: 'Audio',
    };

    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {
      if (response.success == 1) {

        if (response.data.count > track.likes) {
          track.likeActive = 1;

        } else {
          track.likeActive = 0;

        }

        track.likes = response.data.count;

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
  showComments(track) {
    let commentModal = this.modalCtrl.create(AudiocommentPage, { incidentitem: track });
    commentModal.onDidDismiss(data => {
      track.comment = data.commentlength;
    });
    commentModal.present();
  }

  /**
     * share post on social media
     * @param item 
     */
  shareThisPost(track) {
    var link = this.base_url + "user/things/share/audio/" + track.IncidentId + "/1"
    //console.log(link)
    var vddo = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }
  audiodetails(track) {
    this.navCtrl.push(AudiodetailsPage, { audiodetails: track });
  }
  ionViewWillEnter() {
    this.content.resize();
  }
  ionViewWillLeave() {
    this._audioProvider.stop();
    this.remotService.dismissLoader();
  }

}
