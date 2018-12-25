import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Platform , PopoverController } from 'ionic-angular';
import moment from 'moment';
import { MyApp } from '../../../app/app.component';
import { DepartmentService } from '../../../providers/department.service';
 

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
  selector: 'page-department',
  templateUrl: 'department.html',
})
export class deparmentspage {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////
  public today = moment().toISOString();



  public departmentList = [];
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
    private departmentService : DepartmentService
  ) {
  

    platform.registerBackButtonAction(() => {
      this.navCtrl.pop()
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

    
    this.departmentService.getAll( data => {

       
      this.departmentList = []
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          let element = data.val()[key];
          element.$key = key;
          this.departmentList.push(element)  
        }
      }

      console.log(this.departmentList);
      
      load.dismiss()
     
    }), error => {
      this.app.openPage('LoginPage')
      load.dismiss();
    }
  

    
    
  }    




  // DeleteItem(item){


  //     let alert = this.alertCtrl.create({
  //       title: 'You will Delete This Company !! ',
  //       buttons: [{
  //         text: ' Done',
  //         handler: () => {
  //           this.CompanyService.getCustomerByCompanyId(item.$key).then(data => {
  //             console.log(data);
              
  //             if (data.val() == null) {
                
  //               this.CompanyService.remove(item.$key).then(data => {
  //                 this.presentToast("Done Deleted ")
                  
  //               }).catch(err => {
        
  //                 this.presentToast("Error While  Deleting ")
  //               })
      
  //             } else {
                
  //               this.presentToast("You Can't Delete this Company")
             
  //             }
            
      
  //         })

          
  
  //         }
  //       } , {


  //         text: ' Cancel',
  //         handler: () => {
          
  //         //nothing
  //         }


  //       }]
  //     });
  //     alert.present();
    


    


    
  // }



  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  // EditCompany(company){
  //   this.navCtrl.push('EditCompanyPage',{item:company})
  // }

 
  back(){
    
    this.app.openPage("InboxAdminpage");
  }


  // openCompanyProfile(item){

  //   this.navCtrl.push('companyProfilepage',{item:item})

  // }
 

}

