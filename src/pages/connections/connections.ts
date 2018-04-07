import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, AlertController, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController } from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';

import { InvitefriendPage } from '../../pages/invitefriend/invitefriend';
import { MessagedetailsPage } from '../../pages/messagedetails/messagedetails';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {

  @ViewChild(Content) content: Content;
  base_url: any;
  connections = [];
  suggestions = [];
  pendingusers = [];
  shownone: number = 0
  @ViewChild(Navbar) navBar: Navbar;
  connectiontab: string;
  showmenu: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider,
    public modalCtrl: ModalController, public alertCtrl: AlertController) {
    var path = this.navParams.get('location');
    //console.log('notification path', path);
    this.base_url = this.remotService.site_url;
    this.connectiontab = 'connections';

    if (path == 'friendrequest') {
      this.connectiontab = 'pendingrequest';
      this.initviewWithPendingRequest();
      this.remotService.dismissLoader();
    }

    this.initViewwithconnectionsdata();
  }

  ionViewDidEnter() {
    //console.log("Connection pages entered")
    this.content.resize();

  }

  initViewwithconnectionsdata() {

    this.shownone = 0

    var searchparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.connections = [];
    this.remotService.presentLoading();
    this.remotService.postData(searchparams, 'getConnections').subscribe((response) => {

      this.remotService.dismissLoader();
      this.shownone = 1
      if (response.success == 1) {

        this.connections = response.data;
        //console.log(this.connections);
      } else if (response.success == 2) {
        this.navCtrl.push(LoginPage, { closeapp: true });
        window.localStorage.clear();
        this.showmenu = false;
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.shownone = 1
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

    var pendingreqparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };

    this.pendingusers = [];
    this.remotService.postData(pendingreqparams, 'friendRequest').subscribe((response) => {

      if (response.success == 1) {

        this.pendingusers = response.data;


      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error loading data.');
    });

  }

  initviewWithsuggestions() {

    this.shownone = 0
    var suggestionsparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.suggestions = [];
    this.remotService.presentLoading();
    this.remotService.postData(suggestionsparams, 'suggestion').subscribe((response) => {

      this.remotService.dismissLoader();
      this.shownone = 1
      if (response.success == 1) {

        this.suggestions = response.data;
        //console.log(this.suggestions);
      } /* else {
        this.remotService.presentToast(response.message);
      } */
    }, () => {
      this.remotService.dismissLoader();
      // this.remotService.presentToast('Error loading data.');
      this.shownone = 1
    });

  }

  initviewWithPendingRequest(showloader = true) {

    this.shownone = 0
    var pendingreqparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.pendingusers = [];

    if (showloader)
      this.remotService.presentLoading();
    this.remotService.postData(pendingreqparams, 'friendRequest').subscribe((response) => {
      this.remotService.dismissLoader();
      this.shownone = 1
      if (showloader)
        this.remotService.dismissLoader();

      if (response.success == 1) {

        this.pendingusers = response.data;
      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      if (showloader)
        this.remotService.dismissLoader();

      this.remotService.presentToast('Error loading data.');
      this.shownone = 1
    });

  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.setRoot(HomePage)
    }

    //console.log('ionViewDidLoad ConnectionsPage');
  }


  presentActionSheet(connection, index) {
    // console.log(connection, index);
    var DataToSend = {
      user_id: window.localStorage['userid'],
      to_userid: connection.user_id,
      token: window.localStorage['token']
    };
    const actionSheet = this.actionSheetCtrl.create({
      //title: 'Edit your post',
      buttons: [
        {
          text: 'Block',
          role: 'destructive',
          handler: () => {

            var text = "<p class='blkusr'>Are you sure you want to block this user? Blocking prevents you from.</p>\n\
            \n\ <ul class='blkusrlist'>\n\
            \n\ <li>Visiting one another’s profile.</li>\n\
            \n\ <li>Seeing each other’s posts or comments</li>\n\
            \n\  <li>Exchanging messages</li>\n\
            \n\  <li>Sending connection requests or following one another</li>\n\
            \n\ </ul><p class='blkusr'>Unblock by going under Settings - Privacy</p>"
            this.removeConfirmationalert(DataToSend, 'blockUser', text, index)

          }
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {

            this.removeConfirmationalert(DataToSend, 'unfriendUser',
              "Are you sure you want to remove this connection?", index)

          }
        },

      ]
    });

    actionSheet.present();
  }

  // remove firend 
  removeConfirmationalert(DataToSend, url, messageText, index) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: messageText,
      buttons: [
        {
          text: 'Yes',
          role: 'ok',
          handler: () => {

            this.remotService.presentLoading();
            this.remotService.postData(DataToSend, url).subscribe((response) => {

              this.remotService.dismissLoader()
              if (response.success == 1) {
                this.connections.splice(index, 1);
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
          text: 'No',
          role: 'cancel',
          handler: () => {


          }
        }
      ]
    });
    alert.present();


  }

  /**
   * start messaging with user connection
   */
  startMessage(connection, idx) {
    //console.log('Connection Page content', connection);
    this.navCtrl.push(MessagedetailsPage, { user: connection, "parentPage": this });

  }

  /**
   * send request to a friend
   * @param connection 
   */
  sendRequest(connection) {
    if (connection.can_sent_friend_request_by_mobile == 1) {
      this.EntermobilenoSendRequest(connection);
    }
    else {
      connection.sent = 1;
      var token = window.localStorage['token'];
      var DataToSend = {
        from_user_id: window.localStorage['userid'],
        to_user_id: connection.user_id,
        token: token
      };

      this.remotService.presentLoading();
      this.remotService.postData(DataToSend, 'sendRequset').subscribe((response) => {

        this.remotService.dismissLoader()
        if (response.success == 1) {

        } else {
          connection.sent = 0;
          this.remotService.presentToast(response.message);
        }
      }, () => {
        connection.sent = 0;
        this.remotService.dismissLoader()
        this.remotService.presentToast('Error loading data.');
      });

    }
  }

  inviteFriend() {

    this.navCtrl.push(InvitefriendPage);

  }

  /**
   * accept connection request
   */
  acceptRequest(conn, index) {


    var token = window.localStorage['token'];
    var DataToSend = {
      from_useid: conn.id,
      to_userid: window.localStorage['userid'],
      token: token
    };

    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'acceptRequest').subscribe((response) => {

      this.remotService.dismissLoader()
      if (response.success == 1) {

        this.pendingusers.splice(index, 1);

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader()
      this.remotService.presentToast('Error loading data.');
    });


  }


  /**
  * reject connection request
  */
  rejectRequest(conn, index) {
    var token = window.localStorage['token'];
    var DataToSend = {
      user_id: conn.id,
      token: token
    };

    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to decline this request?You can accept this later from your Privacy Settings',
      buttons: [
        {
          text: 'Yes',
          role: 'ok',
          handler: () => {
            this.remotService.presentLoading();
            this.remotService.postData(DataToSend, 'deleteRequest').subscribe((response) => {

              this.remotService.dismissLoader()
              if (response.success == 1) {
                this.pendingusers.splice(index, 1);

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
          text: 'No',
          role: 'cancel',
          handler: () => {


          }
        }
      ]
    });
    alert.present();
  }

  segmentChanged(event) {

    if (this.connectiontab == 'connections')
      this.initViewwithconnectionsdata();
    else if (this.connectiontab == 'suggestions')
      this.initviewWithsuggestions();
    else if (this.connectiontab == 'pendingrequest')
      this.initviewWithPendingRequest();

  }


  OtherFrofileView(connection) {
    // console.log('other connection data', connection, this.connectiontab);
    this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': connection, 'tabname': this.connectiontab });
  }

  sendFollowRequest(connection) {
    //console.log(connection,"new follow");
    var token = window.localStorage['token'];
    var DataToSend = {
      to_userid: connection.user_id,
      user_id: window.localStorage['userid'],
      token: token,
      user_type: window.localStorage['usertype']
    };

    this.remotService.presentLoading();
    this.remotService.postData(DataToSend, 'followUser').subscribe((response) => {

      this.remotService.dismissLoader()
      if (response.success == 1) {
        connection.followed = 1
        //this.pendingusers.splice(index, 1);

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader()
      this.remotService.presentToast('Error loading data.');
    });
  }

  EntermobilenoSendRequest(connection) {
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (connection.mobile_no == data.mobileno) {
              var token = window.localStorage['token'];
              connection.sent = 1;
              var DataToSend = {
                from_user_id: window.localStorage['userid'],
                to_user_id: connection.user_id,
                token: token
              };
              this.remotService.presentLoading();
              this.remotService.postData(DataToSend, 'sendRequset').subscribe((response) => {
                this.remotService.dismissLoader()
                if (response.success == 1) {
                } else {
                  connection.sent = 0;
                  this.remotService.presentToast(response.message);
                }
              }, () => {
                connection.sent = 0;
                this.remotService.dismissLoader()
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
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
