import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayStagePage } from './display-stage';

@NgModule({
  declarations: [
    DisplayStagePage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayStagePage),
  ],
})
export class DisplayStagePageModule {}
