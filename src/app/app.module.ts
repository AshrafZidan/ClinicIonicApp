import { FIREBASE_CONFIG } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http,HttpModule } from '@angular/http';
// check the network 
import { Network } from '@ionic-native/network';


import { MyApp } from './app.component';
import { GlobalState } from './global.state';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from '../providers/language.service';
import { AngularFireModule } from "angularfire2";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,HttpModule,

    // Init anfularfirebase
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp),NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,GlobalState,
    SplashScreen,LanguageService,Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
