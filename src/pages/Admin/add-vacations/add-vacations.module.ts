import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'
import {Http, HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device'
import {FormsModule} from "@angular/forms";
import { TranslateModule} from '@ngx-translate/core';

import { VacationTypeService } from '../../../providers/vacationType.service';

import { AddVacationsPage } from './add-vacations';

@NgModule({
  declarations: [
    AddVacationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddVacationsPage),
    HttpModule,FormsModule,
    TranslateModule.forChild({})
],
exports: [
  AddVacationsPage
],
providers: [
 VacationTypeService
]
})
export class AddVacationsPageModule {}
