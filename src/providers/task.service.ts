import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Address } from '../models/address.model';


@Injectable()
export class TaskService {

  constructor(private firebase: AngularFireDatabase) { }

  getAll(func) {
    return this.firebase.database.ref('/Task').on('value',func);
  }
  getById(id: string , func) {
    return this.firebase.database.ref('/Task/' + id).on('value' , func);
  }
  add(task) {
    return this.firebase.database.ref('/Task').push(task);
  }
  update(key ,  task) {
    return this.firebase.database.ref('/Task/' + key).set(task);
  }
  remove(id: string) {
    this.firebase.database.ref('/Task/' + id).remove();
  }
  getByEmployeeId(employeeId , func){
    return this.firebase.database.ref('/Task').orderByChild('employeeId').equalTo(employeeId).on('value',func);
  }
  getByEmployeeIdAndStatus(employeeId , status , func){
    return this.firebase.database.ref('/Task').orderByChild('employeeIdStatus').equalTo(employeeId+status+'').on('value',func);
  }
  getByEmployeeIdAndStatusAndType(employeeId , status , typeId , func){
    return this.firebase.database.ref('/Task').orderByChild('employeeIdStatusType').equalTo(employeeId +typeId+status+'').on('value',func);
  }
}