import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Navbar
} from 'ionic-angular';
import {
  RegValidatorProvider
} from '../../providers/reg-validator/reg-validator';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-loginhelp',
  templateUrl: 'loginhelp.html',
})
export class LoginhelpPage {

  viewStep: number = 1;
  countryCode: any;
  recover: any;
  mobilecode: any;
  emailid: any;
  mobileno: any;
  helptype: any;
  optsenttype: any;
  otpnumber: any;
  myusername: any;
  inputotp: any;
  password: string = '';
  confirmpassword: string = '';
  paramObj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public regValidator: RegValidatorProvider, public remotService: RemoteServiceProvider) {

    this.countryCode = regValidator.countryCodes;
    this.recover = 'email';
    this.mobilecode = '+91';
    this.helptype = 'username';
    this.otpnumber = 'initialotptouse';
    this.viewStep = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginhelpPage');
  }
  recoverNow() {

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
    } else {

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
    }



    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'userHelp').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.viewStep = 3;
        this.otpnumber = response.data.OTP;
        this.myusername = response.data.username;

      } else {
        // if (this.recover == 'email')
        //    this.remotService.presentToast('Email you entered does not exist.');
        // else 
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error!');
    });
    // console.log(DataToSend);

  }

  verifyOtp() {

    if (this.inputotp == this.otpnumber) {

      this.viewStep = 4;
    } else {
      this.remotService.presentToast('You entered a invalid otp number.');
    }
  }

  resetPassword() {

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
    }

    var url = 'HelpUsingPassword';

    if (this.recover == 'email') {

      this.paramObj = {
        'password': this.password,
        'email': this.emailid
      }

      var url = 'EmailHelpUsingPassword';

    }


    this.remotService.presentLoading();
    this.remotService.postData(this.paramObj, url).subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.remotService.presentToast('Password changed successfully');
        this.navCtrl.push(LoginPage);

      } else {
        this.remotService.presentToast('Error resetting your password!');
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error resetting your password!');
    });

  }

  gotoLoginpage() {
    this.navCtrl.push(LoginPage);
  }


}