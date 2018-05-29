import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import {
  NavController,
  ModalController,
  ActionSheetController,
  Events,
  AlertController,
  Navbar,
  ViewController,
  Platform,
  App
} from 'ionic-angular';
import {
  AudioProvider
} from 'ionic-audio';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import {
  CommonmodalPage
} from '../commonmodal/commonmodal';
import {
  ImagePicker
} from '@ionic-native/image-picker';
import {
  Crop
} from '@ionic-native/crop';
import {
  Camera
} from '@ionic-native/camera';
import {
  Base64
} from '@ionic-native/base64';
import {
  DomSanitizer
} from '@angular/platform-browser';
import {
  TaguserPage
} from '../taguser/taguser';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ConnectionsPage } from '../../pages/connections/connections';
import { FollowPage } from '../../pages/follow/follow';
import { ImgPreloadDirective } from '../../directives/img-preload/img-preload';
import { VisitedprofilePage } from '../../pages/visitedprofile/visitedprofile';
import { ProfilecompletePage } from '../../pages/profilecomplete/profilecomplete';
import { PremiumuserPage } from '../../pages/premiumuser/premiumuser';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { EventdetailsPage } from '../../pages/eventdetails/eventdetails';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AudiodetailsPage } from '../../pages/audiodetails/audiodetails';
import { VideodetailsPage } from '../videodetails/videodetails';
import { LoginPage } from '../login/login';
import { WelcomePage } from '../welcome/welcome';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

