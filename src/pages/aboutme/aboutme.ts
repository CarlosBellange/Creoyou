import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Events, Navbar, ModalController } from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';

import { InvitefriendPage } from '../../pages/invitefriend/invitefriend';
import { MessagedetailsPage } from '../../pages/messagedetails/messagedetails';
import { AbouteditPage } from '../../pages/aboutedit/aboutedit';
import {
  CategoriesPage
} from '../../pages/categories/categories';

@IonicPage()
@Component({
  selector: 'page-aboutme',
  templateUrl: 'aboutme.html',
})
export class AboutmePage {

  base_url: any;
  @ViewChild(Navbar) navBar: Navbar;
  abouteditPage = AbouteditPage;
  education: any;
  personaldetails: any;
  touserid = 0;
  currentuserid: any;
  languages = [];
  achievements = [];
  interests = [];
  works = [];
  exibitions = [];
  skills: any;
  creativefield: any;
  paramsObj: any;
  courses: any;
  certifications: any;
  statement: any;
  customone: any;
  statusprivacy = 1;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, public modalCtrl: ModalController) {

    this.touserid = navParams.get('touserid') ? navParams.get('touserid') : window.localStorage['userid'];
    console.log(this.touserid);
    this.base_url = this.remotService.site_url;
    this.currentuserid = window.localStorage['userid'];
    this.initviewaboutData();

  }


  initviewaboutData() {


    var DataToSend = {
      user_id: this.touserid,
      to_id: this.touserid,
      token: window.localStorage['token']

    };
    console.log(DataToSend);
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(DataToSend, 'AboutmeDetails').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        if (response.data.hasOwnProperty('education'))
          this.education = response.data.education;

        if (response.data.hasOwnProperty('personalDetails'))
          this.personaldetails = response.data.personalDetails;

        if (response.data.hasOwnProperty('language'))
          this.languages = response.data.language;

        if (response.data.hasOwnProperty('awards'))
          this.achievements = response.data.awards;

        if (response.data.hasOwnProperty('interest'))
          this.interests = response.data.interest;

        if (response.data.hasOwnProperty('work'))
          this.works = response.data.work;

        if (response.data.hasOwnProperty('skills'))
          this.skills = response.data.skills;

        if (response.data.hasOwnProperty('creative_field'))
          this.creativefield = response.data.creative_field;

        if (response.data.hasOwnProperty('course'))
          this.courses = response.data.course;

        if (response.data.hasOwnProperty('certifications'))
          this.certifications = response.data.certifications;

        if (response.data.hasOwnProperty('exibition'))
          this.exibitions = response.data.exibition;

        if (response.data.hasOwnProperty('statement'))
          this.statement = response.data.statement;

        if (response.data.hasOwnProperty('custom'))
          this.customone = response.data.custom;

        //   console.log(this.statement);

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }

  editCreativeField(creativeFld) {


    let categoryModal = this.modalCtrl.create(CategoriesPage);
    categoryModal.onDidDismiss(data => {
      // Do things with data coming from modal, for instance :
      if (data.hasOwnProperty("id")) {
        //console.log("GOt from modal", data);
        this.creativefield = { 'category': data.name, 'category_id': data.id };
        var catId = data.id > 0 ? data.id : data.name;
        this.paramsObj = {
          user_id: window.localStorage['userid'],
          token: window.localStorage['token'],
          cat_id: catId,
          usertype: window.localStorage['usertype']

        };
        this.aboutApiAction('EditCreativeField');
      }
    });
    categoryModal.present();


  }

  presentActions(edittype, editparam) {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.editDatauser(edittype, editparam);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.rmvDatauser(edittype, editparam);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

  editDatauser(edittype, editparam) {

    this.navCtrl.push(AbouteditPage, { 'editsection': edittype, 'editparam': editparam, "parentPage": this });

  }

  rmvDatauser(edittype, editparam) {


    let confirm = this.alertCtrl.create({
      title: 'Remove Item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {

            if (edittype == 'education') {

              this.paramsObj = { 'edu_id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteEducation');

            }

            if (edittype == 'work') {

              this.paramsObj = { 'work_id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteworkExperience');

            }

            if (edittype == 'award') {

              this.paramsObj = { 'id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteaward');

            }

            if (edittype == 'course') {

              this.paramsObj = { 'cou_id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteCourses');

            }

            if (edittype == 'certificate') {

              this.paramsObj = { 'cer_id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteCertifications');

            }
            if (edittype == 'exhibition') {

              this.paramsObj = { 'exi_id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteExibition');

            }

            if (edittype == 'language') {

              this.paramsObj = { 'id': editparam.id, token: window.localStorage['token'] };
              this.aboutApiAction('deleteLanguage');

            }

            if (edittype == 'customone') {

              this.paramsObj = { 'id': editparam.id, 'user_id': window.localStorage['userid'], token: window.localStorage['token'] };
              this.aboutApiAction('deleteCustomSection');

            }


          }
        }
      ]
    });
    confirm.present();




  }

  editPrivacy(edittype: any) {

    this.paramsObj = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      type: edittype
    };
    const actionSheet = this.actionSheetCtrl.create({

      buttons: [{
        text: 'Public',
        handler: () => {
          this.statusprivacy = 1;
          this.paramsObj['value'] = this.statusprivacy;
          this.aboutApiAction('editAboutPrivacy');
        }
      },
      {
        text: 'Connection only',
        handler: () => {
          this.statusprivacy = 2;
          this.paramsObj['value'] = this.statusprivacy;
          this.aboutApiAction('editAboutPrivacy');
        }
      },
      {
        text: 'Connection & Followers',
        handler: () => {
          this.statusprivacy = 3;
          this.paramsObj['value'] = this.statusprivacy;
          this.aboutApiAction('editAboutPrivacy');
        }
      },
      {
        text: 'Only me',
        handler: () => {
          this.statusprivacy = 4;
          this.paramsObj['value'] = this.statusprivacy;
          this.aboutApiAction('editAboutPrivacy');
        }
      }

      ]
    });

    actionSheet.present();

  }


  aboutApiAction(url) {

    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(this.paramsObj, url).subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.initviewaboutData();

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }


  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    console.log('ionViewDidLoad AboutmePage');
  }

}
