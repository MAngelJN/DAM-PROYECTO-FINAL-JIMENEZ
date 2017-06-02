import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { Add } from '../pages/add/add';
import { Edit } from '../pages/edit/edit';
import { Note } from '../pages/note/note';
import { Editn } from '../pages/editn/editn';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyALYPsD5WMGzwkbwGxCZX9jX42_1xLy0SU",
    authDomain: "do-ti-just-do-it.firebaseapp.com",
    databaseURL: "https://do-ti-just-do-it.firebaseio.com",
    projectId: "do-ti-just-do-it",
    storageBucket: "do-ti-just-do-it.appspot.com",
    messagingSenderId: "628331994163"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Add,
    Edit,
    Note,
    Editn
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Add,
    Edit,
    Note,
    Editn
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
