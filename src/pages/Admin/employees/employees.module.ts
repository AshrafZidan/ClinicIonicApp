import { NgModule } from '@angular/core';
import { IonicPageModule, PopoverController } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////

import { employeespage } from './employees';
import { EmployeeService } from '../../../providers/employee.service';
 

@NgModule({
  declarations: [
    employeespage,
    
    
    
  ],
  imports: [
    IonicPageModule.forChild(employeespage),
    TranslateModule.forChild({})

  ],
  exports: [
    employeespage
  ],
  
  providers:[ EmployeeService ]
})
export class employeesModule {}
