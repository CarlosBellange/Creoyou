import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/debounceTime';


@IonicPage()
@Component({
  selector: 'page-taguser',
  templateUrl: 'taguser.html',
})
export class TaguserPage {

  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;
  selectedTags = [];

  public users: any;
  base_url: any;


  constructor(public navCtrl: NavController, public remotService: RemoteServiceProvider,
    public viewCtrl: ViewController) {

    this.base_url = this.remotService.site_url;
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.setFilteredItems();

    });


  }

  setFilteredItems() {

    this.users = [];
    this.searching = true;
    this.selectedTags = [];

    var searchparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      searchkeyword: this.searchTerm
    };
    this.remotService.postData(searchparams, 'getConnections').subscribe((response) => {

      this.searching = false;
      if (response.success == 1) {

        this.users = response.data;

      } else {
        this.remotService.presentToast('Error loading data.');
      }
    }, () => {
      this.searching = false;
      this.remotService.presentToast('Error loading data.');
    });

  }

  /**
   * on chnage checkbox 
   */
  tagThisUser(e: any, item, index) {

    if (e.checked)
      this.selectedTags[index] = item;
    else
      this.selectedTags.splice(index, 1);

    console.log("User should be tagged", e.checked, this.selectedTags)
  }


  dismiss() {
    this.viewCtrl.dismiss({ tags: this.selectedTags });

  }


}
