import {
  Component,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Navbar,
  AlertController,
  Content
} from 'ionic-angular';
import {
  ModalController,
  ActionSheetController
} from 'ionic-angular';
import {
  AudioProvider
} from 'ionic-audio';
import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import {
  DomSanitizer
} from '@angular/platform-browser';

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
  TaguserPage
} from '../taguser/taguser';
import { CommentPage } from '../comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ConnectionsPage } from '../../pages/connections/connections';
import { FollowPage } from '../../pages/follow/follow';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { PhotoviewPage } from '../../pages/photoview/photoview';
import { AudiodetailsPage } from '../../pages/audiodetails/audiodetails';
import { VideodetailsPage } from '../videodetails/videodetails';
import { EventdetailsPage } from '../../pages/eventdetails/eventdetails';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AdvertisementdetailsPage } from '../../pages/advertisementdetails/advertisementdetails';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChildren('videoPlayer') videoPlayer: QueryList<any>;
  loopPageOffset = 0;
  addPageOffset = 0;
  loopData = [];
  addsData = [];
  base_url: any;
  date: any;
  currentTrack: any;
  currentTrackNumber: number = 0;
  arr: any = [];
  select: boolean;
  constructor(public ngZone: NgZone, private streamingMedia: StreamingMedia, public cd: ChangeDetectorRef, public photoViewer: PhotoViewer, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    private _audioProvider: AudioProvider, public remotService: RemoteServiceProvider, public modalCtrl: ModalController, public events: Events,
    public imagepick: ImagePicker, public cropService: Crop, public cameraservice: Camera,
    public basesxfrservice: Base64, public _DomSanitizer: DomSanitizer,
    private socialSharing: SocialSharing, public alertCtrl: AlertController) {

    this.base_url = this.remotService.site_url;
    this.initloopData()

  }


  playThisTrack(event, track) {
    this.ngZone.run(() => {
      if (track.select) {
        track.select = false;
        // this.videoPlayer.forEach((i: ElementRef) => {
        //   i.nativeElement.pause();
        // });

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
          for (let g of this.loopData) {
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
      // this.videoPlayer.forEach((i: ElementRef) => {
      //   i.nativeElement.pause();
      // });
      if (this.currentTrackNumber == (track.id)) {

        this._audioProvider.pause(this.currentTrackNumber);
      }
      // Gets the track number from the track id
      this.cd.detectChanges();
      // playback actually works but the audio-track-progress-bar doesn't react for me
    })
  }

  playvideo(g) {
    this.ngZone.run(() => {
      this._audioProvider.stop();
      for (let g of this.loopData) {
        // item.incident_type==='Audio'
        if (g.incident_type == 'Audio') {
          for (let xc of g.myTracks) {
            xc.select = true;
          }
        }
      }

      let url = this.base_url + 'uploads/portfolioVideos/' + g;
      //console.log(this.videoPlayer);
      // this.videoPlayer.forEach((i: ElementRef) => {
      //   if (url == i.nativeElement.currentSrc) {
      //     i.nativeElement.play();
      //     i.nativeElement.controls = true;
      //     // this._audioProvider.pause();
      //   } else {
      //     i.nativeElement.pause();
      //   }
      // });
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape'
      };

      this.streamingMedia.playVideo(url, options);
      this.cd.detectChanges();
    })

  }

  initloopData() {

    this.addsData = []
    this.loopData = []

    var dataparams = {
      user_id: window.localStorage['userid'],
      starting_limit: 0,
      ad_starting_limit: 0,
      token: window.localStorage['token']
    };
    this.remotService.presentLoading();
    this.remotService.postData(dataparams, 'loop-data').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {

        var responseLoopData = response.data.loopData;
        if (responseLoopData != null) {

          responseLoopData.forEach((item, key, index) => {
            this.modiFyitemasnecessary(item)
            this.loopData.push(item);
            console.log(this.loopData);
          })

        }

        console.log('loop data ', this.loopData);

        var responseaddsData = response.data.adData;
        if (responseaddsData != null) {

          responseaddsData.forEach((item, key, index) => {
            this.loopData.push(item);
            // this.addsData.push(item);
          })
          /* console.log("adds data", this.addsData) */
        }

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  fetchMoreLoopdata(infiniteScroll) {
    /* this._audioProvider.pause(this.currentTrackNumber);
    this.videoPlayer.forEach((i: ElementRef) => {
      i.nativeElement.pause();
    }); */
    this.loopPageOffset = this.loopPageOffset + 6;
    this.addPageOffset = this.addPageOffset + 1;


    var dataparams = {
      user_id: window.localStorage['userid'],
      starting_limit: this.loopPageOffset,
      ad_starting_limit: this.addPageOffset,
      token: window.localStorage['token']
    };

    this.remotService.postData(dataparams, 'loop-data').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        var responseLoopData = response.data.loopData;
        if (responseLoopData != null) {
          responseLoopData.forEach((item, key, index) => {
            this.modiFyitemasnecessary(item)
            this.loopData.push(item);

          })

        }


        var responseaddsData = response.data.adData;
        if (responseaddsData != null) {

          responseaddsData.forEach((item, key, index) => {
            this.loopData.push(item);
            // this.addsData.push(item);
            // console.log(this.addsData);
          })

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

    } /* else if (item.incident_type == 'You Tube') {

      item.video_name = this._DomSanitizer.bypassSecurityTrustResourceUrl(item.video_name)
    } */

    // return item;

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
    console.log(link)
    //var img = "";
    var msg = ""
    this.socialSharing.share(msg, null, null, link);

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
      this.remotService.presentToast('Error loading data.');
    });


  }
  //End of wholiked function

  presentActionSheet(item) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Hide post of ' + item.users_full_name,
        role: 'destructive',
        handler: () => {
          this.hidepost(item)
        }
      },
      {
        text: 'Report this post',
        role: 'destructive',
        handler: () => {
          this.reportpost(item)
        }
      }

      ]
    });

    actionSheet.present();
  }


  reportpost(item) {

    let prompt = this.alertCtrl.create({
      title: 'Select Why You Are Reporting This Post ?',
      // message: 'Select option ',
      inputs: [
        {
          type: 'radio',
          label: "It's annoying or not interesting ",
          value: '1'
        },
        {
          type: 'radio',
          label: "I think it shouldn't be on CreoYou ",
          value: '2'
        }, {
          type: 'radio',
          label: "It's spam",
          value: '3'
        }],
      buttons: [
        {
          text: "Report",
          handler: data => {
            console.log("Report clicked", data);
          }
        },
        {
          text: "Cancel",
          handler: data => {

          }
        }]
    });
    prompt.present();
  }

  hidepost(item) {

    var paramsobj = {
      user_id: window.localStorage['userid'],
      connection_id: item.user_id,
      token: window.localStorage['token']
    }

    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: "<p class='popmsg'>Are you sure you want to hide posts ? You will still remain connected but you won't see any posts  on your Creoloop page. You can undo this action by going to your Privacy Settings page</p>",
      buttons: [
        {
          text: 'Hide Posts',
          role: 'ok',
          handler: () => {

            this.remotService.presentLoading();
            this.remotService.postData(paramsobj, 'unfollow-user-post').subscribe((response) => {

              this.remotService.dismissLoader()
              if (response.success == 1) {
                this.initloopData()
              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {
              this.remotService.dismissLoader()
              this.remotService.presentToast('Error loading data.');
            });

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {


          }
        }
      ]
    });
    alert.present();

  }

  OtherFrofileView(item) {

    this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': item });
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

  /* zoomImage(imageData) {
    const imagezoom = this.base_url + 'uploads/portfolioImages/' + imageData.image_name;
    console.log('zoom image', imageData);
    this.photoViewer.show(imagezoom, '', { share: false });
  } */
  zoomProfileImage(imageData) {
    const imagezoom = this.base_url + 'uploads/profileImages/' + imageData.incident_details;
    console.log('zoom image', imageData);
    this.photoViewer.show(imagezoom, '', { share: false });
  }
  zoomStatusImage(imageData) {
    const imagezoom = this.base_url + 'uploads/statusMedia/' + imageData.media_name;
    console.log('zoom image', imageData);
    this.photoViewer.show(imagezoom, '', { share: false });
  }


  ionViewDidLoad() {

    this.events.publish('creoyou:loopmenu');

    console.log('ionViewDidLoad FeedsPage');
  }

  gotoPhotoView(albumview, item) {
    var album = {
      id: albumview.album_id
    }
    console.log(albumview);
    this.navCtrl.push(PhotoviewPage, { "album": album, "img_id": albumview.id, 'touserid': item.user_id, "parentPage": this });

  }
  ionViewDidEnter() {
    //console.log("Connection pages entered")
    this.content.resize();
    this.events.publish('creoyou:showmenu');
  }

  ionViewWillLeave() {
    this._audioProvider.stop();
    this.remotService.dismissLoader();
  }

  eventDetails(event) {
    if (event.data_type == 'ad') {
      var DataToSends = {
        token: window.localStorage['token'],
        user_id: window.localStorage['userid'],
        advertisement_id: event.id
      }

      this.remotService.postData(DataToSends, 'viewAdvertise').subscribe((response) => {
        if (response.success == 1) {
          this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
        }
        else {
          this.remotService.presentToast(response.message);
        }

      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }
    else {
      this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
    }
  }

  audiodetails(track) {
    this.navCtrl.push(AudiodetailsPage, { audiodetails: track });
  }

  videodetails(track) {
    this.navCtrl.push(VideodetailsPage, { videodetails: track });
  }

  addDetails(item) {
    var DataToSends = {
      token: window.localStorage['token'],
      user_id: window.localStorage['userid'],
      advertisement_id: item.id
    }
    this.remotService.postData(DataToSends, 'viewAdvertise').subscribe((response) => {
      if (response.success == 1) {
        this.navCtrl.push(AdvertisementdetailsPage, { adddetails: item });
      }
      else {
        this.remotService.presentToast(response.message);
      }

    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error getting about details.');
    });

  }

}
