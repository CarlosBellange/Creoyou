import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {
  Otherprofileview: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Otherprofileview = 'album';
  }
  segmentChanged(event) {

    if (this.Otherprofileview == 'album')
     
    else if (this.Otherprofileview == 'video')
      
    else if (this.Otherprofileview == 'audio')
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortfolioPage');
  }

}
