import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController, Slides, AlertController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CommentPage } from '../comment/comment';
import { retry } from 'rxjs/operator/retry';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-photoview',
  templateUrl: 'photoview.html',
})
export class PhotoviewPage {

  album: any;
  base_url: any;
  albumphotos = [];
  albumdetails: any;
  @ViewChild(Slides) slides: Slides;
  currentslideindex = 0;
  currentimage = { count: 0, id: 0, image_like: "0", image_viewed: null, likeActive: 0 };

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, private socialSharing: SocialSharing) {

    this.base_url = this.remotService.site_url;
    this.album = navParams.get('album');
    console.log(this.album);
    this.initPhotoFromalbumData();
    this.albumphotos = [];
    this.currentslideindex = 0;

  }

  initPhotoFromalbumData() {


    var DataToSend = {
      user_id: window.localStorage['userid'],
      id: this.album.id,
      token: window.localStorage['token']
    }
    this.albumphotos = [];
    this.remotService.presentLoading('wait ...');
    this.remotService.postData(DataToSend, 'portfolioImages').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.albumphotos = response.data.Images;
        this.albumdetails = response.data.details;
        this.currentslideindex = this.slides.getActiveIndex();
        this.currentimage = this.albumphotos[this.currentslideindex];
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

    var link = this.base_url + "user/things/share/image/" + this.currentimage.id
    console.log(link)
    var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }

  /**
  * show comments
  */
  showComments(item) {
    item = {
      incident_id: [this.currentimage.id],
      incident_type: 'Image',
      id: this.currentimage.id
    }
    let commentModal = this.modalCtrl.create(CommentPage, { incidentitem: item });
    commentModal.onDidDismiss(data => {
      item.comments = data.commentlength;
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
            console.log('Destructive clicked');
            console.log(this.currentimage);
            this.editimagetitle(this.currentimage);
          }
        },
        {
          text: 'Edit image Description',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.editimagedesc(this.currentimage);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
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
      console.log(response);

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
    this.currentslideindex = this.slides.getActiveIndex();
    this.currentimage = this.albumphotos[this.currentslideindex];
    console.log('Current index is', this.albumphotos, this.albumphotos[this.currentslideindex]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoviewPage');
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var albumdata = {
              id: currentimage.id,
              token: window.localStorage['token'],
              image_title: data.title
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var albumdata = {
              id: currentimage.id,
              token: window.localStorage['token'],
              image_description: data.desc
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

  deleteConfirm(currentimage) {
    let alert = this.alertCtrl.create({
      title: 'Confirm To Delete Image',
      message: 'Do you want to Delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
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
            console.log(albumdata);
            this.remotService.postData(albumdata, 'deletePortfolio').subscribe((response) => {
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
    alert.present();
  }




}


