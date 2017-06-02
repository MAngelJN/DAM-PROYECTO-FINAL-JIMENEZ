import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Add } from '../add/add';
import { Edit } from '../edit/edit';
import { Note } from '../note/note';
import { Editn } from '../editn/editn';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
})
export class HomePage {

  public toDoItemsText: Array<String>;
  public toDoItemsChecked: Array<boolean>;
  public toDoItemsDate: Array<String>;
  public toDoList: FirebaseListObservable<any>;
  
  private currentDate: Array<String>;
  private date: any;

  constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController) {
    this.toDoList = af.database.list('/todos');
    //this.currentDate = new Date().toISOString().split("T")[0].split("-");
  }
  
  add(){
    this.navCtrl.push(Note);
  }

  
  

  editNote(note){
    this.navCtrl.push(Editn,{note: note});
  }

  delete(idTask){
    this.toDoList.remove(idTask);
    /*this.toDoItemsText.splice(index,1);
    this.toDoItemsChecked.splice(index,1);
    this.toDoItemsDate.splice(index,1);

    localStorage.setItem("itemsText",JSON.stringify(this.toDoItemsText));
    localStorage.setItem("itemsChecked",JSON.stringify(this.toDoItemsChecked));
    localStorage.setItem("itemsDate",JSON.stringify(this.toDoItemsDate));*/
  }
  checkDate(){
    this.toDoList.forEach(task =>{
      if(task!=""){
        //this.date = JSON.stringify(task).split('"date":"')[1].split('","text')[0].split("-");
        /*console.log(this.date[0]+"=?"+this.currentDate[0]);
        if(this.date[0]==this.currentDate[0]){
          console.log("same year");
          if(this.date[1]==this.currentDate[1]){
            console.log("same mounth");
            if(this.date[2]==this.currentDate[2]){
              this.presentToast("Today is the limit date for some tasks");
            }
          }
        }*/
        console.log(this.date+"<="+this.currentDate);
        if(this.date[0]<=this.currentDate[0]){
          if(this.date[1]<=this.currentDate[1]){
            if(this.date[2]<=this.currentDate[2]){
              this.presentToast("Have passed some tasks' date");
              
            }
          }
        }
      }
      //this.date = JSON.stringify(task).split('"date":"')[1].split('","text')[0];
    });
  }

  ionViewDidEnter(){
    //this.checkDate();
  }

  presentToast(msj: String) {
  let toast = this.toastCtrl.create({
    message: msj+"",
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
  

  


