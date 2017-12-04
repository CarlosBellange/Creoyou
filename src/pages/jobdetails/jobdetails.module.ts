import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobdetailsPage } from './jobdetails';

@NgModule({
  declarations: [
    JobdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(JobdetailsPage),
  ],
})
export class JobdetailsPageModule {}
