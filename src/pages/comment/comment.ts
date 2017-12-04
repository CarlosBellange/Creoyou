import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Content, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
// this is comments page
@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',

})
export class CommentPage {

  comments = [];
  currentitem: any;
  commentText: string;

  base_url: any;
  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCntrl: ViewController,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider) {

    this.currentitem = navParams.get('incidentitem');
    this.base_url = this.remotService.site_url;
    //console.log(this.currentitem,navParams.get('incidentitem'));

    var commentsParams = {
      type: this.currentitem.incident_type,
      incident_id: this.currentitem.incident_id,
      typeId: this.currentitem.id,
      token: window.localStorage['token']
    }
    console.log(commentsParams);
    this.comments = [];

    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(commentsParams, 'seeComments').subscribe((response) => {
      console.log(response);
      this.remotService.dismissLoader();
      if (response.success == 1) {
        console.log("okkkk");
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
    console.log('ionViewDidLoad CommentPage');
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
              incidentType: this.currentitem.incident_type,
              incidentId: this.currentitem.id,
              incidentTypeId: this.currentitem.incident_id,
              token: window.localStorage['token'],
              commentId: comment.id,
              userId: window.localStorage['userid'],
            };

            this.remotService.presentLoading("Wait ...");
            this.remotService.postData(commentsParams, 'deleteComments').subscribe((response) => {
              console.log(response);
              this.remotService.dismissLoader();
              //console.log(idx);
              this.comments.splice(idx, 1);
            }, () => {
              this.remotService.dismissLoader();
              this.remotService.presentToast('Error .');
              console.log('error');
            });
            // console.log('Destructive clicked',comment,idx);
          }
        }

      ]
    });

    actionSheet.present();
  }

  sendMessage() {

    var commentsParams = {
      incidentType: this.currentitem.incident_type,
      incidentId: this.currentitem.id,
      incidentTypeId: this.currentitem.incident_id,
      token: window.localStorage['token'],
      comment: this.commentText,
      user_id: window.localStorage['userid'],
    };
    console.log(commentsParams);

    this.remotService.presentLoading("Wait ...");
    this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe((response) => {

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

  scrollToBottom() {
    // use the content's dimension to obtain the current height of the scroll
    let dimension = this.content.getContentDimensions();

    // scroll to it (you can also set the duration in ms by passing a third parameter to the scrollTo(x,y,duration) method.
    this.content.scrollTo(0, dimension.scrollHeight);
  }

  dismissComment() {
    this.viewCntrl.dismiss({ commentlength: this.comments.length });
  }

}
