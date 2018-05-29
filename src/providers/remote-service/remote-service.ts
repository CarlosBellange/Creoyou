import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';
//import { mycommonresponse, chathistory, commonStatus, common, common33, login } from '../models/api-model';
import { mycommonresponsedata, mycommonresponse } from '../../models/api-model';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Injectable()

export class RemoteServiceProvider {
    labelAttribute = "name";
    custom_loader: any;
    custom_toast: any;
    API_URL: any;
    laraapi_url: any;
    Response: any;
    loader: any;
    pages: any;
    storageObj: any;
    site_url: any;

    constructor(public http: Http, public loadingcntrl: LoadingController,
        private toastcntrl: ToastController, private storage: Storage,
        private alertCtrl: AlertController) {

        this.API_URL = 'https://app.creoyou.com/public/index.php/api/';
        this.site_url = 'https://creoyou.com/';
        this.storageObj = storage;

    }

    getUserId() {

        return window.localStorage['userid'];
    }

    getUserToken() {
        return window.localStorage['token'];
    }


    addcard(data): Observable<mycommonresponse> {
        const url: string = `${this.API_URL}/add_card`;
        return this.http.post(url, data)
            .map(res => <mycommonresponse>res.json());
    }

    chatfile(data): Observable<mycommonresponsedata> {
        const url: string = `${this.API_URL}/chatfileup/`;
        return this.http.get(url, data)
            .map(res => <mycommonresponsedata>res.json());
    }

    getCategories(term, usertype = 1): Observable<mycommonresponsedata> {

        const url: string = `${this.API_URL}user-category/` + usertype + `?term=` + term;
        return this.http.get(url)
            .map(res => <mycommonresponsedata>res.json());
    }

    checkifemailExist(data): Observable<mycommonresponsedata> {
        const url: string = `${this.API_URL}userInfocheck`;
        return this.http.post(url, data)
            .map(res => <mycommonresponsedata>res.json());
    }

    postData(data, urlname): Observable<mycommonresponsedata> {
        const url: string = `${this.API_URL}` + urlname;
        return this.http.post(url, data)
            .map(res => <mycommonresponsedata>res.json());
    }

    getData(urlname): Observable<mycommonresponsedata> {
        const url: string = `${this.API_URL}` + urlname;
        return this.http.get(url)
            .map(res => <mycommonresponsedata>res.json());
    }

    presentLoading() {
        this.loader = this.loadingcntrl.create({
            spinner: 'bubbles',
        });
        this.loader.present();
    }

    dismissLoader() {

        if (this.loader)
            this.loader.dismiss();

        this.loader = false;
    }

    presentToast(msg) {
        let toast = this.toastcntrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    }

    presentAlert(msg) {
        let alert = this.alertCtrl.create({
            title: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    }


}
