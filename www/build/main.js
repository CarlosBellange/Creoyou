webpackJsonp([46],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbouteditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AbouteditPage = (function () {
    function AbouteditPage(navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.yearrages = [];
        this.suggestions = [];
        this.pendingusers = [];
        this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.skills = '';
        this.interest = '';
        //occupation
        this.occupation = '';
        this.occcmpname = '';
        this.occdsgntn = '';
        //award params
        this.awardname = '';
        this.awardorg = '';
        this.awardweb = '';
        this.awardyear = 1950;
        this.awardid = 0;
        //course params
        this.crsename = '';
        this.crsedorg = '';
        this.crseyear = 1950;
        this.crseid = 0;
        //certification params
        this.certname = '';
        this.certorg = '';
        this.certyear = 1950;
        this.certeid = 0;
        //location params
        this.locncountry = 101;
        this.locnstates = 0;
        this.locncity = '';
        this.locnzipcode = 0;
        //education params
        this.eduunivercity = '';
        this.edudegree = '';
        this.edustrtmonth = 0;
        this.edustrtyear = 0;
        this.eduendmonth = 0;
        this.eduendyear = 0;
        this.eduwebsite = '';
        this.edudetail = '';
        this.eduid = 0;
        //work params
        this.wrkpositn = '';
        this.wrkcompny = '';
        this.wrkstrtmonth = 0;
        this.wrkstrtyear = 0;
        this.wrkendmonth = 0;
        this.wrkendyear = 0;
        this.wrkwebsite = '';
        this.wrkdetail = '';
        this.wrkid = 0;
        this.statement = null;
        //exhibition params
        this.exhbname = '';
        this.exhblocsn = '';
        this.exhbtype = '';
        this.exhbyear = 2007;
        this.exhbmonth = 'Jan';
        this.exhbid = 0;
        //location params
        this.websiteurl = '';
        //Custom One
        this.cstmonettl = '';
        this.cstmonedtl = '';
        this.cstmoneid = 0;
        //language parama
        this.lngname = '';
        this.lnglvl = 'Beginner';
        this.lngid = 0;
        this.base_url = this.remotService.site_url;
        this.editsection = navParams.get('editsection');
        this.editparam = navParams.get('editparam');
        var year = new Date().getFullYear();
        this.yearrages = [];
        this.yearrages.push(year);
        for (var i = 1; i < 100; i++) {
            this.yearrages.push(year - i);
        }
        if (this.editsection == 'location') {
            this.locncountry = parseInt(this.editparam.countryid);
            this.locnstates = parseInt(this.editparam.stateid);
            this.locncity = this.editparam.city;
            this.locnzipcode = this.editparam.zip_code;
            if (this.editparam.countryid) {
                this.initStates(this.editparam.countryid);
            }
            this.initLocationForm();
        }
        else if (this.editsection == 'weburl') {
            this.websiteurl = this.editparam.website_url;
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
        }
        else if (this.editsection == 'work') {
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
        }
        else if (this.editsection == 'skill') {
            if (this.editparam != null)
                this.skills = this.editparam[0].skillS;
            //console.log("Params ",this.editparam);
        }
        else if (this.editsection == 'interest') {
            if (this.editparam != null)
                this.interest = this.editparam[0].interests;
            //console.log("Params ",this.editparam);
        }
        else if (this.editsection == 'award') {
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
        }
        else if (this.editsection == 'course') {
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
        }
        else if (this.editsection == 'certificate') {
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
        }
        else if (this.editsection == 'occupation') {
            if (this.editparam.hasOwnProperty('occupation'))
                this.occupation = this.editparam.occupation;
            if (this.editparam.hasOwnProperty('company_name'))
                this.occcmpname = this.editparam.company_name;
            if (this.editparam.hasOwnProperty('designation'))
                this.occdsgntn = this.editparam.designation;
        }
        else if (this.editsection == 'exhibition') {
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
        }
        else if (this.editsection == 'statement') {
            this.statement = this.editparam;
        }
        else if (this.editsection == 'customone' && this.editparam != null) {
            if (this.editparam.hasOwnProperty('title'))
                this.cstmonettl = this.editparam.title;
            if (this.editparam.hasOwnProperty('description'))
                this.cstmonedtl = this.editparam.description;
            this.cstmoneid = 0;
            if (this.editparam.hasOwnProperty('id'))
                this.cstmoneid = parseInt(this.editparam.id);
        }
        else if (this.editsection == 'language' && this.editparam != null) {
            if (this.editparam.hasOwnProperty('language'))
                this.lngname = this.editparam.language;
            if (this.editparam.hasOwnProperty('proficiency_level'))
                this.lnglvl = this.editparam.proficiency_level;
            this.lngid = 0;
            if (this.editparam.hasOwnProperty('id'))
                this.lngid = parseInt(this.editparam.id);
        }
    }
    AbouteditPage.prototype.initLocationForm = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.countries = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'countries').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.countries = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    AbouteditPage.prototype.initStates = function (country_id) {
        var _this = this;
        this.states = [];
        this.remotService.postData({ 'country_id': country_id }, 'states').subscribe(function (response) {
            if (response.success == 1) {
                _this.states = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    AbouteditPage.prototype.saveLocation = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            country: this.locncountry,
            state: this.locnstates,
            city: this.locncity,
            zip_code: this.locnzipcode
        };
        this.savEdata('EditLocation');
    };
    AbouteditPage.prototype.saveCustomone = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            title: this.cstmonettl,
            description: this.cstmonedtl,
            id: this.cstmoneid
        };
        this.savEdata('Editcustoms');
    };
    AbouteditPage.prototype.saveCertification = function () {
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
    };
    AbouteditPage.prototype.saveStatement = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            personalStatement: this.statement,
        };
        this.savEdata('editPersonalStatement');
    };
    AbouteditPage.prototype.saveOccupation = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            occupation: this.occupation,
            company_name: this.occcmpname,
            designation: this.occdsgntn,
            website_url: this.editparam.website_url
        };
        this.savEdata('EditPersonalDetails');
    };
    AbouteditPage.prototype.saveLanguage = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            language: this.lngname,
            proficiency_level: this.lnglvl,
            id: this.lngid
        };
        if (this.lngid == 0)
            this.savEdata('insertLanguage');
        else
            this.savEdata('editLanguage');
    };
    AbouteditPage.prototype.saveWork = function () {
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
    };
    AbouteditPage.prototype.saveExhibition = function () {
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
    };
    AbouteditPage.prototype.saveAward = function () {
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
    };
    AbouteditPage.prototype.saveSkills = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            skillS: this.skills,
        };
        this.savEdata('Editskill');
    };
    AbouteditPage.prototype.saveCourse = function () {
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
    };
    AbouteditPage.prototype.saveInterest = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            interest: this.interest,
        };
        this.savEdata('editinterest');
    };
    AbouteditPage.prototype.saveEducation = function () {
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
        };
        if (this.eduid == 0)
            this.savEdata('InsertEducation');
        else
            this.savEdata('EditEducation');
    };
    AbouteditPage.prototype.saveWebUrl = function () {
        this.paramsTosend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            url: this.websiteurl
        };
        this.savEdata('editWebsiteurl');
    };
    AbouteditPage.prototype.savEdata = function (url) {
        var _this = this;
        this.remotService.presentLoading("Saving ...");
        this.remotService.postData(this.paramsTosend, url).subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.navParams.get("parentPage").initviewaboutData();
                // this.events.publish('creoyou:showmenu');
                _this.navCtrl.pop();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    AbouteditPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.navParams.get("parentPage").initviewaboutData();
            // this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad AbouteditPage');
    };
    return AbouteditPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], AbouteditPage.prototype, "navBar", void 0);
AbouteditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-aboutedit',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\aboutedit\aboutedit.html"*/'\n<ion-header class="creoyou-header">\n        \n          <ion-navbar>\n            <ion-title>About Edit Form</ion-title>\n        \n           <!-- <ion-buttons end>\n            <button class="about_privacy" ion-button clear  (click)="doRadio()" >\n              <ion-icon  item-right name="lock"></ion-icon>\n            </button>\n          </ion-buttons>     -->\n          </ion-navbar>\n        \n        </ion-header>\n        \n        \n        <ion-content padding>\n        \n        \n        \n          <!-- Location form -->\n        \n          <ion-list *ngIf="editsection==\'location\'">\n        \n              <ion-item>\n                  <ion-label color="default" floating>Country</ion-label>\n                  <ion-select #country (ngModelChange)=\'initStates(country.value)\' [(ngModel)]="locncountry">\n                  \n                    <ion-option *ngFor="let cntry of countries" value="{{cntry.id}}" >{{cntry.name}}</ion-option>\n                   \n                  </ion-select>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>State</ion-label>\n                  <ion-select [(ngModel)]="locnstates">\n                    <ion-option *ngFor="let state of states" value="{{state.id}}" >{{state.name}}</ion-option>\n                  </ion-select>\n              </ion-item>\n        \n              <ion-item>\n               <ion-label color="default" floating>City</ion-label>\n               <ion-input [(ngModel)]="locncity"></ion-input>\n              </ion-item>\n        \n              <ion-item>\n                  <ion-label color="default" floating>Zipcode</ion-label>\n                  <ion-input [(ngModel)]="locnzipcode"></ion-input>\n              </ion-item>\n        \n        </ion-list>\n        \n        \n              \n         \n        \n        \n        \n          <!-- Website Url form -->\n        \n        <ion-list *ngIf="editsection==\'weburl\'">\n          <ion-item>\n            <ion-label color="default" floating>Website Url</ion-label>\n            <ion-input [(ngModel)]="websiteurl"></ion-input>\n         </ion-item>\n        </ion-list>\n        \n        \n         <!-- Occupation form -->\n        \n           <ion-list *ngIf="editsection==\'exhibition\'">\n                \n                <ion-item>\n                  <ion-label color="default" floating>Event Name</ion-label>\n                  <ion-input [(ngModel)]="exhbname"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="default" floating>Event Location</ion-label>\n                    <ion-input [(ngModel)]="exhblocsn"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="default" floating>Events Type</ion-label>\n                    <ion-input [(ngModel)]="exhbtype"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="default" floating> Month</ion-label>\n                    <ion-select [(ngModel)]="exhbmonth">\n    \n                        <ion-option *ngFor="let mnth of monthNames" value="{{mnth}}" selected >{{mnth}}</ion-option>\n                        \n                    </ion-select>\n                </ion-item>\n                <ion-item>\n                    <ion-label color="default" floating>Year</ion-label>\n                    <ion-select [(ngModel)]="exhbyear">\n    \n                        <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                        \n                    </ion-select>\n                </ion-item>\n              \n           </ion-list>\n        \n        \n        <!-- Occupation form -->\n        \n        <ion-list *ngIf="editsection==\'occupation\'">\n          \n          <ion-item>\n            <ion-label color="default" floating>Occupation</ion-label>\n            <ion-input [(ngModel)]="occupation"></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-label color="default" floating>Designation</ion-label>\n              <ion-input [(ngModel)]="occdsgntn"></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-label color="default" floating>Company Name</ion-label>\n              <ion-input [(ngModel)]="occcmpname"></ion-input>\n          </ion-item>\n        \n        </ion-list>\n\n        <!-- Skill form -->\n        \n        <ion-list *ngIf="editsection==\'skill\'">\n            \n            <ion-item>\n              <ion-label color="default" floating>Update Your Skills</ion-label>\n              <ion-textarea [(ngModel)]="skills" rows="3"></ion-textarea>\n            </ion-item>\n            \n          \n        </ion-list>\n\n        <ion-list *ngIf="editsection==\'interest\'">\n            \n            <ion-item>\n              <ion-label color="default" floating>Update Your Interests</ion-label>\n              <ion-textarea [(ngModel)]="interest" rows="3"></ion-textarea>\n            </ion-item>\n            \n          \n        </ion-list>\n        \n        \n        \n        \n        <!-- Experience work form -->\n        \n        <ion-list *ngIf="editsection==\'work\'">\n            \n            <ion-item>\n              <ion-label color="default" floating>Company Name</ion-label>\n              <ion-input [(ngModel)]="wrkcompny"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Position</ion-label>\n                <ion-input [(ngModel)]="wrkpositn"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Website</ion-label>\n                <ion-input [(ngModel)]="wrkwebsite" ></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Country</ion-label>\n                <ion-select #country  [(ngModel)]="locncountry">\n                    \n                      <ion-option *ngFor="let cntry of countries" value="{{cntry.id}}" >{{cntry.name}}</ion-option>\n                     \n                </ion-select>\n            </ion-item>\n            <ion-item>\n             <ion-label color="default" floating>City</ion-label>\n             <ion-input [(ngModel)]="locncity"></ion-input>\n            </ion-item>\n          \n            <ion-item>\n                <ion-label color="default" floating>Starting  Month</ion-label>\n                <ion-select [(ngModel)]="wrkstrtmonth">\n\n                  <ion-option *ngFor="let mnth of monthNames" value="{{mnth}}" selected >{{mnth}}</ion-option>\n                 \n                </ion-select>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Starting  Year</ion-label>\n                <ion-select [(ngModel)]="wrkstrtyear">\n\n                    <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                    \n                </ion-select>\n            </ion-item>\n        \n            <ion-item>\n                <ion-label color="default" floating>Ending  Month</ion-label>\n                <ion-select [(ngModel)]="wrkendmonth">\n                    <ion-option *ngFor="let mnth of monthNames" value="{{mnth}}" selected >{{mnth}}</ion-option>\n                </ion-select>\n            </ion-item>\n            <ion-item >\n                <ion-label color="default" floating>Ending  Year</ion-label>\n                <ion-select [(ngModel)]="wrkendyear">\n\n                    <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                \n                </ion-select>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Details</ion-label>\n                <ion-textarea [(ngModel)]="wrkdetail" rows="3"></ion-textarea>\n            </ion-item>\n          \n          </ion-list>\n          \n        \n        \n        \n        \n        \n        \n        \n        \n          <!-- Education form -->\n        \n        \n        \n        \n          <ion-list *ngIf="editsection==\'education\'">\n              \n              <ion-item>\n                <ion-label color="default" floating>School/University</ion-label>\n                <ion-input [(ngModel)]="eduunivercity"></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Website</ion-label>\n                  <ion-input [(ngModel)]="eduwebsite"></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Location</ion-label>\n                  <ion-select [(ngModel)]="locncountry">\n                      \n                        <ion-option *ngFor="let cntry of countries" value="{{cntry.id}}" >{{cntry.name}}</ion-option>\n                       \n                 </ion-select>\n              </ion-item>\n              <ion-item>\n               <ion-label color="default" floating>City</ion-label>\n               <ion-input [(ngModel)]="locncity"></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Degree</ion-label>\n                  <ion-input [(ngModel)]="edudegree"></ion-input>\n                 </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Starting  Month</ion-label>\n                  <ion-select [(ngModel)]="edustrtmonth">\n\n                    <ion-option *ngFor="let mnth of monthNames" value="{{mnth}}" selected >{{mnth}}</ion-option>\n                   \n                  </ion-select>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Starting  Year</ion-label>\n                  <ion-select [(ngModel)]="edustrtyear">\n\n                      <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                      \n                  </ion-select>\n              </ion-item>\n          \n              <ion-item>\n                  <ion-label color="default" floating>Ending  Month</ion-label>\n                  <ion-select [(ngModel)]="eduendmonth">\n                      <ion-option *ngFor="let mnth of monthNames" value="{{mnth}}" selected >{{mnth}}</ion-option>\n                  </ion-select>\n              </ion-item>\n              <ion-item >\n                  <ion-label color="default" floating>Ending  Year</ion-label>\n                  <ion-select [(ngModel)]="eduendyear">\n\n                      <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                  \n                  </ion-select>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Details</ion-label>\n                  <ion-textarea [(ngModel)]="edudetail" rows="3"></ion-textarea>\n              </ion-item>\n            \n            </ion-list>\n        \n        \n        \n        \n        \n        \n            \n            \n            \n            \n            <!-- Courses form -->\n        \n        \n        \n        \n          <ion-list *ngIf="editsection==\'course\'">\n              \n              <ion-item>\n                <ion-label color="default" floating>Course Name</ion-label>\n                <ion-input [(ngModel)]="crsename"></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label color="default" floating>Year</ion-label>\n                  <ion-select [(ngModel)]="crseyear">\n                      \n                        <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                                        \n                  </ion-select>\n              </ion-item>\n              <ion-item>\n               <ion-label color="default" floating>Course Organization</ion-label>\n               <ion-input [(ngModel)]="crsedorg"></ion-input>\n              </ion-item>\n            \n            </ion-list>\n        \n        \n        \n        \n        \n        \n        <!-- Personal Statetments  form -->\n        \n        <ion-list *ngIf="editsection==\'statement\'">\n          <ion-item>\n              <ion-label color="default" floating>Personal Statements</ion-label>\n              <ion-textarea [(ngModel)]="statement" rows="5"></ion-textarea>\n          </ion-item>\n        </ion-list>\n        \n        <!-- Certificate  form -->\n        \n        \n        \n        <ion-list *ngIf="editsection==\'certificate\'">\n            \n            <ion-item>\n              <ion-label color="default" floating>Certificate Name</ion-label>\n              <ion-input [(ngModel)]="certname"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Certificate Organization</ion-label>\n                <ion-input [(ngModel)]="certorg"></ion-input>\n            </ion-item>\n           \n            <ion-item>\n                <ion-label color="default" floating>Certificate  Year</ion-label>\n                <ion-select [(ngModel)]="certyear">\n                    \n                      <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                                      \n                </ion-select>\n            </ion-item>\n        \n          </ion-list>\n        \n        \n          \n        \n          <!-- Custom One form -->\n        \n        \n        \n        <ion-list *ngIf="editsection==\'customone\'">\n                \n                <ion-item>\n                  <ion-label color="default" floating>Title</ion-label>\n                  <ion-input [(ngModel)]="cstmonettl"></ion-input>\n                </ion-item>\n            \n                <ion-item>\n                    <ion-label color="default" floating>Details</ion-label>\n                    <ion-textarea [(ngModel)]="cstmonedtl" rows="5"></ion-textarea>\n                </ion-item>\n            \n        </ion-list>\n        \n          <!-- Language form -->\n        \n        \n        \n        <ion-list *ngIf="editsection==\'language\'">\n            \n            <ion-item>\n              <ion-label color="default" floating>Language Name</ion-label>\n              <ion-input [(ngModel)]="lngname"></ion-input>\n            </ion-item>\n        \n            <ion-item>\n                <ion-label color="default" floating>Profiency Level</ion-label>\n                <ion-select [(ngModel)]="lnglvl">\n                  <ion-option value="Beginner"  >Beginner</ion-option>\n                  <ion-option value="Medium" >Medium</ion-option>\n                  <ion-option value="Efficient">Efficient </ion-option>\n                </ion-select>\n            </ion-item>\n        \n          </ion-list>\n        \n        \n        \n        \n        \n        \n          <!-- Achievement/Awards form -->\n        \n        \n        \n        <ion-list *ngIf="editsection==\'award\'">\n            \n            <ion-item>\n              <ion-label color="default" floating>Awards Organization Name</ion-label>\n              <ion-input [(ngModel)]="awardorg"></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label color="default" floating>Awards Name</ion-label>\n              <ion-input [(ngModel)]="awardname"></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label color="default" floating>Website</ion-label>\n              <ion-input [(ngModel)]="awardweb"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label color="default" floating>Awards  Year</ion-label>\n                <ion-select [(ngModel)]="awardyear">\n\n                  <ion-option *ngFor="let yr of yearrages;" value="{{yr}}"  >{{yr}}</ion-option>\n                  \n                </ion-select>\n            </ion-item>\n        \n        \n          </ion-list>\n        \n        \n        \n        \n        \n        \n        \n        </ion-content>\n        \n        \n        \n        \n        <ion-footer>\n            <ion-toolbar class="button_bottom_top">\n                <a *ngIf="editsection==\'location\'" (click)="saveLocation();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'weburl\'" (click)="saveWebUrl();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'education\'" (click)="saveEducation();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'work\'" (click)="saveWork();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'skill\'" (click)="saveSkills();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'interest\'" (click)="saveInterest();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'award\'" (click)="saveAward();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'course\'" (click)="saveCourse();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'certificate\'" (click)="saveCertification();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'occupation\'" (click)="saveOccupation();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'exhibition\'" (click)="saveExhibition();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'statement\'" (click)="saveStatement();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'customone\'" (click)="saveCustomone();" class="sign-up button button-block button-stable" >Save</a>\n                <a *ngIf="editsection==\'language\'" (click)="saveLanguage();" class="sign-up button button-block button-stable" >Save</a>\n                \n            </ion-toolbar>\n        </ion-footer>\n        '/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\aboutedit\aboutedit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
], AbouteditPage);

//# sourceMappingURL=aboutedit.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_photoview_photoview__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_photoupload_photoupload__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the AlbumviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AlbumviewPage = (function () {
    function AlbumviewPage(alertCtrl, navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl, socialSharing) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this.albumphotos = [];
        this.currentslideindex = 0;
        this.currentimage = { count: 0, id: 0, image_like: "0", image_viewed: null, likeActive: 0 };
        this.base_url = this.remotService.site_url;
        this.album = navParams.get('album');
        this.initPhotoFromalbumData();
        this.albumphotos = [];
        this.currentslideindex = 0;
    }
    AlbumviewPage.prototype.initPhotoFromalbumData = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            id: this.album.id,
            token: window.localStorage['token']
        };
        this.albumphotos = [];
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'portfolioImages').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.albumphotos = response.data.Images;
                _this.albumdetails = response.data.details;
                _this.albumname = _this.albumdetails.name;
                _this.albumdescription = _this.albumdetails.description;
                console.log(_this.albumdescription);
                //this.currentslideindex = this.slides.getActiveIndex();
                //this.currentimage = this.albumphotos[this.currentslideindex];
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    AlbumviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AlbumviewPage');
    };
    AlbumviewPage.prototype.gotoPhotoView = function (album) {
        console.log(album);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_photoview_photoview__["a" /* PhotoviewPage */], { "album": album, "parentPage": this });
    };
    AlbumviewPage.prototype.editAlbum = function (albm, event) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: 'Edit album',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_photoupload_photoupload__["a" /* PhotouploadPage */], { "album": albm, "parentPage": _this });
                    }
                },
                {
                    text: 'Delete this album',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Remove Photo',
                            message: 'Are you sure?',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        var DataToSend = {
                                            userId: window.localStorage['userid'],
                                            token: window.localStorage['token'],
                                            portfolioType: 'Album',
                                            portfolioId: albm.id
                                        };
                                        _this.remotService.presentLoading('wait ...');
                                        _this.remotService.postData(DataToSend, 'deletePortfolio').subscribe(function (response) {
                                            _this.remotService.dismissLoader();
                                            if (response.success == 1) {
                                                _this.initPhotoFromalbumData();
                                            }
                                            else {
                                                _this.remotService.presentToast(response.message);
                                            }
                                        }, function () {
                                            _this.remotService.dismissLoader();
                                            _this.remotService.presentToast('Error!');
                                        });
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                        console.log('Agree clicked');
                                    }
                                }
                            ]
                        });
                        confirm.present();
                        //action sheet handler end
                    }
                }
            ]
        });
        actionSheet.present();
        event.stopPropagation();
    };
    return AlbumviewPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], AlbumviewPage.prototype, "slides", void 0);
AlbumviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-albumview',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\albumview\albumview.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>{{albumname}}</ion-title>\n\n    <ion-buttons end>\n      <button (click)="editAlbum(album,$event);" class="edit" ion-button clear>\n        <ion-icon name="settings"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-toolbar class="albumDes">\n    <span>\n      <b>Album Description : </b> {{albumdescription}} </span>\n  </ion-toolbar>\n\n\n  <ion-row>\n    <ion-col col-6 *ngFor="let phto of albumphotos;" (click)="gotoPhotoView(album);">\n      <div class="album_wrap">\n        <img src="{{base_url}}uploads/portfolioImages/resizedimages/{{phto.image_name}}" alt="Post Img" />\n      </div>\n    </ion-col>\n\n  </ion-row>\n\n\n  <ion-fab bottom right>\n    <button ion-fab (click)="upLoadImages()" color="primary">\n      <i class="material-icons">add_a_photo</i>\n    </button>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\albumview\albumview.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
], AlbumviewPage);

//# sourceMappingURL=albumview.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comment_comment__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PhotoviewPage = (function () {
    function PhotoviewPage(alertCtrl, navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl, socialSharing) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this.albumphotos = [];
        this.currentslideindex = 0;
        this.currentimage = { count: 0, id: 0, image_like: "0", image_viewed: null, likeActive: 0 };
        this.base_url = this.remotService.site_url;
        this.album = navParams.get('album');
        console.log(this.album);
        this.initPhotoFromalbumData();
        this.albumphotos = [];
        this.currentslideindex = 0;
    }
    PhotoviewPage.prototype.initPhotoFromalbumData = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            id: this.album.id,
            token: window.localStorage['token']
        };
        this.albumphotos = [];
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'portfolioImages').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.albumphotos = response.data.Images;
                _this.albumdetails = response.data.details;
                _this.currentslideindex = _this.slides.getActiveIndex();
                _this.currentimage = _this.albumphotos[_this.currentslideindex];
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    /**
     * share post on social media
     * @param item
     */
    PhotoviewPage.prototype.shareThisPost = function () {
        var link = this.base_url + "user/things/share/image/" + this.currentimage.id;
        console.log(link);
        var img = "";
        var msg = "";
        this.socialSharing.share(msg, null, null, link);
    };
    /**
    * show comments
    */
    PhotoviewPage.prototype.showComments = function (item) {
        item = {
            incident_id: [this.currentimage.id],
            incident_type: 'Image',
            id: this.currentimage.id
        };
        var commentModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__comment_comment__["a" /* CommentPage */], { incidentitem: item });
        commentModal.onDidDismiss(function (data) {
            item.comments = data.commentlength;
        });
        commentModal.present();
    };
    PhotoviewPage.prototype.editImg = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //title: 'Edit your post',
            buttons: [
                {
                    text: 'Edit image title',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        console.log(_this.currentimage);
                        _this.editimagetitle(_this.currentimage);
                    }
                },
                {
                    text: 'Edit image Description',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.editimagedesc(_this.currentimage);
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                        _this.deleteConfirm(_this.currentimage);
                    }
                },
            ]
        });
        actionSheet.present();
    };
    PhotoviewPage.prototype.likeThisimage = function () {
        var _this = this;
        var DataToSend = {
            imageId: this.currentimage.id,
            userId: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.remotService.postData(DataToSend, 'likeImageAction').subscribe(function (response) {
            console.log(response);
            if (response.success == 1) {
                if (response.data.count > _this.currentimage.image_like) {
                    _this.currentimage.likeActive = 1;
                }
                else {
                    _this.currentimage.likeActive = 0;
                }
                _this.currentimage.image_like = response.data.count;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error!');
        });
    };
    PhotoviewPage.prototype.slideChanged = function () {
        this.currentslideindex = this.slides.getActiveIndex();
        this.currentimage = this.albumphotos[this.currentslideindex];
        console.log('Current index is', this.albumphotos, this.albumphotos[this.currentslideindex]);
    };
    PhotoviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PhotoviewPage');
    };
    PhotoviewPage.prototype.editimagetitle = function (currentimage) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Change Title',
            message: "Edit Your Image Title",
            inputs: [
                {
                    name: 'title',
                    placeholder: '',
                    value: currentimage.image_title
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var albumdata = {
                            id: currentimage.id,
                            token: window.localStorage['token'],
                            image_title: data.title
                        };
                        // console.log(albumdata);
                        _this.remotService.postData(albumdata, 'EditImageTitles').subscribe(function (response) {
                            console.log(response);
                            if (response.success == 1) {
                                _this.initPhotoFromalbumData();
                            }
                            else {
                                _this.remotService.presentToast(response.message);
                            }
                        }, function () {
                            _this.remotService.presentToast('Error saving data.');
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    PhotoviewPage.prototype.editimagedesc = function (currentimage) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Change Description',
            message: "Edit Your Image Description",
            inputs: [
                {
                    name: 'desc',
                    placeholder: '',
                    value: currentimage.image_description
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var albumdata = {
                            id: currentimage.id,
                            token: window.localStorage['token'],
                            image_description: data.desc
                        };
                        // console.log(albumdata);
                        _this.remotService.postData(albumdata, 'EditImageTitles').subscribe(function (response) {
                            console.log(response);
                            if (response.success == 1) {
                                _this.initPhotoFromalbumData();
                            }
                            else {
                                _this.remotService.presentToast(response.message);
                            }
                        }, function () {
                            _this.remotService.presentToast('Error saving data.');
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    PhotoviewPage.prototype.deleteConfirm = function (currentimage) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm To Delete Image',
            message: 'Do you want to Delete this?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var albumdata = {
                            userId: window.localStorage['userid'],
                            portfolioId: currentimage.id,
                            token: window.localStorage['token'],
                            userType: window.localStorage['usertype'],
                            portfolioType: 'Image'
                        };
                        console.log(albumdata);
                        _this.remotService.postData(albumdata, 'deletePortfolio').subscribe(function (response) {
                            console.log(response);
                            if (response.success == 1) {
                                _this.initPhotoFromalbumData();
                            }
                            else {
                                _this.remotService.presentToast(response.message);
                            }
                        }, function () {
                            _this.remotService.presentToast('Error saving data.');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return PhotoviewPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
], PhotoviewPage.prototype, "slides", void 0);
PhotoviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-photoview',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\photoview\photoview.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>{{currentslideindex+1}}/{{albumphotos?.length}} </ion-title>\n\n        <ion-buttons end>\n            <button (tap)="editImg()" class="edit" ion-button clear>\n                <ion-icon name="settings"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n<ion-content>\n\n\n    <ion-slides (ionSlideDidChange)="slideChanged();">\n\n        <ion-slide *ngFor="let phto of albumphotos;">\n            <span class="ImgTitle">\n                <b>Title : {{phto.image_title!=null?phto.image_title:"No Title Found"}}</b>\n            </span>\n            <img src="{{base_url}}uploads/portfolioImages/resizedimages/{{phto.image_name}}" alt="Post Img" />\n            <!-- <span class="ImgDes"><b>Description : </b> Hello all (No description found)</span> -->\n        </ion-slide>\n\n\n    </ion-slides>\n\n\n</ion-content>\n\n<ion-footer>\n    <ion-row class="post_activity">\n        <ion-col (click)="likeThisimage();" col-4 [class.active]="currentimage.likeActive>0">\n            <ion-icon ios="ios-heart" md="md-heart"></ion-icon>\n            <span>{{currentimage.image_like}}</span>\n        </ion-col>\n        <ion-col col-4 (click)="showComments(phto)">\n            <ion-icon ios="ios-text" md="md-text"></ion-icon>\n            <span>{{currentimage.count}}</span>\n        </ion-col>\n        <ion-col (click)="shareThisPost();" col-4>\n            <ion-icon ios="ios-share" md="md-share"></ion-icon>\n            <span>{{currentimage.image_viewed}}</span>\n        </ion-col>\n    </ion-row>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\photoview\photoview.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */]])
], PhotoviewPage);

//# sourceMappingURL=photoview.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudiocommentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AudiocommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AudiocommentPage = (function () {
    function AudiocommentPage(navCtrl, navParams, viewCntrl, actionSheetCtrl, remotService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCntrl = viewCntrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.comments = [];
        this.base_url = this.remotService.site_url;
        this.currentitem = navParams.get('incidentitem');
        // console.log(this.currentitem);
        var commentsParams = {
            type: 'Audio',
            incident_id: this.currentitem.audio_id,
            typeId: this.currentitem.IncidentId,
            token: window.localStorage['token']
        };
        console.log(commentsParams);
        this.comments = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(commentsParams, 'seeComments').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                console.log(response);
                var commentData = response.data.comments;
                if (commentData != null) {
                    commentData.forEach(function (item, key, index) {
                        _this.comments.push(item);
                    });
                }
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    }
    AudiocommentPage.prototype.sendMessage = function () {
        var _this = this;
        var commentsParams = {
            incidentType: 'Audio',
            incidentId: this.currentitem.IncidentId,
            incidentTypeId: this.currentitem.audio_id,
            token: window.localStorage['token'],
            comment: this.commentText,
            user_id: window.localStorage['userid'],
        };
        console.log(commentsParams);
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe(function (response) {
            console.log(response);
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var newcomment = {
                    comment: _this.commentText,
                    users_full_name: window.localStorage['name'],
                    image: window.localStorage['userimage'],
                    id: response.data.id
                };
                _this.comments.push(newcomment);
                _this.commentText = '';
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    AudiocommentPage.prototype.presentActionSheet = function (comment, idx) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //  title: 'Edit your Comment',
            buttons: [
                {
                    text: 'Delete Your comment',
                    role: 'destructive',
                    handler: function () {
                        var commentsParams = {
                            incidentType: 'Audio',
                            incidentId: _this.currentitem.IncidentId,
                            incidentTypeId: _this.currentitem.audio_id,
                            token: window.localStorage['token'],
                            commentId: comment.id,
                            userId: window.localStorage['userid'],
                        };
                        _this.remotService.presentLoading("Wait ...");
                        _this.remotService.postData(commentsParams, 'deleteComments').subscribe(function (response) {
                            _this.remotService.dismissLoader();
                            //console.log(idx);
                            _this.comments.splice(idx, 1);
                        }, function () {
                            _this.remotService.dismissLoader();
                            _this.remotService.presentToast('Error .');
                        });
                        // console.log('Destructive clicked',comment,idx);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AudiocommentPage.prototype.dismissComment = function () {
        this.viewCntrl.dismiss({ commentlength: this.comments.length });
    };
    AudiocommentPage.prototype.scrollToBottom = function () {
        // use the content's dimension to obtain the current height of the scroll
        var dimension = this.content.getContentDimensions();
        // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
        this.content.scrollTo(0, dimension.scrollHeight);
    };
    AudiocommentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AudiocommentPage');
    };
    return AudiocommentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], AudiocommentPage.prototype, "content", void 0);
AudiocommentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-audiocomment',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\audiocomment\audiocomment.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Comment</ion-title>\n    <ion-buttons end>\n\n      <button class="dismiss" (click)="dismissComment();">\n        <ion-icon name="close-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list *ngFor="let comment of comments;let idx = index;">\n    <ion-item class="comment_wrap">\n      <ion-avatar item-left>\n\n        <img *ngIf="comment.image!=null && comment.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{comment.image}}"\n          alt="avatar">\n        <img *ngIf="comment.image==null || comment.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n      </ion-avatar>\n      <ion-item class="searcsh_right">\n        <p>{{comment.users_full_name}}\n          <span>{{comment.creation_date | amTimeAgo:true}}</span>\n        </p>\n        <p class="user_deg">{{comment.comment}}</p>\n        <div class="comment_action">\n          <ion-icon (click)="presentActionSheet(comment,idx)" ios="ios-more" md="md-more"></ion-icon>\n        </div>\n      </ion-item>\n    </ion-item>\n  </ion-list>\n\n\n</ion-content>\n\n\n<ion-footer>\n\n  <ion-toolbar class="msg" color="footer-white">\n    <ion-textarea [(ngModel)]="commentText" rows="1" autoresize placeholder="Type Message Here..."></ion-textarea>\n    <!-- on keyboard open send button -->\n    <button ion-button end small (click)="sendMessage()" [disabled]="msg === \'\'" *ngIf="!cambutton">\n      <i class="material-icons">send</i>\n    </button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\audiocomment\audiocomment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], AudiocommentPage);

//# sourceMappingURL=audiocomment.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudiosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_audio__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_audiupload_audiupload__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_audiocomment_audiocomment__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the AudiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AudiosPage = (function () {
    function AudiosPage(events, socialSharing, modalCtrl, _audioProvider, remotService, alertCtrl, actionSheetCtrl, navCtrl, navParams) {
        this.events = events;
        this.socialSharing = socialSharing;
        this.modalCtrl = modalCtrl;
        this._audioProvider = _audioProvider;
        this.remotService = remotService;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.base_url = this.remotService.site_url;
        this.initaudio();
    }
    AudiosPage.prototype.ngAfterContentInit = function () {
        // get all tracks managed by AudioProvider so we can control playback via the API
        this.allTracks = this._audioProvider.tracks;
    };
    AudiosPage.prototype.playSelectedTrack = function () {
        // use AudioProvider to control selected track 
        this._audioProvider.play(this.selectedTrack);
    };
    AudiosPage.prototype.pauseSelectedTrack = function () {
        // use AudioProvider to control selected track 
        this._audioProvider.pause(this.selectedTrack);
    };
    AudiosPage.prototype.onTrackFinished = function (track) {
        console.log('Track finished', track);
    };
    AudiosPage.prototype.uploadyouraudio = function () {
        console.log(this);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_audiupload_audiupload__["a" /* AudiuploadPage */], { "parentPage": this });
    };
    AudiosPage.prototype.initaudio = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            other_user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            type: 'Audio'
        };
        this.allmyaudios = [];
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'mediaListing').subscribe(function (response) {
            _this.remotService.dismissLoader();
            console.log(response);
            response.data.forEach(function (item, key, index) {
                var audiosource = (item.audio_name != null && item.audio_name != '') ? _this.base_url + item.audio_name : item.audio_source;
                item.myTracks = [{
                        src: audiosource,
                        artist: 'No Artist',
                        title: item.audio_title,
                        art: 'img/johnmayer.jpg',
                        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
                    }];
                _this.allmyaudios.push(item);
            });
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    AudiosPage.prototype.presentActionSheetforaudio = function (ado, event) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: 'Edit Audio',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_audiupload_audiupload__["a" /* AudiuploadPage */], { "audio": ado, "parentPage": _this });
                    }
                },
                {
                    text: 'Delete this Audio',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Remove Audio',
                            message: 'Are you sure?',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        var DataToSend = {
                                            userId: window.localStorage['userid'],
                                            token: window.localStorage['token'],
                                            portfolioType: 'Audio',
                                            userType: window.localStorage['usertype'],
                                            portfolioId: ado.audio_id
                                        };
                                        _this.remotService.presentLoading('wait ...');
                                        _this.remotService.postData(DataToSend, 'deletePortfolio').subscribe(function (response) {
                                            _this.remotService.dismissLoader();
                                            if (response.success == 1) {
                                                _this.initaudio();
                                            }
                                            else {
                                                _this.remotService.presentToast(response.message);
                                            }
                                        }, function () {
                                            _this.remotService.dismissLoader();
                                            _this.remotService.presentToast('Error!');
                                        });
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                        console.log('Agree clicked');
                                    }
                                }
                            ]
                        });
                        confirm.present();
                        //action sheet handler end
                    }
                }
            ]
        });
        actionSheet.present();
        event.stopPropagation();
    };
    AudiosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad AudiosPage');
    };
    AudiosPage.prototype.likeThisaudio = function (track) {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            incidentId: track.IncidentId,
            incidentTypeId: track.audio_id,
            incidentType: 'Audio',
        };
        this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe(function (response) {
            if (response.success == 1) {
                if (response.data.count > track.likes) {
                    track.likeActive = 1;
                }
                else {
                    track.likeActive = 0;
                }
                track.likes = response.data.count;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error!');
        });
    };
    /**
    * show comments
    */
    AudiosPage.prototype.showComments = function (track) {
        var commentModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_audiocomment_audiocomment__["a" /* AudiocommentPage */], { incidentitem: track });
        commentModal.onDidDismiss(function (data) {
            track.comments = data.commentlength;
        });
        commentModal.present();
    };
    /**
       * share post on social media
       * @param item
       */
    AudiosPage.prototype.shareThisPost = function (track) {
        var link = this.base_url + "user/things/share/audio/" + track.IncidentId + "/1";
        console.log(link);
        var vddo = "";
        var msg = "";
        this.socialSharing.share(msg, null, null, link);
    };
    return AudiosPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], AudiosPage.prototype, "navBar", void 0);
AudiosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-audios',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\audios\audios.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Audio</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar text-center>\n    <button color="light" icon-start ion-button round (click)="uploadyouraudio()">\n      <ion-icon name="cloud-upload"></ion-icon> Upload Your Audio </button>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-grid>\n\n\n\n    <ion-row *ngFor="let track of allmyaudios">\n      <ion-col>\n        <div class="post_wrap">\n          <ion-list class="post_header">\n            <ion-item class="" padding-horizontal>\n              <ion-item>\n                <p text-center>{{track.audio_title}}</p>\n                <span>{{track.audio_description}} / {{track.creation_date | date:\'fullDate\'}} {{track.creation_date | date:\'shortTime\'}}</span>\n              </ion-item>\n              <div class="post_action">\n                <ion-icon (click)="presentActionSheetforaudio(track , $event)" ios="ios-more" md="md-more"></ion-icon>\n              </div>\n            </ion-item>\n          </ion-list>\n\n          <ion-list class="post_body audio_wrap">\n            <audio-track #audio *ngFor="let track of track.myTracks" [track]="track" (onFinish)="onTrackFinished($event)">\n              <ion-item>\n                <ion-thumbnail item-left>\n                  <img src="assets/img/audio_new.png">\n                  <audio-track-play dark [audioTrack]="audio">\n                    <ion-spinner></ion-spinner>\n                  </audio-track-play>\n                </ion-thumbnail>\n                <div item-content style="width:100%">\n                  <p>\n                    <strong>{{audio.title}}</strong>\n                    <em>{{audio.artist}}</em>\n                  </p>\n                  <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n                </div>\n              </ion-item>\n            </audio-track>\n          </ion-list>\n\n          <ion-row class="post_activity">\n            <ion-col (click)="likeThisaudio(track)" col-4 [class.active]="track.likeActive>0">\n              <ion-icon ios="ios-heart" md="md-heart"></ion-icon>\n              <span>{{track.likes}}</span>\n            </ion-col>\n            <ion-col col-4 (click)="showComments(track)">\n              <ion-icon ios="ios-text" md="md-text"></ion-icon>\n              <span>{{track.comment}}</span>\n            </ion-col>\n            <ion-col col-4 (click)="shareThisPost(track)">\n              <ion-icon ios="ios-share" md="md-share"></ion-icon>\n\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\audios\audios.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3_ionic_audio__["a" /* AudioProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], AudiosPage);

//# sourceMappingURL=audios.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudiuploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_chooser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AudiuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AudiuploadPage = (function () {
    function AudiuploadPage(transfer, fileChooser, remotService, navCtrl, navParams) {
        this.transfer = transfer;
        this.fileChooser = fileChooser;
        this.remotService = remotService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audiotitle = '';
        this.audioid = 0;
        this.audioprvcy = 1;
        this.mediaupd = true;
        this.API_URL = 'http://dev.mojolynclife.info/public/index.php/api';
        this.userFullname = window.localStorage['name'];
        this.userimage = window.localStorage['userimage'];
        this.base_url = this.remotService.site_url;
        this.user_id = window.localStorage['userid'];
        this.token = window.localStorage['token'];
        var audio = navParams.get('audio');
        if (audio && audio.hasOwnProperty('audio_id')) {
            this.audioid = audio.audio_id;
            this.audiotitle = audio.audio_title;
            this.audiodesc = audio.audio_description;
            this.audioprvcy = audio.privacy;
            this.mediaupd = false;
        }
    }
    AudiuploadPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AudiuploadPage');
    };
    AudiuploadPage.prototype.chooseAudio = function () {
        var _this = this;
        this.fileChooser.open().then(function (uri) {
            _this.choseuri = uri;
            _this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
            _this.currentName = _this.currentName.replace(/%20/g, '_');
            _this.currentName = _this.currentName.replace(/%/g, '_');
        }, function () {
            console.log('error');
        });
    };
    AudiuploadPage.prototype.uploadAudio = function () {
        var _this = this;
        if (this.audioid > 0) {
            console.log('update video');
            console.log(this.audioid);
            var url = 'editMediaDetails';
            var DataToSend = {
                userId: window.localStorage['userid'],
                token: window.localStorage['token'],
                mediaTitle: this.audiotitle,
                mediaDescription: this.audiodesc,
                mediaPrivacy: this.audioprvcy,
                editMediaType: 'Audio',
                editMediaId: this.audioid
            };
            console.log(DataToSend);
            this.remotService.presentLoading("Saving ...");
            this.remotService.postData(DataToSend, url).subscribe(function (response) {
                console.log(response);
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    _this.navParams.get("parentPage").initaudio();
                    _this.navCtrl.pop();
                }
                else {
                    _this.remotService.presentToast(response.message);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
        else {
            this.fileTransfer = this.transfer.create();
            var options = {
                fileKey: "audiofile",
                fileName: this.currentName,
                httpMethod: "POST",
                chunkedMode: false,
                mimeType: "audio/mp3",
                headers: {},
                params: { 'token': this.token, 'user_id': this.user_id, 'audiodescription': this.audiodesc, 'audioname': this.audiotitle, 'privacy': this.audioprvcy }
            };
            this.remotService.presentLoading('wait ...');
            console.log(options);
            //console.log(this.videotitle, this.videoprvcy, this.videodesc);
            var url_1 = this.API_URL + "/audioUpload";
            console.log(this.choseuri);
            this.fileTransfer.upload(this.choseuri, url_1, options)
                .then(function (data) {
                _this.remotService.dismissLoader();
                _this.navCtrl.pop();
                console.log(data);
            }, function (err) {
                console.log('error');
                _this.remotService.dismissLoader();
            });
        }
    };
    return AudiuploadPage;
}());
AudiuploadPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-audiupload',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\audiupload\audiupload.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Audio Add</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item class="albumUser">\n      <ion-avatar item-left>\n        <img *ngIf="userimage!=\'null\' && userimage!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{userimage}}" alt="avatar">\n        <img *ngIf="userimage==\'null\' || userimage==\'\'" src="/assets/img/management.png" alt="avatar">\n      </ion-avatar>\n      <p class="EventUser">{{userFullname}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="default" floating>Enter Audio Title</ion-label>\n      <ion-input [(ngModel)]="audiotitle"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="default" floating>Enter Audio Description</ion-label>\n      <ion-textarea rows="4" [(ngModel)]="audiodesc"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Set Privacy</ion-label>\n      <ion-select [(ngModel)]="audioprvcy">\n        <ion-option value="1">Public</ion-option>\n        <ion-option value="2">Connection Only</ion-option>\n        <ion-option value="3">Connection and followers</ion-option>\n        <ion-option value="4">Only me</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <button class="uploadImage" (click)="chooseAudio()" *ngIf="mediaupd">\n      Upload Audio\n      <ion-icon name="cloud-upload"></ion-icon>\n    </button>\n    <p class="audio_name">\n      {{currentName}}\n    </p>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <button class="sign-up button button-block button-stable" (click)="uploadAudio()" [disabled]="audiotitle==\'\'">Save</button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\audiupload\audiupload.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_chooser__["a" /* FileChooser */],
        __WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], AudiuploadPage);

//# sourceMappingURL=audiupload.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonmodalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommonmodalPage = (function () {
    function CommonmodalPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.items = [];
        this.items = navParams.get('items');
        this.title = navParams.get('title');
    }
    CommonmodalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommonmodalPage');
    };
    CommonmodalPage.prototype.dismissModal = function () {
        //alert("okkk");
        this.viewCtrl.dismiss();
    };
    return CommonmodalPage;
}());
CommonmodalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-commonmodal',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\commonmodal\commonmodal.html"*/'<ion-header class="creoyou-header">\n  \n    <ion-navbar>\n        <ion-title>{{title}}</ion-title>\n        <ion-buttons end>\n            <button class="dismiss" (click)="dismissModal()">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  \n   \n  <ion-content class="content-background">\n    \n       <ion-list>\n           <ion-item   *ngFor="let item of items">\n               {{item.name}}\n           </ion-item>\n       </ion-list>\n    \n   </ion-content>\n'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\commonmodal\commonmodal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */]])
], CommonmodalPage);

//# sourceMappingURL=commonmodal.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewmessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NewmessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NewmessagePage = (function () {
    function NewmessagePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    NewmessagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewmessagePage');
    };
    return NewmessagePage;
}());
NewmessagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-newmessage',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\newmessage\newmessage.html"*/'\n<ion-header>\n    \n      <ion-navbar>\n        <ion-title>Compose</ion-title>\n      </ion-navbar>\n      \n        <ion-toolbar class="chatSearch" >\n          <ion-searchbar placeholder="Search for people ..." ></ion-searchbar>\n        </ion-toolbar>\n    \n    </ion-header>\n    \n    \n    <ion-content padding>\n    \n    \n        <ion-list>\n            \n              <ion-item>\n                <ion-input placeholder="To" type="text" value=""></ion-input>\n              </ion-item>\n    \n              <ion-item>\n                  <ion-textarea rows="5" placeholder="Type you Messages here ..."></ion-textarea>\n              </ion-item>\n    \n    \n        </ion-list>\n       \n    \n    </ion-content>\n    <ion-footer>\n        <ion-toolbar class="button_bottom_top">\n            <a class="sign-up button button-block button-stable" ui-sref="common.login">SEND</a>\n        </ion-toolbar>\n    </ion-footer>\n    '/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\newmessage\newmessage.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], NewmessagePage);

//# sourceMappingURL=newmessage.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortfolioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PortfolioPage = (function () {
    function PortfolioPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Otherprofileview = 'album';
    }
    /* segmentChanged(event) {
  
      if (this.Otherprofileview == 'album')
       
      else if (this.Otherprofileview == 'video')
        
      else if (this.Otherprofileview == 'audio')
       
    } */
    PortfolioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PortfolioPage');
    };
    return PortfolioPage;
}());
PortfolioPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-portfolio',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\portfolio\portfolio.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>portfolio</ion-title>\n  </ion-navbar>\n  <ion-segment (ionChange)="segmentChanged($event)" [(ngModel)]="Otherprofileview">\n    <ion-segment-button value="album">\n      Album\n    </ion-segment-button>\n    <ion-segment-button value="video">\n      Video\n    </ion-segment-button>\n    <ion-segment-button value="audio">\n      Audio\n\n\n    </ion-segment-button>\n  </ion-segment>\n</ion-header>\n\n\n<ion-content padding>\n  <div [ngSwitch]="Otherprofileview">\n\n    <ion-list *ngSwitchCase="\'album\'" class="individual">\n\n      album\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'video\'" class="individual">\n\n      video\n    </ion-list>\n    <ion-list *ngSwitchCase="\'audio\'" class="individual">\n\n      audio\n    </ion-list>\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\portfolio\portfolio.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], PortfolioPage);

//# sourceMappingURL=portfolio.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventcreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_base64__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_taguser_taguser__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EventcreatePage = (function () {
    function EventcreatePage(events, modalCtrl, _DomSanitizer, imagepick, cameraservice, basesxfrservice, remotService, navCtrl, navParams, actionSheetCtrl) {
        this.events = events;
        this.modalCtrl = modalCtrl;
        this._DomSanitizer = _DomSanitizer;
        this.imagepick = imagepick;
        this.cameraservice = cameraservice;
        this.basesxfrservice = basesxfrservice;
        this.remotService = remotService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.eventprivacy = 1;
        this.statustags = [];
        var eventdtls = navParams.get('Eventdetails');
        this.base_url = this.remotService.site_url;
        // console.log(this.eventstartdate);
        /* Edit event details  */
        if (eventdtls && eventdtls.hasOwnProperty('id')) {
            this.eventid = eventdtls.id;
            this.eventtitle = eventdtls.name;
            this.eventlocation = eventdtls.location;
            this.eventstartdate = new Date(eventdtls.start_date_time).toISOString();
            this.eventstarttime = new Date(eventdtls.start_date_time).toISOString();
            this.eventenddate = new Date(eventdtls.end_date_time).toISOString();
            this.eventendtime = new Date(eventdtls.end_date_time).toISOString();
            this.eventdesc = eventdtls.description;
            this.eventprivacy = eventdtls.event_status;
            this.eventimg = eventdtls.media_name;
            this.eventimgshow = true;
        }
    }
    /* For create event*/
    EventcreatePage.prototype.CreateEvent = function () {
        var _this = this;
        if (this.eventid > 0) {
            var DataToSends = {
                token: window.localStorage['token'],
                userId: window.localStorage['userid'],
                eventId: this.eventid,
                eventName: this.eventtitle,
                location: this.eventlocation,
                description: this.eventdesc,
                startDate: this.eventstartdate,
                startTime: this.eventstarttime,
                endDate: this.eventenddate,
                endTime: this.eventendtime,
                invitedFriendsId: this.statustags,
                imageData: this.eventimageupload,
                eventStatus: this.eventprivacy
            };
            this.remotService.presentLoading("Saving ...");
            this.remotService.postData(DataToSends, 'eventCreateUpdate').subscribe(function (response) {
                if (response.success == 1) {
                    _this.remotService.dismissLoader();
                    _this.navParams.get("parentPage").initeventlist();
                    _this.navCtrl.pop();
                }
                else {
                    _this.remotService.presentToast(response.message);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
        else {
            var DataToSend = {
                token: window.localStorage['token'],
                userId: window.localStorage['userid'],
                eventId: '',
                eventName: this.eventtitle,
                location: this.eventlocation,
                description: this.eventdesc,
                startDate: this.eventstartdate,
                startTime: this.eventstarttime,
                endDate: this.eventenddate,
                endTime: this.eventendtime,
                invitedFriendsId: this.statustags,
                imageData: this.eventimageupload,
                eventStatus: this.eventprivacy
            };
            this.remotService.presentLoading("Saving ...");
            this.remotService.postData(DataToSend, 'eventCreateUpdate').subscribe(function (response) {
                if (response.success == 1) {
                    _this.remotService.dismissLoader();
                    _this.navParams.get("parentPage").initeventlist();
                    _this.navCtrl.pop();
                }
                else {
                    _this.remotService.presentToast(response.message);
                }
                _this.remotService.dismissLoader();
                console.log(response);
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
    };
    /*Invite connection for event */
    EventcreatePage.prototype.inviteConnection = function () {
        var _this = this;
        this.statustags = [];
        var connectionModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_taguser_taguser__["a" /* TaguserPage */]);
        connectionModal.onDidDismiss(function (data) {
            if (data.tags.length > 0) {
                data.tags.forEach(function (item) {
                    _this.statustags.push(item.user_id);
                });
            }
            // console.log(this.statustags);
        });
        connectionModal.present();
    };
    EventcreatePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:hidemenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad EventcreatePage');
    };
    /*Image upload for event */
    EventcreatePage.prototype.upLoadImages = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //title: 'Edit your post',
            buttons: [
                {
                    text: 'Open Camera',
                    role: 'destructive',
                    handler: function () {
                        _this.takePicture();
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Open Gallery',
                    role: 'destructive',
                    handler: function () {
                        _this.openImagePicker();
                        console.log('Destructive clicked');
                    }
                },
            ]
        });
        actionSheet.present();
    };
    /* Take picture from camera */
    EventcreatePage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            correctOrientation: true
        };
        this.cameraservice.getPicture(options)
            .then(function (item) {
            _this.saveImageToArrayBypath(item);
        }, function (error) {
            console.log(error);
        });
    };
    /* get image path */
    EventcreatePage.prototype.saveImageToArrayBypath = function (filePath) {
        var _this = this;
        //let filePath: string = this.chnagedimagename;
        this.basesxfrservice.encodeFile(filePath).then(function (base64File) {
            var bsesixfrImage = base64File.split(',');
            _this.photos = {
                realpath: base64File,
                foruploadpath: bsesixfrImage[1]
            };
            console.log(_this.photos.realpath);
            _this.eventimg = _this.photos.realpath;
            _this.eventimageupload = _this.photos.foruploadpath;
            _this.eventimgshow = false;
        });
    };
    /* Open image gallery */
    EventcreatePage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
        };
        this.chnagedimagename = null;
        this.imagepick.getPictures(options)
            .then(function (results) {
            results.forEach(function (item) {
                _this.saveImageToArrayBypath(item);
            });
        }, function (err) {
            console.log(err);
        });
    };
    /*Remove image */
    EventcreatePage.prototype.removeImage = function () {
        this.eventimg = '';
    };
    return EventcreatePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], EventcreatePage.prototype, "navBar", void 0);
EventcreatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-eventcreate',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventcreate\eventcreate.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Create New Event </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-item>\n      <ion-label color="default" floating>Event Title</ion-label>\n      <ion-input [(ngModel)]="eventtitle"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Location</ion-label>\n      <ion-input [(ngModel)]="eventlocation"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Event Start Date</ion-label>\n      <!-- <ion-datetime displayFormat="YYYY-MM-DD" [(ngModel)]="eventstartdate"></ion-datetime> -->\n      <ion-datetime displayFormat="YYYY-MM-DD" pickerFormat="YYYY-MM-DD" [(ngModel)]="eventstartdate"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Event Start Time</ion-label>\n      <ion-datetime displayFormat="h:mm a" [(ngModel)]="eventstarttime"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Event End Date</ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DD" pickerFormat="YYYY-MM-DD" [(ngModel)]="eventenddate"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Event End Time</ion-label>\n      <ion-datetime displayFormat="h:mm a" [(ngModel)]="eventendtime"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Enter Description</ion-label>\n      <ion-textarea rows="4" [(ngModel)]="eventdesc"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Set Privacy</ion-label>\n      <ion-select [(ngModel)]="eventprivacy">\n        <ion-option value="1">Public</ion-option>\n        <ion-option value="4">Private</ion-option>\n      </ion-select>\n    </ion-item>\n\n\n    <a (click)="inviteConnection()">Invite Your Connections</a>\n\n    <div class="eventImage" *ngIf="eventimgshow">\n      <img src="{{base_url}}uploads/eventsImages/{{eventimg}}" alt="image" />\n      <ion-icon name="close" (click)="removeImage();"></ion-icon>\n    </div>\n    <div class="eventImage" *ngIf="!eventimgshow">\n      <img [src]="_DomSanitizer.bypassSecurityTrustUrl(eventimg)" alt="image" />\n      <ion-icon name="close" (click)="removeImage();"></ion-icon>\n    </div>\n\n\n    <button class="uploadImage" (click)="upLoadImages()">\n      Add Photo\n      <i class="material-icons">add_a_photo</i>\n    </button>\n\n\n  </ion-list>\n\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <button class="sign-up button button-block button-stable" (click)="CreateEvent()">Share Your Event</button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventcreate\eventcreate.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["DomSanitizer"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], EventcreatePage);

//# sourceMappingURL=eventcreate.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EventdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventdetailsPage = (function () {
    function EventdetailsPage(remotService, actionSheetCtrl, navCtrl, navParams) {
        this.remotService = remotService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventdetails = this.navParams.get('eventdetails');
        this.base_url = this.remotService.site_url;
    }
    EventdetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventdetailsPage');
    };
    EventdetailsPage.prototype.editevent = function () {
        var actionSheet = this.actionSheetCtrl.create({
            // title: 'Edit your Event',
            buttons: [
                {
                    text: 'Edit Event',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Delete Event',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                },
            ]
        });
        actionSheet.present();
    };
    return EventdetailsPage;
}());
EventdetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-eventdetails',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventdetails\eventdetails.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Event Details</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n  <ion-grid>\n\n    <ion-row>\n      <ion-col class="EventContainer">\n        <ion-list class="eventHeader">\n          <ion-item>\n            <ion-avatar item-left>\n              <img *ngIf="eventdetails.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{eventdetails.image}}" alt="avatar">\n              <img *ngIf="eventdetails.image==\'\'" src="assets/img/management.png" alt="avatar">\n            </ion-avatar>\n            <p class="EventTitle">{{eventdetails.name}} by {{eventdetails.fname}} {{eventdetails.lname}}</p>\n          </ion-item>\n        </ion-list>\n\n        <ion-list class="EventBody">\n          <ion-item>\n            <img src="{{base_url}}uploads/eventsImages/{{eventdetails.media_name}}" alt="Post Img" />\n            <div class="EventDetails">\n              <b>Event Date : </b>{{eventdetails.start_date_time | date:\'mediumDate\'}} | {{eventdetails.start_date_time | date:\'shortTime\'}}\n              - {{eventdetails.end_date_time | date:\'mediumDate\'}} | {{eventdetails.end_date_time | date:\'shortTime\'}}\n            </div>\n            <div class="EventDetails">\n              <b>Event Title : </b> {{eventdetails.name}}\n            </div>\n            <div class="EventDetails">\n              <b>Event Location : </b> {{eventdetails.location}}\n            </div>\n            <div class="EventDetails">\n              <b>Description : </b> {{eventdetails.description}}\n            </div>\n\n            <div class="EventDate">\n              <span>{{eventdetails.start_date_time | date:\'dd\'}}</span>\n              {{eventdetails.start_date_time | date:\'MMMM\'}}\n            </div>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventdetails\eventdetails.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], EventdetailsPage);

//# sourceMappingURL=eventdetails.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_eventcreate_eventcreate__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_eventdetails_eventdetails__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__eventscalender_eventscalender__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__comment_comment__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the EventlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventlistPage = (function () {
    function EventlistPage(socialSharing, modalCtrl, alertCtrl, remotService, events, actionSheetCtrl, navCtrl, navParams) {
        this.socialSharing = socialSharing;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.remotService = remotService;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.base_url = this.remotService.site_url;
        this.initeventlist();
        this.pagename = this.navParams.get('name');
        /* console.log(this.pagename); */
    }
    EventlistPage.prototype.initeventlist = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'fullEvents').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (_this.pagename == 'Past') {
                _this.eventlist = response.data.past;
                console.log(_this.eventlist);
            }
            else {
                _this.eventlist = response.data.upcoming;
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    EventlistPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad EventlistPage');
    };
    EventlistPage.prototype.editevent = function (event) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            // title: 'Edit your Event',
            buttons: [
                {
                    text: 'Edit Event',
                    role: 'destructive',
                    handler: function () {
                        /* console.log('Destructive clicked');
                        console.log(event); */
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_eventcreate_eventcreate__["a" /* EventcreatePage */], { "Eventdetails": event, "parentPage": _this });
                    }
                },
                {
                    text: 'Delete Event',
                    role: 'destructive',
                    handler: function () {
                        _this.deleteEvent(event);
                        /*  console.log('Destructive clicked'); */
                    }
                },
                {
                    text: 'Add to Calendar',
                    role: 'destructive',
                    handler: function () {
                        _this.addtocalendarEvent(event);
                    }
                },
            ]
        });
        actionSheet.present();
    };
    EventlistPage.prototype.createEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_eventcreate_eventcreate__["a" /* EventcreatePage */], { "parentPage": this });
    };
    EventlistPage.prototype.eventcalender = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__eventscalender_eventscalender__["a" /* EventscalenderPage */], { 'eventcaldetails': this.eventlist });
    };
    EventlistPage.prototype.eventDetails = function (event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_eventdetails_eventdetails__["a" /* EventdetailsPage */], { 'eventdetails': event });
    };
    EventlistPage.prototype.deleteEvent = function (event) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm To Delete Event',
            message: 'Do you want to Delete this?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        /*  console.log('Cancel clicked'); */
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var DataToSends = {
                            event_id: event.id,
                            token: window.localStorage['token']
                        };
                        _this.remotService.presentLoading("Saving ...");
                        _this.remotService.postData(DataToSends, 'eventDelete').subscribe(function (response) {
                            _this.remotService.dismissLoader();
                            if (response.success == 1) {
                                _this.initeventlist();
                            }
                        }, function () {
                            _this.remotService.dismissLoader();
                            _this.remotService.presentToast('Error getting about details.');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    EventlistPage.prototype.likeThisitem = function (event) {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            incidentTypeId: event.id,
            incidentId: event.incidentId,
            incidentType: event.incident_type,
            token: window.localStorage['token']
        };
        console.log(event);
        this.remotService.presentToast('Saving ...');
        this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe(function (response) {
            if (response.success == 1) {
                if (response.data.count > event.likes) {
                    event.likeActive = 1;
                }
                else {
                    event.likeActive = 0;
                }
                event.likes = response.data.count;
                _this.remotService.presentToast('Saved.');
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error!');
        });
    };
    /**
     * show comments
     */
    EventlistPage.prototype.showComments = function (event) {
        console.log(event);
        var data = {
            incident_type: event.incident_type,
            id: event.incidentId,
            incident_id: event.id
        };
        var commentModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__comment_comment__["a" /* CommentPage */], { incidentitem: data });
        commentModal.onDidDismiss(function (data) {
            event.count = data.commentlength;
        });
        commentModal.present();
    };
    EventlistPage.prototype.shareThisPost = function (event) {
        var type = event.incident_type.toLowerCase();
        var link = this.base_url + "user/things/share/" + type + "/" + event.id;
        console.log(link);
        var img = "";
        var msg = "";
        this.socialSharing.share(msg, null, null, link);
    };
    EventlistPage.prototype.addtocalendarEvent = function (event) {
        var _this = this;
        var DataToSends = {
            userId: window.localStorage['userid'],
            eventId: event.id,
            token: window.localStorage['token']
        };
        console.log(DataToSends);
        this.remotService.presentLoading("Saving ...");
        this.remotService.postData(DataToSends, 'addToCalender').subscribe(function (response) {
            _this.remotService.dismissLoader();
            console.log(response);
            if (response.success == 1) {
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    return EventlistPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], EventlistPage.prototype, "navBar", void 0);
EventlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-eventlist',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventlist\eventlist.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>{{pagename}} Events</ion-title>\n\n    <ion-buttons end (click)="eventcalender()">\n      <button class="add_connection" ion-button clear>\n        <i class="material-icons">perm_contact_calendar</i>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-grid>\n\n    <h2 *ngIf="eventlist==\'\'">You have no {{pagename}} event</h2>\n\n    <ion-row *ngFor="let event of eventlist">\n      <ion-col class="EventContainer">\n        <ion-list class="eventHeader" (click)="eventDetails(event)">\n          <ion-item>\n            <p class="EventTitle" *ngIf="event.buisness_name">{{event.buisness_name}}</p>\n            <p class="EventTitle">{{event.name}} by {{event.fname}} {{event.lname}}</p>\n            <p class="EventUser"></p>\n            <p>{{event.start_date_time | date:\'mediumDate\'}} | {{event.start_date_time | date:\'shortTime\'}} - {{event.end_date_time\n              | date:\'mediumDate\'}} | {{event.end_date_time | date:\'shortTime\'}}</p>\n            <p>{{event.location}}</p>\n\n            <div class="post_action" (tap)="editevent(event)">\n              <ion-icon name="settings"></ion-icon>\n            </div>\n          </ion-item>\n        </ion-list>\n\n        <ion-list class="EventBody">\n          <ion-item>\n            <img src="{{base_url}}uploads/eventsImages/{{event.media_name}}" alt="Post Img" />\n            <div class="EventDetails">\n              {{event.description}}\n            </div>\n\n            <div class="EventDate">\n              <span>{{event.start_date_time | date:\'dd\'}}</span>\n              {{event.start_date_time | date:\'MMMM\'}}\n            </div>\n          </ion-item>\n        </ion-list>\n\n        <ion-row class="post_activity">\n          <ion-col col-4 [class.active]="event.likeActive>0">\n            <ion-icon ios="ios-heart" md="md-heart" (click)="likeThisitem(event)"></ion-icon>\n            <span>{{event.likes}}</span>\n          </ion-col>\n          <ion-col col-4>\n            <ion-icon ios="ios-text" md="md-text" (click)="showComments(event)"></ion-icon>\n            <span *ngIf="event.count">{{event.count}}</span>\n          </ion-col>\n          <ion-col col-4>\n            <ion-icon ios="ios-share" md="md-share" (click)="shareThisPost(event);"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n\n\n\n\n\n    <!-- <ion-row>\n      <ion-col class="EventContainer">\n        <ion-list class="eventHeader" (click)="eventDetails()">\n          <ion-item>\n            <p class="EventTitle">Event Title Event Title Event Title Event Title</p>\n            <p class="EventUser">Mrinmay Biswas Mrinmay Biswas Mrinmay Biswas </p>\n            <p>11 Nov at 6:30am - 11 Nov at 6:30am</p>\n            <p>Kolkata</p>\n\n            <div class="post_action" (tap)="editevent()">\n              <ion-icon name="settings"></ion-icon>\n            </div>\n          </ion-item>\n        </ion-list>\n\n        <ion-list class="EventBody">\n          <ion-item>\n            <img src="http://www.creoyou.com/uploads/profileImages/img_0234.jpg-1510033042.jpg" alt="Post Img" />\n            <div class="EventDetails">\n              Hello everyone. what\'s going on Hello everyone. what\'s going on Hello everyone. what\'s going on\n            </div>\n\n            <div class="EventDate">\n              <span>19</span>\n              November\n            </div>\n          </ion-item>\n        </ion-list>\n\n        <ion-row class="post_activity">\n          <ion-col col-4 class="active">\n            <ion-icon ios="ios-heart" md="md-heart"></ion-icon>\n            <span>10</span>\n          </ion-col>\n          <ion-col col-4>\n            <ion-icon ios="ios-text" md="md-text"></ion-icon>\n            <span>5</span>\n          </ion-col>\n          <ion-col col-4>\n            <ion-icon ios="ios-share" md="md-share"></ion-icon>\n            <span>8</span>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row> -->\n\n\n  </ion-grid>\n\n\n\n  <ion-fab bottom right>\n    <button (click)="createEvent()" ion-fab color="primary">\n      <ion-icon name="create"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventlist\eventlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], EventlistPage);

//# sourceMappingURL=eventlist.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventscalenderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the EventscalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventscalenderPage = (function () {
    function EventscalenderPage(alertCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.eventSource = [];
        this.selectedDay = new Date();
        this.calendar = {
            mode: 'month',
            currentDate: this.selectedDay
        };
        /* this.eventdetails = this.navParams.get('eventcaldetails');
        this.eventtitle = this.eventdetails[0].name;
        this.eventStartdate = this.eventdetails[0].start_date_time;
        this.eventEnddate = this.eventdetails[0].end_date_time;
        console.log(this.eventtitle); */
    }
    EventscalenderPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    EventscalenderPage.prototype.onEventSelected = function (event) {
        /*  let start = moment(event.startTime).format('LLLL');
         let end = moment(event.endTime).format('LLLL');
     
         let alert = this.alertCtrl.create({
           title: '' + event.title,
           subTitle: 'From: ' + start + '<br>To: ' + end,
           buttons: ['OK']
         })
         alert.present(); */
    };
    EventscalenderPage.prototype.onTimeSelected = function (ev) {
        this.selectedDay = ev.selectedTime;
    };
    /* today() {
      this.calendar.currentDate = new Date();
    } */
    EventscalenderPage.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    EventscalenderPage.prototype.loadEvents = function () {
        this.eventSource = this.createRandomEvents();
    };
    EventscalenderPage.prototype.createRandomEvents = function () {
        var events = [];
        var startTime;
        var endTime;
        this.eventdetails = this.navParams.get('eventcaldetails');
        for (var i = 0; i < this.eventdetails.length; i++) {
            this.eventtitle = this.eventdetails[i].name;
            startTime = new Date(this.eventdetails[i].start_date_time);
            endTime = new Date(this.eventdetails[i].end_date_time);
            events.push({
                title: this.eventtitle,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
        console.log(events);
        return events;
    };
    EventscalenderPage.prototype.ionViewDidLoad = function () {
        this.loadEvents();
        console.log('ionViewDidLoad EventscalenderPage');
    };
    return EventscalenderPage;
}());
EventscalenderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-eventscalender',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventscalender\eventscalender.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Event Calendar</ion-title>\n    <ion-buttons end>\n      <!-- <button ion-button [disabled]="isToday" (click)="today()">Today</button> -->\n      <!-- <button ion-button (click)="changeMode(\'month\')">M</button>\n      <button ion-button (click)="changeMode(\'week\')">W</button> -->\n      <!-- <button ion-button (click)="changeMode(\'day\')">D</button> -->\n      <!--  <button ion-button (click)="loadEvents()">Load Events</button> -->\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="has-header" padding>\n\n  <h1>{{viewTitle}}</h1>\n\n  <calendar [eventSource]="eventSource" [calendarMode]="calendar.mode" [currentDate]="calendar.currentDate" (onEventSelected)="onEventSelected($event)"\n    (onTitleChanged)="onViewTitleChanged($event)" (onTimeSelected)="onTimeSelected($event)" step="30" class="calendar">\n  </calendar>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\eventscalender\eventscalender.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], EventscalenderPage);

//# sourceMappingURL=eventscalender.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FeedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FeedsPage = (function () {
    function FeedsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    FeedsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedsPage');
    };
    return FeedsPage;
}());
FeedsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-feeds',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\feeds\feeds.html"*/'<!--\n  Generated template for the FeedsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>feeds</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\feeds\feeds.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], FeedsPage);

//# sourceMappingURL=feeds.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobapplyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_chooser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the JobapplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JobapplyPage = (function () {
    function JobapplyPage(remotService, transfer, fileChooser, viewCtrl, navCtrl, navParams) {
        this.remotService = remotService;
        this.transfer = transfer;
        this.fileChooser = fileChooser;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.API_URL = 'http://dev.mojolynclife.info/public/index.php/api';
        this.jobs = navParams.get('jobid');
        this.base_url = this.remotService.site_url;
        this.jobid = this.jobs;
        this.user_id = window.localStorage['userid'];
        this.token = window.localStorage['token'];
        console.log(this.jobid);
    }
    JobapplyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad JobapplyPage');
    };
    JobapplyPage.prototype.chooseCV = function () {
        var _this = this;
        this.fileChooser.open().then(function (uri) {
            _this.choseuri = uri;
            _this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
            _this.currentName = _this.currentName.replace(/%20/g, '_');
            _this.currentName = _this.currentName.replace(/%/g, '_');
            console.log(_this.currentName);
        }, function () {
            console.log('error');
        });
    };
    JobapplyPage.prototype.applypremiumjob = function () {
        var _this = this;
        this.fileTransfer = this.transfer.create();
        var options = {
            fileKey: "cvfile",
            fileName: this.currentName,
            httpMethod: "POST",
            chunkedMode: false,
            mimeType: "application/pdf",
            headers: {},
            params: { 'user_id': this.user_id, 'token': this.token, 'job_id': this.jobid }
        };
        this.remotService.presentLoading('wait ...');
        console.log(options);
        //console.log(this.videotitle, this.videoprvcy, this.videodesc);
        var url = this.API_URL + "/applyCvJob";
        console.log(this.choseuri);
        this.fileTransfer.upload(this.choseuri, url, options)
            .then(function (data) {
            _this.remotService.dismissLoader();
            _this.viewCtrl.dismiss({ 'success': 1 });
            console.log(data);
        }, function (err) {
            console.log('error');
            _this.remotService.presentToast('Error saving file.');
            _this.remotService.dismissLoader();
        });
    };
    JobapplyPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ 'success': 0 });
    };
    return JobapplyPage;
}());
JobapplyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-jobapply',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\jobapply\jobapply.html"*/'<!--\n  Generated template for the JobapplyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Apply Job</ion-title>\n    <ion-buttons end>\n      <button class="dismiss" (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n\n  <div class="Cv_title">\n    <h2>Upload your Resume</h2>\n    <p>Uploading a resume while applying for a job usually have an edeg over the other applicants </p>\n  </div>\n  <button class="uploadImage" (click)="chooseCV()">\n    Upload CV\n    <ion-icon name="cloud-upload"></ion-icon>\n  </button>\n  <p class="video_name">\n    {{currentName}}\n  </p>\n</ion-content>\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <a class="sign-up button button-block button-stable" (click)="applypremiumjob()">Apply</a>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\jobapply\jobapply.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], JobapplyPage);

//# sourceMappingURL=jobapply.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_jobdetails_jobdetails__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otherprofile_otherprofile__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var JobsPage = (function () {
    function JobsPage(navCtrl, navParams, events, remotService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.remotService = remotService;
        this.jobPageOffset = 0;
        this.addPageOffset = 0;
        this.jobsData = [];
        this.addsData = [];
        this.date = new Date();
        this.base_url = this.remotService.site_url;
        var jobsFetchparams = {
            user_id: window.localStorage['userid'],
            jobStartingLimit: this.jobPageOffset,
            adJobStartingLimit: this.addPageOffset,
            token: window.localStorage['token']
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(jobsFetchparams, 'allJobs').subscribe(function (response) {
            console.log(response);
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var responsejobsData = response.data.allJobs;
                responsejobsData.forEach(function (item, key, index) {
                    var date1 = item.updation_date;
                    var date2 = _this.date;
                    var diffInMs = Date.parse(date2) - Date.parse(date1);
                    var diffmin = Math.floor(diffInMs / 1000 / 60);
                    var diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);
                    var diffIndays = Math.floor(diffInMs / 1000 / 60 / 60 / 24);
                    item.minute = diffmin;
                    item.hour = diffInHours;
                    item.days = diffIndays;
                    _this.jobsData.push(item);
                });
                var responseaddsData = response.data.adJobs;
                responseaddsData.forEach(function (item, key, index) {
                    var date1 = item.updation_date;
                    var date2 = _this.date;
                    var diffInMs = Date.parse(date2) - Date.parse(date1);
                    var diffmin = Math.floor(diffInMs / 1000 / 60);
                    var diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);
                    var diffIndays = Math.floor(diffInMs / 1000 / 60 / 60 / 24);
                    item.minute = diffmin;
                    item.hour = diffInHours;
                    item.days = diffIndays;
                    _this.addsData.push(item);
                    // console.log(this.addsData);
                });
            }
            else {
                _this.remotService.presentToast('Error loading data.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    }
    JobsPage.prototype.jobdetails = function (job) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_jobdetails_jobdetails__["a" /* JobdetailsPage */], { jobsparam: job });
    };
    JobsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad JobsPage');
    };
    JobsPage.prototype.fetchjobsData = function (infiniteScroll) {
        var _this = this;
        this.jobPageOffset = this.jobPageOffset + 4;
        this.addPageOffset = this.addPageOffset + 1;
        var jobsFetchparams = {
            user_id: window.localStorage['userid'],
            jobStartingLimit: this.jobPageOffset,
            adJobStartingLimit: this.addPageOffset,
            token: window.localStorage['token']
        };
        this.remotService.postData(jobsFetchparams, 'allJobs').subscribe(function (response) {
            infiniteScroll.complete();
            if (response.success == 1) {
                var responsejobsData = response.data.allJobs;
                responsejobsData.forEach(function (item, key, index) {
                    _this.jobsData.push(item);
                });
                var responseaddsData = response.data.adJobs;
                responseaddsData.forEach(function (item, key, index) {
                    _this.addsData.push(item);
                });
            }
            else {
                _this.remotService.presentToast('Error loading data.');
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    JobsPage.prototype.OtherProfile = function (job) {
        var data = {
            user_id: job.created_by
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otherprofile_otherprofile__["a" /* OtherprofilePage */], { 'otheruserfrofiledata': data });
    };
    return JobsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], JobsPage.prototype, "navBar", void 0);
JobsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-jobs',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\jobs\jobs.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>All Jobs</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <ion-list class="individual">\n\n        <ion-item *ngFor="let job of jobsData" padding-horizontal class="search_user search_user_individual">\n            <ion-avatar item-left (click)="jobdetails(job)">\n                <img *ngIf="job.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{job.image}}">\n                <img *ngIf="job.image==\'\'" src="assets/img/company.png">\n            </ion-avatar>\n            <ion-item class="searcsh_right">\n                <p class="Company_name" (click)="OtherProfile(job)">{{job.posted_by}}</p>\n                <div (click)="jobdetails(job)">\n                    <p>\n                        <ion-icon name="briefcase"></ion-icon> {{job.job_title}} </p>\n                    <p class="user_deg">Required Experience : {{job.required_experience}} </p>\n                    <p class="user_deg">{{job.city}}, {{job.state}}, {{job.country}}</p>\n                    <p class="user_deg" *ngIf="job.minute<60">{{job.minute }} Minute ago | {{job.name}}</p>\n                    <p class="user_deg" *ngIf="job.hour<24">{{job.hour}} hours ago | {{job.name}}</p>\n                    <p class="user_deg" *ngIf="job.hour>24">{{job.days}} Days ago | {{job.name}}</p>\n                </div>\n            </ion-item>\n        </ion-item>\n\n        <ion-item *ngFor="let additem of addsData" padding-horizontal class="search_user search_user_individual job_add">\n            <ion-avatar item-left>\n                <img *ngIf="additem.image!=\'\'" src="http://creoyou.net/uploads/profileImages/{{additem.image}}">\n                <img *ngIf="additem.image==\'\'" src="assets/img/ad.png">\n            </ion-avatar>\n            <ion-item class="searcsh_right">\n                <p>\n                    <ion-icon name="briefcase"></ion-icon> {{additem.job_title}} </p>\n                <p class="Company_name"> {{additem.posted_by}} </p>\n                <p class="user_deg">Required Experience : {{additem.required_experience}}</p>\n                <p class="user_deg">{{additem.city}}, {{additem.state}}, {{additem.country}}</p>\n                <p class="user_deg" *ngIf="additem.minute<60">{{additem.minute }} Minute ago | {{additem.name}}</p>\n                <p class="user_deg" *ngIf="additem.hour<24">{{additem.hour}} hours ago | {{additem.name}}</p>\n                <p class="user_deg" *ngIf="additem.hour>24">{{additem.days}} Days ago | {{additem.name}}</p>\n\n                <div class="user_action" item-right>\n                    <img src="assets/img/add.png" alt="Image" />\n                </div>\n            </ion-item>\n        </ion-item>\n\n\n    </ion-list>\n\n\n    <!-- <ion-list>\n            <ion-item class="no_result">\n                 <h3> Sorry No Job Found... </h3> \n            </ion-item>\n          </ion-list> -->\n    <ion-infinite-scroll (ionInfinite)="fetchjobsData($event)">\n        <ion-infinite-scroll-content loadingSpinner="bubbles">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\jobs\jobs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], JobsPage);

//# sourceMappingURL=jobs.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginhelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_reg_validator_reg_validator__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginhelpPage = (function () {
    function LoginhelpPage(navCtrl, navParams, regValidator, remotService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.regValidator = regValidator;
        this.remotService = remotService;
        this.viewStep = 1;
        this.password = '';
        this.confirmpassword = '';
        this.countryCode = regValidator.countryCodes;
        this.recover = 'email';
        this.mobilecode = '+91';
        this.helptype = 'username';
        this.otpnumber = 'initialotptouse';
        this.viewStep = 1;
    }
    LoginhelpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginhelpPage');
    };
    LoginhelpPage.prototype.recoverNow = function () {
        var _this = this;
        var mobile_code = '';
        var value = '';
        if (this.recover == 'email') {
            var reeml = /\S+@\S+\.\S+/;
            if (!reeml.test(this.emailid)) {
                this.remotService.presentToast('Enter a valid email.');
                return false;
            }
            this.optsenttype = this.emailid;
            value = this.emailid;
        }
        else {
            var phoneno = /^\d{10}$/;
            if (!phoneno.test(this.mobileno)) {
                this.remotService.presentToast('Enter a valid phone number.');
                return false;
            }
            mobile_code = this.mobilecode;
            this.optsenttype = this.mobileno;
            value = this.mobileno;
        }
        var DataToSend = {
            type: this.helptype,
            mobile_code: mobile_code,
            value: value
        };
        this.remotService.presentLoading("Please wait ...");
        this.remotService.postData(DataToSend, 'userHelp').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.viewStep = 3;
                _this.otpnumber = response.data.OTP;
                _this.myusername = response.data.username;
            }
            else {
                if (_this.recover == 'email')
                    _this.remotService.presentToast('Email you entered does not exist.');
                else
                    _this.remotService.presentToast('Your Mobile no Is Not Registered With Us.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
        // console.log(DataToSend);
    };
    LoginhelpPage.prototype.verifyOtp = function () {
        if (this.inputotp == this.otpnumber) {
            this.viewStep = 4;
        }
        else {
            this.remotService.presentToast('You entered a invalid otp number.');
        }
    };
    LoginhelpPage.prototype.resetPassword = function () {
        var _this = this;
        var regxpass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
        if (this.password == '' || !this.password.match(regxpass)) {
            this.remotService.presentToast('Passwords must have a lowercase letter and uppercase letter and a number and between 8 to 20 char.');
            return false;
        }
        if (this.password != this.confirmpassword) {
            this.remotService.presentToast('Password and confirm password should be same.');
            return false;
        }
        this.paramObj = {
            password: this.password,
            mobile: this.mobileno,
        };
        var url = 'HelpUsingPassword';
        if (this.recover == 'email') {
            this.paramObj = {
                'password': this.password,
                'email': this.emailid
            };
            var url = 'EmailHelpUsingPassword';
        }
        this.remotService.presentLoading("Please wait ...");
        this.remotService.postData(this.paramObj, url).subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.remotService.presentToast('Password changed successfully');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            }
            else {
                _this.remotService.presentToast('Error resetting your password!');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error resetting your password!');
        });
    };
    return LoginhelpPage;
}());
LoginhelpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-loginhelp',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\loginhelp\loginhelp.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Login Help</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="content-background">\n\n  <ion-row radio-group *ngIf="viewStep==1">\n    <ion-col class="loginhelp_stepone" col-12 text-center>\n      <h1>Need Help with?</h1>\n\n      <ion-list radio-group [(ngModel)]="helptype">\n\n        <ion-item>\n          <ion-label>Username</ion-label>\n          <ion-radio value="username"></ion-radio>\n        </ion-item>\n        <ion-item>\n          <ion-label>Password</ion-label>\n          <ion-radio value="password"></ion-radio>\n        </ion-item>\n\n      </ion-list>\n    </ion-col>\n  </ion-row>\n\n\n\n\n  <div class="loginhelp_steptwo" *ngIf="viewStep==2">\n\n    <h1>Recover Using</h1>\n\n    <ion-segment [(ngModel)]="recover">\n      <ion-segment-button value="email">\n        Email\n      </ion-segment-button>\n      <ion-segment-button value="mobile_no">\n        Phone\n      </ion-segment-button>\n    </ion-segment>\n\n    <div [ngSwitch]="recover" padding>\n\n      <div *ngSwitchCase="\'email\'">\n\n        <ion-input class="input-fld" [(ngModel)]="emailid" placeholder="Email Id"></ion-input>\n\n      </div>\n      <div *ngSwitchCase="\'mobile_no\'">\n\n        <ion-row>\n          <ion-col col-3>\n            <ion-select [(ngModel)]="mobilecode" multiple="false" class="mobile-code">\n              <ion-option value="{{item.dial_code}}" *ngFor="let item of countryCode">{{item.dial_code}}</ion-option>\n            </ion-select>\n          </ion-col>\n          <ion-col col-9>\n            <ion-input [(ngModel)]="mobileno" placeholder="Phone Number" type="number" class="input-fld extra-pad"></ion-input>\n          </ion-col>\n        </ion-row>\n        <!-- <ion-input placeholder="Mobile Number"></ion-input> -->\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="loginhelp_stepthree" *ngIf="viewStep==3">\n    <ion-grid>\n    <ion-row class="login-box">\n\n      <ion-col col-12 text-center>\n        <span class="accepted_icon">\n          <img src="assets/img/accepeted_icon.png" class="app_logo">\n        </span>\n      </ion-col>\n\n      <ion-col col-12 text-center>\n\n        <span class="V_code">We Have Sent A Verification Code To\n          <br> {{optsenttype}}\n        </span>\n      </ion-col>\n\n\n      <ion-col col-12>\n        <ion-input [(ngModel)]="inputotp" placeholder="Enter Confirmation Code Here" type="number" class="input-fld"></ion-input>\n\n\n      </ion-col>\n      <!--                \n                <ion-col col-12 text-center>\n                     <button class="next_stape" (click)="verifyOtp()" >Next</button>\n                </ion-col> -->\n      <ion-col col-12 text-center>\n        <a class="tab-item tab-item-active" (click)="recoverNow()">Resend Code</a>\n      </ion-col>\n\n\n    </ion-row>\n  </ion-grid>\n\n  </div>\n\n\n  <div class="loginhelp_stepthree" *ngIf="viewStep==4">\n   <ion-grid>\n    <ion-row class="login-box">\n\n      <ion-col col-12 text-center>\n        <span class="accepted_icon">\n          <img src="assets/img/accepeted_icon.png" class="app_logo">\n        </span>\n      </ion-col>\n\n      <ion-col *ngIf="helptype==\'username\'" col-12 text-center>\n\n        <span class="V_code">Your Username is {{myusername}}\n        </span>\n      </ion-col>\n\n\n      <ion-col *ngIf="helptype==\'password\'" col-12 text-center>\n        <span class="V_code">Reset your Password</span>\n      </ion-col>\n\n      <ion-col *ngIf="helptype==\'password\'" col-12 text-center>\n      \n        <ion-input class="input-fld" type="password" placeholder="Enter Password" [(ngModel)]="password" required></ion-input>\n        <ion-input class="input-fld" type="password" placeholder="Re-Enter Password" [(ngModel)]="confirmpassword" required></ion-input>\n        \n      </ion-col>\n    </ion-row>\n   </ion-grid>\n\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <p *ngIf="viewStep==1" (click)="viewStep=2" text-center class="next_stape">\n    <ion-icon name="checkmark"></ion-icon> Next\n  </p>\n  <p *ngIf="viewStep==2" (click)="recoverNow();" text-center class="next_stape">\n    <ion-icon name="checkmark"></ion-icon> Next\n  </p>\n  <p *ngIf="viewStep==3" (click)="verifyOtp();" text-center class="next_stape">\n    <ion-icon name="checkmark"></ion-icon> Next\n  </p>\n  <p *ngIf="viewStep==4" (click)="resetPassword();" text-center class="next_stape">\n      <ion-icon name="checkmark"></ion-icon> Save\n    </p>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\loginhelp\loginhelp.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_reg_validator_reg_validator__["a" /* RegValidatorProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], LoginhelpPage);

//# sourceMappingURL=loginhelp.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, navParams, events, remotService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.remotService = remotService;
        this.notiPageOffset = 0;
        this.notiData = [];
        this.base_url = this.remotService.site_url;
        this.initDataLoad();
    }
    NotificationsPage.prototype.initDataLoad = function () {
        var _this = this;
        var notiparams = {
            startinglimit: this.notiPageOffset,
            token: window.localStorage['token']
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(notiparams, 'notificationDetails').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var resData = response.data.userNotification;
                if (resData != null) {
                    resData.forEach(function (item, key, index) {
                        _this.notiData.push(item);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    NotificationsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad NotificationsPage');
    };
    NotificationsPage.prototype.fetchNotificationdata = function (infiniteScroll) {
        var _this = this;
        this.notiPageOffset = this.notiPageOffset + 15;
        var notiparams = {
            startinglimit: this.notiPageOffset,
            token: window.localStorage['token']
        };
        this.remotService.postData(notiparams, 'notificationDetails').subscribe(function (response) {
            infiniteScroll.complete();
            if (response.success == 1) {
                var resData = response.data.userNotification;
                if (resData != null) {
                    resData.forEach(function (item, key, index) {
                        _this.notiData.push(item);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    return NotificationsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], NotificationsPage.prototype, "navBar", void 0);
NotificationsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-notifications',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\notifications\notifications.html"*/'\n<ion-header class="creoyou-header">\n  \n    <ion-navbar>\n      <ion-title>Notification</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content>\n  \n    <ion-list>\n  \n      <ion-item *ngFor="let notifications of notiData;" class="unread">\n          <ion-avatar class="person-pic" item-left>\n              <img *ngIf="notifications.image!=\'\'" src="{{base_url}}uploads/profileImages/{{notifications.image}}">\n              <img *ngIf="notifications.image==\'\'" src="assets/img/company.png">\n          </ion-avatar>\n          <ion-item class="notification_details">\n            <span>{{notifications.text}}</span>\n            <p><ion-icon ios="ios-time" md="md-time"> {{notifications.updation_date| amTimeAgo}}</ion-icon></p>\n          </ion-item>\n      </ion-item>\n  \n  \n    </ion-list>\n  \n    \n     <ion-infinite-scroll  (ionInfinite)="fetchNotificationdata($event)">\n        <ion-infinite-scroll-content loadingSpinner="bubbles">\n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n  </ion-content>\n  '/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\notifications\notifications.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], NotificationsPage);

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
/**
 * Generated class for the NotificationsettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationsettingsPage = (function () {
    function NotificationsettingsPage(remotService, events, navCtrl, navParams) {
        this.remotService = remotService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getnotificationDetails();
    }
    NotificationsettingsPage.prototype.getnotificationDetails = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'notificationSettingDetails').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                if (response.data[0].can_sent_friend_request_any == 1) {
                    _this.autoManufacturers = 1;
                }
                else {
                    _this.autoManufacturers = 2;
                }
                if (response.data[0].friend_requests == 1) {
                    _this.request = true;
                    _this.requests = 1;
                }
                else {
                    _this.requests = 0;
                }
                if (response.data[0].event_invites == 1) {
                    _this.invite = true;
                    _this.eventinvites = 1;
                }
                else {
                    _this.eventinvites = 0;
                }
                if (response.data[0].likes == 1) {
                    _this.like = true;
                    _this.likes = 1;
                }
                else {
                    _this.likes = 0;
                }
                if (response.data[0].comments == 1) {
                    _this.comment = true;
                    _this.comments = 1;
                }
                else {
                    _this.comments = 0;
                }
                if (response.data[0].messages == 1) {
                    _this.message = true;
                    _this.messages = 1;
                }
                else {
                    _this.messages = 0;
                }
                console.log(response.data);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    NotificationsettingsPage.prototype.select2 = function () {
        var _this = this;
        this.DataToSendFrnd = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            can_sent_friend_request_any: 0,
            can_sent_friend_request_by_mobile: 1
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(this.DataToSendFrnd, 'requestCheck').subscribe(function (response) {
            _this.remotService.dismissLoader();
            console.log(response);
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting data');
        });
    };
    NotificationsettingsPage.prototype.select = function () {
        var _this = this;
        this.DataToSendFrnd = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            can_sent_friend_request_any: 1,
            can_sent_friend_request_by_mobile: 0
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(this.DataToSendFrnd, 'requestCheck').subscribe(function (response) {
            _this.remotService.dismissLoader();
            console.log(response);
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting data');
        });
    };
    NotificationsettingsPage.prototype.Change_Togglerequest = function (request, comment, like, message, invite) {
        var _this = this;
        if (request == true) {
            this.requests = 1;
        }
        else if (request == false) {
            this.requests = 0;
        }
        if (comment == true) {
            this.comments = 1;
        }
        else if (comment == false) {
            this.comments = 0;
        }
        if (like == true) {
            this.likes = 1;
        }
        else if (like == false) {
            this.likes = 0;
        }
        if (message == true) {
            this.messages = 1;
        }
        else if (message == false) {
            this.messages = 0;
        }
        if (invite == true) {
            this.eventinvites = 1;
        }
        else if (invite == false) {
            this.eventinvites = 0;
        }
        var DataToSend = {
            user_id: window.localStorage['userid'],
            comments: this.comments,
            event_invites: this.eventinvites,
            friend_requests: this.requests,
            likes: this.likes,
            messages: this.messages,
            token: window.localStorage['token']
        };
        console.log(DataToSend);
        // this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'notificationSettings').subscribe(function (response) {
            // this.remotService.dismissLoader();
            console.log(response);
        }, function () {
            // this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting data');
        });
    };
    NotificationsettingsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad NotificationsettingsPage');
    };
    return NotificationsettingsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]) === "function" && _a || Object)
], NotificationsettingsPage.prototype, "navBar", void 0);
NotificationsettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-notificationsettings',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\notificationsettings\notificationsettings.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Notification Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list radio-group [(ngModel)]="autoManufacturers">\n\n    <ion-list-header>\n      <ion-icon name="contacts"></ion-icon> Who can send me friend request\n    </ion-list-header>\n\n    <ion-item>\n      <ion-label>Any One</ion-label>\n      <ion-radio value="1" (ionSelect)="select(item)"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Who know my mobile no</ion-label>\n      <ion-radio value="2" (ionSelect)="select2(item)"></ion-radio>\n    </ion-item>\n\n\n  </ion-list>\n\n\n  <ion-list>\n\n    <ion-list-header>\n      <ion-icon name="notifications-outline"></ion-icon> My Notification\n    </ion-list-header>\n\n    <ion-item>\n      <ion-label>Friend request </ion-label>\n      <!--  <ion-toggle [(ngModel)]="onoff" (ionChange)="Change_Toggle(onoff);" [checked]="isToggled"></ion-toggle> -->\n      <ion-toggle color="secondary" [(ngModel)]="request" (ionChange)="Change_Togglerequest(request,comment,like,message,invite);"\n        [checked]="request"></ion-toggle>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Comment</ion-label>\n      <ion-toggle color="secondary" [(ngModel)]="comment" (ionChange)="Change_Togglerequest(request,comment,like,message,invite);"\n        [checked]="comment"></ion-toggle>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Like</ion-label>\n      <ion-toggle color="secondary" [(ngModel)]="like" (ionChange)="Change_Togglerequest(request,comment,like,message,invite);"\n        [checked]="like"></ion-toggle>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Message</ion-label>\n      <ion-toggle color="secondary" [(ngModel)]="message" (ionChange)="Change_Togglerequest(request,comment,like,message,invite);"\n        [checked]="message"></ion-toggle>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Event invite</ion-label>\n      <ion-toggle color="secondary" [(ngModel)]="invite" (ionChange)="Change_Togglerequest(request,comment,like,message,invite);"\n        [checked]="invite"></ion-toggle>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\notificationsettings\notificationsettings.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _e || Object])
], NotificationsettingsPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=notificationsettings.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParsonaleditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_reg_validator_reg_validator__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ParsonaleditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ParsonaleditPage = (function () {
    function ParsonaleditPage(alertCtrl, regValidator, formBuilder, navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl) {
        this.alertCtrl = alertCtrl;
        this.regValidator = regValidator;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.base_url = this.remotService.site_url;
        this.editsection = navParams.get('editsection');
        this.editparam = navParams.get('editparam');
        if (this.editsection == 'name') {
            this.username = this.editparam.username;
        }
        else if (this.editsection == 'email') {
            this.email = this.editparam.email;
        }
        else if (this.editsection == 'mobile') {
            this.mobile = this.editparam.mobile_no;
        }
        else if (this.editsection == 'changepass') {
            this.changepass = this.editparam.website_url;
        }
        this.FormRegistrationStepTwo = formBuilder.group({
            mobileno: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(15)]),
                regValidator.checkuniquevalueoffield('mobile_no', 1)
            ],
            mobilecode: ['+91', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required])],
        });
        this.FormRegistrationStepThree = formBuilder.group({
            oldpass: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*()_+-\|=;:”,.?]).{8,20})')
                ])],
            confirmpassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, regValidator.equalto("password")])]
        });
        this.FormRegistrationStepOne = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required, regValidator.mailFormat()]), regValidator.checkuniquevalueoffield('email', 1).bind(regValidator)]
        });
        this.FormRegistrationStepFour = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern('^$|^[A-Za-z0-9]+'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required]), regValidator.checkuniquevalueoffield('username', 1).bind(regValidator)]
        });
        this.countryCode = regValidator.countryCodes;
    }
    ParsonaleditPage.prototype.setConfirmPasswordBlank = function () {
        this.FormRegistrationStepThree.get('confirmpassword').setValue('');
    };
    ParsonaleditPage.prototype.updateDetails = function () {
        var _this = this;
        if (this.FormRegistrationStepFour.valid) {
            this.username;
            this.email;
            this.mobile;
            var DataToSend = {
                user_id: window.localStorage['userid'],
                token: window.localStorage['token'],
                type: 'username',
                username: this.username,
                email: '',
                mobile_code: '',
                mobile: '',
            };
            this.remotService.presentLoading("Wait ...");
            this.remotService.postData(DataToSend, 'changeInfo').subscribe(function (response) {
                _this.remotService.dismissLoader();
                _this.navParams.get("parentPage").initviewpersonaldata();
                _this.remotService.presentToast(response.message);
                _this.navCtrl.pop();
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
    };
    ParsonaleditPage.prototype.updateemail = function () {
        var _this = this;
        if (this.FormRegistrationStepOne.valid) {
            var DataToSend = {
                user_id: window.localStorage['userid'],
                token: window.localStorage['token'],
                type: 'email',
                username: '',
                email: this.email,
                mobile_code: '',
                mobile: '',
            };
            this.remotService.presentLoading("Wait ...");
            this.remotService.postData(DataToSend, 'changeInfo').subscribe(function (response) {
                if (response.success == 1) {
                    _this.remotService.dismissLoader();
                    _this.navParams.get("parentPage").initviewpersonaldata();
                    _this.remotService.presentToast(response.message);
                    _this.navCtrl.pop();
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
    };
    ParsonaleditPage.prototype.changemobilenumber = function (stepTwovalue) {
        var _this = this;
        if (this.FormRegistrationStepTwo.valid) {
            var mobileno = this.FormRegistrationStepTwo.value.mobileno;
            var mcode = this.FormRegistrationStepTwo.value.mobilecode;
            //console.log(this.FormRegistrationStepTwo.value);
            var DataToSend = {
                user_id: window.localStorage['userid'],
                token: window.localStorage['token'],
                type: 'mobile',
                username: '',
                email: '',
                mobile_code: mcode,
                mobile: mobileno,
            };
            this.remotService.presentLoading("Wait ...");
            this.remotService.postData(DataToSend, 'changeInfo').subscribe(function (response) {
                if (response.success == 1) {
                    _this.remotService.dismissLoader();
                    _this.navParams.get("parentPage").initviewpersonaldata();
                    _this.remotService.presentToast(response.message);
                    _this.navCtrl.pop();
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
    };
    ParsonaleditPage.prototype.Changepassword = function () {
        var _this = this;
        if (this.FormRegistrationStepThree.valid) {
            var DataToSend = {
                user_id: window.localStorage['userid'],
                newPassword: this.password,
                password: this.oldpass,
                token: window.localStorage['token']
            };
            this.oldpass;
            this.password;
            this.confirmpassword;
            console.log(DataToSend);
            this.remotService.presentLoading("Wait ...");
            this.remotService.postData(DataToSend, 'changePassword').subscribe(function (response) {
                console.log(response);
                if (response.success == 1) {
                    _this.remotService.dismissLoader();
                    _this.remotService.presentToast(response.message);
                    _this.navCtrl.pop();
                }
                else {
                    _this.remotService.dismissLoader();
                    _this.remotService.presentToast(response.message);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
    };
    ParsonaleditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParsonaleditPage');
    };
    return ParsonaleditPage;
}());
ParsonaleditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-parsonaledit',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\parsonaledit\parsonaledit.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title *ngIf="editsection==\'name\'">Change Name</ion-title>\n    <ion-title *ngIf="editsection==\'email\'">Change Email</ion-title>\n    <ion-title *ngIf="editsection==\'mobile\'">Change Mobile No</ion-title>\n    <ion-title *ngIf="editsection==\'changepass\'">Change Password</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="content-background">\n\n  <ion-list *ngIf="editsection==\'name\'">\n    <form [formGroup]="FormRegistrationStepFour">\n      <ion-item class="edit_item">\n        <ion-label color="default" floating>Change Name</ion-label>\n        <ion-input [(ngModel)]="username" formControlName="username" required></ion-input>\n      </ion-item>\n      <span class="error" *ngIf="FormRegistrationStepFour.get(\'username\').hasError(\'pattern\') && (FormRegistrationStepFour.get(\'username\').touched)">\n        Only characters and numbers allowed\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepFour.get(\'username\').hasError(\'required\') && (FormRegistrationStepFour.get(\'username\').touched)">\n        Username is required\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepFour.get(\'username\').hasError(\'Inuse\') && (FormRegistrationStepFour.get(\'username\').touched)">\n        Username is already taken\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepFour.get(\'username\').hasError(\'minlength\') && (FormRegistrationStepFour.get(\'username\').touched)">\n        Minimum of 4 characters\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepFour.get(\'username\').hasError(\'maxlength\') && (FormRegistrationStepFour.get(\'username\').touched)">\n        Maximum of 50 characters\n      </span>\n      <span *ngIf="FormRegistrationStepFour.controls.username.pending">\n        <ion-spinner name="bubbles"></ion-spinner>.\n      </span>\n    </form>\n  </ion-list>\n\n  <ion-list *ngIf="editsection==\'email\'">\n    <form [formGroup]="FormRegistrationStepOne">\n      <ion-item class="edit_item">\n        <ion-label color="default" floating>Change Email</ion-label>\n        <ion-input [(ngModel)]="email" formControlName="email" required></ion-input>\n      </ion-item>\n      <span *ngIf="FormRegistrationStepOne.controls.email.pending && (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n        <ion-spinner name="bubbles"></ion-spinner>\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepOne.get(\'email\').hasError(\'required\') && (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n        Email is required\n      </span>\n      <span class="error" *ngIf="(FormRegistrationStepOne.get(\'email\').hasError(\'incorrectMailFormat\') && !FormRegistrationStepOne.get(\'email\').hasError(\'required\'))\n   && (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n        Email address is invalid.\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepOne.get(\'email\').hasError(\'Inuse\') && \n  (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n        Email is already in use\n      </span>\n    </form>\n  </ion-list>\n\n  <ion-list *ngIf="editsection==\'mobile\'">\n    <form [formGroup]="FormRegistrationStepTwo" (ngSubmit)="changemobilenumber(FormRegistrationStepTwo.value)">\n      <ion-item class="edit_item">\n        <ion-toolbar color="default">Change Mobile Number</ion-toolbar>\n        <ion-select item-left formControlName="mobilecode" multiple="false" class="mobile-code">\n          <ion-option value="{{item.dial_code}}" *ngFor="let item of countryCode">{{item.dial_code}}</ion-option>\n        </ion-select>\n        <ion-input [(ngModel)]="mobile" formControlName="mobileno" required></ion-input>\n      </ion-item>\n      <span *ngIf="FormRegistrationStepTwo.controls.mobileno.pending">\n        <ion-spinner name="bubbles"></ion-spinner>\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'pattern\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n        Mobile numberr should be only numbers\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n        Mobile no is required\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobilecode\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n        Mobile code is required\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'Inuse\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n        Mobile no is already taken\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'minlength\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n        Minimum of 4 characters\n      </span>\n      <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'maxlength\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n        Maximum of 15 characters\n      </span>\n    </form>\n\n  </ion-list>\n\n  <ion-list class="Change_password" *ngIf="editsection==\'changepass\'">\n    <form [formGroup]="FormRegistrationStepThree">\n      <ion-item class="edit_item">\n        <ion-label color="default" floating>Current Password</ion-label>\n        <ion-input type="password" [(ngModel)]="oldpass" formControlName="oldpass" required></ion-input>\n      </ion-item>\n      <ion-item class="edit_item">\n        <ion-label color="default" floating>New Password</ion-label>\n        <ion-input type="password" (keyup)="setConfirmPasswordBlank()" [(ngModel)]="password" formControlName="password" required></ion-input>\n      </ion-item>\n\n      <span class="error" *ngIf="FormRegistrationStepThree.get(\'password\').hasError(\'required\') && (FormRegistrationStepThree.get(\'password\').touched)">\n        Password is required\n      </span>\n\n      <span class="error" *ngIf="FormRegistrationStepThree.get(\'password\').hasError(\'pattern\')  && (FormRegistrationStepThree.get(\'password\').touched)">\n        <p>Passwords must have a lowercase letter and uppercase letter and a number and between 8 to 20 char.</p>\n      </span>\n\n      <ion-item class="edit_item">\n        <ion-label color="default" floating>Confirm Password</ion-label>\n        <ion-input type="password" [(ngModel)]="confirmpassword" formControlName="confirmpassword" required></ion-input>\n      </ion-item>\n      <span class="error" *ngIf="FormRegistrationStepThree.get(\'confirmpassword\').hasError(\'equalTo\')\n      && (FormRegistrationStepThree.controls.confirmpassword.dirty)">\n        Please enter same password\n      </span>\n    </form>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <button *ngIf="editsection==\'name\'" class="sign-up button button-block button-stable" [disabled]="name==\'\'" (click)="updateDetails()">Update User Name</button>\n    <button *ngIf="editsection==\'email\'" class="sign-up button button-block button-stable" [disabled]="email==\'\'" (click)="updateemail()">Update Email</button>\n    <button *ngIf="editsection==\'mobile\'" class="sign-up button button-block button-stable" (click)="changemobilenumber()">Update Mobile Number</button>\n    <button *ngIf="editsection==\'changepass\'" class="sign-up button button-block button-stable" (click)="Changepassword()">Update Password</button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\parsonaledit\parsonaledit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_reg_validator_reg_validator__["a" /* RegValidatorProvider */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
], ParsonaleditPage);

//# sourceMappingURL=parsonaledit.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_parsonaledit_parsonaledit__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PersonalPage = (function () {
    function PersonalPage(theInAppBrowser, platform, remotService, modalCtrl, events, navCtrl, navParams) {
        this.theInAppBrowser = theInAppBrowser;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.options = {
            location: 'yes',
            hidden: 'no',
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no',
            closebuttoncaption: 'Close',
            disallowoverscroll: 'no',
            toolbar: 'yes',
            enableViewportScale: 'no',
            allowInlineMediaPlayback: 'no',
            presentationstyle: 'pagesheet',
            fullscreen: 'yes',
        };
        this.initviewpersonaldata();
    }
    PersonalPage.prototype.editDatauser = function (edittype, editparam) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_parsonaledit_parsonaledit__["a" /* ParsonaleditPage */], { 'editsection': edittype, 'editparam': editparam, "parentPage": this });
    };
    PersonalPage.prototype.initviewpersonaldata = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'privateDataAndroid').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.parsonaldata = response.data;
                console.log(response);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    PersonalPage.prototype.launch = function (url) {
        var target = "_system";
        console.log(url);
        this.theInAppBrowser.create(url, target, this.options);
    };
    PersonalPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad PersonalPage');
    };
    return PersonalPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], PersonalPage.prototype, "navBar", void 0);
PersonalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-personal',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\personal\personal.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Personal Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-grid>\n    <ion-list>\n\n      <br/>\n      <ion-item>\n        <ion-buttons>\n          <ion-icon name="contact"></ion-icon>{{parsonaldata?.username}}</ion-buttons>\n        <ion-icon item-right name="create" (click)="editDatauser(\'name\',parsonaldata);"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-buttons>\n          <ion-icon name="mail"></ion-icon>{{parsonaldata?.email}}</ion-buttons>\n        <ion-icon item-right name="create" (click)="editDatauser(\'email\',parsonaldata);"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-buttons>\n          <ion-icon name="call"></ion-icon>{{parsonaldata?.mobile_no}}</ion-buttons>\n        <ion-icon item-right name="create" (click)="editDatauser(\'mobile\',parsonaldata);"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-buttons>\n          <ion-icon name="eye"></ion-icon> Change Password</ion-buttons>\n        <ion-icon item-right name="create" (click)="editDatauser(\'changepass\',parsonaldata);"></ion-icon>\n      </ion-item>\n\n      <br/>\n\n      <ion-item (click)="launch(\'http://mojolynclife.info/terms-of-use\')">\n        <ion-buttons>\n          <ion-icon name="help-circle"></ion-icon> Terms and Condition</ion-buttons>\n      </ion-item>\n      <ion-item (click)="launch(\'http://mojolynclife.info/privacy-policy\')">\n        <ion-buttons>\n          <ion-icon name="lock"></ion-icon> Privacy Policy</ion-buttons>\n      </ion-item>\n      <ion-item (click)="launch(\'http://mojolynclife.info/contact-us\')">\n        <ion-buttons>\n          <ion-icon name="list-box"></ion-icon> Contact Us</ion-buttons>\n      </ion-item>\n    </ion-list>\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\personal\personal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], PersonalPage);

//# sourceMappingURL=personal.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_photoupload_photoupload__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_albumview_albumview__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PhotosPage = (function () {
    function PhotosPage(navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.photoUploadpage = __WEBPACK_IMPORTED_MODULE_3__pages_photoupload_photoupload__["a" /* PhotouploadPage */];
        this.albums = [];
        this.base_url = this.remotService.site_url;
        this.initPhotoalbumData();
    }
    PhotosPage.prototype.initPhotoalbumData = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            other_user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.albums = [];
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'portfolioAlbums').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.albums = response.data.AlbumDetails;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    /* editAlbum(albm, event) {
  
      const actionSheet = this.actionSheetCtrl.create({
        buttons: [{
          text: 'Edit album',
          handler: () => {
            this.navCtrl.push(PhotouploadPage, { "album": albm, "parentPage": this });
          }
        },
        {
          text: 'Delete this album',
          handler: () => {
  
  
            let confirm = this.alertCtrl.create({
              title: 'Remove Photo',
              message: 'Are you sure?',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
  
                    var DataToSend = {
                      userId: window.localStorage['userid'],
                      token: window.localStorage['token'],
                      portfolioType: 'Album',
                      portfolioId: albm.id
                    };
  
                    this.remotService.presentLoading('wait ...');
                    this.remotService.postData(DataToSend, 'deletePortfolio').subscribe((response) => {
  
                      this.remotService.dismissLoader();
                      if (response.success == 1) {
                        this.initPhotoalbumData();
                      } else {
                        this.remotService.presentToast(response.message);
                      }
                    }, () => {
  
                      this.remotService.dismissLoader();
                      this.remotService.presentToast('Error!');
                    });
  
  
                  }
                },
                {
                  text: 'Cancel',
                  handler: () => {
                    console.log('Agree clicked');
                  }
                }
              ]
            });
            confirm.present();
  
            //action sheet handler end
          }
        }
  
        ]
      });
  
      actionSheet.present();
  
  
      event.stopPropagation();
  
    } */
    PhotosPage.prototype.gotoPhotoView = function (album) {
        // this.navCtrl.push(PhotoviewPage, { "album": album, "parentPage": this });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_albumview_albumview__["a" /* AlbumviewPage */], { "album": album, "parentPage": this });
    };
    PhotosPage.prototype.sendTonewalbum = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_photoupload_photoupload__["a" /* PhotouploadPage */], { "album": {}, "parentPage": this });
    };
    PhotosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad PhotosPage');
    };
    return PhotosPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], PhotosPage.prototype, "navBar", void 0);
PhotosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-photos',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\photos\photos.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Photo Album</ion-title>\n  </ion-navbar>\n  <ion-toolbar text-center>\n    <button color="light" (click)="sendTonewalbum();" icon-start ion-button round>\n      <ion-icon name="add-circle"></ion-icon> Create New Album</button>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n\n      <ion-col col-6 (click)="gotoPhotoView(albm);" *ngFor="let albm of albums;">\n        <div class="album_wrap">\n          <img src="{{base_url}}uploads/portfolioImages/resizedimages/{{albm.image_name}}" alt="Post Img" />\n          <div class="album_list">\n            <p>\n              <ion-icon name="albums"></ion-icon> &nbsp; {{albm.name}}\n              <span>({{albm.imgCount}})</span>\n            </p>\n          </div>\n          <!--  <div (click)="editAlbum(albm,$event);" class="albumSettings">\n                <ion-icon  name="more"></ion-icon>\n            </div> -->\n        </div>\n      </ion-col>\n\n\n\n    </ion-row>\n  </ion-grid>\n\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\photos\photos.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], PhotosPage);

//# sourceMappingURL=photos.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PrivacyPage = (function () {
    function PrivacyPage(remotService, events, navCtrl, navParams) {
        this.remotService = remotService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.privacy = "blocked";
        this.user_id = window.localStorage['userid'];
        this.token = window.localStorage['token'];
        this.base_url = this.remotService.site_url;
    }
    PrivacyPage.prototype.initblockuser = function () {
        var _this = this;
        var url = 'myBlockedUser' + '/' + this.user_id + '/' + this.token;
        this.remotService.presentLoading('wait ...');
        this.remotService.getData(url).subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.blockuser = response.data;
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    PrivacyPage.prototype.initunflowuser = function () {
        var _this = this;
        var url = 'myUnfollowUser' + '/' + this.user_id + '/' + this.token;
        this.remotService.getData(url).subscribe(function (response) {
            console.log(response);
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.unflowuser = response.data;
                console.log(_this.unflowuser);
            }
            else {
                _this.remotService.dismissLoader();
                _this.unflowmsg = response.message;
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    PrivacyPage.prototype.unblockUser = function (bluser) {
        var _this = this;
        this.touserid = bluser.user_id;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            to_userid: this.touserid,
            token: window.localStorage['token']
        };
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'UnblockUser').subscribe(function (response) {
            if (response.success == 1) {
                _this.remotService.dismissLoader();
                _this.initblockuser();
            }
            else {
                _this.remotService.dismissLoader();
                _this.initblockuser();
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    PrivacyPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad PrivacyPage');
        this.initblockuser();
        this.initunflowuser();
    };
    return PrivacyPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]) === "function" && _a || Object)
], PrivacyPage.prototype, "navBar", void 0);
PrivacyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-privacy',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\privacy\privacy.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Privacy</ion-title>\n  </ion-navbar>\n\n  <ion-segment [(ngModel)]="privacy">\n    <ion-segment-button value="blocked">\n      Blocked\n    </ion-segment-button>\n    <ion-segment-button value="hiddenposts">\n      Hidden Posts\n    </ion-segment-button>\n\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content>\n\n\n  <div [ngSwitch]="privacy">\n\n    <ion-list *ngSwitchCase="\'blocked\'">\n\n      <ion-list *ngIf="blockuser==\'\'">\n        <ion-item class="no_result">\n          <h3> You have No blocked user Found... </h3>\n        </ion-item>\n      </ion-list>\n\n      <ion-list class="individual" *ngFor="let bluser of blockuser">\n\n\n        <ion-item padding-horizontal class="search_user search_user_individual">\n          <ion-avatar item-left>\n            <img src="{{base_url}}uploads/profileImages/resizedImages/{{bluser.image}}" alt="Image" />\n          </ion-avatar>\n          <ion-item class="searcsh_right">\n            <p>{{bluser.fname}} {{bluser.lname}}</p>\n            <p class="user_deg">\n              <ion-icon name="briefcase"></ion-icon> {{bluser.creativeField}}</p>\n            <div class="user_action" item-right>\n              <button ion-button block icon-right (click)="unblockUser(bluser)">Unblock</button>\n            </div>\n          </ion-item>\n        </ion-item>\n\n\n      </ion-list>\n\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'hiddenposts\'">\n\n      <ion-list *ngIf="unflowmsg">\n        <ion-item class="no_result">\n          <h3> You have No Hidden Posts Found... </h3>\n        </ion-item>\n      </ion-list>\n\n      <ion-list class="individual" *ngFor="let unuser of unflowuser">\n        <ion-item padding-horizontal class="search_user search_user_individual">\n          <ion-avatar item-left>\n            <img src="{{base_url}}uploads/profileImages/resizedImages/{{unuser.image}}" alt="Image" />\n          </ion-avatar>\n          <ion-item class="searcsh_right">\n            <p>{{unuser.fname}} {{unuser.lname}}</p>\n            <p class="user_deg">\n              <ion-icon name="briefcase"></ion-icon> {{unuser.creativeField}}</p>\n            <div class="user_action" item-right>\n              <button ion-button block icon-right (click)="unblockUser(bluser)">Unblock</button>\n            </div>\n          </ion-item>\n        </ion-item>\n\n\n      </ion-list>\n\n    </ion-list>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\privacy\privacy.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _e || Object])
], PrivacyPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchfilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SearchfilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchfilterPage = (function () {
    function SearchfilterPage(app, modalCtrl, formBuilder, remotService, navCtrl, navParams) {
        this.app = app;
        this.modalCtrl = modalCtrl;
        this.formBuilder = formBuilder;
        this.remotService = remotService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.catid = '';
        this.adname = '';
        this.company = '';
        this.specializations = '';
        this.jobkeyword = '';
        this.locncountry = '';
        this.locnstates = '';
        this.businessname = '';
        this.jobname = '';
        this.FormadvanceStepOne = formBuilder.group({
            cfield: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required])]
        });
        this.initLocationForm();
        this.advsearch = navParams.get('adsdata');
        console.log(this.advsearch);
    }
    SearchfilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchfilterPage');
    };
    SearchfilterPage.prototype.initLocationForm = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.countries = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'countries').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.countries = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    SearchfilterPage.prototype.initStates = function (country_id) {
        var _this = this;
        console.log(country_id);
        this.states = [];
        this.remotService.postData({ 'country_id': country_id }, 'states').subscribe(function (response) {
            if (response.success == 1) {
                _this.states = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    SearchfilterPage.prototype.advanceSearch = function () {
        if (this.jobs == true) {
            this.advsdata = {
                jobname: this.jobname,
                company: this.company,
                jobkeyword: this.jobkeyword,
                locncountry: this.locncountry,
                locnstates: this.locnstates,
                id: this.catid,
                advancesearch: true
            };
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
            };
        }
        if (this.business == true) {
            this.advsdata = {
                businessname: this.businessname,
                locncountry: this.locncountry,
                locnstates: this.locnstates,
                id: this.catid,
                advancesearch: true
            };
        }
        console.log(this.advsdata);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */], { adsearch: this.advsdata });
    };
    SearchfilterPage.prototype.showCategoryModal = function () {
        var _this = this;
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_categories_categories__["a" /* CategoriesPage */]);
        categoryModal.onDidDismiss(function (data) {
            // Do things with data coming from modal, for instance :
            if (data.hasOwnProperty("id")) {
                console.log("GOt from modal", data);
                _this.FormadvanceStepOne.get('cfield').setValue(data.name);
                _this.catid = data.name;
            }
        });
        categoryModal.present();
    };
    return SearchfilterPage;
}());
SearchfilterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-searchfilter',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\searchfilter\searchfilter.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>People filter</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="has-header" padding>\n  <!--People -->\n  <ion-list *ngIf="advsearch==\'people\'">\n    <ion-item>\n      <ion-label color="default" floating>Full Name</ion-label>\n      <ion-input [(ngModel)]="adname"></ion-input>\n    </ion-item>\n    <form [formGroup]="FormadvanceStepOne">\n      <ion-item>\n        <ion-label color="default" floating>Creative Field</ion-label>\n        <ion-input class="input-fld" (click)="showCategoryModal()" [readonly]=true type="text" formControlName="cfield"></ion-input>\n      </ion-item>\n    </form>\n    <ion-item>\n      <ion-label color="default" floating>Company Name</ion-label>\n      <ion-input [(ngModel)]="company"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Specializations</ion-label>\n      <ion-input [(ngModel)]="specializations"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Country</ion-label>\n      <ion-select #country (ngModelChange)=\'initStates(country.value)\' [(ngModel)]="locncountry">\n        <ion-option *ngFor="let cntry of countries" value="{{cntry.id}}">{{cntry.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>State</ion-label>\n      <ion-select [(ngModel)]="locnstates">\n        <ion-option *ngFor="let state of states" value="{{state.id}}">{{state.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n\n  <!--Business-->\n  <ion-list *ngIf="advsearch==\'business\'">\n    <ion-item>\n      <ion-label color="default" floating>Business Name</ion-label>\n      <ion-input [(ngModel)]="businessname"></ion-input>\n    </ion-item>\n    <form [formGroup]="FormadvanceStepOne">\n      <ion-item>\n        <ion-label color="default" floating>Creative Field</ion-label>\n        <ion-input class="input-fld" (click)="showCategoryModal()" [readonly]=true type="text" formControlName="cfield"></ion-input>\n      </ion-item>\n    </form>\n    <ion-item>\n      <ion-label color="default" floating>Country</ion-label>\n      <ion-select #country (ngModelChange)=\'initStates(country.value)\' [(ngModel)]="locncountry">\n        <ion-option *ngFor="let cntry of countries" value="{{cntry.id}}">{{cntry.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>State</ion-label>\n      <ion-select [(ngModel)]="locnstates">\n        <ion-option *ngFor="let state of states" value="{{state.id}}">{{state.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <!--Jobs-->\n  <ion-list *ngIf="advsearch==\'jobs\'">\n    <ion-item>\n      <ion-label color="default" floating>Job Name</ion-label>\n      <ion-input [(ngModel)]="jobname"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Company Name</ion-label>\n      <ion-input [(ngModel)]="company"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Job Keywords</ion-label>\n      <ion-input [(ngModel)]="jobkeyword"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Country</ion-label>\n      <ion-select #country (ngModelChange)=\'initStates(country.value)\' [(ngModel)]="locncountry">\n        <ion-option *ngFor="let cntry of countries" value="{{cntry.id}}">{{cntry.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>State</ion-label>\n      <ion-select [(ngModel)]="locnstates">\n        <ion-option *ngFor="let state of states" value="{{state.id}}">{{state.name}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <button class="sign-up button button-block button-stable" (click)="advanceSearch()">Apply</button>\n    <!--  <button class="sign-up button button-block button-stable" (click)="advanceSearch()" >Apply</button> -->\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\searchfilter\searchfilter.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], SearchfilterPage);

//# sourceMappingURL=searchfilter.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideocommentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the VideocommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VideocommentPage = (function () {
    function VideocommentPage(navCtrl, navParams, viewCntrl, actionSheetCtrl, remotService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCntrl = viewCntrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.comments = [];
        this.base_url = this.remotService.site_url;
        this.currentitem = navParams.get('incidentitem');
        console.log(this.currentitem);
        var commentsParams = {
            type: 'Video',
            incident_id: this.currentitem.IncidentId,
            typeId: this.currentitem.video_id,
            token: window.localStorage['token']
        };
        console.log(commentsParams);
        this.comments = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(commentsParams, 'seeComments').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                console.log(response);
                var commentData = response.data.comments;
                if (commentData != null) {
                    commentData.forEach(function (item, key, index) {
                        _this.comments.push(item);
                    });
                }
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    }
    VideocommentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideocommentPage testpage');
    };
    VideocommentPage.prototype.sendMessage = function () {
        var _this = this;
        var commentsParams = {
            incidentType: 'Video',
            incidentId: this.currentitem.IncidentId,
            incidentTypeId: this.currentitem.video_id,
            token: window.localStorage['token'],
            comment: this.commentText,
            user_id: window.localStorage['userid'],
        };
        console.log(commentsParams);
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe(function (response) {
            console.log(response);
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var newcomment = {
                    comment: _this.commentText,
                    users_full_name: window.localStorage['name'],
                    image: window.localStorage['userimage'],
                    id: response.data.id
                };
                _this.comments.push(newcomment);
                _this.commentText = '';
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    VideocommentPage.prototype.presentActionSheet = function (comment, idx) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //  title: 'Edit your Comment',
            buttons: [
                {
                    text: 'Delete Your comment',
                    role: 'destructive',
                    handler: function () {
                        var commentsParams = {
                            incidentType: 'Video',
                            incidentId: _this.currentitem.IncidentId,
                            incidentTypeId: _this.currentitem.video_id,
                            token: window.localStorage['token'],
                            commentId: comment.id,
                            userId: window.localStorage['userid'],
                        };
                        _this.remotService.presentLoading("Wait ...");
                        _this.remotService.postData(commentsParams, 'deleteComments').subscribe(function (response) {
                            _this.remotService.dismissLoader();
                            //console.log(idx);
                            _this.comments.splice(idx, 1);
                        }, function () {
                            _this.remotService.dismissLoader();
                            _this.remotService.presentToast('Error .');
                        });
                        // console.log('Destructive clicked',comment,idx);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    VideocommentPage.prototype.dismissComment = function () {
        this.viewCntrl.dismiss({ commentlength: this.comments.length });
    };
    VideocommentPage.prototype.scrollToBottom = function () {
        // use the content's dimension to obtain the current height of the scroll
        var dimension = this.content.getContentDimensions();
        // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
        this.content.scrollTo(0, dimension.scrollHeight);
    };
    return VideocommentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], VideocommentPage.prototype, "content", void 0);
VideocommentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-videocomment',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\videocomment\videocomment.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Comment</ion-title>\n    <ion-buttons end>\n\n      <button class="dismiss" (click)="dismissComment();">\n        <ion-icon name="close-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list *ngFor="let comment of comments;let idx = index;">\n    <ion-item class="comment_wrap">\n      <ion-avatar item-left>\n\n        <img *ngIf="comment.image!=null && comment.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{comment.image}}"\n          alt="avatar">\n        <img *ngIf="comment.image==null || comment.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n      </ion-avatar>\n      <ion-item class="searcsh_right">\n        <p>{{comment.users_full_name}}\n          <span>{{comment.creation_date | amTimeAgo:true}}</span>\n        </p>\n        <p class="user_deg">{{comment.comment}}</p>\n        <div class="comment_action">\n          <ion-icon (click)="presentActionSheet(comment,idx)" ios="ios-more" md="md-more"></ion-icon>\n        </div>\n      </ion-item>\n    </ion-item>\n  </ion-list>\n\n\n</ion-content>\n\n\n<ion-footer>\n\n  <ion-toolbar class="msg" color="footer-white">\n    <ion-textarea [(ngModel)]="commentText" rows="1" autoresize placeholder="Type Message Here..."></ion-textarea>\n    <!-- on keyboard open send button -->\n    <button ion-button end small (click)="sendMessage()" [disabled]="msg === \'\'" *ngIf="!cambutton">\n      <i class="material-icons">send</i>\n    </button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\videocomment\videocomment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], VideocommentPage);

//# sourceMappingURL=videocomment.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_videoupload_videoupload__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_opener__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_videocomment_videocomment__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VideosPage = (function () {
    /* currentindex = 0;
    vdo = { count: 0, id: 0, video_like: "0", video_viewed: null, likeActive: 0 }; */
    function VideosPage(modalCtrl, socialSharing, alertCtrl, actionSheetCtrl, remotService, transfer, platform, androidPermissions, file, fileOpener, _DomSanitizer, events, navCtrl, navParams, filePath) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.transfer = transfer;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.file = file;
        this.fileOpener = fileOpener;
        this._DomSanitizer = _DomSanitizer;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.filePath = filePath;
        this.storageDirectory = '';
        this.base_url = this.remotService.site_url;
        this.initvideo();
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(function (success) { return console.log('Permission granted'); }, function (err) { return _this.androidPermissions.requestPermissions(_this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE); });
        if (this.platform.is('ios')) {
            this.storageDirectory = cordova.file.documentsDirectory;
        }
        else if (this.platform.is('android')) {
            this.storageDirectory = cordova.file.documentsDirectory;
        }
        this.filePath.resolveNativePath(this.file.dataDirectory)
            .then(function (filePath) {
            var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            console.log("Correct_Path" + correctPath);
            _this.storageDirectory = _this.file.externalApplicationStorageDirectory;
        }, function (err) {
            console.log("Error" + err);
        });
    }
    VideosPage.prototype.uploadyourvideo = function () {
        console.log(this);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_videoupload_videoupload__["a" /* VideouploadPage */], { "parentPage": this });
    };
    VideosPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        /*  let video = this.mVideoPlayer.nativeElement;
         video.play(); */
        console.log('ionViewDidLoad VideosPage');
    };
    VideosPage.prototype.initvideo = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            other_user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            type: 'Video'
        };
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'mediaListing').subscribe(function (response) {
            _this.remotService.dismissLoader();
            _this.videos = response.data;
            /*  this.currentvideo = this.videos[this.currentindex]; */
            /*  if (response.success == 1) {
             } else {
               this.remotService.presentToast(response.message);
             } */
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    VideosPage.prototype.download = function (nm) {
        var _this = this;
        this.remotService.presentLoading('wait ...');
        this.fileTransfer = this.transfer.create();
        console.log('ok');
        var url = this.base_url + '/uploads/portfolioVideos/';
        window.resolveLocalFileSystemURL(this.storageDirectory, function (dir) {
            console.log(dir);
            console.log(_this.storageDirectory);
        });
        var imageLocation = url + nm;
        console.log(imageLocation);
        this.fileTransfer.download(imageLocation, this.storageDirectory + nm).then(function (entry) {
            console.log('download complete: ' + entry.toURL());
            _this.retrieveImage(nm);
        }, function (error) {
            console.log(error);
        });
    };
    VideosPage.prototype.retrieveImage = function (image) {
        var _this = this;
        this.uponlinemsg = image;
        var res = image.substr(image.indexOf(".") + 1);
        var path = this.filePath.resolveNativePath(this.storageDirectory);
        this.file.checkFile(this.storageDirectory, image)
            .then(function () {
            // const alertSuccess = this.alertCtrl.create({
            //   title: `File retrieval Succeeded! Open In Your Default Player...`,
            //   //subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
            //   buttons: ['Ok']
            // });
            //  return alertSuccess.present().then(() => {
            if (res == 'pdf') {
                var cont = 'application/pdf';
            }
            else if (res == 'png' || res == 'jpg' || res == 'jpeg' || res == 'gif') {
                cont = 'image/res';
            }
            else if (res == 'doc') {
                cont = 'application/msword';
            }
            else if (res = 'mp4') {
                cont = 'video/mp4';
            }
            else if (res = 'mp3') {
                cont = 'audio/mp3';
            }
            _this.fileOpener.open(_this.storageDirectory + image, cont)
                .then(function () {
                console.log('File is opened');
                _this.remotService.dismissLoader();
                //  alertSuccess.dismiss();
            })
                .catch(function (e) { return console.log('Error openening file', e); });
            //});
        })
            .catch(function (err) {
            // const alertFailure = this.alertCtrl.create({
            //   title: `File retrieval Failed!`,
            //   subTitle: `${image} was not successfully retrieved. Error Code: ${err.code}`,
            //   buttons: ['Ok']
            // });
            //
            // return alertFailure.present();
            _this.download(image);
        });
    };
    VideosPage.prototype.presentActionSheetforvideo = function (vdo, event) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: 'Edit Video',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_videoupload_videoupload__["a" /* VideouploadPage */], { "video": vdo, "parentPage": _this });
                    }
                },
                {
                    text: 'Delete this Video',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Remove Video',
                            message: 'Are you sure?',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        var DataToSend = {
                                            userId: window.localStorage['userid'],
                                            token: window.localStorage['token'],
                                            portfolioType: 'Video',
                                            userType: window.localStorage['usertype'],
                                            portfolioId: vdo.video_id
                                        };
                                        _this.remotService.presentLoading('wait ...');
                                        _this.remotService.postData(DataToSend, 'deletePortfolio').subscribe(function (response) {
                                            _this.remotService.dismissLoader();
                                            if (response.success == 1) {
                                                _this.initvideo();
                                            }
                                            else {
                                                _this.remotService.presentToast(response.message);
                                            }
                                        }, function () {
                                            _this.remotService.dismissLoader();
                                            _this.remotService.presentToast('Error!');
                                        });
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                        console.log('Agree clicked');
                                    }
                                }
                            ]
                        });
                        confirm.present();
                        //action sheet handler end
                    }
                }
            ]
        });
        actionSheet.present();
        event.stopPropagation();
    };
    VideosPage.prototype.likeThisvideo = function (vdo) {
        var _this = this;
        if (vdo.video_source == "Local Machine") {
            var incienttype = 'Video';
        }
        var DataToSend = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            incidentId: vdo.IncidentId,
            incidentTypeId: vdo.video_id,
            incidentType: incienttype,
        };
        console.log(vdo);
        this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe(function (response) {
            console.log(response);
            if (response.success == 1) {
                if (response.data.count > vdo.video_like) {
                    vdo.likeActive = 1;
                }
                else {
                    vdo.likeActive = 0;
                }
                vdo.video_like = response.data.count;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error!');
        });
    };
    /**
       * share post on social media
       * @param item
       */
    VideosPage.prototype.shareThisPost = function (vdo) {
        var link = this.base_url + "user/things/share/video/" + vdo.IncidentId + "/1";
        console.log(link);
        var vddo = "";
        var msg = "";
        this.socialSharing.share(msg, null, null, link);
    };
    /**
    * show comments
    */
    VideosPage.prototype.showComments = function (vdo) {
        var commentModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__pages_videocomment_videocomment__["a" /* VideocommentPage */], { incidentitem: vdo });
        commentModal.onDidDismiss(function (data) {
            vdo.comments = data.commentlength;
        });
        commentModal.present();
    };
    return VideosPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], VideosPage.prototype, "navBar", void 0);
VideosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-videos',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\videos\videos.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Video</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar text-center>\n    <button color="light" icon-start ion-button round (click)="uploadyourvideo();">\n      <ion-icon name="cloud-upload"></ion-icon> Upload Your Video </button>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content class="has-header">\n\n  <ion-grid>\n    <!-- Home post by Video -->\n    <ion-row *ngFor="let vdo of videos;">\n      <ion-col>\n        <div class="post_wrap">\n          <ion-list class="post_header">\n            <ion-item class="" padding-horizontal>\n              <ion-item>\n                <p>{{vdo.video_title}}</p>\n                <span>{{vdo.video_description}}</span>\n              </ion-item>\n              <div class="post_action">\n                <ion-icon (click)="presentActionSheetforvideo(vdo, $event)" ios="ios-more" md="md-more"></ion-icon>\n              </div>\n            </ion-item>\n          </ion-list>\n\n          <ion-list class="post_body">\n            <ion-item (click)="retrieveImage(vdo.video_name)">\n\n              <!-- <video #videoPlayer class="video-player" controls ></video> -->\n              <!-- <iframe width="100%" height="200" [src]="_DomSanitizer.bypassSecurityTrustUrl(base_url+\'/uploads/portfolioVideos/\'+ vdo.video_name)"\n                frameborder="0" allowfullscreen></iframe> -->\n              <img [src]="base_url+\'/uploads/portfolioVideoSnapshots/\' +vdo.snapshot_name" />\n\n\n              <ion-icon name="play"></ion-icon>\n            </ion-item>\n\n\n\n          </ion-list>\n\n          <ion-row class="post_activity">\n            <ion-col (click)="likeThisvideo(vdo)" col-4 [class.active]="vdo.likeActive>0">\n              <ion-icon ios="ios-heart" md="md-heart"></ion-icon>\n              <span>{{vdo.video_like}}</span>\n            </ion-col>\n            <ion-col col-4 (click)="showComments(vdo)">\n              <ion-icon ios="ios-text" md="md-text"></ion-icon>\n              <span>{{vdo.comment}}</span>\n            </ion-col>\n            <ion-col col-4 (click)="shareThisPost(vdo)">\n              <ion-icon ios="ios-share" md="md-share"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-col>\n    </ion-row>\n\n\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\videos\videos.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_opener__["a" /* FileOpener */],
        __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DomSanitizer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__["a" /* FilePath */]])
], VideosPage);

//# sourceMappingURL=videos.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideouploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_chooser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the VideouploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VideouploadPage = (function () {
    function VideouploadPage(remotService, transfer, fileChooser, navCtrl, navParams) {
        this.remotService = remotService;
        this.transfer = transfer;
        this.fileChooser = fileChooser;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.show = false;
        this.API_URL = 'http://dev.mojolynclife.info/public/index.php/api';
        this.videotitle = '';
        this.videoprvcy = 1;
        this.youtubelink = '';
        this.checked = false;
        this.videoid = 0;
        this.mediaupd = true;
        this.userFullname = window.localStorage['name'];
        this.userimage = window.localStorage['userimage'];
        this.base_url = this.remotService.site_url;
        this.user_id = window.localStorage['userid'];
        this.token = window.localStorage['token'];
        var video = navParams.get('video');
        if (video && video.hasOwnProperty('video_id')) {
            this.videoid = video.video_id;
            this.videotitle = video.video_title;
            this.videodesc = video.video_description;
            this.videoprvcy = video.privacy;
            this.mediaupd = false;
        }
    }
    VideouploadPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideouploadPage');
    };
    VideouploadPage.prototype.chooseVideo = function () {
        var _this = this;
        this.fileChooser.open().then(function (uri) {
            _this.choseuri = uri;
            _this.currentName = uri.substr(uri.lastIndexOf('/') + 1).replace(/ /g, '_');
            _this.currentName = _this.currentName.replace(/%20/g, '_');
            _this.currentName = _this.currentName.replace(/%/g, '_');
        }, function () {
            console.log('error');
        });
    };
    VideouploadPage.prototype.uploadVideo = function () {
        var _this = this;
        if (this.videoid > 0) {
            console.log('update video');
            console.log(this.videoid);
            var url = 'editMediaDetails';
            var DataToSend = {
                userId: window.localStorage['userid'],
                token: window.localStorage['token'],
                mediaTitle: this.videotitle,
                mediaDescription: this.videodesc,
                mediaPrivacy: this.videoprvcy,
                editMediaType: 'Video',
                editMediaId: this.videoid
            };
            console.log(DataToSend);
            this.remotService.presentLoading("Saving ...");
            this.remotService.postData(DataToSend, url).subscribe(function (response) {
                console.log(response);
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    _this.navParams.get("parentPage").initvideo();
                    // this.events.publish('creoyou:showmenu');
                    _this.navCtrl.pop();
                }
                else {
                    _this.remotService.presentToast(response.message);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error getting about details.');
            });
        }
        else {
            this.fileTransfer = this.transfer.create();
            var options = {
                fileKey: "file",
                fileName: this.currentName + '.mp4',
                httpMethod: "POST",
                chunkedMode: false,
                mimeType: "video/mp4",
                headers: {},
                params: { 'user_id': this.user_id, 'description': this.videodesc, 'title': this.videotitle, 'privacy': this.videoprvcy }
            };
            this.remotService.presentLoading('wait ...');
            console.log(options);
            //console.log(this.videotitle, this.videoprvcy, this.videodesc);
            var url_1 = this.API_URL + "/videoUpload";
            console.log(this.choseuri);
            this.fileTransfer.upload(this.choseuri, url_1, options)
                .then(function (data) {
                _this.remotService.dismissLoader();
                _this.navCtrl.pop();
                console.log(data);
            }, function (err) {
                console.log('error');
                _this.remotService.dismissLoader();
            });
        }
    };
    return VideouploadPage;
}());
VideouploadPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-videoupload',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\videoupload\videoupload.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Video Add</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item class="albumUser">\n      <ion-avatar item-left>\n        <img *ngIf="userimage!=\'null\' && userimage!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{userimage}}" alt="avatar">\n        <img *ngIf="userimage==\'null\' || userimage==\'\'" src="/assets/img/management.png" alt="avatar">\n      </ion-avatar>\n      <p class="EventUser">{{userFullname}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="default" floating>Enter Video Title</ion-label>\n      <ion-input [(ngModel)]="videotitle"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="default" floating>Enter Video Description</ion-label>\n      <ion-textarea rows="4" [(ngModel)]="videodesc"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label color="default" floating>Set Privacy</ion-label>\n      <ion-select [(ngModel)]="videoprvcy">\n        <ion-option value="1">Public</ion-option>\n        <ion-option value="2">Connection Only</ion-option>\n        <ion-option value="3">Connection and followers</ion-option>\n        <ion-option value="4">Only me</ion-option>\n      </ion-select>\n    </ion-item>\n    <!--  <ion-item>\n      <ion-label mode="md">Upload From Youtube</ion-label>\n      <ion-checkbox #small (change)="0" [(ngModel)]="checked"></ion-checkbox>\n\n    </ion-item> -->\n\n    <!--  <ion-item *ngIf="small.checked">\n      <ion-label color="default" floating>Enter Youtube Link</ion-label>\n      <ion-textarea rows="4" [(ngModel)]="youtubelink"></ion-textarea>\n    </ion-item> -->\n    <button class="uploadImage" (click)="chooseVideo()" *ngIf="mediaupd">\n      Upload Video\n      <ion-icon name="cloud-upload"></ion-icon>\n    </button>\n\n    <p class="video_name">\n      {{currentName}}\n    </p>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <button class="sign-up button button-block button-stable" (click)="uploadVideo()" [disabled]="videotitle==\'\'">Save</button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\videoupload\videoupload.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], VideouploadPage);

//# sourceMappingURL=videoupload.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__registration_registration__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__registration_registration__["a" /* RegistrationPage */]);
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-welcome',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\welcome\welcome.html"*/'<ion-content class="ion-starter-content-background">\n\n    <ion-row class="homeslides">\n        <ion-slides pager autoplay="3000" centeredSlides="true">\n            <ion-slide>\n                <div class="col col-center slider-col">\n                    <img src="assets/img/logo.png" class="app_logo">\n                    <h3 class="pl_for">A Creative Platform for<br>Creative People</h3>\n                </div>    \n            </ion-slide>\n\n            <ion-slide>\n                <div class="col col-center slider-col">      	\n                    <h3 class="pl_for">Video page including the website.</h3>\n                    <img src="assets/img/slider-2.png" class="slider_fraim">\n                </div>\n            </ion-slide>\n\n            <ion-slide>\n                <div class="col col-center slider-col">      	\n                    <h3 class="pl_for">Create Your Profile</h3>\n                    <img src="assets/img/slider-3.png" class="slider_fraim">\n                </div>\n            </ion-slide>\n            <ion-slide>\n                <div class="col col-center slider-col">      	\n                    <h3 class="pl_for">Find Opportunities</h3>\n                    <img src="assets/img/slider-4.png" class="slider_fraim">\n                </div>\n            </ion-slide>    \n            <ion-slide>\n                <div class="col col-center slider-col">      	\n                    <h3 class="pl_for">Keep in touch with Your Connections</h3>\n                    <img src="assets/img/slider-5.png" class="slider_fraim">\n                </div>\n            </ion-slide>       \n        </ion-slides>\n    </ion-row>\n    <ion-row text-center>\n\n            <a class="sign-up button button-block button-stable" (click)="signup()">JOIN NOW</a>\n    \n    </ion-row>\n\n</ion-content>\n\n<ion-footer>\n\n    <ion-toolbar class="bar-positive">\n        <a class="tab-item tab-item-active" (click)="login()">SIGN IN</a>\n    </ion-toolbar>\n</ion-footer>\n\n'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\welcome\welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 176;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/aboutedit/aboutedit.module": [
		506,
		45
	],
	"../pages/aboutme/aboutme.module": [
		507,
		44
	],
	"../pages/albumview/albumview.module": [
		508,
		43
	],
	"../pages/audiocomment/audiocomment.module": [
		509,
		42
	],
	"../pages/audios/audios.module": [
		510,
		41
	],
	"../pages/audiupload/audiupload.module": [
		511,
		40
	],
	"../pages/categories/categories.module": [
		512,
		39
	],
	"../pages/comment/comment.module": [
		513,
		38
	],
	"../pages/commonmodal/commonmodal.module": [
		514,
		37
	],
	"../pages/connections/connections.module": [
		515,
		36
	],
	"../pages/eventcreate/eventcreate.module": [
		516,
		35
	],
	"../pages/eventdetails/eventdetails.module": [
		517,
		34
	],
	"../pages/eventlist/eventlist.module": [
		518,
		33
	],
	"../pages/eventscalender/eventscalender.module": [
		519,
		32
	],
	"../pages/feeds/feeds.module": [
		520,
		31
	],
	"../pages/follow/follow.module": [
		521,
		30
	],
	"../pages/invitefriend/invitefriend.module": [
		522,
		29
	],
	"../pages/jobapply/jobapply.module": [
		523,
		28
	],
	"../pages/jobdetails/jobdetails.module": [
		524,
		27
	],
	"../pages/jobs/jobs.module": [
		525,
		26
	],
	"../pages/login/login.module": [
		526,
		25
	],
	"../pages/loginhelp/loginhelp.module": [
		527,
		24
	],
	"../pages/messagedetails/messagedetails.module": [
		528,
		23
	],
	"../pages/messages/messages.module": [
		529,
		22
	],
	"../pages/newmessage/newmessage.module": [
		530,
		21
	],
	"../pages/notifications/notifications.module": [
		531,
		20
	],
	"../pages/notificationsettings/notificationsettings.module": [
		532,
		19
	],
	"../pages/otherprofile/otherprofile.module": [
		533,
		18
	],
	"../pages/parsonaledit/parsonaledit.module": [
		534,
		17
	],
	"../pages/personal/personal.module": [
		535,
		16
	],
	"../pages/photos/photos.module": [
		536,
		15
	],
	"../pages/photoupload/photoupload.module": [
		537,
		14
	],
	"../pages/photoview/photoview.module": [
		538,
		13
	],
	"../pages/popoverpages/popoverpages.module": [
		539,
		0
	],
	"../pages/portfolio/portfolio.module": [
		540,
		12
	],
	"../pages/privacy/privacy.module": [
		541,
		11
	],
	"../pages/registration/registration.module": [
		542,
		10
	],
	"../pages/search/search.module": [
		543,
		9
	],
	"../pages/searchfilter/searchfilter.module": [
		544,
		8
	],
	"../pages/settings/settings.module": [
		545,
		7
	],
	"../pages/socialreg/socialreg.module": [
		546,
		6
	],
	"../pages/taguser/taguser.module": [
		547,
		5
	],
	"../pages/videocomment/videocomment.module": [
		548,
		4
	],
	"../pages/videos/videos.module": [
		549,
		3
	],
	"../pages/videoupload/videoupload.module": [
		550,
		2
	],
	"../pages/welcome/welcome.module": [
		551,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_audio__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__commonmodal_commonmodal__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_base64__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__taguser_taguser__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__comment_comment__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_connections_connections__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_follow_follow__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var HomePage = (function () {
    function HomePage(navCtrl, actionSheetCtrl, _audioProvider, remotService, modalCtrl, events, imagepick, cropService, cameraservice, basesxfrservice, _DomSanitizer, socialSharing) {
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this._audioProvider = _audioProvider;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.imagepick = imagepick;
        this.cropService = cropService;
        this.cameraservice = cameraservice;
        this.basesxfrservice = basesxfrservice;
        this._DomSanitizer = _DomSanitizer;
        this.socialSharing = socialSharing;
        this.progileinfo = {
            background_image: null,
            buisness_name: null,
            cat_name: null,
            company_name: null,
            completenessPercentage: 0,
            connection: null,
            countFollowers: 0,
            countFriends: 0,
            countViews: 0,
            country: null,
            designation: null,
            fname: null,
            image: null,
            lname: null,
            premium_user: 0,
            state: null,
            userid: null,
            website_url: null
        };
        this.maxprogress = 100;
        this.currentprogress = 30;
        this.homePageOffset = 0;
        this.homeData = [];
        this.statustags = [];
        this.connectionPage = __WEBPACK_IMPORTED_MODULE_13__pages_connections_connections__["a" /* ConnectionsPage */];
        this.followPage = __WEBPACK_IMPORTED_MODULE_14__pages_follow_follow__["a" /* FollowPage */];
        this.base_url = this.remotService.site_url;
        this.initdatLoad();
    }
    HomePage.prototype.initdatLoad = function () {
        var _this = this;
        this.events.publish('creoyou:shownotifications');
        /*init status params*/
        this.statustext = '';
        this.statusimage = '';
        this.statustags = [];
        this.statusprivacy = 1;
        this.milliseconds = Math.floor(Math.random() * 6) + 1;
        ////////////////////////
        this.changeimageType = '';
        this.remotService.presentLoading("Wait ...");
        var homeparam = {
            user_id: window.localStorage['userid'],
            user_type: window.localStorage['usertype'],
            loggedInUserID: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.remotService.postData(homeparam, 'homePage').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.progileinfo = response.data.detailsOfuser[0];
                window.localStorage['userimage'] = _this.progileinfo.image;
                _this.events.publish('creoyou:setprofileimage');
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
        this.homePageOffset = 0;
        var dataHomeParams = {
            user_id: window.localStorage['userid'],
            other_user_id: window.localStorage['userid'],
            starting_limit: this.homePageOffset,
            token: window.localStorage['token']
        };
        this.homeData = [];
        this.remotService.postData(dataHomeParams, 'home-data').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var homeresponseData = response.data;
                if (homeresponseData != null) {
                    homeresponseData.forEach(function (item, key, index) {
                        _this.modiFyitemasnecessary(item);
                        _this.homeData.push(item);
                        console.log(_this.homeData);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    HomePage.prototype.ngAfterContentInit = function () {
        // get all tracks managed by AudioProvider so we can control playback via the API
        this.allTracks = this._audioProvider.tracks;
    };
    HomePage.prototype.playSelectedTrack = function () {
        // use AudioProvider to control selected track 
        this._audioProvider.play(this.selectedTrack);
    };
    HomePage.prototype.pauseSelectedTrack = function () {
        // use AudioProvider to control selected track 
        this._audioProvider.pause(this.selectedTrack);
    };
    HomePage.prototype.onTrackFinished = function (track) {
        console.log('Track finished', track);
    };
    /**
     * share post on social media
     * @param item
     */
    HomePage.prototype.shareThisPost = function (item) {
        var type = item.incident_type.toLowerCase();
        var link = this.base_url + "user/things/share/" + type + "/" + item.id;
        console.log(link);
        var img = "";
        var msg = "";
        this.socialSharing.share(msg, null, null, link);
    };
    HomePage.prototype.presentActionSheet = function () {
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: 'Delete this post',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                },
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.statusPrivacy = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: 'Public',
                    handler: function () {
                        _this.statusprivacy = 1;
                    }
                },
                {
                    text: 'Connection only',
                    handler: function () {
                        _this.statusprivacy = 2;
                    }
                },
                {
                    text: 'Connection & Followers',
                    handler: function () {
                        _this.statusprivacy = 3;
                    }
                },
                {
                    text: 'Only me',
                    handler: function () {
                        _this.statusprivacy = 4;
                    }
                }
            ]
        });
        actionSheet.present();
    };
    /**
     * show comments
     */
    HomePage.prototype.showComments = function (item) {
        var commentModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__comment_comment__["a" /* CommentPage */], { incidentitem: item });
        commentModal.onDidDismiss(function (data) {
            item.comments = data.commentlength;
        });
        commentModal.present();
    };
    /**
     * nav push to a page
     */
    HomePage.prototype.gotoPage = function (page) {
        if (page == 'follow')
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__pages_follow_follow__["a" /* FollowPage */]);
        else
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__pages_connections_connections__["a" /* ConnectionsPage */]);
    };
    /**
     * Post New Status
     */
    HomePage.prototype.postNewStatus = function () {
        var _this = this;
        if (this.statusimage == '' && this.statustext == '') {
            this.remotService.presentToast('Enter text or select an image.');
            return false;
        }
        var taggedUserid = [];
        this.statustags.forEach(function (item, key, index) {
            taggedUserid.push(item.user_id);
        });
        var statusImagetoPost;
        if (this.statusimage != '') {
            statusImagetoPost = this.statusimage.split(',');
            statusImagetoPost = statusImagetoPost[1];
        }
        var statusdetailParams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            userStatus: this.statustext,
            statusPrivacyValue: this.statusprivacy,
            image: statusImagetoPost,
            mySelectedFriendsId: taggedUserid
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(statusdetailParams, 'showStatusAction').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.initdatLoad();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error saving data.');
        });
    };
    HomePage.prototype.fetchHomeData = function (infiniteScroll) {
        var _this = this;
        this.homePageOffset = this.homePageOffset + 6;
        var dataHomeParams = {
            user_id: window.localStorage['userid'],
            other_user_id: window.localStorage['userid'],
            starting_limit: this.homePageOffset,
            token: window.localStorage['token']
        };
        this.remotService.postData(dataHomeParams, 'home-data').subscribe(function (response) {
            infiniteScroll.complete();
            if (response.success == 1) {
                var homeresponseData = response.data;
                if (homeresponseData != null) {
                    homeresponseData.forEach(function (item, key, index) {
                        _this.modiFyitemasnecessary(item);
                        _this.homeData.push(item);
                        console.log(_this.homeData);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    /**
     * showing other tagged users
     * @param items
     */
    HomePage.prototype.showextrataggedusers = function (items) {
        var commonModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__commonmodal_commonmodal__["a" /* CommonmodalPage */], {
            items: items.tagged_to.splice(2),
            title: "Other tagged users"
        });
        commonModal.onDidDismiss(function (data) {
        });
        commonModal.present();
    };
    HomePage.prototype.likeThisitem = function (item) {
        var _this = this;
        item.likeCheck = item.likeCheck == '' ? 'fillit' : '';
        var DataToSend = {
            user_id: window.localStorage['userid'],
            incidentTypeId: item.incident_id,
            incidentId: item.id,
            incidentType: item.incident_type,
            fname: item.users_full_name,
            token: window.localStorage['token']
        };
        this.remotService.presentToast('Saving ...');
        this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe(function (response) {
            if (response.success == 1) {
                item.likes = response.data.count;
                _this.remotService.presentToast('Saved.');
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error!');
        });
    };
    HomePage.prototype.getWholiked = function (item) {
        var _this = this;
        var DataToSend = {
            event_id: item.incident_id,
            type: item.incident_type,
            incident_id: item.id
        };
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'seeLikes').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var users = [];
                var userdata = response.data;
                userdata.forEach(function (itemElm, key, index) {
                    users.push({
                        id: itemElm.id,
                        name: itemElm.fname + ' ' + itemElm.lname,
                        'image': itemElm.image,
                        creativeField: itemElm.creativeField,
                        designation: itemElm.designation
                    });
                });
                var commonModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__commonmodal_commonmodal__["a" /* CommonmodalPage */], {
                    items: users,
                    title: "People Who Have Liked"
                });
                commonModal.onDidDismiss(function (data) {
                });
                commonModal.present();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    //End of wholiked function
    /**
     * show user to tag in status
     */
    HomePage.prototype.showUsersTotag = function () {
        var _this = this;
        this.statustags = [];
        var connectionModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__taguser_taguser__["a" /* TaguserPage */]);
        connectionModal.onDidDismiss(function (data) {
            if (data.tags.length > 0) {
                data.tags.forEach(function (item) {
                    _this.statustags.push(item);
                });
            }
            console.log(_this.statustags);
        });
        connectionModal.present();
    };
    // image cropper modal call
    HomePage.prototype.addImage = function (title, type) {
        var _this = this;
        if (title === void 0) { title = "Chnage Profile Image"; }
        if (type === void 0) { type = 'profile'; }
        this.changeimageType = type;
        var actionSheet = this.actionSheetCtrl.create({
            title: title,
            buttons: [{
                    text: 'Take a Picture',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Pick From Library',
                    handler: function () {
                        //**************** */
                        _this.openImagePicker();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ////
    HomePage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            correctOrientation: true
        };
        this.cameraservice.getPicture(options)
            .then(function (data) {
            _this.chnagedimagename = null;
            _this.cropService
                .crop(data, {
                quality: 75
            })
                .then(function (newImage) {
                _this.chnagedimagename = newImage;
                if (_this.changeimageType == 'profile')
                    _this.saveProfileImage();
                else
                    _this.addStatusImage();
            }, function (error) { return console.error("Error cropping image", error); });
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 5,
        };
        this.chnagedimagename = null;
        this.imagepick.getPictures(options)
            .then(function (results) {
            _this.reduceImages(results).then(function () {
                if (_this.changeimageType == 'profile')
                    _this.saveProfileImage();
                else
                    _this.addStatusImage();
            });
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, {
                    quality: 75
                })
                    .then(function (cropped_image) {
                    _this.chnagedimagename = cropped_image;
                });
            });
        }, Promise.resolve());
    };
    /**
     * add status image to the div
     */
    HomePage.prototype.addStatusImage = function () {
        var _this = this;
        var filePath = this.chnagedimagename;
        this.basesxfrservice.encodeFile(filePath).then(function (base64File) {
            //var bsesixfrImage =  base64File.split(',');
            _this.statusimage = base64File;
        }, function (err) {
            _this.statusimage = '';
            console.log('Base 64 service', err);
        });
    };
    //change profile image
    HomePage.prototype.saveProfileImage = function () {
        var _this = this;
        var filePath = this.chnagedimagename;
        this.basesxfrservice.encodeFile(filePath).then(function (base64File) {
            var bsesixfrImage = base64File.split(',');
            // console.log(bsesixfrImage);
            // return false;
            var imageParams = {
                user_id: window.localStorage['userid'],
                chunkedMode: false,
                mimeType: "image/jpeg",
                image: bsesixfrImage[1]
            };
            _this.remotService.presentLoading("Saving ...");
            _this.remotService.postData(imageParams, 'profileImageChange').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    _this.initdatLoad();
                }
                else {
                    _this.remotService.presentToast(response.message);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error saving image.');
            });
        }, function (err) {
            //this.remotService.presentToast('No Im.');
            console.log('Base 64 service', err);
        });
    };
    /**
     * modify home-data as necessary
     * @param item
     */
    HomePage.prototype.modiFyitemasnecessary = function (item) {
        if (item.incident_type === 'Audio') {
            var audiosource = (item.audio_name != null && item.audio_name != '') ? this.base_url + item.audio_name : item.audio_source;
            item.myTracks = [{
                    src: audiosource,
                    artist: 'No Artist',
                    title: item.audio_title,
                    art: 'img/johnmayer.jpg',
                    preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
                }];
        }
        // return item;
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\home\home.html"*/'<ion-content>\n  <ion-row class="User_profile_wrap" [style.backgroundImage]="\'url(\'+base_url+\'uploads/backgroundImages/\'+progileinfo.background_image+\')\'">\n    <ion-col col-5>\n      <div class="prifile_image_box ">\n        <div class="prifile_image">\n          <img *ngIf="progileinfo.image!=null && progileinfo.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{progileinfo.image}}"\n            alt="avatar">\n          <img *ngIf="progileinfo.image==null || progileinfo.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n        </div>\n        <div *ngIf="progileinfo.premium_user==1" class="premimum_badge"></div>\n        <button class="attach_photo" (click)="addImage()">\n          <i class="material-icons">mode_edit</i>\n        </button>\n      </div>\n    </ion-col>\n    <ion-col col-7 class="user_title">\n      <h2>\n        {{progileinfo.fname}} {{progileinfo.lname}}\n      </h2>\n      <p *ngIf="progileinfo.cat_name !== \'\'">{{progileinfo.cat_name}}</p>\n      <p *ngIf="progileinfo.country !== \'\' && progileinfo.country !== null ">\n        {{progileinfo.country}}, {{progileinfo.state}}\n      </p>\n    </ion-col>\n\n    <ion-col col-6>\n      <div class="Progress">\n        <h2>Profile Status</h2>\n        <div class="progress_container">\n          <p>{{progileinfo.completenessPercentage}}%</p>\n          <round-progress [current]="progileinfo.completenessPercentage" [max]="maxprogress" [color]="\'#006400\'" [background]="\'#ffffff\'"\n            [radius]="20" [stroke]="5" [semicircle]="false" [rounded]="true" [clockwise]="true" [responsive]="true" [duration]="800"\n            [animation]="\'easeInOutQuart\'" [animationDelay]="0"></round-progress>\n        </div>\n        <button class="">Complete Profile</button>\n      </div>\n    </ion-col>\n    <ion-col col-6>\n      <div class="Upgrade">\n        <h2>Upgrade</h2>\n        <img src="assets/img/Upgrade_logo.png" class="update_logo">\n        <button class="">People Visited Your Profile</button>\n      </div>\n    </ion-col>\n\n  </ion-row>\n\n\n  <ion-row class="followers">\n    <ion-col col-6>\n      <h1 (click)="gotoPage(\'follow\')" class="follow_count_normal_user followers_count">\n        <label>Followers</label>\n        {{progileinfo.countFollowers}}\n      </h1>\n    </ion-col>\n    <ion-col col-6>\n      <h1 (click)="gotoPage(\'conn\')" class="follow_count_normal_user">\n        <label>Connection</label>\n        {{progileinfo.countFriends}}\n      </h1>\n    </ion-col>\n  </ion-row>\n\n\n\n  <ion-list>\n    <ion-item class="what_your_mind">\n      <ion-textarea [(ngModel)]="statustext" rows="3" placeholder="What’s on your mind ?"></ion-textarea>\n    </ion-item>\n  </ion-list>\n\n  <ion-row *ngIf="statusimage!=\'\' || statustags?.length > 0" class="HomePost">\n    <ion-col *ngIf="statusimage!=\'\'" col-12 text-center>\n      <div class="image_view ">\n        <div>\n          <img [src]="_DomSanitizer.bypassSecurityTrustUrl(statusimage)">\n        </div>\n        <button class="Image_delete" (click)="statusimage=\'\'">\n          <ion-icon name="remove-circle"></ion-icon>\n        </button>\n      </div>\n    </ion-col>\n    <ion-col *ngIf="statustags?.length > 0" col-12 text-center>\n      <ion-item *ngIf="statustags?.length > 0">\n        <p class="Post_tag statustags">\n          With\n          <span *ngFor="let tagitem of statustags;let idx = index">\n            <span>{{tagitem?.users_full_name}}\n              <span *ngIf="idx<(statustags?.length-1)">,</span>\n            </span>\n          </span>\n\n\n        </p>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n  <ion-row class="HomePost">\n\n    <ion-col col-3>\n      <button (click)="addImage(\'Add Image To Status\',\'status\');">\n        <i class="material-icons add_a_photo-loop">add_a_photo</i>\n        Image\n      </button>\n    </ion-col>\n    <ion-col col-3>\n      <button (click)="showUsersTotag()">\n        <i class="material-icons">loyalty</i>\n        Tag\n      </button>\n    </ion-col>\n    <ion-col col-3>\n      <button (click)="statusPrivacy()">\n        <i class="material-icons">lock_outline</i>\n        Privacy\n      </button>\n    </ion-col>\n    <ion-col col-3>\n      <button (click)="postNewStatus()">\n        <i class="material-icons">near_me</i>\n        Post\n      </button>\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row *ngFor="let item of homeData">\n    <ion-col>\n      <div class="post_wrap">\n        <ion-list class="post_header">\n          <ion-item class="" padding-horizontal>\n            <ion-avatar class="person-pic" item-left>\n              <img src="{{base_url}}uploads/profileImages/resizedImages/{{item.image}}" alt="avatar">\n            </ion-avatar>\n\n            <ion-item class="status-check2">\n              <p class="Completed" text-center>\n                <span>{{item.users_full_name}}</span>\n                {{item.incident_name}}</p>\n              <span>06 October 2017 at 5:53pm</span>\n            </ion-item>\n            <div class="post_action">\n              <ion-icon (click)="presentActionSheet(item)" ios="ios-more" md="md-more"></ion-icon>\n            </div>\n          </ion-item>\n        </ion-list>\n\n        <ion-list class="post_body">\n          <ion-item *ngIf="item.incident_type===\'Status\'">\n            <p>{{item.user_status}}</p>\n\n            <img *ngIf="item.media_name!=\'\'" src="{{base_url}}uploads/statusMedia/{{item.media_name}}?t={{milliseconds}}" alt="Post Img"\n            />\n\n          </ion-item>\n          <ion-item *ngIf="item.incident_type===\'Event\'">\n            <p>{{item.user_status}}</p>\n\n            <img *ngIf="item.event_image!=\'\'" src="{{base_url}}uploads/eventsImages/{{item.event_image}}" alt="Post Img" />\n\n          </ion-item>\n\n          <ion-item *ngIf="item.incident_type===\'Profile\'">\n            <img src="{{base_url}}uploads/profileImages/{{item.incident_details}}" alt="Post Img" />\n\n          </ion-item>\n          <ion-item *ngIf="item.incident_type===\'Image\'">\n\n            <span *ngFor="let albumimage of item.image_details">\n              <img src="{{base_url}}uploads/portfolioImages/{{albumimage.image_name}}" alt="Post Img" />\n            </span>\n\n          </ion-item>\n          <ion-item *ngIf="item.incident_type===\'Audio\';">\n\n            <audio-track #audio *ngFor="let track of item.myTracks" [track]="track" (onFinish)="onTrackFinished($event)">\n              <ion-item>\n                <ion-thumbnail item-left>\n                  <img src="assets/img/audio_new.png">\n                  <audio-track-play dark [audioTrack]="audio">\n                    <ion-spinner></ion-spinner>\n                  </audio-track-play>\n                </ion-thumbnail>\n                <div item-content style="width:100%">\n                  <p>\n                    <strong>{{audio.title}}</strong> ⚬\n                    <em>{{audio.artist}}</em>\n                  </p>\n                  <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n                </div>\n              </ion-item>\n            </audio-track>\n            <!-- {{item.test}}        -->\n          </ion-item>\n\n          <ion-item *ngIf="item.incident_type===\'You Tube\';">\n\n            <iframe width="100%" src="{{item.video_name}}" frameborder="0 " allowfullscreen></iframe>\n\n          </ion-item>\n\n          <ion-item *ngIf="item.incident_type===\'Video\'">\n\n            <video poster="{{base_url}}uploads/portfolioVideoSnapshots/{{item.snapshot_name}}" controls="controls" preload="metadata"\n              webkit-playsinline="webkit-playsinline" class="videoPlayer">\n              <source src="{{base_url}}uploads/portfolioVideos/{{item.video_name}}" type="video/mp4" />\n            </video>\n\n          </ion-item>\n          <ion-item *ngIf="item.tagged_to?.length > 0">\n            <p class="Post_tag">\n              With\n              <span *ngFor="let tagitem of item.tagged_to;let idx = index">\n                <span *ngIf="idx<2">{{tagitem.name}}\n                  <span *ngIf="idx<(item.tagged_to?.length-1)">,</span>\n                </span>\n              </span>\n              <span (click)="showextrataggedusers(item)" *ngIf="item.tagged_to?.length > 2">\n                <span class="andText"> and </span>\n                <span>{{item.tagged_to?.length-2}} other</span>\n              </span>\n\n            </p>\n          </ion-item>\n\n        </ion-list>\n\n        <ion-row class="post_activity">\n          <ion-col col-4 [class.active]="item.likeCheck!=\'\'">\n            <ion-icon (click)="likeThisitem(item)" ios="ios-heart" md="md-heart"></ion-icon>\n            <span (click)="getWholiked(item);">{{item.likes}}</span>\n          </ion-col>\n          <ion-col (click)="showComments(item)" col-4>\n            <ion-icon ios="ios-text" md="md-text"></ion-icon>\n            <span>{{item.comments}}</span>\n          </ion-col>\n          <ion-col (click)="shareThisPost(item);" col-4>\n            <ion-icon ios="ios-share" md="md-share"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-col>\n  </ion-row>\n\n  <ion-infinite-scroll (ionInfinite)="fetchHomeData($event)">\n    <ion-infinite-scroll-content loadingSpinner="bubbles">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_audio__["a" /* AudioProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["DomSanitizer"], __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__["a" /* SocialSharing */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtherprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_audio__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__comment_comment__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aboutme_aboutme__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__portfolio_portfolio__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the OtherprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtherprofilePage = (function () {
    function OtherprofilePage(modalCtrl, socialSharing, _audioProvider, remotService, events, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this._audioProvider = _audioProvider;
        this.remotService = remotService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statustags = [];
        this.profileinfo = {
            background_image: null,
            buisness_name: null,
            cat_name: null,
            company_name: null,
            completenessPercentage: 0,
            connection: null,
            countFollowers: 0,
            countFriends: 0,
            countViews: 0,
            country: null,
            designation: null,
            fname: null,
            image: null,
            lname: null,
            premium_user: 0,
            state: null,
            userid: null,
            website_url: null
        };
        this.homePageOffset = 0;
        this.homeData = [];
        this.base_url = this.remotService.site_url;
        this.otherprofiledata = navParams.get('otheruserfrofiledata');
        this.tabtype = navParams.get('tabname');
        this.friendcheck = navParams.get('friendcheck');
        console.log(this.otherprofiledata);
        this.initOtherprofiledata();
    }
    OtherprofilePage.prototype.initOtherprofiledata = function () {
        var _this = this;
        /*init status params*/
        this.statustext = '';
        this.statusimage = '';
        this.statustags = [];
        this.statusprivacy = 1;
        this.milliseconds = Math.floor(Math.random() * 6) + 1;
        ////////////////////////
        this.remotService.presentLoading("Wait ...");
        var homeparam = {
            user_id: this.otherprofiledata.user_id,
            user_type: window.localStorage['usertype'],
            //loggedInUserID: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        console.log(homeparam);
        this.remotService.postData(homeparam, 'homePage').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.profileinfo = response.data.detailsOfuser[0];
                console.log(_this.profileinfo);
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
        this.homePageOffset = 0;
        var dataHomeParams = {
            user_id: window.localStorage['userid'],
            other_user_id: this.otherprofiledata.user_id,
            starting_limit: this.homePageOffset,
            token: window.localStorage['token']
        };
        this.homeData = [];
        this.remotService.postData(dataHomeParams, 'home-data').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var homeresponseData = response.data;
                if (homeresponseData != null) {
                    homeresponseData.forEach(function (item, key, index) {
                        //this.modiFyitemasnecessary(item);
                        _this.homeData.push(item);
                        console.log(_this.homeData);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    OtherprofilePage.prototype.fetchHomeData = function (infiniteScroll) {
        var _this = this;
        this.homePageOffset = this.homePageOffset + 6;
        var dataHomeParams = {
            user_id: window.localStorage['userid'],
            other_user_id: this.otherprofiledata.user_id,
            starting_limit: this.homePageOffset,
            token: window.localStorage['token']
        };
        this.remotService.postData(dataHomeParams, 'home-data').subscribe(function (response) {
            infiniteScroll.complete();
            if (response.success == 1) {
                var homeresponseData = response.data;
                if (homeresponseData != null) {
                    homeresponseData.forEach(function (item, key, index) {
                        _this.homeData.push(item);
                        console.log(_this.homeData);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    OtherprofilePage.prototype.ngAfterContentInit = function () {
        // get all tracks managed by AudioProvider so we can control playback via the API
        this.allTracks = this._audioProvider.tracks;
    };
    OtherprofilePage.prototype.playSelectedTrack = function () {
        // use AudioProvider to control selected track 
        this._audioProvider.play(this.selectedTrack);
    };
    OtherprofilePage.prototype.pauseSelectedTrack = function () {
        // use AudioProvider to control selected track 
        this._audioProvider.pause(this.selectedTrack);
    };
    OtherprofilePage.prototype.onTrackFinished = function (track) {
        console.log('Track finished', track);
    };
    /**
     * share post on social media
     * @param item
     */
    OtherprofilePage.prototype.shareThisPost = function (item) {
        var type = item.incident_type.toLowerCase();
        var link = this.base_url + "user/things/share/" + type + "/" + item.id;
        console.log(link);
        var img = "";
        var msg = "";
        this.socialSharing.share(msg, null, null, link);
    };
    /**
       * show comments
       */
    OtherprofilePage.prototype.showComments = function (item) {
        var commentModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__comment_comment__["a" /* CommentPage */], { incidentitem: item });
        commentModal.onDidDismiss(function (data) {
            item.comments = data.commentlength;
        });
        commentModal.present();
    };
    OtherprofilePage.prototype.likeThisitem = function (item) {
        var _this = this;
        item.likeCheck = item.likeCheck == '' ? 'fillit' : '';
        var DataToSend = {
            user_id: window.localStorage['userid'],
            incidentTypeId: item.incident_id,
            incidentId: item.id,
            incidentType: item.incident_type,
            fname: item.users_full_name,
            token: window.localStorage['token']
        };
        this.remotService.presentToast('Saving ...');
        this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe(function (response) {
            if (response.success == 1) {
                item.likes = response.data.count;
                _this.remotService.presentToast('Saved.');
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error!');
        });
    };
    OtherprofilePage.prototype.otheruserAbout = function (profileinfo) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__aboutme_aboutme__["a" /* AboutmePage */], { 'touserid': profileinfo.userid });
        console.log(profileinfo.userid);
    };
    OtherprofilePage.prototype.otheruserPortfolio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__portfolio_portfolio__["a" /* PortfolioPage */], {});
    };
    OtherprofilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:hidemenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad OtherprofilePage');
    };
    return OtherprofilePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], OtherprofilePage.prototype, "navBar", void 0);
OtherprofilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-otherprofile',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\otherprofile\otherprofile.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>{{profileinfo.fname}} {{profileinfo.lname}}</ion-title>\n    <ion-title *ngIf="profileinfo.buisness_name!=null || profileinfo.buisness_name!=\'\'">{{profileinfo.buisness_name}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-row class="User_profile_wrap" [style.backgroundImage]="\'url(\'+base_url+\'uploads/backgroundImages/\'+profileinfo.background_image+\')\'">\n    <ion-col col-5>\n      <div class="prifile_image_box ">\n        <div class="prifile_image">\n          <img *ngIf="profileinfo.image!=null && profileinfo.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{profileinfo.image}}"\n            alt="avatar">\n          <img *ngIf="profileinfo.image==null || profileinfo.image==\'\'" src="/assets/img/management.png" alt="avatar">\n        </div>\n        <div *ngIf="profileinfo.premium_user==1" class="premimum_badge"></div>\n      </div>\n    </ion-col>\n    <ion-col col-7 class="user_title">\n      <h2>{{profileinfo.fname}} {{profileinfo.lname}}</h2>\n      <h2 *ngIf="profileinfo.buisness_name">{{profileinfo.buisness_name}}</h2>\n      <p *ngIf="profileinfo.cat_name !== \'\'">{{profileinfo.cat_name}}</p>\n      <p *ngIf="profileinfo.country !== \'\' && profileinfo.country !== null ">\n        {{profileinfo.country}}, {{profileinfo.state}}\n      </p>\n    </ion-col>\n  </ion-row>\n\n  <ion-row class="otherActivity">\n    <ion-col col-12>\n      <button icon-left ion-button center round *ngIf="tabtype==\'suggestions\' || friendcheck==0">\n        <ion-icon name="person-add"></ion-icon> Connect\n      </button>\n\n\n      <button icon-left ion-button center round *ngIf="tabtype==\'connections\' || friendcheck==2">\n        <ion-icon name="mail"></ion-icon> Message\n      </button>\n      <button icon-left ion-button center round *ngIf="tabtype==\'suggestions\' || friendcheck==0">\n        <i class="material-icons">forward</i> Follow\n      </button>\n    </ion-col>\n\n    <ion-col col-12 class="otherUserDetails">\n      <span class="active" (click)="otheruserAbout(profileinfo)">About</span>\n      <span (click)="otheruserPortfolio(profileinfo)">Portfolio</span>\n      <span>Connections</span>\n      <span>Events</span>\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row *ngFor="let item of homeData">\n    <ion-col>\n      <div class="post_wrap">\n        <ion-list class="post_header">\n          <ion-item class="" padding-horizontal>\n            <ion-avatar class="person-pic" item-left>\n              <img src="{{base_url}}uploads/profileImages/resizedImages/{{item.image}}" alt="avatar">\n            </ion-avatar>\n\n            <ion-item class="status-check2">\n              <p class="Completed" text-center>\n                <span>{{item.users_full_name}}</span>\n                {{item.incident_name}}</p>\n              <span>06 October 2017 at 5:53pm</span>\n            </ion-item>\n            <div class="post_action">\n              <ion-icon (click)="presentActionSheet(item)" ios="ios-more" md="md-more"></ion-icon>\n            </div>\n          </ion-item>\n        </ion-list>\n\n        <ion-list class="post_body">\n          <ion-item *ngIf="item.incident_type===\'Status\'">\n            <p>{{item.user_status}}</p>\n\n            <img *ngIf="item.media_name!=\'\'" src="{{base_url}}uploads/statusMedia/{{item.media_name}}?t={{milliseconds}}" alt="Post Img"\n            />\n\n          </ion-item>\n          <ion-item *ngIf="item.incident_type===\'Event\'">\n            <p>{{item.user_status}}</p>\n\n            <img *ngIf="item.event_image!=\'\'" src="{{base_url}}uploads/eventsImages/{{item.event_image}}" alt="Post Img" />\n\n          </ion-item>\n\n          <ion-item *ngIf="item.incident_type===\'Profile\'">\n            <img src="{{base_url}}uploads/profileImages/{{item.incident_details}}" alt="Post Img" />\n\n          </ion-item>\n          <ion-item *ngIf="item.incident_type===\'Image\'">\n\n            <span *ngFor="let albumimage of item.image_details">\n              <img src="{{base_url}}uploads/portfolioImages/{{albumimage.image_name}}" alt="Post Img" />\n            </span>\n\n          </ion-item>\n          <ion-item *ngIf="item.incident_type===\'Audio\';">\n\n            <audio-track #audio *ngFor="let track of item.myTracks" [track]="track" (onFinish)="onTrackFinished($event)">\n              <ion-item>\n                <ion-thumbnail item-left>\n                  <img src="assets/img/audio_new.png">\n                  <audio-track-play dark [audioTrack]="audio">\n                    <ion-spinner></ion-spinner>\n                  </audio-track-play>\n                </ion-thumbnail>\n                <div item-content style="width:100%">\n                  <p>\n                    <strong>{{audio.title}}</strong> ⚬\n                    <em>{{audio.artist}}</em>\n                  </p>\n                  <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n                </div>\n              </ion-item>\n            </audio-track>\n            <!-- {{item.test}}        -->\n          </ion-item>\n\n          <ion-item *ngIf="item.incident_type===\'You Tube\';">\n\n            <iframe width="100%" src="{{item.video_name}}" frameborder="0 " allowfullscreen></iframe>\n\n          </ion-item>\n\n          <ion-item *ngIf="item.incident_type===\'Video\'">\n\n            <video poster="{{base_url}}uploads/portfolioVideoSnapshots/{{item.snapshot_name}}" controls="controls" preload="metadata"\n              webkit-playsinline="webkit-playsinline" class="videoPlayer">\n              <source src="{{base_url}}uploads/portfolioVideos/{{item.video_name}}" type="video/mp4" />\n            </video>\n\n          </ion-item>\n          <ion-item *ngIf="item.tagged_to?.length > 0">\n            <p class="Post_tag">\n              With\n              <span *ngFor="let tagitem of item.tagged_to;let idx = index">\n                <span *ngIf="idx<2">{{tagitem.name}}\n                  <span *ngIf="idx<(item.tagged_to?.length-1)">,</span>\n                </span>\n              </span>\n              <span (click)="showextrataggedusers(item)" *ngIf="item.tagged_to?.length > 2">\n                <span class="andText"> and </span>\n                <span>{{item.tagged_to?.length-2}} other</span>\n              </span>\n\n            </p>\n          </ion-item>\n        </ion-list>\n        <ion-row class="post_activity">\n          <ion-col col-4 [class.active]="item.likeCheck!=\'\'">\n            <ion-icon (click)="likeThisitem(item)" ios="ios-heart" md="md-heart"></ion-icon>\n            <span (click)="getWholiked(item);">{{item.likes}}</span>\n          </ion-col>\n          <ion-col (click)="showComments(item)" col-4>\n            <ion-icon ios="ios-text" md="md-text"></ion-icon>\n            <span>{{item.comments}}</span>\n          </ion-col>\n          <ion-col (click)="shareThisPost(item);" col-4>\n            <ion-icon ios="ios-share" md="md-share"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-col>\n  </ion-row>\n  <ion-infinite-scroll (ionInfinite)="fetchHomeData($event)">\n    <ion-infinite-scroll-content loadingSpinner="bubbles">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\otherprofile\otherprofile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_3_ionic_audio__["a" /* AudioProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], OtherprofilePage);

//# sourceMappingURL=otherprofile.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CategoriesPage = (function () {
    function CategoriesPage(navCtrl, remotService, viewCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.remotService = remotService;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.searchTerm = '';
        this.searching = false;
        this.categories = [];
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
    }
    CategoriesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(700).subscribe(function (search) {
            _this.setFilteredItems();
        });
    };
    CategoriesPage.prototype.setFilteredItems = function () {
        var _this = this;
        this.categories = [];
        this.searching = true;
        // if(this.searchTerm!='')
        //  this.categories.push({id:0,name:this.searchTerm,checked:false});
        this.remotService.getCategories(this.searchTerm).subscribe(function (response) {
            var categoriesData = response.data;
            categoriesData.forEach(function (item, key, index) {
                _this.categories.push({ id: item.id, name: item.cat_name, checked: false });
            });
            _this.searching = false;
        }, function () { });
    };
    CategoriesPage.prototype.selectCat = function (catItem) {
        // console.log(catItem)
        this.viewCtrl.dismiss(catItem);
    };
    CategoriesPage.prototype.addCustom = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            //  title: 'Add A Custom Creative Field',
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        var catItem = { id: 0, name: data.customfield, checked: false };
                        _this.viewCtrl.dismiss(catItem);
                        // console.log(data.customfield);
                    }
                }
            ]
        });
        alert.present();
    };
    CategoriesPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ name: '', id: 0 });
    };
    return CategoriesPage;
}());
CategoriesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-categories',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\categories\categories.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>Select Category</ion-title>\n        <ion-buttons end>\n            <button class="dismiss" (click)="dismiss()">\n                <ion-icon name="close"></ion-icon>\n            </button>\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n<ion-content class="content-background">\n\n    <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="setFilteredItems()"></ion-searchbar>\n\n    <div *ngIf="searching" class="spinner-container">\n        <ion-spinner></ion-spinner>\n    </div>\n    <ion-row>\n        <ion-col col-12>\n            <button (click)="addCustom();" ion-button round block>\n                <ion-icon name="add-circle"></ion-icon>&nbsp;Add Custom</button>\n        </ion-col>\n    </ion-row>\n    <ion-list>\n\n        <ion-item (click)="selectCat(item)" *ngFor="let item of categories">\n            {{item.name}}\n        </ion-item>\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\categories\categories.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], CategoriesPage);

//# sourceMappingURL=categories.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\settings\settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(425);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommentPage = (function () {
    function CommentPage(navCtrl, navParams, viewCntrl, actionSheetCtrl, remotService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCntrl = viewCntrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.comments = [];
        this.currentitem = navParams.get('incidentitem');
        this.base_url = this.remotService.site_url;
        //console.log(this.currentitem,navParams.get('incidentitem'));
        var commentsParams = {
            type: this.currentitem.incident_type,
            incident_id: this.currentitem.incident_id,
            typeId: this.currentitem.id,
            token: window.localStorage['token']
        };
        console.log(commentsParams);
        this.comments = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(commentsParams, 'seeComments').subscribe(function (response) {
            console.log(response);
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                console.log("okkkk");
                var commentData = response.data.comments;
                if (commentData != null) {
                    commentData.forEach(function (item, key, index) {
                        _this.comments.push(item);
                    });
                }
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    }
    CommentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommentPage');
    };
    CommentPage.prototype.presentActionSheet = function (comment, idx) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //  title: 'Edit your Comment',
            buttons: [
                {
                    text: 'Delete Your comment',
                    role: 'destructive',
                    handler: function () {
                        var commentsParams = {
                            incidentType: _this.currentitem.incident_type,
                            incidentId: _this.currentitem.id,
                            incidentTypeId: _this.currentitem.incident_id,
                            token: window.localStorage['token'],
                            commentId: comment.id,
                            userId: window.localStorage['userid'],
                        };
                        _this.remotService.presentLoading("Wait ...");
                        _this.remotService.postData(commentsParams, 'deleteComments').subscribe(function (response) {
                            console.log(response);
                            _this.remotService.dismissLoader();
                            //console.log(idx);
                            _this.comments.splice(idx, 1);
                        }, function () {
                            _this.remotService.dismissLoader();
                            _this.remotService.presentToast('Error .');
                            console.log('error');
                        });
                        // console.log('Destructive clicked',comment,idx);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    CommentPage.prototype.sendMessage = function () {
        var _this = this;
        var commentsParams = {
            incidentType: this.currentitem.incident_type,
            incidentId: this.currentitem.id,
            incidentTypeId: this.currentitem.incident_id,
            token: window.localStorage['token'],
            comment: this.commentText,
            user_id: window.localStorage['userid'],
        };
        console.log(commentsParams);
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var newcomment = {
                    comment: _this.commentText,
                    users_full_name: window.localStorage['name'],
                    image: window.localStorage['userimage'],
                    id: response.data.id
                };
                _this.comments.push(newcomment);
                _this.commentText = '';
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    CommentPage.prototype.scrollToBottom = function () {
        // use the content's dimension to obtain the current height of the scroll
        var dimension = this.content.getContentDimensions();
        // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
        this.content.scrollTo(0, dimension.scrollHeight);
    };
    CommentPage.prototype.dismissComment = function () {
        this.viewCntrl.dismiss({ commentlength: this.comments.length });
    };
    return CommentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], CommentPage.prototype, "content", void 0);
CommentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-comment',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\comment\comment.html"*/'<ion-header class="creoyou-header">\n    \n      <ion-navbar>\n        <ion-title>Comment</ion-title>\n        <ion-buttons end>\n               \n                <button class="dismiss" (click)="dismissComment();">\n                        <ion-icon  name="close-circle"></ion-icon>\n                </button>\n         </ion-buttons>\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content>\n    \n      <ion-list *ngFor="let comment of comments;let idx = index;">\n        <ion-item  class="comment_wrap">\n            <ion-avatar  item-left>\n\n                    <img *ngIf="comment.image!=null && comment.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{comment.image}}" alt="avatar">\n                    <img *ngIf="comment.image==null || comment.image==\'\'" src="/assets/img/management.png" alt="avatar"> \n                \n            </ion-avatar>\n            <ion-item class="searcsh_right">\n                <p>{{comment.users_full_name}} <span>{{comment.creation_date | amTimeAgo:true}}</span></p>\n                <p class="user_deg">{{comment.comment}}</p>\n                <div class="comment_action">\n                    <ion-icon (click)="presentActionSheet(comment,idx)" ios="ios-more" md="md-more"></ion-icon>\n                </div>\n            </ion-item>\n        </ion-item>\n      </ion-list>\n    \n    \n    </ion-content>\n    \n    \n    <ion-footer>\n    \n          <ion-toolbar class="msg" color="footer-white">\n                <ion-textarea [(ngModel)]="commentText" rows="1" autoresize placeholder="Type Message Here..."></ion-textarea>\n            <!-- on keyboard open send button -->\n           <button ion-button end small  (click)="sendMessage()" [disabled]="msg === \'\'" *ngIf="!cambutton">\n             <i class="material-icons" >send</i>\n           </button>\n          </ion-toolbar>\n    </ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\comment\comment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], CommentPage);

//# sourceMappingURL=comment.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registration_registration__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loginhelp_loginhelp__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__socialreg_socialreg__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, remotService, modalCtrl, storage, events, fb, googlePlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.events = events;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.submitAttempt = false;
        this.registrationPage = __WEBPACK_IMPORTED_MODULE_4__registration_registration__["a" /* RegistrationPage */];
        this.isfbLoggedIn = false;
        this.storageObj = storage;
        this.loginForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])]
        });
        window.localStorage['fbprofileinfo'] = '';
    }
    LoginPage.prototype.googleLogIn = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            console.log("google login", res);
            var googleparams = {
                google_id: res.userId,
                email: res.email,
            };
            _this.remotService.presentLoading("Please wait ...");
            _this.remotService.postData(googleparams, 'googlelogin').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    var dataRes = response.data;
                    window.localStorage['usertype'] = dataRes.user_type;
                    window.localStorage['userid'] = dataRes.user_id;
                    window.localStorage['token'] = dataRes.token;
                    window.localStorage['username'] = dataRes.username;
                    window.localStorage['premium_user'] = dataRes.premium_user;
                    window.localStorage['name'] = dataRes.name;
                    // fire event in app.component to show the header
                    _this.events.publish('user:loggedin');
                    _this.remotService.presentToast('Logged in successfully.');
                }
                else {
                    var params = { data: res, type: 'google' };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__socialreg_socialreg__["a" /* SocialregPage */], params);
                    //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error!');
            });
        })
            .catch(function (err) { return console.error(err); });
    };
    LoginPage.prototype.faceBooklogin = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.isfbLoggedIn = true;
                _this.getFbUserDetail(res.authResponse.userID);
            }
            else {
                _this.isfbLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    LoginPage.prototype.getFbUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,token_for_business", ["public_profile"])
            .then(function (res) {
            console.log(res);
            var facemail = res.hasOwnProperty("email") ? res.email : null;
            var fbParams = {
                email: facemail,
                facebook_id: res.token_for_business,
            };
            _this.remotService.presentLoading("Please wait ...");
            _this.remotService.postData(fbParams, 'Facebooklogin').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    var dataRes = response.data;
                    console.log(dataRes);
                    window.localStorage['usertype'] = dataRes.user_type;
                    window.localStorage['userid'] = dataRes.user_id;
                    window.localStorage['token'] = dataRes.token;
                    window.localStorage['username'] = dataRes.username;
                    window.localStorage['premium_user'] = dataRes.premium_user;
                    window.localStorage['name'] = dataRes.name;
                    // fire event in app.component to show the header
                    _this.events.publish('user:loggedin');
                    _this.remotService.presentToast('Logged in successfully.');
                }
                else {
                    var params = { data: res, type: 'facebook' };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__socialreg_socialreg__["a" /* SocialregPage */], params);
                    //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error!');
            });
            //this.users = res;
        })
            .catch(function (e) {
            _this.remotService.presentToast("Error logging in using facebook.");
            console.log(e);
        });
    };
    LoginPage.prototype.checkLogin = function () {
        var _this = this;
        this.submitAttempt = true;
        var loginObj = this.loginForm.value;
        var loginParams = {
            username: loginObj.username,
            password: loginObj.password,
            device_tocken: window.localStorage['onesignaltoken'],
            player_id: window.localStorage['onesignalplayerid']
        };
        this.remotService.presentLoading("Verifying ...");
        this.remotService.postData(loginParams, 'userLogin').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                // this.navCtrl.push(HomePage);
                _this.remotService.presentToast('Logged in successfully.');
                var dataRes = response.data;
                window.localStorage['usertype'] = dataRes.user_type;
                window.localStorage['userid'] = parseInt(dataRes.id);
                window.localStorage['token'] = dataRes.token;
                window.localStorage['name'] = dataRes.name;
                window.localStorage['userdata'] = JSON.stringify(dataRes);
                window.localStorage['premium_user'] = dataRes.premium_user;
                // fire event in app.component to show the header
                _this.events.publish('user:loggedin');
            }
            else {
                _this.remotService.presentToast("Wrong username or password.");
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Wrong username or password.');
        });
    };
    LoginPage.prototype.getLoginHelpPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__loginhelp_loginhelp__["a" /* LoginhelpPage */]);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\login\login.html"*/'<ion-content class="ion-login-content-background" >\n    <ion-row class="logo-row">\n\n        <ion-col text-center>\n            <img src="assets/img/logo.png" class="app_logo"> \n        </ion-col>\n\n    </ion-row>\n\n    <form [formGroup]="loginForm" (ngSubmit)="checkLogin()">\n        <ion-row class="login-box">\n            <ion-col col-12 class="fld"> \n                <ion-input class="login-fld" type="text" name="username" placeholder="Username" formControlName="username"  required></ion-input>\n                <span class="error" *ngIf="loginForm.get(\'username\').hasError(\'pattern\') && (loginForm.get(\'username\').touched || submitAttempt)">\n                      Only characters and numbers allowed\n            </span>\n            <span class="error" *ngIf="loginForm.get(\'username\').hasError(\'required\') && (loginForm.get(\'username\').touched || submitAttempt)">\n                  Username is required\n        </span>\n\n    </ion-col>\n    <ion-col col-12 class="fld">  \n        <ion-input class="login-fld" type="password" placeholder="Password" formControlName="password"  required></ion-input>\n     \n        <span class="error" *ngIf="loginForm.get(\'password\').hasError(\'required\') && (loginForm.get(\'password\').touched || submitAttempt)">\n              Password is required\n        </span>\n</ion-col>\n<ion-col col-12>\n    <button ion-button class="sign-in" full type="submit" [disabled]="!loginForm.valid">Login</button>\n\n</ion-col>\n<ion-col col-12 text-center >\n    <a class="tab-item tab-item-active " (click)="getLoginHelpPage()" class="login-help" >Login Help?</a> \n</ion-col> \n</ion-row>\n\n</form>\n\n<hr class="hr-text" data-content="OR">\n\n<ion-row class="social-login-btn-group">\n    <ion-col text-center col-6>\n        <a class="face_sign" (click)="faceBooklogin()">\n            <span><img src="assets/img/facebook_icon.png"></span>\n            Facebook\n        </a>\n    </ion-col>    \n    <ion-col text-center col-6>\n        <a class="goog_sign" (click)="googleLogIn()">\n            <span><img src="assets/img/goog.png"></span>\n            Google\n        </a>\n    </ion-col> \n</ion-row>\n\n\n\n</ion-content>\n\n\n<ion-footer>\n\n    <ion-toolbar class="bar-positive already_sign">\n        <a class="tab-item tab-item-active" [navPush]="registrationPage" >New to Creoyou?<span>Sign Up</span></a>\n    </ion-toolbar>\n</ion-footer>  \n\n\n\n'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_audio__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_svg_round_progressbar__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_svg_round_progressbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular_svg_round_progressbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_base64__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_chooser__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_transfer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ionic2_calendar__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_home__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_categories_categories__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_registration_registration__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_aboutme_aboutme__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_jobs_jobs__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_portfolio_portfolio__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_connections_connections__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_settings_settings__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_feeds_feeds__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_eventscalender_eventscalender__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_notifications_notifications__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_messages_messages__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_search_search__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_photos_photos__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_videos_videos__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_audios_audios__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_loginhelp_loginhelp__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_commonmodal_commonmodal__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_socialreg_socialreg__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_taguser_taguser__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_comment_comment__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_follow_follow__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_invitefriend_invitefriend__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_messagedetails_messagedetails__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_newmessage_newmessage__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_aboutedit_aboutedit__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_photoupload_photoupload__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_photoview_photoview__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_videoupload_videoupload__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_videocomment_videocomment__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_audiocomment_audiocomment__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_audiupload_audiupload__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_albumview_albumview__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_eventcreate_eventcreate__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_eventlist_eventlist__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_eventdetails_eventdetails__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_searchfilter_searchfilter__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_jobdetails_jobdetails__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_jobapply_jobapply__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_personal_personal__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_parsonaledit_parsonaledit__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_privacy_privacy__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_otherprofile_otherprofile__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_notificationsettings_notificationsettings__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__providers_auth_service_auth_service__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__providers_reg_validator_reg_validator__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__providers_global_global__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__ionic_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__ionic_native_onesignal__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__ionic_native_google_plus__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__ionic_native_facebook__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__directives_textgrow_textgrow__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ionic_native_social_sharing__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72_ionic_tags_input__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__ionic_native_in_app_browser__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_angular2_moment__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_74_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__ionic_native_file_opener__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__ionic_native_file_path__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__ionic_native_file__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__ionic_native_android_permissions__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// Pages















































//Providers

















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* CreoYouApp */],
            __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_registration_registration__["a" /* RegistrationPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_categories_categories__["a" /* CategoriesPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_aboutme_aboutme__["a" /* AboutmePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_jobs_jobs__["a" /* JobsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_connections_connections__["a" /* ConnectionsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_portfolio_portfolio__["a" /* PortfolioPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_feeds_feeds__["a" /* FeedsPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_eventscalender_eventscalender__["a" /* EventscalenderPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_messages_messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_photos_photos__["a" /* PhotosPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_videos_videos__["a" /* VideosPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_audios_audios__["a" /* AudiosPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_loginhelp_loginhelp__["a" /* LoginhelpPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_commonmodal_commonmodal__["a" /* CommonmodalPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_socialreg_socialreg__["a" /* SocialregPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_taguser_taguser__["a" /* TaguserPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_comment_comment__["a" /* CommentPage */],
            __WEBPACK_IMPORTED_MODULE_70__directives_textgrow_textgrow__["a" /* TextgrowDirective */],
            __WEBPACK_IMPORTED_MODULE_39__pages_follow_follow__["a" /* FollowPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_invitefriend_invitefriend__["a" /* InvitefriendPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_messagedetails_messagedetails__["a" /* MessagedetailsPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_newmessage_newmessage__["a" /* NewmessagePage */],
            __WEBPACK_IMPORTED_MODULE_43__pages_aboutedit_aboutedit__["a" /* AbouteditPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_photoupload_photoupload__["a" /* PhotouploadPage */],
            __WEBPACK_IMPORTED_MODULE_45__pages_photoview_photoview__["a" /* PhotoviewPage */],
            __WEBPACK_IMPORTED_MODULE_46__pages_videoupload_videoupload__["a" /* VideouploadPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_videocomment_videocomment__["a" /* VideocommentPage */],
            __WEBPACK_IMPORTED_MODULE_48__pages_audiocomment_audiocomment__["a" /* AudiocommentPage */],
            __WEBPACK_IMPORTED_MODULE_49__pages_audiupload_audiupload__["a" /* AudiuploadPage */],
            __WEBPACK_IMPORTED_MODULE_50__pages_albumview_albumview__["a" /* AlbumviewPage */],
            __WEBPACK_IMPORTED_MODULE_51__pages_eventcreate_eventcreate__["a" /* EventcreatePage */],
            __WEBPACK_IMPORTED_MODULE_52__pages_eventlist_eventlist__["a" /* EventlistPage */],
            __WEBPACK_IMPORTED_MODULE_53__pages_eventdetails_eventdetails__["a" /* EventdetailsPage */],
            __WEBPACK_IMPORTED_MODULE_54__pages_searchfilter_searchfilter__["a" /* SearchfilterPage */],
            __WEBPACK_IMPORTED_MODULE_55__pages_jobdetails_jobdetails__["a" /* JobdetailsPage */],
            __WEBPACK_IMPORTED_MODULE_56__pages_jobapply_jobapply__["a" /* JobapplyPage */],
            __WEBPACK_IMPORTED_MODULE_57__pages_personal_personal__["a" /* PersonalPage */],
            __WEBPACK_IMPORTED_MODULE_58__pages_parsonaledit_parsonaledit__["a" /* ParsonaleditPage */],
            __WEBPACK_IMPORTED_MODULE_59__pages_privacy_privacy__["a" /* PrivacyPage */],
            __WEBPACK_IMPORTED_MODULE_60__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */],
            __WEBPACK_IMPORTED_MODULE_61__pages_notificationsettings_notificationsettings__["a" /* NotificationsettingsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_7_angular_svg_round_progressbar__["RoundProgressModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_audio__["b" /* IonicAudioModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6_ionic_audio__["c" /* defaultAudioProviderFactory */]),
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* CreoYouApp */], {}, {
                links: [
                    { loadChildren: '../pages/aboutedit/aboutedit.module#AbouteditPageModule', name: 'AbouteditPage', segment: 'aboutedit', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/aboutme/aboutme.module#AboutmePageModule', name: 'AboutmePage', segment: 'aboutme', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/albumview/albumview.module#AlbumviewPageModule', name: 'AlbumviewPage', segment: 'albumview', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/audiocomment/audiocomment.module#AudiocommentPageModule', name: 'AudiocommentPage', segment: 'audiocomment', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/audios/audios.module#AudiosPageModule', name: 'AudiosPage', segment: 'audios', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/audiupload/audiupload.module#AudiuploadPageModule', name: 'AudiuploadPage', segment: 'audiupload', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/categories/categories.module#CategoriesPageModule', name: 'CategoriesPage', segment: 'categories', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/comment/comment.module#CommentPageModule', name: 'CommentPage', segment: 'comment', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/commonmodal/commonmodal.module#CommonmodalPageModule', name: 'CommonmodalPage', segment: 'commonmodal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/connections/connections.module#ConnectionsPageModule', name: 'ConnectionsPage', segment: 'connections', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/eventcreate/eventcreate.module#EventcreatePageModule', name: 'EventcreatePage', segment: 'eventcreate', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/eventdetails/eventdetails.module#EventdetailsPageModule', name: 'EventdetailsPage', segment: 'eventdetails', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/eventlist/eventlist.module#EventlistPageModule', name: 'EventlistPage', segment: 'eventlist', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/eventscalender/eventscalender.module#EventscalenderPageModule', name: 'EventscalenderPage', segment: 'eventscalender', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/feeds/feeds.module#FeedsPageModule', name: 'FeedsPage', segment: 'feeds', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/follow/follow.module#FollowPageModule', name: 'FollowPage', segment: 'follow', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/invitefriend/invitefriend.module#InvitefriendPageModule', name: 'InvitefriendPage', segment: 'invitefriend', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/jobapply/jobapply.module#JobapplyPageModule', name: 'JobapplyPage', segment: 'jobapply', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/jobdetails/jobdetails.module#JobdetailsPageModule', name: 'JobdetailsPage', segment: 'jobdetails', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/jobs/jobs.module#JobsPageModule', name: 'JobsPage', segment: 'jobs', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/loginhelp/loginhelp.module#LoginhelpPageModule', name: 'LoginhelpPage', segment: 'loginhelp', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/messagedetails/messagedetails.module#MessagedetailsPageModule', name: 'MessagedetailsPage', segment: 'messagedetails', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/messages/messages.module#MessagesPageModule', name: 'MessagesPage', segment: 'messages', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/newmessage/newmessage.module#NewmessagePageModule', name: 'NewmessagePage', segment: 'newmessage', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notificationsettings/notificationsettings.module#NotificationsettingsPageModule', name: 'NotificationsettingsPage', segment: 'notificationsettings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/otherprofile/otherprofile.module#OtherprofilePageModule', name: 'OtherprofilePage', segment: 'otherprofile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/parsonaledit/parsonaledit.module#ParsonaleditPageModule', name: 'ParsonaleditPage', segment: 'parsonaledit', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/personal/personal.module#PersonalPageModule', name: 'PersonalPage', segment: 'personal', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/photos/photos.module#PhotosPageModule', name: 'PhotosPage', segment: 'photos', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/photoupload/photoupload.module#PhotouploadPageModule', name: 'PhotouploadPage', segment: 'photoupload', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/photoview/photoview.module#PhotoviewPageModule', name: 'PhotoviewPage', segment: 'photoview', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/popoverpages/popoverpages.module#PopoverpagesPageModule', name: 'PopoverpagesPage', segment: 'popoverpages', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/portfolio/portfolio.module#PortfolioPageModule', name: 'PortfolioPage', segment: 'portfolio', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/privacy/privacy.module#PrivacyPageModule', name: 'PrivacyPage', segment: 'privacy', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/registration/registration.module#RegistrationPageModule', name: 'RegistrationPage', segment: 'registration', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/searchfilter/searchfilter.module#SearchfilterPageModule', name: 'SearchfilterPage', segment: 'searchfilter', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/socialreg/socialreg.module#SocialregPageModule', name: 'SocialregPage', segment: 'socialreg', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/taguser/taguser.module#TaguserPageModule', name: 'TaguserPage', segment: 'taguser', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/videocomment/videocomment.module#VideocommentPageModule', name: 'VideocommentPage', segment: 'videocomment', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/videos/videos.module#VideosPageModule', name: 'VideosPage', segment: 'videos', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/videoupload/videoupload.module#VideouploadPageModule', name: 'VideouploadPage', segment: 'videoupload', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_66__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_74_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_72_ionic_tags_input__["a" /* IonTagsInputModule */],
            __WEBPACK_IMPORTED_MODULE_14_ionic2_calendar__["a" /* NgCalendarModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* CreoYouApp */],
            __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_registration_registration__["a" /* RegistrationPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_categories_categories__["a" /* CategoriesPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_aboutme_aboutme__["a" /* AboutmePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_jobs_jobs__["a" /* JobsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_connections_connections__["a" /* ConnectionsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_portfolio_portfolio__["a" /* PortfolioPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_feeds_feeds__["a" /* FeedsPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_notifications_notifications__["a" /* NotificationsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_eventscalender_eventscalender__["a" /* EventscalenderPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_messages_messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_photos_photos__["a" /* PhotosPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_videos_videos__["a" /* VideosPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_audios_audios__["a" /* AudiosPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_loginhelp_loginhelp__["a" /* LoginhelpPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_commonmodal_commonmodal__["a" /* CommonmodalPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_socialreg_socialreg__["a" /* SocialregPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_taguser_taguser__["a" /* TaguserPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_comment_comment__["a" /* CommentPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_follow_follow__["a" /* FollowPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_invitefriend_invitefriend__["a" /* InvitefriendPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_messagedetails_messagedetails__["a" /* MessagedetailsPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_newmessage_newmessage__["a" /* NewmessagePage */],
            __WEBPACK_IMPORTED_MODULE_43__pages_aboutedit_aboutedit__["a" /* AbouteditPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_photoupload_photoupload__["a" /* PhotouploadPage */],
            __WEBPACK_IMPORTED_MODULE_45__pages_photoview_photoview__["a" /* PhotoviewPage */],
            __WEBPACK_IMPORTED_MODULE_46__pages_videoupload_videoupload__["a" /* VideouploadPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_videocomment_videocomment__["a" /* VideocommentPage */],
            __WEBPACK_IMPORTED_MODULE_48__pages_audiocomment_audiocomment__["a" /* AudiocommentPage */],
            __WEBPACK_IMPORTED_MODULE_49__pages_audiupload_audiupload__["a" /* AudiuploadPage */],
            __WEBPACK_IMPORTED_MODULE_50__pages_albumview_albumview__["a" /* AlbumviewPage */],
            __WEBPACK_IMPORTED_MODULE_51__pages_eventcreate_eventcreate__["a" /* EventcreatePage */],
            __WEBPACK_IMPORTED_MODULE_52__pages_eventlist_eventlist__["a" /* EventlistPage */],
            __WEBPACK_IMPORTED_MODULE_53__pages_eventdetails_eventdetails__["a" /* EventdetailsPage */],
            __WEBPACK_IMPORTED_MODULE_54__pages_searchfilter_searchfilter__["a" /* SearchfilterPage */],
            __WEBPACK_IMPORTED_MODULE_55__pages_jobdetails_jobdetails__["a" /* JobdetailsPage */],
            __WEBPACK_IMPORTED_MODULE_56__pages_jobapply_jobapply__["a" /* JobapplyPage */],
            __WEBPACK_IMPORTED_MODULE_57__pages_personal_personal__["a" /* PersonalPage */],
            __WEBPACK_IMPORTED_MODULE_58__pages_parsonaledit_parsonaledit__["a" /* ParsonaleditPage */],
            __WEBPACK_IMPORTED_MODULE_59__pages_privacy_privacy__["a" /* PrivacyPage */],
            __WEBPACK_IMPORTED_MODULE_60__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */],
            __WEBPACK_IMPORTED_MODULE_61__pages_notificationsettings_notificationsettings__["a" /* NotificationsettingsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_62__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_63__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_64__providers_reg_validator_reg_validator__["a" /* RegValidatorProvider */],
            __WEBPACK_IMPORTED_MODULE_65__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_67__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_68__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_69__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_base64__["a" /* Base64 */],
            __WEBPACK_IMPORTED_MODULE_71__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_75__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_76__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_77__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_78__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_73__ionic_native_in_app_browser__["a" /* InAppBrowser */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 488:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreoYouApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_aboutme_aboutme__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_jobs_jobs__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_connections_connections__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_follow_follow__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_feeds_feeds__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_notifications_notifications__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_messages_messages__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_search_search__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_photos_photos__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_videos_videos__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_audios_audios__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_eventlist_eventlist__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_personal_personal__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_privacy_privacy__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_notificationsettings_notificationsettings__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_onesignal__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























var CreoYouApp = (function () {
    function CreoYouApp(platform, statusBar, splashScreen, oneSignal, events, remoteService) {
        var _this = this;
        this.oneSignal = oneSignal;
        this.events = events;
        this.remoteService = remoteService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        this.firstNavItems = [{ name: 'Home', link: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] }, { name: 'About', link: __WEBPACK_IMPORTED_MODULE_6__pages_aboutme_aboutme__["a" /* AboutmePage */] }, { name: 'Jobs', link: __WEBPACK_IMPORTED_MODULE_7__pages_jobs_jobs__["a" /* JobsPage */] }];
        this.secondNavItems = [{ name: 'Photos', link: __WEBPACK_IMPORTED_MODULE_14__pages_photos_photos__["a" /* PhotosPage */] }, { name: 'Videos', link: __WEBPACK_IMPORTED_MODULE_15__pages_videos_videos__["a" /* VideosPage */] }, { name: 'Audios', link: __WEBPACK_IMPORTED_MODULE_16__pages_audios_audios__["a" /* AudiosPage */] }];
        this.frthNavItems = [{ name: 'Upcoming', link: __WEBPACK_IMPORTED_MODULE_17__pages_eventlist_eventlist__["a" /* EventlistPage */] }, { name: 'Past', link: __WEBPACK_IMPORTED_MODULE_17__pages_eventlist_eventlist__["a" /* EventlistPage */] }];
        this.thirdNavItems = [{ name: 'Connections', link: __WEBPACK_IMPORTED_MODULE_8__pages_connections_connections__["a" /* ConnectionsPage */] }, { name: 'Following', link: __WEBPACK_IMPORTED_MODULE_9__pages_follow_follow__["a" /* FollowPage */] }];
        this.fifthNavItems = [{ name: 'Personal', link: __WEBPACK_IMPORTED_MODULE_18__pages_personal_personal__["a" /* PersonalPage */] }, { name: 'Privacy', link: __WEBPACK_IMPORTED_MODULE_19__pages_privacy_privacy__["a" /* PrivacyPage */] },
            { name: 'Notification', link: __WEBPACK_IMPORTED_MODULE_20__pages_notificationsettings_notificationsettings__["a" /* NotificationsettingsPage */] }];
        this.showmenu = false;
        this.userimage = '';
        this.notificationcount = 0;
        this.pendingfriendrequestcount = 0;
        this.pendingmessagecount = 0;
        var uId = window.localStorage['userid'];
        if (uId > 0) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
            this.userFullname = window.localStorage['name'];
            this.showmenu = true;
            this.userimage = window.localStorage['userimage'];
        }
        this.base_url = remoteService.site_url;
        platform.ready().then(function () {
            events.subscribe('creoyou:shownotifications', function () {
                console.log('show notific');
                remoteService.postData({ token: window.localStorage['token'] }, 'getCountOfNotifications').subscribe(function (response) {
                    if (response.success == 1) {
                        var rescountData = response.data;
                        _this.notificationcount = parseInt(rescountData.notificationscount);
                        _this.pendingfriendrequestcount = parseInt(rescountData.pendingrequest);
                        _this.pendingmessagecount = parseInt(rescountData.messagecount);
                    }
                    else {
                        //this.remotService.presentToast('Error loading data.');
                    }
                }, function () {
                });
            });
            //update notifications
            _this.events.publish('creoyou:shownotifications');
            events.subscribe('creoyou:hidemenu', function () {
                _this.showmenu = false;
            });
            events.subscribe('creoyou:showmenu', function () {
                _this.showmenu = true;
                //update notifications
                _this.events.publish('creoyou:shownotifications');
            });
            events.subscribe('creoyou:setprofileimage', function () {
                _this.userimage = window.localStorage['userimage'];
            });
            //listen from login controller once logged in 
            events.subscribe('user:loggedin', function () {
                _this.showmenu = true;
                _this.userFullname = window.localStorage['name'];
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
            });
            _this.navsegments = [{ 'name': '', items: _this.firstNavItems },
                { 'name': 'Portfolio', items: _this.secondNavItems },
                { 'name': 'Connections', items: _this.thirdNavItems },
                { 'name': 'Events', items: _this.frthNavItems },
                { 'name': 'Settings', items: _this.fifthNavItems }];
            _this.topMenuItems = [{ 'icon': 'md-search', 'link': __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */] },
                { 'icon': '', 'link': __WEBPACK_IMPORTED_MODULE_10__pages_feeds_feeds__["a" /* FeedsPage */] },
                { 'icon': 'md-person-add', 'link': __WEBPACK_IMPORTED_MODULE_8__pages_connections_connections__["a" /* ConnectionsPage */] },
                { 'icon': 'notifications', 'link': __WEBPACK_IMPORTED_MODULE_11__pages_notifications_notifications__["a" /* NotificationsPage */] },
                { 'icon': 'md-chatbubbles', 'link': __WEBPACK_IMPORTED_MODULE_12__pages_messages_messages__["a" /* MessagesPage */] }];
            //this.username = window.localStorage['username'];
            if (platform.is('cordova')) {
                _this.oneSignal.startInit('fcd38ba5-2264-48f1-bf30-d12ebe40b4ef', '990895596031');
                //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                _this.oneSignal.handleNotificationReceived().subscribe(function () {
                    // do something when notification is received
                    //update notifications
                    _this.events.publish('creoyou:shownotifications');
                });
                _this.oneSignal.handleNotificationOpened().subscribe(function () {
                    // do something when a notification is opened
                });
                _this.oneSignal.getIds().then(function (ids) {
                    // alert("One signal ids"+ids.userId);
                    window.localStorage['onesignalplayerid'] = ids.userId;
                    window.localStorage['onesignaltoken'] = ids.pushToken;
                });
                _this.oneSignal.endInit();
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    CreoYouApp.prototype.logOutUser = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */]);
        window.localStorage.clear();
        this.showmenu = false;
    };
    CreoYouApp.prototype.gotoPage = function (item) {
        this.nav.push(item.link, { 'name': item.name });
    };
    return CreoYouApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */])
], CreoYouApp.prototype, "nav", void 0);
CreoYouApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\app\app.html"*/'<ion-menu [content]="content">\n\n\n\n    <ion-header class="sidebar">\n        <div text-center class="profile-wrap">\n            <ion-avatar class="person-pic">\n                <img *ngIf="userimage!=\'null\' && userimage!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{userimage}}" alt="avatar">\n                <img *ngIf="userimage==\'null\' || userimage==\'\'" src="/assets/img/management.png" alt="avatar">\n            </ion-avatar>\n            <h4 text-center>{{userFullname}}</h4>\n        </div>\n    </ion-header>\n\n\n    <ion-content no-bounce class="menu-wrap">\n\n        <ion-list margin-vertical class="menus" *ngFor="let menuitem of navsegments">\n\n            <P *ngIf="menuitem.name!=\'\'" class="seperator">{{menuitem.name}}</P>\n            <button (click)="gotoPage(item)" menuClose ion-item *ngFor="let item of menuitem.items">\n                <img src="assets/img/menuicons/{{item.name|lowercase}}.png" alt="avatar">\n                <span class="menu-name">{{item.name}}</span>\n\n            </button>\n\n            <button (click)="logOutUser()" menuClose ion-item *ngIf="menuitem.name==\'Settings\'">\n                <img src="assets/img/menuicons/logout.png" alt="avatar">\n                <span class="menu-name">Logout</span>\n            </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-header class="creoyou-header" *ngIf="showmenu">\n    <ion-navbar>\n\n        <ion-row>\n            <ion-col col-4>\n                <button ion-button menuToggle>\n                    <ion-icon name="menu"></ion-icon>\n                </button>\n            </ion-col>\n\n            <ion-col col-8 text-right class="top-bar">\n                <span (click)="gotoPage(topitem)" *ngFor="let topitem of topMenuItems;let idx = index;">\n                    <ion-icon *ngIf="topitem.icon!=\'\'" name="{{topitem.icon}}"></ion-icon>\n                    <img *ngIf="topitem.icon==\'\'" src="assets/img/creoyou_loop.png">\n                    <span class="counter" *ngIf="idx==2 && pendingfriendrequestcount>0">{{pendingfriendrequestcount}}</span>\n                    <span class="counter" *ngIf="idx==3 && notificationcount>0">{{notificationcount}}</span>\n                    <span class="counter" *ngIf="idx==4 && pendingmessagecount>0">{{pendingmessagecount}}</span>\n                </span>\n            </ion-col>\n\n        </ion-row>\n    </ion-navbar>\n</ion-header>\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" class="nav-content" #content swipeBackEnabled="false">\n</ion-nav>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_22__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_21__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], CreoYouApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
    }
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], AuthServiceProvider);

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var GlobalProvider = (function () {
    function GlobalProvider() {
    }
    return GlobalProvider;
}());
GlobalProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], GlobalProvider);

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextgrowDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextgrowDirective = (function () {
    function TextgrowDirective(element) {
        this.element = element;
        console.log('Hello TextgrowDirective Directive');
    }
    TextgrowDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    TextgrowDirective.prototype.ngOnInit = function () {
        this.adjust();
    };
    TextgrowDirective.prototype.adjust = function () {
        var ta = this.element.nativeElement.querySelector("textarea");
        if (ta) {
            ta.style.overflow = "hidden";
            ta.style.height = "auto";
            ta.style.height = ta.scrollHeight + "px";
        }
    };
    return TextgrowDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("input", ["$event.target"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLTextAreaElement]),
    __metadata("design:returntype", void 0)
], TextgrowDirective.prototype, "onInput", null);
TextgrowDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: 'ion-textarea[autoresize]' // Attribute selector
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], TextgrowDirective);

//# sourceMappingURL=textgrow.js.map

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoteServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RemoteServiceProvider = (function () {
    function RemoteServiceProvider(http, loadingcntrl, toastcntrl, storage, alertCtrl) {
        this.http = http;
        this.loadingcntrl = loadingcntrl;
        this.toastcntrl = toastcntrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.labelAttribute = "name";
        this.API_URL = 'http://dev.mojolynclife.info/public/index.php/api/';
        this.site_url = 'http://mojolynclife.info/';
        this.storageObj = storage;
    }
    RemoteServiceProvider.prototype.getUserId = function () {
        return window.localStorage['userid'];
    };
    RemoteServiceProvider.prototype.getUserToken = function () {
        return window.localStorage['token'];
    };
    RemoteServiceProvider.prototype.addcard = function (data) {
        var url = this.API_URL + "/add_card";
        return this.http.post(url, data)
            .map(function (res) { return res.json(); });
    };
    RemoteServiceProvider.prototype.chatfile = function (data) {
        var url = this.API_URL + "/chatfileup/";
        return this.http.get(url, data)
            .map(function (res) { return res.json(); });
    };
    RemoteServiceProvider.prototype.getCategories = function (term) {
        var url = this.API_URL + "user-category/1?term=" + term;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    RemoteServiceProvider.prototype.checkifemailExist = function (data) {
        var url = this.API_URL + "userInfocheck";
        return this.http.post(url, data)
            .map(function (res) { return res.json(); });
    };
    RemoteServiceProvider.prototype.postData = function (data, urlname) {
        var url = "" + this.API_URL + urlname;
        return this.http.post(url, data)
            .map(function (res) { return res.json(); });
    };
    RemoteServiceProvider.prototype.getData = function (urlname) {
        var url = "" + this.API_URL + urlname;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    RemoteServiceProvider.prototype.presentLoading = function (msg) {
        this.loader = this.loadingcntrl.create({
            content: msg
        });
        this.loader.present();
    };
    RemoteServiceProvider.prototype.dismissLoader = function () {
        if (this.loader)
            this.loader.dismiss();
        this.loader = false;
    };
    RemoteServiceProvider.prototype.presentToast = function (msg) {
        var toast = this.toastcntrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    };
    RemoteServiceProvider.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    return RemoteServiceProvider;
}());
RemoteServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
], RemoteServiceProvider);

//# sourceMappingURL=remote-service.js.map

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 276,
	"./af.js": 276,
	"./ar": 277,
	"./ar-dz": 278,
	"./ar-dz.js": 278,
	"./ar-kw": 279,
	"./ar-kw.js": 279,
	"./ar-ly": 280,
	"./ar-ly.js": 280,
	"./ar-ma": 281,
	"./ar-ma.js": 281,
	"./ar-sa": 282,
	"./ar-sa.js": 282,
	"./ar-tn": 283,
	"./ar-tn.js": 283,
	"./ar.js": 277,
	"./az": 284,
	"./az.js": 284,
	"./be": 285,
	"./be.js": 285,
	"./bg": 286,
	"./bg.js": 286,
	"./bm": 287,
	"./bm.js": 287,
	"./bn": 288,
	"./bn.js": 288,
	"./bo": 289,
	"./bo.js": 289,
	"./br": 290,
	"./br.js": 290,
	"./bs": 291,
	"./bs.js": 291,
	"./ca": 292,
	"./ca.js": 292,
	"./cs": 293,
	"./cs.js": 293,
	"./cv": 294,
	"./cv.js": 294,
	"./cy": 295,
	"./cy.js": 295,
	"./da": 296,
	"./da.js": 296,
	"./de": 297,
	"./de-at": 298,
	"./de-at.js": 298,
	"./de-ch": 299,
	"./de-ch.js": 299,
	"./de.js": 297,
	"./dv": 300,
	"./dv.js": 300,
	"./el": 301,
	"./el.js": 301,
	"./en-au": 302,
	"./en-au.js": 302,
	"./en-ca": 303,
	"./en-ca.js": 303,
	"./en-gb": 304,
	"./en-gb.js": 304,
	"./en-ie": 305,
	"./en-ie.js": 305,
	"./en-nz": 306,
	"./en-nz.js": 306,
	"./eo": 307,
	"./eo.js": 307,
	"./es": 308,
	"./es-do": 309,
	"./es-do.js": 309,
	"./es-us": 310,
	"./es-us.js": 310,
	"./es.js": 308,
	"./et": 311,
	"./et.js": 311,
	"./eu": 312,
	"./eu.js": 312,
	"./fa": 313,
	"./fa.js": 313,
	"./fi": 314,
	"./fi.js": 314,
	"./fo": 315,
	"./fo.js": 315,
	"./fr": 316,
	"./fr-ca": 317,
	"./fr-ca.js": 317,
	"./fr-ch": 318,
	"./fr-ch.js": 318,
	"./fr.js": 316,
	"./fy": 319,
	"./fy.js": 319,
	"./gd": 320,
	"./gd.js": 320,
	"./gl": 321,
	"./gl.js": 321,
	"./gom-latn": 322,
	"./gom-latn.js": 322,
	"./gu": 323,
	"./gu.js": 323,
	"./he": 324,
	"./he.js": 324,
	"./hi": 325,
	"./hi.js": 325,
	"./hr": 326,
	"./hr.js": 326,
	"./hu": 327,
	"./hu.js": 327,
	"./hy-am": 328,
	"./hy-am.js": 328,
	"./id": 329,
	"./id.js": 329,
	"./is": 330,
	"./is.js": 330,
	"./it": 331,
	"./it.js": 331,
	"./ja": 332,
	"./ja.js": 332,
	"./jv": 333,
	"./jv.js": 333,
	"./ka": 334,
	"./ka.js": 334,
	"./kk": 335,
	"./kk.js": 335,
	"./km": 336,
	"./km.js": 336,
	"./kn": 337,
	"./kn.js": 337,
	"./ko": 338,
	"./ko.js": 338,
	"./ky": 339,
	"./ky.js": 339,
	"./lb": 340,
	"./lb.js": 340,
	"./lo": 341,
	"./lo.js": 341,
	"./lt": 342,
	"./lt.js": 342,
	"./lv": 343,
	"./lv.js": 343,
	"./me": 344,
	"./me.js": 344,
	"./mi": 345,
	"./mi.js": 345,
	"./mk": 346,
	"./mk.js": 346,
	"./ml": 347,
	"./ml.js": 347,
	"./mr": 348,
	"./mr.js": 348,
	"./ms": 349,
	"./ms-my": 350,
	"./ms-my.js": 350,
	"./ms.js": 349,
	"./my": 351,
	"./my.js": 351,
	"./nb": 352,
	"./nb.js": 352,
	"./ne": 353,
	"./ne.js": 353,
	"./nl": 354,
	"./nl-be": 355,
	"./nl-be.js": 355,
	"./nl.js": 354,
	"./nn": 356,
	"./nn.js": 356,
	"./pa-in": 357,
	"./pa-in.js": 357,
	"./pl": 358,
	"./pl.js": 358,
	"./pt": 359,
	"./pt-br": 360,
	"./pt-br.js": 360,
	"./pt.js": 359,
	"./ro": 361,
	"./ro.js": 361,
	"./ru": 362,
	"./ru.js": 362,
	"./sd": 363,
	"./sd.js": 363,
	"./se": 364,
	"./se.js": 364,
	"./si": 365,
	"./si.js": 365,
	"./sk": 366,
	"./sk.js": 366,
	"./sl": 367,
	"./sl.js": 367,
	"./sq": 368,
	"./sq.js": 368,
	"./sr": 369,
	"./sr-cyrl": 370,
	"./sr-cyrl.js": 370,
	"./sr.js": 369,
	"./ss": 371,
	"./ss.js": 371,
	"./sv": 372,
	"./sv.js": 372,
	"./sw": 373,
	"./sw.js": 373,
	"./ta": 374,
	"./ta.js": 374,
	"./te": 375,
	"./te.js": 375,
	"./tet": 376,
	"./tet.js": 376,
	"./th": 377,
	"./th.js": 377,
	"./tl-ph": 378,
	"./tl-ph.js": 378,
	"./tlh": 379,
	"./tlh.js": 379,
	"./tr": 380,
	"./tr.js": 380,
	"./tzl": 381,
	"./tzl.js": 381,
	"./tzm": 382,
	"./tzm-latn": 383,
	"./tzm-latn.js": 383,
	"./tzm.js": 382,
	"./uk": 384,
	"./uk.js": 384,
	"./ur": 385,
	"./ur.js": 385,
	"./uz": 386,
	"./uz-latn": 387,
	"./uz-latn.js": 387,
	"./uz.js": 386,
	"./vi": 388,
	"./vi.js": 388,
	"./x-pseudo": 389,
	"./x-pseudo.js": 389,
	"./yo": 390,
	"./yo.js": 390,
	"./zh-cn": 391,
	"./zh-cn.js": 391,
	"./zh-hk": 392,
	"./zh-hk.js": 392,
	"./zh-tw": 393,
	"./zh-tw.js": 393
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 503;

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegValidatorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the RegValidatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RegValidatorProvider = (function () {
    function RegValidatorProvider(remotService) {
        this.remotService = remotService;
        this.countryCodes = [{
                name: "United States",
                dial_code: "+1",
                code: "US"
            }, {
                name: "Israel",
                dial_code: "+972",
                code: "IL"
            }, {
                name: "Afghanistan",
                dial_code: "+93",
                code: "AF"
            }, {
                name: "Albania",
                dial_code: "+355",
                code: "AL"
            }, {
                name: "Algeria",
                dial_code: "+213",
                code: "DZ"
            }, {
                name: "AmericanSamoa",
                dial_code: "+1 684",
                code: "AS"
            }, {
                name: "Andorra",
                dial_code: "+376",
                code: "AD"
            }, {
                name: "Angola",
                dial_code: "+244",
                code: "AO"
            }, {
                name: "Anguilla",
                dial_code: "+1 264",
                code: "AI"
            }, {
                name: "Antigua and Barbuda",
                dial_code: "+1268",
                code: "AG"
            }, {
                name: "Argentina",
                dial_code: "+54",
                code: "AR"
            }, {
                name: "Armenia",
                dial_code: "+374",
                code: "AM"
            }, {
                name: "Aruba",
                dial_code: "+297",
                code: "AW"
            }, {
                name: "Australia",
                dial_code: "+61",
                code: "AU"
            }, {
                name: "Austria",
                dial_code: "+43",
                code: "AT"
            }, {
                name: "Azerbaijan",
                dial_code: "+994",
                code: "AZ"
            }, {
                name: "Bahamas",
                dial_code: "+1 242",
                code: "BS"
            }, {
                name: "Bahrain",
                dial_code: "+973",
                code: "BH"
            }, {
                name: "Bangladesh",
                dial_code: "+880",
                code: "BD"
            }, {
                name: "Barbados",
                dial_code: "+1 246",
                code: "BB"
            }, {
                name: "Belarus",
                dial_code: "+375",
                code: "BY"
            }, {
                name: "Belgium",
                dial_code: "+32",
                code: "BE"
            }, {
                name: "Belize",
                dial_code: "+501",
                code: "BZ"
            }, {
                name: "Benin",
                dial_code: "+229",
                code: "BJ"
            }, {
                name: "Bermuda",
                dial_code: "+1 441",
                code: "BM"
            }, {
                name: "Bhutan",
                dial_code: "+975",
                code: "BT"
            }, {
                name: "Bosnia and Herzegovina",
                dial_code: "+387",
                code: "BA"
            }, {
                name: "Botswana",
                dial_code: "+267",
                code: "BW"
            }, {
                name: "Brazil",
                dial_code: "+55",
                code: "BR"
            }, {
                name: "British Indian Ocean Territory",
                dial_code: "+246",
                code: "IO"
            }, {
                name: "Bulgaria",
                dial_code: "+359",
                code: "BG"
            }, {
                name: "Burkina Faso",
                dial_code: "+226",
                code: "BF"
            }, {
                name: "Burundi",
                dial_code: "+257",
                code: "BI"
            }, {
                name: "Cambodia",
                dial_code: "+855",
                code: "KH"
            }, {
                name: "Cameroon",
                dial_code: "+237",
                code: "CM"
            }, {
                name: "Canada",
                dial_code: "+1",
                code: "CA"
            }, {
                name: "Cape Verde",
                dial_code: "+238",
                code: "CV"
            }, {
                name: "Cayman Islands",
                dial_code: "+ 345",
                code: "KY"
            }, {
                name: "Central African Republic",
                dial_code: "+236",
                code: "CF"
            }, {
                name: "Chad",
                dial_code: "+235",
                code: "TD"
            }, {
                name: "Chile",
                dial_code: "+56",
                code: "CL"
            }, {
                name: "China",
                dial_code: "+86",
                code: "CN"
            }, {
                name: "Christmas Island",
                dial_code: "+61",
                code: "CX"
            }, {
                name: "Colombia",
                dial_code: "+57",
                code: "CO"
            }, {
                name: "Comoros",
                dial_code: "+269",
                code: "KM"
            }, {
                name: "Congo",
                dial_code: "+242",
                code: "CG"
            }, {
                name: "Cook Islands",
                dial_code: "+682",
                code: "CK"
            }, {
                name: "Costa Rica",
                dial_code: "+506",
                code: "CR"
            }, {
                name: "Croatia",
                dial_code: "+385",
                code: "HR"
            }, {
                name: "Cuba",
                dial_code: "+53",
                code: "CU"
            }, {
                name: "Cyprus",
                dial_code: "+537",
                code: "CY"
            }, {
                name: "Czech Republic",
                dial_code: "+420",
                code: "CZ"
            }, {
                name: "Denmark",
                dial_code: "+45",
                code: "DK"
            }, {
                name: "Djibouti",
                dial_code: "+253",
                code: "DJ"
            }, {
                name: "Dominica",
                dial_code: "+1 767",
                code: "DM"
            }, {
                name: "Dominican Republic",
                dial_code: "+1 849",
                code: "DO"
            }, {
                name: "Ecuador",
                dial_code: "+593",
                code: "EC"
            }, {
                name: "Egypt",
                dial_code: "+20",
                code: "EG"
            }, {
                name: "El Salvador",
                dial_code: "+503",
                code: "SV"
            }, {
                name: "Equatorial Guinea",
                dial_code: "+240",
                code: "GQ"
            }, {
                name: "Eritrea",
                dial_code: "+291",
                code: "ER"
            }, {
                name: "Estonia",
                dial_code: "+372",
                code: "EE"
            }, {
                name: "Ethiopia",
                dial_code: "+251",
                code: "ET"
            }, {
                name: "Faroe Islands",
                dial_code: "+298",
                code: "FO"
            }, {
                name: "Fiji",
                dial_code: "+679",
                code: "FJ"
            }, {
                name: "Finland",
                dial_code: "+358",
                code: "FI"
            }, {
                name: "France",
                dial_code: "+33",
                code: "FR"
            }, {
                name: "French Guiana",
                dial_code: "+594",
                code: "GF"
            }, {
                name: "French Polynesia",
                dial_code: "+689",
                code: "PF"
            }, {
                name: "Gabon",
                dial_code: "+241",
                code: "GA"
            }, {
                name: "Gambia",
                dial_code: "+220",
                code: "GM"
            }, {
                name: "Georgia",
                dial_code: "+995",
                code: "GE"
            }, {
                name: "Germany",
                dial_code: "+49",
                code: "DE"
            }, {
                name: "Ghana",
                dial_code: "+233",
                code: "GH"
            }, {
                name: "Gibraltar",
                dial_code: "+350",
                code: "GI"
            }, {
                name: "Greece",
                dial_code: "+30",
                code: "GR"
            }, {
                name: "Greenland",
                dial_code: "+299",
                code: "GL"
            }, {
                name: "Grenada",
                dial_code: "+1 473",
                code: "GD"
            }, {
                name: "Guadeloupe",
                dial_code: "+590",
                code: "GP"
            }, {
                name: "Guam",
                dial_code: "+1 671",
                code: "GU"
            }, {
                name: "Guatemala",
                dial_code: "+502",
                code: "GT"
            }, {
                name: "Guinea",
                dial_code: "+224",
                code: "GN"
            }, {
                name: "Guinea-Bissau",
                dial_code: "+245",
                code: "GW"
            }, {
                name: "Guyana",
                dial_code: "+595",
                code: "GY"
            }, {
                name: "Haiti",
                dial_code: "+509",
                code: "HT"
            }, {
                name: "Honduras",
                dial_code: "+504",
                code: "HN"
            }, {
                name: "Hungary",
                dial_code: "+36",
                code: "HU"
            }, {
                name: "Iceland",
                dial_code: "+354",
                code: "IS"
            }, {
                name: "India",
                dial_code: "+91",
                code: "IN"
            }, {
                name: "Indonesia",
                dial_code: "+62",
                code: "ID"
            }, {
                name: "Iraq",
                dial_code: "+964",
                code: "IQ"
            }, {
                name: "Ireland",
                dial_code: "+353",
                code: "IE"
            }, {
                name: "Italy",
                dial_code: "+39",
                code: "IT"
            }, {
                name: "Jamaica",
                dial_code: "+1 876",
                code: "JM"
            }, {
                name: "Japan",
                dial_code: "+81",
                code: "JP"
            }, {
                name: "Jordan",
                dial_code: "+962",
                code: "JO"
            }, {
                name: "Kazakhstan",
                dial_code: "+7 7",
                code: "KZ"
            }, {
                name: "Kenya",
                dial_code: "+254",
                code: "KE"
            }, {
                name: "Kiribati",
                dial_code: "+686",
                code: "KI"
            }, {
                name: "Kuwait",
                dial_code: "+965",
                code: "KW"
            }, {
                name: "Kyrgyzstan",
                dial_code: "+996",
                code: "KG"
            }, {
                name: "Latvia",
                dial_code: "+371",
                code: "LV"
            }, {
                name: "Lebanon",
                dial_code: "+961",
                code: "LB"
            }, {
                name: "Lesotho",
                dial_code: "+266",
                code: "LS"
            }, {
                name: "Liberia",
                dial_code: "+231",
                code: "LR"
            }, {
                name: "Liechtenstein",
                dial_code: "+423",
                code: "LI"
            }, {
                name: "Lithuania",
                dial_code: "+370",
                code: "LT"
            }, {
                name: "Luxembourg",
                dial_code: "+352",
                code: "LU"
            }, {
                name: "Madagascar",
                dial_code: "+261",
                code: "MG"
            }, {
                name: "Malawi",
                dial_code: "+265",
                code: "MW"
            }, {
                name: "Malaysia",
                dial_code: "+60",
                code: "MY"
            }, {
                name: "Maldives",
                dial_code: "+960",
                code: "MV"
            }, {
                name: "Mali",
                dial_code: "+223",
                code: "ML"
            }, {
                name: "Malta",
                dial_code: "+356",
                code: "MT"
            }, {
                name: "Marshall Islands",
                dial_code: "+692",
                code: "MH"
            }, {
                name: "Martinique",
                dial_code: "+596",
                code: "MQ"
            }, {
                name: "Mauritania",
                dial_code: "+222",
                code: "MR"
            }, {
                name: "Mauritius",
                dial_code: "+230",
                code: "MU"
            }, {
                name: "Mayotte",
                dial_code: "+262",
                code: "YT"
            }, {
                name: "Mexico",
                dial_code: "+52",
                code: "MX"
            }, {
                name: "Monaco",
                dial_code: "+377",
                code: "MC"
            }, {
                name: "Mongolia",
                dial_code: "+976",
                code: "MN"
            }, {
                name: "Montenegro",
                dial_code: "+382",
                code: "ME"
            }, {
                name: "Montserrat",
                dial_code: "+1664",
                code: "MS"
            }, {
                name: "Morocco",
                dial_code: "+212",
                code: "MA"
            }, {
                name: "Myanmar",
                dial_code: "+95",
                code: "MM"
            }, {
                name: "Namibia",
                dial_code: "+264",
                code: "NA"
            }, {
                name: "Nauru",
                dial_code: "+674",
                code: "NR"
            }, {
                name: "Nepal",
                dial_code: "+977",
                code: "NP"
            }, {
                name: "Netherlands",
                dial_code: "+31",
                code: "NL"
            }, {
                name: "Netherlands Antilles",
                dial_code: "+599",
                code: "AN"
            }, {
                name: "New Caledonia",
                dial_code: "+687",
                code: "NC"
            }, {
                name: "New Zealand",
                dial_code: "+64",
                code: "NZ"
            }, {
                name: "Nicaragua",
                dial_code: "+505",
                code: "NI"
            }, {
                name: "Niger",
                dial_code: "+227",
                code: "NE"
            }, {
                name: "Nigeria",
                dial_code: "+234",
                code: "NG"
            }, {
                name: "Niue",
                dial_code: "+683",
                code: "NU"
            }, {
                name: "Norfolk Island",
                dial_code: "+672",
                code: "NF"
            }, {
                name: "Northern Mariana Islands",
                dial_code: "+1 670",
                code: "MP"
            }, {
                name: "Norway",
                dial_code: "+47",
                code: "NO"
            }, {
                name: "Oman",
                dial_code: "+968",
                code: "OM"
            }, {
                name: "Pakistan",
                dial_code: "+92",
                code: "PK"
            }, {
                name: "Palau",
                dial_code: "+680",
                code: "PW"
            }, {
                name: "Panama",
                dial_code: "+507",
                code: "PA"
            }, {
                name: "Papua New Guinea",
                dial_code: "+675",
                code: "PG"
            }, {
                name: "Paraguay",
                dial_code: "+595",
                code: "PY"
            }, {
                name: "Peru",
                dial_code: "+51",
                code: "PE"
            }, {
                name: "Philippines",
                dial_code: "+63",
                code: "PH"
            }, {
                name: "Poland",
                dial_code: "+48",
                code: "PL"
            }, {
                name: "Portugal",
                dial_code: "+351",
                code: "PT"
            }, {
                name: "Puerto Rico",
                dial_code: "+1 939",
                code: "PR"
            }, {
                name: "Qatar",
                dial_code: "+974",
                code: "QA"
            }, {
                name: "Romania",
                dial_code: "+40",
                code: "RO"
            }, {
                name: "Rwanda",
                dial_code: "+250",
                code: "RW"
            }, {
                name: "Samoa",
                dial_code: "+685",
                code: "WS"
            }, {
                name: "San Marino",
                dial_code: "+378",
                code: "SM"
            }, {
                name: "Saudi Arabia",
                dial_code: "+966",
                code: "SA"
            }, {
                name: "Senegal",
                dial_code: "+221",
                code: "SN"
            }, {
                name: "Serbia",
                dial_code: "+381",
                code: "RS"
            }, {
                name: "Seychelles",
                dial_code: "+248",
                code: "SC"
            }, {
                name: "Sierra Leone",
                dial_code: "+232",
                code: "SL"
            }, {
                name: "Singapore",
                dial_code: "+65",
                code: "SG"
            }, {
                name: "Slovakia",
                dial_code: "+421",
                code: "SK"
            }, {
                name: "Slovenia",
                dial_code: "+386",
                code: "SI"
            }, {
                name: "Solomon Islands",
                dial_code: "+677",
                code: "SB"
            }, {
                name: "South Africa",
                dial_code: "+27",
                code: "ZA"
            }, {
                name: "South Georgia and the South Sandwich Islands",
                dial_code: "+500",
                code: "GS"
            }, {
                name: "Spain",
                dial_code: "+34",
                code: "ES"
            }, {
                name: "Sri Lanka",
                dial_code: "+94",
                code: "LK"
            }, {
                name: "Sudan",
                dial_code: "+249",
                code: "SD"
            }, {
                name: "Suriname",
                dial_code: "+597",
                code: "SR"
            }, {
                name: "Swaziland",
                dial_code: "+268",
                code: "SZ"
            }, {
                name: "Sweden",
                dial_code: "+46",
                code: "SE"
            }, {
                name: "Switzerland",
                dial_code: "+41",
                code: "CH"
            }, {
                name: "Tajikistan",
                dial_code: "+992",
                code: "TJ"
            }, {
                name: "Thailand",
                dial_code: "+66",
                code: "TH"
            }, {
                name: "Togo",
                dial_code: "+228",
                code: "TG"
            }, {
                name: "Tokelau",
                dial_code: "+690",
                code: "TK"
            }, {
                name: "Tonga",
                dial_code: "+676",
                code: "TO"
            }, {
                name: "Trinidad and Tobago",
                dial_code: "+1 868",
                code: "TT"
            }, {
                name: "Tunisia",
                dial_code: "+216",
                code: "TN"
            }, {
                name: "Turkey",
                dial_code: "+90",
                code: "TR"
            }, {
                name: "Turkmenistan",
                dial_code: "+993",
                code: "TM"
            }, {
                name: "Turks and Caicos Islands",
                dial_code: "+1 649",
                code: "TC"
            }, {
                name: "Tuvalu",
                dial_code: "+688",
                code: "TV"
            }, {
                name: "Uganda",
                dial_code: "+256",
                code: "UG"
            }, {
                name: "Ukraine",
                dial_code: "+380",
                code: "UA"
            }, {
                name: "United Arab Emirates",
                dial_code: "+971",
                code: "AE"
            }, {
                name: "United Kingdom",
                dial_code: "+44",
                code: "GB"
            }, {
                name: "Uruguay",
                dial_code: "+598",
                code: "UY"
            }, {
                name: "Uzbekistan",
                dial_code: "+998",
                code: "UZ"
            }, {
                name: "Vanuatu",
                dial_code: "+678",
                code: "VU"
            }, {
                name: "Wallis and Futuna",
                dial_code: "+681",
                code: "WF"
            }, {
                name: "Yemen",
                dial_code: "+967",
                code: "YE"
            }, {
                name: "Zambia",
                dial_code: "+260",
                code: "ZM"
            }, {
                name: "Zimbabwe",
                dial_code: "+263",
                code: "ZW"
            }, {
                name: "land Islands",
                dial_code: "",
                code: "AX"
            }, {
                name: "Antarctica",
                dial_code: null,
                code: "AQ"
            }, {
                name: "Bolivia, Plurinational State of",
                dial_code: "+591",
                code: "BO"
            }, {
                name: "Brunei Darussalam",
                dial_code: "+673",
                code: "BN"
            }, {
                name: "Cocos (Keeling) Islands",
                dial_code: "+61",
                code: "CC"
            }, {
                name: "Congo, The Democratic Republic of the",
                dial_code: "+243",
                code: "CD"
            }, {
                name: "Cote d'Ivoire",
                dial_code: "+225",
                code: "CI"
            }, {
                name: "Falkland Islands (Malvinas)",
                dial_code: "+500",
                code: "FK"
            }, {
                name: "Guernsey",
                dial_code: "+44",
                code: "GG"
            }, {
                name: "Holy See (Vatican City State)",
                dial_code: "+379",
                code: "VA"
            }, {
                name: "Hong Kong",
                dial_code: "+852",
                code: "HK"
            }, {
                name: "Iran, Islamic Republic of",
                dial_code: "+98",
                code: "IR"
            }, {
                name: "Isle of Man",
                dial_code: "+44",
                code: "IM"
            }, {
                name: "Jersey",
                dial_code: "+44",
                code: "JE"
            }, {
                name: "Korea, Democratic People's Republic of",
                dial_code: "+850",
                code: "KP"
            }, {
                name: "Korea, Republic of",
                dial_code: "+82",
                code: "KR"
            }, {
                name: "Lao People's Democratic Republic",
                dial_code: "+856",
                code: "LA"
            }, {
                name: "Libyan Arab Jamahiriya",
                dial_code: "+218",
                code: "LY"
            }, {
                name: "Macao",
                dial_code: "+853",
                code: "MO"
            }, {
                name: "Macedonia, The Former Yugoslav Republic of",
                dial_code: "+389",
                code: "MK"
            }, {
                name: "Micronesia, Federated States of",
                dial_code: "+691",
                code: "FM"
            }, {
                name: "Moldova, Republic of",
                dial_code: "+373",
                code: "MD"
            }, {
                name: "Mozambique",
                dial_code: "+258",
                code: "MZ"
            }, {
                name: "Palestinian Territory, Occupied",
                dial_code: "+970",
                code: "PS"
            }, {
                name: "Pitcairn",
                dial_code: "+872",
                code: "PN"
            }, {
                name: "Réunion",
                dial_code: "+262",
                code: "RE"
            }, {
                name: "Russia",
                dial_code: "+7",
                code: "RU"
            }, {
                name: "Saint Barthélemy",
                dial_code: "+590",
                code: "BL"
            }, {
                name: "Saint Helena, Ascension and Tristan Da Cunha",
                dial_code: "+290",
                code: "SH"
            }, {
                name: "Saint Kitts and Nevis",
                dial_code: "+1 869",
                code: "KN"
            }, {
                name: "Saint Lucia",
                dial_code: "+1 758",
                code: "LC"
            }, {
                name: "Saint Martin",
                dial_code: "+590",
                code: "MF"
            }, {
                name: "Saint Pierre and Miquelon",
                dial_code: "+508",
                code: "PM"
            }, {
                name: "Saint Vincent and the Grenadines",
                dial_code: "+1 784",
                code: "VC"
            }, {
                name: "Sao Tome and Principe",
                dial_code: "+239",
                code: "ST"
            }, {
                name: "Somalia",
                dial_code: "+252",
                code: "SO"
            }, {
                name: "Svalbard and Jan Mayen",
                dial_code: "+47",
                code: "SJ"
            }, {
                name: "Syrian Arab Republic",
                dial_code: "+963",
                code: "SY"
            }, {
                name: "Taiwan, Province of China",
                dial_code: "+886",
                code: "TW"
            }, {
                name: "Tanzania, United Republic of",
                dial_code: "+255",
                code: "TZ"
            }, {
                name: "Timor-Leste",
                dial_code: "+670",
                code: "TL"
            }, {
                name: "Venezuela, Bolivarian Republic of",
                dial_code: "+58",
                code: "VE"
            }, {
                name: "Viet Nam",
                dial_code: "+84",
                code: "VN"
            }, {
                name: "Virgin Islands, British",
                dial_code: "+1 284",
                code: "VG"
            }, {
                name: "Virgin Islands, U.S.",
                dial_code: "+1 340",
                code: "VI"
            }];
        console.log('Hello RegValidatorProvider Provider');
    }
    RegValidatorProvider.prototype.getCountryCode = function () {
        return this.countryCodes;
    };
    RegValidatorProvider.prototype.mailFormat = function () {
        return function (control) {
            var EMAIL_REGEXP = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
            if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                return { "incorrectMailFormat": true };
            }
        };
    };
    RegValidatorProvider.prototype.checkuniquevalueoffield = function (field_name, user_type) {
        var _this = this;
        return function (control) {
            return new Promise(function (resolve) {
                control.valueChanges.debounceTime(700).subscribe(function (search) {
                    _this.remotService.checkifemailExist({ user_type: user_type, field_name: field_name,
                        field_value: control.value }).subscribe(function (res) {
                        if (res.success == 1) {
                            resolve(null);
                        }
                        else {
                            resolve({ 'Inuse': true });
                        }
                    }, function (err) {
                        resolve({ 'Inuse': true });
                    });
                });
            });
        };
    };
    RegValidatorProvider.prototype.equalto = function (field_name) {
        return function (control) {
            var input = control.value;
            var isValid = control.root.value[field_name] == input;
            if (!isValid)
                return { 'equalTo': { isValid: isValid } };
            else
                return null;
        };
    };
    return RegValidatorProvider;
}());
RegValidatorProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], RegValidatorProvider);

//# sourceMappingURL=reg-validator.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutmePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_aboutedit_aboutedit__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_categories_categories__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutmePage = (function () {
    function AboutmePage(navCtrl, alertCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.abouteditPage = __WEBPACK_IMPORTED_MODULE_3__pages_aboutedit_aboutedit__["a" /* AbouteditPage */];
        this.touserid = 0;
        this.languages = [];
        this.achievements = [];
        this.interests = [];
        this.works = [];
        this.exibitions = [];
        this.statusprivacy = 1;
        this.touserid = navParams.get('touserid') ? navParams.get('touserid') : window.localStorage['userid'];
        console.log(this.touserid);
        this.base_url = this.remotService.site_url;
        this.currentuserid = window.localStorage['userid'];
        this.initviewaboutData();
    }
    AboutmePage.prototype.initviewaboutData = function () {
        var _this = this;
        var DataToSend = {
            user_id: this.touserid,
            to_id: this.touserid,
            token: window.localStorage['token']
        };
        console.log(DataToSend);
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(DataToSend, 'AboutmeDetails').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                if (response.data.hasOwnProperty('education'))
                    _this.education = response.data.education;
                if (response.data.hasOwnProperty('personalDetails'))
                    _this.personaldetails = response.data.personalDetails;
                if (response.data.hasOwnProperty('language'))
                    _this.languages = response.data.language;
                if (response.data.hasOwnProperty('awards'))
                    _this.achievements = response.data.awards;
                if (response.data.hasOwnProperty('interest'))
                    _this.interests = response.data.interest;
                if (response.data.hasOwnProperty('work'))
                    _this.works = response.data.work;
                if (response.data.hasOwnProperty('skills'))
                    _this.skills = response.data.skills;
                if (response.data.hasOwnProperty('creative_field'))
                    _this.creativefield = response.data.creative_field;
                if (response.data.hasOwnProperty('course'))
                    _this.courses = response.data.course;
                if (response.data.hasOwnProperty('certifications'))
                    _this.certifications = response.data.certifications;
                if (response.data.hasOwnProperty('exibition'))
                    _this.exibitions = response.data.exibition;
                if (response.data.hasOwnProperty('statement'))
                    _this.statement = response.data.statement;
                if (response.data.hasOwnProperty('custom'))
                    _this.customone = response.data.custom;
                //   console.log(this.statement);
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    AboutmePage.prototype.editCreativeField = function (creativeFld) {
        var _this = this;
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_categories_categories__["a" /* CategoriesPage */]);
        categoryModal.onDidDismiss(function (data) {
            // Do things with data coming from modal, for instance :
            if (data.hasOwnProperty("id")) {
                //console.log("GOt from modal", data);
                _this.creativefield = { 'category': data.name, 'category_id': data.id };
                var catId = data.id > 0 ? data.id : data.name;
                _this.paramsObj = {
                    user_id: window.localStorage['userid'],
                    token: window.localStorage['token'],
                    cat_id: catId,
                    usertype: window.localStorage['usertype']
                };
                _this.aboutApiAction('EditCreativeField');
            }
        });
        categoryModal.present();
    };
    AboutmePage.prototype.presentActions = function (edittype, editparam) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Actions',
            buttons: [
                {
                    text: 'Edit',
                    handler: function () {
                        _this.editDatauser(edittype, editparam);
                    }
                }, {
                    text: 'Delete',
                    handler: function () {
                        _this.rmvDatauser(edittype, editparam);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AboutmePage.prototype.editDatauser = function (edittype, editparam) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_aboutedit_aboutedit__["a" /* AbouteditPage */], { 'editsection': edittype, 'editparam': editparam, "parentPage": this });
    };
    AboutmePage.prototype.rmvDatauser = function (edittype, editparam) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Remove Item',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        if (edittype == 'education') {
                            _this.paramsObj = { 'edu_id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteEducation');
                        }
                        if (edittype == 'work') {
                            _this.paramsObj = { 'work_id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteworkExperience');
                        }
                        if (edittype == 'award') {
                            _this.paramsObj = { 'id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteaward');
                        }
                        if (edittype == 'course') {
                            _this.paramsObj = { 'cou_id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteCourses');
                        }
                        if (edittype == 'certificate') {
                            _this.paramsObj = { 'cer_id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteCertifications');
                        }
                        if (edittype == 'exhibition') {
                            _this.paramsObj = { 'exi_id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteExibition');
                        }
                        if (edittype == 'language') {
                            _this.paramsObj = { 'id': editparam.id, token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteLanguage');
                        }
                        if (edittype == 'customone') {
                            _this.paramsObj = { 'id': editparam.id, 'user_id': window.localStorage['userid'], token: window.localStorage['token'] };
                            _this.aboutApiAction('deleteCustomSection');
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    AboutmePage.prototype.editPrivacy = function (edittype) {
        var _this = this;
        this.paramsObj = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            type: edittype
        };
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                    text: 'Public',
                    handler: function () {
                        _this.statusprivacy = 1;
                        _this.paramsObj['value'] = _this.statusprivacy;
                        _this.aboutApiAction('editAboutPrivacy');
                    }
                },
                {
                    text: 'Connection only',
                    handler: function () {
                        _this.statusprivacy = 2;
                        _this.paramsObj['value'] = _this.statusprivacy;
                        _this.aboutApiAction('editAboutPrivacy');
                    }
                },
                {
                    text: 'Connection & Followers',
                    handler: function () {
                        _this.statusprivacy = 3;
                        _this.paramsObj['value'] = _this.statusprivacy;
                        _this.aboutApiAction('editAboutPrivacy');
                    }
                },
                {
                    text: 'Only me',
                    handler: function () {
                        _this.statusprivacy = 4;
                        _this.paramsObj['value'] = _this.statusprivacy;
                        _this.aboutApiAction('editAboutPrivacy');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AboutmePage.prototype.aboutApiAction = function (url) {
        var _this = this;
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(this.paramsObj, url).subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.initviewaboutData();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    AboutmePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad AboutmePage');
    };
    return AboutmePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], AboutmePage.prototype, "navBar", void 0);
AboutmePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-aboutme',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\aboutme\aboutme.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>About</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="content-background">\n\n    <ion-grid>\n        <!-- <ion-row>\n        <ion-col class="about_button">\n          <button [navPush]="abouteditPage" block ion-button color="light" ><ion-icon name="create"></ion-icon>  Edit about</button>\n        </ion-col>\n      </ion-row> -->\n\n        <ion-row>\n\n            <ion-col *ngIf="(creativefield?.category!=null && creativefield?.category!=\'\') || touserid == currentuserid" class="aobut_content"\n                col-12>\n                <h3>Creative Field\n                    <span *ngIf="touserid == currentuserid" (click)="editCreativeField(creativefield);" class="addIconWrap">\n                        <ion-icon name="create"></ion-icon>\n                    </span>\n                    <!-- <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'creativefield\');" class="addIconWrap">\n                                <ion-icon name="lock"></ion-icon>\n                        </span> -->\n                </h3>\n                <p>{{creativefield?.category}}</p>\n            </ion-col>\n\n            <ion-col *ngIf="personaldetails?.country!=null || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>Location\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'location\',personaldetails);" class="addIconWrap">\n                        <ion-icon name="create"></ion-icon>\n                    </span>\n                    <!-- <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'location\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                </span> -->\n                </h3>\n                <p>\n                    <span *ngIf="personaldetails?.city!=null">{{personaldetails?.city}},</span>\n                    <span *ngIf="personaldetails?.state!=null">{{personaldetails?.state}},</span>\n                    <span *ngIf="personaldetails?.country!=null">{{personaldetails?.country}}</span>\n                    <span *ngIf="personaldetails?.zip_code!=null"> &nbsp;{{personaldetails?.zip_code}}</span>\n                </p>\n            </ion-col>\n\n            <ion-col *ngIf="(personaldetails?.website_url!=null && personaldetails?.website_url!=\'\') || touserid == currentuserid" class="aobut_content"\n                col-12>\n                <h3>Website url\n                    <span (click)="editDatauser(\'weburl\',personaldetails);" class="addIconWrap">\n                        <ion-icon name="create"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'weblink\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n                <p>{{personaldetails?.website_url}}</p>\n            </ion-col>\n\n\n\n            <ion-col *ngIf="(personaldetails?.occupation!=null && personaldetails?.occupation!=\'\') || touserid == currentuserid" class="aobut_content"\n                col-12>\n                <h3>Occupation\n                    <span *ngIf="(touserid == currentuserid)" (click)="editDatauser(\'occupation\',personaldetails);" class="addIconWrap">\n                        <ion-icon name="create" end></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'resume\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n                <p>{{(personaldetails?.occupation!=\'\' && personaldetails?.occupation!=null )?personaldetails?.occupation:\'_\n                    _ _\'}}</p>\n                <p *ngIf="personaldetails?.company_name!=\'\'">{{personaldetails?.company_name}}</p>\n                <p *ngIf="personaldetails?.designation!=\'\'">{{personaldetails?.designation}}</p>\n            </ion-col>\n\n            <ion-col *ngIf="education?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>Education\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'education\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle" end></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'education\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n\n\n                <ion-row *ngFor="let edu of education;" text-justify>\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(edu.degree!=\'\' && edu.degree!=null )?edu.degree:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'education\',edu);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col col-12 class="crbody">\n                        <p *ngIf="edu.school_name!=\'\'" text-capitalize>{{edu.school_name}}</p>\n\n                        <p *ngIf="edu.city!=\'\'" text-capitalize>{{edu.city}},{{edu.country}}</p>\n\n                        <p text-capitalize *ngIf="edu.starting_month!=\'\'">\n                            {{edu.starting_month}}&nbsp;{{edu.starting_year}} To {{edu.ending_month}}&nbsp;{{edu.ending_year}}\n                        </p>\n\n                        <p *ngIf="edu.school_website!=\'\'">{{edu.school_website}}</p>\n\n                        <p *ngIf="edu.details!=\'\'" text-justify>{{edu.details}}</p>\n                    </ion-col>\n                    <!-- </div> -->\n\n\n\n                </ion-row>\n                <!-- <ion-col col-4 >\n              <b>{{edu.degree}}</b> \n              Aug 2006 - Nov 2011\n            </ion-col> -->\n            </ion-col>\n\n            <ion-col *ngIf="works?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>\n                    Work Experience\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'work\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle" end></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'experience\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n\n                </h3>\n\n\n                <ion-row *ngFor="let work of works;">\n\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(work.position!=\'\' && work.position!=null )?work.position:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'work\',work);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col class="crbody" col-12>\n\n\n                        <p *ngIf="work.company_name!=\'\'" text-capitalize>{{work.company_name}}</p>\n\n                        <p *ngIf="work.city!=\'\'" text-capitalize>{{work.city}},{{work.country}}</p>\n\n                        <p text-capitalize *ngIf="work.starting_month!=\'\'">\n                            {{work.starting_month}}&nbsp;{{work.starting_year}} To {{work.ending_month}}&nbsp;{{work.ending_year}}\n                        </p>\n\n                        <p *ngIf="work.website!=\'\'">{{work.website}}</p>\n\n                        <p *ngIf="work.details!=\'\'" text-justify>{{work.details}}</p>\n\n                    </ion-col>\n\n\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col *ngIf="statement!=null || touserid == currentuserid" class="aobut_content" col-12>\n                <h3 text-capitalize>Personal Statement\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'statement\',statement);" class="addIconWrap">\n                        <ion-icon name="create"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'personal_statement\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n                <ion-row>\n\n                    <ion-col col-12 text-justify>{{(statement==null)?\'_ _ _\':statement}}</ion-col>\n\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col *ngIf="skills?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3 text-capitalize>Specialization / Skills\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'skill\',skills);" class="addIconWrap">\n                        <ion-icon name="create"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'specialization\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n                <ion-row *ngFor="let skill of skills;">\n\n                    <ion-col col-12 text-justify>{{skill.skillS}}</ion-col>\n\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col *ngIf="interests?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>Interests\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'interest\',interests);" class="addIconWrap">\n                        <ion-icon name="create"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'interest\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n                <ion-row *ngFor="let interest of interests;">\n\n                    <ion-col col-12 class="educationRow" text-justify>\n                        <p> {{interest.interests}}</p>\n                    </ion-col>\n                    <!-- <ion-col col-1>\n                    <span (click)="addWork(edu);" class="iconwrap">\n                        <ion-icon name="create"></ion-icon><br>\n                        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                    </span> \n                </ion-col> -->\n\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col *ngIf="languages?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>Languages\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'language\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle" end></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'language\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n\n                </h3>\n                <ion-row *ngFor="let lang of languages;">\n                    <ion-col col-3 text-capitalize>{{lang.language}}</ion-col>\n                    <ion-col col-1 text-capitalize>:</ion-col>\n                    <ion-col col-3 text-capitalize>{{lang.proficiency_level}}</ion-col>\n                    <ion-col col-2>\n\n                        <span class="toolbaricons" (click)="presentActions(\'language\',lang);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col *ngIf="exibitions?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>\n                    ExhibitionsX / Concerts / Events\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'exhibition\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle" end></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'events\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n\n                </h3>\n\n\n                <ion-row *ngFor="let exb of exibitions;">\n\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(exb.exhibition_name!=\'\' && exb.exhibition_name!=null )?exb.exhibition_name:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'exhibition\',exb);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col class="crbody" col-12>\n\n\n                        <p *ngIf="exb.performance_type!=\'\'" text-capitalize>{{exb.performance_type}}</p>\n\n                        <p *ngIf="exb.city!=\'\'" text-capitalize>{{exb.city}}</p>\n\n                        <p text-capitalize *ngIf="exb.month!=\'\'">\n                            {{exb.month}}&nbsp;{{exb.year}}\n                        </p>\n\n                    </ion-col>\n\n\n                </ion-row>\n\n            </ion-col>\n\n            <ion-col *ngIf="courses?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>COURSES\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'course\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'courses\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n\n                </h3>\n\n\n                <ion-row *ngFor="let crse of courses;">\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(crse.course_name!=\'\' && crse.course_name!=null )?crse.course_name:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'course\',crse);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col class="crbody" col-12>\n\n                        <p *ngIf="crse.organisation_name!=\'\'" text-capitalize>\n                            {{crse.course_organisation}}\n                        </p>\n                        <p text-capitalize *ngIf="crse.year!=\'\'">\n                            {{crse.year}}\n                        </p>\n                    </ion-col>\n\n\n                </ion-row>\n\n\n            </ion-col>\n\n            <ion-col *ngIf="certifications?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>Certifications\n\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'certificate\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'Certifications\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n\n                </h3>\n\n                <ion-row *ngFor="let cert of certifications;">\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(cert.certification_name!=\'\' && cert.certification_name!=null )?cert.certification_name:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'certificate\',cert);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col class="crbody" col-12>\n\n                        <p *ngIf="cert.certification_organisation!=\'\'" text-justify>\n                            {{cert.certification_organisation}}\n                        </p>\n                        <p text-capitalize *ngIf="cert.year!=\'\'">\n                            {{cert.year}}\n                        </p>\n\n                    </ion-col>\n\n\n                </ion-row>\n\n\n\n\n            </ion-col>\n\n            <ion-col *ngIf="achievements?.length>0 || touserid == currentuserid" class="aobut_content" col-12>\n                <h3>Achievements / Awards\n\n                    <span *ngIf="touserid == currentuserid" (click)="editDatauser(\'award\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'Achievements\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n\n                <ion-row *ngFor="let acv of achievements;">\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(acv.award_name!=\'\' && acv.award_name!=null )?acv.award_name:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'award\',acv);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col class="crbody" col-12>\n\n                        <p *ngIf="acv.organisation_name!=\'\'" text-justify>\n                            {{acv.organisation_name}}\n                        </p>\n                        <p text-capitalize *ngIf="acv.award_date!=\'\'">\n                            {{acv.award_date}}\n                        </p>\n                        <p *ngIf="acv.organisation_website!=\'\'">{{acv.organisation_website}}</p>\n\n\n                    </ion-col>\n\n\n                </ion-row>\n\n\n\n\n            </ion-col>\n\n\n            <ion-col *ngIf="customone!=null || touserid == currentuserid" class="aobut_content" col-12>\n                <h3 text-capitalize>Custom Sections\n                    <span *ngIf="(touserid == currentuserid) && customone?.length<2" (click)="editDatauser(\'customone\',{});" class="addIconWrap">\n                        <ion-icon name="add-circle"></ion-icon>\n                    </span>\n                    <span *ngIf="touserid == currentuserid" (click)="editPrivacy(\'customone\');" class="addIconWrap">\n                        <ion-icon name="lock"></ion-icon>\n                    </span>\n                </h3>\n                <ion-row *ngFor="let cstm of customone;">\n\n                    <ion-col col-11 text-justify>\n                        <p class="crHeading">\n                            {{(cstm.title!=\'\' && cstm.title!=null )?cstm.title:\'_ _ _\'}}\n                        </p>\n                    </ion-col>\n                    <ion-col col-1 *ngIf="touserid == currentuserid">\n\n                        <span class="toolbaricons" (click)="presentActions(\'customone\',cstm);">\n                            <ion-icon name="more"></ion-icon>\n                        </span>\n\n                    </ion-col>\n\n                    <ion-col class="crbody" col-12>\n\n                        <p *ngIf="cstm.description!=\'\'" text-justify>\n                            {{cstm.description}}\n                        </p>\n\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\aboutme\aboutme.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
], AboutmePage);

//# sourceMappingURL=aboutme.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotouploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_base64__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PhotouploadPage = (function () {
    function PhotouploadPage(navCtrl, navParams, imagepick, cropService, cameraservice, basesxfrservice, _DomSanitizer, actionSheetCtrl, remotService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imagepick = imagepick;
        this.cropService = cropService;
        this.cameraservice = cameraservice;
        this.basesxfrservice = basesxfrservice;
        this._DomSanitizer = _DomSanitizer;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.alertCtrl = alertCtrl;
        this.albumname = '';
        this.albumprvcy = 1;
        this.albumid = 0;
        this.photos = [];
        this.existingphotos = [];
        this.userFullname = window.localStorage['name'];
        this.base_url = this.remotService.site_url;
        this.userimage = window.localStorage['userimage'];
        var album = navParams.get('album');
        if (album.hasOwnProperty('id')) {
            this.albumid = album.id;
            this.initalbumData();
        }
    }
    PhotouploadPage.prototype.initalbumData = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            id: this.albumid,
            token: window.localStorage['token']
        };
        this.existingphotos = [];
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'portfolioImages').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                // this.photos  = response.data.Images;
                var responseImages = response.data.Images;
                responseImages.forEach(function (item, index) {
                    var imageurl = _this.base_url + "uploads/portfolioImages/resizedimages/" + item.image_name;
                    item.realpath = imageurl;
                    item.foruploadpath = '';
                    _this.existingphotos.push(item);
                });
                // console.log(this.existingphotos);
                var details = response.data.details;
                _this.albumname = details.name;
                _this.albumdesc = details.description;
                _this.albumprvcy = details.privacy;
                // this.currentslideindex = this.slides.getActiveIndex();
                // this.currentimage = this.albumphotos[this.currentslideindex];
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    PhotouploadPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //over ridding back button
        this.navBar.backButtonClick = function () {
            //this.navParams.get("parentPage").initPhotoalbumData();
            // this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad PhotouploadPage');
    };
    // image cropper modal call
    PhotouploadPage.prototype.addImage = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Add Image",
            buttons: [{
                    text: 'Take a Picture',
                    handler: function () {
                        _this.takePicture();
                    }
                },
                {
                    text: 'Pick From Library',
                    handler: function () {
                        //**************** */
                        _this.openImagePicker();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PhotouploadPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            correctOrientation: true
        };
        this.cameraservice.getPicture(options)
            .then(function (item) {
            //console.log(results);
            _this.saveImageToArrayBypath(item);
            // this.chnagedimagename = null;
            // this.cropService
            //   .crop(data, {
            //     quality: 75
            //   })
            //   .then((newImage) => {
            //     this.chnagedimagename = newImage;
            //     this.saveImageToArray();
            //   }, error => console.error("Error cropping image", error));
        }, function (error) {
            console.log(error);
        });
    };
    PhotouploadPage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 5,
        };
        this.chnagedimagename = null;
        this.imagepick.getPictures(options)
            .then(function (results) {
            results.forEach(function (item) {
                _this.saveImageToArrayBypath(item);
            });
        }, function (err) {
            console.log(err);
        });
    };
    // reduceImages(selected_pictures: any): any {
    //   return selected_pictures.reduce((promise: any, item: any) => {
    //     return promise.then((result) => {
    //       return this.cropService.crop(item, {
    //           quality: 75
    //         })
    //         .then(cropped_image => {
    //           this.chnagedimagename = cropped_image;
    //         });
    //     });
    //   }, Promise.resolve());
    // }
    PhotouploadPage.prototype.saveImageToArrayBypath = function (filePath) {
        var _this = this;
        //let filePath: string = this.chnagedimagename;
        this.basesxfrservice.encodeFile(filePath).then(function (base64File) {
            var bsesixfrImage = base64File.split(',');
            _this.photos.push({ 'realpath': base64File, 'foruploadpath': bsesixfrImage[1] });
        });
    };
    //      //change profile image
    // saveImageToArray() {
    //       let filePath: string = this.chnagedimagename;
    //       this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {
    //         var bsesixfrImage = base64File.split(',');
    //         this.photos.push({'realpath':base64File,'foruploadpath':bsesixfrImage[1]});
    //       });
    //   }
    PhotouploadPage.prototype.saveAlbum = function () {
        var _this = this;
        var photostosend = {};
        this.photos.forEach(function (item, index) {
            photostosend[index] = item.foruploadpath;
        });
        var url = 'newAlbum';
        this.albumParam = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            privacy: this.albumprvcy,
            name: this.albumname,
            description: this.albumdesc,
            image: JSON.stringify(photostosend),
        };
        if (this.albumid > 0) {
            var url = 'ImageUpoloadInExistingAlbum';
            this.albumParam = {
                user_id: window.localStorage['userid'],
                token: window.localStorage['token'],
                privacy: this.albumprvcy,
                album_name: this.albumname,
                description: this.albumdesc,
                image: JSON.stringify(photostosend),
                Album_id: this.albumid
            };
        }
        this.remotService.presentLoading("Saving ...");
        this.remotService.postData(this.albumParam, url).subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.navParams.get("parentPage").initPhotoFromalbumData();
                // this.events.publish('creoyou:showmenu');
                _this.navCtrl.pop();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error getting about details.');
        });
    };
    PhotouploadPage.prototype.removeImage = function (index, item) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Remove Photo',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        if (item.hasOwnProperty('id')) {
                            _this.existingphotos.splice(index, 1);
                            var uid = window.localStorage['userid'];
                            var type = window.localStorage['usertype'];
                            var imgrmvParams = {
                                userId: uid,
                                userType: type,
                                portfolioType: 'Image',
                                portfolioId: item.id
                            };
                            _this.remotService.postData(imgrmvParams, 'deletePortfolio').subscribe(function (response) {
                                _this.remotService.dismissLoader();
                                if (response.success == 1) {
                                    _this.remotService.presentToast("Removed ...");
                                }
                                else {
                                    _this.remotService.presentToast(response.message);
                                }
                            }, function () {
                                _this.remotService.dismissLoader();
                                _this.remotService.presentToast('Error removing imageitem.');
                            });
                        }
                        else {
                            _this.photos.splice(index, 1);
                        }
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    return PhotouploadPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], PhotouploadPage.prototype, "navBar", void 0);
PhotouploadPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-photoupload',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\photoupload\photoupload.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>Create Album</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-list>\n\n        <ion-item class="albumUser">\n            <ion-avatar item-left>\n                <img *ngIf="userimage!=\'null\' && userimage!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{userimage}}" alt="avatar">\n                <img *ngIf="userimage==\'null\' || userimage==\'\'" src="/assets/img/management.png" alt="avatar">\n            </ion-avatar>\n            <p class="EventUser"> {{userFullname}} </p>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="default" floating>Enter Album Name</ion-label>\n            <ion-input [(ngModel)]="albumname"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label color="default" floating>Enter Album Description</ion-label>\n            <ion-textarea [(ngModel)]="albumdesc" rows="4"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <ion-label color="default" floating>Set Privacy</ion-label>\n            <ion-select [(ngModel)]="albumprvcy">\n                <ion-option value="1">Public</ion-option>\n                <ion-option value="2">Connection Only</ion-option>\n                <ion-option value="3">Connection and followers</ion-option>\n                <ion-option value="4">Only me</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-row>\n\n            <ion-col col-4 *ngFor="let photo of existingphotos;let idx=index;">\n\n                <div class="eventImage">\n                    <img [src]="_DomSanitizer.bypassSecurityTrustUrl(photo.realpath)" alt="image" />\n                    <ion-icon name="close" (click)="removeImage(idx,photo);"></ion-icon>\n                </div>\n\n            </ion-col>\n            <ion-col col-4 *ngFor="let photo of photos;let idx=index;">\n\n                <div class="eventImage">\n                    <img [src]="_DomSanitizer.bypassSecurityTrustUrl(photo.realpath)" alt="image" />\n                    <ion-icon name="close" (click)="removeImage(idx,{});"></ion-icon>\n                </div>\n\n            </ion-col>\n\n        </ion-row>\n\n\n\n\n        <button class="uploadImage" (click)="addImage()">\n            Add Photo\n            <i class="material-icons">add_a_photo</i>\n        </button>\n\n\n    </ion-list>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar class="button_bottom_top">\n        <button ion-button class="sign-up button button-block button-stable" (click)="saveAlbum();" [disabled]="albumname==\'\'">Save Album</button>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\photoupload\photoupload.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["DomSanitizer"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], PhotouploadPage);

//# sourceMappingURL=photoupload.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_invitefriend_invitefriend__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_messagedetails_messagedetails__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_otherprofile_otherprofile__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ConnectionsPage = (function () {
    function ConnectionsPage(navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.connections = [];
        this.suggestions = [];
        this.pendingusers = [];
        this.base_url = this.remotService.site_url;
        this.connectiontab = 'connections';
        this.initViewwithconnectionsdata();
    }
    ConnectionsPage.prototype.initViewwithconnectionsdata = function () {
        var _this = this;
        var searchparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.connections = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(searchparams, 'getConnections').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.connections = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
        var pendingreqparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.pendingusers = [];
        this.remotService.postData(pendingreqparams, 'friendRequest').subscribe(function (response) {
            if (response.success == 1) {
                _this.pendingusers = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    ConnectionsPage.prototype.initviewWithsuggestions = function () {
        var _this = this;
        var suggestionsparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.suggestions = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(suggestionsparams, 'suggestion').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.suggestions = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    ConnectionsPage.prototype.initviewWithPendingRequest = function (showloader) {
        var _this = this;
        if (showloader === void 0) { showloader = true; }
        var pendingreqparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token']
        };
        this.pendingusers = [];
        if (showloader)
            this.remotService.presentLoading("Wait ...");
        this.remotService.postData(pendingreqparams, 'friendRequest').subscribe(function (response) {
            if (showloader)
                _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.pendingusers = response.data;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            if (showloader)
                _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    ConnectionsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad ConnectionsPage');
    };
    ConnectionsPage.prototype.presentActionSheet = function (connection, index) {
        var _this = this;
        console.log(connection, index);
        var DataToSend = {
            user_id: window.localStorage['userid'],
            to_userid: connection.user_id,
            token: window.localStorage['token']
        };
        var actionSheet = this.actionSheetCtrl.create({
            //title: 'Edit your post',
            buttons: [
                {
                    text: 'Block',
                    role: 'destructive',
                    handler: function () {
                        _this.remotService.presentToast('wait...');
                        _this.remotService.postData(DataToSend, 'blockUser').subscribe(function (response) {
                            if (response.success == 1) {
                                _this.connections.splice(index, 1);
                            }
                            else {
                                _this.remotService.presentToast(response.message);
                            }
                        }, function () {
                            _this.remotService.presentToast('Error loading data.');
                        });
                    }
                },
                {
                    text: 'Remove',
                    role: 'destructive',
                    handler: function () {
                        _this.remotService.presentToast('wait...');
                        _this.remotService.postData(DataToSend, 'unfriendUser').subscribe(function (response) {
                            if (response.success == 1) {
                                _this.connections.splice(index, 1);
                            }
                            else {
                                _this.remotService.presentToast(response.message);
                            }
                        }, function () {
                            _this.remotService.presentToast('Error loading data.');
                        });
                    }
                },
            ]
        });
        actionSheet.present();
    };
    /**
     * start messaging with user connection
     */
    ConnectionsPage.prototype.startMessage = function (connection, idx) {
        console.log(connection);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_messagedetails_messagedetails__["a" /* MessagedetailsPage */], { user: connection });
    };
    /**
     * send request to a friend
     * @param connection
     */
    ConnectionsPage.prototype.sendRequest = function (connection) {
        var _this = this;
        connection.sent = 1;
        var token = window.localStorage['token'];
        var DataToSend = {
            from_user_id: window.localStorage['userid'],
            to_user_id: connection.user_id,
            token: token
        };
        this.remotService.presentToast('wait...');
        this.remotService.postData(DataToSend, 'sendRequset').subscribe(function (response) {
            if (response.success == 1) {
            }
            else {
                connection.sent = 0;
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            connection.sent = 0;
            _this.remotService.presentToast('Error loading data.');
        });
    };
    ConnectionsPage.prototype.inviteFriend = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_invitefriend_invitefriend__["a" /* InvitefriendPage */]);
    };
    /**
     * accept connection request
     */
    ConnectionsPage.prototype.acceptRequest = function (conn, index) {
        var _this = this;
        var token = window.localStorage['token'];
        var DataToSend = {
            from_useid: conn.id,
            to_userid: window.localStorage['userid'],
            token: token
        };
        this.remotService.presentToast('wait...');
        this.remotService.postData(DataToSend, 'acceptRequest').subscribe(function (response) {
            if (response.success == 1) {
                _this.pendingusers.splice(index, 1);
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    /**
    * reject connection request
    */
    ConnectionsPage.prototype.rejectRequest = function (conn, index) {
        var _this = this;
        var token = window.localStorage['token'];
        var DataToSend = {
            user_id: conn.id,
            token: token
        };
        this.remotService.presentToast('wait...');
        this.remotService.postData(DataToSend, 'deleteRequest').subscribe(function (response) {
            if (response.success == 1) {
                _this.pendingusers.splice(index, 1);
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    ConnectionsPage.prototype.segmentChanged = function (event) {
        if (this.connectiontab == 'connections')
            this.initViewwithconnectionsdata();
        else if (this.connectiontab == 'suggestions')
            this.initviewWithsuggestions();
        else if (this.connectiontab == 'pendingrequest')
            this.initviewWithPendingRequest();
    };
    ConnectionsPage.prototype.OtherFrofileView = function (connection) {
        console.log(connection, this.connectiontab);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */], { 'otheruserfrofiledata': connection, 'tabname': this.connectiontab });
    };
    return ConnectionsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], ConnectionsPage.prototype, "navBar", void 0);
ConnectionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-connections',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\connections\connections.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>Connection</ion-title>\n\n        <ion-buttons end>\n            <button (click)="inviteFriend();" class="add_connection" ion-button clear>\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n    <ion-segment (ionChange)="segmentChanged($event)" [(ngModel)]="connectiontab">\n        <ion-segment-button value="connections">\n            Connections\n        </ion-segment-button>\n        <ion-segment-button value="suggestions">\n            Suggestions\n        </ion-segment-button>\n        <ion-segment-button value="pendingrequest">\n            Pending\n            <span class="counter">{{pendingusers?.length}}</span>\n        </ion-segment-button>\n    </ion-segment>\n\n</ion-header>\n\n\n<ion-content>\n\n    <div [ngSwitch]="connectiontab">\n\n\n        <ion-list *ngSwitchCase="\'connections\'" class="individual">\n\n            <ion-item *ngFor="let connection of connections;let idx=index;" padding-horizontal class="search_user search_user_individual">\n\n                <ion-avatar item-left (click)="OtherFrofileView(connection)">\n\n                    <img *ngIf="connection.image!=null && connection.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{connection.image}}"\n                        alt="avatar">\n                    <img *ngIf="connection.image==null || connection.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n                </ion-avatar>\n                <ion-item class="searcsh_right">\n                    <div (click)="OtherFrofileView(connection)">\n                        <p>{{connection.users_full_name}}</p>\n                        <p class="user_deg">\n                            <ion-icon name="briefcase"></ion-icon> {{connection.creativeField}}</p>\n                        <p class="user_deg">\n                            <ion-icon name="home"></ion-icon> {{connection.address}}</p>\n                    </div>\n                    <div class="user_action" item-right>\n                        <ion-icon (click)="presentActionSheet(connection,idx)" item-right ios="ios-settings" md="md-settings"></ion-icon>\n                        <button (click)="startMessage(connection,idx)" ion-button block icon-right>\n                            <ion-icon name="mail"></ion-icon>Message\n                        </button>\n                    </div>\n                </ion-item>\n            </ion-item>\n\n            <ion-item *ngIf="connections?.length<=0" class="no_result">\n                <h3> Sorry No Connection Found... </h3>\n            </ion-item>\n\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'suggestions\'" class="suggestions">\n\n\n            <ion-item *ngFor="let connection of suggestions;let idx=index;" padding-horizontal class="search_user search_user_individual">\n                <ion-avatar item-left (click)="OtherFrofileView(connection)">\n\n                    <img *ngIf="connection.image!=null && connection.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{connection.image}}"\n                        alt="avatar">\n                    <img *ngIf="connection.image==null || connection.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n                </ion-avatar>\n                <ion-item class="searcsh_right">\n                    <div (click)="OtherFrofileView(connection)">\n                        <p>{{connection.users_full_name}}</p>\n                        <p class="user_deg">\n                            <ion-icon name="briefcase"></ion-icon> {{connection.creativeField}}</p>\n                        <p class="user_deg">\n                            <ion-icon name="home"></ion-icon> {{connection.address}}</p>\n                    </div>\n                    <div class="user_action" item-right>\n                        <button *ngIf="connection?.sent!=1" (click)="sendRequest(connection)" ion-button block icon-right>\n                            <ion-icon name="person-add"></ion-icon> ADD\n                        </button>\n                        <ion-icon class="done" *ngIf="connection?.sent==1" name="checkmark-circle"></ion-icon>\n\n                    </div>\n                </ion-item>\n            </ion-item>\n\n            <ion-item *ngIf="suggestions?.length<=0" class="no_result">\n                <h3> Sorry No Suggestions Found... </h3>\n            </ion-item>\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'pendingrequest\'" class="suggestions">\n\n            <ion-item *ngFor="let connection of pendingusers;let idx=index;" padding-horizontal class="search_user search_user_individual">\n                <ion-avatar item-left (click)="OtherFrofileView(connection)">\n\n                    <img *ngIf="connection.image!=null && connection.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{connection.image}}"\n                        alt="avatar">\n                    <img *ngIf="connection.image==null || connection.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n                </ion-avatar>\n                <ion-item class="searcsh_right">\n                    <div (click)="OtherFrofileView(connection)">\n                        <p>{{connection.users_full_name}}</p>\n                        <p class="user_deg">\n                            <ion-icon name="briefcase"></ion-icon> {{connection.creativeField}}</p>\n                        <p class="user_deg">\n                            <ion-icon name="home"></ion-icon> {{connection.address}}</p>\n                    </div>\n                    <div class="user_action" item-right>\n                        <button (click)="acceptRequest(connection,idx);" ion-button block icon-right>\n                            <ion-icon name="person-add"></ion-icon> Accept\n                        </button>\n                        <button (click)="rejectRequest(connection,idx);" ion-button block icon-right>\n                            <ion-icon name="close"></ion-icon> Reject\n                        </button>\n\n                    </div>\n                </ion-item>\n            </ion-item>\n\n            <ion-item *ngIf="pendingusers?.length<=0" class="no_result">\n                <h3> Sorry No Pending Request Found... </h3>\n            </ion-item>\n\n\n        </ion-list>\n\n    </div>\n\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\connections\connections.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
], ConnectionsPage);

//# sourceMappingURL=connections.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitefriendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InvitefriendPage = (function () {
    function InvitefriendPage(navCtrl, navParams, remoteService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.remoteService = remoteService;
        this.tags = [];
        this.isvalidemail = true;
    }
    InvitefriendPage.prototype.addInvitemail = function () {
        var reeml = /\S+@\S+\.\S+/;
        console.log("very", this.inviteemail);
        this.isvalidemail = true;
        if (!reeml.test(this.inviteemail)) {
            this.isvalidemail = false;
        }
        else {
            if (this.tags.indexOf(this.inviteemail) !== -1) {
                this.remoteService.presentAlert("You already added this email.");
            }
            else {
                this.tags.push({ 'text': this.inviteemail });
                this.inviteemail = '';
                this.isvalidemail = true;
            }
        }
        console.log(this.isvalidemail);
    };
    InvitefriendPage.prototype.removeTag = function (index) {
        this.tags.splice(index, 1);
    };
    InvitefriendPage.prototype.sendInvitations = function () {
        var _this = this;
        var inviteParam = {
            user_id: window.localStorage['userid'],
            friendsEmail: JSON.stringify(this.tags),
            token: window.localStorage['token']
        };
        this.remoteService.presentLoading('Sending Invitations ...');
        this.remoteService.postData(inviteParam, 'invitefreind').subscribe(function (response) {
            _this.remoteService.dismissLoader();
            if (response.success == 1) {
                _this.remoteService.presentAlert(response.message);
                _this.tags = [];
                _this.isvalidemail = true;
            }
            else {
                _this.remoteService.presentToast(response.message);
            }
        }, function () {
            _this.remoteService.dismissLoader();
            _this.remoteService.presentToast('Error loading data.');
        });
    };
    InvitefriendPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InvitefriendPage');
    };
    return InvitefriendPage;
}());
InvitefriendPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-invitefriend',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\invitefriend\invitefriend.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Invite Friend</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-row>\n\n\n      <ion-col *ngIf="tags.length<10" col-10 class="fld"> \n\n          <ion-input  class="input-fld extra-pad" type="text" (keyup.enter)="addInvitemail()" [(ngModel)]="inviteemail"  placeholder="Enter Email Address"   required></ion-input>\n          \n      </ion-col>\n      <ion-col class="addButton" *ngIf="tags.length<10" col-2 > \n          <ion-icon (click)="addInvitemail()" name="add-circle"></ion-icon>\n      </ion-col>\n\n    <ion-col *ngIf="tags.length>9" col-12 class="tagError"> \n        <span >Maximum 10 emails are allowed. </span>\n    </ion-col>\n\n    <ion-col col-12 *ngIf="!isvalidemail"  class="tagError">\n        <span >Enter a valid email address</span>\n    </ion-col>\n\n    <ion-col col-12 class="tag-container">\n     \n            <p *ngFor="let tag of tags;let tgindex=index;" class="tagitem">{{tag.text}}\n               <span (click)="removeTag(tgindex)"><ion-icon name="close-circle"></ion-icon></span> </p>\n    \n    </ion-col>\n\n  </ion-row>\n \n  \n</ion-content>\n<ion-footer>\n\n    <button (click)="sendInvitations()" [disabled]="tags.length>10 || tags[0]?.text==\'\'" text-center class="next_stape">\n      <ion-icon name="checkmark"></ion-icon> SEND INVITATION\n    </button>\n   \n  </ion-footer>\n'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\invitefriend\invitefriend.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], InvitefriendPage);

//# sourceMappingURL=invitefriend.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagedetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_messages__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessagedetailsPage = (function () {
    function MessagedetailsPage(navCtrl, navParams, events, actionSheetCtrl, remotService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.lastmessageid = 0;
        this.messageCallInterval = null;
        this.archived = 'Archived';
        this.base_url = this.remotService.site_url;
        this.user = navParams.get('user');
        this.currentuserid = window.localStorage['userid'];
        this.initchatMessages();
        if (this.user && this.user.hasOwnProperty('archive')) {
            this.archived = 'Un Archived';
            this.initchatMessages();
        }
    }
    MessagedetailsPage.prototype.initchatMessages = function () {
        var _this = this;
        var chatparam = {
            from_userid: window.localStorage['userid'],
            to_userid: this.user.user_id,
            token: window.localStorage['token'],
            lastmessageid: this.lastmessageid
        };
        if (this.lastmessageid == 0)
            this.messages = [];
        // this.remotService.presentLoading("Wait ...");
        this.remotService.postData(chatparam, 'showFullchat').subscribe(function (response) {
            if (response.success == 1) {
                if (response.data != null) {
                    response.data.forEach(function (item, key, index) {
                        _this.messages.push(item);
                        _this.lastmessageid = item.id;
                    });
                }
                _this.scrollToBottom();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            // this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagedetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.messageCallInterval = setInterval(function () {
            console.log('time int');
            _this.initchatMessages();
        }, 4000);
        this.navBar.backButtonClick = function () {
            clearInterval(_this.messageCallInterval);
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad MessagedetailsPage');
    };
    MessagedetailsPage.prototype.sendMessage = function () {
        var _this = this;
        var sendTextparams = {
            to_userid: this.user.user_id,
            token: window.localStorage['token'],
            content: this.messageText,
            from_userid: window.localStorage['userid']
        };
        this.messageText = '';
        // this.remotService.presentLoading("Sending ...");
        this.remotService.postData(sendTextparams, 'sendMessages').subscribe(function (response) {
            //  this.remotService.dismissLoader();
            if (response.data.hasOwnProperty('id')) {
                //   var newcomment = this.user;
                //  // this.lastmessageid            = response.data.hasOwnProperty('id');
                //   newcomment.content            = this.messageText;
                //   newcomment.id                 = response.data.id;
                //   newcomment.userId             = window.localStorage['userid'];
                //   newcomment.creation_date      = response.data.date;
                //   this.messages.push(newcomment);                  
                // this.scrollToBottom();
            }
            if (response.success == 1) {
            }
            else if (response.success == 2) {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            // this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagedetailsPage.prototype.ClearallArchive = function (event) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            // title: 'Edit your Event',
            buttons: [
                {
                    text: 'Clear All Chat',
                    role: 'destructive',
                    handler: function () {
                        _this.clearallMessage();
                        //this.deleteEvent(event);
                        /*  console.log('Destructive clicked'); */
                    }
                },
                {
                    text: this.archived,
                    role: 'destructive',
                    handler: function () {
                        if (_this.archived == 'Archived') {
                            _this.archiveMessage();
                        }
                        else {
                            _this.UnArchiveddetails();
                        }
                    }
                },
            ]
        });
        actionSheet.present();
    };
    MessagedetailsPage.prototype.clearallMessage = function () {
        var _this = this;
        var unreadData = {
            token: window.localStorage['token'],
            from_userid: window.localStorage['userid'],
            to_userid: this.user.user_id
        };
        this.remotService.postData(unreadData, 'deleteMessages').subscribe(function (response) {
            if (response.success == 1) {
                _this.initchatMessages();
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagedetailsPage.prototype.archiveMessage = function () {
        var _this = this;
        var unreadData = {
            token: window.localStorage['token'],
            from_userid: window.localStorage['userid'],
            to_userid: this.user.user_id
        };
        this.remotService.postData(unreadData, 'ArchieveMessages').subscribe(function (response) {
            console.log(response);
            if (response.success == 1) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */]);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagedetailsPage.prototype.UnArchiveddetails = function () {
        var _this = this;
        var unreadData = {
            token: window.localStorage['token'],
            from_userid: window.localStorage['userid'],
            to_userid: this.user.user_id
        };
        this.remotService.postData(unreadData, 'unarchieveMessages').subscribe(function (response) {
            console.log(response);
            if (response.success == 1) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */]);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagedetailsPage.prototype.scrollToBottom = function () {
        // use the content's dimension to obtain the current height of the scroll
        var dimension = this.content.getContentDimensions();
        if (this.content != null) {
            // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
            this.content.scrollTo(0, dimension.scrollHeight);
        }
        else {
        }
    };
    return MessagedetailsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], MessagedetailsPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], MessagedetailsPage.prototype, "navBar", void 0);
MessagedetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-messagedetails',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\messagedetails\messagedetails.html"*/'<ion-header class="creoyou-header">\n  <ion-navbar>\n    <!--  <button ion-button menuToggle>\n         <ion-icon name="menu"></ion-icon>\n       </button> -->\n    <div class="user fixed-content">\n      <ion-row>\n        <ion-col col-8 class="user_left">\n          <ion-item>\n            <ion-avatar item-left>\n              <img *ngIf="user.image!=null && user.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{user.image}}" alt="avatar">\n              <img *ngIf="user.image==null || user.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n            </ion-avatar>\n            <p class="grn-text">{{user.users_full_name}}</p>\n          </ion-item>\n        </ion-col>\n        <ion-col col-4 class="user_right">\n          <ion-buttons end>\n            <button (tap)="ClearallArchive($event)" class="ChatMore" ion-button clear>\n              <ion-icon ios="ios-more" md="md-more"></ion-icon>\n            </button>\n          </ion-buttons>\n        </ion-col>\n      </ion-row>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="chat" no-bounce>\n\n  <ion-list class="messages">\n\n    <div *ngFor="let msg of messages;let msgindex = index;" [class.message-left]="msg.userId!=currentuserid" [class.message-right]="msg.userId==currentuserid">\n      <p>{{msg.content}}</p>\n      <p class="date" item-right>\n        <span>{{msg.creation_date|amDateFormat:\'h:mm a\'}}</span>\n        <span>{{msg.creation_date|amDateFormat:\'MM.DD.YYYY\'}}</span>\n      </p>\n    </div>\n\n    <!-- <div class="message-right">\n        <p>Yes I booked you for today</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span><i class="material-icons">done</i></p>\n      </div>\n  \n      <div class="message-left">\n        <p>Hi,I am your worker.</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span></p>\n      </div>\n  \n      <div class="message-right">\n        <p>Yes I booked you for today</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span><i class="material-icons">done</i></p>\n      </div>\n  \n  \n      <div class="message-left">\n        <p>Hi,I am your worker.</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span></p>\n      </div>\n  \n      <div class="message-right">\n        <p>Yes I booked you for today</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span><i class="material-icons">done</i></p>\n      </div>\n  \n      <div class="message-left">\n        <p>Hi,I am your worker.</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span></p>\n      </div>\n  \n      <div class="message-right">\n        <p>Yes I booked you for today</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span><i class="material-icons">done</i></p>\n      </div>\n  \n  \n      <div class="message-left">\n        <p>Hi,I am your worker.</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span></p>\n      </div>\n  \n      <div class="message-right">\n        <p>Yes I booked you for today</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span><i class="material-icons">done</i></p>\n      </div>\n  \n      <div class="message-left">\n        <p>Hi,I am your worker.</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span></p>\n      </div>\n  \n      <div class="message-right">\n        <p>Yes I booked you for today</p>\n        <p class="date" item-right><span>22.02.2017</span><span>03.45pm</span><i class="material-icons">done</i></p>\n      </div> -->\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-toolbar class="msg" color="footer-white">\n    <div class="in">\n      <div class="text-box">\n        <ion-textarea [(ngModel)]="messageText" rows="1" autoresize placeholder="Type Message Here..."></ion-textarea>\n      </div>\n    </div>\n    <!-- on keyboard open send button -->\n    <button ion-button end small (click)="sendMessage()" [disabled]="messageText === \'\'">\n      <i class="material-icons">send</i>\n    </button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\messagedetails\messagedetails.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]])
], MessagedetailsPage);

//# sourceMappingURL=messagedetails.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_messagedetails_messagedetails__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_newmessage_newmessage__ = __webpack_require__(148);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagesPage = (function () {
    /* unreadmsg: boolean = false;
    usrmsg: boolean = true; */
    function MessagesPage(navCtrl, navParams, events, actionSheetCtrl, remotService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.actionSheetCtrl = actionSheetCtrl;
        this.remotService = remotService;
        this.connections = [];
        this.suggestions = [];
        this.pendingusers = [];
        this.messagePageOffset = 0;
        this.usermessage = [];
        this.unreadmessage = [];
        this.archive = false;
        this.inbox = true;
        this.base_url = this.remotService.site_url;
        this.connectiontab = 'connections';
        // this.initViewwithData();
        this.ShowmessageDetails();
        this.unreadAllMessage();
    }
    MessagesPage.prototype.ShowmessageDetails = function () {
        var _this = this;
        this.messagePageOffset = 0;
        var chatparam = {
            user_id: window.localStorage['userid'],
            limit: this.messagePageOffset,
            token: window.localStorage['token'],
        };
        this.usermessage = [];
        this.unreadmessage = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(chatparam, 'messageDetails').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.inbox = true;
                if (response.data != null) {
                    response.data.userMessages.forEach(function (item, key, index) {
                        _this.usermessage.push(item);
                        //console.log(response);
                    });
                    response.data.unseenMessagesofuser.forEach(function (item, key, index) {
                        _this.unreadmessage.push(item);
                        //console.log(this.unreadmessage);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagesPage.prototype.fetchHomeData = function (infiniteScroll) {
        var _this = this;
        this.messagePageOffset = this.messagePageOffset + 16;
        var chatparam = {
            user_id: window.localStorage['userid'],
            limit: this.messagePageOffset,
            token: window.localStorage['token'],
        };
        // console.log(chatparam);
        this.remotService.postData(chatparam, 'messageDetails').subscribe(function (response) {
            infiniteScroll.complete();
            // console.log(response);
            if (response.success == 1) {
                if (response.data != null) {
                    response.data.userMessages.forEach(function (item, key, index) {
                        _this.usermessage.push(item);
                        // console.log(this.usermessage);
                    });
                    /*  response.data.unseenMessagesofuser.forEach((item, key, index) => {
                       this.unreadmessage.push(item);
                       console.log(this.unreadmessage);
                     }) */
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad MessagesPage');
    };
    MessagesPage.prototype.messageDetails = function (usermsg) {
        var msgdata = {
            creativeField: '',
            fname: usermsg.fname,
            image: usermsg.image,
            lname: usermsg.lname,
            occupation: '',
            user_id: usermsg.userid,
            user_type: usermsg.user_type,
            users_full_name: usermsg.fname + usermsg.lname
        };
        this.unreadMessage(usermsg);
        // console.log(msgdata);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_messagedetails_messagedetails__["a" /* MessagedetailsPage */], { user: msgdata });
    };
    MessagesPage.prototype.messageDetailsArchive = function (arcmsg) {
        var msgdata = {
            creativeField: '',
            fname: arcmsg.fname,
            image: arcmsg.image,
            lname: arcmsg.lname,
            occupation: '',
            user_id: arcmsg.userid,
            user_type: arcmsg.user_type,
            users_full_name: arcmsg.fname + arcmsg.lname,
            archive: true
        };
        // console.log(msgdata);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_messagedetails_messagedetails__["a" /* MessagedetailsPage */], { user: msgdata });
    };
    MessagesPage.prototype.unreadMessage = function (usermsg) {
        var _this = this;
        var unreadData = {
            token: window.localStorage['token'],
            from_userid: usermsg.userid,
            to_userid: window.localStorage['userid']
        };
        this.remotService.postData(unreadData, 'setSingleMessageRead').subscribe(function (response) {
            // console.log(response);
            if (response.success == 1) {
                _this.ShowmessageDetails();
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagesPage.prototype.openNewMessage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_newmessage_newmessage__["a" /* NewmessagePage */]);
    };
    MessagesPage.prototype.unreadArchriveMsg = function (event) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            // title: 'Edit your Event',
            buttons: [
                {
                    text: 'Archived',
                    role: 'destructive',
                    handler: function () {
                        _this.archiveMessage();
                        //this.deleteEvent(event);
                        /*  console.log('Destructive clicked'); */
                    }
                },
            ]
        });
        actionSheet.present();
    };
    MessagesPage.prototype.unreadAllMessage = function () {
        var _this = this;
        var unreadData = {
            token: window.localStorage['token'],
            to_userid: window.localStorage['userid']
        };
        this.remotService.postData(unreadData, 'setTotalMessageRead').subscribe(function (response) {
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    MessagesPage.prototype.archiveMessage = function () {
        var _this = this;
        var unreadData = {
            from_userid: window.localStorage['userid']
        };
        this.remotService.postData(unreadData, 'showArchieveMessages').subscribe(function (response) {
            if (response.success == 1) {
                _this.archive = true;
                _this.inbox = false;
                _this.archivemessage = response.data.usermessages;
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    return MessagesPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], MessagesPage.prototype, "navBar", void 0);
MessagesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-messages',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\messages\messages.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>inbox</ion-title>\n        <ion-buttons end>\n            <button (tap)="unreadArchriveMsg($event)" class="ChatMore" ion-button clear>\n                <ion-icon ios="ios-more" md="md-more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n    <ion-toolbar class="chatSearch">\n        <ion-searchbar placeholder="Search chat..."></ion-searchbar>\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list class="Chat_list unRead" *ngIf="archive">\n\n        <ion-item *ngFor="let arcmsg of archivemessage" (click)="messageDetailsArchive(arcmsg);" padding-horizontal class="Chat_list_user">\n            <ion-avatar item-left>\n                <img src="{{base_url}}uploads/profileImages/resizedImages/{{arcmsg.image}}" alt="Image" />\n            </ion-avatar>\n            <ion-item class="Chat_list_right">\n                <h3>{{arcmsg.fname}} {{arcmsg.lname}}</h3>\n                <p class="Chat_text">{{arcmsg.content}}</p>\n                <p class="Chat_time">\n                    <ion-icon name="time"></ion-icon> {{arcmsg.creation_date | date:\'fullDate\'}} {{arcmsg.creation_date | date:\'shortTime\'}}</p>\n            </ion-item>\n        </ion-item>\n    </ion-list>\n\n    <ion-list class="Chat_list unRead" *ngIf="inbox">\n        <ion-item *ngFor="let usermsg of usermessage" (click)="messageDetails(usermsg);" padding-horizontal class="Chat_list_user">\n            <ion-avatar item-left>\n                <img src="{{base_url}}uploads/profileImages/resizedImages/{{usermsg.image}}" alt="Image" />\n            </ion-avatar>\n            <ion-item class="Chat_list_right">\n                <h3>{{usermsg.fname}} {{usermsg.lname}}</h3>\n                <p class="Chat_text">{{usermsg.content}}</p>\n                <p class="Chat_time">\n                    <ion-icon name="time"></ion-icon> {{usermsg.creation_date | date:\'fullDate\'}} {{usermsg.creation_date | date:\'shortTime\'}}</p>\n            </ion-item>\n            <span class="coun" *ngIf="usermsg.count>0">{{usermsg.count}}</span>\n        </ion-item>\n    </ion-list>\n\n\n    <ion-fab bottom right>\n        <button (click)="openNewMessage();" ion-fab color="primary">\n            <ion-icon name="create"></ion-icon>\n        </button>\n    </ion-fab>\n\n    <ion-infinite-scroll (ionInfinite)="fetchHomeData($event)">\n        <ion-infinite-scroll-content loadingSpinner="bubbles">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\messages\messages.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */]])
], MessagesPage);

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaguserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TaguserPage = (function () {
    function TaguserPage(navCtrl, remotService, viewCtrl) {
        this.navCtrl = navCtrl;
        this.remotService = remotService;
        this.viewCtrl = viewCtrl;
        this.searchTerm = '';
        this.searching = false;
        this.selectedTags = [];
        this.base_url = this.remotService.site_url;
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
    }
    TaguserPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(700).subscribe(function (search) {
            _this.setFilteredItems();
        });
    };
    TaguserPage.prototype.setFilteredItems = function () {
        var _this = this;
        this.users = [];
        this.searching = true;
        this.selectedTags = [];
        var searchparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            searchkeyword: this.searchTerm
        };
        this.remotService.postData(searchparams, 'getConnections').subscribe(function (response) {
            _this.searching = false;
            if (response.success == 1) {
                _this.users = response.data;
            }
            else {
                _this.remotService.presentToast('Error loading data.');
            }
        }, function () {
            _this.searching = false;
            _this.remotService.presentToast('Error loading data.');
        });
    };
    /**
     * on chnage checkbox
     */
    TaguserPage.prototype.tagThisUser = function (e, item, index) {
        if (e.checked)
            this.selectedTags[index] = item;
        else
            this.selectedTags.splice(index, 1);
        console.log("User should be tagged", e.checked, this.selectedTags);
    };
    TaguserPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ tags: this.selectedTags });
    };
    return TaguserPage;
}());
TaguserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-taguser',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\taguser\taguser.html"*/'<ion-header class="creoyou-header">\n  \n    <ion-navbar>\n        <ion-title>Tag A Friend</ion-title>\n        <ion-buttons end>\n            <button class="dismiss" (click)="dismiss()">\n                Done\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n    <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="setFilteredItems()"></ion-searchbar>\n    <div *ngIf="searching" class="spinner-container">\n       <ion-spinner></ion-spinner>\n    </div>\n  </ion-header>\n  \n   \n  <ion-content class="content-background">\n    \n       <ion-grid>\n           <ion-row class="tag_item"    *ngFor="let item of users;let idx = index">\n             \n                \n                  <ion-col col-4>\n                      <ion-checkbox start (ionChange)="tagThisUser($event,item,idx)"></ion-checkbox>\n                              <img *ngIf="item.image!=null && item.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{item.image}}" alt="avatar">\n                              <img *ngIf="item.image==null || item.image==\'\'" src="/assets/img/management.png" alt="avatar"> \n                  </ion-col>   \n                      \n                  <ion-col col-8>\n                     <p>{{item.users_full_name}}</p>\n                     <span>{{item.creativeField}}</span>\n                  </ion-col>\n              \n           </ion-row>\n       </ion-grid>\n    \n   </ion-content>\n  '/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\taguser\taguser.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */]])
], TaguserPage);

//# sourceMappingURL=taguser.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_invitefriend_invitefriend__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_otherprofile_otherprofile__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FollowPage = (function () {
    function FollowPage(navCtrl, navParams, events, remotService, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.remotService = remotService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.base_url = this.remotService.site_url;
        this.followActiveTab = "following";
        this.loadFollowings();
    }
    FollowPage.prototype.loadFollowers = function () {
        var _this = this;
        this.followerOffset = 0;
        var followerParams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            limit: this.followerOffset
        };
        this.followers = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(followerParams, 'followers').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                if (response.data != null) {
                    response.data.forEach(function (item, key, index) {
                        _this.followers.push(item);
                        console.log(_this.followers);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    FollowPage.prototype.loadFollowings = function () {
        var _this = this;
        this.followingOffset = 0;
        var followingparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            limit: this.followingOffset
        };
        this.following = [];
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(followingparams, 'following').subscribe(function (response) {
            _this.remotService.dismissLoader();
            console.log(response);
            if (response.success == 1) {
                if (response.data != null) {
                    response.data.forEach(function (item, key, index) {
                        _this.following.push(item);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    FollowPage.prototype.presentActionSheet = function (user, type, index) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            //title: 'Edit your post',
            buttons: [
                {
                    text: 'Unfollow',
                    role: 'destructive',
                    handler: function () {
                        _this.remotService.presentToast('wait...');
                        _this.remotService.postData({ 'user_id': user.id, 'to_userid': window.localStorage['userid'] }, 'unfollowUser').subscribe(function (response) {
                            if (response.success == 1) {
                                if (type == 1) {
                                    _this.following.splice(index, 1);
                                }
                                else {
                                    _this.followers.splice(index, 1);
                                }
                            }
                            else {
                                _this.remotService.presentToast(response.message);
                            }
                        }, function () {
                            _this.remotService.presentToast('Error loading data.');
                        });
                    }
                },
            ]
        });
        actionSheet.present();
    };
    FollowPage.prototype.fetchFollowerData = function (infiniteScroll) {
        var _this = this;
        this.followerOffset = this.followerOffset + 15;
        var followerparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            limit: this.followerOffset
        };
        this.remotService.postData(followerparams, 'followers').subscribe(function (response) {
            infiniteScroll.complete();
            if (response.success == 1) {
                if (response.data != null) {
                    response.data.forEach(function (item, key, index) {
                        _this.followers.push(item);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    FollowPage.prototype.fetchFollowingData = function (infiniteScroll) {
        var _this = this;
        this.followingOffset = this.followingOffset + 15;
        var followingparams = {
            user_id: window.localStorage['userid'],
            token: window.localStorage['token'],
            limit: this.followingOffset
        };
        this.remotService.postData(followingparams, 'following').subscribe(function (response) {
            infiniteScroll.complete();
            if (response.success == 1) {
                if (response.data != null) {
                    response.data.forEach(function (item, key, index) {
                        _this.following.push(item);
                    });
                }
            }
            else {
                _this.remotService.presentToast(response.message);
            }
        }, function () {
            infiniteScroll.complete();
            _this.remotService.presentToast('Error loading data.');
        });
    };
    FollowPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad NotificationsPage');
    };
    FollowPage.prototype.segmentChanged = function (event) {
        if (this.followActiveTab == 'following')
            this.loadFollowings();
        else
            this.loadFollowers();
    };
    FollowPage.prototype.inviteFriend = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_invitefriend_invitefriend__["a" /* InvitefriendPage */]);
    };
    FollowPage.prototype.OtherProfile = function (user) {
        var data = {
            user_id: user.id
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */], { 'otheruserfrofiledata': data });
        //this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data, 'friendcheck': connection.is_friend });
    };
    return FollowPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], FollowPage.prototype, "navBar", void 0);
FollowPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-follow',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\follow\follow.html"*/'<ion-header class="creoyou-header">\n\n    <ion-navbar>\n        <ion-title>Follow</ion-title>\n\n        <ion-buttons end>\n            <button (click)="inviteFriend();" class="add_connection" ion-button clear>\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n\n    <ion-segment (ionChange)="segmentChanged($event)" [(ngModel)]="followActiveTab">\n        <ion-segment-button value="following">\n            Following\n        </ion-segment-button>\n        <ion-segment-button value="followers">\n            Followers\n        </ion-segment-button>\n    </ion-segment>\n\n\n</ion-header>\n\n\n<ion-content>\n\n\n\n    <div [ngSwitch]="followActiveTab">\n\n        <ion-list *ngSwitchCase="\'following\'">\n\n            <ion-item *ngIf="following?.length<=0" class="no_result">\n                <h3> Sorry No Following User Found... </h3>\n            </ion-item>\n\n            <ion-list class="individual">\n\n                <ion-item *ngFor="let user of following;let idx=index;" padding-horizontal class="search_user search_user_individual">\n                    <ion-avatar item-left (click)="OtherProfile(user)">\n                        <img *ngIf="user.image!=null && user.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{user.image}}" alt="avatar">\n                        <img *ngIf="user.image==null || user.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n                    </ion-avatar>\n                    <ion-item class="searcsh_right">\n                        <div (click)="OtherProfile(user)">\n                            <p>{{user.fname}} {{user.lname}}</p>\n                            <p *ngIf="user.buisness_name">{{user.buisness_name}}</p>\n\n                            <p class="user_deg">\n                                <ion-icon name="briefcase"></ion-icon> {{user.creativeField}}</p>\n                            <p class="user_deg">\n                                <ion-icon name="home"></ion-icon> Kolata, West Bengal, India</p>\n                        </div>\n                        <div class="user_action" (click)="presentActionSheet(user,1,idx);" item-right>\n                            <ion-icon item-right ios="ios-settings" md="md-settings"></ion-icon>\n                        </div>\n                    </ion-item>\n                </ion-item>\n\n            </ion-list>\n\n            <ion-infinite-scroll (ionInfinite)="fetchFollowingData($event)">\n                <ion-infinite-scroll-content loadingSpinner="bubbles">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'followers\'">\n\n            <ion-item *ngIf="followers?.length<=0" class="no_result">\n                <h3> Sorry No Follower Found... </h3>\n            </ion-item>\n\n            <ion-list class="individual">\n\n                <ion-item *ngFor="let user of followers;let idx=index;" padding-horizontal class="search_user search_user_individual">\n                    <ion-avatar item-left (click)="OtherProfile(user)">\n                        <img *ngIf="user.image!=null && user.image!=\'\'" src="{{base_url}}uploads/profileImages/resizedImages/{{user.image}}" alt="avatar">\n                        <img *ngIf="user.image==null || user.image==\'\'" src="/assets/img/management.png" alt="avatar">\n\n                    </ion-avatar>\n                    <ion-item class="searcsh_right">\n                        <div (click)="OtherProfile(user)">\n                            <p>{{user.fname}} {{user.lname}}</p>\n                            <p *ngIf="user.buisness_name">{{user.buisness_name}}</p>\n                            <p class="user_deg">\n                                <ion-icon name="briefcase"></ion-icon> {{user.creativeField}}</p>\n                            <p class="user_deg">\n                                <ion-icon name="home"></ion-icon> Kolata, West Bengal, India</p>\n                        </div>\n                        <div class="user_action" (click)="presentActionSheet(user,2,idx);" item-right>\n                            <ion-icon item-right ios="ios-settings" md="md-settings"></ion-icon>\n                        </div>\n                    </ion-item>\n                </ion-item>\n\n            </ion-list>\n\n            <ion-infinite-scroll (ionInfinite)="fetchFollowerData($event)">\n                <ion-infinite-scroll-content loadingSpinner="bubbles">\n                </ion-infinite-scroll-content>\n            </ion-infinite-scroll>\n\n\n        </ion-list>\n\n    </div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\follow\follow.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
], FollowPage);

//# sourceMappingURL=follow.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_jobapply_jobapply__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otherprofile_otherprofile__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the JobdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JobdetailsPage = (function () {
    /*  apply: boolean; */
    function JobdetailsPage(modalCtrl, remotService, events, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.remotService = remotService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.base_url = this.remotService.site_url;
        this.jobs = navParams.get('jobsparam');
        this.jobid = this.jobs.id;
    }
    JobdetailsPage.prototype.getjobdetails = function () {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            job_id: this.jobid,
            token: window.localStorage['token']
        };
        this.remotService.presentLoading('wait ...');
        this.remotService.postData(DataToSend, 'jobFullDetails').subscribe(function (response) {
            _this.remotService.dismissLoader();
            _this.jobdetails = response.data.Details;
            _this.appliedjob = response.data.Status.flag;
            console.log(_this.jobdetails);
            /*  if (this.appliedjob == 'Applied') {
               this.apply = true;
             }
             else {
               this.apply = false;
             } */
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    JobdetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        //over ridding back button
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:hidemenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad JobdetailsPage');
        this.getjobdetails();
    };
    JobdetailsPage.prototype.applyjob = function () {
        var _this = this;
        var premium_user = window.localStorage['premium_user'];
        if (premium_user == 1) {
            this.presentProfileModal();
        }
        else {
            var DataToSend = {
                user_id: window.localStorage['userid'],
                job_id: this.jobid,
                token: window.localStorage['token']
            };
            this.remotService.presentLoading('wait ...');
            this.remotService.postData(DataToSend, 'applyJob').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    console.log(response);
                    _this.appliedjob = 'Applied';
                    console.log(_this.appliedjob);
                    //this.jobdetails = response.data.Details;
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error!');
            });
        }
    };
    JobdetailsPage.prototype.presentProfileModal = function () {
        var _this = this;
        var uploadcvModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_jobapply_jobapply__["a" /* JobapplyPage */], { jobid: this.jobid });
        uploadcvModal.onDidDismiss(function (data) {
            if (data.success == 1)
                _this.appliedjob = 'Applied';
            //item.comments = data.commentlength;
        });
        uploadcvModal.present();
    };
    JobdetailsPage.prototype.OtherProfile = function (job) {
        var data = {
            user_id: job.created_by
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otherprofile_otherprofile__["a" /* OtherprofilePage */], { 'otheruserfrofiledata': data });
    };
    return JobdetailsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], JobdetailsPage.prototype, "navBar", void 0);
JobdetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-jobdetails',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\jobdetails\jobdetails.html"*/'<!--\n  Generated template for the JobDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="creoyou-header">\n\n  <ion-navbar>\n    <ion-title>Job Details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="content-background">\n\n\n  <ion-grid>\n    <ion-row *ngFor="let job of jobdetails">\n\n\n      <ion-col class="job_comapny_details" col-12 (click)="OtherProfile(job)">\n        <img src="{{base_url}}uploads/profileImages/resizedImages/{{job.profile_image}}" alt="Image" />\n        <h3>{{job.buisness_name}}</h3>\n        <h2>{{job.job_title}}</h2>\n        <p>\n          <ion-icon ios="ios-locate" md="md-locate"></ion-icon> {{job.city}}, {{job.state}},{{job.country}}</p>\n\n      </ion-col>\n      <ion-col class="job_content" col-12>\n        <h3>Posted On</h3>\n        <p> {{job.updation_date | date:\'fullDate\'}}</p>\n\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Description</h3>\n        <p>{{job.description}}</p>\n\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Required Experience</h3>\n        <p>{{job.required_experience}}</p>\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Required skill</h3>\n        <p>{{job.required_skills}}</p>\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Job Type </h3>\n        <p>{{job.jobtype}}</p>\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Salary </h3>\n        <p>{{job.salary}}</p>\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Last Date to Apply </h3>\n        <p>{{job.deadline_for_application | date:\'fullDate\'}}</p>\n      </ion-col>\n      <ion-col class="job_content" col-12>\n        <h3>Country</h3>\n        <p>{{job.country}}</p>\n      </ion-col>\n      <ion-col class="job_content" col-12>\n        <h3>State</h3>\n        <p>{{job.state}}</p>\n      </ion-col>\n      <ion-col class="job_content" col-12>\n        <h3>City</h3>\n        <p>{{job.city}}</p>\n      </ion-col>\n\n      <ion-col class="job_content" col-12>\n        <h3>Keywords</h3>\n        <p>{{job.jkey}}</p>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar class="button_bottom_top">\n    <button *ngIf="appliedjob == \'Applied\'" class="sign-up button button-block button-stable" (click)="applyjob(job)" [disabled]="appliedjob == \'Applied\'">Already Apply</button>\n    <button *ngIf="appliedjob == \'Not Applied\'" class="sign-up button button-block button-stable" (click)="applyjob()">Apply</button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\jobdetails\jobdetails.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], JobdetailsPage);

//# sourceMappingURL=jobdetails.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_categories_categories__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_reg_validator_reg_validator__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__socialreg_socialreg__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var RegistrationPage = (function () {
    function RegistrationPage(navCtrl, navParams, formBuilder, remotService, modalCtrl, events, regValidator, fb, googlePlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.regValidator = regValidator;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.userType = 0;
        this.regStep = 0;
        this.catid = 0;
        this.otpnumber = 0;
        this.userid = 0;
        this.urlcode = '';
        this.nameplaceHolder = "Full Name";
        this.submitAttempt = false;
        this.loginpage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.FormRegistrationStepOne = formBuilder.group({
            fullname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^$|^[A-Za-z0-9 ]+'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
            cfield: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, regValidator.mailFormat()]), regValidator.checkuniquevalueoffield('email', 1).bind(regValidator)]
        });
        this.FormRegistrationStepThree = formBuilder.group({
            otpno: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])]
        });
        this.FormRegistrationStepTwo = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^$|^[A-Za-z0-9]+'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]), regValidator.checkuniquevalueoffield('username', 1).bind(regValidator)],
            mobileno: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(15)]),
                regValidator.checkuniquevalueoffield('mobile_no', 1)
            ],
            mobilecode: ['+91', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*()_+-\|=;:”,.?]).{8,20})')
                ])],
            confirmpassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, regValidator.equalto("password")])]
        });
        this.countryCode = regValidator.countryCodes;
        // this.regStep = 3;
    }
    RegistrationPage.prototype.setConfirmPasswordBlank = function () {
        this.FormRegistrationStepTwo.get('confirmpassword').setValue('');
    };
    RegistrationPage.prototype.ionViewDidLoad = function () {
    };
    RegistrationPage.prototype.selectRegtype = function (typeOfuser) {
        this.userType = typeOfuser;
        this.nameplaceHolder = (typeOfuser == 1) ? "Full Name" : "Business Name";
    };
    RegistrationPage.prototype.startRegistrationForm = function () {
        this.regStep = 1;
    };
    RegistrationPage.prototype.gotoSecondStep = function () {
        this.submitAttempt = true;
        // console.log(stepOnevalue);
        if (this.FormRegistrationStepOne.valid) {
            this.regStep = 2;
            this.submitAttempt = false;
        }
    };
    RegistrationPage.prototype.showCategoryModal = function () {
        var _this = this;
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_categories_categories__["a" /* CategoriesPage */]);
        categoryModal.onDidDismiss(function (data) {
            // Do things with data coming from modal, for instance :
            if (data.hasOwnProperty("id")) {
                console.log("GOt from modal", data);
                _this.FormRegistrationStepOne.get('cfield').setValue(data.name);
                _this.catid = data.id;
            }
        });
        categoryModal.present();
    };
    RegistrationPage.prototype.sendRegistrationForm = function (stepTwovalue) {
        var _this = this;
        this.submitAttempt = true;
        if (this.FormRegistrationStepOne.valid && this.FormRegistrationStepTwo.valid) {
            var stepOneform = this.FormRegistrationStepOne.value;
            var stepTwoform = this.FormRegistrationStepTwo.value;
            console.log(this.userType, stepOneform, stepTwoform);
            var regData = {
                user_type: this.userType,
                name: stepOneform.fullname,
                cat_id: this.catid,
                cat_name: stepOneform.cfield,
                email: stepOneform.email,
                username: stepTwoform.username,
                mobile_code: stepTwoform.mobilecode,
                mobile_no: stepTwoform.mobileno,
                password: stepTwoform.password
            };
            this.remotService.presentLoading("Please wait ...");
            this.remotService.postData(regData, 'userRegistration').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    _this.otpnumber = response.data.OTP;
                    _this.regStep = 3;
                    _this.submitAttempt = false;
                }
                else {
                    _this.remotService.presentToast('Error saving data.');
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error saving data.');
            });
        }
    };
    RegistrationPage.prototype.verifyOtp = function () {
        var _this = this;
        var stepThreeform = this.FormRegistrationStepThree.value;
        var stepTwoform = this.FormRegistrationStepTwo.value;
        var otpParams = {
            otp: stepThreeform.otpno,
            mobile: stepTwoform.mobileno,
        };
        this.remotService.presentLoading("Verifying ...");
        this.remotService.postData(otpParams, 'HelpusingUsername').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                _this.remotService.presentToast('Registration successful.');
            }
            else {
                _this.remotService.presentToast('Otp veryfication failed.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Otp veryfication failed.');
        });
    };
    RegistrationPage.prototype.resendcode = function () {
        var _this = this;
        var stepTwoform = this.FormRegistrationStepTwo.value;
        var codeData = {
            userUrlCode: this.urlcode,
            userMobileCode: stepTwoform.mobilecode,
            userMobile: stepTwoform.mobileno
        };
        this.remotService.presentLoading("Please wait ...");
        this.remotService.postData(codeData, 'reSendSms').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.remotService.dismissLoader();
                _this.otpnumber = response.data.OTP;
            }
            else {
                _this.remotService.presentToast('Error Sending Otp.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error Sending Otp.');
        });
    };
    RegistrationPage.prototype.googleLogIn = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            console.log("google login", res);
            var googleparams = {
                google_id: res.userId,
                email: res.email,
            };
            _this.remotService.presentLoading("Please wait ...");
            _this.remotService.postData(googleparams, 'googlelogin').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    var dataRes = response.data;
                    window.localStorage['usertype'] = dataRes.user_type;
                    window.localStorage['userid'] = dataRes.user_id;
                    window.localStorage['token'] = dataRes.token;
                    window.localStorage['username'] = dataRes.username;
                    window.localStorage['premium_user'] = dataRes.premium_user;
                    window.localStorage['name'] = dataRes.name;
                    // fire event in app.component to show the header
                    _this.events.publish('user:loggedin');
                    _this.remotService.presentToast('Logged in successfully.');
                }
                else {
                    var params = {
                        data: res,
                        type: 'google'
                    };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__socialreg_socialreg__["a" /* SocialregPage */], params);
                    //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error!');
            });
        })
            .catch(function (err) { return console.error(err); });
    };
    RegistrationPage.prototype.faceBooklogin = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.getFbUserDetail(res.authResponse.userID);
            }
            else {
            }
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    RegistrationPage.prototype.getFbUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,token_for_business", ["public_profile"])
            .then(function (res) {
            console.log(res);
            var facemail = res.hasOwnProperty("email") ? res.email : null;
            var fbParams = {
                email: facemail,
                facebook_id: res.token_for_business,
            };
            _this.remotService.presentLoading("Please wait ...");
            _this.remotService.postData(fbParams, 'Facebooklogin').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    var dataRes = response.data;
                    console.log(dataRes);
                    window.localStorage['usertype'] = dataRes.user_type;
                    window.localStorage['userid'] = dataRes.user_id;
                    window.localStorage['token'] = dataRes.token;
                    window.localStorage['username'] = dataRes.username;
                    window.localStorage['premium_user'] = dataRes.premium_user;
                    window.localStorage['name'] = dataRes.name;
                    // fire event in app.component to show the header
                    _this.events.publish('user:loggedin');
                    _this.remotService.presentToast('Logged in successfully.');
                }
                else {
                    var params = {
                        data: res,
                        type: 'facebook'
                    };
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__socialreg_socialreg__["a" /* SocialregPage */], params);
                    //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error!');
            });
            //this.users = res;
        })
            .catch(function (e) {
            _this.remotService.presentToast("Error logging in using facebook.");
            console.log(e);
        });
    };
    return RegistrationPage;
}());
RegistrationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-registration',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\registration\registration.html"*/'<ion-content class="content-background">\n\n    <ion-row [class.logo-row-step-0]="regStep === 0" [class.logo-row-step-1]="regStep != 0">\n        <ion-col text-center>\n            <img src="assets/img/logo.png" class="app_logo">\n            <p *ngIf="regStep==0" class="pl_for">ARE YOU?</p>\n        </ion-col>\n    </ion-row>\n    <ion-row *ngIf="regStep==0">\n        <ion-col col-6 choice>\n            <button class="button individual" (click)="selectRegtype(1)" [class.active]="userType === 1">\n                <span>\n                    <img src="assets/img/individual_icon.png" class="indi_logo">\n                </span>\n                <h5>Individual</h5>\n            </button>\n        </ion-col>\n        <ion-col col-6>\n            <button class="button business" (click)="selectRegtype(2)" [class.active]="userType === 2">\n                <span>\n                    <img src="assets/img/business_icon.png" class="busi_logo">\n                </span>\n                <h5>Business</h5>\n            </button>\n        </ion-col>\n    </ion-row>\n\n\n    <ion-row *ngIf="regStep==1">\n        <form [formGroup]="FormRegistrationStepOne">\n            <ion-row class="login-box">\n                <ion-col col-12 class="fld">\n                    <ion-input class="input-fld" type="text" formControlName="fullname" placeholder="{{nameplaceHolder}}" required></ion-input>\n                    <span class="error" *ngIf="FormRegistrationStepOne.get(\'fullname\').hasError(\'required\') && (FormRegistrationStepOne.controls.fullname.dirty || submitAttempt)">\n                        Full name is required\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepOne.get(\'fullname\').hasError(\'pattern\') && (FormRegistrationStepOne.controls.fullname.dirty || submitAttempt)">\n                        Only characters and numbers allowed\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepOne.get(\'fullname\').hasError(\'minlength\') && (FormRegistrationStepOne.controls.fullname.dirty || submitAttempt)">\n                        Minimum of 4 characters\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepOne.get(\'fullname\').hasError(\'maxlength\') && (FormRegistrationStepOne.controls.fullname.dirty || submitAttempt)">\n                        Maximum of 50 characters\n                    </span>\n\n                </ion-col>\n                <ion-col col-12 class="fld">\n                    <ion-input class="input-fld" (click)="showCategoryModal()" [readonly]=true placeholder="Select Creative Field" type="text"\n                        formControlName="cfield" required></ion-input>\n                    <span class="error" *ngIf="!FormRegistrationStepOne.controls.cfield.valid  &&\n                    (FormRegistrationStepOne.controls.cfield.dirty || submitAttempt)">\n                        <p>Please select a valid creative field.</p>\n                    </span>\n                </ion-col>\n                <ion-col col-12 class="fld">\n                    <ion-input class="input-fld" type="email" name="email" formControlName="email" placeholder="Email Address" required></ion-input>\n                    <span *ngIf="FormRegistrationStepOne.controls.email.pending && (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n                        <ion-spinner name="bubbles"></ion-spinner>\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepOne.get(\'email\').hasError(\'required\') && (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n                        Email is required\n                    </span>\n                    <span class="error" *ngIf="(FormRegistrationStepOne.get(\'email\').hasError(\'incorrectMailFormat\') && !FormRegistrationStepOne.get(\'email\').hasError(\'required\'))\n                     && (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n                        Email address is invalid.\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepOne.get(\'email\').hasError(\'Inuse\') && \n                    (FormRegistrationStepOne.controls.email.dirty || submitAttempt)">\n                        Email is already in use\n                    </span>\n                </ion-col>\n\n                <ion-col col-12>\n                    <button ion-button class="sign-in" (click)="gotoSecondStep()" [disabled]="!FormRegistrationStepOne.valid" full type="submit">Next</button>\n\n                </ion-col>\n                <!--                    <ion-col col-6>\n                            <button ion-button class="sign-in" (click)="regStep=0" full type="button" >Back</button>\n                    </ion-col>-->\n            </ion-row>\n\n        </form>\n\n        <ion-col class="step-1-devider" col-12>\n            <hr class="hr-text" data-content="OR">\n        </ion-col>\n\n        <ion-row class="social-login-btn-group">\n            <ion-col text-center col-6>\n                <a class="face_sign" (click)="faceBooklogin()">\n                    <span>\n                        <img src="assets/img/facebook_icon.png">\n                    </span>\n                    Facebook\n                </a>\n            </ion-col>\n            <ion-col text-center col-6>\n                <a class="goog_sign" (click)="googleLogIn()">\n                    <span>\n                        <img src="assets/img/goog.png">\n                    </span>\n                    Google\n                </a>\n            </ion-col>\n        </ion-row>\n    </ion-row>\n\n    <ion-row *ngIf="regStep==2">\n\n\n        <form [formGroup]="FormRegistrationStepTwo" (ngSubmit)="sendRegistrationForm(FormRegistrationStepTwo.value)">\n            <ion-row class="login-box">\n                <ion-col col-12 class="fld">\n                    <ion-input class="input-fld extra-pad" type="text" name="username" placeholder="Username" formControlName="username" required></ion-input>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'username\').hasError(\'pattern\') && (FormRegistrationStepTwo.get(\'username\').touched || submitAttempt)">\n                        Only characters and numbers allowed\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'username\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'username\').touched || submitAttempt)">\n                        Username is required\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'username\').hasError(\'Inuse\') && (FormRegistrationStepTwo.get(\'username\').touched || submitAttempt)">\n                        Username is already taken\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'username\').hasError(\'minlength\') && (FormRegistrationStepTwo.get(\'username\').touched || submitAttempt)">\n                        Minimum of 4 characters\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'username\').hasError(\'maxlength\') && (FormRegistrationStepTwo.get(\'username\').touched || submitAttempt)">\n                        Maximum of 50 characters\n                    </span>\n                    <span *ngIf="FormRegistrationStepTwo.controls.username.pending">\n                        <ion-spinner name="bubbles"></ion-spinner>.\n                    </span>\n                </ion-col>\n\n                <ion-col col-3>\n                    <ion-select formControlName="mobilecode" multiple="false" class="mobile-code">\n                        <ion-option value="{{item.dial_code}}" *ngFor="let item of countryCode">{{item.dial_code}}</ion-option>\n                    </ion-select>\n                </ion-col>\n                <ion-col col-9>\n                    <ion-input placeholder="Phone Number" type="number" formControlName="mobileno" class="input-fld extra-pad"></ion-input>\n\n                    <span *ngIf="FormRegistrationStepTwo.controls.mobileno.pending">\n                        <ion-spinner name="bubbles"></ion-spinner>\n                    </span>\n                </ion-col>\n\n                <ion-col col-12>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'pattern\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n                        Mobile numberr should be only numbers\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n                        Mobile no is required\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobilecode\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n                        Mobile code is required\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'Inuse\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n                        Mobile no is already taken\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'minlength\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n                        Minimum of 4 characters\n                    </span>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'mobileno\').hasError(\'maxlength\') && (FormRegistrationStepTwo.get(\'mobileno\').touched || submitAttempt)">\n                        Maximum of 15 characters\n                    </span>\n                </ion-col>\n\n\n\n                <ion-col col-12 class="fld">\n                    <ion-input class="input-fld extra-pad" (keyup)="setConfirmPasswordBlank()" type="password" placeholder="Enter Password" formControlName="password"\n                        required></ion-input>\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'password\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'password\').touched || submitAttempt)">\n                        Password is required\n                    </span>\n\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'password\').hasError(\'pattern\')  && (FormRegistrationStepTwo.get(\'password\').touched || submitAttempt)">\n                        <p>Passwords must have a lowercase letter and uppercase letter and a number and between 8 to 20 char.</p>\n                    </span>\n                </ion-col>\n                <ion-col col-12 class="fld">\n                    <ion-input class="input-fld extra-pad" type="password" placeholder="Confirm Password" formControlName="confirmpassword" required></ion-input>\n\n                    <span class="error" *ngIf="FormRegistrationStepTwo.get(\'confirmpassword\').hasError(\'equalTo\')\n                         && (FormRegistrationStepTwo.controls.confirmpassword.dirty || submitAttempt)">\n                        Please enter same password\n                    </span>\n\n                </ion-col>\n                <ion-col col-12 text-center>\n                    <span class="ter_pri">By clicking Sign Up, you agree with CreoYou\'s\n                        <a (click)="termofuse()">\n                            Terms of Use</a> and\n                        <a (click)="privacypolicy()">Privacy Policy</a>.\n\n                    </span>\n                </ion-col>\n                <ion-col col-12>\n                    <button ion-button class="sign-in" [disabled]="!FormRegistrationStepTwo.valid" full type="submit">Sign Up</button>\n\n                </ion-col>\n                <!--                <ion-col col-6>\n                        <button ion-button class="sign-in" (click)="startRegistrationForm()" full type="button" >Back</button>\n    \n                </ion-col>-->\n            </ion-row>\n\n        </form>\n\n    </ion-row>\n\n    <ion-row *ngIf="regStep==3">\n        <form [formGroup]="FormRegistrationStepThree">\n            <ion-row class="login-box">\n\n                <ion-col col-12 text-center>\n                    <span class="accepted_icon">\n                        <img src="assets/img/accepeted_icon.png" class="app_logo">\n                    </span>\n                </ion-col>\n\n                <ion-col col-12 text-center>\n\n                    <span class="V_code">We Have Sent A Verification Code To\n                        <br> {{mobileno}}</span>\n                </ion-col>\n\n\n                <ion-col col-12>\n                    <ion-input placeholder="Enter Confirmation Code Here" type="number" formControlName="otpno" class="input-fld"></ion-input>\n\n                    <span class="error" *ngIf="FormRegistrationStepThree.get(\'otpno\').hasError(\'required\') && (FormRegistrationStepThree.get(\'otpno\').touched)">\n                        Otp is required\n                    </span>\n\n                </ion-col>\n                <ion-col col-12 text-center>\n                    <span class="ter_pri">Want to change the Mobile Number ?</span>\n                </ion-col>\n                <ion-col col-12 text-center>\n                    <button class="next_stape" (click)="verifyOtp()">Next</button>\n                </ion-col>\n                <ion-col col-12 text-center>\n                    <a class="tab-item tab-item-active" (click)="resendcode()">Resend Code</a>\n                </ion-col>\n\n\n            </ion-row>\n        </form>\n    </ion-row>\n\n</ion-content>\n\n<ion-footer *ngIf="regStep!=2">\n\n    <ion-row *ngIf="regStep==0" class="button_bottom_top">\n        <a class="sign-up button button-block button-stable" [navPush]="loginpage">Already have an account?\n            <span>Sign In</span>\n        </a>\n    </ion-row>\n\n    <ion-toolbar *ngIf="regStep==1" class="bar-positive already_sign">\n        <a class="tab-item tab-item-active" [navPush]="loginpage">Already have an account?\n            <span>Sign In</span>\n        </a>\n    </ion-toolbar>\n\n    <ion-toolbar *ngIf="regStep==0">\n        <button (click)="startRegistrationForm()" text-center [disabled]="userType==0" class="next_stape">\n            <ion-icon name="checkmark"></ion-icon> Next</button>\n    </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\registration\registration.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_reg_validator_reg_validator__["a" /* RegValidatorProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_plus__["a" /* GooglePlus */]])
], RegistrationPage);

//# sourceMappingURL=registration.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocialregPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_categories_categories__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_reg_validator_reg_validator__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SocialregPage = (function () {
    function SocialregPage(navCtrl, navParams, formBuilder, remotService, modalCtrl, regValidator, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.remotService = remotService;
        this.modalCtrl = modalCtrl;
        this.regValidator = regValidator;
        this.events = events;
        this.userType = 0;
        this.regStep = 1;
        this.catid = 0;
        this.otpnumber = 0;
        this.userid = 0;
        this.urlcode = '';
        this.nameplaceHolder = "Full Name";
        this.submitAttempt = false;
        this.loginpage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.socialinfo = navParams.get('data');
        this.regtype = navParams.get('type');
        console.log(this.socialinfo);
        this.regStep = 1;
        this.FormRegistrationStepTwo = formBuilder.group({
            otpno: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])]
        });
        this.FormRegistrationStepOne = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^$|^[A-Za-z0-9]+'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
                regValidator.checkuniquevalueoffield('username', 1).bind(regValidator)],
            mobileno: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(4), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(15)]),
                regValidator.checkuniquevalueoffield('mobile_no', 1)],
            mobilecode: ['+91', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
            cfield: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])],
        });
        this.countryCode = regValidator.countryCodes;
    }
    SocialregPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SocialregPage');
    };
    SocialregPage.prototype.showCategoryModal = function () {
        var _this = this;
        var categoryModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_categories_categories__["a" /* CategoriesPage */]);
        categoryModal.onDidDismiss(function (data) {
            // Do things with data coming from modal, for instance :
            if (data.hasOwnProperty("id")) {
                console.log("GOt from modal", data);
                _this.FormRegistrationStepOne.get('cfield').setValue(data.name);
                _this.catid = data.id;
            }
        });
        categoryModal.present();
    };
    SocialregPage.prototype.sendRegistrationForm = function (stepTwovalue) {
        var _this = this;
        this.submitAttempt = true;
        if (this.FormRegistrationStepOne.valid) {
            var stepOneform = this.FormRegistrationStepOne.value;
            var regUrl = 'FacebookRegistration';
            var othercat = isNaN(stepOneform.cfield) ? stepOneform.cfield : '';
            if (this.regtype == 'google') {
                this.remoteParams = {
                    name: this.socialinfo.displayName,
                    email: this.socialinfo.email,
                    mobile: stepOneform.mobileno,
                    google_id: this.socialinfo.userId,
                    userName: stepOneform.username,
                    category: stepOneform.cfield,
                    subcategory: othercat,
                    mobile_code: stepOneform.mobilecode
                };
                regUrl = 'googleRegistration';
            }
            else {
                this.remoteParams = {
                    name: this.socialinfo.name,
                    email: this.socialinfo.email,
                    mobile: stepOneform.mobileno,
                    facebook_id: this.socialinfo.token_for_business,
                    userName: stepOneform.username,
                    category: stepOneform.cfield,
                    subcategory: othercat,
                    mobile_code: stepOneform.mobilecode
                };
            }
        }
        this.remotService.presentLoading("Wait ...");
        this.remotService.postData(this.remoteParams, regUrl).subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                var dataRes = response.data;
                window.localStorage['usertype'] = dataRes.user_type;
                window.localStorage['userid'] = dataRes.user_id;
                window.localStorage['token'] = dataRes.token;
                window.localStorage['username'] = dataRes.username;
                window.localStorage['premium_user'] = dataRes.premium_user;
                window.localStorage['name'] = dataRes.name;
                // fire event in app.component to show the header
                _this.events.publish('user:loggedin');
                _this.remotService.presentToast('Logged in successfully.');
            }
            else {
                _this.remotService.presentToast('Registration failed.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error!');
        });
    };
    SocialregPage.prototype.verifyOtp = function () {
        var _this = this;
        var stepTwoform = this.FormRegistrationStepTwo.value;
        var stepOneform = this.FormRegistrationStepTwo.value;
        var otpParams = {
            otp: stepTwoform.otpno,
            mobile: stepOneform.mobileno,
        };
        this.remotService.presentLoading("Verifying ...");
        this.remotService.postData(otpParams, 'HelpusingUsername').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                _this.remotService.presentToast('Registration successful.');
            }
            else {
                _this.remotService.presentToast('Otp veryfication failed.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Otp veryfication failed.');
        });
    };
    SocialregPage.prototype.resendcode = function () {
        var _this = this;
        var stepOneform = this.FormRegistrationStepOne.value;
        var codeData = {
            userUrlCode: this.urlcode,
            userMobileCode: stepOneform.mobilecode,
            userMobile: stepOneform.mobileno
        };
        this.remotService.presentLoading("Please wait ...");
        this.remotService.postData(codeData, 'reSendSms').subscribe(function (response) {
            _this.remotService.dismissLoader();
            if (response.success == 1) {
                _this.remotService.dismissLoader();
                _this.otpnumber = response.data.OTP;
            }
            else {
                _this.remotService.presentToast('Error Sending Otp.');
            }
        }, function () {
            _this.remotService.dismissLoader();
            _this.remotService.presentToast('Error Sending Otp.');
        });
    };
    return SocialregPage;
}());
SocialregPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-socialreg',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\socialreg\socialreg.html"*/'<ion-content class="content-background"  >\n    \n    <ion-row class="logo-row-step-1"  >\n        <ion-col text-center>\n            <img src="assets/img/logo.png" class="app_logo"> \n        </ion-col>\n    </ion-row>  \n\n        <ion-row *ngIf="regStep==1">\n    \n            <form [formGroup]="FormRegistrationStepOne" (ngSubmit)="sendRegistrationForm(FormRegistrationStepOne.value)" >\n                <ion-row class="login-box">\n                    <ion-col col-12 class="fld"> \n                        <ion-input class="input-fld extra-pad" type="text" name="username" placeholder="Username" formControlName="username"  required></ion-input>\n                        <span class="error" *ngIf="FormRegistrationStepOne.get(\'username\').hasError(\'pattern\') && (FormRegistrationStepOne.get(\'username\').touched || submitAttempt)">\n                                Only characters and numbers allowed\n                        </span>\n                        <span class="error" *ngIf="FormRegistrationStepOne.get(\'username\').hasError(\'required\') && (FormRegistrationStepOne.get(\'username\').touched || submitAttempt)">\n                                Username  is required\n                        </span>\n                        <span class="error" *ngIf="FormRegistrationStepOne.get(\'username\').hasError(\'Inuse\') && (FormRegistrationStepOne.get(\'username\').touched || submitAttempt)">\n                                Username is already taken\n                        </span>\n                        <span class="error" *ngIf="FormRegistrationStepOne.get(\'username\').hasError(\'minlength\') && (FormRegistrationStepOne.get(\'username\').touched || submitAttempt)">\n                          Minimum of 4 characters\n                        </span>\n                        <span class="error" *ngIf="FormRegistrationStepOne.get(\'username\').hasError(\'maxlength\') && (FormRegistrationStepOne.get(\'username\').touched || submitAttempt)">\n                          Maximum of 50 characters\n                        </span>\n                        <span *ngIf="FormRegistrationStepOne.controls.username.pending">\n                            <ion-spinner name="bubbles"></ion-spinner>.\n                        </span>\n                    </ion-col>\n    \n                        <ion-col col-3 >\n                            <ion-select formControlName="mobilecode"  multiple="false" class="mobile-code">\n                                <ion-option  value="{{item.dial_code}}" *ngFor="let item of countryCode">{{item.dial_code}}</ion-option>\n                            </ion-select> \n                        </ion-col>\n                        <ion-col col-9 > \n                            <ion-input placeholder="Phone Number"  type="number" formControlName="mobileno"  class="input-fld extra-pad"  ></ion-input>\n                             \n                            <span *ngIf="FormRegistrationStepOne.controls.mobileno.pending">\n                               <ion-spinner name="bubbles"></ion-spinner>\n                            </span>\n                        </ion-col>\n                    \n                        <ion-col col-12>\n                                <span class="error" *ngIf="FormRegistrationStepOne.get(\'mobileno\').hasError(\'pattern\') && (FormRegistrationStepOne.get(\'mobileno\').touched || submitAttempt)">\n                                    Mobile numberr should be only numbers\n                                </span>\n                                <span class="error" *ngIf="FormRegistrationStepOne.get(\'mobileno\').hasError(\'required\') && (FormRegistrationStepOne.get(\'mobileno\').touched || submitAttempt)">\n                                    Mobile no is required\n                                </span>\n                                <span class="error" *ngIf="FormRegistrationStepOne.get(\'mobilecode\').hasError(\'required\') && (FormRegistrationStepOne.get(\'mobileno\').touched || submitAttempt)">\n                                    Mobile code is required\n                                </span>\n                                <span class="error" *ngIf="FormRegistrationStepOne.get(\'mobileno\').hasError(\'Inuse\') && (FormRegistrationStepOne.get(\'mobileno\').touched || submitAttempt)">\n                                    Mobile no is already taken\n                                </span>\n                                <span class="error" *ngIf="FormRegistrationStepOne.get(\'mobileno\').hasError(\'minlength\') && (FormRegistrationStepOne.get(\'mobileno\').touched || submitAttempt)">\n                                    Minimum of 4 characters\n                                </span>\n                                <span class="error" *ngIf="FormRegistrationStepOne.get(\'mobileno\').hasError(\'maxlength\') && (FormRegistrationStepOne.get(\'mobileno\').touched || submitAttempt)">\n                                    Maximum of 15 characters\n                                </span>\n                        </ion-col>\n                        <ion-col col-12 class="fld">\n                            <ion-input class="input-fld" (click)="showCategoryModal()"  [readonly]=true placeholder="Select Category" type="text" formControlName="cfield"  required></ion-input>\n                            <span class="error" *ngIf="!FormRegistrationStepOne.controls.cfield.valid  &&\n                             (FormRegistrationStepOne.controls.cfield.dirty || submitAttempt)">\n                                 <p>Please select a valid category.</p>\n                            </span>\n                         </ion-col>\n                 \n                    <ion-col col-12  text-center > \n                        <span class="ter_pri" >By clicking Sign Up, you agree with CreoYou\'s <a (click) = "termofuse()">\n                                Terms of Use</a> and <a (click)="privacypolicy()" >Privacy Policy</a>.\n    \n                        </span>\n                    </ion-col>\n                    <ion-col col-12>\n                        <button ion-button class="sign-in" [disabled]="!FormRegistrationStepOne.valid" full type="submit" >Sign Up</button>\n    \n                    </ion-col>\n    <!--                <ion-col col-6>\n                            <button ion-button class="sign-in" (click)="startRegistrationForm()" full type="button" >Back</button>\n        \n                    </ion-col>-->\n                </ion-row>\n    \n            </form>\n    \n        </ion-row>\n    \n        <ion-row *ngIf="regStep==2">\n            <form [formGroup]="FormRegistrationStepTwo"  >\n                <ion-row class="login-box">\n                    \n                    <ion-col col-12 text-center >   \n                       <span class="accepted_icon"><img src="assets/img/accepeted_icon.png" class="app_logo"></span>\n                    </ion-col>  \n                    \n                    <ion-col col-12 text-center>\n                      \n                        <span class="V_code">We Have Sent A Verification Code To <br>  {{mobileno}}</span>\n                    </ion-col>\n                    \n                    \n                     <ion-col col-12>\n                                <ion-input placeholder="Enter Confirmation Code Here"  type="number" formControlName="otpno"  class="input-fld"  ></ion-input>\n                             \n                                <span class="error" *ngIf="FormRegistrationStepTwo.get(\'otpno\').hasError(\'required\') && (FormRegistrationStepTwo.get(\'otpno\').touched)">\n                                    Otp is required\n                                </span>\n                                \n                     </ion-col>\n                    <ion-col col-12 text-center>\n                          <span class="ter_pri" >Want to change the Mobile Number ?</span> \n                    </ion-col>\n                    <ion-col col-12 text-center>\n                         <button class="next_stape" (click)="verifyOtp()" >Next</button>\n                    </ion-col>\n                     <ion-col col-12 text-center>\n                              <a class="tab-item tab-item-active" (click)="resendcode()">Resend Code</a> \n                     </ion-col>\n                    \n                    \n                </ion-row>\n            </form>\n        </ion-row>    \n    \n    </ion-content>\n \n    \n    \n    \n    \n    \n    '/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\socialreg\socialreg.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_reg_validator_reg_validator__["a" /* RegValidatorProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
], SocialregPage);

//# sourceMappingURL=socialreg.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_searchfilter_searchfilter__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_jobdetails_jobdetails__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_otherprofile_otherprofile__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = (function () {
    function SearchPage(app, remotService, events, navCtrl, navParams) {
        this.app = app;
        this.remotService = remotService;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.people = false;
        this.business = false;
        this.jobs = false;
        this.advance = false;
        this.searchQuery = '';
        this.cat_name = '';
        this.name = '';
        this.company_name = '';
        this.jobTitle = '';
        this.jobKeywoard = '';
        this.specializations = '';
        this.advsearch = false;
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
    SearchPage.prototype.All = function () {
        this.all = true;
        this.people = false;
        this.business = false;
        this.jobs = false;
    };
    SearchPage.prototype.People = function () {
        this.all = false;
        this.business = false;
        this.people = true;
        this.jobs = false;
    };
    SearchPage.prototype.Business = function () {
        this.business = true;
        this.all = false;
        this.people = false;
        this.jobs = false;
    };
    SearchPage.prototype.Jobs = function () {
        this.all = false;
        this.people = false;
        this.business = false;
        this.jobs = true;
    };
    SearchPage.prototype.searchfilter = function () {
        /*  var adsdata = {
           people: people,
           business: business,
           jobs: jobs
         } */
        // console.log(this.searchbycatagory);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__pages_searchfilter_searchfilter__["a" /* SearchfilterPage */], { adsdata: this.searchbycatagory });
        //this.navCtrl.push(SearchfilterPage, { /* adsdata: adsdata */ });
    };
    SearchPage.prototype.search = function () {
        /*  this.all = true; */
        this.people = false;
        this.business = false;
        this.jobs = false;
        this.searchQuery;
        this.initsearch();
    };
    SearchPage.prototype.initsearch = function () {
        var _this = this;
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
            };
            // console.log(DataToSends);
            this.remotService.presentLoading('wait ...');
            this.remotService.postData(DataToSends, 'Advancedsearch').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    _this.business_user = response.data.BusinessUser;
                    _this.people_user = response.data.userInfo;
                    _this.jobs_user = response.data.JobSearch;
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('Error!');
            });
            // console.log('advance search');
        }
        else {
            var DataToSend = {
                user_id: window.localStorage['userid'],
                token: window.localStorage['token'],
                name: this.searchQuery
            };
            // console.log(DataToSend);
            this.remotService.presentLoading('wait ...');
            this.remotService.postData(DataToSend, 'searchDetails').subscribe(function (response) {
                _this.remotService.dismissLoader();
                if (response.success == 1) {
                    _this.business_user = response.data.BusinessUser;
                    _this.people_user = response.data.userInfo;
                    _this.jobs_user = response.data.JobSearch;
                    // console.log(response);
                    _this.all = true;
                }
            }, function () {
                _this.remotService.dismissLoader();
                _this.remotService.presentToast('!error');
            });
        }
    };
    /**
      * send request to a friend
      * @param connection
      */
    SearchPage.prototype.sendRequest = function (connection) {
        var _this = this;
        var token = window.localStorage['token'];
        var DataToSend = {
            from_user_id: window.localStorage['userid'],
            to_user_id: connection.id,
            token: token
        };
        this.remotService.presentToast('wait...');
        this.remotService.postData(DataToSend, 'sendRequset').subscribe(function (response) {
            if (response.success == 1) {
                _this.initsearch();
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    SearchPage.prototype.sendfollowingRequest = function (followingdata) {
        var _this = this;
        var DataToSend = {
            user_id: window.localStorage['userid'],
            to_userid: followingdata.id,
            token: window.localStorage['token'],
            user_type: window.localStorage['usertype']
        };
        this.remotService.presentToast('wait...');
        this.remotService.postData(DataToSend, 'followUser').subscribe(function (response) {
            if (response.success == 1) {
                _this.initsearch();
            }
        }, function () {
            _this.remotService.presentToast('Error loading data.');
        });
    };
    SearchPage.prototype.jobdetails = function (jobs) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_jobdetails_jobdetails__["a" /* JobdetailsPage */], { jobsparam: jobs });
        console.log(jobs);
    };
    SearchPage.prototype.OtherFrofileView = function (connection) {
        var data = {
            user_id: connection.id
        };
        console.log(connection.is_friend);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */], { 'otheruserfrofiledata': data, 'friendcheck': connection.is_friend });
        //this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data, 'friendcheck': connection.is_friend });
    };
    SearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('creoyou:hidemenu');
        this.navBar.backButtonClick = function () {
            _this.events.publish('creoyou:showmenu');
            _this.navCtrl.pop();
        };
        console.log('ionViewDidLoad SearchPage');
        this.initsearch();
    };
    SearchPage.prototype.segmentChanged = function (event) {
        if (this.searchbycatagory == 'all')
            this.initsearch();
        else if (this.searchbycatagory == 'people')
            this.initsearch();
        else if (this.searchbycatagory == 'business')
            this.initsearch();
        else if (this.searchbycatagory == 'jobs')
            this.initsearch();
    };
    return SearchPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], SearchPage.prototype, "navBar", void 0);
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-search',template:/*ion-inline-start:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\search\search.html"*/'<ion-header class="creoyou-header">\n\n  <ion-navbar class="Cero_search">\n    <ion-searchbar placeholder="People,Business,Job..." [(ngModel)]="searchQuery" (change)="search()"></ion-searchbar>\n  </ion-navbar>\n\n  <!--ion-row class="search_by">\n    <ion-col col-3 (click)="All()">\n      <span [class.active]="all">All</span>\n    </ion-col>\n    <ion-col col-3 (click)="People()">\n      <span [class.active]="people">People</span>\n    </ion-col>\n    <ion-col col-3 (click)="Business()">\n      <span [class.active]="business">Business</span>\n    </ion-col>\n    <ion-col col-3 (click)="Jobs()">\n      <span [class.active]="jobs">Jobs</span>\n    </ion-col>\n  </ion-row-->\n\n  <ion-segment (ionChange)="segmentChanged($event)" [(ngModel)]="searchbycatagory">\n    <ion-segment-button value="all">\n      All\n    </ion-segment-button>\n    <ion-segment-button value="people">\n      People\n    </ion-segment-button>\n    <ion-segment-button value="business">\n      Business\n    </ion-segment-button>\n    <ion-segment-button value="jobs">\n      Jobs\n    </ion-segment-button>\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content class="has-header">\n\n\n\n\n\n  <!-- search_by advsearch-->\n  <div *ngIf="advsearch">\n    <div *ngIf="people_user!=\'\'">\n      <h3 class="search_heading">People</h3>\n      <ion-list *ngFor="let people of people_user">\n\n        <ion-item padding-horizontal class="search_user search_user_individual">\n          <ion-avatar item-left (click)="OtherFrofileView(people)">\n            <img *ngIf="people.image" src="{{base_url}}uploads/profileImages/resizedImages/{{people.image}}" alt="Image" />\n            <img *ngIf="people.image==\'\' || people.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <div (click)="OtherFrofileView(business)">\n              <p>{{people.users_full_name}}</p>\n              <p class="user_deg" *ngIf="people.cat_name">\n                <ion-icon name="briefcase"></ion-icon> {{people.cat_name}}</p>\n              <p class="user_deg" *ngIf="people.city">\n                <ion-icon name="home"></ion-icon> {{people.city}}, {{people.state}}, {{people.country}}</p>\n            </div>\n            <div class="user_action" item-right>\n              <button [disabled]="people.friend==1 || people.follower==1" ion-button block icon-right (click)="sendRequest(people)">\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon> Add </button>\n              <button [disabled]="people.friend==1 || people.follower==1" ion-button block icon-right (click)="sendfollowingRequest(people)">\n                <i class="material-icons">forward</i> Follow </button>\n            </div>\n          </ion-item>\n        </ion-item>\n      </ion-list>\n    </div>\n    <!-- Business-->\n    <div *ngIf="business_user!=\'\'">\n      <h3 class="search_heading">Business</h3>\n      <ion-list *ngFor="let business of business_user">\n\n        <ion-item padding-horizontal class="search_user search_user_individual">\n          <ion-avatar item-left (click)="OtherFrofileView(business)">\n            <img *ngIf="business.image" src="{{base_url}}uploads/profileImages/resizedImages/{{business.image}}" alt="Image" />\n            <img *ngIf="business.image==\'\' || business.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <div (click)="OtherFrofileView(business)">\n              <p>{{business.buisness_name}}</p>\n              <p class="user_deg" *ngIf="business.cat_name">\n                <ion-icon name="briefcase"></ion-icon> {{business.cat_name}}</p>\n              <p class="user_deg" *ngIf="business.city">\n                <ion-icon name="home"></ion-icon> {{business.city}}, {{business.state}}, {{business.country}}</p>\n            </div>\n            <div class="user_action" item-right>\n              <button [disabled]="business.friend==1 || business.follower==1" ion-button block icon-right (click)="sendRequest(business)">\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon> Add </button>\n              <button [disabled]="business.friend==1 || business.follower==1" ion-button block icon-right (click)="sendfollowingRequest(people)">\n                <i class="material-icons">forward</i> Follow </button>\n            </div>\n          </ion-item>\n        </ion-item>\n      </ion-list>\n    </div>\n    <!-- job-->\n    <div *ngIf="jobs_user!=\'\'">\n      <h3 class="search_heading">Job</h3>\n      <ion-list *ngFor="let jobs of jobs_user">\n\n        <ion-item padding-horizontal class="search_user search_user_individual" (click)="jobdetails(jobs)">\n          <ion-avatar item-left>\n            <img *ngIf="jobs.image" src="{{base_url}}uploads/profileImages/resizedImages/{{jobs.image}}" alt="Image" />\n            <img *ngIf="jobs.image==\'\' || jobs.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <p>{{jobs.job_title}}</p>\n            <p class="user_deg" *ngIf="jobs.cat_name"> {{jobs.cat_name}}</p>\n            <p class="user_deg" *ngIf="jobs.city">\n              <ion-icon name="home"></ion-icon> {{jobs.city}}, {{jobs.state}}, {{jobs.country}}</p>\n            <p class="user_deg">\n              {{jobs.jobtype}}</p>\n          </ion-item>\n        </ion-item>\n\n      </ion-list>\n    </div>\n  </div>\n\n\n\n\n\n  <div [ngSwitch]="searchbycatagory">\n\n    <!-- search_by all-->\n    <div *ngSwitchCase="\'all\'">\n      <!-- people-->\n\n      <h3 class="search_heading">People</h3>\n      <h4 class="notFound" *ngIf="people_user==\'\'"> No Result Found... </h4>\n      <ion-list *ngFor="let people of people_user; let i=index">\n\n        <ion-item padding-horizontal class="search_user search_user_individual" *ngIf="i<3">\n          <ion-avatar item-left (click)="OtherFrofileView(people)">\n            <img *ngIf="people.image" src="{{base_url}}uploads/profileImages/resizedImages/{{people.image}}" alt="Image" />\n            <img *ngIf="people.image==\'\' || people.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <div (click)="OtherFrofileView(people)">\n              <p>{{people.users_full_name}}</p>\n              <p class="user_deg" *ngIf="people.cat_name">\n                <ion-icon name="briefcase"></ion-icon> {{people.cat_name}}</p>\n              <p class="user_deg" *ngIf="people.city">\n                <ion-icon name="home"></ion-icon> {{people.city}}, {{people.state}}, {{people.country}}</p>\n            </div>\n            <div class="user_action" item-right>\n              <button [disabled]="people.friend==1 || people.follower==1" ion-button block icon-right (click)="sendRequest(people)">\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon> Add </button>\n              <button ion-button block icon-right [disabled]="people.friend==1 || people.follower==1" (click)="sendfollowingRequest(people)">\n                <i class="material-icons">forward</i> Follow </button>\n            </div>\n          </ion-item>\n        </ion-item>\n      </ion-list>\n\n      <!-- Business-->\n\n      <h3 class="search_heading">Business</h3>\n      <h4 class="notFound" *ngIf="business_user==\'\'"> No Result Found... </h4>\n      <ion-list *ngFor="let business of business_user; let i=index">\n\n        <ion-item padding-horizontal class="search_user search_user_individual" *ngIf="i<3">\n          <ion-avatar item-left (click)="OtherFrofileView(business)">\n            <img *ngIf="business.image" src="{{base_url}}uploads/profileImages/resizedImages/{{business.image}}" alt="Image" />\n            <img *ngIf="business.image==\'\' || business.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <div (click)="OtherFrofileView(business)">\n              <p>{{business.buisness_name}}</p>\n              <p class="user_deg" *ngIf="business.cat_name">\n                <ion-icon name="briefcase"></ion-icon> {{business.cat_name}}</p>\n              <p class="user_deg" *ngIf="business.city">\n                <ion-icon name="home"></ion-icon> {{business.city}}, {{business.state}}, {{business.country}}</p>\n            </div>\n            <div class="user_action" item-right>\n              <button [disabled]="business.friend==1 || business.follower==1" ion-button block icon-right (click)="sendRequest(business)">\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon> Add </button>\n              <button ion-button block icon-right [disabled]="business.friend==1 || business.follower==1" (click)="sendfollowingRequest(business)">\n                <i class="material-icons">forward</i> Follow </button>\n            </div>\n          </ion-item>\n        </ion-item>\n      </ion-list>\n\n      <!-- job-->\n      <h3 class="search_heading">Job</h3>\n      <h4 class="notFound" *ngIf="jobs_user==\'\'"> No Result Found... </h4>\n      <ion-list *ngFor="let jobs of jobs_user; let i=index">\n\n        <ion-item padding-horizontal class="search_user search_user_individual" *ngIf="i<3" (click)="jobdetails(jobs)">\n          <ion-avatar item-left>\n            <img *ngIf="jobs.image" src="{{base_url}}uploads/profileImages/resizedImages/{{jobs.image}}" alt="Image" />\n            <img *ngIf="jobs.image==\'\' || jobs.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <p>{{jobs.job_title}}</p>\n            <p class="user_deg" *ngIf="jobs.cat_name"> {{jobs.cat_name}}</p>\n            <p class="user_deg" *ngIf="jobs.city">\n              <ion-icon name="home"></ion-icon> {{jobs.city}}, {{jobs.state}}, {{jobs.country}}</p>\n            <p class="user_deg">\n              {{jobs.jobtype}}</p>\n          </ion-item>\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n\n\n    <!-- search_by people-->\n\n    <div *ngSwitchCase="\'people\'">\n\n      <h4 class="filter" (click)="searchfilter()">\n        <ion-icon md="md-funnel"></ion-icon> Filter\n      </h4>\n      <h4 class="notFound" *ngIf="people_user==\'\'"> No Result Found... </h4>\n      <ion-list *ngFor="let people of people_user">\n\n        <ion-item padding-horizontal class="search_user search_user_individual">\n          <ion-avatar item-left (click)="OtherFrofileView(people)">\n            <img *ngIf="people.image" src="{{base_url}}uploads/profileImages/resizedImages/{{people.image}}" alt="Image" />\n            <img *ngIf="people.image==\'\' || people.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <div (click)="OtherFrofileView(people)">\n              <p>{{people.users_full_name}}</p>\n              <p class="user_deg" *ngIf="people.cat_name">\n                <ion-icon name="briefcase"></ion-icon> {{people.cat_name}}</p>\n              <p class="user_deg" *ngIf="people.city">\n                <ion-icon name="home"></ion-icon> {{people.city}}, {{people.state}}, {{people.country}}</p>\n            </div>\n            <div class="user_action" item-right>\n              <button [disabled]="people.friend==1 || people.follower==1" ion-button block icon-right (click)="sendRequest(people)">\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon> Add </button>\n              <button ion-button block icon-right [disabled]="people.friend==1 || people.follower==1" (click)="sendfollowingRequest(people)">\n                <i class="material-icons">forward</i> Follow </button>\n            </div>\n          </ion-item>\n        </ion-item>\n      </ion-list>\n\n\n\n    </div>\n\n    <!-- search_by business-->\n\n\n    <div *ngSwitchCase="\'business\'">\n      <h4 class="filter" (click)="searchfilter()">\n        <ion-icon md="md-funnel"></ion-icon> Filter\n      </h4>\n      <h4 class="notFound" *ngIf="business_user==\'\'"> No Result Found... </h4>\n      <ion-list *ngFor="let business of business_user">\n\n        <ion-item padding-horizontal class="search_user search_user_individual">\n          <ion-avatar item-left (click)="OtherFrofileView(business)">\n            <img *ngIf="business.image" src="{{base_url}}uploads/profileImages/resizedImages/{{business.image}}" alt="Image" />\n            <img *ngIf="business.image==\'\' || business.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n\n          <ion-item class="search_right">\n            <div (click)="OtherFrofileView(business)">\n              <p>{{business.buisness_name}}</p>\n              <p class="user_deg" *ngIf="business.cat_name">\n                <ion-icon name="briefcase"></ion-icon> {{business.cat_name}}</p>\n              <p class="user_deg" *ngIf="business.city">\n                <ion-icon name="home"></ion-icon> {{business.city}}, {{business.state}}, {{business.country}}</p>\n            </div>\n            <div class="user_action" item-right>\n              <button [disabled]="business.friend==1 || business.follower==1" ion-button block icon-right (click)="sendRequest(business)">\n                <ion-icon ios="ios-person-add" md="md-person-add"></ion-icon> Add </button>\n              <button ion-button block icon-right [disabled]="business.friend==1 || business.follower==1" (click)="sendfollowingRequest(business)">\n                <i class="material-icons">forward</i> Follow </button>\n            </div>\n          </ion-item>\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n    <!-- search_by job-->\n\n\n    <div *ngSwitchCase="\'jobs\'">\n      <h4 class="filter" (click)="searchfilter()">\n        <ion-icon md="md-funnel"></ion-icon> Filter\n      </h4>\n      <h4 class="notFound" *ngIf="jobs_user==\'\'"> No Result Found... </h4>\n      <ion-list *ngFor="let jobs of jobs_user">\n\n        <ion-item padding-horizontal class="search_user search_user_individual" (click)="jobdetails(jobs)">\n          <ion-avatar item-left>\n            <img *ngIf="jobs.image" src="{{base_url}}uploads/profileImages/resizedImages/{{jobs.image}}" alt="Image" />\n            <img *ngIf="jobs.image==\'\' || jobs.image==null" src="assets/img/management.png" alt="Image" />\n          </ion-avatar>\n          <ion-item class="search_right">\n            <p>{{jobs.job_title}}</p>\n            <p class="user_deg" *ngIf="jobs.cat_name">{{jobs.cat_name}}</p>\n            <p class="user_deg" *ngIf="jobs.city">\n              <ion-icon name="home"></ion-icon> {{jobs.city}}, {{jobs.state}}, {{jobs.country}}</p>\n            <p class="user_deg">\n              {{jobs.jobtype}}</p>\n\n          </ion-item>\n        </ion-item>\n      </ion-list>\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\Masud Parvej\WGT Project\Creoyougit\src\pages\search\search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ })

},[406]);
//# sourceMappingURL=main.js.map