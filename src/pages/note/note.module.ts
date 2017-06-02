import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Note } from './note';

@NgModule({
  declarations: [
    Note,
  ],
  imports: [
    IonicPageModule.forChild(Note),
  ],
  exports: [
    Note
  ]
})
export class NoteModule {}
