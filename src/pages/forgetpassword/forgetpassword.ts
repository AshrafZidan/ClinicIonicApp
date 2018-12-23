import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import { MyApp } from '../../app/app.component';
import { sessionData } from '../shared/session-data'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers //////////////////////////////////////////////////

import { AuthentcationServices } from './../../providers/authentcation-services';





/**
 * Generated class for the Forgetpassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'forgetpassword-page',
  templateUrl: 'forgetpassword.html',
})
export class Forgetpassword {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////

  forgetPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public userPhone: string = null;
  public verifyCode: string = null;
  public userPassword: string = null;
  public confirmPassword: string = null;
  public userphoneNotCorrect: boolean = false;
  public forgetpassBtnClicked: boolean = false;
  public codeError: boolean = false;
  public resendBtnClicked: boolean = false;
  public userId: number;
  public language: string;
  public subscription;
  
  ///////////////////////////////////////////////////////////// translate key //////////////////////////////////
  public pleaseWait: string = null;
  public sucessfulCode: string = null;
  public sendCode: string = null;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(
    public myapp: MyApp,
    public translate: TranslateService,
    private loading: LoadingController,
    private builder: FormBuilder,
    public authServices: AuthentcationServices,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController
  ) {

//////////////////////////////////////////////////// operation ////////////////////////////////////////////////
    if(sessionData.passwordNeedChange=="true"){
      this.forgetpassBtnClicked = true;
    }

    this.subscription = Observable.interval(300000).subscribe(x => {
      this.resendBtnClicked = false;
    });

    ////////////////////////////////////////////////// form validation ////////////////////////////////////////////////
    this.forgetPasswordForm = builder.group({
      'userphone': ['', [Validators.required, Validators.pattern('^01[0-2]{1}[0-9]{8}$'), Validators.minLength(11)]],
    });

    this.resetPasswordForm = builder.group({
      'verifycode': ['', [Validators.required, Validators.maxLength(20)]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]  //, Validators.pattern('^.*(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$')
      , 'confirmPassword': ['', [Validators.required]]
    });


    //////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////    
    this.translate.get(['pleaseWait', 'sucessfulCode', 'sendCode']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
      this.sucessfulCode = res.sucessfulCode;
      this.sendCode = res.sendCode;
    });

    this.language = myapp.translate.store.currentLang;

  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////


  requestResetPassword() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.authServices.requestForgetPassword(this.userPhone).subscribe(
      data => {
        loading.dismiss();
        this.forgetpassBtnClicked = true;
        this.userId = data.userId;
        sessionData.saveDataInForgetPassToChangePass(data.userId,this.userPhone,"true");
        this.presentToast(this.sendCode);
      },
      error => {
        loading.dismiss();
        if (error.json().errorCode == "4004") {
          this.userphoneNotCorrect = true;
        }
      });

  }


  requestForgetPassword() {
    let loading = this.loading.create({
      content: this.pleaseWait
    });
    loading.present();
    this.authServices.forgetPassword(sessionData.userPhone, this.userPassword, this.verifyCode).subscribe(
      data => {
        sessionData.clearDateFromLocalStorage();
        this.presentToast(this.sucessfulCode);
        this.codeError = false;
        this.forgetpassBtnClicked = false;
        sessionData.passwordNeedChange="false";
        this.navCtrl.setRoot("LoginPage");                                    
        
        loading.dismiss();

      },
      error => {
        loading.dismiss();
        if (error.json().errorCode == "4009") {
          this.codeError = true;
        }
      }
    )
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
          this.userphoneNotCorrect = true;
        }
        sessionData.checkPermission(this.navCtrl, error.json().errorCode);

      });
  }




  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// General methods ///////////////////////////////////////////

  hasError(field: string, error: string) {
    const ctrl = this.forgetPasswordForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
  hasError2(field: string, error: string) {
    const ctrl = this.resetPasswordForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string): boolean {
    let flag = false;
    if (passwordKey == confirmPasswordKey) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
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
