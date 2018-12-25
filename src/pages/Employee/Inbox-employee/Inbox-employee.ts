import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Platform , PopoverController } from 'ionic-angular';
import moment from 'moment';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
 


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { AngularFireAuth } from 'angularfire2/auth';
 
import { DatePipe } from '@angular/common';
 import { MyApp } from '../../../app/app.component';
import { TaskService } from '../../../providers/task.service';




/**
 * Generated class for the SearchCriteria page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-Inbox-employee',
  templateUrl: 'Inbox-Employee.html',
})
export class InboxEmployeepage {

  public today = moment().toISOString();



  public inboxList = [];
  public pleaseWait:string = '';
  currentDate = new Date();
  jstoday = '';
  public inboxType  ;
  public  counter = 1;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(public app:MyApp,
    public platform: Platform, 
     public navCtrl: NavController, 
    public navParams: NavParams,
    private loading: LoadingController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController , 
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController , 
    public db: AngularFireAuth,
    private datePipe: DatePipe , 
    public task:TaskService

  ) {
    platform.registerBackButtonAction(() => {
      platform.exitApp()
    });

 


    this.pleaseWait = "رجاء الانتظار ..."
    this.getNotfication();

      
    


  }

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 
  getNotfication(){

    let load = this.loading.create({
      content:  this.pleaseWait 
    
    
    })
    load.present()

    let employeeId = localStorage.getItem("userId");
    console.log(employeeId , 'sssss');
    
     
    this.task.getByEmployeeId(employeeId , data =>{

    
      

      this.inboxList = [];
      
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          let element = data.val()[key];
          element.$key = key;
           
          this.inboxList.push(element) 
          

          }

        }
 
        
        load.dismiss()
        console.log(this.inboxList , 'mmmmm');
        
      })

         
   
    }

    
   
 


openDetails(item){

     this.navCtrl.push('taskDetailspage',{
      task:item
  })
  
  } 
 
  
 

  

 
  


 


  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

 
 


  
  

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //   this.counter++ ; 
 
      
  //   this.companyService.getInbox( (this.counter * 10) , this.inboxType , data =>{

  //     console.log(data.val());
      
      
  //     if (data.val() == null) {
  //       infiniteScroll.complete();
  //     }
      

  //     this.inboxList = [];
      
  //     for (const key in data.val()) {
  //       if (data.val().hasOwnProperty(key)) {
  //         let element = data.val()[key];
  //         element.$key = key;

  //         this.inboxList.push(element)  

  //         }

  //       }
 
  //       console.log(this.inboxList);
        
  //       // infiniteScroll.complete();
  //     })

  //     infiniteScroll.complete();
  // }

}

