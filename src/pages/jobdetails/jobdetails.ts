import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { JobapplyPage } from '../../pages/jobapply/jobapply';
import { OtherprofilePage } from '../otherprofile/otherprofile';

/**
 * Generated class for the JobdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobdetails',
  templateUrl: 'jobdetails.html',
})

export class JobdetailsPage {
  @ViewChild(Navbar) navBar: Navbar;

  jobs: any;
  jobid: any;
  base_url: any;
  jobdetails: any;
  appliedjob: any;
  /*  apply: boolean; */


  constructor(public modalCtrl: ModalController, public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.jobs = navParams.get('jobsparam');
    this.jobid = this.jobs.id;
  }

  getjobdetails() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      job_id: this.jobid,
      token: window.localStorage['token']
    }
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'jobFullDetails').subscribe((response) => {
      this.remotService.dismissLoader();
      this.jobdetails = response.data.Details;
      this.appliedjob = response.data.Status.flag;
     // console.log(this.jobdetails);
      
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
  }
  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad JobdetailsPage');
    this.getjobdetails();
  }
  applyjob() {
    var premium_user = window.localStorage['premium_user'];
    if (premium_user == 1) {
      this.presentProfileModal();
    } else {
      var DataToSend = {
        user_id: window.localStorage['userid'],
        job_id: this.jobid,
        token: window.localStorage['token']
      }
      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, 'applyJob').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.success == 1) {
         // console.log(response);
          this.appliedjob = 'Applied';

         // console.log(this.appliedjob);
          //this.jobdetails = response.data.Details;
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error!');
      });
    }
  }
  presentProfileModal() {
    let uploadcvModal = this.modalCtrl.create(JobapplyPage, { jobid: this.jobid });
    uploadcvModal.onDidDismiss(data => {

      if (data.success == 1)
        this.appliedjob = 'Applied';
      //item.comments = data.commentlength;
    });
    uploadcvModal.present();
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
