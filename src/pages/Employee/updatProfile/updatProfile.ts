import { EmployeeService } from './../../../providers/employee.service';
import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../../app/app.component';
import { VacationTypeService } from '../../../providers/vacationType.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 
/**
 * Generated class for the EditCompanyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatProfile',
  templateUrl: 'updatProfile.html',
})
export class updatProfilePage {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////
  myForm: FormGroup;
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public employee;
 
  public EditableId;
  public pleaseWait:string=null;
  userMail;

  constructor( platform: Platform  , public v:MyApp ,public builder: FormBuilder,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,
    private loading: LoadingController, private alertCtrl: AlertController,private viewCtrl: ViewController,
    public auth:AngularFireAuth,
  public app:MyApp ,    public translate: TranslateService,  private service : EmployeeService  

  ) {

      
    ///////////////////////////////////////////////// Return Parameter //////////////////////////////////////////////

    this.employee = this.navParams.get("emp");    
  
      console.log(this.employee);
 

      ///////////////////////////////////////////////// validate form //////////////////////////////////////////////

      this.myForm = builder.group({
        'name':['', [Validators.required , Validators.maxLength(45)]],
        'civilID': ['', [Validators.required]],
        
        'address':['', [Validators.required , Validators.maxLength(45)]],
        'email': ['', [Validators.required , Validators.email]],
         'oldpassword':['', [Validators.required ]],
         'newpassword':['', [Validators.required , Validators.minLength(6)]],
      });



        
          this.getUserEmail()
 


  platform.registerBackButtonAction(() => {
        this.navCtrl.pop();

    }); 

    this.translate.get(['pleaseWait']).subscribe((res)=> {
      this.pleaseWait=res.pleaseWait;
        });


  }

  


  back(){
    this.navCtrl.pop();
  }

     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////


  getUserEmail(){

    let load = this.loading.create({
      content:  "رجاء الانتظار" 
      });

      load.present();

    this.userMail =  this.auth.auth.currentUser.email; 
      
      load.dismiss()
  }

  update() {
    
    let load = this.loading.create({
      content:  "رجاء الانتظار" 
      });

      load.present();


    this.EditableId =  this.employee.$key;
   
    let EmployeeObj = {
      name:'',
      civilID:'',
      email:'',
      address:'',
      userId:'',
      deptId:'',
      deptName:'',
    }

    var user = this.auth.auth.currentUser;


    let oldpassword =  localStorage.getItem('password');
    
    if (oldpassword != this.myForm.get('oldpassword').value) {
      this.presentToast('كلمة المرور غير صحيحة  ');
      load.dismiss()

    } 

    else{
      
    
      EmployeeObj.name = this.myForm.get('name').value;
      EmployeeObj.civilID = this.myForm.get('civilID').value;
      EmployeeObj.email = this.myForm.get('email').value;
      EmployeeObj.address = this.myForm.get('address').value;
      EmployeeObj.email = this.myForm.get('email').value;

      EmployeeObj.userId = this.employee.userId;
      console.log(EmployeeObj.userId,"s");
      
      EmployeeObj.deptId = this.employee.deptId;
      EmployeeObj.deptName = this.employee.deptName;


    user.updateEmail(this.myForm.get('email').value).then(data => {

      user.updatePassword(this.myForm.get('newpassword').value).then(data => {

          
    
        this.service.update(this.EditableId , EmployeeObj ).then(data => {
         
          this.confirmAlert()
          
         load.dismiss()
        
  
      }).catch(err => {
        this.presentToast('خطأ اثناء التعديل');
        this.navCtrl.pop();
      load.dismiss()

      })

      }).catch(err => {
        console.log(err);
        
        this.presentToast('خطأ اثناء التعديل كلمه المرور');
        this.navCtrl.pop();
        load.dismiss()
  
      })
    
    }).catch(err=> {
      console.log(err);
      
      this.presentToast(' خطأ اثناء التعديل الايميل');
      load.dismiss()
      this.navCtrl.pop();

    });

  

    
   
    }
           
      
     }


  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'تم التعديل',
      buttons: [{
        text: ' Done',
        handler: () => {
          this.navCtrl.pop();

        }
      }]
    });
    alert.present();
  }





  cancelEdit() {
    this.navCtrl.pop();

  }
  
 




 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// General methods ///////////////////////////////////////////

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}



  hasError(field: string, error: string) {
    const ctrl = this.myForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


}
