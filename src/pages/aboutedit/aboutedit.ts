import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController } from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';


@IonicPage()
@Component({
  selector: 'page-aboutedit',
  templateUrl: 'aboutedit.html',
})
export class AbouteditPage {

  base_url: any;
  yearrages = [];
  suggestions = [];
  pendingusers = [];
  @ViewChild(Navbar) navBar: Navbar;
  editsection: string;
  editparam: any;
  testRadioOpen: boolean;
  testRadioResult;
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  skills = '';
  interest = '';


  //occupation
  occupation = '';
  occcmpname = '';
  occdsgntn = '';


  //award params
  awardname = '';
  awardorg = '';
  awardweb = '';
  awardyear = 1950;
  awardid = 0;

  //course params
  crsename = '';
  crsedorg = '';
  crseyear = 1950;
  crseid = 0;

  //certification params
  certname = '';
  certorg = '';
  certyear = 1950;
  certeid = 0;


  //location params
  locncountry = 101;
  locnstates = 0;
  locncity = '';
  locnzipcode = 0;
  locaddress = ''
  //education params

  eduunivercity = '';
  edudegree = '';
  edustrtmonth = 'Jan';
  edustrtyear = 2000;
  eduendmonth = 'Jan';
  eduendyear = 2007;
  eduwebsite = '';
  edudetail = '';
  eduid = 0;

  //work params

  wrkpositn = '';
  wrkcompny = '';
  wrkstrtmonth = 'Jan';
  wrkstrtyear = 2000;
  wrkendmonth = 'Jan';
  wrkendyear = 2007;
  wrkwebsite = '';
  wrkdetail = '';
  wrkid = 0;


  statement = null;

  //exhibition params

  exhbname = '';
  exhblocsn = '';
  exhbtype = '';
  exhbyear = 2007;
  exhbmonth = 'Jan';
  exhbid = 0;

  //location params
  websiteurl = '';
  companyoverview = '';
  //Custom One
  cstmonettl = '';
  cstmonedtl = '';
  cstmoneid = 0;

  //language parama
  lngname = '';
  lnglvl = 'Beginner';
  lngid = 0;

  // 
  countries: any;
  states: any;

