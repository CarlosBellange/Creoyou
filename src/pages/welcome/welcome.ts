import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, ViewController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  @ViewChild(Content) content: Content;

  constructor(platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public events: Events) {

  }

  ionViewDidLoad() {
    this.viewCtrl.showBackButton(false);
    this.events.publish('creoyou:hidemenu');
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.content.resize();
  }


  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(RegistrationPage);
  }

}
