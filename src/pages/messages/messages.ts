import {
  Component,
  ViewChild
} from '@angular/core';
import {
  Content,
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
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @ViewChild(Content) content: Content;
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
  term: string = '';
  text: string;
  username: any;
  showmenu: boolean;
  /* unreadmsg: boolean = false;
  usrmsg: boolean = true; */

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider) {

    this.base_url = this.remotService.site_url;
    this.connectiontab = 'connections';

    // this.initViewwithData();

  }

  ionViewWillEnter() {
    this.content.resize();
    // console.log('reload page');
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
    this.remotService.presentLoading();
    this.remotService.postData(chatparam, 'messageDetails').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.remotService.dismissLoader();
        this.inbox = true;
        if (response.data != null) {
          response.data.userMessages.forEach((item, key, index) => {
            let g = item.content.toLowerCase();
            let sub = 'shared profile :';

            if (g.includes(sub)) {
              let otherpart = g.replace(sub, '');
              let obj = {
                'image': item.image,
                'buisness_name': item.buisness_name,
                'connection': item.connection,
                'content': sub,
                'count': item.count,
                'creation_date': item.creation_date,
                'fname': item.fname,
                'from_userid': item.from_userid,
                'id': item.id,
                'lname': item.lname,
                'status': item.status,
                'to_userid': item.to_userid,
                'user_type': item.user_type,
                'userid': item.userid
              }
              this.usermessage.push(obj);
            }
            else {
              this.usermessage.push(item);
            }

          })
          // console.log(this.usermessage);
          response.data.unseenMessagesofuser.forEach((item, key, index) => {

            this.unreadmessage.push(item);

            // console.log('ummm', this.unreadmessage);
          })
        }
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

  }

  fetchHomeData(infiniteScroll) {
    this.messagePageOffset = this.messagePageOffset + 16;

    var chatparam = {
      user_id: window.localStorage['userid'],
      limit: this.messagePageOffset,
      token: window.localStorage['token'],
    };
    this.remotService.postData(chatparam, 'messageDetails').subscribe((response) => {

      infiniteScroll.complete();
      if (response.success == 1) {

        if (response.data != null) {
          response.data.userMessages.forEach((item, key, index) => {
            this.usermessage.push(item);

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

  ionViewDidLoad() {
    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      //   this.navParams.get("parentPage").initViewwithconnectionsdata();
      this.events.publish('creoyou:showmenu');
      this.navCtrl.setRoot(HomePage)
    }
    //console.log('ionViewDidLoad MessagesPage');
  }

  messageDetails(usermsg) {
    this.username = usermsg.fname + ' ' + usermsg.lname;
    if (usermsg.buisness_name) {
      this.username = usermsg.buisness_name;
    }
    var msgdata = {
      creativeField: '',
      fname: usermsg.fname,
      image: usermsg.image,
      lname: usermsg.lname,
      occupation: '',
      user_id: usermsg.userid,
      user_type: usermsg.user_type,
      users_full_name: this.username
    }
    this.unreadMessage(usermsg);
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
    if (this.archive == true) {
      this.text = "Inbox";
    }
    else {
      this.text = "Archived";
    }
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Edit your Event',
      buttons: [
        {
          text: this.text,
          role: 'destructive',
          handler: () => {
            if (this.text == 'Archived') {
              this.archiveMessage();
            }
            else {
              this.inbox = true;
              this.archive = false;
            }
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


  getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.usermessage = this.usermessage.filter((usermsg) => {
        if (usermsg.fname) {
          return (usermsg.fname.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        else {
          return (usermsg.buisness_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }

      })
    }
    else {
      this.ShowmessageDetails();
    }
  }

  otherProfile() {
    // console.log('hiiiii');
  }


}