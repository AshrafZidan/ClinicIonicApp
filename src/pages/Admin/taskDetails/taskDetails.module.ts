import { NgModule } from '@angular/core';
import { IonicPageModule, PopoverController } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';
import { taskDetailspage } from './taskDetails';
import { EmployeeService } from '../../../providers/employee.service';
import { TaskService } from '../../../providers/task.service';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
 


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

@NgModule({
  declarations: [
    taskDetailspage,
    
    
    
  ],
  imports: [
    IonicPageModule.forChild(taskDetailspage),
    TranslateModule.forChild({})

  ],
  exports: [
    taskDetailspage
  ],
  providers:[ EmployeeService  , TaskService]
   
})
export class  taskDetailspageModule {}
