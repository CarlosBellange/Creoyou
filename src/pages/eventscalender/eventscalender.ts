import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventdetailsPage } from '../../pages/eventdetails/eventdetails';
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
  event_image: any;

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
  onEventSelected(ev) {
    var event = {
      event_image: ev.event_image,
      image: ev.image,
      name: ev.name,
      start_date_time: ev.startTime,
      end_date_time: ev.endTime,
      location: ev.location,
      description: ev.description,
      fname: ev.fname,
      lname: ev.lname,
      buisness_name: ev.buisness_name
    }

    this.navCtrl.push(EventdetailsPage, { 'eventdetails': event });
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
    //console.log(this.eventdetails.past);
    for (var i = 0; i < this.eventdetails.past.length; i++) {
      this.eventtitle = this.eventdetails.past[i].name;
      this.event_image = this.eventdetails.past[i].event_image;
      var image = this.eventdetails.past[i].image;
      var name = this.eventdetails.past[i].name;
      var fname = this.eventdetails.past[i].fname;
      var lname = this.eventdetails.past[i].lname;
      var buisness_name = this.eventdetails.past[i].buisness_name;
      var advertisement_text = this.eventdetails.past[i].advertisement_text;
      var description = this.eventdetails.past[i].description;
      var location = this.eventdetails.past[i].location
      startTime = new Date(this.eventdetails.past[i].start_date_time);
      endTime = new Date(this.eventdetails.past[i].end_date_time);
      events.push({
        description: description,
        location: location,
        advertisement_text: advertisement_text,
        buisness_name: buisness_name,
        fname: fname,
        lname: lname,
        name: name,
        image: image,
        event_image: this.event_image,
        title: this.eventtitle,
        startTime: startTime,
        endTime: endTime,
        allDay: false
      });
    }
    for (var j = 0; j < this.eventdetails.upcoming.length; j++) {
      this.eventtitle = this.eventdetails.upcoming[j].name;
      this.event_image = this.eventdetails.upcoming[j].event_image;
      var image = this.eventdetails.upcoming[j].image;
      var name = this.eventdetails.upcoming[j].name;
      var fname = this.eventdetails.upcoming[j].fname;
      var lname = this.eventdetails.upcoming[j].lname;
      var buisness_name = this.eventdetails.upcoming[j].buisness_name;
      var advertisement_text = this.eventdetails.upcoming[j].advertisement_text;
      var description = this.eventdetails.upcoming[j].description;
      var location = this.eventdetails.upcoming[j].location;
      startTime = new Date(this.eventdetails.upcoming[j].start_date_time);
      endTime = new Date(this.eventdetails.upcoming[j].end_date_time);
      events.push({
        description: description,
        location: location,
        advertisement_text: advertisement_text,
        buisness_name: buisness_name,
        fname: fname,
        lname: lname,
        name: name,
        image: image,
        event_image: this.event_image,
        title: this.eventtitle,
        startTime: startTime,
        endTime: endTime,
        allDay: false
      });
    }
    /*  console.log(events); */
    return events;
  }


  ionViewDidLoad() {

    this.loadEvents();
    // console.log('ionViewDidLoad EventscalenderPage');
  }

}