declare var window;
declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChildren('videoPlayer') videoPlayer: QueryList<any>;
  myTracks: any[];
  allTracks: any[];
  selectedTrack: any;
  progileinfo = {
    background_image: 'background.jpg',
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
    image: 'avatar.png',
    lname: null,
    premium_user: 0,
    state: null,
    userid: null,
    website_url: null
  };
  maxprogress = 100;
  currentprogress = 30;
  homePageOffset = 0;
  homeData = [];
  chnagedimagename: any;
  statustext: string;
  statusimage: string;
  statustags = [];
  statusprivacy: number;
  changeimageType: any;
  milliseconds: any;
  base_url: any;
  connectionPage = ConnectionsPage;
  followPage = FollowPage;
  statusprivacytext = ''
  bgimage: string;
  currentTrack: any;
  currentTrackNumber: number = 0;
  arr: any = [];
  videourl: any;
  maxSize: any;
  showmenu: boolean;
  extraoudio: any;
  showloader: any;

  constructor(private streamingMedia: StreamingMedia, public photoViewer: PhotoViewer, public app: App, public platform: Platform, private viewCtrl: ViewController, public alertCtrl: AlertController, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public modalCtrl: ModalController, public events: Events,
    public imagepick: ImagePicker, public cropService: Crop, public cameraservice: Camera, public basesxfrservice: Base64, public _DomSanitizer: DomSanitizer, private socialSharing: SocialSharing) {

    this.bgimage = "assets/img/background.jpg"
    this.base_url = this.remotService.site_url;

    this.initdatLoad();

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.events.publish('creoyou:showmenu');
    this.events.subscribe('creoyou:showloader', () => {

      this.showloader = false;

    });
  }
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


  initdatLoad() {
    this.statusprivacytext = ''
    this.events.publish('creoyou:shownotifications');

    /*init status params*/
    this.statustext = '';
    this.statusimage = '';
    this.statustags = [];
    this.statusprivacy = 1;
    this.milliseconds = Math.floor(Math.random() * 6) + 1;
    ////////////////////////

    this.changeimageType = '';

    this.remotService.presentLoading();
    var homeparam = {
      user_id: window.localStorage['userid'],
      user_type: window.localStorage['usertype'],
      loggedInUserID: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.remotService.postData(homeparam, 'homePage').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.progileinfo = response.data.detailsOfuser[0];
        var targetbgimage = this.base_url + "uploads/backgroundImages/" + this.progileinfo.background_image
        var downloadingbgImage = new Image();  // create image object
        downloadingbgImage.onload = () => { //Once image is completed, console.log confirmation and switch our host attribute

          this.bgimage = targetbgimage;  //do the switch 😀
        }
        // Assign the src to that of some_remote_image_url. Since its an Image Object the
        // on assignment from this.targetSource download would start immediately in the background
        // and trigger the onload()
        downloadingbgImage.src = targetbgimage;

        window.localStorage['userimage'] = this.progileinfo.image;
        this.events.publish('creoyou:setprofileimage');

      } else {
        //this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      //this.remotService.presentToast('Error loading data.');
    });

    this.homePageOffset = 0;
    var dataHomeParams = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
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


      }
      else if (response.success == 2) {
        this.navCtrl.push(LoginPage, { closeapp: true });
        window.localStorage.clear();
        this.showmenu = false;
      }
      else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      // this.remotService.presentToast('Error loading data.');
    });

  }

  playThisTrack(event, track) {
    if (track.select) {
      track.select = false;

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
            this.extraoudio = g;
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

  }


  playvideo(g) {
    this._audioProvider.stop();
    for (let g of this.homeData) {
      // item.incident_type==='Audio'
      if (g.incident_type == 'Audio') {
        this.extraoudio = g;
        for (let xc of g.myTracks) {
          xc.select = true;
        }
      }
    }
    let url = this.base_url + 'uploads/portfolioVideos/' + g;

    let options: StreamingVideoOptions = {
      successCallback: () => {// console.log('Video played') 
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
    //console.log(link)
    //var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

  }

  presentActionSheet(item) {
    // console.log('remove post type', item);
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Delete this Post',
        role: 'destructive',
        handler: () => {
          let confirm = this.alertCtrl.create({
            title: 'Remove Post',
            message: 'Do you want to delete this?',
            buttons: [
              {
                text: 'Ok',
                handler: () => {

                  var DataToSend = {
                    userId: window.localStorage['userid'],
                    token: window.localStorage['token'],
                    incidentId: item.incident_id,
                    incidentType: item.incident_type,
                    incidenttypeId: item.id

                  };
                  // console.log(DataToSend);

                  this.remotService.presentLoading();
                  this.remotService.postData(DataToSend, 'deleteAction').subscribe((response) => {
                    this.remotService.dismissLoader();
                    let index = this.homeData.indexOf(item);
                    this.homeData.splice(index, 1);
                    this.remotService.presentToast('You have successfully deleted the post');
                  }, () => {

                    this.remotService.dismissLoader();
                    this.remotService.presentToast('Error!');
                  });


                }
              },
              {
                text: 'Cancel',
                handler: () => {
                  // console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();
        }
      },

      ]
    });

    actionSheet.present();
  }

  statusPrivacy() {
    const actionSheet = this.actionSheetCtrl.create({

      buttons: [{
        text: 'Public',
        handler: () => {
          this.statusprivacy = 1;
          this.statusprivacytext = 'Public'
        }
      },
      {
        text: 'Connection only',
        handler: () => {
          this.statusprivacy = 2;
          this.statusprivacytext = 'Connection only'
        }
      },
      {
        text: 'Connection & Followers',
        handler: () => {
          this.statusprivacy = 3;
          this.statusprivacytext = 'Connection & Followers'
        }
      },
      {
        text: 'Only me',
        handler: () => {
          this.statusprivacy = 4;
          this.statusprivacytext = 'Only me'
        }
      }

      ]
    });

    actionSheet.present();
  }

  /**
   * show comments
   */
  showComments(item) {
    //console.log(item);
    let commentModal = this.modalCtrl.create(CommentPage, { incidentitem: item });
    commentModal.onDidDismiss(data => {
      item.comments = data.commentlength;
    });
    commentModal.present();
  }

  /**
   * nav push to a page
   */
  gotoPage(page) {

    if (page == 'follow')
      this.navCtrl.push(FollowPage);
    else
      this.navCtrl.push(ConnectionsPage);

  }

  /**
   * Post New Status
   */
  postNewStatus() {

    if (this.statusimage == '' && this.statustext == '') {
      this.remotService.presentToast('Enter text or select an image.');
      return false;
    }
    var taggedUserid = [];

    this.statustags.forEach((item, key, index) => {

      taggedUserid.push(item.user_id);
    })
    var statusImagetoPost: any;
    if (this.statusimage != '') {

      statusImagetoPost = this.statusimage.split(',');
      statusImagetoPost = statusImagetoPost[1];
    }

    var statusdetailParams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token'],
      userStatus: this.statustext,
      statusPrivacyValue: this.statusprivacy,
      image: statusImagetoPost,
      mySelectedFriendsId: taggedUserid

    }
    this.remotService.presentLoading();
    this.remotService.postData(statusdetailParams, 'showStatusAction').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.initdatLoad();

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Network Problem');
    });


  }


  fetchHomeData(infiniteScroll) {
    this.homePageOffset = this.homePageOffset + 6;

    var dataHomeParams = {
      user_id: window.localStorage['userid'],
      other_user_id: window.localStorage['userid'],
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
            item.ddd =
              this.homeData.push(item);
            // console.log(this.homeData);
          });

        }


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      infiniteScroll.complete();
      this.remotService.presentToast('Network Problem');
    });

  }

  /**
   * showing other tagged users 
   * @param items 
   */
  showextrataggedusers(items) {
    var taggeduswrs = [];
    items.tagged_to.forEach((itemElm, index) => {

      if (index > 1)
        taggeduswrs.push(itemElm)

    })
    let commonModal = this.modalCtrl.create(CommonmodalPage, {
      items: taggeduswrs,
      title: "Other tagged users"
    });
    commonModal.onDidDismiss(data => {
      //console.log(items.tagged_to)
    });
    commonModal.present();
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

      this.remotService.presentToast('Network Problem');
    });

  }

  getWholiked(item) {

    var DataToSend = {
      event_id: item.incident_id,
      type: item.incident_type,
      incident_id: item.id
    };

    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'seeLikes').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        var users = [];
        var userdata = response.data;

        userdata.forEach((itemElm, key, index) => {

          users.push({
            id: itemElm.id,
            name: itemElm.fname + ' ' + itemElm.lname,
            'image': itemElm.image,
            creativeField: itemElm.creativeField,
            designation: itemElm.designation
          });
        })

        let commonModal = this.modalCtrl.create(CommonmodalPage, {
          items: users,
          title: "People Who Have Liked"
        });
        commonModal.onDidDismiss(data => {

        });
        commonModal.present();

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Network Problem');
    });


  }
  //End of wholiked function

  /**
   * show user to tag in status
   */
  showUsersTotag() {

    this.statustags = [];

    let connectionModal = this.modalCtrl.create(TaguserPage, { pagename: 'Tag Your Friend' });
    connectionModal.onDidDismiss(data => {

      if (data.tags.length > 0) {

        data.tags.forEach((item) => {

          this.statustags.push(item);

        })

      }


      // console.log(this.statustags);
    });
    connectionModal.present();

  }

  // image cropper modal call
  addImage(title = "Change Profile Image", type = 'profile') {

    this.changeimageType = type;
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [{
        text: 'Take a Picture',
        handler: () => {
          this.takePicture();
        }
      },
      {
        text: 'Pick From Library',
        handler: () => {

          //**************** */
          this.openImagePicker();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }
      ]
    });

    actionSheet.present();

  }

  ////

  takePicture() {
    let options = {
      quality: 100,
      correctOrientation: true
    };
    this.cameraservice.getPicture(options)
      .then((data) => {
        this.chnagedimagename = null;
        this.cropService
          .crop(data, {
            quality: 75
          })
          .then((newImage) => {
            this.chnagedimagename = newImage;
            if (this.changeimageType == 'profile')
              this.saveProfileImage();
            else
              this.addStatusImage();

          }, error => console.error("Error cropping image", error));
      }, function (error) {
        // console.log(error);
      });
  }

  openImagePicker() {
    let options = {
      maximumImagesCount: 1,
    }
    this.chnagedimagename = null;
    this.imagepick.getPictures(options)
      .then((results) => {
        if (results != '') {
          this.reduceImages(results).then(() => {
            if (this.changeimageType == 'profile')
              this.saveProfileImage();
            else
              this.addStatusImage();
          });
        }
      }, (err) => {
        //console.log(err)
      });
  }

  reduceImages(selected_pictures: any): any {
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {
          quality: 75
        })
          .then(cropped_image => {
            this.chnagedimagename = cropped_image;
          });
      });
    }, Promise.resolve());
  }

  /**
   * add status image to the div 
   */
  addStatusImage() {
    let filePath: string = this.chnagedimagename;
    this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {
      this.statusimage = base64File;
    }, (err) => {
      this.statusimage = '';
      // console.log('Base 64 service', err);
    });
  }

  //change profile image
  saveProfileImage() {


    let filePath: string = this.chnagedimagename;
    this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {
      var bsesixfrImage = base64File.split(',');
      var imageParams = {
        user_id: window.localStorage['userid'],
        chunkedMode: false,
        mimeType: "image/jpeg",
        image: bsesixfrImage[1]
      }
      this.remotService.presentLoading();
      this.remotService.postData(imageParams, 'profileImageChange').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.success == 1) {
          this.initdatLoad();
        } else {
          this.remotService.presentToast(response.message);
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Network Problem');
      });

    }, (err) => {
      // console.log('Base 64 service', err);
    });

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


    // return item;

  }

  VisitedProfile(progileinfo) {
    if (progileinfo.premium_user == 0) {
      this.remotService.presentToast(' Upgrade to Premium to see who has viewed your profile ');
    } else {
      this.navCtrl.push(VisitedprofilePage);
    }

  }

  gotoPhotoView(albumview) {
    var album = {
      id: albumview.album_id
    }
    // console.log(albumview);
    this.navCtrl.push(PhotoviewPage, { "album": album, "img_id": albumview.id, 'touserid': window.localStorage['userid'], "parentPage": this });

  }

  profilecomplite() {
    this.navCtrl.push(ProfilecompletePage, { usertype: window.localStorage['usertype'] });
  }
  getPremiumDetails() {
    this.navCtrl.push(PremiumuserPage);
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
      // this.remotService.presentToast('Error getting about details.');
    });
  }

  eventDetails(event) {
    // console.log(event);
    this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
  }
  audiodetails(track) {
    // console.log(track);
    this.navCtrl.push(AudiodetailsPage, { audiodetails: track });
  }
  videodetails(track) {
    //console.log(track);
    this.navCtrl.push(VideodetailsPage, { videodetails: track });
  }
  ionViewWillLeave() {
    this._audioProvider.stop();
    this.remotService.dismissLoader();
  }


}