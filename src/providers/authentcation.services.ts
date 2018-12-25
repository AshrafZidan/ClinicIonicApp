import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Observable } from "rxjs/Observable";




 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// General Classes /////////////////////////////////////////////
import { setting } from './../app/setting';
import { Employee } from '../models/Employee.model';
import { database } from 'firebase';


@Injectable()
export class AuthentcationServices {


  constructor(public http: Http , public db:AngularFireAuth   , public firebase:AngularFireDatabase )  {
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
//////////////////////////////////////////////////////////////////////////////
PUSHNOTIFICATION(data): Observable<any> {
  console.log(data);

  return this.http.post('https://onesignal.com/api/v1/notifications',data, { headers: setting.getHeaderJson() })
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

  
  // login with firebase auth 
  LoginFirebase(email:string , password:string){
    return this.db.auth.signInWithEmailAndPassword(email  , password)
      
  }


  validateUser() {
    return this.db.auth.currentUser
 
} 


LogoutFirebase(){
    return this.db.auth.signOut();
      
  }

  openAccount(employee: Employee) {
   return this.firebase.database.ref('/Employee' ).push(employee);
    }
  

    checkUser(fun){
    return  this.db.auth.onAuthStateChanged(fun)
    
  }


  getBankDetails(datas){
  
      let companyId = localStorage.getItem('userId');
      return this.firebase.database.ref('/Company/' + companyId).on('value',datas );

  }

  getBankById(bankId , datas){

    return this.firebase.database.ref('/Bank/' + bankId ).on('value', datas);

  }


  addDeviceToken(BankId , Token){

    let val  = {
      token:Token
    }

    return this.firebase.database.ref('/Bank/' + BankId + '/Tokens').push(val);


  }

  
  GetAllDeviceToken( BankId , Token , func){

    return this.firebase.database.ref('/Bank/' + BankId + '/Tokens').orderByChild('token').equalTo(Token).on('value', func)


  }

  getAllDeviceBankToEmployee(BankId , func){
    return this.firebase.database.ref('/Bank/' + BankId + '/Tokens').on('value', func)
  }

  removeBankTocken(bankId , tokenId){
    return this.firebase.database.ref('/Bank/' + bankId + '/Tokens/'+tokenId).remove();
  }





  GetAllDeviceToken_Company( company_Id , Token , func){

    return this.firebase.database.ref('/Company/' + company_Id + '/Tokens').orderByChild('token').equalTo(Token).on('value', func)


  }


  

  addDeviceToken_Company(companyID , Token){

    let val  = {
      token:Token
    }

    return this.firebase.database.ref('/Company/' + companyID + '/Tokens').push(val);


  }


  getAllDeviceCompanyToEmployee(companyId , func){
    return this.firebase.database.ref('/Company/' + companyId + '/Tokens').on('value', func)
  }
  removeCompanyTocken(companyId , tockenId){
    return this.firebase.database.ref('/Company/' + companyId + '/Tokens'+tockenId).remove();
  }



}
