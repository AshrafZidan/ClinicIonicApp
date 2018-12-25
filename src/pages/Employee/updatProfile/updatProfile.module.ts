import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { updatProfilePage } from './updatProfile';
import { VacationTypeService } from '../../../providers/vacationType.service';
import { EmployeeService } from '../../../providers/employee.service';


@NgModule({
  declarations: [
    updatProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(updatProfilePage),
  ],
  exports: [
    updatProfilePage
  ],providers: [
    EmployeeService
  ]
})
export class EditdepartmentPageModule {}
