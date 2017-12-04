import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumviewPage } from './albumview';

@NgModule({
  declarations: [
    AlbumviewPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumviewPage),
  ],
})
export class AlbumviewPageModule {}
