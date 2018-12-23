// Angular Imports
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'
import {Http, HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device'
import {FormsModule} from "@angular/forms";
import { TranslateModule} from '@ngx-translate/core';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import {AppModule} from './../../app/app.module';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { AuthentcationServices } from './../../providers/authentcation-services';



// This Module's Components
import { LoginPage } from './login';
@NgModule({
    imports: [
        IonicPageModule.forChild(LoginPage),
        HttpModule,FormsModule,
          TranslateModule.forChild({})
    ],
    declarations: [
        LoginPage
    ],
    exports: [
        LoginPage
    ],
  providers: [
   AuthentcationServices,Device
  ]
})
export class LoginModule {

}
