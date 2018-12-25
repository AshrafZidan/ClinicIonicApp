import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Address } from '../models/address.model';


@Injectable()
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase) { }

  getAll(func) {
    return this.firebase.database.ref('/Employee').on('value',func);
  }
  getById(id: string , func) {
    return this.firebase.database.ref('/Employee/' + id).on('value' , func);
  }
  add(employee) {
    return this.firebase.database.ref('/Employee').push(employee);
  }
  update(id , employee) {
    return this.firebase.database.ref('/Employee/' + id).set(employee);
  }
  remove(id: string) {
  return  this.firebase.database.ref('/Employee/' + id).remove();
  }
  getByDepatmentId(deptId , func){
    return this.firebase.database.ref('/Employee').orderByChild('departmentId').equalTo(deptId).on('value',func);
  }
  getByUserId(userId ){
    return this.firebase.database.ref('/Employee').orderByChild('userId').equalTo(userId).once('value');
  }
  updateEmployeeDepartment(employeeId , newDeptId , newDeptName){
     this.firebase.database.ref('/Employee/' + employeeId +'/deptId').set(newDeptId);
     return this.firebase.database.ref('/Employee/' + employeeId +'/deptName').set(newDeptName);
  }
}