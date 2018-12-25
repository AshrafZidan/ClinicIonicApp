import { Component } from '@angular/core';
import { NavController, MenuController, IonicPage, LoadingController, ViewController, ToastController, App } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { Device } from '@ionic-native/device'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import { MyApp } from '../../app/app.component';
import { AuthentcationServices } from '../../providers/authentcation.services';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmployeeService } from '../../providers/employee.service';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////





@IonicPage()
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public phone: string = null;
  public password: string = null;
  public isCorrect: boolean = true;
  public language: string;
  public browserType: string = null;
  public osType: string = null;

  myForm: FormGroup;

  ///////////////////////////////////////////////////////////// translate key //////////////////////////////////
  public pleaseWait: string = null;



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(
    public app: MyApp,
    public menuCtrl: MenuController,
    public platform: Platform,
    public builder: FormBuilder,
    public loading: LoadingController,
    public authServices: AuthentcationServices,
 
    public navCtrl: NavController,
    public device: Device,
    public viewCtrl: ViewController,
    public translate: TranslateService,
    public toastCtrl: ToastController,
 
  ) {



    //////////////////////////////////////////////////// operation ///////////////////////////////////////////////////
    this.browserType = this.device.manufacturer + "   /  " + this.device.model;
    this.osType = this.device.platform + "  -  " + this.device.version;



    ///////////////////////////////////////////////// validate form //////////////////////////////////////////////
    this.myForm = builder.group({
      'phone': ['', [Validators.required, Validators.minLength(11)]],
      'password': [Validators.required]
    });
    ////////////////////////////////////////////////////  translation operation ////////////////////////////////////////
    this.language = app.translate.store.currentLang;
    // this.language = Language.newlang;
    this.language = 'ar';
    if (this.language == "ar") {
      app.sideMenu = "right";
      app.textDir = "rtl";
    } else {
      app.sideMenu = "left";
      app.textDir = "ltr";
    }
    //////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////    
    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });



    localStorage.setItem('lang','ar');

    this.app.menu.swipeEnable(false)

    // let userType = localStorage.getItem('userType');
    // if (userType != null) {
    //   if (userType == "Admin") {
    //     this.openPage('InboxAdminpage')

    //   } else if (userType == 'Employee') {
    //     this.openPage("InboxEmployeepage")

    //   }
    // };



  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
  
  login() {
    
    
    this.app.openPage('Mainpage')
    // let loading = this.loading.create({
    //   content: "رجاء الانتظار"
    // });

    // loading.present();

    // this.authServices.userLogin(this.myForm.get('phone').value, this.myForm.get('password').value  , this.browserType , this.osType ,this.language ) , data=> {

    // },err => {

    //   loading.dismiss()

    //   this.presentToast('خطأ فى الموبايل او كلمة المرور');

    // };
  
 
          






  }




  /////////////////////////////////////////////////////////// open any page you want /////////////////////////////////
  openPage(namePage) {
    this.navCtrl.setRoot(namePage);
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
