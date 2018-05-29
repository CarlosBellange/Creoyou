import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Content, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { OtherprofilePage } from '../../pages/otherprofile/otherprofile';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',

})
export class CommentPage {

  comments = [];
  currentitem: any;
  commentText: string = '';

  base_url: any;
  currentuserid = 0
  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCntrl: ViewController,
    public actionSheetCtrl: ActionSheetController, public remotService: RemoteServiceProvider) {

    this.currentuserid = window.localStorage['userid']
    this.currentitem = navParams.get('incidentitem');
    this.base_url = this.remotService.site_url;
    //console.log(this.currentitem, navParams.get('incidentitem'));
    this.seecomment();
  }

  seecomment() {
    var commentsParams = {
      type: this.currentitem.incident_type,
      incident_id: this.currentitem.incident_id,
      typeId: this.currentitem.id,
      token: window.localStorage['token']
    }
    if (this.currentitem.incident_type == 'Profile' || this.currentitem.incident_type == 'User') {

      var commentsParams = {
        type: this.currentitem.incident_type,
        incident_id: this.currentitem.id,
        typeId: this.currentitem.id,
        token: window.localStorage['token']
      }

    } else if (this.currentitem.incident_type == 'You Tube' || this.currentitem.incident_type == 'Video') {

      var commentsParams = {
        type: this.currentitem.incident_type,
        incident_id: this.currentitem.id,
        typeId: this.currentitem.incident_id,
        token: window.localStorage['token']
      }

    }

   // console.log(commentsParams);
    this.comments = [];

    this.remotService.presentLoading();
    this.remotService.postData(commentsParams, 'seeComments').subscribe((response) => {
     // console.log(response);
      this.remotService.dismissLoader();
      if (response.success == 1) {

        var commentData = response.data.comments;
        if (commentData != null) {
          commentData.forEach((item, key, index) => {
            this.comments.push(item);
           // console.log(this.comments);
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

  OtherFrofileView(data) {
    if (data.user_status == 4) {
      this.remotService.presentToast('Your are not allowed to view that profile.');
    }
    else if (this.currentuserid == data.user_id) {
      //this.navCtrl.setRoot(HomePage);
    } else {
     // console.log('other connection data', data);
      this.navCtrl.push(OtherprofilePage, { 'otheruserfrofiledata': data });
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CommentPage');
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

            this.remotService.presentLoading();
            this.remotService.postData(commentsParams, 'deleteComments').subscribe((response) => {
             // console.log(response);
              this.remotService.dismissLoader();
              //console.log(idx);
              this.comments.splice(idx, 1);
            }, () => {
              this.remotService.dismissLoader();
              this.remotService.presentToast('Error .');
             // console.log('error');
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
    this.remotService.presentLoading();
    this.remotService.postData(commentsParams, 'newIncidentCommentAction').subscribe((response) => {

      this.remotService.dismissLoader();
      if (response.success == 1) {
        /* var newcomment = {
          comment: this.commentText,
          users_full_name: window.localStorage['name'],
          image: window.localStorage['userimage'],
          id: response.data.id
        }; */
        this.seecomment();
        this.commentText = '';
        /*  this.comments.push(newcomment);
         this.commentText = ''; */
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
  ionViewWillLeave() {
    this.remotService.dismissLoader();
  }

}
