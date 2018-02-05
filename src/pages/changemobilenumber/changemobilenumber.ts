import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegValidatorProvider } from '../../providers/reg-validator/reg-validator';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the ChangemobilenumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changemobilenumber',
  templateUrl: 'changemobilenumber.html',
})
export class ChangemobilenumberPage {
  FormRegistrationStepTwo: FormGroup;
  countryCode: any;
  mobile_number: any;
  userUrlCode: any;

  constructor(public remotService: RemoteServiceProvider, public viewCtrl: ViewController, public regValidator: RegValidatorProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.FormRegistrationStepTwo = formBuilder.group({
      mobileno: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
        regValidator.checkuniquevalueoffield('mobile_no', 1)
      ],
      mobilecode: ['+91', Validators.compose([Validators.required])],
    });
    this.countryCode = regValidator.countryCodes;
    this.mobile_number = navParams.get('changedata').mobilenumber;
    this.geturlcode();
  }

  geturlcode() {
    var data = {
      userMobile: this.mobile_number
    }
    this.remotService.presentLoading();
    this.remotService.postData(data, 'getUrlCode').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.userUrlCode = response.data.userUrlCode;
      } else {
        this.remotService.presentToast('Error saving data.');
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error saving data.');
    })
  }

  changeMobileNumber(stepTwovalue) {
    if (this.FormRegistrationStepTwo.valid) {
      var stepTwoform = this.FormRegistrationStepTwo.value;

      var codeData = {
        userUrlCode: this.userUrlCode,
        userMobileCode: stepTwoform.mobilecode,
        userMobile: stepTwoform.mobileno
      };
      this.remotService.presentLoading();
      this.remotService.postData(codeData, 'reSendSms').subscribe((response) => {

        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.remotService.dismissLoader();
          this.viewCtrl.dismiss({ mobileno: stepTwoform.mobileno });
        } else {
          this.remotService.presentToast('Error Sending Otp.');
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error Sending Otp.');
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangemobilenumberPage');
  }
  dismiss() {
    this.viewCtrl.dismiss({ mobileno: '' });
  }

}
