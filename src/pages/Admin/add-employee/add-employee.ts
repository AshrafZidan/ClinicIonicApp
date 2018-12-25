import { EmployeeService } from './../../../providers/employee.service';
import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController, Platform } from 'ionic-angular';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { DepartmentService } from '../../../providers/department.service';

 /**
 * Generated class for the AddDepartmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class addemployeePage {

  myForm: FormGroup;
  name : string;
  information : string;
  public pleaseWait: string = 'من فضلك انتظر';
  public language;

  public departmentList = [];
  constructor(public myapp: MyApp,

    private loading: LoadingController,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private viewCtrl: ViewController,
    public auth:AngularFireAuth,
    public platform:Platform , 
    private service : EmployeeService , 
  public departmentService: DepartmentService) {

      this.myForm = builder.group({
        'name':['', [Validators.required , Validators.maxLength(45)]],
        'civilID': ['', [Validators.required]],
        'dept': ['', [Validators.required]],
        
        'address':['', [Validators.required , Validators.maxLength(45)]],
        'email': ['', [Validators.required , Validators.email]],
         'password':['', [Validators.required , Validators.minLength(6)]],
        
      });


      platform.registerBackButtonAction(() => {
        this.myapp.openPage('InboxAdminpage')
      });

      this.language = localStorage.getItem('lang')
      this.getAlldepatrment()
  }


  getAlldepatrment(){
    let load = this.loading.create({
      content:  this.pleaseWait 
      });

      load.present();

    
  
      
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
        this.myapp.openPage('LoginPage')
        load.dismiss();
      }
    
  
      
      
  }
  addEmployee(){

    let load = this.loading.create({
      content:  this.pleaseWait 
      });

      load.present();

      let Employee = {
        name:'',
        civilID:'',
        email:'',
        address:'',
        userId:'',
        deptId:'',
        deptName:'',
      }


      Employee.name = this.myForm.get('name').value;
      Employee.civilID = this.myForm.get('civilID').value;
      Employee.email = this.myForm.get('email').value;
      Employee.address = this.myForm.get('address').value;


      let EmployeeUser = this.auth.auth.createUserWithEmailAndPassword(this.myForm.get('email').value , this.myForm.get('password').value).then(user => {

        user.user.updateProfile({
          displayName: "Employee",
          photoURL: null
        });
        this.auth.auth.signInWithEmailAndPassword(localStorage.getItem('userName'),localStorage.getItem('password'));


        Employee.userId = user.user.uid;
        Employee.deptId =this.departmentList[this.myForm.get('dept').value].$key;
        Employee.deptName =this.departmentList[this.myForm.get('dept').value].name;

        console.log(Employee );
        
        this.service.add(Employee).then(
          data => {
    
            this.presentToast(' تم إضافة الموظف' );
            this.myForm.reset();
            load.dismiss();
          }, error => {
             
            this.presentToast('خطأ فى اضافه موظف جديد');
            load.dismiss();
          });
    
        


      }).catch(err => {
        console.log(err);
        
        this.presentToast('خطأ فى اضافه موظف جديد');
        load.dismiss();
      })
  
          
          
          
       
         
  
            
 
  

  }

  



  hasError(field: string, error: string) {
    const ctrl = this.myForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
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
  this.myapp.openPage('InboxAdminpage')
}
}
