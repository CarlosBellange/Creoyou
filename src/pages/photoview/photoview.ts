import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController, Slides, AlertController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CommentPage } from '../comment/comment';
import { retry } from 'rxjs/operator/retry';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotodetailsPage } from '../../pages/photodetails/photodetails';


@IonicPage()
@Component({
  selector: 'page-photoview',
  templateUrl: 'photoview.html',
})
export class PhotoviewPage {
  @ViewChild(Navbar) navBar: Navbar;
  album: any;
  base_url: any;
  albumphotos = [];
  albumdetails: any;
  @ViewChild(Slides) slides: Slides;
  currentslideindex = 0;
  touserid = 0;
  currentuserid: any;
  img_id: any;
  currentimage = { count: 0, id: 0, image_like: "0", image_viewed: null, likeActive: 0 };

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, private socialSharing: SocialSharing) {
    this.touserid = navParams.get('touserid') ? navParams.get('touserid') : window.localStorage['userid'];
    this.base_url = this.remotService.site_url;
    this.album = navParams.get('album');
    this.img_id = this.navParams.get('img_id');
    console.log(this.img_id);
    this.currentuserid = window.localStorage['userid'];
    this.initPhotoFromalbumData();
    this.albumphotos = [];
    this.currentslideindex = 0;

  }

  initPhotoFromalbumData() {

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
        let oldarr = this.albumphotos;
        let finalarr = [];
        for (let i of this.albumphotos) {
          if (i.id == this.img_id) {
            finalarr.push(i);
          }
        }
        for (let i of this.albumphotos) {
          if (i.id != this.img_id) {
            finalarr.push(i);
          }
        }
        this.albumphotos = finalarr;
        this.albumdetails = response.data.details;
        if (this.albumphotos.length == 1) {
          this.slides.lockSwipes(true);
        } else {
          this.slides.lockSwipes(false);
        }

        this.currentslideindex = this.slides.getActiveIndex();
        this.currentimage = this.albumphotos[this.currentslideindex];
        console.log(this.currentimage);
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });


  }

  /**
   * share post on social media
   * @param item 
   */
  shareThisPost() {

    var link = this.base_url + "user/things/share/pimage/" + this.currentimage.id + "/" + 1
    console.log(link)
    var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }

  /**
  * show comments
  */
  showComments(currentimage) {
    let arr = [this.currentimage.id];
    var item = {
      incident_id: JSON.stringify(arr),
      incident_type: 'Image',
      id: this.currentimage.id
    }
    let commentModal = this.modalCtrl.create(CommentPage, { incidentitem: item });
    commentModal.onDidDismiss(data => {
      currentimage.count = data.commentlength;
    });
    commentModal.present();
  }

  editImg() {
    const actionSheet = this.actionSheetCtrl.create({
      //title: 'Edit your post',
      buttons: [
        {
          text: 'Edit image title',
          role: 'destructive',
          handler: () => {
            this.editimagetitle(this.currentimage);
          }
        },
        {
          text: 'Edit image Description',
          role: 'destructive',
          handler: () => {
            this.editimagedesc(this.currentimage);
          }
        },
        {
          text: 'Add Keyword',
          role: 'destructive',
          handler: () => {
            this.addkeyword(this.currentimage);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
            this.deleteConfirm(this.currentimage);
          }
        },

      ]
    });
    actionSheet.present();
  }

  likeThisimage() {

    var DataToSend = {
      imageId: this.currentimage.id,
      userId: window.localStorage['userid'],
      token: window.localStorage['token']
    };

    this.remotService.postData(DataToSend, 'likeImageAction').subscribe((response) => {
      // console.log(response);

      if (response.success == 1) {

        if (response.data.count > this.currentimage.image_like) {
          this.currentimage.likeActive = 1;
        } else {
          this.currentimage.likeActive = 0;
        }

        this.currentimage.image_like = response.data.count;

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error!');
    });

  }

  slideChanged() {

    console.log(this.slides.length);

    if (this.slides.isEnd()) {

      this.slides.lockSwipeToNext(true);
    }
    else {
      this.slides.lockSwipeToNext(false);
    }
    // console.log(this.slides.getActiveIndex());
    this.currentslideindex = this.slides.getActiveIndex();
    this.currentimage = this.albumphotos[this.currentslideindex];
    console.log('Current index is', this.albumphotos, this.albumphotos[this.currentslideindex]);



  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {
      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    //  console.log('ionViewDidLoad PhotoviewPage');
  }

  editimagetitle(currentimage) {
    let prompt = this.alertCtrl.create({
      title: 'Change Title',
      message: "Edit Your Image Title",
      inputs: [
        {
          name: 'title',
          placeholder: '',
          value: currentimage.image_title
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var albumdata = {
              id: currentimage.id,
              token: window.localStorage['token'],
              image_title: data.title,
              type: 'image_title'
            }
            // console.log(albumdata);
            this.remotService.postData(albumdata, 'EditImageTitles').subscribe((response) => {
              console.log(response);
              if (response.success == 1) {

                this.initPhotoFromalbumData();

              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {
              this.remotService.presentToast('Error saving data.');
            });
          }
        }
      ]
    });
    prompt.present();
  }

  editimagedesc(currentimage) {
    let prompt = this.alertCtrl.create({
      title: 'Change Description',
      message: "Edit Your Image Description",
      inputs: [
        {
          name: 'desc',
          placeholder: '',
          value: currentimage.image_description
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var albumdata = {
              id: currentimage.id,
              token: window.localStorage['token'],
              image_description: data.desc,
              type: 'image_description'
            }
            // console.log(albumdata);
            this.remotService.postData(albumdata, 'EditImageTitles').subscribe((response) => {
              //  console.log(response);
              if (response.success == 1) {

                this.initPhotoFromalbumData();

              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {
              this.remotService.presentToast('Error saving data.');
            });
          }
        }
      ]
    });
    prompt.present();
  }



  addkeyword(currentimage) {
    let prompt = this.alertCtrl.create({
      title: 'Enter Keyword',
      message: "Enter Your Image Keywords",
      inputs: [
        {
          name: 'keyword',
          placeholder: '',
          value: currentimage.image_keywords
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var albumdata = {
              id: currentimage.id,
              token: window.localStorage['token'],
              image_keywords: data.keyword,
              type: 'image_keywords'
            }
            // console.log(albumdata);
            this.remotService.postData(albumdata, 'EditImageTitles').subscribe((response) => {
              //  console.log(response);
              if (response.success == 1) {

                this.initPhotoFromalbumData();

              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {
              this.remotService.presentToast('Error saving data.');
            });
          }
        }
      ]
    });
    prompt.present();
  }

  deleteConfirm(currentimage) {
    if (currentimage.is_ad == 1) {
      this.remotService.presentToast("You can't delete this Image because you have advertised this Image");
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Confirm To Delete Image',
        message: 'Do you want to Delete this?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              var albumdata = {
                userId: window.localStorage['userid'],
                portfolioId: currentimage.id,
                token: window.localStorage['token'],
                userType: window.localStorage['usertype'],
                portfolioType: 'Image'
              }
              // console.log(albumdata);
              this.remotService.postData(albumdata, 'deletePortfolio').subscribe((response) => {
                // console.log(response);
                if (response.success == 1) {

                  this.initPhotoFromalbumData();

                } else {
                  this.remotService.presentToast(response.message);
                }
              }, () => {
                this.remotService.presentToast('Error saving data.');
              });
            }
          }
        ]
      });
      alert.present();
    }
  }
  viewdetails(img) {
    this.navCtrl.push(PhotodetailsPage, { details: img });
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
}


