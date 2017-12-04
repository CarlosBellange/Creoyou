import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Events, Navbar, ModalController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { PhotouploadPage } from '../../pages/photoupload/photoupload';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { AlbumviewPage } from '../../pages/albumview/albumview';

@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})

export class PhotosPage {

  base_url: any;
  @ViewChild(Navbar) navBar: Navbar;
  photoUploadpage = PhotouploadPage;
  albums = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.base_url = this.remotService.site_url;
    this.initPhotoalbumData();

  }

  initPhotoalbumData() {


    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    }
    this.albums = [];
    this.remotService.presentLoading('wait ...');
    this.remotService.postData(DataToSend, 'portfolioAlbums').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.albums = response.data.AlbumDetails;
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

  }

  /* editAlbum(albm, event) {

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

  } */


  gotoPhotoView(album) {

    // this.navCtrl.push(PhotoviewPage, { "album": album, "parentPage": this });
    this.navCtrl.push(AlbumviewPage, { "album": album, "parentPage": this });
  }

  sendTonewalbum() {

    this.navCtrl.push(PhotouploadPage, { "album": {}, "parentPage": this });

  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    console.log('ionViewDidLoad PhotosPage');
  }

}
