import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/**
 * Generated class for the Edit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class Edit {

  private task: any;
  private toDoList: FirebaseListObservable<any>;
  private noteKey: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire, public toastCtrl: ToastController) {
    this.task = navParams.get('task');
    this.noteKey = navParams.get('note');
    this.toDoList = af.database.list('/todos/'+this.noteKey+'/task');
  }

  ionViewDidEnter(){
    
  }

  save(){
    if(this.task.text != ""){
      this.toDoList.update(this.task.$key,{text: this.task.text, date: this.task.date});
      this.showToast('Task edited successfully');
      this.navCtrl.pop();
    }else{
      this.showToast('Task must have text');
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

}
