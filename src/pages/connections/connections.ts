import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events, Navbar, ModalController } from 'ionic-angular';

import {
  RemoteServiceProvider
} from '../../providers/remote-service/remote-service';

import { InvitefriendPage } from '../../pages/invitefriend/invitefriend';
import { MessagedetailsPage } from '../../pages/messagedetails/messagedetails';


@IonicPage()
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {

  base_url: any;
  connections = [];
  suggestions = [];
  pendingusers = [];
  @ViewChild(Navbar) navBar: Navbar;
  connectiontab: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider, public modalCtrl: ModalController) {

    this.base_url = this.remotService.site_url;
    this.connectiontab = 'connections';

    this.initViewwithconnectionsdata();

  }

  initViewwithconnectionsdata() {

    var searchparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.connections = [];
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(searchparams, 'getConnections').subscribe((response) => {

      this.remotService.dismissLoader();

      if (response.success == 1) {

        this.connections = response.data;

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
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

    var suggestionsparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.suggestions = [];
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(suggestionsparams, 'suggestion').subscribe((response) => {

      this.remotService.dismissLoader();

      if (response.success == 1) {

        this.suggestions = response.data;

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });

  }

  initviewWithPendingRequest(showloader = true) {

    var pendingreqparams = {
      user_id: window.localStorage['userid'],
      token: window.localStorage['token']
    };
    this.pendingusers = [];

    if (showloader)
      this.remotService.presentLoading("Wait ...");

    this.remotService.postData(pendingreqparams, 'friendRequest').subscribe((response) => {

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
    });

  }

  ionViewDidLoad() {

    this.events.publish('creoyou:hidemenu');

    //over ridding back button
    this.navBar.backButtonClick = () => {

      this.events.publish('creoyou:showmenu');
      this.navCtrl.pop()
    }

    console.log('ionViewDidLoad ConnectionsPage');
  }


  presentActionSheet(connection, index) {
    console.log(connection, index);
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

            this.remotService.presentToast('wait...');
            this.remotService.postData(DataToSend, 'blockUser').subscribe((response) => {

              if (response.success == 1) {
                this.connections.splice(index, 1);
              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {

              this.remotService.presentToast('Error loading data.');
            });


          }
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {

            this.remotService.presentToast('wait...');
            this.remotService.postData(DataToSend, 'unfriendUser').subscribe((response) => {

              if (response.success == 1) {
                this.connections.splice(index, 1);
              } else {
                this.remotService.presentToast(response.message);
              }
            }, () => {

              this.remotService.presentToast('Error loading data.');
            });

          }
        },

      ]
    });

    actionSheet.present();
  }

  /**
   * start messaging with user connection
   */
  startMessage(connection, idx) {
    console.log(connection);
    this.navCtrl.push(MessagedetailsPage, { user: connection });

  }

  /**
   * send request to a friend
   * @param connection 
   */
  sendRequest(connection) {

    connection.sent = 1;
    var token = window.localStorage['token'];
    var DataToSend = {
      from_user_id: window.localStorage['userid'],
      to_user_id: connection.user_id,
      token: token
    };

    this.remotService.presentToast('wait...');
    this.remotService.postData(DataToSend, 'sendRequset').subscribe((response) => {

      if (response.success == 1) {

      } else {
        connection.sent = 0;
        this.remotService.presentToast(response.message);
      }
    }, () => {
      connection.sent = 0;
      this.remotService.presentToast('Error loading data.');
    });

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

    this.remotService.presentToast('wait...');
    this.remotService.postData(DataToSend, 'acceptRequest').subscribe((response) => {

      if (response.success == 1) {

        this.pendingusers.splice(index, 1);

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

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

    this.remotService.presentToast('wait...');
    this.remotService.postData(DataToSend, 'deleteRequest').subscribe((response) => {

      if (response.success == 1) {

        this.pendingusers.splice(index, 1);

      } else {
        this.remotService.presentToast(response.message);
      }
    }, () => {

      this.remotService.presentToast('Error loading data.');
    });


  }

  segmentChanged(event) {

    if (this.connectiontab == 'connections')
      this.initViewwithconnectionsdata();
    else if (this.connectiontab == 'suggestions')
      this.initviewWithsuggestions();
    else if (this.connectiontab == 'pendingrequest')
      this.initviewWithPendingRequest();

  }

}
