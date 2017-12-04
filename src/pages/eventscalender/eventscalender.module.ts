import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventscalenderPage } from './eventscalender';

@NgModule({
  declarations: [
    EventscalenderPage,
  ],
  imports: [
    IonicPageModule.forChild(EventscalenderPage),
  ],
})
export class EventscalenderPageModule {}
