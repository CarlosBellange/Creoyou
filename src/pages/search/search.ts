import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, Events, Navbar, App, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { SearchfilterPage } from '../../pages/searchfilter/searchfilter';
import { JobdetailsPage } from '../../pages/jobdetails/jobdetails';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
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
  @ViewChild(Content) content: Content;
  all: boolean;
  people: boolean = false;
  business: boolean = false;
  jobs: boolean = false;
  advance: boolean = false;
  searchQuery = '';
  base_url: any;
  user_id: any;
  token: any;
  business_user = [];
  people_user = [];
  jobs_user = [];
  adsearchparam: any;
  cat_name = '';
  name = '';
  company_name = '';
  country: any;
  state: any;
  jobTitle = '';
  jobKeywoard = '';
  specializations = '';
  advsearch: any;
  searchbycatagory: string;
  businessname = '';
  date: any;
  friend_request: any;

  constructor(private alertCtrl: AlertController, private app: App, public remotService: RemoteServiceProvider,
    public events: Events, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.base_url = this.remotService.site_url;
    this.user_id = window.localStorage['userid'];
    this.token = window.localStorage['token'];
    this.searchbycatagory = 'all';
    this.date = new Date();
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
      this.searchbycatagory = this.adsearchparam.advancesearch;
      this.businessname = this.adsearchparam.businessname;
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

  ionViewWillEnter() {
    this.content.resize();
  }


  initsearch() {

    this.jobs_user = [];
    this.people_user = [];
    this.business_user = [];

    if (this.advsearch == 'people') {
      this.advsearch = 'peopleName';
    }
    if (this.advsearch == 'business') {
      this.advsearch = 'businessName';
    }
    if (this.advsearch) {

      var params = "searchAllKeyword=" + '' + "&searchByPeopleName=" + this.name + "&peopleSpecializations=" + this.specializations + "&peopleCreativeField=" + this.cat_name + "&businessCreativeField=" + this.cat_name + "&searchPeopleByCompany="
        + this.company_name + "&searchByBusinessName=" + this.businessname + "&searchByJobTitle=" + this.jobTitle + "&searchJobByCompany=" + this.company_name +
        "&searchJobByKeywords=" + this.jobKeywoard + "&sortType=creationDate" + "&searchKeyword=" + '' + "&searchBy=" + this.advsearch
        + "&searchByCountry=" + this.country + "&searchByState=" + this.state + "&userId=" + this.user_id;
      var url = this.base_url + "user/app-search/advancedMobileSearch";

      this.remotService.presentLoading();
      this.http.get(url + "?" + params).map(res => res.json()).subscribe(data => {
        this.remotService.dismissLoader();
        if (data.searchBy == 'job') {
          data.allJobs.forEach(item => {
            item.users_full_name = item.fname + ' ' + item.lname;
            item.job_title = item.jobTitle;
            item.posted_by = item.createdBy.buisnessName;
            item.jobtype = item.jobType.name;
            item.city = item.city;
            item.state = item.state != null ? item.state.name : null;
            item.country = item.country.name;
            item.image = null;
            let date1: any = new Date(item.jobPostStartDate.timestamp * 1000);
            let date2: any = this.date;
            let diffInMs: number = Date.parse(date2) - Date.parse(date1);
            let difinsec: number = Math.round(diffInMs / 1000);
            let diffmin: number = Math.round(diffInMs / 1000 / 60);
            let diffInHours: number = Math.round(diffInMs / 1000 / 60 / 60);
            let diffIndays: number = Math.round(diffInMs / 1000 / 60 / 60 / 24);
            let weekindiff: number = Math.round(diffInMs / 1000 / 60 / 60 / 24 / 7);
            item.second = difinsec;
            item.minute = diffmin;
            item.hour = diffInHours;
            item.days = diffIndays;
            item.weeks = weekindiff;
            if (item.createdBy.profile != null && item.createdBy.profile != '') {
              item.image = item.createdBy.profile.image;
            }
            this.jobs_user.push(item);
            //console.log(this.jobs_user);

          })

        }
        if (data.searchBy == 'peopleName') {
          for (var i = 0; i < data.peopleSettings.length; i++) {
            data.allPeoples[i].cat_name = data.peopleSettings[i].userCategory != null ? data.peopleSettings[i].userCategory : null;
            data.allPeoples[i].friend = data.peopleSettings[i].isfriend;
            data.allPeoples[i].follower = data.peopleSettings[i].isfollowing;
            data.allPeoples[i].can_sent_friend_request_by_mobile = data.peopleSettings[i].friendRequestMob;
            data.allPeoples[i].can_sent_friend_request_any = data.peopleSettings[i].friendRequestAny;
            data.allPeoples[i].premium_user = data.allPeoples[i].premiumUser;
            data.allPeoples[i].users_full_name = data.allPeoples[i].fname + ' ' + data.allPeoples[i].lname;
            if (data.allPeoples[i].profile != null && data.allPeoples[i].profile != '') {
              data.allPeoples[i].image = data.allPeoples[i].profile.image;
              data.allPeoples[i].state = data.allPeoples[i].profile.state != null ? data.allPeoples[i].profile.state.name : null;
              data.allPeoples[i].country = data.allPeoples[i].profile.country != null ? data.allPeoples[i].profile.country.name : null;
              data.allPeoples[i].city = data.allPeoples[i].profile != null ? data.allPeoples[i].profile.city : null;

            }
            this.people_user.push(data.allPeoples[i])
          }
          // console.log(this.people_user);
        }
        if (data.searchBy == 'businessName') {

          for (var j = 0; j < data.businessSettings.length; j++) {
            data.allBusiness[j].buisness_name = data.allBusiness[j].buisnessName;
            data.allBusiness[j].cat_name = data.businessSettings[j].userCategory != null ? data.businessSettings[j].userCategory : null;
            data.allBusiness[j].friend = data.businessSettings[j].isfriend;
            data.allBusiness[j].follower = data.businessSettings[j].isfollowing;
            data.allBusiness[j].can_sent_friend_request_by_mobile = data.businessSettings[j].friendRequestMob;
            data.allBusiness[j].can_sent_friend_request_any = data.businessSettings[j].friendRequestAny;
            data.allBusiness[j].premium_user = data.allBusiness[j].premiumUser;
            data.allBusiness[j].users_full_name = data.allBusiness[j].fname + ' ' + data.allBusiness[j].lname;
            if (data.allBusiness[j].profile != null && data.allBusiness[j].profile != '') {
              data.allBusiness[j].image = data.allBusiness[j].profile.image;
              data.allBusiness[j].city = data.allBusiness[j].profile.city;
              data.allBusiness[j].state = data.allBusiness[j].profile.state != null ? data.allBusiness[j].profile.state.name : null;
              data.allBusiness[j].country = data.allBusiness[j].profile.country != null ? data.allBusiness[j].profile.country.name : null;

            }
            this.business_user.push(data.allBusiness[j])
          }
          //console.log(this.business_user);
        }

      });

    } else {
      var DataToSend = {
        user_id: window.localStorage['userid'],
        token: window.localStorage['token'],
        name: this.searchQuery
      }
      // console.log(DataToSend);
      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, 'searchDetails').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.business_user = response.data.BusinessUser;
          this.people_user = response.data.userInfo;
          this.jobs_user = response.data.JobSearch;
          this.jobs_user = [];
          //console.log(this.business_user);
          response.data.JobSearch.forEach((item, key, index) => {
            let date1: string = item.creation_date;
            let date2: string = this.date;
            let diffInMs: number = Date.parse(date2) - Date.parse(date1);
            let difinsec: number = Math.round(diffInMs / 1000);
            let diffmin: number = Math.round(diffInMs / 1000 / 60);
            let diffInHours: number = Math.round(diffInMs / 1000 / 60 / 60);
            let diffIndays: number = Math.round(diffInMs / 1000 / 60 / 60 / 24);
            let weekindiff: number = Math.round(diffInMs / 1000 / 60 / 60 / 24 / 7);
            item.second = difinsec;
            item.minute = diffmin;
            item.hour = diffInHours;
            item.days = diffIndays;
            item.weeks = weekindiff;
            this.jobs_user.push(item);
          })
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
    if (connection.can_sent_friend_request_by_mobile == 1) {
      this.EntermobilenoSendRequest(connection);
    }
    else {
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
          this.remotService.presentToast('Connection request sent');
        }
        else {
          this.remotService.presentToast('Connection request sending failed');
        }
      }, () => {

        this.remotService.presentToast('Error loading data.');
      });
    }

  }

  sendfollowingRequest(followingdata) {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      to_userid: followingdata.id,
      token: window.localStorage['token'],
      user_type: window.localStorage['usertype']
    };
    //console.log('following', DataToSend);
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
    //console.log(jobs);
  }

  OtherFrofileView(connection) {
    if (connection.id == this.user_id) {
      this.navCtrl.setRoot(HomePage);
    } else {
      var data = {
        user_id: connection.id
      }
      this.app.getRootNav().push(OtherprofilePage, { 'otheruserfrofiledata': data });
    }
  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.setRoot(HomePage)

    }
    //  console.log('ionViewDidLoad SearchPage');
    this.initsearch();
  }

  segmentChanged(event) {
    if (this.searchbycatagory == 'all')
      this.initsearch();
    else if (this.searchbycatagory == 'people')
      this.initsearch();
    else if (this.searchbycatagory == 'business')
      this.initsearch();
    else if (this.searchbycatagory == 'job')
      this.initsearch();
  }
  OtherProfile(job) {
    var data = {
      user_id: job.id
    }
    //this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });
  }

  EntermobilenoSendRequest(connection) {
    let alert = this.alertCtrl.create({
      title: 'Send Friend Request',
      inputs: [
        {
          name: 'mobileno',
          placeholder: 'Enter mobile number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (connection.mobile_no == data.mobileno) {
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
                  this.remotService.presentToast('Connection request sent');
                }
                else {
                  this.remotService.presentToast('Connection request sending failed');
                }
              }, () => {
                this.remotService.presentToast('Error loading data.');
              });
            }
            else {
              this.remotService.presentToast('Mobile number is incorrect');
            }

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