  // 
  paramsTosend: any;
  titleheader: string
  usertype = 0;
  urlmsg: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, public modalCtrl: ModalController) {

    this.base_url = this.remotService.site_url;
    this.editsection = navParams.get('editsection');
    this.editparam = navParams.get('editparam');
    this.usertype = window.localStorage['usertype']

    var year = new Date().getFullYear();
    this.yearrages = [];
    this.yearrages.push(year);
    for (var i = 1; i < 100; i++) {
      this.yearrages.push(year - i);
    }

    this.titleheader = this.editsection

    if (this.editsection == 'location') {

      this.locncountry = parseInt(this.editparam.countryid);
      this.locnstates = parseInt(this.editparam.stateid);
      this.locncity = this.editparam.city;
      this.locnzipcode = this.editparam.zip_code;
      this.locaddress = this.editparam.address;
      if (this.editparam.countryid) {
        this.initStates(this.editparam.countryid);
      }
      this.initLocationForm();

    } else if (this.editsection == 'weburl') {

      this.websiteurl = this.editparam.website_url;
      this.titleheader = "Website Url"

    }
    else if (this.editsection == 'companyoverview') {
      this.companyoverview = this.editparam.company_overview;
    }
    else if (this.editsection == 'education') {

      if (this.editparam.hasOwnProperty('city'))
        this.locncity = this.editparam.city;

      if (this.editparam.hasOwnProperty('countryId'))
        this.locncountry = parseInt(this.editparam.countryId);

      if (this.editparam.hasOwnProperty('degree'))
        this.edudegree = this.editparam.degree;

      if (this.editparam.hasOwnProperty('details'))
        this.edudetail = this.editparam.details;

      if (this.editparam.hasOwnProperty('starting_month'))
        this.edustrtmonth = this.editparam.starting_month;

      if (this.editparam.hasOwnProperty('starting_year'))
        this.edustrtyear = this.editparam.starting_year;

      if (this.editparam.hasOwnProperty('ending_month'))
        this.eduendmonth = this.editparam.ending_month;

      if (this.editparam.hasOwnProperty('ending_year'))
        this.eduendyear = this.editparam.ending_year;

      if (this.editparam.hasOwnProperty('school_website'))
        this.eduwebsite = this.editparam.school_website;

      if (this.editparam.hasOwnProperty('school_name'))
        this.eduunivercity = this.editparam.school_name;

      this.eduid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.eduid = parseInt(this.editparam.id);

      // this.websiteurl = this.editparam.website_url;
      this.initLocationForm();
    } else if (this.editsection == 'work') {

      if (this.editparam.hasOwnProperty('city'))
        this.locncity = this.editparam.city;

      if (this.editparam.hasOwnProperty('countryId'))
        this.locncountry = parseInt(this.editparam.countryId);

      if (this.editparam.hasOwnProperty('company_name'))
        this.wrkcompny = this.editparam.company_name;

      if (this.editparam.hasOwnProperty('details'))
        this.wrkdetail = this.editparam.details;

      if (this.editparam.hasOwnProperty('starting_month'))
        this.wrkstrtmonth = this.editparam.starting_month;

      if (this.editparam.hasOwnProperty('starting_year'))
        this.wrkstrtyear = this.editparam.starting_year;

      if (this.editparam.hasOwnProperty('ending_month'))
        this.wrkendmonth = this.editparam.ending_month;

      if (this.editparam.hasOwnProperty('ending_year'))
        this.wrkendyear = this.editparam.ending_year;

      if (this.editparam.hasOwnProperty('website'))
        this.wrkwebsite = this.editparam.website;

      if (this.editparam.hasOwnProperty('position'))
        this.wrkpositn = this.editparam.position;

      this.wrkid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.wrkid = parseInt(this.editparam.id);

      // this.websiteurl = this.editparam.website_url;
      this.initLocationForm();
    } else if (this.editsection == 'skill') {
      this.skills = this.editparam;
      console.log("Params ", this.editparam);

    } else if (this.editsection == 'interest') {
      this.interest = this.editparam;
      //console.log("Params ", this.interest);

    } else if (this.editsection == 'award') {

      if (this.editparam.hasOwnProperty('award_name'))
        this.awardname = this.editparam.award_name;

      if (this.editparam.hasOwnProperty('organisation_name'))
        this.awardorg = this.editparam.organisation_name;

      if (this.editparam.hasOwnProperty('organisation_website'))
        this.awardweb = this.editparam.organisation_website;

      if (this.editparam.hasOwnProperty('award_date'))
        this.awardyear = this.editparam.award_date;
      //console.log("Params ",this.editparam);
      this.awardid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.awardid = parseInt(this.editparam.id);
    } else if (this.editsection == 'course') {

      if (this.editparam.hasOwnProperty('course_name'))
        this.crsename = this.editparam.course_name;

      if (this.editparam.hasOwnProperty('course_organisation'))
        this.crsedorg = this.editparam.course_organisation;

      if (this.editparam.hasOwnProperty('year'))
        this.crseyear = this.editparam.year;
      //console.log("Params ",this.editparam);
      this.crseid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.crseid = parseInt(this.editparam.id);
    } else if (this.editsection == 'certificate') {

      if (this.editparam.hasOwnProperty('certification_name'))
        this.certname = this.editparam.certification_name;

      if (this.editparam.hasOwnProperty('certification_organisation'))
        this.certorg = this.editparam.certification_organisation;

      if (this.editparam.hasOwnProperty('year'))
        this.certyear = this.editparam.year;
      //console.log("Params ",this.editparam);
      this.certeid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.certeid = parseInt(this.editparam.id);
    } else if (this.editsection == 'occupation') {

      if (this.editparam.hasOwnProperty('occupation'))
        this.occupation = this.editparam.occupation;

      if (this.editparam.hasOwnProperty('company_name'))
        this.occcmpname = this.editparam.company_name;

      if (this.editparam.hasOwnProperty('designation'))
        this.occdsgntn = this.editparam.designation;

    } else if (this.editsection == 'exhibition') {

      if (this.editparam.hasOwnProperty('city'))
        this.exhblocsn = this.editparam.city;

      if (this.editparam.hasOwnProperty('exhibition_name'))
        this.exhbname = this.editparam.exhibition_name;

      if (this.editparam.hasOwnProperty('month'))
        this.exhbmonth = this.editparam.month;

      if (this.editparam.hasOwnProperty('performance_type'))
        this.exhbtype = this.editparam.performance_type;

      if (this.editparam.hasOwnProperty('year'))
        this.exhbyear = this.editparam.year;

      this.exhbid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.exhbid = parseInt(this.editparam.id);

    } else if (this.editsection == 'statement') {

      this.statement = this.editparam;

    } else if (this.editsection == 'customone' && this.editparam != null) {

      if (this.editparam.hasOwnProperty('title'))
        this.cstmonettl = this.editparam.title;

      if (this.editparam.hasOwnProperty('description'))
        this.cstmonedtl = this.editparam.description;

      this.cstmoneid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.cstmoneid = parseInt(this.editparam.id);
      this.titleheader = "Custom Information"
    } else if (this.editsection == 'language' && this.editparam != null) {

      if (this.editparam.hasOwnProperty('language'))
        this.lngname = this.editparam.language;

      if (this.editparam.hasOwnProperty('proficiency_level'))
        this.lnglvl = this.editparam.proficiency_level;

      this.lngid = 0;
      if (this.editparam.hasOwnProperty('id'))
        this.lngid = parseInt(this.editparam.id);

    }

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

  saveLocation() {


    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      country: this.locncountry > 0 ? this.locncountry : '',
      state: this.locnstates > 0 ? this.locnstates : '',
      city: this.locncity,
      zip_code: this.locnzipcode,
      address: this.locaddress
    }

    this.savEdata('EditLocation');

  }

  saveCustomone() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      title: this.cstmonettl,
      description: this.cstmonedtl,
      id: this.cstmoneid
    }
    if (this.cstmonedtl == '' && this.cstmonettl == '') {
      this.remotService.presentToast('All the fields can not be empty in custom section');
    } else {
      this.savEdata('Editcustoms');
    }


  }

  saveCertification() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      certification_name: this.certname,
      certification_organisation: this.certorg,
      year: this.certyear,
      id: this.certeid,

    };

    if (this.certeid == 0)
      this.savEdata('InsertCertificaions');
    else
      this.savEdata('EditCertificaions');

  }
  saveStatement() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      personalStatement: this.statement,

    }

    this.savEdata('editPersonalStatement');

  }

  saveOccupation() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      occupation: this.occupation,
      company_name: this.occcmpname,
      designation: this.occdsgntn,
      website_url: this.editparam.website_url
    }

    this.savEdata('EditPersonalDetails');

  }

  saveLanguage() {

    if (this.lngname == "") {
      //this.navParams.get("parentPage").initviewaboutData();
      return false;
    }

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      language: this.lngname,
      proficiency_level: this.lnglvl,
      id: this.lngid
    }

    if (this.lngid == 0)
      this.savEdata('insertLanguage');
    else
      this.savEdata('editLanguage');

  }

  saveWork() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      company_name: this.wrkcompny,
      website: this.wrkwebsite,
      country: this.locncountry,
      city: this.locncity,
      workexperience_id: this.wrkid,
      starting_month: this.wrkstrtmonth,
      starting_year: this.wrkstrtyear,
      ending_month: this.wrkendmonth,
      ending_year: this.wrkendyear,
      details: this.wrkdetail,
      position: this.wrkpositn
    };

    if (this.wrkid == 0)
      this.savEdata('insertworkExperience');
    else
      this.savEdata('editWorkExperience');


  }

  saveExhibition() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      exhibition_name: this.exhbname,
      performance_type: this.exhbtype,
      city: this.exhblocsn,
      exhibition_id: this.exhbid,
      year: this.exhbyear,
      month: this.exhbmonth
    };

    this.savEdata('EditExibitions');
  }

  saveAward() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      organisation_name: this.awardorg,
      organisation_website: this.awardweb,
      award_name: this.awardname,
      award_date: this.awardyear,
      id: this.awardid,

    };

    if (this.awardid == 0)
      this.savEdata('insertAwards');
    else
      this.savEdata('EditAwards');

  }

  saveSkills() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      skillS: this.skills,

    };
    /* if (this.skills == '') {
      this.remotService.presentToast('Enter your Specialization or Skills');
    } else { */
    this.savEdata('Editskill');
    /*  } */


  }

  saveCourse() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      course_name: this.crsename,
      organisation_website: this.awardweb,
      course_organisation: this.crsedorg,
      courseyear: this.crseyear,
      course_id: this.crseid,

    };

    if (this.crseid == 0)
      this.savEdata('insertCourses');
    else
      this.savEdata('EditCourses');

  }

  saveInterest() {

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      interest: this.interest,

    };

    this.savEdata('editinterest');

  }

  saveEducation() {


    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      school_name: this.eduunivercity,
      school_website: this.eduwebsite,
      location: this.locncountry,
      city: this.locncity,
      id: this.eduid,
      degree: this.edudegree,
      starting_month: this.edustrtmonth,
      starting_year: this.edustrtyear,
      ending_month: this.eduendmonth,
      ending_year: this.eduendyear,
      details: this.edudetail,
    }

    if (this.eduid == 0)
      this.savEdata('InsertEducation');
    else
      this.savEdata('EditEducation');


  }

  saveWebUrl() {

    if (this.websiteurl.search(/^http[s]?\:\/\//) == -1) {

      this.urlmsg = "Please provide http:// or https:// before your url";
      return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var urlregx = new RegExp(expression);
    //var urlregx = new RegExp("^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$");
    //var urlregx = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$"
    if (!urlregx.test(this.websiteurl)) {
      this.remotService.presentToast("Enter a valid url.( ex. http(s)://example.com )");
      return false;
    }

    this.paramsTosend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      url: this.websiteurl

    };
    this.savEdata('editWebsiteurl');
  }

  savEdata(url) {

    this.remotService.presentLoading();
    this.remotService.postData(this.paramsTosend, url).subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.navParams.get("parentPage").initviewaboutData();
        // this.events.publish('creoyou:showmenu');
        this.navCtrl.pop()

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }

  /* company overview */
  saveCompanyOverview() {
    /*  if (this.companyoverview == '') {
       this.remotService.presentToast('Company overview can not be empty');
     } */
    /*  else { */
    var data = {
      token: window.localStorage['token'],
      user_id: window.localStorage['userid'],
      overView: this.companyoverview
    }
    this.remotService.presentLoading();
    this.remotService.postData(data, 'editCompanyOverView').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.navParams.get("parentPage").initviewaboutData();
        // this.events.publish('creoyou:showmenu');
        this.navCtrl.pop()

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
    /*  } */
  }

  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.navParams.get("parentPage").initviewaboutData();
      // this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    // console.log('ionViewDidLoad AbouteditPage');
  }

}
