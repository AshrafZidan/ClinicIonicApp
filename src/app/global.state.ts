import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class GlobalState {

  public isOnline:boolean;
  authenticatedChange: Subject<any> = new Subject<any>();
  

  constructor() {
    this.isOnline=true;
  }
 
  emit(authenticated) {
    this.authenticatedChange.next(authenticated);
  }

  subscribe(component, callback) {
    // set 'this' to component when callback is called
    return this.authenticatedChange.subscribe(data => {
      callback(component, data);
    });
  }




}
