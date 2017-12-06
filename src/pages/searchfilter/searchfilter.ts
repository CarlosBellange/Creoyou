import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { SearchPage } from '../search/search';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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

  constructor(private app: App, public modalCtrl: ModalController, public formBuilder: FormBuilder, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.FormadvanceStepOne = formBuilder.group({
      cfield: ['', Validators.compose([Validators.required])]

    });
    this.initLocationForm();
    this.advsearch = navParams.get('adsdata');
    console.log(this.advsearch);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchfilterPage');
  }
  initLocationForm() {

    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']

    };
    this.countries = [];
    this.remotService.presentLoading("Wait ...");
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
    console.log(country_id);

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
    if (this.jobs == true) {
      this.advsdata = {
        jobname: this.jobname,
        company: this.company,
        jobkeyword: this.jobkeyword,
        locncountry: this.locncountry,
        locnstates: this.locnstates,
        id: this.catid,
        advancesearch: true
      }
    }
    if (this.people == true) {
      this.advsdata = {
        adname: this.adname,
        locncountry: this.locncountry,
        locnstates: this.locnstates,
        id: this.catid,
        company: this.company,
        specializations: this.specializations,
        advancesearch: true
      }
    }
    if (this.business == true) {
      this.advsdata = {
        businessname: this.businessname,
        locncountry: this.locncountry,
        locnstates: this.locnstates,
        id: this.catid,
        advancesearch: true
      }
    }
    console.log(this.advsdata);
    this.app.getRootNav().push(SearchPage, { adsearch: this.advsdata });
  }
  showCategoryModal() {
    let categoryModal = this.modalCtrl.create(CategoriesPage);
    categoryModal.onDidDismiss(data => {
      // Do things with data coming from modal, for instance :
      if (data.hasOwnProperty("id")) {
        console.log("GOt from modal", data);
        this.FormadvanceStepOne.get('cfield').setValue(data.name);
        this.catid = data.name;
      }
    });
    categoryModal.present();
  }

}
