import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Platform } from 'ionic-angular';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { MyApp } from '../../app/app.component';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// Providers /////////////////////////////////////////////
import { AuthentcationServices } from './../../providers/authentcation-services';



/**
 * Generated class for the EditFields page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'edit-fields-page',
  templateUrl: 'edit-fields.html',
})
export class EditFields {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// Form Validation ///////////////////////////////////////////
  changePasswordGroup: FormGroup;
  


   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////

  public attrubiteName:string = '';
  public attrubiteValue:string = '';
  public oldPassword:string='';
  public newPassword:string=null;
  public confirmPassword:string=null;
  public isNotCorrect:boolean=false;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////
  
  constructor(public authServices: AuthentcationServices,platform: Platform  , public v:MyApp ,public builder: FormBuilder,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,
    private loading: LoadingController, private alertCtrl: AlertController,private viewCtrl: ViewController) {
      
    ///////////////////////////////////////////////// Return Parameter //////////////////////////////////////////////

    this.attrubiteName = this.navParams.get("attrubiteName");
    this.attrubiteValue = this.navParams.get("attrubiteValue");


      ///////////////////////////////////////////////// validate form //////////////////////////////////////////////

      this.changePasswordGroup = this.builder.group({
            'passwordData': ['',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])]
            , 'confirmPassword2': ['', [Validators.required]]
          });

  platform.registerBackButtonAction(() => {
        this.navCtrl.push("Profile");

    }); 

  }



     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////

  updateDriverProfile() {
    
      //  let loading = this.loading.create({
      //    content: "رجاء الإنتظار ... "
      //  });
      //  loading.present();
      //  this.authServices.updateprofile(this.attrubiteName, this.attrubiteValue).subscribe(
      //    data => {
   
      //      loading.dismiss();
           this.presentToast("تم تحديث البيانات بنجاح");
           
           this.v.openPage("Profile");
      
        //  },
        //  error => {
        //    loading.dismiss();
   
        //  });
     }


  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'تم تحديث البيانات بنجاح',
      buttons: [{
        text: ' موافق',
        handler: () => {
          this.navCtrl.push('Driverprofile');

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
  
  back(){
  this.v.openPage("Profile");
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
    const ctrl = this.changePasswordGroup.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }



}
