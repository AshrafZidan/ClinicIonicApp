import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";



 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { setting } from './../app/setting';
import { AngularFireAuth } from 'angularfire2/auth';



/*
  Generated class for the AuthentcationServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthentcationServices {


  constructor(public http: Http , public firebase:AngularFireAuth) {
  }


  userLogin(username: string, password: string,browserType:string,osType:string,language:string): Observable<any> {
    let data = {
      "userName": username,
      "password": password,
      "deviceType": "mobile",
      "browserType": browserType,
      "osType": osType,
      "timeZone": "GMT+0200",
      "language": language,
      "location": "Egypt",
      "notificationId":"none",
      "isMobileApp":true            
    };   
    return this.http.post(setting.DOMAIN_URL + '/userservices/signin', data, { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      }).timeout(40000);
      ;
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  userSignUp(userName: string, password: string, fullName: string): Observable<any> {
    let data = {
      "userName": userName,
      "passWord": password,
      "name": fullName,
      "mobApp":true,            
      "type": "CLIENT",
      "notificationId": "none"
    };

    return this.http.post(setting.DOMAIN_URL + '/userservices/signup', data, { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  /////////////////////////////////////////////////////////////////////////////
  userVerifyCode(verifyCode:string, userName:string, password:string, userId:number,browserType:string,osType:string,language:string): Observable<any> {
    let data = {
      "userName": userName,
      "password": password,
      "deviceType": "mobile",
      "browserType": browserType,
      "osType": osType,
      "timeZone": "GMT+0200",
      "language": language,
      "location": "Egypt",
      "notificationId":"none",
      "isMobileApp":true            
    };
     return this.http.put(setting.DOMAIN_URL + '/userservices/mobilevalidate?userid=' + userId + '&verifycode=' + verifyCode, data, { headers: setting.getHeaderJson() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }
  ResendCode(userId: number): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + '/userservices/resendcode?userid=' + userId)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }
  requestForgetPassword(userPhone: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + '/userservices/requestresetpassword?username=' + userPhone)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  forgetPassword(userPhone: string, password: string, verifyCode: string): Observable<any> {
    let data = new URLSearchParams();
    data.set('newpassword', password);
    let body = data.toString()
    return this.http.post(setting.DOMAIN_URL + '/userservices/resetpassword?verifycode=' + verifyCode + '&username=' + userPhone, body, { headers: setting.getHeaderXWFORM() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  
  /////////////////////////////////////////////////////////////////////////////////////////
  logOut(): Observable<any> {
    let options = new RequestOptions({ headers: setting.getHeaderJsonWithTKN() });

    return this.http.post(setting.DOMAIN_URL + '/userservices/logout', null, options)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  validateSession(): Observable<any> {
    let options = new RequestOptions({ headers: setting.getHeaderJsonWithTKN() });
    console.log(options);
    
    return this.http.post(setting.DOMAIN_URL + '/usersessionservices/validatesession', null, options)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }


/////////////////////////////////////////////////////////////////////////////////////////
  deactivateAccount(): Observable<any> {
    return this.http.post(setting.DOMAIN_URL + '/userservices/deactivateuser', null, { headers: setting.getHeaderJsonWithTKN() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  getVersionMobile(version: string): Observable<any> {
    return this.http.get(setting.DOMAIN_URL + '/userservices/mobileversion?ver=' + version)
      .map(res => {
        return res.json();
      }).timeout(40000);
  }

  updateLanguage(language): Observable<any> {
   
    return this.http.post(setting.DOMAIN_URL + '/usersessionservices/updateusersession?lan='+language, null, { headers: setting.getHeaderJsonWithTKN() })
      .map(res => {
        return res.json();
      }).timeout(40000);
  }




}
