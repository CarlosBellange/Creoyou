import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, Content } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';

/**
 * Generated class for the AudiocommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audiocomment',
  templateUrl: 'audiocomment.html',
})
export class AudiocommentPage {
  @ViewChild(Content) content: Content;
  comments = [];
  currentitem: any;
  commentText: string = '';
  base_url: any;
  currentuserid = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCntrl: ViewController,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider) {
    this.base_url = this.remotService.site_url;
    this.currentitem = navParams.get('incidentitem');
    this.currentuserid = window.localStorage['userid'];
    this.seecomment();
  }


  seecomment() {
    var commentsParams = {
      type: 'Audio',
      incident_id: this.currentitem.audio_id,
      typeId: this.currentitem.IncidentId,
      token: window.localStorage['token']
    }

    console.log(commentsParams);
    this.comments = [];
    this.remotService.presentLoading();
    this.remotService.postData(commentsParams, 'seeComments').subscribe((response) => {
      this.remotService.dismissLoader();
      if (response.success == 1) {
        console.log(response);
        var commentData = response.data.comments;
        if (commentData != null) {

          commentData.forEach((item, key, index) => {
            this.comments.push(item);

          });

        }

        this.scrollToBottom()


      } else {

        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });
  }


  sendMessage() {

    var commentsParams = {
      incidentType: 'Audio',
      incidentId: this.currentitem.IncidentId,
      incidentTypeId: this.currentitem.audio_id,
      token: window.localStorage['token'],
      comment: this.commentText,
      user_id: window.localStorage['userid'],
    };
    console.log(commentsParams);
    this.remotService.presentLoading();
    this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe((response) => {
      console.log(response);
      this.remotService.dismissLoader();
      if (response.success == 1) {
        this.seecomment();
        /*  var newcomment = {
           comment: this.commentText,
           users_full_name: window.localStorage['name'],
           image: window.localStorage['userimage'],
           id: response.data.id
         };
         this.comments.push(newcomment); */
        this.commentText = '';
        this.scrollToBottom();

      } else {

        this.remotService.presentToast(response.message);
      }
    }, () => {
      this.remotService.dismissLoader();
      this.remotService.presentToast('Error loading data.');
    });
  }



  presentActionSheet(comment, idx) {
    const actionSheet = this.actionSheetCtrl.create({
      //  title: 'Edit your Comment',
      buttons: [
        {
          text: 'Delete Your comment',
          role: 'destructive',
          handler: () => {

            var commentsParams = {
              incidentType: 'Audio',
              incidentId: this.currentitem.IncidentId,
              incidentTypeId: this.currentitem.audio_id,
              token: window.localStorage['token'],
              commentId: comment.id,
              userId: window.localStorage['userid'],
            };

            this.remotService.presentLoading();
            this.remotService.postData(commentsParams, 'deleteComments').subscribe((response) => {

              this.remotService.dismissLoader();
              //console.log(idx);
              this.comments.splice(idx, 1);
            }, () => {
              this.remotService.dismissLoader();
              this.remotService.presentToast('Error .');
            });
            // console.log('Destructive clicked',comment,idx);
          }
        }

      ]
    });

    actionSheet.present();
  }

  OtherFrofileView(data) {
    if (data.user_status == 4) {
      this.remotService.presentToast('Your are not allowed to view that profile.');
    }
    else if (this.currentuserid == data.user_id) {
      //this.navCtrl.setRoot(HomePage);
    } else {
      console.log('other connection data', data);
      this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });
    }

  }


  dismissComment() {
    console.log(this.comments.length);
    this.viewCntrl.dismiss({ commentlength: this.comments.length });
  }
  scrollToBottom() {
    // use the content's dimension to obtain the current height of the scroll
    let dimension = this.content.getContentDimensions();

    // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
    this.content.scrollTo(0, dimension.scrollHeight);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AudiocommentPage');
  }
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
