import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-commonmodal',
  templateUrl: 'commonmodal.html',
})
export class CommonmodalPage {

  items = [];
  title: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.items = navParams.get('items');
    this.title = navParams.get('title');
    console.log("common modal items", this.items)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommonmodalPage');
  }


  dismissModal() {
    //alert("okkk");
    this.viewCtrl.dismiss();
  }

}
