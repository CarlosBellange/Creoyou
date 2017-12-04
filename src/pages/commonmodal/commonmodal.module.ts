import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonmodalPage } from './commonmodal';

@NgModule({
  declarations: [
    CommonmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(CommonmodalPage),
  ],
})
export class CommonmodalPageModule {}
