import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController, Platform } from 'ionic-angular';
import { DepartmentService } from '../../../providers/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the AddDepartmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-department',
  templateUrl: 'add-department.html',
})
export class AddDepartmentPage {

  myForm: FormGroup;
  name : string;
  information : string;
  public pleaseWait: string = 'من فضلك انتظر';



  constructor(public myapp: MyApp,

    private loading: LoadingController,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private viewCtrl: ViewController,
    private departmentService : DepartmentService , 
    platform:Platform
  ) {

      this.myForm = builder.group({
        'name':['', [Validators.required , Validators.maxLength(45)]],
        'information': ['', [Validators.required , Validators.maxLength(45)]],
        
      });


      platform.registerBackButtonAction(() => {
    this.myapp.openPage('InboxAdminpage')
          });
    

  }

  addDepartment(){

    let load = this.loading.create({
      content:  this.pleaseWait 
      });

      load.present();

    let department = {
      'name':'',
      'information':''
    }
    department.name = this.myForm.get('name').value;
    department.information = this.myForm.get('information').value;
 
    this.departmentService.add(department).then(
      data => {

        this.presentToast('تم');
        this.myForm.reset();
        load.dismiss();
      }, error => {
        console.log(error);
        
        this.presentToast('خطأ فى اضافه القسم الجديد');
        load.dismiss();
      });
    

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDepartmentPage');
  }
  back(){
    this.myapp.openPage('InboxAdminpage')
  }

}
