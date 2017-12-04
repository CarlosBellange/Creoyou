import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ModalController,
    Events
} from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import {
    RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import {
    CategoriesPage
} from '../../pages/categories/categories';
import {
    RegValidatorProvider
} from '../../providers/reg-validator/reg-validator';
import {
    LoginPage
} from '../../pages/login/login';
import {
    GooglePlus
} from '@ionic-native/google-plus';
import {
    Facebook
} from '@ionic-native/facebook';
import {
    SocialregPage
} from '../socialreg/socialreg';

@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
})
export class RegistrationPage {

    userType: number = 0;
    regStep: number = 0;
    catid: number = 0;
    otpnumber: number = 0;
    userid: number = 0;
    urlcode: any = '';
    nameplaceHolder: any = "Full Name";
    submitAttempt: boolean = false;
    FormRegistrationStepOne: FormGroup;
    FormRegistrationStepTwo: FormGroup;
    FormRegistrationStepThree: FormGroup;
    countryCode: any;
    loginpage = LoginPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
        public remotService: RemoteServiceProvider, public modalCtrl: ModalController, public events: Events, public regValidator: RegValidatorProvider, private fb: Facebook, private googlePlus: GooglePlus) {

        this.FormRegistrationStepOne = formBuilder.group({
            fullname: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^$|^[A-Za-z0-9 ]+'), Validators.required])],
            cfield: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.maxLength(50), Validators.required, regValidator.mailFormat()]), regValidator.checkuniquevalueoffield('email', 1).bind(regValidator)]
        });

        this.FormRegistrationStepThree = formBuilder.group({
            otpno: ['', Validators.compose([Validators.required])]
        });



        this.FormRegistrationStepTwo = formBuilder.group({
            username: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.pattern('^$|^[A-Za-z0-9]+'), Validators.required]), regValidator.checkuniquevalueoffield('username', 1).bind(regValidator)],
            mobileno: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
                regValidator.checkuniquevalueoffield('mobile_no', 1)
            ],
            mobilecode: ['+91', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required,
                Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*()_+-\|=;:”,.?]).{8,20})')
            ])],
            confirmpassword: ['', Validators.compose([Validators.required, regValidator.equalto("password")])]
        });

        this.countryCode = regValidator.countryCodes;
        // this.regStep = 3;

    }

    setConfirmPasswordBlank() {
        this.FormRegistrationStepTwo.get('confirmpassword').setValue('');
    }
    ionViewDidLoad() {




    }

    selectRegtype(typeOfuser) {

        this.userType = typeOfuser;
        this.nameplaceHolder = (typeOfuser == 1) ? "Full Name" : "Business Name";


    }

    startRegistrationForm() {
        this.regStep = 1;

    }

    gotoSecondStep() {
        this.submitAttempt = true;
        // console.log(stepOnevalue);
        if (this.FormRegistrationStepOne.valid) {
            this.regStep = 2;
            this.submitAttempt = false;
        }
    }

    showCategoryModal() {
        let categoryModal = this.modalCtrl.create(CategoriesPage);
        categoryModal.onDidDismiss(data => {
            // Do things with data coming from modal, for instance :
            if (data.hasOwnProperty("id")) {
                console.log("GOt from modal", data);
                this.FormRegistrationStepOne.get('cfield').setValue(data.name);
                this.catid = data.id;
            }
        });
        categoryModal.present();
    }

    sendRegistrationForm(stepTwovalue) {

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
            this.remotService.postData(regData, 'userRegistration').subscribe((response) => {
                this.remotService.dismissLoader();
                if (response.success == 1) {

                    this.otpnumber = response.data.OTP;
                    this.regStep = 3;
                    this.submitAttempt = false;
                } else {
                    this.remotService.presentToast('Error saving data.');
                }
            }, () => {
                this.remotService.dismissLoader();
                this.remotService.presentToast('Error saving data.');
            })

        }

    }

    verifyOtp() {

        var stepThreeform = this.FormRegistrationStepThree.value;
        var stepTwoform = this.FormRegistrationStepTwo.value;
        var otpParams = {
            otp: stepThreeform.otpno,
            mobile: stepTwoform.mobileno,
        }
        this.remotService.presentLoading("Verifying ...");
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

        var stepTwoform = this.FormRegistrationStepTwo.value;
        var codeData = {
            userUrlCode: this.urlcode,
            userMobileCode: stepTwoform.mobilecode,
            userMobile: stepTwoform.mobileno
        };
        this.remotService.presentLoading("Please wait ...");
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
            this.remotService.presentToast('Error Sending Otp.');
        })

    }


    googleLogIn() {
        this.googlePlus.login({})
            .then(res => {
                console.log("google login", res);

                var googleparams = {
                    google_id: res.userId,
                    email: res.email,
                }
                this.remotService.presentLoading("Please wait ...");
                this.remotService.postData(googleparams, 'googlelogin').subscribe((response) => {
                    this.remotService.dismissLoader();
                    if (response.success == 1) {

                        var dataRes = response.data;

                        window.localStorage['usertype'] = dataRes.user_type;
                        window.localStorage['userid']   = dataRes.user_id;
                        window.localStorage['token']    = dataRes.token;
                        window.localStorage['username'] = dataRes.username;
                        window.localStorage['premium_user'] = dataRes.premium_user;
                        window.localStorage['name']         = dataRes.name;
                        // fire event in app.component to show the header
                        this.events.publish('user:loggedin');
                        this.remotService.presentToast('Logged in successfully.');


                    } else {
                        var params = {
                            data: res,
                            type: 'google'
                        }
                        this.navCtrl.push(SocialregPage, params);
                        //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                    }
                }, () => {
                    this.remotService.dismissLoader();
                    this.remotService.presentToast('Error!');
                });


            })
            .catch(err => console.error(err));
    }


    faceBooklogin() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(res => {
                if (res.status === "connected") {
                  
                    this.getFbUserDetail(res.authResponse.userID);
                } else {
                  
                }
            })
            .catch(e => console.log('Error logging into Facebook', e));
    }

    getFbUserDetail(userid) {
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,token_for_business", ["public_profile"])
            .then(res => {
                console.log(res);

                var facemail = res.hasOwnProperty("email") ? res.email : null;
                var fbParams = {
                    email: facemail,
                    facebook_id: res.token_for_business,
                };
                this.remotService.presentLoading("Please wait ...");
                this.remotService.postData(fbParams, 'Facebooklogin').subscribe((response) => {
                    this.remotService.dismissLoader();
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
                        this.events.publish('user:loggedin');
                        this.remotService.presentToast('Logged in successfully.');


                    } else {
                        var params = {
                            data: res,
                            type: 'facebook'
                        }
                        this.navCtrl.push(SocialregPage, params);
                        //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                    }
                }, () => {
                    this.remotService.dismissLoader();
                    this.remotService.presentToast('Error!');
                });
                //this.users = res;
            })
            .catch(e => {
                this.remotService.presentToast("Error logging in using facebook.");
                console.log(e);
            });
    }

}