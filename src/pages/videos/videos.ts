import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, Events, Navbar, Platform, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { VideouploadPage } from '../../pages/videoupload/videoupload';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { VideocommentPage } from '../../pages/videocomment/videocomment';
import { VideodetailsPage } from '../../pages/videodetails/videodetails';
import { ElementDef } from '@angular/core/src/view';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { LoginPage } from '../login/login';
declare var window;
declare var cordova;
/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;
  @ViewChildren('videoPlayer') videoPlayer: QueryList<any>;
  @ViewChild('iframe') iframe: QueryList<any>;
  videos: any;
  base_url: any;
  storageDirectory: string = '';
  fileTransfer: FileTransferObject;
  uponlinemsg: any;
  showmenu: boolean;
  /* currentindex = 0;
  vdo = { count: 0, id: 0, video_like: "0", video_viewed: null, likeActive: 0 }; */
  constructor(private streamingMedia: StreamingMedia, public modalCtrl: ModalController, private socialSharing: SocialSharing, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, private transfer: FileTransfer, public platform: Platform, public file: File, public fileOpener: FileOpener,
    public _DomSanitizer: DomSanitizer, public events: Events, public navCtrl: NavController, public navParams: NavParams, public filePath: FilePath) {
    this.base_url = this.remotService.site_url;

    this.initvideo();

  }

  uploadyourvideo() {
    //console.log(this);
    this.navCtrl.push(VideouploadPage, { "parentPage": this });

  }
  ionViewWillEnter() {
    this.content.resize();
  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad VideosPage');

  }

  initvideo() {


    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      type: 'Video'
    }

    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'mediaListing').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.videos = response.data;
      } else if (response.success == 2) {
        this.remotService.dismissLoader();
        this.navCtrl.push(LoginPage, { closeapp: true });
        window.localStorage.clear();
        this.showmenu = false;
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

  }



  presentActionSheetforvideo(vdo, event) {

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Edit Video',
        handler: () => {
          this.navCtrl.push(VideouploadPage, { "video": vdo, "parentPage": this });
        }
      },
      {
        text: 'Delete this Video',
        handler: () => {
          if (vdo.is_ad == 1) {
            this.remotService.presentToast("You can't delete this video because you have advertised this video");
          }
          else {
            let confirm = this.alertCtrl.create({
              title: 'Remove Video',
              message: 'Are you sure?',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    var DataToSend = {
                      userId: window.localStorage['userid'],
                      token: window.localStorage['token'],
                      portfolioType: 'Video',
                      userType: window.localStorage['usertype'],
                      portfolioId: vdo.video_id
                    };
                    this.remotService.presentLoading();
                    this.remotService.postData(DataToSend, 'deletePortfolio').subscribe((response) => {
                      this.remotService.dismissLoader();
                      if (response.success == 1) {
                        this.remotService.dismissLoader();
                        this.initvideo();
                      } else {
                        this.remotService.dismissLoader();
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

  likeThisvideo(vdo) {
    if (vdo.video_source == "Local Machine") {
      var incienttype = 'Video';
    }
    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      incidentId: vdo.IncidentId,
      incidentTypeId: vdo.video_id,
      incidentType: incienttype,
    };


    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {

      if (response.success == 1) {

        if (response.data.count > vdo.video_like) {
          vdo.video_like = 1;
        } else {
          vdo.video_like = 0;
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
      link = this.base_url + "user/things/share/youtube/" + vdo.IncidentId + "/" + 1
    }
    else {
      link = this.base_url + "user/things/share/video/" + vdo.IncidentId + "/" + 1
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
      vdo.comment = data.commentlength;
      //console.log(vdo.comment);
    });
    commentModal.present();
  }

  videodetails(vdo) {
    this.navCtrl.push(VideodetailsPage, { videodetails: vdo });
  }

  playvideo(g) {
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
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
}
