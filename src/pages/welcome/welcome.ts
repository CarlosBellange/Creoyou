import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  
    login(){
      this.navCtrl.push(LoginPage);
    }

    signup(){
     this.navCtrl.push(RegistrationPage);
    }

}
