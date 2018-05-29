import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, AlertController, ActionSheetController, Events, Navbar, ModalController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { PhotouploadPage } from '../../pages/photoupload/photoupload';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { AlbumviewPage } from '../../pages/albumview/albumview';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})

export class PhotosPage {
  @ViewChild(Content) content: Content;
  base_url: any;
  @ViewChild(Navbar) navBar: Navbar;
  photoUploadpage = PhotouploadPage;
  albums = [];
  showmenu: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.base_url = this.remotService.site_url;
    /*   this.initPhotoalbumData();
   */
  }

  initPhotoalbumData() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    }
    this.albums = [];
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'portfolioAlbums').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.albums = response.data.AlbumDetails;
      } else if (response.success == 2) {
        this.remotService.dismissLoader();
        this.navCtrl.push(LoginPage, { closeapp: true });
        window.localStorage.clear();
        this.showmenu = false;
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });

  }


  gotoPhotoView(album) {

    // this.navCtrl.push(PhotoviewPage, { "album": album, "parentPage": this });
    this.navCtrl.push(AlbumviewPage, { "album": album, "parentPage": this });
  }

  sendTonewalbum() {

    this.navCtrl.push(PhotouploadPage, { "album": {}, "parentPage": this });

  }


  ionViewWillEnter() {
    this.content.resize();
    this.initPhotoalbumData();
  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    //console.log('ionViewDidLoad PhotosPage');
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
