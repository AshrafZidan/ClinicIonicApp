import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import moment from 'moment';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { MyApp } from '../../app/app.component';
import { sessionData } from './../shared/session-data';


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 




/**
 * Generated class for the SearchCriteria page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-SubService',
  templateUrl: 'subservice.html',
})
export class SubService {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////
  public today = moment().toISOString();

  language = '';


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(public app:MyApp,
    public platform: Platform, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loading: LoadingController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
    platform.registerBackButtonAction(() => {
      this.app.openPage("Mainpage");
    });

    this.language = 'ar';
  }

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////
 

  back(){
    this.app.openPage("Mainpage");
  }

  openOrder(){
    this.app.openPage("Order");

  }
}
