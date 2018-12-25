import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { MyApp } from '../../../app/app.component';
import { VacationTypeService } from '../../../providers/vacationType.service';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
 
/**
 * Generated class for the EditCompanyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-vacation',
  templateUrl: 'edit-vacation.html',
})
export class EditVacationPage {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////
  myForm: FormGroup;
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public vacation;
  public attrubiteValue:string = '';
 
  public required = 'This field required'
  public EditableId;
  public pleaseWait:string=null;


  constructor( platform: Platform  , public v:MyApp ,public builder: FormBuilder,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,
    private loading: LoadingController, private alertCtrl: AlertController,private viewCtrl: ViewController,
 
  public app:MyApp ,    public translate: TranslateService,  private vacationsService : VacationTypeService  

  ) {

      
    ///////////////////////////////////////////////// Return Parameter //////////////////////////////////////////////

    this.vacation = this.navParams.get("item");
    console.log(this.vacation , "sssssssssssssss");
    
  
    

      ///////////////////////////////////////////////// validate form //////////////////////////////////////////////

      this.myForm = this.builder.group({
             'name': ['', [Validators.required  , Validators.maxLength(45)]],
             'desciption': ['', [Validators.required ]],
             'daysCount': ['', [Validators.required  , Validators.maxLength(45)]],
             
            
          });



  platform.registerBackButtonAction(() => {
        this.navCtrl.pop();

    }); 

    this.translate.get(['pleaseWait']).subscribe((res)=> {
      this.pleaseWait=res.pleaseWait;
        });


  }

  


  back(){
    this.navCtrl.pop();
  }

     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////

  updateVacation() {
    
    this.EditableId =  this.vacation.$key;
   
    let vacationObj = {
      'name':'',
      'desciption':'',
      'daysCount':0
    }
    vacationObj.name = this.myForm.get('name').value;
    vacationObj.desciption = this.myForm.get('desciption').value;
    vacationObj.daysCount = this.myForm.get('daysCount').value;

    
      this.vacationsService.update(this.EditableId , vacationObj ).then(data => {
         
         this.confirmAlert()
         
       
 
     }).catch(err => {
       this.presentToast('خطأ اثناء التعديل');
       this.navCtrl.push('Vacationspage');
     })
   
    
           
      
     }


  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'تم التعديل',
      buttons: [{
        text: ' Done',
        handler: () => {
          this.navCtrl.pop();

        }
      }]
    });
    alert.present();
  }


  CheckValue(gen: any) {
    if (gen == this.attrubiteValue) {
      return true
    } else {
      return false
    }
  }

  setValue(value: any) {
    this.attrubiteValue = value+"";
  }

  cancelEdit() {
    this.navCtrl.pop();

  }
  
 




 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// General methods ///////////////////////////////////////////

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}



  hasError(field: string, error: string) {
    const ctrl = this.myForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


}
