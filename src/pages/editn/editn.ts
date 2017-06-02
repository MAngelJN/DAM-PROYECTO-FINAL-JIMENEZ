import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Add } from '../add/add';
import { Edit } from '../edit/edit';

/**
 * Generated class for the Editn page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editn',
  templateUrl: 'editn.html',
})
export class Editn {
  private note: any;
  private toDoList: FirebaseListObservable<any>;
  private tasks: FirebaseListObservable<any>;
  private task: any;
  @ViewChild('textArea') textArea;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public af: AngularFire) {
    this.note = navParams.get('note');
    this.toDoList = af.database.list('/todos');
    this.tasks = af.database.list('/todos/'+this.note.$key+'/task');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Editn');
  }

  eventHandler(keyCode) {
    if (keyCode == 13) {
      this.textArea.setFocus();
    }
  }

  saveNote() {
    if (this.note.name != "") {
      this.toDoList.update(this.note.$key, { "name": this.note.name, "description": this.note.description });
      this.showToast('Note edited successfully');
      this.navCtrl.pop();
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

  addTask(){
    this.navCtrl.push(Add,{note: this.note});
  }

  done(idTask, checked){
    this.tasks.update(idTask,{checked: !checked});
    this.tasks.forEach(task => {
        if (task.$key == idTask) {
          this.task = task;
          this.task.checked = !checked;
        }
    });
  }

  deleteTask(idTask){
    this.tasks.remove(idTask);
    this.showToast('Task removed successfully');
  }

  editTask(task){
    this.navCtrl.push(Edit,{note: this.note.$key, task: task});
  }

}
