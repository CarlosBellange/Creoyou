import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events, App, AlertController, MenuController } from 'ionic-angular';
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
import { NotificationsettingsPage } from '../pages/notificationsettings/notificationsettings';
import { Content } from 'ionic-angular';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';


import { OneSignal } from '@ionic-native/onesignal';
import { LowerCasePipe } from '@angular/common';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { NotificationsdetailsPage } from '../pages/notificationsdetails/notificationsdetails';

@Component({
  templateUrl: 'app.html'
})

export class CreoYouApp {
  @ViewChild('content') nav: NavController
  rootPage: any = WelcomePage;
  @ViewChild(Content) content: Content;
  // i added extra icon param on home to switch link betn loop and home
  firstNavItems = [{ name: 'Home', link: HomePage, 'icon': 'home' }, { name: 'About', link: AboutmePage }, { name: 'Jobs', link: JobsPage }];
  secondNavItems = [{ name: 'Photos', link: PhotosPage }, { name: 'Videos', link: VideosPage }, { name: 'Audios', link: AudiosPage }];
  frthNavItems = [{ name: 'Upcoming', link: EventlistPage }, { name: 'Past', link: EventlistPage }];
  thirdNavItems = [{ name: 'Connections', link: ConnectionsPage }, { name: 'Following', link: FollowPage }];
  fifthNavItems = [{ name: 'Personal', link: PersonalPage }, { name: 'Privacy', link: PrivacyPage },
  { name: 'Notification', link: NotificationsettingsPage }];
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

  constructor(private device: Device, private network: Network, private contacts: Contacts, private androidPermissions: AndroidPermissions, private diagnostic: Diagnostic, public menu: MenuController, public alertCtrl: AlertController, public app: App, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private oneSignal: OneSignal, public events: Events, public remoteService: RemoteServiceProvider) {

    var uId = window.localStorage['userid'];
    this.menu.swipeEnable(false);



    if (uId > 0) {
      this.rootPage = HomePage;
      this.userFullname = window.localStorage['name'];
      this.showmenu = true;
      this.userimage = window.localStorage['userimage'];
    }

    this.base_url = remoteService.site_url;

    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.styleDefault();
      this.checkonlineofline();
      /* console.log('device information', this.device.platform); */
      /* if (this.device.version == '8.0.0') {
        let contact: Contact = this.contacts.create();
      }
      else {
        let contact: Contact = this.contacts.create();
        contact.name = new ContactName();
        contact.phoneNumbers = [new ContactField()];
        contact.save().then(
          () => console.log('Contact saved!', contact),
          (error: any) => console.error('Error saving contact.', error)
        );
      } */
      events.subscribe('creoyou:shownotifications', () => {

        //console.log('show notific');
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

      events.subscribe('creoyou:loopmenu', () => {

        this.topMenuItems = [{ 'icon': 'md-search', 'link': SearchPage }
          , { 'icon': 'home', 'link': HomePage }
          , { 'icon': 'md-person-add', 'link': ConnectionsPage }
          , { 'icon': 'notifications', 'link': NotificationsPage }
          , { 'icon': 'md-chatbubbles', 'link': MessagesPage }];

      });

      //listen from login controller once logged in 
      events.subscribe('user:loggedin', () => {

        this.showmenu = true;
        this.userFullname = window.localStorage['name'];

        this.nav.setRoot(HomePage);
      });

      this.navsegments = [{ 'name': '', items: this.firstNavItems },
      { 'name': 'Portfolio', items: this.secondNavItems },
      { 'name': 'Connections', items: this.thirdNavItems },
      { 'name': 'Events', items: this.frthNavItems },
      { 'name': 'Settings', items: this.fifthNavItems }];

      this.topMenuItems = [{ 'icon': 'md-search', 'link': SearchPage }
        , { 'icon': 'loop', 'link': FeedsPage }
        , { 'icon': 'md-person-add', 'link': ConnectionsPage }
        , { 'icon': 'notifications', 'link': NotificationsPage }
        , { 'icon': 'md-chatbubbles', 'link': MessagesPage }];

      //this.username = window.localStorage['username'];

      if (platform.is('cordova')) {

        this.oneSignal.startInit('7d221876-1bdf-4171-a878-29006dc6152c', '855303232010');
        this.oneSignal.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
          //update notifications
          //console.log("asdasdasdasd asd sa dsa d")
          this.events.publish('creoyou:shownotifications');
        });

        this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
          // do something when a notification is opened
          var response = jsonData.notification.payload.additionalData;
          var userid = window.localStorage['userid'];

          if (typeof userid == "undefined") {
            // $location.path("/login" );
            this.nav.push(LoginPage)
          } else {

            var locationPath: any = LoginPage;

            if (response.action == 'friendrequest') {
              locationPath = ConnectionsPage;
              this.nav.push(locationPath, { 'location': response.action });
            }

            else if (response.action == 'Event') {
              locationPath = NotificationsdetailsPage;
              var data = {
                id: response.incident_id,
                incident_type: 'Event',
              }
              this.nav.push(locationPath, { 'notificationDetails': data });
            }

            else if (response.action == 'messages') {
              locationPath = MessagesPage;
              this.nav.push(locationPath);
            }

            else {
              locationPath = NotificationsPage;
              this.nav.push(locationPath);
            }

          }
          //console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        });

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.endInit();


      }


    });
  }
  ionViewDidLoad() {
    this.content.scrollToTop();
  }
  logOutUser() {
    window.localStorage.clear();
    this.showmenu = false;
    //this.rootPage = WelcomePage;
    this.nav.setRoot(WelcomePage, { closeapp: true });
  }

  checkonlineofline() {
    // network connect or disconnect
    let connectSubscription = this.network.onConnect().subscribe(() => {
    });
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let error = 'Network disconnected';
      //show toast message mp
      this.remoteService.presentToast(error);
    });
  }

  gotoPage(item) {
    /*  if (item.icon == 'home') { */
    this.topMenuItems = [{ 'icon': 'md-search', 'link': SearchPage }
      , { 'icon': 'loop', 'link': FeedsPage }
      , { 'icon': 'md-person-add', 'link': ConnectionsPage }
      , { 'icon': 'notifications', 'link': NotificationsPage }
      , { 'icon': 'md-chatbubbles', 'link': MessagesPage }];

    /*   } */
    /*  else {
       this.topMenuItems = [{ 'icon': 'md-search', 'link': SearchPage }
         , { 'icon': 'loop', 'link': FeedsPage }
         , { 'icon': 'md-person-add', 'link': ConnectionsPage }
         , { 'icon': 'notifications', 'link': NotificationsPage }
         , { 'icon': 'md-chatbubbles', 'link': MessagesPage }];
     } */
    this.nav.push(item.link, { 'name': item.name });

  }

  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
    this.events.publish('menu:opened', '');
    this.navsegments = [{ 'name': '', items: this.firstNavItems },
    { 'name': 'Portfolio', items: this.secondNavItems },
    { 'name': 'Connections', items: this.thirdNavItems },
    { 'name': 'Events', items: this.frthNavItems },
    { 'name': 'Settings', items: this.fifthNavItems }];
  }




}

