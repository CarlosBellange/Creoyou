import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/debounceTime';


@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  usertype = 1

  public categories: Array<{ id: number, name: string, checked: boolean }> = [];


  constructor(public navCtrl: NavController, public remotService: RemoteServiceProvider,
    public viewCtrl: ViewController, private alertCtrl: AlertController, public navParams: NavParams) {
    this.searchControl = new FormControl();
    this.usertype = navParams.get('usertype') ? navParams.get('usertype') : window.localStorage['usertype'];
  }

  ionViewDidLoad() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.setFilteredItems();

    });


  }

  setFilteredItems() {

    this.categories = [];
    this.searching = true;

    // if(this.searchTerm!='')
    //  this.categories.push({id:0,name:this.searchTerm,checked:false});

    this.remotService.getCategories(this.searchTerm, this.usertype).subscribe((response) => {
      var categoriesData = response.data;
      categoriesData.forEach((item, key, index) => {

        this.categories.push({ id: item.id, name: item.cat_name, checked: false });
      })
      this.searching = false;
    }, () => { })

  }

  selectCat(catItem) {
    // console.log(catItem)
    this.viewCtrl.dismiss(catItem);
  }

  addCustom() {


    let alert = this.alertCtrl.create({
      title: 'Add A Custom Creative Field',
      inputs: [
        {
          name: 'customfield',
          placeholder: 'Enter Custom Creative Field'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if (data.customfield.trim().length > 0) {
              var catItem = { id: 0, name: data.customfield, checked: false };
              this.viewCtrl.dismiss(catItem);
            }
            else {
              this.showAlert();
            }

          }
        }
      ]
    });
    alert.present();

  }

  dismiss() {

    this.viewCtrl.dismiss({ name: '', id: 0 });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Put your category name',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.addCustom();
        }
      }
      ]
    });
    alert.present();
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
