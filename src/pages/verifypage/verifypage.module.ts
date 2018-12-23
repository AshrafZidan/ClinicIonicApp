import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { TranslateModule} from '@ngx-translate/core';
import { Device } from '@ionic-native/device';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import { Verifypage } from './verifypage';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { AuthentcationServices } from './../../providers/authentcation-services';


@NgModule({
  declarations: [
    Verifypage
  ],
  imports: [
    IonicPageModule.forChild(Verifypage),HttpModule,TranslateModule.forChild({})
  ],
  exports: [
    Verifypage
  ],
  providers:[AuthentcationServices,Device]
})
export class VerifypageModule {}
