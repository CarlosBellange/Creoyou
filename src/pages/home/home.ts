import {
  Component
} from '@angular/core';
import {
  NavController,
  ModalController,
  ActionSheetController,
  Events
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


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myTracks: any[];
  allTracks: any[];
  selectedTrack: any;
  progileinfo = {
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


  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public modalCtrl: ModalController, public events: Events,
    public imagepick: ImagePicker, public cropService: Crop, public cameraservice: Camera, public basesxfrservice: Base64, public _DomSanitizer: DomSanitizer, private socialSharing: SocialSharing) {

    this.base_url = this.remotService.site_url;
    this.initdatLoad();

  }

  initdatLoad() {

    this.events.publish('creoyou:shownotifications');

    /*init status params*/
    this.statustext = '';
    this.statusimage = '';
    this.statustags = [];
    this.statusprivacy = 1;
    this.milliseconds = Math.floor(Math.random() * 6) + 1;
    ////////////////////////

    this.changeimageType = '';

    this.remotService.presentLoading("Wait ...");
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
        window.localStorage['userimage'] = this.progileinfo.image;
        this.events.publish('creoyou:setprofileimage');

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

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Delete this post',
        role: 'destructive',
        handler: () => {
          console.log('Destructive clicked');
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
        }
      },
      {
        text: 'Connection only',
        handler: () => {
          this.statusprivacy = 2;
        }
      },
      {
        text: 'Connection & Followers',
        handler: () => {
          this.statusprivacy = 3;
        }
      },
      {
        text: 'Only me',
        handler: () => {
          this.statusprivacy = 4;
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
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(statusdetailParams, 'showStatusAction').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {

        this.initdatLoad();

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error saving data.');
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

  /**
   * showing other tagged users 
   * @param items 
   */
  showextrataggedusers(items) {

    let commonModal = this.modalCtrl.create(CommonmodalPage, {
      items: items.tagged_to.splice(2),
      title: "Other tagged users"
    });
    commonModal.onDidDismiss(data => {

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

      this.remotService.presentToast('Error!');
    });

  }

  getWholiked(item) {

    var DataToSend = {
      event_id: item.incident_id,
      type: item.incident_type,
      incident_id: item.id
    };

    this.remotService.presentLoading("Wait ...");
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
      this.remotService.presentToast('Error loading data.');
    });


  }
  //End of wholiked function

  /**
   * show user to tag in status
   */
  showUsersTotag() {

    this.statustags = [];

    let connectionModal = this.modalCtrl.create(TaguserPage);
    connectionModal.onDidDismiss(data => {

      if (data.tags.length > 0) {

        data.tags.forEach((item) => {

          this.statustags.push(item);

        })

      }


      console.log(this.statustags);
    });
    connectionModal.present();

  }

  // image cropper modal call
  addImage(title = "Chnage Profile Image", type = 'profile') {

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
          console.log('Cancel clicked');
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
        console.log(error);
      });
  }

  openImagePicker() {
    let options = {
      maximumImagesCount: 5,
    }
    this.chnagedimagename = null;
    this.imagepick.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {

          if (this.changeimageType == 'profile')
            this.saveProfileImage();
          else
            this.addStatusImage();

        });
      }, (err) => {
        console.log(err)
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

      //var bsesixfrImage =  base64File.split(',');
      this.statusimage = base64File;

    }, (err) => {

      this.statusimage = '';
      console.log('Base 64 service', err);
    });


  }

  //change profile image
  saveProfileImage() {


    let filePath: string = this.chnagedimagename;
    this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {

      var bsesixfrImage = base64File.split(',');
      // console.log(bsesixfrImage);
      // return false;
      var imageParams = {
        user_id: window.localStorage['userid'],
        chunkedMode: false,
        mimeType: "image/jpeg",
        image: bsesixfrImage[1]
      }

      this.remotService.presentLoading("Saving ...");
      this.remotService.postData(imageParams, 'profileImageChange').subscribe((response) => {

        this.remotService.dismissLoader();
        if (response.success == 1) {

          this.initdatLoad();

        } else {
          this.remotService.presentToast(response.message);
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error saving image.');
      });

    }, (err) => {
      //this.remotService.presentToast('No Im.');
      console.log('Base 64 service', err);
    });

  }

  /**
   * modify home-data as necessary
   * @param item 
   */
  modiFyitemasnecessary(item) {

    if (item.incident_type === 'Audio') {

      var audiosource = (item.audio_name != null && item.audio_name != '') ? this.base_url + item.audio_name : item.audio_source;

      item.myTracks = [{
        src: audiosource,
        artist: 'No Artist',
        title: item.audio_title,
        art: 'img/johnmayer.jpg',
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      }];

    }

    // return item;

  }



}