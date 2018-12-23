import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,MenuController ,ViewController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { MyApp }  from '../../app/app.component';
import { sessionData } from './../shared/session-data';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
import { AuthentcationServices } from './../../providers/authentcation-services';



/**
 * Generated class for the Verifypage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'verify-page',
  templateUrl: 'verifypage.html',
})
export class Verifypage {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////
  verifyForm: FormGroup;
  

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public language:string;  
  public verifyCode: string = null;
  public isCorrect: boolean = true;
  public browserType: string = null;
  public osType: string = null;
  public resendBtnClicked: boolean = false;
  public subscription;
  
  ///////////////////////////////////////////////////////////// translate key //////////////////////////////////
  public pleaseWait: string = null;
  public sendCode: string = null;
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(
   public myapp:MyApp,
   public menuCtrl: MenuController ,   
   private builder: FormBuilder, 
   public translate: TranslateService,   
   private loading: LoadingController, 
   public authServices: AuthentcationServices,
   public navCtrl: NavController, 
   public navParams: NavParams,
   public toastCtrl: ToastController,
   private device: Device
  ) {

//////////////////////////////////////////////////// operation ///////////////////////////////////////////////////
this.browserType = this.device.manufacturer + "   /  " + this.device.model;
this.osType = this.device.platform + "  -  " + this.device.version;

this.subscription = Observable.interval(300000).subscribe(x => {  
  this.resendBtnClicked = false;
});

  ///////////////////////////////////////////////// validate form //////////////////////////////////////////////
    this.verifyForm = builder.group({
      'verifycode': ['', [Validators.required, Validators.maxLength(20)]]
    });


     //////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////    
     this.translate.get(['pleaseWait', 'sucessfulCode', 'sendCode']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
      this.sendCode=res.sendCode;
    });
    this.language=myapp.translate.store.currentLang;
  }

  ionViewDidLoad() {
    sessionData.saveDataInLocalStorage();
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();

  }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 
  verify() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.authServices.userVerifyCode(this.verifyCode, sessionData.userPhone, sessionData.userPassword, sessionData.userId, this.browserType, this.osType,this.language).subscribe(      
      data => {
        loading.dismiss();
        this.navCtrl.setRoot("Mainpage") ;
        this.menuCtrl.enable(true, 'menuId');
        this.isCorrect = true;
        
      }, error => {
        loading.dismiss();
        this.isCorrect = false;
        
      });
  }

  resendCode() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.authServices.ResendCode(sessionData.userId).subscribe(
      data => {
        loading.dismiss();
        this.resendBtnClicked = true;
        //codeSentMsg
        this.presentToast(this.sendCode);

      },
      error => {
        loading.dismiss();
        if (error.json().errorCode == "4004") {
        }
        sessionData.checkPermission(this.navCtrl, error.json().errorCode);

      });
  }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// General methods ///////////////////////////////////////////
 
  hasError(field: string, error: string) {
    const ctrl = this.verifyForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
