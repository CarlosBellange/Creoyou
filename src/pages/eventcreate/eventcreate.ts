import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, Events, Navbar } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { DomSanitizer } from '@angular/platform-browser';
import { TaguserPage } from '../../pages/taguser/taguser';




@IonicPage()
@Component({
  selector: 'page-eventcreate',
  templateUrl: 'eventcreate.html',
})
export class EventcreatePage {
  @ViewChild(Navbar) navBar: Navbar;
  eventtitle: any;
  eventlocation: any;
  eventstartdate: string;
  eventstarttime: string;
  eventenddate: string;
  eventendtime: string;
  eventdesc: any;
  eventprivacy = 1;
  eventimg: string;
  base_url: any;
  photos: any;
  chnagedimagename: any;
  eventimgshow: boolean;
  eventid: any;
  statustags = [];
  eventimageupload: any;

  constructor(public events: Events, public modalCtrl: ModalController, public _DomSanitizer: DomSanitizer, public imagepick: ImagePicker, public cameraservice: Camera, public basesxfrservice: Base64, public remotService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {

    var eventdtls = navParams.get('Eventdetails');
    this.base_url = this.remotService.site_url;
    // console.log(this.eventstartdate);

    /* Edit event details  */
    if (eventdtls && eventdtls.hasOwnProperty('id')) {
      this.eventid = eventdtls.id;
      this.eventtitle = eventdtls.name;
      this.eventlocation = eventdtls.location;
      this.eventstartdate = new Date(eventdtls.start_date_time).toISOString();
      this.eventstarttime = new Date(eventdtls.start_date_time).toISOString();
      this.eventenddate = new Date(eventdtls.end_date_time).toISOString();
      this.eventendtime = new Date(eventdtls.end_date_time).toISOString();
      this.eventdesc = eventdtls.description;
      this.eventprivacy = eventdtls.event_status;
      this.eventimg = eventdtls.media_name;
      this.eventimgshow = true;

    }
  }
  /* For create event*/
  CreateEvent() {
    if (this.eventid > 0) {
      var DataToSends = {
        token: window.localStorage['token'],
        userId: window.localStorage['userid'],
        eventId: this.eventid,
        eventName: this.eventtitle,
        location: this.eventlocation,
        description: this.eventdesc,
        startDate: this.eventstartdate,
        startTime: this.eventstarttime,
        endDate: this.eventenddate,
        endTime: this.eventendtime,
        invitedFriendsId: this.statustags,
        imageData: this.eventimageupload,
        eventStatus: this.eventprivacy
      }
      this.remotService.presentLoading("Saving ...");
      this.remotService.postData(DataToSends, 'eventCreateUpdate').subscribe((response) => {
        if (response.success == 1) {
          this.remotService.dismissLoader();
          this.navParams.get("parentPage").initeventlist();
          this.navCtrl.pop()
        } else {
          this.remotService.presentToast(response.message);
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }
    else {
      var DataToSend = {
        token: window.localStorage['token'],
        userId: window.localStorage['userid'],
        eventId: '',
        eventName: this.eventtitle,
        location: this.eventlocation,
        description: this.eventdesc,
        startDate: this.eventstartdate,
        startTime: this.eventstarttime,
        endDate: this.eventenddate,
        endTime: this.eventendtime,
        invitedFriendsId: this.statustags,
        imageData: this.eventimageupload,
        eventStatus: this.eventprivacy
      }

      this.remotService.presentLoading("Saving ...");
      this.remotService.postData(DataToSend, 'eventCreateUpdate').subscribe((response) => {

        this.remotService.dismissLoader();
        console.log(response);

      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error getting about details.');
      });
    }

  }
  /*Invite connection for event */
  inviteConnection() {
    this.statustags = [];

    let connectionModal = this.modalCtrl.create(TaguserPage);
    connectionModal.onDidDismiss(data => {

      if (data.tags.length > 0) {

        data.tags.forEach((item) => {

          this.statustags.push(item.user_id);

        })

      }
      // console.log(this.statustags);
    });
    connectionModal.present();
  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:hidemenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad EventcreatePage');
  }
  /*Image upload for event */
  upLoadImages() {
    const actionSheet = this.actionSheetCtrl.create({
      //title: 'Edit your post',
      buttons: [
        {
          text: 'Open Camera',
          role: 'destructive',
          handler: () => {
            this.takePicture();
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Open Gallery',
          role: 'destructive',
          handler: () => {
            this.openImagePicker();
            console.log('Destructive clicked');
          }
        },

      ]
    });

    actionSheet.present();
  }
  /* Take picture from camera */
  takePicture() {
    let options = {
      quality: 100,
      correctOrientation: true
    };
    this.cameraservice.getPicture(options)
      .then((item) => {
        this.saveImageToArrayBypath(item);

      }, function (error) {
        console.log(error);
      });
  }
  /* get image path */
  saveImageToArrayBypath(filePath) {


    //let filePath: string = this.chnagedimagename;
    this.basesxfrservice.encodeFile(filePath).then((base64File: string) => {

      var bsesixfrImage = base64File.split(',');
      this.photos = {
        realpath: base64File,
        foruploadpath: bsesixfrImage[1]
      };
      console.log(this.photos.realpath);
      this.eventimg = this.photos.realpath;
      this.eventimageupload = this.photos.foruploadpath;
      this.eventimgshow = false;


    });
  }
  /* Open image gallery */
  openImagePicker() {
    let options = {
      maximumImagesCount: 1,
    }
    this.chnagedimagename = null;
    this.imagepick.getPictures(options)
      .then((results) => {
        results.forEach((item) => {
          this.saveImageToArrayBypath(item);
        });

      }, (err) => {
        console.log(err)
      });
  }
  /*Remove image */
  removeImage() {
    this.eventimg = '';
  }
}
