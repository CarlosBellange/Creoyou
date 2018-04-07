import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Events, Navbar, Content } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AlbumviewPage } from '../../pages/albumview/albumview';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';
import { VideocommentPage } from '../../pages/videocomment/videocomment';
import { AudioProvider } from 'ionic-audio';
import { AudiocommentPage } from '../../pages/audiocomment/audiocomment';
import { AudiodetailsPage } from '../../pages/audiodetails/audiodetails';
import { VideodetailsPage } from '../../pages/videodetails/videodetails';
import { DomSanitizer } from '@angular/platform-browser';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
declare var window;
declare var cordova;
/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChildren('videoPlayer') videoPlayer: QueryList<any>;
  Otherprofileview: string;
  albums = [];
  base_url: any;
  touserid: any;
  otherportfolio: boolean;
  videos: any;
  fileTransfer: FileTransferObject;
  uponlinemsg: any;
  storageDirectory: string = '';
  allmyaudios: any;
  allTracks: any[];
  selectedTrack: any;
  currentTrack: any;
  currentTrackNumber: number = 0;
  arr: any = [];

  constructor(private streamingMedia: StreamingMedia, public _DomSanitizer: DomSanitizer, public events: Events, private _audioProvider: AudioProvider, public modalCtrl: ModalController, private socialSharing: SocialSharing, public fileOpener: FileOpener, public platform: Platform, public file: File, public filePath: FilePath, private transfer: FileTransfer, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.Otherprofileview = 'album';
    this.base_url = this.remotService.site_url;
    this.touserid = navParams.get('touserid');

    // console.log(this.touserid);

    this.initPhotoalbumData();

  }
  segmentChanged(event) {
    if (this.Otherprofileview == 'album') {
      this.initPhotoalbumData();
      this._audioProvider.pause(this.currentTrackNumber);
      this.videoPlayer.forEach((i: ElementRef) => {
        i.nativeElement.pause();
      });
    }
    else if (this.Otherprofileview == 'video') {
      this._audioProvider.pause(this.currentTrackNumber);
      this.initvideo();
    }

    else if (this.Otherprofileview == 'audio') {
      this.initaudio();
      this.videoPlayer.forEach((i: ElementRef) => {
        i.nativeElement.pause();
      });
    }

  }

  initPhotoalbumData() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: this.touserid,
      token: window.localStorage['token']
    }

    this.albums = [];
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'portfolioAlbums').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.albums = response.data.AlbumDetails;
        //console.log(this.albums);
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

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
        var index = this.arr.indexOf(this.arr[i]);
        if (index > -1) {
          this.arr.splice(index, 1);
        }
        for (let g of this.allmyaudios) {
          for (let xc of g.myTracks) {
            if (xc.id != track.id) {
              xc.select = true;
            }

          }

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

  playvideo(g) {
    this._audioProvider.stop();
    for (let g of this.allmyaudios) {
      for (let xc of g.myTracks) {
        xc.select = true;
      }
    }
    let url = this.base_url + 'uploads/portfolioVideos/' + g;
    //console.log(this.videoPlayer);
    // this.videoPlayer.forEach((i: ElementRef) => {
    //   if (url == i.nativeElement.currentSrc) {
    //     i.nativeElement.play();
    //     i.nativeElement.controls = true;
    //     // this._audioProvider.pause();
    //   } else {
    //     i.nativeElement.pause();
    //   }
    // });
    let options: StreamingVideoOptions = {
      successCallback: () => { //console.log('Video played')
      },
      errorCallback: (e) => { //console.log('Error streaming')
      },
      orientation: 'landscape'
    };

    this.streamingMedia.playVideo(url, options);


  }

  audiodetails(track) {
    // console.log(track);
    this.navCtrl.push(AudiodetailsPage, { audiodetails: track });
  }

  videodetails(vdo) {
    this.navCtrl.push(VideodetailsPage, { videodetails: vdo });
  }


  initvideo() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: this.touserid,
      token: window.localStorage['token'],
      type: 'Video'
    }

    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'mediaListing').subscribe((response) => {
      this.remotService.dismissLoader();
      this.videos = response.data;
      // console.log(this.videos);
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

  }


  likeThisvideo(vdo) {
    if (vdo.video_source == "Local Machine") {
      var incienttype = 'Video';
    }
    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: this.touserid,
      token: window.localStorage['token'],
      incidentId: vdo.IncidentId,
      incidentTypeId: vdo.video_id,
      incidentType: incienttype,
    };
    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {
      if (response.success == 1) {

        if (response.data.count > vdo.video_like) {
          vdo.likeActive = 1;
        } else {
          vdo.likeActive = 0;
        }

        vdo.video_like = response.data.count;

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error!');
    });

  }

  /**
     * share post on social media
     * @param item 
     */
  shareThisPost(vdo) {
    var link = '';
    if (vdo.video_source == 'You Tube') {
      link = this.base_url + "user/things/share/youtube/" + vdo.IncidentId + "/1"
    }
    else {
      link = this.base_url + "user/things/share/video/" + vdo.IncidentId + "/1"
    }
    //console.log(link)
    var vddo = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }

  /**
* show comments
*/
  showComments(vdo) {
    let commentModal = this.modalCtrl.create(VideocommentPage, { incidentitem: vdo });
    commentModal.onDidDismiss(data => {
      vdo.comments = data.commentlength;
    });
    commentModal.present();
  }
  gotoPhotoView(album) {
    this.otherportfolio = true;
    this.navCtrl.push(AlbumviewPage, { "album": album, 'touserid': this.touserid, "parentPage": this });
  }





  initaudio() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: this.touserid,
      token: window.localStorage['token'],
      type: 'Audio'
    }

    this.allmyaudios = [];
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'mediaListing').subscribe((response) => {
      this.remotService.dismissLoader();
      // console.log(response);
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

      });
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
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
  showCommentsaudio(track) {
    let commentModal = this.modalCtrl.create(AudiocommentPage, { incidentitem: track });
    commentModal.onDidDismiss(data => {
      track.comments = data.commentlength;
    });
    commentModal.present();
  }

  /**
       * share post on social media
       * @param item 
       */
  shareThisudio(track) {
    var link = this.base_url + "user/things/share/audio/" + track.IncidentId + "/1"
    //console.log(link)
    var vddo = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }
  ionViewWillLeave() {
    this._audioProvider.stop();
    this.remotService.dismissLoader();
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    this.navBar.backButtonClick = () => {
      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }

    // console.log('ionViewDidLoad PortfolioPage');
  }

  ionViewDidEnter() {
    //console.log("Connection pages entered")
    this.content.resize();
  }

}
