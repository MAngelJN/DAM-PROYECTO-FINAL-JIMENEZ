import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the Add page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class Add {
  public itemText: String;
  public itemChecked: boolean;
  public itemDate: String;
  private currentDate: String;
  private note: any;
  private id: String;

  /* public toDoItemsText: Array<String>;
   public toDoItemsChecked: Array<boolean>
   public toDoItemsDate: Array<String>;*/
  private toDoList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire, private toastCtrl: ToastController) {
    this.note = navParams.get('note');
    this.toDoList = af.database.list('/todos/'+this.note.$key+'/task');
    this.itemDate = "";
    this.itemText = "";
    

    /*this.toDoItemsText = JSON.parse(localStorage.getItem("itemsText"));
    this.toDoItemsChecked = JSON.parse(localStorage.getItem("itemsChecked"));
    this.toDoItemsDate = JSON.parse(localStorage.getItem("itemsDate"));

    if(!this.toDoItemsText){
      this.toDoItemsText = [];
    }
    if(!this.toDoItemsChecked){
      this.toDoItemsChecked = [];
    }
    if(!this.toDoItemsDate){
      this.toDoItemsDate = [];
    }  
    this.itemText ="";
    this.itemChecked=false;
    this.itemDate=null;*/
  }

  saveTask() {
    if (this.itemText != "") {
      /*this.toDoItemsText.push(this.itemText);
      this.toDoItemsChecked.push(this.itemChecked)*/

      if (this.itemDate == "") {
        this.itemDate = "No date";
      }
      //this.toDoItemsDate.push(this.itemDate);

      //this.toDoList.push({text: this.itemText, date: this.itemDate, checked:false});
      this.toDoList.push({
        text:this.itemText,
        date:this.itemDate,
        checked: false
      });
      /*update(this.note.$key, {
        task: {
          "ABC123": {
            text: "cosa",
            date: "No date",
            checked: false
          }
        }
      });
      /*localStorage.setItem("itemsText",JSON.stringify(this.toDoItemsText));
      localStorage.setItem("itemsChecked",JSON.stringify(this.toDoItemsChecked));
      localStorage.setItem("itemsDate",JSON.stringify(this.toDoItemsDate));*/
      this.itemText = "";
      this.itemDate = null;
      this.presentToast('Task added successfully');
    }else{
      this.presentToast('Task must have text');
    }
  }

  presentToast(msj) {
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

  ionViewDidEnter() {
    this.currentDate = new Date().toISOString();
  }

  eventHandler(keyCode) {
    if (keyCode == 13) {
      //Pasar el focus al datetime
    }
  }

  generateId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

}
