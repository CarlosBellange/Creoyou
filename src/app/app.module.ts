import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Http, HttpModule } from '@angular/http';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { NgCalendarModule } from 'ionic2-calendar';
// Pages
import { CreoYouApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { CategoriesPage } from '../pages/categories/categories';
import { RegistrationPage } from '../pages/registration/registration';
import { AboutmePage } from '../pages/aboutme/aboutme';
import { JobsPage } from '../pages/jobs/jobs';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { ConnectionsPage } from '../pages/connections/connections';
import { SettingsPage } from '../pages/settings/settings';
import { FeedsPage } from '../pages/feeds/feeds';
import { EventscalenderPage } from '../pages/eventscalender/eventscalender';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MessagesPage } from '../pages/messages/messages';
import { SearchPage } from '../pages/search/search';
import { PhotosPage } from '../pages/photos/photos';
import { VideosPage } from '../pages/videos/videos';
import { AudiosPage } from '../pages/audios/audios';
import { LoginhelpPage } from '../pages/loginhelp/loginhelp';
import { CommonmodalPage } from '../pages/commonmodal/commonmodal';
import { SocialregPage } from '../pages/socialreg/socialreg';
import { TaguserPage } from '../pages/taguser/taguser';
import { CommentPage } from '../pages/comment/comment';
import { FollowPage } from '../pages/follow/follow';
import { InvitefriendPage } from '../pages/invitefriend/invitefriend';
import { MessagedetailsPage } from '../pages/messagedetails/messagedetails';
import { NewmessagePage } from '../pages/newmessage/newmessage';
import { AbouteditPage } from '../pages/aboutedit/aboutedit';
import { PhotouploadPage } from '../pages/photoupload/photoupload';
import { PhotoviewPage } from '../pages/photoview/photoview';
import { VideouploadPage } from '../pages/videoupload/videoupload';
import { VideocommentPage } from '../pages/videocomment/videocomment';
import { AudiocommentPage } from '../pages/audiocomment/audiocomment';
import { AudiuploadPage } from '../pages/audiupload/audiupload';
import { AlbumviewPage } from '../pages/albumview/albumview';
import { EventcreatePage } from '../pages/eventcreate/eventcreate';
import { EventlistPage } from '../pages/eventlist/eventlist';
import { EventdetailsPage } from '../pages/eventdetails/eventdetails';
import { SearchfilterPage } from '../pages/searchfilter/searchfilter';
import { JobdetailsPage } from '../pages/jobdetails/jobdetails';
import { JobapplyPage } from '../pages/jobapply/jobapply';
import { PersonalPage } from '../pages/personal/personal';
import { ParsonaleditPage } from '../pages/parsonaledit/parsonaledit';
import { PrivacyPage } from '../pages/privacy/privacy';
import { OtherprofilePage } from '../pages/otherprofile/otherprofile';
import { NotificationsettingsPage } from '../pages/notificationsettings/notificationsettings';
//Providers

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { RegValidatorProvider } from '../providers/reg-validator/reg-validator';
import { GlobalProvider } from '../providers/global/global';
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TextgrowDirective } from '../directives/textgrow/textgrow';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonTagsInputModule } from "ionic-tags-input";
import { InAppBrowser } from '@ionic-native/in-app-browser';


//Pipes
import { TimeagoPipe } from '../pipes/timeago/timeago';
import { MomentModule } from 'angular2-moment';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@NgModule({
  declarations: [
    CreoYouApp,
    HomePage,
    LoginPage,
    WelcomePage,
    RegistrationPage,
    CategoriesPage,
    AboutmePage,
    JobsPage,
    SettingsPage,
    ConnectionsPage,
    PortfolioPage,
    FeedsPage,
    NotificationsPage,
    EventscalenderPage,
    MessagesPage,
    SearchPage,
    PhotosPage,
    VideosPage,
    AudiosPage,
    LoginhelpPage,
    CommonmodalPage,
    SocialregPage,
    TaguserPage,
    CommentPage,
    TextgrowDirective,
    FollowPage,
    InvitefriendPage,
    MessagedetailsPage,
    NewmessagePage,
    AbouteditPage,
    PhotouploadPage,
    PhotoviewPage,
    VideouploadPage,
    VideocommentPage,
    AudiocommentPage,
    AudiuploadPage,
    AlbumviewPage,
    EventcreatePage,
    EventlistPage,
    EventdetailsPage,
    SearchfilterPage,
    JobdetailsPage,
    JobapplyPage,
    PersonalPage,
    ParsonaleditPage,
    PrivacyPage,
    OtherprofilePage,
    NotificationsettingsPage
  ],
  imports: [
    BrowserModule,
    RoundProgressModule,
    HttpModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    IonicModule.forRoot(CreoYouApp),
    IonicStorageModule.forRoot(),
    MomentModule,
    IonTagsInputModule,
    NgCalendarModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CreoYouApp,
    HomePage,
    LoginPage,
    WelcomePage,
    RegistrationPage,
    CategoriesPage,
    AboutmePage,
    JobsPage,
    SettingsPage,
    ConnectionsPage,
    PortfolioPage,
    FeedsPage,
    NotificationsPage,
    EventscalenderPage,
    MessagesPage,
    SearchPage,
    PhotosPage,
    VideosPage,
    AudiosPage,
    LoginhelpPage,
    CommonmodalPage,
    SocialregPage,
    TaguserPage,
    CommentPage,
    FollowPage,
    InvitefriendPage,
    MessagedetailsPage,
    NewmessagePage,
    AbouteditPage,
    PhotouploadPage,
    PhotoviewPage,
    VideouploadPage,
    VideocommentPage,
    AudiocommentPage,
    AudiuploadPage,
    AlbumviewPage,
    EventcreatePage,
    EventlistPage,
    EventdetailsPage,
    SearchfilterPage,
    JobdetailsPage,
    JobapplyPage,
    PersonalPage,
    ParsonaleditPage,
    PrivacyPage,
    OtherprofilePage,
    NotificationsettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    RemoteServiceProvider,
    RegValidatorProvider,
    GlobalProvider,
    OneSignal,
    GooglePlus,
    Facebook,
    ImagePicker,
    Crop,
    Camera,
    Base64,
    SocialSharing,
    FileChooser,
    FileTransfer,
    FileOpener,
    FilePath,
    File,
    AndroidPermissions,
    InAppBrowser
  ]
})
export class AppModule {

}
