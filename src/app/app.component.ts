 import { Component, ViewChild, Injector } from '@angular/core';
 import { NavController, MenuController, IonicPage, LoadingController, ViewController, ToastController, App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { AngularFireAuth } from 'angularfire2/auth';


 import { GlobalState } from './global.state';

 import { AuthentcationServices } from '../providers/authentcation.services';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables ///////////////////////////////////////////
  public rootPage: any = "LoginPage";
  public textDir: string = "rtl";
  public sideMenu: string;
  public languageInSildClass: string = "ar";
  public isOnline: boolean = true;
  public toast: any;

  // @ViewChild('content') navCtrl: NavController;
  @ViewChild('nav') nav;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public static variables ////////////////////////////////////
  public static language = "ar";



  public username = '';
  public userType = '';

 
  public pleaseWait: string = null;


  @ViewChild('content') navCtrl: NavController
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(
    private loading: LoadingController,
    public translate: TranslateService,
    public app: App,
    public platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public menu: MenuController,
    private network: Network,
    public db: AngularFireAuth,
    private globalState: GlobalState,
    public toastCtrl: ToastController,
    public auth:AuthentcationServices,
    
  

  ) {
    /////////////////////////////////// set default language to app //////////////////////////////////////////////////
    translate.setDefaultLang('en');
    translate.use('en');

    this.translate.get(['pleaseWait']).subscribe((res) => {
      this.pleaseWait = res.pleaseWait;
    });




    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      




      ///////////////////////////////////////// on thread to watch change of language ////////////////////////////////
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.textDir = event.lang == 'ar' ? 'rtl' : 'ltr';
        this.sideMenu = event.lang == 'ar' ? 'right' : 'left';
        MyApp.language = event.lang;
        this.languageInSildClass = event.lang;
      });

      //////////////////////////////////////////// watch network for a disconnect////////////////////////////////////
      this.network.onDisconnect().subscribe(() => {

        var iDiv = document.createElement('div');
        var iPar = document.createElement('p');
        iDiv.id = 'netOffInfo';
        iDiv.className = 'netOffInfo';
        iPar.className = 'netparagrap';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
        document.getElementsByClassName('netOffInfo')[0].appendChild(iPar);
        iPar.innerHTML = "يتعذر الإتصال بالإنترنت";

        console.log('network was disconnected :-(');
      });

      /////////////////////////////////////////// watch network for a connection /////////////////////////////////////
      this.network.onConnect().subscribe(() => {
        var element = document.getElementById("netOffInfo");
        if (element) {
          element.parentNode.removeChild(element);
        }
        console.log('network connected!');
      });




    });

    // this.ValidateUser()
    // this.checkAccess();
    
  }

  


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////



  /////////////////////////////////////////// open any page in menu in app ////////////////////////////////////////////
   


  openPage(namePage) {
    this.navCtrl.setRoot(namePage);
    this.menu.close();

  }


  logout() {


     this.auth.LogoutFirebase()
     
     localStorage.clear()
      this.openPage("LoginPage");

      
       

    }






  


  private presentToast(text) {
    this.toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    this.toast.present();
  }

  ValidateUser(){

     
    let userType = localStorage.getItem('userType');
    if (userType != null){
        if (userType == "Admin") {
      
          this.openPage('InboxAdminpage')

     } else if (userType == "Employee"){
       

   
      this.openPage('InboxEmployeepage')

     }
    }
    else{
 
      this.openPage('LoginPage')
     
    
    }


  }

  checkAccess() {
  
    
    this.db.auth.onAuthStateChanged(user => {
      if (user) {
        
        console.log("sssssssin");

        if (user.displayName== "Admin") {
           
          this.userType = 'Admin'
           this.openPage("InboxAdminpage");
     

      
        } else if (user.displayName== "Employee"){
         
         this.userType = 'Employee'
   
         this.openPage("InboxEmployeepage");
     
          
        }
 
      }
      else {

       
        localStorage.clear()
        this.openPage("LoginPage");
 

      }
    })
 



  }
}

