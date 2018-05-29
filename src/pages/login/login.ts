import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, Platform, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { LoginhelpPage } from '../loginhelp/loginhelp';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { SocialregPage } from '../socialreg/socialreg';
import { OneSignal } from '@ionic-native/onesignal';

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
    onesignalplayerid = '';
    onesignaltoken = '';
    showmenu: boolean = false;

    constructor(public menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
        public remotService: RemoteServiceProvider, public modalCtrl: ModalController, private storage: Storage
        , public events: Events, private fb: Facebook, private googlePlus: GooglePlus, private oneSignal: OneSignal, platform: Platform) {

        this.storageObj = storage;
        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(20), Validators.required])]
        });

        window.localStorage['fbprofileinfo'] = '';

        if (platform.is('cordova')) {

            this.oneSignal.getIds().then((ids) => {
                // console.log("One signal ids" + ids.userId);
                this.onesignalplayerid = ids.userId;
                this.onesignaltoken = ids.pushToken;

            });
        }


    }

    googleLogIn() {

        //this.googlePlus.trySilentLogin({}).then(() => {
        //this.googlePlus.disconnect().then(() => {
        this.googlePlus.login({
            'offline': true,
            "webClientId": "579773219331-m4phsmumfldl74acsmesudvhcof8nl47.apps.googleusercontent.com"
        })
            .then(res => {
                this.googlePlus.disconnect().then(() => {

                });
                // console.log("google login", res);

                var googleparams = {
                    google_id: res.userId,
                    email: res.email,
                    device_tocken: this.onesignaltoken,
                    player_id: this.onesignalplayerid
                }
                this.remotService.presentLoading();
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
                        this.remotService.presentToast('login successful');


                    } else {
                        var params = { data: res, type: 'google', user_type: 1 }
                        this.navCtrl.push(SocialregPage, params);
                        //window.localStorage['fbprofileinfo'] = JSON.stringify(res);
                    }
                }, () => {
                    this.remotService.dismissLoader();
                    this.remotService.presentToast('Error!');
                });


            })
            .catch(err => console.error(err));
        // })
        //     .catch(err => console.error(err));
        // })
        //     .catch(err => console.error(err));
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
                // console.log(res);

                var facemail = res.hasOwnProperty("email") ? res.email : null;
                var fbParams = {
                    email: facemail,
                    facebook_id: res.token_for_business,
                    device_tocken: this.onesignaltoken,
                    player_id: this.onesignalplayerid
                };
                this.remotService.presentLoading();
                this.remotService.postData(fbParams, 'Facebooklogin').subscribe((response) => {
                    this.remotService.dismissLoader();
                    if (response.success == 1) {

                        var dataRes = response.data;
                        //console.log(dataRes);
                        window.localStorage['usertype'] = dataRes.user_type;
                        window.localStorage['userid'] = dataRes.user_id;
                        window.localStorage['token'] = dataRes.token;
                        window.localStorage['username'] = dataRes.username;
                        window.localStorage['premium_user'] = dataRes.premium_user;
                        window.localStorage['name'] = dataRes.name;

                        // fire event in app.component to show the header
                        this.events.publish('user:loggedin');
                        this.remotService.presentToast('login successful');


                    } else {
                        var params = { data: res, type: 'facebook', user_type: 1 }
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
                //console.log(e);
            });
    }

    checkLogin() {

        this.submitAttempt = true;
        var loginObj = this.loginForm.value;

        var loginParams = {
            username: loginObj.username,
            password: loginObj.password,
            device_tocken: this.onesignaltoken,
            player_id: this.onesignalplayerid
        }
        // console.log("Login params", loginParams)
        this.remotService.presentLoading();
        this.remotService.postData(loginParams, 'userLogin').subscribe((response) => {

            this.remotService.dismissLoader();
            if (response.success == 1) {

                // this.navCtrl.push(HomePage);
                this.remotService.presentToast('login successful');
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
                this.remotService.presentToast(response.message);
                if (response.message === 'You are not a verified user') {
                    var data = {
                        regStep: 3,
                        mobilenum: response.data.user_mobile
                    }

                    this.navCtrl.push(RegistrationPage, { verifyotp: data });
                }
            }
        }, () => {
            this.remotService.dismissLoader();
            this.remotService.presentToast('Wrong username or password');
        });

    }

    getLoginHelpPage() {

        this.navCtrl.push(LoginhelpPage);
    }

    ionViewDidLoad() {
        this.events.publish('creoyou:hidemenu');
        this.menu.swipeEnable(false);
        //console.log('ionViewDidLoad LoginPage');
    }


}
