import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { LoginhelpPage } from '../loginhelp/loginhelp';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { SocialregPage } from '../socialreg/socialreg';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    pages: any;
    loginForm: FormGroup;
    submitAttempt: boolean = false;
    registrationPage = RegistrationPage;
    storageObj: any;
    isfbLoggedIn: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
        public remotService: RemoteServiceProvider, public modalCtrl: ModalController, private storage: Storage
        , public events: Events, private fb: Facebook, private googlePlus: GooglePlus) {

        this.storageObj = storage;
        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(50), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])]
        });

        window.localStorage['fbprofileinfo'] = '';

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
                        window.localStorage['userid'] = dataRes.user_id;
                        window.localStorage['token'] = dataRes.token;
                        window.localStorage['username'] = dataRes.username;
                        window.localStorage['premium_user'] = dataRes.premium_user;
                        window.localStorage['name'] = dataRes.name;
                        // fire event in app.component to show the header
                        this.events.publish('user:loggedin');
                        this.remotService.presentToast('Logged in successfully.');


                    } else {
                        var params = { data: res, type: 'google' }
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
                    this.isfbLoggedIn = true;
                    this.getFbUserDetail(res.authResponse.userID);
                } else {
                    this.isfbLoggedIn = false;
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
                        var params = { data: res, type: 'facebook' }
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

    checkLogin() {

        this.submitAttempt = true;
        var loginObj = this.loginForm.value;
        var loginParams = {
            username: loginObj.username,
            password: loginObj.password,
            device_tocken: window.localStorage['onesignaltoken'],
            player_id: window.localStorage['onesignalplayerid']
        }
        this.remotService.presentLoading("Verifying ...");
        this.remotService.postData(loginParams, 'userLogin').subscribe((response) => {

            this.remotService.dismissLoader();
            if (response.success == 1) {
                // this.navCtrl.push(HomePage);
                this.remotService.presentToast('Logged in successfully.');
                var dataRes = response.data;
                window.localStorage['usertype'] = dataRes.user_type;
                window.localStorage['userid'] = parseInt(dataRes.id);
                window.localStorage['token'] = dataRes.token;
                window.localStorage['name'] = dataRes.name;
                window.localStorage['userdata'] = JSON.stringify(dataRes);
                window.localStorage['premium_user'] = dataRes.premium_user;

                // fire event in app.component to show the header
                this.events.publish('user:loggedin');

            } else {
                this.remotService.presentToast("Wrong username or password.");
            }
        }, () => {
            this.remotService.dismissLoader();
            this.remotService.presentToast('Wrong username or password.');
        });

    }

    getLoginHelpPage() {

        this.navCtrl.push(LoginhelpPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

}
