import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Platform , PopoverController } from 'ionic-angular';
import moment from 'moment';
import { MyApp } from '../../../app/app.component';
import { VacationTypeService } from '../../../providers/vacationType.service';


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
  selector: 'page-vacations',
  templateUrl: 'vacations.html',
})
export class Vacationspage {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////
  public today = moment().toISOString();



  public vacationsList = [];
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
    private alertCtrl: AlertController,
    private vacationsTypeService : VacationTypeService
  ) {
    platform.registerBackButtonAction(() => {
      this.app.openPage('InboxAdminpage')
    });


    this.pleaseWait = "من فضلك انتظر"


    this.getAllDepartments()

  }

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 
  getAllDepartments(){

    let load = this.loading.create({
      content:  this.pleaseWait 
    
    
    })
    load.present()

    
    this.vacationsTypeService.getAll( data => {

       
      this.vacationsList = []
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          let element = data.val()[key];
          element.$key = key;
          this.vacationsList.push(element)  
        }
      }

      console.log(this.vacationsList);
      
      load.dismiss()
     
    }), error => {
      this.app.openPage('LoginPage')
      load.dismiss();
    }
  

    
    
  }    




  DeleteItem(item){


      let alert = this.alertCtrl.create({
        title: 'سوف تقوم بمسح الاجازة!! ',
        buttons: [{
          text: ' موافق',
          handler: () => {
            
                
                this.vacationsTypeService.remove(item.$key).then(data => {
                  this.presentToast("تم")
                  
                }).catch(err => {
        
                  this.presentToast("خطأ اثناء المسح")
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


  EditVacation(vacation){
    this.navCtrl.push('EditVacationPage',{item:vacation})
  }

 
  back(){
    this.app.openPage('InboxAdminpage')
  }


}

