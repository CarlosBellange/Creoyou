import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { CategoriesPage } from '../../pages/categories/categories';
import { RegValidatorProvider } from '../../providers/reg-validator/reg-validator';
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
    selector: 'page-socialreg',
    templateUrl: 'socialreg.html',
})
export class SocialregPage {

    socialinfo: any;
    regtype: any;
    userType: number = 0;
    regStep: number = 1;
    catid: number = 0;
    otpnumber: number = 0;
    userid: number = 0;
    urlcode: any = '';
    nameplaceHolder: any = "Full Name";
    submitAttempt: boolean = false;
    FormRegistrationStepOne: FormGroup;
    FormRegistrationStepTwo: FormGroup;
    countryCode: any;
    loginpage = LoginPage;
    remoteParams: any;
    user_type: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
        public remotService: RemoteServiceProvider, public modalCtrl: ModalController
        , public regValidator: RegValidatorProvider, public events: Events) {

        this.socialinfo = navParams.get('data');
        this.regtype = navParams.get('type');
        this.user_type = navParams.get('user_type');
        this.regStep = 1;

        this.FormRegistrationStepTwo = formBuilder.group({
            otpno: ['', Validators.compose([Validators.required])]
        });

        this.FormRegistrationStepOne = formBuilder.group({
            //businessname: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
            username: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^$|^[A-Za-z0-9]+'), Validators.required])
                , regValidator.checkuniquevalueoffield('username', 1).bind(regValidator)],
            mobileno: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
                regValidator.checkuniquevalueoffield('mobile_no', 1)],
            mobilecode: ['+91', Validators.compose([Validators.required])],
            cfield: ['', Validators.compose([Validators.required])],
        });

        this.countryCode = regValidator.countryCodes;

    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad SocialregPage');
    }

    showCategoryModal() {
        let categoryModal = this.modalCtrl.create(CategoriesPage, { usertype: this.user_type });
        categoryModal.onDidDismiss(data => {
            // Do things with data coming from modal, for instance :
            if (data.hasOwnProperty("id")) {
                //console.log("GOt from modal", data);
                this.FormRegistrationStepOne.get('cfield').setValue(data.name);
                this.catid = data.id;
            }
        });
        categoryModal.present();
    }

    sendRegistrationForm(stepTwovalue) {

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
                    //buisness_name: stepOneform.businessname,
                    category: stepOneform.cfield,
                    subcategory: othercat,
                    mobile_code: stepOneform.mobilecode,
                    user_type: this.user_type

                }

                regUrl = 'googleRegistration';

            } else {

                this.remoteParams = {
                    name: this.socialinfo.name,
                    email: this.socialinfo.email,
                    mobile: stepOneform.mobileno,
                    facebook_id: this.socialinfo.token_for_business,
                    userName: stepOneform.username,
                    //buisness_name: stepOneform.businessname,
                    category: stepOneform.cfield,
                    subcategory: othercat,
                    mobile_code: stepOneform.mobilecode,
                    user_type: this.user_type

                }

            }


        }

        this.remotService.presentLoading();
        this.remotService.postData(this.remoteParams, regUrl).subscribe((response) => {

            this.remotService.dismissLoader();
            if (response.success == 1) {
                var dataRes = response.data;

                window.localStorage['usertype'] = dataRes.user_type;
                window.localStorage['userid'] = dataRes.user_id;
                window.localStorage['token'] = dataRes.token;
                window.localStorage['username'] = dataRes.username;
                window.localStorage['premium_user'] = dataRes.premium_user;
                window.localStorage['name'] = dataRes.name;
                // fire event in app.component to show the header
                this.events.publish('user:loggedin');
                this.remotService.presentToast('Logged in successfully.');
            } else {
                this.remotService.presentToast('Registration failed.');
            }
        }, () => {
            this.remotService.dismissLoader();
            /* this.remotService.presentToast('Error!'); */
        })

    }

    verifyOtp() {

        var stepTwoform = this.FormRegistrationStepTwo.value;
        var stepOneform = this.FormRegistrationStepTwo.value;
        var otpParams = {
            otp: stepTwoform.otpno,
            mobile: stepOneform.mobileno,
        };
        this.remotService.presentLoading();
        this.remotService.postData(otpParams, 'HelpusingUsername').subscribe((response) => {

            this.remotService.dismissLoader();
            if (response.success == 1) {
                this.navCtrl.push(LoginPage);
                this.remotService.presentToast('Registration successful.');
            } else {
                this.remotService.presentToast('Otp veryfication failed.');
            }
        }, () => {
            this.remotService.dismissLoader();
            this.remotService.presentToast('Otp veryfication failed.');
        })

    }

    resendcode() {

        var stepOneform = this.FormRegistrationStepOne.value;
        var codeData = {
            userUrlCode: this.urlcode,
            userMobileCode: stepOneform.mobilecode,
            userMobile: stepOneform.mobileno
        };
        this.remotService.presentLoading();
        this.remotService.postData(codeData, 'reSendSms').subscribe((response) => {

            this.remotService.dismissLoader();
            if (response.success == 1) {
                this.remotService.dismissLoader();
                this.otpnumber = response.data.OTP;
            } else {
                this.remotService.presentToast('Error Sending Otp.');
            }
        }, () => {
            this.remotService.dismissLoader();
            /*  this.remotService.presentToast('Error Sending Otp.'); */
        })

    }

}
