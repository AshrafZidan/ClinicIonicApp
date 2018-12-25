 import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {   FIREBASE_CONFIG } from './firebase.config';
import { storage } from "firebase";
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http,HttpModule } from '@angular/http';

// check the network 
import { Network } from '@ionic-native/network';


import { MyApp } from './app.component';
import { GlobalState } from './global.state';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
 import { AngularFireModule } from "angularfire2";

import { SelectSearchableModule } from 'ionic-select-searchable';
 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';
import { OneSignal } from '@ionic-native/onesignal';
import { FCM } from '@ionic-native/fcm';
import { ImagePicker } from "@ionic-native/image-picker";
import { Camera } from "@ionic-native/camera";

 
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AuthentcationServices } from '../providers/authentcation.services';

 

 export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
 
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    SelectSearchableModule , 

     // Init anfularfirebase
     AngularFireModule.initializeApp(FIREBASE_CONFIG),
     AngularFirestoreModule,
     AngularFireStorageModule,
    
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,GlobalState,
    AngularFireDatabase,
    AngularFireAuth,
    AuthentcationServices,
    SplashScreen, Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,

     ]
})
export class AppModule {}
