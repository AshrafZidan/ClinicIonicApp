import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import {  InboxEmployeepage } from './Inbox-employee';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

 
import { DatePipe } from '@angular/common';
import { TaskService } from '../../../providers/task.service';
 

@NgModule({
  declarations: [
    InboxEmployeepage,
    
    
    
  ],
  imports: [
    IonicPageModule.forChild(InboxEmployeepage),
    TranslateModule.forChild({})

  ],
  exports: [
    InboxEmployeepage
  ],
  
  providers:[ DatePipe  , TaskService]
})
export class MainpageModule {}
