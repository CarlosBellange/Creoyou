import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AudioProvider } from 'ionic-audio';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommentPage } from '../comment/comment';
import { AboutmePage } from '../aboutme/aboutme';
import { PortfolioPage } from '../portfolio/portfolio';
/**
 * Generated class for the OtherprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherprofile',
  templateUrl: 'otherprofile.html',
})
export class OtherprofilePage {
  @ViewChild(Navbar) navBar: Navbar;
  base_url: any;
  otherprofiledata: any;
  tabtype: any;
  statustext: string;
  statusimage: string;
  statustags = [];
  statusprivacy: number;
  milliseconds: any;
  profileinfo = {
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
  homePageOffset = 0;
  homeData = [];
  myTracks: any[];
  allTracks: any[];
  selectedTrack: any;
  friendcheck: any;


  constructor(public modalCtrl: ModalController, private socialSharing: SocialSharing, private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.otherprofiledata = navParams.get('otheruserfrofiledata');
    this.tabtype = navParams.get('tabname');
    this.friendcheck = navParams.get('friendcheck');
    console.log(this.otherprofiledata);
    this.initOtherprofiledata();
  }

  initOtherprofiledata() {
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
    this.remotService.postData(homeparam, 'homePage').subscribe((response) => {

      this.remotService.dismissLoader();

      if (response.success == 1) {
        this.profileinfo = response.data.detailsOfuser[0];
        console.log(this.profileinfo);
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

    this.homePageOffset = 0;
    var dataHomeParams = {
      user_id: window.localStorage['userid'],
      other_user_id: this.otherprofiledata.user_id,
      starting_limit: this.homePageOffset,
      token: window.localStorage['token']
    }
    this.homeData = [];
    this.remotService.postData(dataHomeParams, 'home-data').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        var homeresponseData = response.data;
        if (homeresponseData != null) {

          homeresponseData.forEach((item, key, index) => {

            //this.modiFyitemasnecessary(item);
            this.homeData.push(item);
            console.log(this.homeData);
          });

        }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });


  }


  fetchHomeData(infiniteScroll) {
    this.homePageOffset = this.homePageOffset + 6;

    var dataHomeParams = {
      user_id: window.localStorage['userid'],
      other_user_id: this.otherprofiledata.user_id,
      starting_limit: this.homePageOffset,
      token: window.localStorage['token']
    }

    this.remotService.postData(dataHomeParams, 'home-data').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        var homeresponseData = response.data;
        if (homeresponseData != null) {

          homeresponseData.forEach((item, key, index) => {


            this.homeData.push(item);
            console.log(this.homeData);
          });

        }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      infiniteScroll.complete();
      this.remotService.presentToast('Error loading data.');
    });

  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

  /**
   * share post on social media
   * @param item 
   */
  shareThisPost(item) {

    var type = item.incident_type.toLowerCase()
    var link = this.base_url + "user/things/share/" + type + "/" + item.id
    console.log(link)
    var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }
  /**
     * show comments
     */
  showComments(item) {
    let commentModal = this.modalCtrl.create(CommentPage, { incidentitem: item });
    commentModal.onDidDismiss(data => {
      item.comments = data.commentlength;
    });
    commentModal.present();
  }
  likeThisitem(item) {
    item.likeCheck = item.likeCheck == '' ? 'fillit' : '';

    var DataToSend = {
      user_id: window.localStorage['userid'],
      incidentTypeId: item.incident_id,
      incidentId: item.id,
      incidentType: item.incident_type,
      fname: item.users_full_name,
      token: window.localStorage['token']
    }
    this.remotService.presentToast('Saving ...');
    this.remotService.postData(DataToSend, 'likeIncidentAction').subscribe((response) => {

      if (response.success == 1) {
        item.likes = response.data.count;
        this.remotService.presentToast('Saved.');

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error!');
    });

  }

  otheruserAbout(profileinfo) {

    this.navCtrl.push(AboutmePage, { 'touserid': profileinfo.userid });
    console.log(profileinfo.userid);
  }
  otheruserPortfolio() {
    this.navCtrl.push(PortfolioPage, {});
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad OtherprofilePage');
  }

}
