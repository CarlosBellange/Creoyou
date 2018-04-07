import {
  Component, ViewChild, ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { IonicPage, NavController, Content, NavParams, ActionSheetController, Events, Navbar, ModalController, App } from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import { MessagesPage } from '../messages/messages';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html',
})
export class MessagedetailsPage {

  base_url: any;
  user: any;
  messages: any;
  currentuserid: any;
  @ViewChild(Content) content: Content;
  messageText: string = '';
  lastmessageid = 0;
  messageCallInterval = null;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChildren('grabid') grabid: QueryList<any>;
  archived = 'Archived';
  blockeduser: any;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public apex: App,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, public modalCtrl: ModalController) {

    this.base_url = this.remotService.site_url;
    this.user = navParams.get('user');
    this.currentuserid = window.localStorage['userid'];
    this.initchatMessages();
    if (this.user && this.user.hasOwnProperty('archive')) {
      this.archived = 'Un Archived';
      this.initchatMessages();
    }

  }

  initchatMessages() {
    var chatparam = {
      from_userid: window.localStorage['userid'],
      to_userid: this.user.user_id,
      token: window.localStorage['token'],
      lastmessageid: this.lastmessageid
    };
    if (this.lastmessageid == 0)
      this.messages = [];
    // this.remotService.presentLoading();
    this.remotService.postData(chatparam, 'showFullchat').subscribe((response) => {
      if (response.success == 1) {

        if (response.data != null) {
          response.data.forEach((item, key, index) => {

            this.messages.push(item);
            //console.log(this.messages);
            this.lastmessageid = item.id;
            this.blockeduser = item.user_status;
            //console.log(this.blockeduser);
          })

        }

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      // this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  ionViewDidLoad() {
    this.messageCallInterval = setInterval(() => {
      // console.log('time int');
      this.initchatMessages();
    }, 4000);

    this.navBar.backButtonClick = () => {
      clearInterval(this.messageCallInterval);
      this.navCtrl.pop()
    }
    this.scrollToBottom();
    // console.log('ionViewDidLoad MessagedetailsPage');
  }

  sendMessage() {
    var sendTextparams = {
      to_userid: this.user.user_id,
      token: window.localStorage['token'],
      content: this.messageText,
      from_userid: window.localStorage['userid']

    };

    this.messageText = '';
    // this.remotService.presentLoading("Sending ...");
    this.remotService.postData(sendTextparams, 'sendMessages').subscribe((response) => {

      //  this.remotService.dismissLoader();

      if (response.data.hasOwnProperty('id')) {

        //   var newcomment = this.user;
        //  // this.lastmessageid            = response.data.hasOwnProperty('id');
        //   newcomment.content            = this.messageText;
        //   newcomment.id                 = response.data.id;
        //   newcomment.userId             = window.localStorage['userid'];
        //   newcomment.creation_date      = response.data.date;
        //   this.messages.push(newcomment);                  


        // this.scrollToBottom();

      }

      if (response.success == 1) {
      } else if (response.success == 2) {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      // this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });


  }

  ClearallArchive(event) {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Edit your Event',
      buttons: [
        {
          text: 'Clear All Chat',
          role: 'destructive',
          handler: () => {
            this.clearallMessage();
            //this.deleteEvent(event);
            /*  console.log('Destructive clicked'); */
          }
        },
        {
          text: this.archived,
          role: 'destructive',
          handler: () => {
            if (this.archived == 'Archived') {
              this.archiveMessage();
            }
            else {
              this.UnArchiveddetails();
            }

          }
        },
      ]
    });

    actionSheet.present();
  }

  clearallMessage() {
    var unreadData = {
      token: window.localStorage['token'],
      from_userid: window.localStorage['userid'],
      to_userid: this.user.user_id
    }
    this.remotService.postData(unreadData, 'deleteMessages').subscribe((response) => {
      if (response.success == 1) {
        this.messages = [];
      }
    }, () => {
      this.remotService.presentToast('Error loading data.');
    });
  }

  archiveMessage() {
    var unreadData = {
      token: window.localStorage['token'],
      from_userid: window.localStorage['userid'],
      to_userid: this.user.user_id
    }
    this.remotService.postData(unreadData, 'ArchieveMessages').subscribe((response) => {
      // console.log(response);
      if (response.success == 1) {
        this.navCtrl.push(MessagesPage);
      }
    }, () => {
      this.remotService.presentToast('Error loading data.');
    });
  }

  UnArchiveddetails() {
    var unreadData = {
      token: window.localStorage['token'],
      from_userid: window.localStorage['userid'],
      to_userid: this.user.user_id
    }
    this.remotService.postData(unreadData, 'unarchieveMessages').subscribe((response) => {
      // console.log(response);
      if (response.success == 1) {
        this.navCtrl.push(MessagesPage);
      }
    }, () => {
      this.remotService.presentToast('Error loading data.');
    });
  }

  scrollToBottom() {
    if (this.content) {
      // use the content's dimension to obtain the current height of the scroll
      let dimension = this.content.getContentDimensions();
      // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
      this.content.scrollTo(0, dimension.scrollHeight);
    } else {

    }

  }
  OtherFrofileView(event, msgindex) {

    this.grabid.forEach((i: ElementRef, index) => {
      if (msgindex == index) {
        this.data = {
          user_id: i.nativeElement.childNodes[1].classList[1]
        }
        if (this.currentuserid == this.data.user_id) {
          this.apex.getRootNav().setRoot(HomePage);
        }
        else {
          this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': this.data });
        }
      }
    })
  }
  ionViewWillLeave() {
    clearInterval(this.messageCallInterval);
  }

}
