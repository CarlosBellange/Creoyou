import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, Platform, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { VideouploadPage } from '../../pages/videoupload/videoupload';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SocialSharing } from '@ionic-native/social-sharing';
import { VideocommentPage } from '../../pages/videocomment/videocomment';
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
  /* @ViewChild('videoPlayer') mVideoPlayer: any; */
  videos: any;
  base_url: any;
  storageDirectory: string = '';
  fileTransfer: FileTransferObject;
  uponlinemsg: any;
  /* currentindex = 0;
  vdo = { count: 0, id: 0, video_like: "0", video_viewed: null, likeActive: 0 }; */
  constructor(public modalCtrl: ModalController, private socialSharing: SocialSharing, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, private transfer: FileTransfer, public platform: Platform, private androidPermissions: AndroidPermissions, public file: File, public fileOpener: FileOpener,
    public _DomSanitizer: DomSanitizer, public events: Events, public navCtrl: NavController, public navParams: NavParams, public filePath: FilePath) {
    this.base_url = this.remotService.site_url;


    this.initvideo();
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    if (this.platform.is('ios')) {
      this.storageDirectory = cordova.file.documentsDirectory;
    }
    else if (this.platform.is('android')) {
      this.storageDirectory = cordova.file.documentsDirectory;
    }
    this.filePath.resolveNativePath(this.file.dataDirectory)
      .then(
      (filePath) => {
        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        console.log("Correct_Path" + correctPath);
        this.storageDirectory = this.file.externalApplicationStorageDirectory;
      },
      (err) => {
        console.log("Error" + err);
      });
  }


  uploadyourvideo() {
    console.log(this);
    this.navCtrl.push(VideouploadPage, { "parentPage": this });

  }
  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    /*  let video = this.mVideoPlayer.nativeElement;
     video.play(); */
    console.log('ionViewDidLoad VideosPage');

  }

  initvideo() {


    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      type: 'Video'
    }

    this.remotService.presentLoading('wait ...');
    this.remotService.postData(DataToSend, 'mediaListing').subscribe((response) => {
      this.remotService.dismissLoader();
      this.videos = response.data;
      /*  this.currentvideo = this.videos[this.currentindex]; */
      /*  if (response.success == 1) {
       } else {
         this.remotService.presentToast(response.message);
       } */
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

  }
  download(nm) {
    this.remotService.presentLoading('wait ...');
    this.fileTransfer = this.transfer.create();
    console.log('ok');
    const url = this.base_url + '/uploads/portfolioVideos/';
    window.resolveLocalFileSystemURL(this.storageDirectory, (dir) => {
      console.log(dir);
      console.log(this.storageDirectory);
    })
    const imageLocation = url + nm;
    console.log(imageLocation);

    this.fileTransfer.download(imageLocation, this.storageDirectory + nm).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.retrieveImage(nm);
    }, (error) => {
      console.log(error);
    });

  }
  retrieveImage(image) {
    this.uponlinemsg = image;
    let res = image.substr(image.indexOf(".") + 1);
    let path = this.filePath.resolveNativePath(this.storageDirectory)
    this.file.checkFile(this.storageDirectory, image)
      .then(() => {

        // const alertSuccess = this.alertCtrl.create({
        //   title: `File retrieval Succeeded! Open In Your Default Player...`,
        //   //subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
        //   buttons: ['Ok']
        // });

        //  return alertSuccess.present().then(() => {

        if (res == 'pdf') {
          var cont = 'application/pdf';
        } else if (res == 'png' || res == 'jpg' || res == 'jpeg' || res == 'gif') {
          cont = 'image/res';
        } else if (res == 'doc') {
          cont = 'application/msword';
        } else if (res = 'mp4') {
          cont = 'video/mp4';
        } else if (res = 'mp3') {
          cont = 'audio/mp3';
        }

        this.fileOpener.open(this.storageDirectory + image, cont)
          .then(() => {
            console.log('File is opened');
            this.remotService.dismissLoader();
            //  alertSuccess.dismiss();

          })
          .catch(e => console.log('Error openening file', e));

        //});

      })
      .catch((err) => {

        // const alertFailure = this.alertCtrl.create({
        //   title: `File retrieval Failed!`,
        //   subTitle: `${image} was not successfully retrieved. Error Code: ${err.code}`,
        //   buttons: ['Ok']
        // });
        //
        // return alertFailure.present();
        this.download(image);

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

                  this.remotService.presentLoading('wait ...');
                  this.remotService.postData(DataToSend, 'deletePortfolio').subscribe((response) => {
                    this.remotService.dismissLoader();
                    if (response.success == 1) {
                      this.initvideo();
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
                  console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();

          //action sheet handler end
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
    console.log(vdo);

    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {
      console.log(response);

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
    var link = this.base_url + "user/things/share/video/" + vdo.IncidentId + "/1"
    console.log(link)
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

}
