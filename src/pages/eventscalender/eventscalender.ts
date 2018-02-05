import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { NgCalendarModule } from 'ionic2-calendar';
import * as moment from 'moment';

/**
 * Generated class for the EventscalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventscalender',
  templateUrl: 'eventscalender.html',
})
export class EventscalenderPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  };

  eventdetails: any;
  eventtitle: any;
  eventStartdate: string;
  eventEnddate: string;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    /* this.eventdetails = this.navParams.get('eventcaldetails');
    this.eventtitle = this.eventdetails[0].name;
    this.eventStartdate = this.eventdetails[0].start_date_time;
    this.eventEnddate = this.eventdetails[0].end_date_time;
    console.log(this.eventtitle); */
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log(event);

    /*  let start = moment(event.startTime).format('LLLL');
     let end = moment(event.endTime).format('LLLL');
 
     let alert = this.alertCtrl.create({
       title: '' + event.title,
       subTitle: 'From: ' + start + '<br>To: ' + end,
       buttons: ['OK']
     })
     alert.present(); */
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  /* today() {
    this.calendar.currentDate = new Date();
  } */
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }



  createRandomEvents() {
    var events = [];
    var startTime;
    var endTime;
    this.eventdetails = this.navParams.get('eventcaldetails');
    for (var i = 0; i < this.eventdetails.length; i++) {
      this.eventtitle = this.eventdetails[i].name;
      startTime = new Date(this.eventdetails[i].start_date_time);
      endTime = new Date(this.eventdetails[i].end_date_time);
      events.push({
        title: this.eventtitle,
        startTime: startTime,
        endTime: endTime,
        allDay: false
      });
    }
    console.log(events);
    return events;
  }


  ionViewDidLoad() {

    this.loadEvents();
    console.log('ionViewDidLoad EventscalenderPage');
  }

}
