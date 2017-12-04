import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


/**
 * Generated class for the AudiuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audiupload',
  templateUrl: 'audiupload.html',
})
export class AudiuploadPage {
  userFullname: string;
  userimage: string;
  base_url: string;
  user_id: any;
  token: any;
  audiotitle = '';
  choseuri: any;
  currentName: any;
  audioid = 0;
  audiodesc: any;
  audioprvcy = 1;
  mediaupd: boolean = true;
  fileTransfer: FileTransferObject;
  API_URL: any = 'http://dev.mojolynclife.info/public/index.php/api';

  constructor(private transfer: FileTransfer, private fileChooser: FileChooser,
    public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.userFullname = window.localStorage['name'];
    this.userimage = window.localStorage['userimage'];
    this.base_url = this.remotService.site_url;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    var audio = navParams.get('audio');

    if (audio && audio.hasOwnProperty('audio_id')) {
      this.audioid = audio.audio_id;
      this.audiotitle = audio.audio_title;
      this.audiodesc = audio.audio_description;
      this.audioprvcy = audio.privacy;
      this.mediaupd = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudiuploadPage');
  }
  chooseAudio() {
    this.fileChooser.open().then((uri) => {
      this.choseuri = uri;
      this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
      this.currentName = this.currentName.replace(/%20/g, '_');
      this.currentName = this.currentName.replace(/%/g, '_');
    }, () => {
      console.log('error');
    });
  }

  uploadAudio() {

    if (this.audioid > 0) {
      console.log('update video');
      console.log(this.audioid);
      var url = 'editMediaDetails';
      var DataToSend = {
        userId: window.localStorage['userid'],
        token: window.localStorage['token'],
        mediaTitle: this.audiotitle,
        mediaDescription: this.audiodesc,
        mediaPrivacy: this.audioprvcy,
        editMediaType: 'Audio',
        editMediaId: this.audioid
      }
      console.log(DataToSend);
      this.remotService.presentLoading("Saving ...");
      this.remotService.postData(DataToSend, url).subscribe((response) => {
        console.log(response);
        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.navParams.get("parentPage").initaudio();
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
        fileKey: "audiofile",
        fileName: this.currentName + '.mp3',
        httpMethod: "POST",
        chunkedMode: false,
        mimeType: "audio/mp3",
        headers: {},
        params: { 'user_id': this.user_id, 'audiodescription': this.audiodesc, 'audioname': this.audiotitle, 'privacy': this.audioprvcy }
      }
      this.remotService.presentLoading('wait ...');
      console.log(options);
      //console.log(this.videotitle, this.videoprvcy, this.videodesc);
      const url: string = `${this.API_URL}/audioUpload`;
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

}
