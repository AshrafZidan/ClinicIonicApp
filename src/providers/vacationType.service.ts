import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Address } from '../models/address.model';


@Injectable()
export class VacationTypeService {

  constructor(private firebase: AngularFireDatabase) { }

  getAll(func) {
    return this.firebase.database.ref('/VacationType').on('value',func);
  }
  getById(id: string , func) {
    return this.firebase.database.ref('/VacationType/' + id).on('value' , func);
  }
  add(vacationType) {
    return this.firebase.database.ref('/VacationType').push(vacationType);
  }
  update(key ,vacationType) {
    return this.firebase.database.ref('/VacationType/' + key).set(vacationType);
  }
  remove(id: string) {
    return this.firebase.database.ref('/VacationType/' + id).remove();
  }
}