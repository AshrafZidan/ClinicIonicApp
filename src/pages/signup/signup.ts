import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { sessionData } from '../shared/session-data'
import { MyApp }  from '../../app/app.component';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
import { AuthentcationServices } from './../../providers/authentcation-services';



/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
})
export class Signup {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////
  signUpForm: FormGroup;
  


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public userName: string = null;
  public userPhone: string = null;
  public userPassword: string = null;
  public userconPassword: string = null;
  public isCorrect: boolean = false;
  public language:string;
  
///////////////////////////////////////////////////////////// translate key //////////////////////////////////
public pleaseWait:string=null;


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(
    public myapp:MyApp ,
    private loading: LoadingController, 
    private builder: FormBuilder, 
    public authServices: AuthentcationServices,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public translate: TranslateService,    
    private viewCtrl: ViewController
  ) {

////////////////////////////////////////////////// form validation ////////////////////////////////////////////////
    this.signUpForm = builder.group({

      
      'email': ['', [Validators.required,   Validators.email]],

      'username': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
      'phonenumber': ['', [Validators.required, Validators.minLength(11),Validators.pattern('^01[0-2]{1}[0-9]{8}$')]],
'address': ['', [Validators.required, Validators.maxLength(11)]],
'Key': ['', [Validators.required]],



      
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)
      ])]
      , 'confirmPassword': ['', [Validators.required]]
    });


    //////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////    
    this.translate.get(['pleaseWait']).subscribe((res)=> {
      this.pleaseWait=res.pleaseWait;
        });
    this.language=myapp.translate.store.currentLang;  
  }


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 

  signUp() {
    let loading = this.loading.create({
      content:  this.pleaseWait
    });
    loading.present();
   
    this.authServices.userSignUp(this.userPhone, this.userPassword, this.userName).subscribe(
      data => {
        loading.dismiss();
        sessionData.userId = data;
        sessionData.saveDataInSingUpToVerifyCode(data,this.userPhone,this.userPassword,this.userName);
        this.isCorrect = false;
        this.navCtrl.push("Verifypage")
          .then(() => {
            const index = this.viewCtrl.index;
            this.navCtrl.remove(index);
          });
      }
      , error => {
        loading.dismiss();
          this.isCorrect = true;
      });


  }

  goTo() {
    this.navCtrl.push("Verifypage");

  }



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// General methods ///////////////////////////////////////////

  hasError(field: string, error: string) {
    const ctrl = this.signUpForm.get(field);
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
