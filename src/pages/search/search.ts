import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, App } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { SearchfilterPage } from '../../pages/searchfilter/searchfilter';
import { JobdetailsPage } from '../../pages/jobdetails/jobdetails';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Navbar) navBar: Navbar;
  all: boolean;
  people: boolean = false;
  business: boolean = false;
  jobs: boolean = false;
  advance: boolean = false;
  searchQuery = '';
  base_url: any;
  user_id: any;
  token: any;
  business_user: any;
  people_user: any;
  jobs_user: any;
  adsearchparam: any;
  cat_name = '';
  name = '';
  company_name = '';
  country: any;
  state: any;
  jobTitle = '';
  jobKeywoard = '';
  specializations = '';
  advsearch: boolean = false;
  searchbycatagory: string;

  constructor(private app: App, public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    this.searchbycatagory = 'all';
    this.adsearchparam = navParams.get('adsearch');
    if (this.adsearchparam && this.adsearchparam.hasOwnProperty('id')) {
      this.cat_name = this.adsearchparam.id;
      this.name = this.adsearchparam.adname;
      this.company_name = this.adsearchparam.company;
      this.country = this.adsearchparam.locncountry;
      this.state = this.adsearchparam.locnstates;
      this.specializations = this.adsearchparam.specializations;
      this.jobTitle = this.adsearchparam.jobname;
      this.jobKeywoard = this.adsearchparam.jobkeyword;
      this.advsearch = this.adsearchparam.advancesearch;
    }

  }

  All() {
    this.all = true;
    this.people = false;
    this.business = false;
    this.jobs = false;
  }
  People() {
    this.all = false;
    this.business = false;
    this.people = true;
    this.jobs = false;
  }
  Business() {
    this.business = true;
    this.all = false;
    this.people = false;
    this.jobs = false;
  }
  Jobs() {
    this.all = false;
    this.people = false;
    this.business = false;
    this.jobs = true;
  }
  searchfilter() {
    /*  var adsdata = {
       people: people,
       business: business,
       jobs: jobs
     } */
    // console.log(this.searchbycatagory);
    this.app.getRootNav().push(SearchfilterPage, { adsdata: this.searchbycatagory });
    //this.navCtrl.push(SearchfilterPage, { /* adsdata: adsdata */ });
  }

  search() {
    /*  this.all = true; */
    this.people = false;
    this.business = false;
    this.jobs = false;
    this.searchQuery;
    this.initsearch();
  }

  initsearch() {
    if (this.advsearch == true) {
      this.all = false;
      this.people = false;
      this.business = false;
      this.jobs = false;
      if (this.jobTitle == undefined || this.jobKeywoard == undefined) {
        this.jobTitle = '';
        this.jobKeywoard = '';
      }
      var DataToSends = {
        cat_name: this.cat_name,
        company_name: this.company_name,
        country: this.country,
        state: this.state,
        jobTitle: this.jobTitle,
        jobKeywoard: this.jobKeywoard,
        name: this.name,
        user_id: window.localStorage['userid'],
        token: window.localStorage['token']
      }
      // console.log(DataToSends);
      this.remotService.presentLoading('wait ...');
      this.remotService.postData(DataToSends, 'Advancedsearch').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.business_user = response.data.BusinessUser;
          this.people_user = response.data.userInfo;
          this.jobs_user = response.data.JobSearch;
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error!');
      });

      // console.log('advance search');
    }
    else {



      var DataToSend = {
        user_id: window.localStorage['userid'],
        token: window.localStorage['token'],
        name: this.searchQuery
      }
      // console.log(DataToSend);
      this.remotService.presentLoading('wait ...');
      this.remotService.postData(DataToSend, 'searchDetails').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.business_user = response.data.BusinessUser;
          this.people_user = response.data.userInfo;
          this.jobs_user = response.data.JobSearch;
          // console.log(response);
          this.all = true;

        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('!error');

      });
    }
  }
  /**
    * send request to a friend
    * @param connection 
    */
  sendRequest(connection) {
    var token = window.localStorage['token'];
    var DataToSend = {
      from_user_id: window.localStorage['userid'],
      to_user_id: connection.id,
      token: token
    };

    this.remotService.presentToast('wait...');
    this.remotService.postData(DataToSend, 'sendRequset').subscribe((response) => {

      if (response.success == 1) {
        this.initsearch();
      }
    }, () => {

      this.remotService.presentToast('Error loading data.');
    });

  }

  sendfollowingRequest(followingdata) {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      to_userid: followingdata.id,
      token: window.localStorage['token'],
      user_type: window.localStorage['usertype']
    };
    this.remotService.presentToast('wait...');
    this.remotService.postData(DataToSend, 'followUser').subscribe((response) => {

      if (response.success == 1) {
        this.initsearch();
      }
    }, () => {

      this.remotService.presentToast('Error loading data.');
    });

  }

  jobdetails(jobs) {
    this.navCtrl.push(JobdetailsPage, { jobsparam: jobs });
    console.log(jobs);
  }

  OtherFrofileView(connection) {
    var data = {
      user_id: connection.id
    }
    console.log(connection.is_friend);
    this.app.getRootNav().push(OtherprofilePage, { 'otheruserfrofiledata': data, 'friendcheck': connection.is_friend });
    //this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data, 'friendcheck': connection.is_friend });
  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad SearchPage');
    this.initsearch();
  }
  segmentChanged(event) {

    if (this.searchbycatagory == 'all')
      this.initsearch();
    else if (this.searchbycatagory == 'people')
      this.initsearch();
    else if (this.searchbycatagory == 'business')
      this.initsearch();
    else if (this.searchbycatagory == 'jobs')
      this.initsearch();
  }
}
