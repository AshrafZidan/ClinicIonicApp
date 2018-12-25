import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { VacationTypeService } from '../../../providers/vacationType.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AddVacationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-vacations',
  templateUrl: 'add-vacations.html',
})
export class AddVacationsPage {

  myForm: FormGroup;
  name : string;
  desciption : string;
  daysCount : string;
  public pleaseWait: string = 'انتظر من فضلك';



  constructor(public myapp: MyApp,

    private loading: LoadingController,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private viewCtrl: ViewController,
    public platform:Platform,
    private vacationsService : VacationTypeService) {

      this.myForm = builder.group({
        'name':['', [Validators.required , Validators.maxLength(45)]],
        'daysCount':['', [Validators.required]],
        'desciption': ['', [Validators.required , Validators.maxLength(45)]],
        
      });


      platform.registerBackButtonAction(() => {
        this.myapp.openPage('InboxAdminpage')
      });

      
  }

  addVacation(){
      let load = this.loading.create({
      content:  this.pleaseWait 
      });

      load.present();

    let vacation = {
      'name':'',
      'desciption':'',
      'daysCount':0
    }
    vacation.name = this.myForm.get('name').value;
    vacation.desciption = this.myForm.get('desciption').value;
    vacation.daysCount = this.myForm.get('daysCount').value;

    console.log(vacation , '5555555');

    this.vacationsService.add(vacation).then(
      data => {

        this.presentToast('تم');
        this.myForm.reset();
        load.dismiss();
      }, error => {
        this.presentToast('خطأ فى اضافه نوع الاجازه الجديد');
        load.dismiss();
      });
    

  }

  



  hasError(field: string, error: string) {
    const ctrl = this.myForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVacationsPage');
  }
  back(){
    this.myapp.openPage('InboxAdminpage')
  }
}
