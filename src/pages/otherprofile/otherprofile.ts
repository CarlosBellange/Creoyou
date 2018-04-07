import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ModalController, AlertController, Content } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AudioProvider } from 'ionic-audio';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommentPage } from '../comment/comment';
import { AboutmePage } from '../aboutme/aboutme';
import { PortfolioPage } from '../portfolio/portfolio';
import { MessagedetailsPage } from '../../pages/messagedetails/messagedetails';
import { OtherprofileconnectionsPage } from '../../pages/otherprofileconnections/otherprofileconnections';
import { OtherprofileeventsPage } from '../../pages/otherprofileevents/otherprofileevents';
import { HomePage } from '../home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { EventdetailsPage } from '../../pages/eventdetails/eventdetails';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { AudiodetailsPage } from '../../pages/audiodetails/audiodetails';
import { VideodetailsPage } from '../videodetails/videodetails';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { LoginPage } from '../login/login';
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
  @ViewChild(Content) content: Content;
  @ViewChildren('videoPlayer') videoPlayer: QueryList<any>;
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
  loggedInUserID: any;
  currentTrack: any;
  currentTrackNumber: number = 0;
  arr: any = [];
  showmenu: boolean;
  constructor(private streamingMedia: StreamingMedia, public photoViewer: PhotoViewer, public _DomSanitizer: DomSanitizer, private alertCtrl: AlertController, public modalCtrl: ModalController, private socialSharing: SocialSharing, private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.base_url = this.remotService.site_url;
    this.otherprofiledata = navParams.get('otheruserfrofiledata');
    this.loggedInUserID = window.localStorage['userid'],
      this.tabtype = navParams.get('tabname');
    this.friendcheck = navParams.get('friendcheck');
    //console.log('otherprofile data', this.otherprofiledata);
    this.initOtherprofiledata();
  }
  gotoPhotoView(albumview) {
    var album = {
      id: albumview.album_id
    }

    // console.log(albumview);
    this.navCtrl.push(PhotoviewPage, { "album": album, "img_id": albumview.id, 'touserid': this.otherprofiledata.user_id, "parentPage": this });

  }

  /*  zoomImage(imageData) {
     const imagezoom = this.base_url + 'uploads/portfolioImages/' + imageData.image_name;
     console.log('zoom image', imageData);
     this.photoViewer.show(imagezoom, '', { share: false });
   } */
  zoomProfileImage(imageData) {
    const imagezoom = this.base_url + 'uploads/profileImages/' + imageData.incident_details;
    //console.log('zoom image', imageData);
    this.photoViewer.show(imagezoom, '', { share: false });
  }
  zoomStatusImage(imageData) {
    const imagezoom = this.base_url + 'uploads/statusMedia/' + imageData.media_name;
    //console.log('zoom image', imageData);
    this.photoViewer.show(imagezoom, '', { share: false });
  }

  initOtherprofiledata() {
    /*init status params*/
    this.statustext = '';
    this.statusimage = '';
    this.statustags = [];
    this.statusprivacy = 1;
    this.milliseconds = Math.floor(Math.random() * 6) + 1;
    ////////////////////////

    this.remotService.presentLoading();
    var homeparam = {
      user_id: this.otherprofiledata.user_id,
      user_type: this.otherprofiledata.user_type,
      //loggedInUserID: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    // console.log(homeparam);
    this.remotService.postData(homeparam, 'homePage').subscribe((response) => {

      this.remotService.dismissLoader();

      if (response.success == 1) {
        this.profileinfo = response.data.detailsOfuser[0];
        //console.log('Profile Data', this.profileinfo);
      } else if (response.success == 2) {
        this.remotService.dismissLoader();
        this.navCtrl.push(LoginPage, { closeapp: true });
        window.localStorage.clear();
        this.showmenu = false;
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

            this.modiFyitemasnecessary(item);
            this.homeData.push(item);
            // console.log(this.homeData);
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
            this.modiFyitemasnecessary(item);
            this.homeData.push(item);
            // console.log(this.homeData);
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



  playThisTrack(event, track) {
    if (track.select) {
      track.select = false;
      this.videoPlayer.forEach((i: ElementRef) => {
        i.nativeElement.pause();
      });
    }
    else {
      track.select = true;
    }

    this.currentTrack = track // This should change the track no?
    this.currentTrackNumber = (track.id);
    this.arr.push(track.id);
    for (let i = 0; i < this.arr.length; i++) {
      if (this.currentTrackNumber != this.arr[i]) {
        this._audioProvider.stop(this.arr[i]);
        var index = this.arr.indexOf(this.arr[i]);
        if (index > -1) {
          this.arr.splice(index, 1);
        }
        for (let g of this.homeData) {
          // item.incident_type==='Audio'
          if (g.incident_type == 'Audio') {
            for (let xc of g.myTracks) {
              if (xc.id != track.id) {
                xc.select = true;
              }

            }
          }
        }
      }
    }
    this._audioProvider.play(this.currentTrackNumber);
    if (this.currentTrackNumber == (track.id)) {

      this._audioProvider.pause(this.currentTrackNumber);
    }
    // Gets the track number from the track id

    // playback actually works but the audio-track-progress-bar doesn't react for me

  }



  playvideo(g) {
    this._audioProvider.stop();
    for (let g of this.homeData) {
      // item.incident_type==='Audio'
      if (g.incident_type == 'Audio') {
        for (let xc of g.myTracks) {
          xc.select = true;
        }
      }
    }
    let url = this.base_url + 'uploads/portfolioVideos/' + g;

    let options: StreamingVideoOptions = {
      successCallback: () => { //console.log('Video played') 
      },
      errorCallback: (e) => { //console.log('Error streaming')
      },
      orientation: 'landscape'
    };

    this.streamingMedia.playVideo(url, options);


  }

  /**
   * share post on social media
   * @param item 
   */
  shareThisPost(item) {
    var type = '';
    if (item.incident_type == 'You Tube') {
      type = 'youtube';
    }
    else {
      type = item.incident_type.toLowerCase();
    }
    var link = this.base_url + "user/things/share/" + type + "/" + item.id + "/" + 1
    // console.log(link)
    /*  var img = ""; */
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
    this.navCtrl.push(AboutmePage, { 'touserid': profileinfo.userid, 'usertype': profileinfo.user_type });
  }

  otheruserPortfolio(profileinfo) {
    this.navCtrl.push(PortfolioPage, { 'touserid': profileinfo.userid, 'usertype': this.otherprofiledata.user_type });
  }

  otheruserConnection(profileinfo) {
    this.navCtrl.push(OtherprofileconnectionsPage, { 'touserid': profileinfo.userid, 'usertype': this.otherprofiledata.user_type });
  }

  GotoMessage(profileinfo) {
    if (profileinfo.fname != null && profileinfo.lname != null) {
      var users_full_name = profileinfo.fname + profileinfo.lname
    }
    else {
      users_full_name = profileinfo.buisness_name;
    }
    var connection = {
      user_id: profileinfo.userid,
      image: profileinfo.image,
      users_full_name: users_full_name
    }
    //console.log(profileinfo);
    this.navCtrl.push(MessagedetailsPage, { user: connection, "parentPage": this });
  }


  otherUserEvents(profileinfo) {
    var events = {
      user_id: profileinfo.userid,
      image: profileinfo.image
    }
    this.navCtrl.push(OtherprofileeventsPage, { 'events': events, "parentPage": this });
  }

  /**
   * send request to a friend
   * @param connection 
   */
  sendRequest(profileinfo) {
    if (profileinfo.can_sent_friend_request_by_mobile == 1) {
      this.EntermobilenoSendRequest(profileinfo);
    }
    else {
      var token = window.localStorage['token'];
      var DataToSend = {
        from_user_id: window.localStorage['userid'],
        to_user_id: profileinfo.userid,
        token: token
      };
      this.remotService.presentToast('wait...');
      this.remotService.postData(DataToSend, 'sendRequset').subscribe((response) => {

        if (response.success == 1) {
          this.initOtherprofiledata();
          this.remotService.presentToast('Connection request sent successfully');
        }
      }, () => {

        this.remotService.presentToast('Error loading data.');
      });
    }
  }

  sendfollowingRequest(profileinfo) {
    var DataToSend = {
      user_id: window.localStorage['userid'],
      to_userid: profileinfo.userid,
      token: window.localStorage['token'],
      user_type: window.localStorage['usertype']
    };
    this.remotService.presentToast('wait...');
    this.remotService.postData(DataToSend, 'followUser').subscribe((response) => {

      if (response.success == 1) {
        this.initOtherprofiledata();
      }
    }, () => {

      this.remotService.presentToast('Error loading data.');
    });

  }
  ionViewWillLeave() {
    this._audioProvider.stop();
    this.remotService.dismissLoader();
  }



  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    //console.log('ionViewDidLoad OtherprofilePage');
  }

  /**
  * modify home-data as necessary
  * @param item 
  */
  modiFyitemasnecessary(item) {

    if (item.incident_type === 'Audio') {

      var audiosource = (item.audio_source != null && item.audio_source != '') ? item.audio_name : this.base_url + item.audio_name;

      item.myTracks = [{
        src: audiosource,
        artist: 'No Artist',
        title: item.audio_title,
        art: 'img/johnmayer.jpg',
        select: true,
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      }];

    }
  }

  EntermobilenoSendRequest(profileinfo) {
    let alert = this.alertCtrl.create({
      title: 'Send Friend Request',
      inputs: [
        {
          name: 'mobileno',
          placeholder: 'Enter mobile number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (profileinfo.mobile_no == data.mobileno) {
              var token = window.localStorage['token'];
              var DataToSend = {
                from_user_id: window.localStorage['userid'],
                to_user_id: profileinfo.userid,
                token: token
              };
              this.remotService.presentToast('wait...');
              this.remotService.postData(DataToSend, 'sendRequset').subscribe((response) => {
                if (response.success == 1) {
                  this.remotService.presentToast('Connection request sent successfully');
                  this.initOtherprofiledata();
                }
                else {
                  this.remotService.presentToast('Connection request sending failed');
                }
              }, () => {
                this.remotService.presentToast('Error loading data.');
              });
            }
            else {
              this.remotService.presentToast('Mobile number is incorrect');
            }

          }
        }
      ]
    });
    alert.present();
  }

  addtocalendarEvent(item) {
    var DataToSends = {
      userId: window.localStorage['userid'],
      eventId: item.event_id,
      token: window.localStorage['token']
    }
    this.remotService.presentLoading();
    this.remotService.postData(DataToSends, 'addToCalender').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.remotService.presentToast('Event Added in Calender Successfully!');
      }
      else {
        this.remotService.presentToast(response.message);
      }

    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });
  }

  ionViewDidEnter() {
    //console.log("Connection pages entered")
    this.content.resize();
  }
  eventDetails(event) {
    this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
  }
  audiodetails(track) {
    //console.log(track);
    this.navCtrl.push(AudiodetailsPage, { audiodetails: track });
  }
  videodetails(track) {
    // console.log(track);
    this.navCtrl.push(VideodetailsPage, { videodetails: track });
  }


}
