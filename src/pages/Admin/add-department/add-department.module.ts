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
 

import { AddDepartmentPage } from './add-department';
import { DepartmentService } from '../../../providers/department.service';


@NgModule({
  declarations: [
    AddDepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDepartmentPage),
    HttpModule,FormsModule,
    TranslateModule.forChild({})
],
exports: [
  AddDepartmentPage
],
providers: [
 DepartmentService
]
})
export class AdddepartmentPageModule {}
