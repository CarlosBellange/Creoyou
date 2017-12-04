import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Navbar, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@IonicPage()
@Component({
  selector: 'page-photoupload',
  templateUrl: 'photoupload.html',
})
export class PhotouploadPage {

  albumname = '';
  albumdesc: any;
  albumprvcy = 1;
  albumid = 0;
  chnagedimagename: any;
  photos = []; existingphotos = [];
  userFullname: string; userimage: string;
  base_url: string;
  albumParam: any;
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public imagepick: ImagePicker, public cropService: Crop, public cameraservice: Camera,
    public basesxfrservice: Base64, public _DomSanitizer: DomSanitizer, public actionSheetCtrl: ActionSheetController,
    public remotService: RemoteServiceProvider, public alertCtrl: AlertController) {

    this.userFullname = window.localStorage['name'];
    this.base_url = this.remotService.site_url;
    this.userimage = window.localStorage['userimage'];
    var album = navParams.get('album');

    if (album.hasOwnProperty('id')) {
      this.albumid = album.id;
      this.initalbumData();
    }



  }

  initalbumData() {

    var DataToSend = {
      user_id: window.localStorage['userid'],
      id: this.albumid,
      token: window.localStorage['token']
    }
    this.existingphotos = [];
    this.remotService.presentLoading('wait ...');
    this.remotService.postData(DataToSend, 'portfolioImages').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        // this.photos  = response.data.Images;
        var responseImages = response.data.Images;

        responseImages.forEach((item, index) => {

          var imageurl = this.base_url + "uploads/portfolioImages/resizedimages/" + item.image_name;
          item.realpath = imageurl;
          item.foruploadpath = '';
          this.existingphotos.push(item);

        });
        // console.log(this.existingphotos);
        var details = response.data.details;
        this.albumname = details.name;
        this.albumdesc = details.description;
        this.albumprvcy = details.privacy;
        // this.currentslideindex = this.slides.getActiveIndex();
        // this.currentimage = this.albumphotos[this.currentslideindex];
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

  }

  ionViewDidLoad() {

    //over ridding back button
    this.navBar.backButtonClick = () => {

      //this.navParams.get("parentPage").initPhotoalbumData();
      // this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad PhotouploadPage');
  }


  // image cropper modal call
  addImage() {

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
          this.openImagePicker();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
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

        //console.log(results);
        this.saveImageToArrayBypath(item);
        // this.chnagedimagename = null;
        // this.cropService
        //   .crop(data, {
        //     quality: 75
        //   })
        //   .then((newImage) => {
        //     this.chnagedimagename = newImage;
        //     this.saveImageToArray();

        //   }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
  }

  openImagePicker() {
    let options = {
      maximumImagesCount: 5,
    }
    this.chnagedimagename = null;
    this.imagepick.getPictures(options)
      .then((results) => {

        results.forEach((item) => {
          this.saveImageToArrayBypath(item);
        });

      }, (err) => {
        console.log(err)
      });
  }

  // reduceImages(selected_pictures: any): any {
  //   return selected_pictures.reduce((promise: any, item: any) => {
  //     return promise.then((result) => {
  //       return this.cropService.crop(item, {
  //           quality: 75
  //         })
  //         .then(cropped_image => {

  //           this.chnagedimagename = cropped_image;
  //         });
  //     });
  //   }, Promise.resolve());
  // }

  saveImageToArrayBypath(filePath) {


    //let filePath: string = this.chnagedimagename;
    this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {

      var bsesixfrImage = base64File.split(',');
      this.photos.push({ 'realpath': base64File, 'foruploadpath': bsesixfrImage[1] });

    });
  }
  //      //change profile image
  // saveImageToArray() {


  //       let filePath: string = this.chnagedimagename;
  //       this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {

  //         var bsesixfrImage = base64File.split(',');
  //         this.photos.push({'realpath':base64File,'foruploadpath':bsesixfrImage[1]});

  //       });
  //   }

  saveAlbum() {

    var photostosend = {};
    this.photos.forEach((item, index) => {

      photostosend[index] = item.foruploadpath;

    });

    var url = 'newAlbum';
    this.albumParam = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      privacy: this.albumprvcy,
      name: this.albumname,
      description: this.albumdesc,
      image: JSON.stringify(photostosend),
    }

    if (this.albumid > 0) {

      var url = 'ImageUpoloadInExistingAlbum';
      this.albumParam = {
        user_id: window.localStorage['userid'],
        token: window.localStorage['token'],
        privacy: this.albumprvcy,
        album_name: this.albumname,
        description: this.albumdesc,
        image: JSON.stringify(photostosend),
        Album_id: this.albumid
      }

    }

    this.remotService.presentLoading("Saving ...");
    this.remotService.postData(this.albumParam, url).subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.navParams.get("parentPage").initPhotoFromalbumData();
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

  removeImage(index, item: any) {

    let confirm = this.alertCtrl.create({
      title: 'Remove Photo',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            if (item.hasOwnProperty('id')) {
              this.existingphotos.splice(index, 1);
              var uid = window.localStorage['userid'];
              var type = window.localStorage['usertype'];
              var imgrmvParams = {
                userId: uid,
                userType: type,
                portfolioType: 'Image',
                portfolioId: item.id

              };


              this.remotService.postData(imgrmvParams, 'deletePortfolio').subscribe((response) => {

                this.remotService.dismissLoader();
                if (response.success == 1) {

                  this.remotService.presentToast("Removed ...");

                } else {
                  this.remotService.presentToast(response.message);
                }
              }, () => {
                this.remotService.dismissLoader();
                this.remotService.presentToast('Error removing imageitem.');
              });


            } else {
              this.photos.splice(index, 1);
            }


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


  }

}
