import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVacationPage } from './edit-vacation';
import { VacationTypeService } from '../../../providers/vacationType.service';


@NgModule({
  declarations: [
    EditVacationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditVacationPage),
  ],
  exports: [
    EditVacationPage
  ],providers: [
    VacationTypeService
  ]
})
export class EditdepartmentPageModule {}
