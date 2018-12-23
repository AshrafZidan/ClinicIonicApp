import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Forgetpassword } from './forgetpassword';
import { HttpModule } from '@angular/http';
import { TranslateModule} from '@ngx-translate/core';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { AuthentcationServices } from './../../providers/authentcation-services';



@NgModule({
  declarations: [
    Forgetpassword,
  ],
  imports: [
    IonicPageModule.forChild(Forgetpassword),HttpModule,TranslateModule.forChild({})
  ],
  exports: [
    Forgetpassword
  ],
  providers: [AuthentcationServices]
})
export class ForgetpasswordModule {


}
