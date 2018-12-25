import { EmployeeService } from './../../../providers/employee.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'
import {Http, HttpModule } from '@angular/http';
 import {FormsModule} from "@angular/forms";
import { TranslateModule} from '@ngx-translate/core';



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 

import { addemployeePage } from './add-employee';
import { DepartmentService } from '../../../providers/department.service';


@NgModule({
  declarations: [
    addemployeePage,
  ],
  imports: [
    IonicPageModule.forChild(addemployeePage),
    HttpModule,FormsModule,
    TranslateModule.forChild({})
],
exports: [
  addemployeePage
],
providers: [
 EmployeeService , 
 DepartmentService
]
})
export class addemployeePageModule {}
