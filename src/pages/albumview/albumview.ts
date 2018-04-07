import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController, Slides, AlertController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CommentPage } from '../comment/comment';
import { retry } from 'rxjs/operator/retry';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { PhotouploadPage } from '../../pages/photoupload/photoupload';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { PhotodetailsPage } from '../../pages/photodetails/photodetails';
import { Camera } from '@ionic-native/camera';


declare var window;
declare var cordova;
/**
 * Generated class for the AlbumviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albumview',
  templateUrl: 'albumview.html',
})
export class AlbumviewPage {
  @ViewChild(Content) content: Content;
  album: any;
  base_url: any;
  albumphotos = [];
  albumdetails: any;
  albumname: any;
  albumdescription: any;
  @ViewChild(Slides) slides: Slides;
  currentslideindex = 0;
  touserid = 0;
  currentuserid: any;
  chnagedimagename: any;
  photos = [];
  albumParam: any;
  currentimage = { count: 0, id: 0, image_like: "0", image_viewed: null, likeActive: 0 };
  maxSize: any;

  constructor(public cameraservice: Camera, public basesxfrservice: Base64, public imagepick: ImagePicker, public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, private socialSharing: SocialSharing) {

    this.touserid = navParams.get('touserid') ? navParams.get('touserid') : window.localStorage['userid'];
    this.base_url = this.remotService.site_url;
    this.album = navParams.get('album');
    this.currentuserid = window.localStorage['userid'];
    this.initPhotoalbumData();
    this.albumphotos = [];
    this.currentslideindex = 0;
  }

  initPhotoalbumData() {
    var DataToSend = {
      user_id: this.touserid,
      other_user_id: this.touserid,
      id: this.album.id,
      token: window.localStorage['token']
    }
    this.albumphotos = [];
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'portfolioImages').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.albumphotos = response.data.Images;
        this.albumdetails = response.data.details;
        this.albumname = this.albumdetails.name;
        this.albumdescription = this.albumdetails.description;
       // console.log('view other album data', response.data);
        //this.currentslideindex = this.slides.getActiveIndex();
        //this.currentimage = this.albumphotos[this.currentslideindex];
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });


  }

  ionViewWillEnter() {
    this.content.resize();
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad AlbumviewPage');
  }

  gotoPhotoView(album, id) {
    this.navCtrl.push(PhotoviewPage, { "album": album, 'touserid': this.touserid, "img_id": id, "parentPage": this });

  }
  editAlbum(albm, event) {

    const actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Edit album',
        handler: () => {
          this.navCtrl.push(PhotouploadPage, { "album": albm, "parentPage": this });
        }
      },
      {
        text: 'Delete this album',
        handler: () => {
          if (albm.ifAd == 1) {
            this.remotService.presentToast("You can't delete this album because you have advertised one image from this album");
          }
          else {
            let confirm = this.alertCtrl.create({
              title: 'Remove Photo',
              message: 'Are you sure?',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    var DataToSend = {
                      userId: window.localStorage['userid'],
                      token: window.localStorage['token'],
                      portfolioType: 'Album',
                      portfolioId: albm.id
                    };

                    this.remotService.presentLoading();
                    this.remotService.postData(DataToSend, 'deletePortfolio').subscribe((response) => {

                      this.remotService.dismissLoader();
                      if (response.success == 1) {
                        this.initPhotoalbumData();
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
                   // console.log('Agree clicked');
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


  upLoadImages() {

    const actionSheet = this.actionSheetCtrl.create({
      title: "Add Image",
      buttons: [{
        text: 'Take a Picture',
        handler: () => {
          this.takePicture();
        }
      },
      {
        text: 'Pick From Library',
        handler: () => {

          //**************** */
          this.getimage();
        }
      }
      ]
    });

    actionSheet.present();

  }


  takePicture() {
    let options = {
      quality: 100,
      correctOrientation: true
    };
    this.cameraservice.getPicture(options)
      .then((item) => {
        this.saveImageToArrayBypath(item);

      }, function (error) {
       // console.log(error);
      });
  }
  saveImageToArrayBypath(item) {
    window.resolveLocalFileSystemURL(item, (fileEntry) => {
      fileEntry.getMetadata((metadata) => {
        if (metadata.size > 20971520) {
          this.remotService.presentToast(' Please upload a file with size less than: ' + 20 + "MB");
        } else {
          this.basesxfrservice.encodeFile(item).then((base64File: string) => {
            var bsesixfrImage = base64File.split(',');
            this.photos.push({ 'realpath': base64File, 'foruploadpath': bsesixfrImage[1] });
            var photostosend = {};
            photostosend[0] = bsesixfrImage[1];
            var url = 'ImageUpoloadInExistingAlbum';
            this.albumParam = {
              user_id: window.localStorage['userid'],
              token: window.localStorage['token'],
              privacy: this.albumdetails.privacy,
              album_name: this.albumname,
              description: this.albumdescription,
              image: JSON.stringify(photostosend),
              Album_id: this.album.id
            }
            this.remotService.postData(this.albumParam, url).subscribe((response) => {
              this.remotService.dismissLoader();
              if (response.success == 1) {
                this.remotService.dismissLoader();
                this.initPhotoalbumData();
              } else {
                this.remotService.dismissLoader();
                this.remotService.presentToast(response.message);
              }
            }, () => {
              this.remotService.dismissLoader();
              this.remotService.presentToast('Error getting about details.');

            });
          })
        }
      });
    });
  }


  getimage() {
    let options = {
      maximumImagesCount: 5,
      quality: 100
    }
    this.chnagedimagename = null;
    this.imagepick.getPictures(options)
      .then((results) => {
        results.forEach((item, index) => {
          window.resolveLocalFileSystemURL(item, (fileEntry) => {
            fileEntry.getMetadata((metadata) => {
              if (metadata.size > 20971520) {
                this.remotService.presentToast(' Please upload a file with size less than: ' + 20 + "MB");
              } else {
                this.basesxfrservice.encodeFile(item).then((base64File: string) => {
                  var bsesixfrImage = base64File.split(',');
                  this.photos.push({ 'realpath': base64File, 'foruploadpath': bsesixfrImage[1] });
                  var photostosend = {};
                  photostosend[index] = bsesixfrImage[1];
                  var url = 'ImageUpoloadInExistingAlbum';
                  this.albumParam = {
                    user_id: window.localStorage['userid'],
                    token: window.localStorage['token'],
                    privacy: this.albumdetails.privacy,
                    album_name: this.albumname,
                    description: this.albumdescription,
                    image: JSON.stringify(photostosend),
                    Album_id: this.album.id
                  }
                  this.remotService.postData(this.albumParam, url).subscribe((response) => {
                    this.remotService.dismissLoader();
                    if (response.success == 1) {
                      this.remotService.dismissLoader();
                      this.initPhotoalbumData();
                    } else {
                      this.remotService.dismissLoader();
                      this.remotService.presentToast(response.message);
                    }
                  }, () => {
                    this.remotService.dismissLoader();
                    this.remotService.presentToast('Error getting about details.');

                  });
                })
              }
            });
          });


        });

      }, (err) => {
       // console.log(err)
      });
  }

  /*  saveImageToArrayBypath(filePath) {
     this.photos.length = 0;
 
     this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {
       var bsesixfrImage = base64File.split(',');
       this.photos.push({ 'realpath': base64File, 'foruploadpath': bsesixfrImage[1] });
       var photostosend = {};
       photostosend[0] = this.photos[0].foruploadpath;
       // this.photos.forEach((item, index) => {
       // });
       var url = 'ImageUpoloadInExistingAlbum';
       this.albumParam = {
         user_id: window.localStorage['userid'],
         token: window.localStorage['token'],
         privacy: this.albumdetails.privacy,
         album_name: this.albumname,
         description: this.albumdescription,
         image: JSON.stringify(photostosend),
         Album_id: this.album.id
       }
       this.remotService.presentLoading("Saving ...");
       this.remotService.postData(this.albumParam, url).subscribe((response) => {
 
         this.remotService.dismissLoader();
         if (response.success == 1) {
           this.initPhotoalbumData();
         } else {
           this.remotService.presentToast(response.message);
         }
       }, () => {
         this.remotService.dismissLoader();
         this.remotService.presentToast('Error getting about details.');
       });
     });
   }
  */

  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
  viewdetails(albumname, albumdescription) {
    let pagename = 'Album Details';
    var data = {
      image_title: albumname,
      image_description: albumdescription,
      pagename: pagename
    }
    this.navCtrl.push(PhotodetailsPage, { details: data });
  }
}
