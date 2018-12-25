import { NgModule } from '@angular/core';
import { IonicPageModule, PopoverController } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { deparmentspage } from './department';
import { DepartmentService } from '../../../providers/department.service';
 

@NgModule({
  declarations: [
    deparmentspage,
    
    
    
  ],
  imports: [
    IonicPageModule.forChild(deparmentspage),
    TranslateModule.forChild({})

  ],
  exports: [
    deparmentspage
  ],
  
  providers:[ DepartmentService  ]
})
export class MainpageModule {}
