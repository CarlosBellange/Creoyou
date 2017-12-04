import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaguserPage } from './taguser';

@NgModule({
  declarations: [
    TaguserPage,
  ],
  imports: [
    IonicPageModule.forChild(TaguserPage),
  ],
})
export class TaguserPageModule {}
