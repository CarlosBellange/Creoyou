import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, Content } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the VideocommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videocomment',
  templateUrl: 'videocomment.html',
})
export class VideocommentPage {
  @ViewChild(Content) content: Content;
  comments = [];
  currentitem: any;
  commentText: string;
  base_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCntrl: ViewController,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider) {
    this.base_url = this.remotService.site_url;
    this.currentitem = navParams.get('incidentitem');
    console.log(this.currentitem);
    var commentsParams = {
      type: 'Video',
      incident_id: this.currentitem.IncidentId,
      typeId: this.currentitem.video_id,
      token: window.localStorage['token']
    }

    console.log(commentsParams);
    this.comments = [];
    this.remotService.presentLoading("Wait ...");
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideocommentPage testpage');

  }

  sendMessage() {

    var commentsParams = {
      incidentType: 'Video',
      incidentId: this.currentitem.IncidentId,
      incidentTypeId: this.currentitem.video_id,
      token: window.localStorage['token'],
      comment: this.commentText,
      user_id: window.localStorage['userid'],
    };
    console.log(commentsParams);
    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe((response) => {
      console.log(response);
      this.remotService.dismissLoader();
      if (response.success == 1) {
        var newcomment = {
          comment: this.commentText,
          users_full_name: window.localStorage['name'],
          image: window.localStorage['userimage'],
          id: response.data.id
        };
        this.comments.push(newcomment);
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
              incidentType: 'Video',
              incidentId: this.currentitem.IncidentId,
              incidentTypeId: this.currentitem.video_id,
              token: window.localStorage['token'],
              commentId: comment.id,
              userId: window.localStorage['userid'],
            };

            this.remotService.presentLoading("Wait ...");
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


  dismissComment() {
    this.viewCntrl.dismiss({ commentlength: this.comments.length });
  }
  scrollToBottom() {
    // use the content's dimension to obtain the current height of the scroll
    let dimension = this.content.getContentDimensions();

    // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
    this.content.scrollTo(0, dimension.scrollHeight);
  }
}
