import { Component } from '@angular/core';
import { NavController,MenuController,IonicPage, LoadingController, ViewController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { Device } from '@ionic-native/device'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import { MyApp }  from '../../app/app.component';
import { sessionData } from '../shared/session-data'
import { setting } from '../../app/setting'
import { Language }  from '../../pages/language/language';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
import { AuthentcationServices } from './../../providers/authentcation-services';



@IonicPage()
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public email: string = null;
  public password: string = null;
  public isCorrect: boolean = true;
  public language:string;
  public browserType: string = null;
  public osType: string = null;

  myForm: FormGroup;

///////////////////////////////////////////////////////////// translate key //////////////////////////////////
public pleaseWait:string=null;

  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(
    public app:MyApp ,
    public menuCtrl: MenuController ,
    private platform: Platform ,
    private builder: FormBuilder,
    private loading: LoadingController, 
    public authServices:AuthentcationServices,
    public navCtrl: NavController,
    private device: Device,
    private viewCtrl: ViewController,
    public translate: TranslateService,
    public toastCtrl: ToastController
  ) {

//////////////////////////////////////////////////// operation ///////////////////////////////////////////////////
this.browserType = this.device.manufacturer + "   /  " + this.device.model;
this.osType = this.device.platform + "  -  " + this.device.version;


    ///////////////////////////////////////////////// validate form //////////////////////////////////////////////
    this.myForm = builder.group({
      'email': ['', [Validators.required,Validators.email]],
      'password': [Validators.required]
    });
////////////////////////////////////////////////////  translation operation ////////////////////////////////////////
    this.language=app.translate.store.currentLang;
    this.language=Language.newlang;
    if( this.language=="ar"){
      app.sideMenu="right";
      app.textDir="rtl";
    }else{
      app.sideMenu="left";
      app.textDir="ltr";
    }
//////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////    
    this.translate.get(['pleaseWait']).subscribe((res)=> {
      this.pleaseWait=res.pleaseWait;
        });


  
  }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 
//   login() {
//     //////////////////////////////// in side /////////////////////////////////////////////////
 
// /////////////////////////////////////////////////////////////////////////////////////////////
//      let loading = this.loading.create({
//        content: this.pleaseWait
//      });
//      loading.present();
//      this.authServices.userLogin(this.email, this.password, this.browserType, this.osType,this.language).subscribe(
//       data => {
//         console.log(data);
//         sessionData.saveDataInsession(data);
//         sessionData.saveDataInLocalStorage();

//         if(data.userDetails.validMobile==false){
//           sessionData.saveDataInLoginToVerifyCode(this.password);          
//           this.navCtrl.push("Verifypage");
//         }else{
//           this.menuCtrl.enable(true, 'menuId');
//           this.app.openPage('Mainpage');
//         }
          
//           this.isCorrect = true;



//           loading.dismiss();
//          }, error => {
//          this.isCorrect = false;
//          loading.dismiss();
//        }
//      );
//   }



login() {
       let loading = this.loading.create({
       content: this.pleaseWait
     });
     loading.present();

    //  this.authServices.LoginFirebase(this.email, this.password).then(function (data) {

    //           console.log(data);
    //           sessionData.saveDataInsession(data);
    //           sessionData.saveDataInLocalStorage();
       
    //  }).catch(err =>{
    //   this.presentToast(err);
    //  });
      




}
  
  /////////////////////////////////////////////////////////// open any page you want /////////////////////////////////
  openPage(namePage){
    this.navCtrl.push(namePage);
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
