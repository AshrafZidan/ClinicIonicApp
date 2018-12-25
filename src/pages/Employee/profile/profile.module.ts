import { NgModule } from '@angular/core';
import { IonicPageModule, PopoverController } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';
import { profilepage } from './profile';
import { EmployeeService } from '../../../providers/employee.service';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
 


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

@NgModule({
  declarations: [
    profilepage,
    
    
    
  ],
  imports: [
    IonicPageModule.forChild(profilepage),
    TranslateModule.forChild({})

  ],
  exports: [
    profilepage
  ],
   providers:[EmployeeService]
})
export class  profilepageModule {}
