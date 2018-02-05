import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { FilePath } from '@ionic-native/file-path';
import { File, FileEntry, IFile } from '@ionic-native/file';

declare var window;
declare var cordova;
/**
 * Generated class for the JobapplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobapply',
  templateUrl: 'jobapply.html',
})
export class JobapplyPage {
  jobs: any;
  jobid: any;
  choseuri: any;
  currentName: any;
  fileTransfer: FileTransferObject;
  base_url: any;
  user_id: any;
  token: any;
  API_URL = 'http://dev.mojolynclife.info/public/index.php/api';
  maxSize: any;

  constructor(public file: File, public filePath: FilePath, public remotService: RemoteServiceProvider, private transfer: FileTransfer, private fileChooser: FileChooser, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.jobs = navParams.get('jobid');
    this.base_url = this.remotService.site_url;
    this.jobid = this.jobs;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    console.log(this.jobid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobapplyPage');
  }
  chooseCV() {
    this.fileChooser.open().then((uri) => {
      this.filePath.resolveNativePath(uri).then((dt) => {
        console.log(dt);
        this.choseuri = dt;
        this.fileSizeValidate(this.choseuri);
        this.fileExtValidate(this.choseuri);
        this.currentName = this.choseuri.substr(this.choseuri.lastIndexOf('/') + 1).replace(/ /g, '_');
        this.currentName = this.currentName.replace(/%20/g, '_');
        this.currentName = this.currentName.replace(/%/g, '_');
        this.currentName = this.currentName.replace(/[^a-zA-Z1-9.]/g, '');
        /*  let exten = this.currentName.substr(this.currentName.lastIndexOf(".") + 1);
         this.currentName = 'Audio' + Date.now() + '.' + exten; */
        console.log(this.currentName);
      })

      /* this.choseuri = uri;
      this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
      this.currentName = this.currentName.replace(/%20/g, '_');
      this.currentName = this.currentName.replace(/%/g, '_');
      console.log(this.currentName);
      this.fileSizeValidate(this.choseuri);
      this.fileExtValidate(this.choseuri); */
    }, () => {
      console.log('error');
    });
  }


  fileExtValidate(fdata) {
    var validExt = ".doc, .docx, .txt, .pdf";
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
    this.maxSize = '2048';
    window.resolveLocalFileSystemURL(fdata, (fileEntry) => {
      fileEntry.getMetadata((metadata) => {
        var fsize = metadata.size / 1024;
        if (fsize > this.maxSize) {
          this.currentName = '';
          this.remotService.presentToast('Please upload a file with size less than: ' + 2 + "MB");
          return false;
        } else {
          return true;
        }
      });
    });
  }


  applypremiumjob() {
    if (this.fileExtValidate(this.choseuri)) {
      this.fileTransfer = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: "cvfile",
        fileName: this.currentName,
        httpMethod: "POST",
        chunkedMode: false,
        mimeType: "application/pdf",
        headers: {},
        params: { 'user_id': this.user_id, 'token': this.token, 'job_id': this.jobid }
      }
      this.remotService.presentLoading();
      console.log(options);
      //console.log(this.videotitle, this.videoprvcy, this.videodesc);
      const url: string = `${this.API_URL}/applyCvJob`;
      console.log(this.choseuri);
      this.fileTransfer.upload(this.choseuri, url, options)
        .then((data) => {
          this.remotService.dismissLoader();
          this.viewCtrl.dismiss({ 'success': 1 });
          console.log(data);
        }, (err) => {
          console.log('error');
          this.remotService.presentToast('Error saving file.');
          this.remotService.dismissLoader();
        });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({ 'success': 0 });
  }

}
