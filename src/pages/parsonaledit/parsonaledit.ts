import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController, AlertController } from 'ionic-angular';
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
  base_url: any;
  editsection: string;
  name: any;
  email: any;
  mobile: any;
  changepass: any;
  editparam: any;
  countryCode: any;
  FormRegistrationStepTwo: FormGroup;
  oldpass: any;
  newpass: any;
  confirmpass: any;

  constructor(public alertCtrl: AlertController, public regValidator: RegValidatorProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, public modalCtrl: ModalController) {
    this.base_url = this.remotService.site_url;
    this.editsection = navParams.get('editsection');
    this.editparam = navParams.get('editparam');
    if (this.editsection == 'name') {

      this.name = this.editparam.username;

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
      mobilecode: ['+91', Validators.compose([Validators.required])]

    });

    this.countryCode = regValidator.countryCodes;
  }

  updateDetails() {
    this.name;
    this.email;
    this.mobile;
    var DataToSend = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      type: 'username',
      username: this.name,
      email: '',
      mobile_code: '',
      mobile: '',
    };
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(DataToSend, 'changeInfo').subscribe((response) => {
      this.remotService.dismissLoader();
      console.log(response);
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
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
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(DataToSend, 'changeInfo').subscribe((response) => {
      if (response.success == 1) {
        this.remotService.dismissLoader();
        console.log(response);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
  }

  changemobilenumber(stepTwovalue) {
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
    this.remotService.postData(DataToSend, 'changeInfo').subscribe((response) => {
      if (response.success == 1) {
        this.remotService.dismissLoader();
        console.log(response);
      }

    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }
  Changepassword() {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      newPassword: this.newpass,
      password: this.oldpass,
      token: window.localStorage['token']
    }
    this.oldpass;
    this.newpass;
    this.confirmpass;
    if (this.newpass != this.confirmpass) {
      this.remotService.presentToast('Password Did Not Match');
    }
    else {
      this.remotService.presentLoading("Wait ...");
      this.remotService.postData(DataToSend, 'changePassword').subscribe((response) => {
        if (response.success == 1) {
          this.remotService.dismissLoader();
          this.remotService.presentToast(response.message);
          console.log(response);
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
    console.log('ionViewDidLoad ParsonaleditPage');
  }

}
