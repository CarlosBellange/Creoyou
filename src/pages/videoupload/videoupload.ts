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
  currentName = '';
  choseuri: any;
  userFullname: string;
  userimage: string;
  videotitle = '';
  videodesc: any = '';
  videoprvcy = 1;
  base_url: string;
  user_id: any;
  token: any;
  youtubelink = '';
  checked: boolean = false;
  videoid = 0;
  videoParam: any;
  mediaupd: boolean = true;
  maxSize: any;
  pagetitle: string = '';
  constructor(public file: File, public filePath: FilePath, public remotService: RemoteServiceProvider, private transfer: FileTransfer, private fileChooser: FileChooser, public navCtrl: NavController, public navParams: NavParams) {
    this.userFullname = window.localStorage['name'];
    this.userimage = window.localStorage['userimage'];
    this.base_url = this.remotService.site_url;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    var video = navParams.get('video');
    this.pagetitle = 'Video Add';
    if (video && video.hasOwnProperty('video_id')) {
      this.videoid = video.video_id;
      this.videotitle = video.video_title;
      this.videodesc = video.video_description;
      this.videoprvcy = video.privacy;
      this.mediaupd = false;
      this.pagetitle = 'Edit Your Video';
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad VideouploadPage');
  }
  chooseVideo() {
    this.fileChooser.open().then((uri) => {
      this.filePath.resolveNativePath(uri).then((dt) => {
        //console.log(dt);
        this.choseuri = dt;
        this.fileSizeValidate(this.choseuri);
        this.currentName = this.choseuri.substr(this.choseuri.lastIndexOf('/') + 1).replace(/ /g, '_');
        this.currentName = this.currentName.replace(/%20/g, '_');
        this.currentName = this.currentName.replace(/%/g, '_');
        this.currentName = this.currentName.replace(/[^a-zA-Z1-9.]/g, '');
        /*  let exten = this.currentName.substr(this.currentName.lastIndexOf(".") + 1);
         this.currentName = 'video' + Date.now() + '.' + exten; */
        //console.log(this.currentName);
      })
    }, () => {
      //console.log('error');
    });
  }

  fileExtValidate(fdata) {
    var validExt = ".mp4, .3gp, .mov, .wmv, .flv, .avi";
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
    this.maxSize = '51200';
    window.resolveLocalFileSystemURL(fdata, (fileEntry) => {
      fileEntry.getMetadata((metadata) => {
        //console.log("image size : " + metadata.size);
        var fsize = metadata.size / 1024;
        if (fsize > this.maxSize) {
          this.currentName = '';
          this.remotService.presentToast('Maximum file size exceed, This file size is: ' + 50 + "MB");
          return false;
        } else {
          return true;
        }
      });
    });
  }


  uploadVideo() {
    if (this.videoid > 0) {
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
      //console.log(DataToSend);
      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, url).subscribe((response) => {
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
    else {
      if (this.currentName == null || this.currentName == '' || this.currentName == undefined) {
        this.remotService.presentToast('Please Choose a file First');
      }
      else if (this.fileExtValidate(this.choseuri)) {
        this.fileTransfer = this.transfer.create();
        let options: FileUploadOptions = {
          fileKey: "file",
          fileName: this.currentName,
          httpMethod: "POST",
          chunkedMode: false,
          mimeType: "video/mp4",
          headers: {},
          params: { 'token': window.localStorage['token'], 'user_id': this.user_id, 'description': this.videodesc, 'title': this.videotitle, 'privacy': this.videoprvcy }
        }
        this.remotService.presentLoading();
        //console.log('file upload paramiter', options);
        //console.log(this.videotitle, this.videoprvcy, this.videodesc);
        const url: string = `${this.API_URL}/videoUpload`;
        //console.log('File uri to upload', this.choseuri);
        this.fileTransfer.upload(this.choseuri, url, options)
          .then((data) => {
            this.remotService.dismissLoader();
            this.navParams.get("parentPage").initvideo();
            this.navCtrl.pop()

            //console.log(data);
          }, (err) => {
           // console.log('error');
            this.remotService.dismissLoader();
          });
      }
    }
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
}
