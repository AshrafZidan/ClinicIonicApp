import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Platform , PopoverController } from 'ionic-angular';
import moment from 'moment';
import { MyApp } from '../../../app/app.component';
import { EmployeeService } from '../../../providers/employee.service';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 





/**
 * Generated class for the SearchCriteria page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html',
})
export class employeespage {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////
 


  public EmployeeList = [];
  public pleaseWait:string = '';
  query ;

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
    public service : EmployeeService
  ) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('InboxAdminpage')
    });


    this.pleaseWait = " رجاء الانتظار"

    this.getAllEmploees()
 
  }

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 
  getAllEmploees(){

    let load = this.loading.create({
      content:  this.pleaseWait 
    
    
    })
    load.present()

   
  this.service.getAll( data => {

       
      this.EmployeeList = []
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          let element = data.val()[key];
          element.$key = key;
          this.EmployeeList.push(element)  
        }
      }

      console.log(this.EmployeeList);
      
      load.dismiss()
     
    }), error => {
      console.log(error);
      
      this.app.openPage('LoginPage')
      load.dismiss();
    }

  }

  openprofile(){
    this.app.openPage("Profile");
  }



  DeleteItem(item){


      let alert = this.alertCtrl.create({
        title: 'لن تتمكن من استرجاع الموظف المحذوف !! ',
        buttons: [{
          text: ' موافق',
          handler: () => {
         
             
              
                 this.service.remove(item.$key).then(data => {
                  this.presentToast("تم الحذف")
                  
                }).catch(err => {
        
                  this.presentToast("خطأ فى الحذف  ")
                })
      
              
      
     

          
  
          }
        } , {


          text: ' الغاء',
          handler: () => {
          
          //nothing
          }


        }]
      });
      alert.present();
    


    


    
  }



  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  EditCompany(company){
    this.navCtrl.push('EditCompanyPage',{item:company})
  }

 
  back(){
    
    this.app.openPage('InboxAdminpage')
 

  }


  
 

}

