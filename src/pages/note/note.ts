import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Add } from '../add/add';

/**
 * Generated class for the Note page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class Note {
  private toDoList: FirebaseListObservable<any>;
  private itemText: String;
  private itemTextArea: String;
  @ViewChild('textArea') texArea;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public toastCtrl: ToastController) {
    this.toDoList = af.database.list('/todos');
    this.itemText = "";
    this.itemTextArea = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Note');
  }

  addNote(){
    if(this.itemText!=""){
      this.toDoList.push({"name": this.itemText, "description": this.itemTextArea, "task":""});
      this.navCtrl.pop();
      this.showToast('Note added successfully');
    }else{
      this.showToast('The note must have a title');
    }
    
  }

  showToast(msj) {
  let toast = this.toastCtrl.create({
    message: msj,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

eventHandler(keyCode){
  if(keyCode == 13){
    this.texArea.setFocus();
  }
}

}
