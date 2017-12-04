import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController, Slides, AlertController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CommentPage } from '../comment/comment';
import { retry } from 'rxjs/operator/retry';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { PhotouploadPage } from '../../pages/photoupload/photoupload';

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
  album: any;
  base_url: any;
  albumphotos = [];
  albumdetails: any;
  albumname: any;
  albumdescription: any;
  @ViewChild(Slides) slides: Slides;
  currentslideindex = 0;
  currentimage = { count: 0, id: 0, image_like: "0", image_viewed: null, likeActive: 0 };

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, private socialSharing: SocialSharing) {

    this.base_url = this.remotService.site_url;
    this.album = navParams.get('album');
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
        this.albumname = this.albumdetails.name;
        this.albumdescription = this.albumdetails.description;
        console.log(this.albumdescription);
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumviewPage');
  }

  gotoPhotoView(album) {

    console.log(album);

    this.navCtrl.push(PhotoviewPage, { "album": album, "parentPage": this });

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

                  this.remotService.presentLoading('wait ...');
                  this.remotService.postData(DataToSend, 'deletePortfolio').subscribe((response) => {

                    this.remotService.dismissLoader();
                    if (response.success == 1) {
                      this.initPhotoFromalbumData();
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

}
