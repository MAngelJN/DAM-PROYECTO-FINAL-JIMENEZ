import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Editn } from './editn';

@NgModule({
  declarations: [
    Editn,
  ],
  imports: [
    IonicPageModule.forChild(Editn),
  ],
  exports: [
    Editn
  ]
})
export class EditnModule {}
