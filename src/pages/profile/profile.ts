import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { sessionData } from '../shared/session-data'
import { MyApp } from '../../app/app.component';


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public userData:any = {
            userid: 1,
            username: "محمد أحمد على",
            userjob: "مدير مدرسه",
            useremail: 'mojae@dd',
            userphone: sessionData.userPhone,
            usermobile: '04552',
            useraddress: 'ssasas',
            userbirthday: '16/6/2019',
            userblod: 's',
            userjobdata: '12/6/2015',
            usersocialstatus: 'fins',
            usercode: '322',
            userimage: 'dsdsd'
  }


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(platform: Platform, 
    public app: MyApp, 
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    platform.registerBackButtonAction(() => {
      this.app.openPage("Mainpage");
    });


  }


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 
  back() {
    this.app.openPage("Mainpage");
  }

  updateFields(attrubiteName, attrubiteValue) {
    this.navCtrl.push("EditFields", { attrubiteName: attrubiteName, attrubiteValue: attrubiteValue });
  }

}
