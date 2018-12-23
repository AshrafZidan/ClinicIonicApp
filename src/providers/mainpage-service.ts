import { sessionData } from './../pages/shared/session-data';
import { setting } from './../app/setting';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PatientServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MainpageService {

  public Notificationservices: string = "assets/jsonfiles/notification.json";

  constructor(public http: Http) {

  }


getAllNotification(date): Observable<any> {   
    
    return this.http.get(this.Notificationservices,
      { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      })
  }

}





