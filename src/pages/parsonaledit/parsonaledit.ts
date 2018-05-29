import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegValidatorProvider } from '../../providers/reg-validator/reg-validator';

/**
 * Generated class for the ParsonaleditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parsonaledit',
  templateUrl: 'parsonaledit.html',
})
export class ParsonaleditPage {
  @ViewChild(Content) content: Content;
  base_url: any;
  editsection: string;
  username: any;
  email: any;
  mobile: any;
  changepass: any;
  editparam: any;
  countryCode: any;
  FormRegistrationStepTwo: FormGroup;
  FormRegistrationStepThree: FormGroup;
  FormRegistrationStepOne: FormGroup;
  FormRegistrationStepFour: FormGroup;
  oldpass: any;
  password: any;
  confirmpassword: any;

  constructor(public alertCtrl: AlertController, public regValidator: RegValidatorProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, public modalCtrl: ModalController) {
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
      mobileno: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
        regValidator.checkuniquevalueoffield('mobile_no', 1)
      ],
      mobilecode: ['+91', Validators.compose([Validators.required])],
    });
    this.FormRegistrationStepThree = formBuilder.group({
      oldpass: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*()_+-\|=;:”,.?]).{8,20})')
      ])],
      confirmpassword: ['', Validators.compose([Validators.required, regValidator.equalto("password")])]

    });

    this.FormRegistrationStepOne = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(50), regValidator.mailFormat()]), regValidator.checkuniquevalueoffield('email', 1).bind(regValidator)]
    });

    this.FormRegistrationStepFour = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^$|^[A-Za-z0-9]+'), Validators.required]), regValidator.checkuniquevalueoffield('username', 1).bind(regValidator)]
    });

    this.countryCode = regValidator.countryCodes;
  }
  ionViewDidEnter() {
    //console.log("Connection pages entered")
    this.content.resize();

  }

  setConfirmPasswordBlank() {
    this.FormRegistrationStepThree.get('confirmpassword').setValue('');
  }
  updateDetails() {
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
      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, 'changeInfo').subscribe((response) => {
        this.remotService.dismissLoader();
        this.navParams.get("parentPage").initviewpersonaldata();
        this.remotService.presentToast(response.message);
        this.navCtrl.pop();

      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }
  }

  updateemail() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      type: 'email',
      username: '',
      email: this.email,
      mobile_code: '',
      mobile: '',
    };
    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'changeInfo').subscribe((response) => {
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.navParams.get("parentPage").initviewpersonaldata();
        this.remotService.presentToast(response.message);
        this.navCtrl.pop();
      }
      else {
        this.remotService.dismissLoader();
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
  }

  changemobilenumber(stepTwovalue) {
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
      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, 'changeInfo').subscribe((response) => {
        if (response.success == 1) {
          this.remotService.dismissLoader();
          this.navParams.get("parentPage").initviewpersonaldata();
          this.remotService.presentToast(response.message);
          this.navCtrl.pop();
        }

      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }
  }
  Changepassword() {
    if (this.FormRegistrationStepThree.valid) {
      var DataToSend = {
        user_id: window.localStorage['userid'],
        newPassword: this.password,
        password: this.oldpass,
        token: window.localStorage['token']
      }
      this.oldpass;
      this.password;
      this.confirmpassword;
      //console.log(DataToSend);

      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, 'changePassword').subscribe((response) => {
        //console.log(response);
        if (response.success == 1) {
          this.remotService.dismissLoader();
          this.remotService.presentToast(response.message);
          this.navCtrl.pop();
        }
        else {
          this.remotService.dismissLoader();
          this.remotService.presentToast(response.message);
        }

      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }
  }



  ionViewDidLoad() {
    // console.log('ionViewDidLoad ParsonaleditPage');
  }

}
