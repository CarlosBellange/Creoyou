import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ModalController, Platform, Content } from 'ionic-angular';
import { ParsonaleditPage } from '../../pages/parsonaledit/parsonaledit';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  parsonaldata: any;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(private theInAppBrowser: InAppBrowser, platform: Platform, public remotService: RemoteServiceProvider, public modalCtrl: ModalController, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.initviewpersonaldata();

  }

  editDatauser(edittype, editparam) {

    this.navCtrl.push(ParsonaleditPage, { 'editsection': edittype, 'editparam': editparam, "parentPage": this });
  }

  initviewpersonaldata() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };

    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'privateDataAndroid').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.parsonaldata = response.data;
        console.log(response);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }
  launch(url: string) {
    let target = "_system";
    console.log(url);
    this.theInAppBrowser.create(url, target, this.options);
  }
  ionViewWillEnter() {
    this.content.resize();
  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad PersonalPage');
  }

}
