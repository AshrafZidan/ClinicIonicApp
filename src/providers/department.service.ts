import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Address } from '../models/address.model';


@Injectable()
export class DepartmentService {

  constructor(private firebase: AngularFireDatabase) { }

  getAll(func) {
    return this.firebase.database.ref('/Department').on('value',func);
  }
  getById(id: string , func) {
    return this.firebase.database.ref('/Department/' + id).on('value' , func);
  }
  add(department) {
    return this.firebase.database.ref('/Department').push(department);
  }
  update(department) {
    return this.firebase.database.ref('/Department/' + department.$key).set(department);
  }
  remove(id: string) {
    this.firebase.database.ref('/Department/' + id).remove();
  }
}