import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { CategoriesPage } from '../pages/categories/categories';
import { RegistrationPage } from '../pages/registration/registration';
import { AboutmePage } from '../pages/aboutme/aboutme';
import { JobsPage } from '../pages/jobs/jobs';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { ConnectionsPage } from '../pages/connections/connections';
import { FollowPage } from '../pages/follow/follow';
import { SettingsPage } from '../pages/settings/settings';
import { FeedsPage } from '../pages/feeds/feeds';
import { EventscalenderPage } from '../pages/eventscalender/eventscalender';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MessagesPage } from '../pages/messages/messages';
import { SearchPage } from '../pages/search/search';
import { PhotosPage } from '../pages/photos/photos';
import { VideosPage } from '../pages/videos/videos';
import { AudiosPage } from '../pages/audios/audios';
import { VideouploadPage } from '../pages/videoupload/videoupload';
import { VideocommentPage } from '../pages/videocomment/videocomment';
import { AudiocommentPage } from '../pages/audiocomment/audiocomment';
import { AudiuploadPage } from '../pages/audiupload/audiupload';
import { AlbumviewPage } from '../pages/albumview/albumview';
import { EventlistPage } from '../pages/eventlist/eventlist';
import { PersonalPage } from '../pages/personal/personal';
import { PrivacyPage } from '../pages/privacy/privacy';

import {
  RemoteServiceProvider
} from '../providers/remote-service/remote-service';


import { OneSignal } from '@ionic-native/onesignal';
import { LowerCasePipe } from '@angular/common';

@Component({
  templateUrl: 'app.html'
})

export class CreoYouApp {

  @ViewChild('content') nav: NavController
  rootPage: any = WelcomePage;
  firstNavItems = [{ name: 'Home', link: HomePage }, { name: 'About', link: AboutmePage }, { name: 'Jobs', link: JobsPage }];
  secondNavItems = [{ name: 'Photos', link: PhotosPage }, { name: 'Videos', link: VideosPage }, { name: 'Audios', link: AudiosPage }];
  frthNavItems = [{ name: 'Upcoming', link: EventlistPage }, { name: 'Past', link: EventlistPage }];
  thirdNavItems = [{ name: 'Connections', link: ConnectionsPage }, { name: 'Following', link: FollowPage }];
  fifthNavItems = [{ name: 'Personal', link: PersonalPage }, { name: 'Privacy', link: PrivacyPage },
  { name: 'Notification', link: NotificationsPage }];
  navsegments: any;

  topMenuItems: any;
  showmenu: boolean = false;
  userFullname: string;
  userimage: string = '';
  base_url: any;
  notificationcount = 0;
  pendingfriendrequestcount = 0;
  pendingmessagecount = 0;
  notificCallInterval: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private oneSignal: OneSignal, public events: Events, public remoteService: RemoteServiceProvider) {

    var uId = window.localStorage['userid'];

    if (uId > 0) {
      this.rootPage = HomePage;
      this.userFullname = window.localStorage['name'];
      this.showmenu = true;
      this.userimage = window.localStorage['userimage'];
    }

    this.base_url = remoteService.site_url;

    platform.ready().then(() => {


      events.subscribe('creoyou:shownotifications', () => {

        console.log('show notific');
        remoteService.postData({ token: window.localStorage['token'] }, 'getCountOfNotifications').subscribe((response) => {

          if (response.success == 1) {

            var rescountData = response.data;
            this.notificationcount = parseInt(rescountData.notificationscount);
            this.pendingfriendrequestcount = parseInt(rescountData.pendingrequest);
            this.pendingmessagecount = parseInt(rescountData.messagecount);

          } else {
            //this.remotService.presentToast('Error loading data.');
          }
        }, () => {

        });

      });

      //update notifications
      this.events.publish('creoyou:shownotifications');

      events.subscribe('creoyou:hidemenu', () => {

        this.showmenu = false;

      });

      events.subscribe('creoyou:showmenu', () => {

        this.showmenu = true;
        //update notifications
        this.events.publish('creoyou:shownotifications');

      });

      events.subscribe('creoyou:setprofileimage', () => {

        this.userimage = window.localStorage['userimage'];

      });

      //listen from login controller once logged in 
      events.subscribe('user:loggedin', () => {

        this.showmenu = true;
        this.userFullname = window.localStorage['name'];
        this.nav.push(HomePage);
      });

      this.navsegments = [{ 'name': '', items: this.firstNavItems },
      { 'name': 'Portfolio', items: this.secondNavItems },
      { 'name': 'Connections', items: this.thirdNavItems },
      { 'name': 'Events', items: this.frthNavItems },
      { 'name': 'Settings', items: this.fifthNavItems }];

      this.topMenuItems = [{ 'icon': 'md-search', 'link': SearchPage }
        , { 'icon': '', 'link': FeedsPage }
        , { 'icon': 'md-person-add', 'link': ConnectionsPage }
        , { 'icon': 'notifications', 'link': NotificationsPage }
        , { 'icon': 'md-chatbubbles', 'link': MessagesPage }];


      //this.username = window.localStorage['username'];

      if (platform.is('cordova')) {

        this.oneSignal.startInit('fcd38ba5-2264-48f1-bf30-d12ebe40b4ef', '990895596031');

        //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
          //update notifications
          this.events.publish('creoyou:shownotifications');
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

        this.oneSignal.getIds().then((ids) => {
          // alert("One signal ids"+ids.userId);
          window.localStorage['onesignalplayerid'] = ids.userId;
          window.localStorage['onesignaltoken'] = ids.pushToken;
        });

        this.oneSignal.endInit();


      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  logOutUser() {
    this.nav.push(WelcomePage);
    window.localStorage.clear();
    this.showmenu = false;
  }

  gotoPage(item) {
    this.nav.push(item.link, { 'name': item.name });

  }


}

