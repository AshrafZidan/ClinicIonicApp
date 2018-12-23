import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule} from '@ngx-translate/core';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { Profile } from './profile';


@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    IonicPageModule.forChild(Profile),TranslateModule.forChild({})

  ],
  exports: [
    Profile
  ]
})
export class ProfileModule {}
