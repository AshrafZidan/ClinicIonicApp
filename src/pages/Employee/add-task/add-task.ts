import { TranslateService } from '@ngx-translate/core';
import { MyApp } from './../../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DepartmentService } from '../../../providers/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { VacationTypeService } from '../../../providers/vacationType.service';
import { TaskService } from '../../../providers/task.service';
import { EmployeeService } from '../../../providers/employee.service';


/**
 * Generated class for the AddDepartmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class addTaskPage {

  myForm: FormGroup;
  name: string;
  information: string;
  public pleaseWait: string = 'من فضلك انتظر';
  public language;

  taskType = '';
  vacationsTybes = [];
  taskTybes = [];
  departments = [];

  employee;

  public maxDate;


  constructor(public myapp: MyApp,
    public platform: Platform,
    private loading: LoadingController,
    private builder: FormBuilder,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    private viewCtrl: ViewController,
    public auth: AngularFireAuth,
    private departmentService: DepartmentService,
    private vacationTypeService: VacationTypeService,
    private taskService: TaskService,
    private employeeService: EmployeeService) {

    var CurrentYear = new Date().getFullYear()
    this.maxDate = CurrentYear + 2;

    this.myForm = builder.group({
      'taskTybe': ['', [Validators.required]],
      'vacationTybe': ['', [Validators.required]],

      'startDate': ['', [Validators.required]],
      'daysCount': ['', [Validators.required]],
      'departmentIndex': ['', []],

    });
    platform.registerBackButtonAction(() => {
      this.myapp.openPage('InboxEmployeepage')
    });

    this.language = localStorage.getItem('lang')
    this.taskTybes.push('طلب اجازه');
    this.taskTybes.push('طلب نقل');
    this.taskType = 'vacation';
    this.myForm.get('taskTybe').setValue('طلب اجازه');
    this.getEmployee();
    this.getAllDepartments();
    this.getAllVacationTypes();
  }

  getEmployee() {
    let load = this.loading.create({
      content: this.pleaseWait


    })
    load.present()


    let employeeId = localStorage.getItem('userId');
    this.employeeService.getById(employeeId, data => {
      this.employee = data.val();
      this.employee.$key = data.key;

      console.log(this.employee, 'sssss');

      load.dismiss();
    })
  }

  getAllDepartments() {
    let load = this.loading.create({
      content: this.pleaseWait


    })
    load.present()


    this.departmentService.getAll(data => {


      this.departments = []
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          let element = data.val()[key];
          element.$key = key;
          this.departments.push(element)
        }
      }

      console.log(this.departments);

      load.dismiss()

    }), error => {

      load.dismiss();
    }
  }

  getAllVacationTypes() {
    let load = this.loading.create({
      content: this.pleaseWait


    })
    load.present()


    this.vacationTypeService.getAll(data => {


      this.vacationsTybes = []
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          let element = data.val()[key];
          element.$key = key;

          let employeeId = localStorage.getItem('userId');
          let days = element.daysCount;

          this.taskService.getByEmployeeIdAndStatusAndType(employeeId, 'accepted', key, data2 => {
            for (const key in data2.val()) {
              if (data2.val().hasOwnProperty(key)) {
                let element2 = data2.val()[key];
                console.log('element2.daysCount', element2.daysCount);

                days -= element2.daysCount;
              }
            }
            element.days = days;
            this.vacationsTybes.push(element)
          })

        }
      }

      console.log(this.vacationsTybes);

      load.dismiss();

    }), error => {

      load.dismiss();
    }


  }

  addTask() {

    let load = this.loading.create({
      content: this.pleaseWait
    });

    load.present();

    let task = {
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
    console.log(this.taskType, '7777');


    if (this.taskType === 'vacation') {
      console.log('693669366');

      let days = this.myForm.get('daysCount').value;

      let vacationSelected = this.vacationsTybes[this.myForm.get('vacationTybe').value];
      console.log('vacationSelected.days', vacationSelected.days);
      console.log('days', days);

      console.log(days > vacationSelected.days, days, vacationSelected.days);

      if (days > Number.parseInt(vacationSelected.days)) {

        this.presentToast('لا يوجد لديك رصيد كافى');
        load.dismiss();
      } else {

        task.taskTybe = this.myForm.get('taskTybe').value;


        task.vacationTybe = vacationSelected.name;
        task.startDate = this.myForm.get('startDate').value;
        task.daysCount = this.myForm.get('daysCount').value;

        task.employeeId = this.employee.$key;
        task.employeeName = this.employee.name;
        task.employeeIdStatus = this.employee.$key + 'notResponsed';
        task.employeeIdStatusType = this.employee.$key + vacationSelected.$key + 'notResponsed';
        task.vacationTypeId = vacationSelected.$key;
        task.lastDepartmentId = this.employee.deptId;
        task.lastDepartmentName = this.employee.deptName;
        console.log(task);

        this.taskService.add(task).then(
          data => {

            this.presentToast(' تم إضافة الطلب');
            this.myForm.reset();
            this.myForm.get('vacationTybe').setValue('');
            this.myForm.get('departmentIndex').setValue('');
            this.taskType = 'vacation';
            this.myForm.get('taskTybe').setValue('طلب اجازه');
            load.dismiss();
          }, error => {

            this.presentToast('خطأ فى اضافه طلب جديد');
            load.dismiss();
          });

      }
    } else {
      task.taskTybe = this.myForm.get('taskTybe').value;
      task.employeeId = this.employee.$key;
      task.employeeName = this.employee.name;

      let newDepartment = this.departments[this.myForm.get('departmentIndex').value];

      task.newDepartmentId = newDepartment.$key;
      task.newDepartmentName = newDepartment.name;
      task.lastDepartmentId = this.employee.deptId;
      task.lastDepartmentName = this.employee.deptName;

      console.log(task);

      if (task.lastDepartmentId == task.newDepartmentId) {

        this.presentToast('انت فى هذا القسم بالفعل');
        load.dismiss();

      } else {

        this.taskService.add(task).then(
          data => {

            this.presentToast(' تم إضافة الطلب');
            this.myForm.reset();
            this.myForm.get('vacationTybe').setValue('');
            this.myForm.get('departmentIndex').setValue('');
            this.taskType = 'goFar';
            this.myForm.get('taskTybe').setValue('طلب نقل');
            load.dismiss();
          }, error => {

            this.presentToast('خطأ فى اضافه طلب جديد');
            load.dismiss();
          });

      }
    }


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

  tybeChange() {

    if (this.myForm.get('taskTybe').value === 'طلب اجازه') {
      this.taskType = 'vacation';
      console.log('Confirm');

      this.myForm.get('vacationTybe').clearValidators();
      this.myForm.get('vacationTybe').updateValueAndValidity();
      this.myForm.get('startDate').clearValidators();
      this.myForm.get('startDate').updateValueAndValidity();
      this.myForm.get('daysCount').clearValidators();
      this.myForm.get('daysCount').updateValueAndValidity();
      this.myForm.get('departmentIndex').clearValidators();
      this.myForm.get('departmentIndex').updateValueAndValidity();


      this.myForm.get('vacationTybe').setValidators(Validators.required);
      this.myForm.get('vacationTybe').updateValueAndValidity();
      this.myForm.get('startDate').setValidators(Validators.required);
      this.myForm.get('startDate').updateValueAndValidity();
      this.myForm.get('daysCount').setValidators(Validators.required);
      this.myForm.get('daysCount').updateValueAndValidity();


    } else {
      this.taskType = 'goFar';


      this.myForm.get('vacationTybe').clearValidators();
      this.myForm.get('vacationTybe').updateValueAndValidity();
      this.myForm.get('startDate').clearValidators();
      this.myForm.get('startDate').updateValueAndValidity();
      this.myForm.get('daysCount').clearValidators();
      this.myForm.get('daysCount').updateValueAndValidity();
      this.myForm.get('departmentIndex').clearValidators();
      this.myForm.get('departmentIndex').updateValueAndValidity();


      this.myForm.get('departmentIndex').setValidators(Validators.required);
      this.myForm.get('departmentIndex').updateValueAndValidity();

    }


  }

  back() {
    this.myapp.openPage('InboxEmployeepage')
  }

}
