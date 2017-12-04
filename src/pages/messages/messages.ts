import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Navbar,
  ActionSheetController,
  PopoverController
} from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';
import {
  InvitefriendPage
} from '../../pages/invitefriend/invitefriend';
import { MessagedetailsPage } from '../../pages/messagedetails/messagedetails';
import { NewmessagePage } from '../../pages/newmessage/newmessage';


@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  base_url: any;
  connections = [];
  suggestions = [];
  pendingusers = [];
  @ViewChild(Navbar) navBar: Navbar;
  connectiontab: string;
  messagePageOffset = 0;
  usermessage = [];
  unreadmessage = [];
  archivemessage: any;
  archive: boolean = false;
  inbox: boolean = true;
  /* unreadmsg: boolean = false;
  usrmsg: boolean = true; */

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider) {

    this.base_url = this.remotService.site_url;
    this.connectiontab = 'connections';

    // this.initViewwithData();
    this.ShowmessageDetails();
    this.unreadAllMessage();
  }

  ShowmessageDetails() {
    this.messagePageOffset = 0;
    var chatparam = {
      user_id: window.localStorage['userid'],
      limit: this.messagePageOffset,
      token: window.localStorage['token'],
    };
    this.usermessage = [];
    this.unreadmessage = [];
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(chatparam, 'messageDetails').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.inbox = true;
        if (response.data != null) {
          response.data.userMessages.forEach((item, key, index) => {
            this.usermessage.push(item);
            //console.log(response);
          })
          response.data.unseenMessagesofuser.forEach((item, key, index) => {
            this.unreadmessage.push(item);
            //console.log(this.unreadmessage);
          })
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
    this.messagePageOffset = this.messagePageOffset + 16;

    var chatparam = {
      user_id: window.localStorage['userid'],
      limit: this.messagePageOffset,
      token: window.localStorage['token'],
    };
    // console.log(chatparam);
    this.remotService.postData(chatparam, 'messageDetails').subscribe((response) => {

      infiniteScroll.complete();
      // console.log(response);
      if (response.success == 1) {

        if (response.data != null) {
          response.data.userMessages.forEach((item, key, index) => {
            this.usermessage.push(item);
            // console.log(this.usermessage);
          })
          /*  response.data.unseenMessagesofuser.forEach((item, key, index) => {
             this.unreadmessage.push(item);
             console.log(this.unreadmessage);
           }) */
        }

      } else {
        this.remotService.presentToast(response.message);
      }


    }, () => {
      infiniteScroll.complete();
      this.remotService.presentToast('Error loading data.');
    });

  }

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }
    console.log('ionViewDidLoad MessagesPage');
  }

  messageDetails(usermsg) {
    var msgdata = {
      creativeField: '',
      fname: usermsg.fname,
      image: usermsg.image,
      lname: usermsg.lname,
      occupation: '',
      user_id: usermsg.userid,
      user_type: usermsg.user_type,
      users_full_name: usermsg.fname + usermsg.lname
    }
    this.unreadMessage(usermsg);
    // console.log(msgdata);
    this.navCtrl.push(MessagedetailsPage, { user: msgdata });
  }


  messageDetailsArchive(arcmsg) {
    var msgdata = {
      creativeField: '',
      fname: arcmsg.fname,
      image: arcmsg.image,
      lname: arcmsg.lname,
      occupation: '',
      user_id: arcmsg.userid,
      user_type: arcmsg.user_type,
      users_full_name: arcmsg.fname + arcmsg.lname,
      archive: true
    }
    // console.log(msgdata);
    this.navCtrl.push(MessagedetailsPage, { user: msgdata });
  }

  unreadMessage(usermsg) {
    var unreadData = {
      token: window.localStorage['token'],
      from_userid: usermsg.userid,
      to_userid: window.localStorage['userid']
    }
    this.remotService.postData(unreadData, 'setSingleMessageRead').subscribe((response) => {
      // console.log(response);
      if (response.success == 1) {
        this.ShowmessageDetails();
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.presentToast('Error loading data.');
    });
  }

  openNewMessage() {
    this.navCtrl.push(NewmessagePage);
  }

  unreadArchriveMsg(event) {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Edit your Event',
      buttons: [
        {
          text: 'Archived',
          role: 'destructive',
          handler: () => {
            this.archiveMessage();
            //this.deleteEvent(event);
            /*  console.log('Destructive clicked'); */
          }
        },
      ]
    });

    actionSheet.present();
  }

  unreadAllMessage() {
    var unreadData = {
      token: window.localStorage['token'],
      to_userid: window.localStorage['userid']
    }
    this.remotService.postData(unreadData, 'setTotalMessageRead').subscribe((response) => {
    }, () => {
      this.remotService.presentToast('Error loading data.');
    });
  }

  archiveMessage() {
    var unreadData = {
      from_userid: window.localStorage['userid']
    }
    this.remotService.postData(unreadData, 'showArchieveMessages').subscribe((response) => {
      if (response.success == 1) {
        this.archive = true;
        this.inbox = false;
        this.archivemessage = response.data.usermessages;
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.presentToast('Error loading data.');
    });
  }

}