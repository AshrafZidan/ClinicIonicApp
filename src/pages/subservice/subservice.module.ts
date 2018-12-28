import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { SubService } from './subservice';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 

@NgModule({
  declarations: [
    SubService,
  ],
  imports: [
    IonicPageModule.forChild(SubService),
    TranslateModule.forChild({})

  ],
  exports: [
    SubService
  ],providers:[]
})
export class SubServiceModule {}
