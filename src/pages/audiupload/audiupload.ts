import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { FilePath } from '@ionic-native/file-path';
import { File, FileEntry, IFile } from '@ionic-native/file';

declare var window;
declare var cordova;
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
  currentName = '';
  audioid = 0;
  audiodesc: any;
  audioprvcy = 1;
  mediaupd: boolean = true;
  fileTransfer: FileTransferObject;
  API_URL: any = 'http://dev.mojolynclife.info/public/index.php/api';
  maxSize: any;
  filechoose: any;
  pagetitle: string = '';

  constructor(public file: File, public filePath: FilePath, private transfer: FileTransfer, private fileChooser: FileChooser,
    public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.userFullname = window.localStorage['name'];
    this.userimage = window.localStorage['userimage'];
    this.base_url = this.remotService.site_url;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    var audio = navParams.get('audio');
    this.pagetitle = 'Audio Add';

    if (audio && audio.hasOwnProperty('audio_id')) {
      this.audioid = audio.audio_id;
      this.audiotitle = audio.audio_title;
      this.audiodesc = audio.audio_description;
      this.audioprvcy = audio.privacy;
      this.mediaupd = false;
      this.pagetitle = 'Edit Your Audio';
      this.currentName;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudiuploadPage');
  }
  chooseAudio() {
    this.fileChooser.open().then((uri) => {
      this.filePath.resolveNativePath(uri).then((dt) => {
        console.log(dt);
        this.choseuri = dt;
        this.fileSizeValidate(this.choseuri);
        this.currentName = this.choseuri.substr(this.choseuri.lastIndexOf('/') + 1).replace(/ /g, '_');
        this.currentName = this.currentName.replace(/%20/g, '_');
        this.currentName = this.currentName.replace(/%/g, '_');
        this.currentName = this.currentName.replace(/[^a-zA-Z1-9.]/g, '');
        /*  let exten = this.currentName.substr(this.currentName.lastIndexOf(".") + 1);
         this.currentName = 'Audio' + Date.now() + '.' + exten; */
        console.log(this.currentName);
      })


      /* this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
      this.currentName = this.currentName.replace(/%20/g, '_');
      this.currentName = this.currentName.replace(/%/g, '_');
      this.fileSizeValidate(this.choseuri);
      this.fileExtValidate(this.choseuri); */
    }, () => {
      console.log('error');
    });
  }

  fileExtValidate(fdata) {
    var validExt = ".mp3";
    var filePath = fdata;
    var getFileExt = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
    var pos = validExt.indexOf(getFileExt);
    if (pos < 0) {
      this.currentName = '';
      this.remotService.presentToast("Incorrect file type. Please try uploading any file of the following format:" + validExt);
      return false;
    } else {
      return true;
    }
  }

  fileSizeValidate(fdata) {
    this.maxSize = '20480';
    window.resolveLocalFileSystemURL(fdata, (fileEntry) => {
      fileEntry.getMetadata((metadata) => {
        var fsize = metadata.size / 1024;
        if (fsize > this.maxSize) {
          this.currentName = '';
          this.remotService.presentToast(' Please upload a file with size less than: ' + 20 + "MB");
          return false;
        } else {
          return true;
        }
      });
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
      this.remotService.presentLoading();
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

    else {
      if (this.currentName == null || this.currentName == '' || this.currentName == undefined) {
        this.remotService.presentToast('Please Choose a file First');
      }
      else if (this.fileExtValidate(this.choseuri)) {
        this.fileTransfer = this.transfer.create();
        let options: FileUploadOptions = {
          fileKey: "audiofile",
          fileName: this.currentName,
          httpMethod: "POST",
          chunkedMode: false,
          mimeType: "audio/mp3",
          headers: {},
          params: {
            'user_id': this.user_id,
            'audiodescription': this.audiodesc,
            'audioname': this.audiotitle,
            'privacy': this.audioprvcy,
            token: window.localStorage['token']
          }
        }
        this.remotService.presentLoading();
        console.log(options);
        const url: string = `${this.API_URL}/audioUpload`;
        console.log(this.choseuri);
        this.fileTransfer.upload(this.choseuri, url, options)
          .then((data) => {
            this.remotService.dismissLoader();
            this.navParams.get("parentPage").initaudio();
            this.navCtrl.pop()
            console.log(data);
          }, (err) => {
            console.log(err);
            this.remotService.dismissLoader();
          });


      }

    }
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
}
