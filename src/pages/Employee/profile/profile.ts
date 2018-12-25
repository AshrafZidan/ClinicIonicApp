import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Platform , PopoverController } from 'ionic-angular';
import moment from 'moment';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
 
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../../app/app.component';
import { EmployeeService } from '../../../providers/employee.service';

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
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class profilepage {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////
 


  public userData 
  public pleaseWait:string = '';
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(public app:MyApp,
    public platform: Platform, 
     public navCtrl: NavController, 
    public navParams: NavParams,
    private loading: LoadingController, 
    public modalCtrl: ModalController,
    public db: AngularFireAuth,

    public toastCtrl: ToastController , 
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController , 
    public employeeService:EmployeeService
 
  ) {
 
    platform.registerBackButtonAction(() => {
      this.app.openPage('InboxEmployeepage')
            });
     
    this.pleaseWait = "رجاء الانتظار.."
 
    this.userData = {
      name:'',
      $key:'',
      address:'',
      deptName:'',
      email:'',
      civilID:''
    
    } ;
    this.getUSerData()

      

  }

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////



getUSerData(){
  let load = this.loading.create({
    content:  this.pleaseWait 

  })
  load.present()

  let employeeId = localStorage.getItem('userId');
  this.employeeService.getById(employeeId, data => {
    this.userData.userId  = data.val().userId;
    this.userData.name  = data.val().name;
    this.userData.email  = data.val().email;
    this.userData.civilID  = data.val().civilID;
    this.userData.deptId  = data.val().deptId;
    this.userData.address  = data.val().address;
    this.userData.deptName  = data.val().deptName;


    this.userData.$key = data.key;

    console.log(this.userData, 'sssss');

    load.dismiss();
  })

    
      

     
 
         
   
  }



 openUpdatePage(){
  this.navCtrl.push('updatProfilePage',
  {emp:this.userData}
)
 }



  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }




  back(){
    this.app.openPage('InboxEmployeepage')
  }
  
}

