import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import { LanguageModel } from "../../models/language.model";
import { sessionData } from '../../pages/shared/session-data';
import { AuthentcationServices } from './../../providers/authentcation-services';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { LanguageService } from "../../providers/language.service";


/**
 * Generated class for the Language page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class Language {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public languageSelected: any = 'ar';
  public languages: Array<LanguageModel>; 
  public static newlang:string='ar';

///////////////////////////////////////////////////////////// translate key //////////////////////////////////
public pleaseWait:string=null;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor( 
    public menuCtrl: MenuController ,
    public translate: TranslateService, 
    public languageService: LanguageService, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loading: LoadingController,
    public authServices: AuthentcationServices
  ) {
    this.menuCtrl.enable(false, 'menuId');    
    
    //////////////////////////////////////////////////////// get tarnslation Key ////////////////////////////////    
    this.translate.get(['pleaseWait']).subscribe((res)=> {
      this.pleaseWait=res.pleaseWait;
        });

//////////////////////////////////////////////////////////////// methods ///////////////////////////////////////
sessionData.getDataFromLocalstorage();
console.log(sessionData.userToken);



///////// ////////////////////////////////////////// change password ////////////////////////////////////////
console.log(sessionData.userToken);

if((sessionData.userToken!="undefined")){
  if((sessionData.userToken!=null)){
    if(sessionData.userToken!=""){
this.validatSession();
    }
}}

///////// ////////////////////////////////////////// change password ////////////////////////////////////////
if(sessionData.passwordNeedChange=="true"){
  this.navCtrl.setRoot("Forgetpassword");                                    
}

if(sessionData.userVerificationNeeded==true){
  this.navCtrl.setRoot("Verifypage");                                    
}

  }


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////

  setLanguage(languageSelected) {
    let defaultLanguage = this.translate.getDefaultLang();
    if (languageSelected) {
      Language.newlang=languageSelected;
      this.translate.setDefaultLang(languageSelected);
      this.translate.use(languageSelected);
      this.navCtrl.push("LoginPage");
    } else {
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }



  validatSession() {
        let loading = this.loading.create({
          content: this.pleaseWait
        });
        loading.present();
       this.authServices.validateSession().subscribe(
                data => {
                  console.log(data.userDetails);
                  
                  if(!data.userDetails){
                    if(sessionData.userVerificationNeeded==true){
                      this.navCtrl.setRoot("Verifypage");                                                          
                    }else{
                    this.navCtrl.setRoot("LoginPage");                
                    }
                  }else if(!data.userDetails.validMobile){
                    this.navCtrl.setRoot("Verifypage");                                    
                  }else{
                  sessionData.saveDataInsession(data);
                  sessionData.saveDataInLocalStorage();
                  sessionData.getDataFromLocalstorage();  
                  this.menuCtrl.enable(true, 'menuId');                  
                  this.navCtrl.setRoot("Mainpage");                
                  }
                  loading.dismiss();
                  

                }
                , error => {
                  this.navCtrl.setRoot("LoginPage");                
                  // console.log(error.json());
                  loading.dismiss();
    
                }
              );
           
           
           
    }



}
