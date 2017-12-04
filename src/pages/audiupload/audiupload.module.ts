import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudiuploadPage } from './audiupload';

@NgModule({
  declarations: [
    AudiuploadPage,
  ],
  imports: [
    IonicPageModule.forChild(AudiuploadPage),
  ],
})
export class AudiuploadPageModule {}
