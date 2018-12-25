import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Platform, PopoverController } from 'ionic-angular';
import moment from 'moment';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////

import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../../app/app.component';
import { TaskService } from '../../../providers/task.service';
import { EmployeeService } from '../../../providers/employee.service';

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
  selector: 'page-taskDetails',
  templateUrl: 'taskDetails.html',
})
export class taskDetailspage {


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// public variables //////////////////////////////////////////
  public today = moment().toISOString();



  public pleaseWait: string = '';
  public task;
  userType = '';
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// constructor ///////////////////////////////////////////////

  constructor(public app: MyApp,
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingController,
    public modalCtrl: ModalController,
    public db: AngularFireAuth,

    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private taskService: TaskService,
    private employeeService: EmployeeService,
 
  ) {

    this.pleaseWait = "انتظر من فضلك"
    this.task = this.navParams.get('task');

 
    this.userType = localStorage.getItem('userType');

    platform.registerBackButtonAction(() => {
    this.navCtrl.pop()
     });


     

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////// methods ///////////////////////////////////////////////////






  acceptTask() {

    let taskObj = {
      taskTybe: '',
      vacationTybe: '',
      startDate: '',
      daysCount: '',
      newDepartmentId: '',
      lastDepartmentId: '',
      newDepartmentName: '',
      lastDepartmentName: '',
      employeeId: '',
      employeeName: '',
      employeeIdStatus: '',
      employeeIdStatusType: '',
      vacationTypeId: '',
      status: 'لم يتم الرد'
    }
    taskObj.taskTybe = this.task.taskTybe;
    taskObj.vacationTybe = this.task.vacationTybe;
    taskObj.startDate = this.task.startDate;
    taskObj.daysCount = this.task.daysCount;
    taskObj.newDepartmentId = this.task.newDepartmentId;
    taskObj.lastDepartmentId = this.task.lastDepartmentId;
    taskObj.newDepartmentName = this.task.newDepartmentName;
    taskObj.lastDepartmentName = this.task.lastDepartmentName;
    taskObj.employeeId = this.task.employeeId;
    taskObj.employeeName = this.task.employeeName;
    taskObj.employeeIdStatus = this.task.employeeIdStatus;
    taskObj.employeeIdStatusType = this.task.employeeIdStatusType;
    taskObj.vacationTybe = this.task.vacationTybe;
    taskObj.status = this.task.status;


    if (this.task.taskTybe === "طلب اجازه") {

      taskObj.status = 'تم الموافقه';
      taskObj.employeeIdStatus = this.task.employeeId + 'accepted';
      taskObj.employeeIdStatusType = this.task.employeeId + this.task.vacationTypeId + 'accepted';
      this.taskService.update(this.task.$key , taskObj).then(data => {

        this.confirmAlert()



      }).catch(err => {
        this.presentToast('خطأ اثناء الموافقه');
        this.navCtrl.push('Vacationspage');
      })




    } else {

      taskObj.status = 'تم الموافقه';
      this.taskService.update(this.task.$key , taskObj).then(data => {
        this.employeeService.updateEmployeeDepartment(this.task.employeeId, this.task.newDepartmentId, this.task.newDepartmentName).then(
          data => {
            this.confirmAlert()
          }
        ).catch(err => {
          this.presentToast('خطأ اثناء الموافقه');
          this.navCtrl.push('InboxAdminpage');
        })

      }).catch(err => {
        this.presentToast('خطأ اثناء الموافقه');
        this.navCtrl.push('InboxAdminpage');
      })


    }


  }

  refuseTask(){

    let taskObj = {
      taskTybe: '',
      vacationTybe: '',
      startDate: '',
      daysCount: '',
      newDepartmentId: '',
      lastDepartmentId: '',
      newDepartmentName: '',
      lastDepartmentName: '',
      employeeId: '',
      employeeName: '',
      employeeIdStatus: '',
      employeeIdStatusType: '',
      vacationTypeId: '',
      status: 'لم يتم الرد'
    }
    taskObj.taskTybe = this.task.taskTybe;
    taskObj.vacationTybe = this.task.vacationTybe;
    taskObj.startDate = this.task.startDate;
    taskObj.daysCount = this.task.daysCount;
    taskObj.newDepartmentId = this.task.newDepartmentId;
    taskObj.lastDepartmentId = this.task.lastDepartmentId;
    taskObj.newDepartmentName = this.task.newDepartmentName;
    taskObj.lastDepartmentName = this.task.lastDepartmentName;
    taskObj.employeeId = this.task.employeeId;
    taskObj.employeeName = this.task.employeeName;
    taskObj.employeeIdStatus = this.task.employeeIdStatus;
    taskObj.employeeIdStatusType = this.task.employeeIdStatusType;
    taskObj.vacationTybe = this.task.vacationTybe;
    taskObj.status = this.task.status;

    if (this.task.taskTybe === "طلب اجازه") {

      taskObj.status = 'تم الرفض';
      taskObj.employeeIdStatus = this.task.employeeId + 'refused';
      taskObj.employeeIdStatusType = this.task.employeeId + this.task.vacationTypeId + 'refused';
      this.taskService.update(this.task.$key , taskObj).then(data => {

        this.confirmAlerRefuse();



      }).catch(err => {
        this.presentToast('خطأ اثناء الموافقه');
        this.navCtrl.push('Vacationspage');
      })




    } else {

      taskObj.status = 'تم الرفض';
      this.taskService.update(this.task.$key , taskObj).then(data => {
        
            this.confirmAlerRefuse();

      }).catch(err => {
        this.presentToast('خطأ اثناء الرفض');
        this.navCtrl.push('InboxAdminpage');
      })


    }


  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'تم الموافقه',
      buttons: [{
        text: ' Done',
        handler: () => {
          this.navCtrl.pop();

        }
      }]
    });
    alert.present();
  }

  confirmAlerRefuse() {
    let alert = this.alertCtrl.create({
      title: 'تم الرفض',
      buttons: [{
        text: ' Done',
        handler: () => {
          this.navCtrl.pop();

        }
      }]
    });
    alert.present();
  }




  back() {
    this.navCtrl.pop()
  }

}

