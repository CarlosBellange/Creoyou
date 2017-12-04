import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


/**
 * Generated class for the VideouploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videoupload',
  templateUrl: 'videoupload.html',
})
export class VideouploadPage {
  show = false;
  fileTransfer: any;
  API_URL: any = 'http://dev.mojolynclife.info/public/index.php/api';
  currentName: any;
  choseuri: any;
  userFullname: string;
  userimage: string;
  videotitle = '';
  videodesc: any;
  videoprvcy = 1;
  base_url: string;
  user_id: any;
  token: any;
  youtubelink = '';
  checked: boolean = false;
  videoid = 0;
  videoParam: any;
  mediaupd: boolean = true;
  constructor(public remotService: RemoteServiceProvider, private transfer: FileTransfer, private fileChooser: FileChooser, public navCtrl: NavController, public navParams: NavParams) {
    this.userFullname = window.localStorage['name'];
    this.userimage = window.localStorage['userimage'];
    this.base_url = this.remotService.site_url;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    var video = navParams.get('video');

    if (video && video.hasOwnProperty('video_id')) {
      this.videoid = video.video_id;
      this.videotitle = video.video_title;
      this.videodesc = video.video_description;
      this.videoprvcy = video.privacy;
      this.mediaupd = false;
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VideouploadPage');
  }
  chooseVideo() {
    this.fileChooser.open().then((uri) => {
      this.choseuri = uri;
      this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
      this.currentName = this.currentName.replace(/%20/g, '_');
      this.currentName = this.currentName.replace(/%/g, '_');
    }, () => {
      console.log('error');
    });
  }
  uploadVideo() {

    if (this.videoid > 0) {
      console.log('update video');
      console.log(this.videoid);
      var url = 'editMediaDetails';
      var DataToSend = {
        userId: window.localStorage['userid'],
        token: window.localStorage['token'],
        mediaTitle: this.videotitle,
        mediaDescription: this.videodesc,
        mediaPrivacy: this.videoprvcy,
        editMediaType: 'Video',
        editMediaId: this.videoid
      }
      console.log(DataToSend);
      this.remotService.presentLoading("Saving ...");
      this.remotService.postData(DataToSend, url).subscribe((response) => {
        console.log(response);
        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.navParams.get("parentPage").initvideo();
          // this.events.publish('creoyou:showmenu');
          this.navCtrl.pop()

        } else {
          this.remotService.presentToast(response.message);
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }

    /* if (this.checked == true) {
      console.log(this.youtubelink);
    } */
    else {
      this.fileTransfer = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: "file",
        fileName: this.currentName + '.mp4',
        httpMethod: "POST",
        chunkedMode: false,
        mimeType: "video/mp4",
        headers: {},
        params: { 'user_id': this.user_id, 'description': this.videodesc, 'title': this.videotitle, 'privacy': this.videoprvcy }
      }
      this.remotService.presentLoading('wait ...');
      console.log(options);
      //console.log(this.videotitle, this.videoprvcy, this.videodesc);
      const url: string = `${this.API_URL}/videoUpload`;
      console.log(this.choseuri);
      this.fileTransfer.upload(this.choseuri, url, options)
        .then((data) => {
          this.remotService.dismissLoader();
          this.navCtrl.pop()
          console.log(data);
        }, (err) => {
          console.log('error');
          this.remotService.dismissLoader();
        });

    }


  }
  /* chooseFile() {

    this.fileChooser.open()
      .then((uri) => {

        var currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
        currentName = currentName.replace(/%20/g, '_');
        this.fileTransfer = this.transfer.create();

        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: currentName,
          httpMethod: "POST",
          params: { description: 'dffsdfds', privacy: '1', user_id: '14', title: 'hghghgh' },
          chunkedMode: false,
          headers: {},

        }
        console.log(options);
        const url: string = `${this.API_URL}/videoUpload`;
        console.log(currentName);
        console.log(uri);

        //  this.loading.present();

        this.fileTransfer.upload(uri, url, options)
          .then((data) => {
            console.log(data);

            if (data.response = "Upload and move success") {
              console.log(data);
              
            }


          }, (err) => {
            
            console.log(err);
          })

       

      },
      (err) => {
        console.log('Error while selecting File.' + err);
      });


  } */

}
