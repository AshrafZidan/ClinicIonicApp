import { Component } from '@angular/core';
import { Platform ,MenuController,App,ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';

import { sessionData } from '../pages/shared/session-data';
import { GlobalState } from './global.state';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables ///////////////////////////////////////////
  public rootPage:any = "LoginPage";
  public textDir: string = "ltr";
  public sideMenu:string;
  public languageInSildClass:string="en";
  public isOnline:boolean=true;
  public toast:any;
 

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public static variables ////////////////////////////////////
  public static language="en";




  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(
    public translate: TranslateService ,
    public app:App,platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public menu:MenuController,
    private network: Network,
    private globalState:GlobalState,
    public toastCtrl: ToastController
  ) { 
   /////////////////////////////////// set default language to app //////////////////////////////////////////////////
    translate.setDefaultLang('en');
    translate.use('en');
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
     
    
      
   


    ///////////////////////////////////////// on thread to watch change of language ////////////////////////////////
      this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'ar'? 'rtl' : 'ltr';
        this.sideMenu = event.lang == 'ar'? 'right' : 'left';
        MyApp.language=event.lang;
        this.languageInSildClass=event.lang;
      });

    //////////////////////////////////////////// watch network for a disconnect////////////////////////////////////
    this.network.onDisconnect().subscribe(() => {
      
      var iDiv = document.createElement('div');
      var iPar = document.createElement('p'); 
      iDiv.id = 'netOffInfo';
      iDiv.className = 'netOffInfo';
      iPar.className='netparagrap';
      document.getElementsByTagName('body')[0].appendChild(iDiv);
      document.getElementsByClassName('netOffInfo')[0].appendChild(iPar);
      iPar.innerHTML = "يتعذر الإتصال بالإنترنت";
  
      console.log('network was disconnected :-(');
    });

    /////////////////////////////////////////// watch network for a connection /////////////////////////////////////
    this.network.onConnect().subscribe(() => {
      var element = document.getElementById("netOffInfo");
      if(element){
      element.parentNode.removeChild(element);
      }
      console.log('network connected!');
    });




    });
  }




 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
  


/////////////////////////////////////////// open any page in menu in app ////////////////////////////////////////////
  openPage(page){
    this.app.getRootNav().setRoot(page);  
    this.menu.close(); 
  }

logout(){
  this.app.getRootNav().setRoot("LoginPage");
  sessionData.clearDateFromLocalStorage();  
  sessionData.clearDataInsession();
  this.menu.close(); 
}


  private presentToast(text) {
    this.toast = this.toastCtrl.create({
      message: text,
      // duration: 3000,
      position: 'top'
    });
    this.toast.present();
  }
  

}

