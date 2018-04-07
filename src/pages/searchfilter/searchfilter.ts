import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { SearchPage } from '../search/search';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesPage } from '../../pages/categories/categories';

/**
 * Generated class for the SearchfilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchfilter',
  templateUrl: 'searchfilter.html',
})
export class SearchfilterPage {
  @ViewChild(Navbar) navBar: Navbar;
  countries: any;
  states: any;
  FormadvanceStepOne: FormGroup;
  catid = '';
  adname = '';
  company = '';
  specializations = '';
  jobkeyword = '';
  locncountry = '';
  locnstates = '';
  businessname = '';
  jobname = '';
  advsearch: any;
  jobs: boolean;
  people: boolean;
  business: boolean;
  advsdata: any;
  userType = 1;
  categoriesData: any;

  constructor(public events: Events, public modalCtrl: ModalController, public formBuilder: FormBuilder, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    /* this.FormadvanceStepOne = formBuilder.group({
      cfield: ['', Validators.compose([Validators.required])]

    }); */
    this.initLocationForm();

    this.advsearch = navParams.get('adsdata');
    if (this.advsearch == 'business') {
      this.userType = 2;
      this.setFilteredItems();
    }
    else {
      this.setFilteredItems();
    }
    // console.log('adv search', this.advsearch);

  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad SearchfilterPage');
  }
  initLocationForm() {

    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']

    };
    this.countries = [];
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'countries').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.countries = response.data;

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }

  initStates(country_id) {
    //console.log(country_id);

    this.states = [];
    this.remotService.postData({ 'country_id': country_id }, 'states').subscribe((response) => {

      if (response.success == 1) {

        this.states = response.data;

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error getting about details.');
    });

  }
  advanceSearch() {
    if (this.advsearch == 'job') {
      this.advsdata = {
        jobname: this.jobname,
        company: this.company,
        jobkeyword: this.jobkeyword,
        locncountry: this.locncountry,
        locnstates: this.locnstates,
        id: this.catid,
        advancesearch: this.advsearch
      }
    }

    if (this.advsearch == 'people') {
      this.advsdata = {
        adname: this.adname,
        locncountry: this.locncountry,
        locnstates: this.locnstates,
        id: this.catid,
        company: this.company,
        specializations: this.specializations,
        advancesearch: this.advsearch
      }

    }
    if (this.advsearch == 'business') {
      this.advsdata = {
        businessname: this.businessname,
        locncountry: this.locncountry,
        locnstates: this.locnstates,
        id: this.catid,
        advancesearch: this.advsearch
      }
    }
    //console.log(this.advsdata);
    this.navCtrl.push(SearchPage, { adsearch: this.advsdata });
  }

  setFilteredItems() {
    var data = {
      user_type: this.userType,
      term: ''
    }
    /*  this.remotService.getCategories(this.searchTerm, this.usertype).subscribe((response) => { */
    this.remotService.postData(data, 'user-category').subscribe((response) => {
      if (response.success == 1) {
        this.categoriesData = response.data;
      }

    }, () => { })

  }

  showCategoryModal() {
    let categoryModal = this.modalCtrl.create(CategoriesPage, { usertype: this.userType });
    categoryModal.onDidDismiss(data => {
      // Do things with data coming from modal, for instance :
      if (data.hasOwnProperty("id")) {
        //console.log("GOt from modal", data);
        this.FormadvanceStepOne.get('cfield').setValue(data.name);
        this.catid = data.id;
      }
    });
    categoryModal.present();
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }
}
