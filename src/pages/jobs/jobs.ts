import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Navbar
} from 'ionic-angular';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import { JobdetailsPage } from '../../pages/jobdetails/jobdetails';
import { OtherprofilePage } from '../otherprofile/otherprofile';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  @ViewChild(Navbar) navBar: Navbar;
  jobPageOffset = 0;
  addPageOffset = 0;
  jobsData = [];
  addsData = [];
  base_url: any;
  date: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public remotService: RemoteServiceProvider) {
    this.date = new Date();
    this.base_url = this.remotService.site_url;
    var jobsFetchparams = {
      user_id: window.localStorage['userid'],
      jobStartingLimit: this.jobPageOffset,
      adJobStartingLimit: this.addPageOffset,
      token: window.localStorage['token']
    };
    this.remotService.presentLoading();
    this.remotService.postData(jobsFetchparams, 'allJobs').subscribe((response) => {
      console.log(response);

      this.remotService.dismissLoader();
      if (response.success == 1) {
        var responsejobsData = response.data.allJobs;
        responsejobsData.forEach((item, key, index) => {
          let date1: string = item.updation_date;
          let date2: string = this.date;
          let diffInMs: number = Date.parse(date2) - Date.parse(date1);
          let difinsec: number = Math.floor(diffInMs / 1000);
          let diffmin: number = Math.floor(diffInMs / 1000 / 60);
          let diffInHours: number = Math.floor(diffInMs / 1000 / 60 / 60);
          let diffIndays: number = Math.floor(diffInMs / 1000 / 60 / 60 / 24);
          let weekindiff: number = Math.floor(diffInMs / 1000 / 60 / 60 / 24 / 7);
          item.second = difinsec;
          item.minute = diffmin;
          item.hour = diffInHours;
          item.days = diffIndays;
          item.weeks = weekindiff;
          this.jobsData.push(item);
        })

        var responseaddsData = response.data.adJobs;
        responseaddsData.forEach((item, key, index) => {
          let date1: string = item.updation_date;
          let date2: string = this.date;
          let diffInMs: number = Date.parse(date2) - Date.parse(date1);
          let difinsec: number = Math.floor(diffInMs / 1000);
          let diffmin: number = Math.floor(diffInMs / 1000 / 60);
          let diffInHours: number = Math.floor(diffInMs / 1000 / 60 / 60);
          let diffIndays: number = Math.floor(diffInMs / 1000 / 60 / 60 / 24);
          let weekindiff: number = Math.floor(diffInMs / 1000 / 60 / 60 / 24 / 7);
          item.second = difinsec;
          item.minute = diffmin;
          item.hour = diffInHours;
          item.days = diffIndays;
          item.weeks = weekindiff;
          this.addsData.push(item);
        })

      } else {
        this.remotService.presentToast('Error loading data.');
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  jobdetails(job) {
    this.navCtrl.push(JobdetailsPage, { jobsparam: job });
  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad JobsPage');
  }


  OtherProfile(job) {
    var data = {
      user_id: job.created_by
    }
    this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}