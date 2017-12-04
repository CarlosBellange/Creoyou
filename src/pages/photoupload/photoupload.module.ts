import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotouploadPage } from './photoupload';

@NgModule({
  declarations: [
    PhotouploadPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotouploadPage),
  ],
})
export class PhotouploadPageModule {}
