import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'
import {Http, HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device'
import {FormsModule} from "@angular/forms";
import { TranslateModule} from '@ngx-translate/core';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 

import { addTaskPage } from './add-task';
import { DepartmentService } from '../../../providers/department.service';
import { TaskService } from '../../../providers/task.service';
import { VacationTypeService } from '../../../providers/vacationType.service'
import { EmployeeService } from '../../../providers/employee.service';



@NgModule({
  declarations: [
    addTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(addTaskPage),
    HttpModule,FormsModule,
    TranslateModule.forChild({})
],
exports: [
  addTaskPage
],
providers: [
 DepartmentService , TaskService , VacationTypeService , EmployeeService
]
})
export class addemployeePageModule {}
