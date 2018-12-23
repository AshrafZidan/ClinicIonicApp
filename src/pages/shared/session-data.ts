

export class sessionData {
  
    public static userId: number;
    public static userName: string;
    public static userPhone: string;
    public static userGender: string;
    public static userType: string;
    public static userpictureToken: string;
    public static userNumberNotification: number;
    public static userToken: string;
    public static userPassword: string;
    public static userVerificationNeeded: boolean;
    public static notificationId:string;
    public static passwordNeedChange:string="false";
    public static language: string ;
    
  
  
    static saveDataInLocalStorage() {
      localStorage.setItem('userId', sessionData.userId + "");
      localStorage.setItem('userName', sessionData.userName + "");
      localStorage.setItem('userPhone', sessionData.userPhone + "");
      localStorage.setItem('userGender', sessionData.userGender + "");
      localStorage.setItem('userType', sessionData.userType + "");
      localStorage.setItem('userpictureToken', sessionData.userpictureToken + "");
      localStorage.setItem('userNumberNotification', sessionData.userNumberNotification + "");
      localStorage.setItem('userToken', sessionData.userToken + "");
      localStorage.setItem('userPassword', sessionData.userPassword + "");
      localStorage.setItem('userVerificationNeeded', sessionData.userVerificationNeeded + "");
      localStorage.setItem('notificationId', sessionData.notificationId + "");
      localStorage.setItem('passwordNeedChange', sessionData.passwordNeedChange + "");
      localStorage.setItem('Language', sessionData.language + "");
      
    }
  
    static getDataFromLocalstorage() {
      sessionData.userId = Number(localStorage.getItem('userId'));
      sessionData.userName = localStorage.getItem('userName');
      sessionData.userPhone = localStorage.getItem('userPhone');
      sessionData.userGender = localStorage.getItem('userGender');
      sessionData.userPassword=localStorage.getItem('userPassword');
      sessionData.userType = localStorage.getItem('userType');
      sessionData.userpictureToken = localStorage.getItem('userpictureToken');
      sessionData.userNumberNotification = Number(localStorage.getItem('userNumberNotification'));
      sessionData.userToken = localStorage.getItem('userToken');
      sessionData.userVerificationNeeded = Boolean(localStorage.getItem('userVerificationNeeded'));
      sessionData.notificationId= localStorage.getItem('notificationId');
      sessionData.passwordNeedChange= localStorage.getItem('passwordNeedChange');
      sessionData.language=localStorage.getItem('Language');
    }
  
    static saveDataInsession(data) {
      sessionData.userId = data.userDetails.userId;
      sessionData.userName = data.userDetails.userName;
      sessionData.userGender = data.userDetails.gender;
      sessionData.userNumberNotification = data.userDetails.numOfNotifications;
      sessionData.userPhone = data.userDetails.phone;
      sessionData.userType = data.userDetails.type;
      sessionData.userpictureToken = data.userDetails.picture_url;
      sessionData.userToken = data.tkn;
      sessionData.userVerificationNeeded = data.userDetails.validMobile;
      sessionData.notificationId=data.userDetails.notificationId;
      sessionData.passwordNeedChange=data.userDetails.resetPasswordNeeded;
      if(data.language=="Arabic"){
        sessionData.language="ar";          
      }else{
        sessionData.language="en";                
      }
      
    }

static saveDataInSingUpToVerifyCode(userId:number,userPhone:string,userPassword:string,userName:string){
  sessionData.userId=userId;
  sessionData.userPhone=userPhone;
  sessionData.userPassword=userPassword;
  sessionData.userName=userName;
  sessionData.userVerificationNeeded=true;
  localStorage.setItem('userName', sessionData.userName + "");
  localStorage.setItem('userPhone', sessionData.userPhone + "");
  localStorage.setItem('userPassword', sessionData.userPassword + "");
  localStorage.setItem('userId', sessionData.userId + "");
  localStorage.setItem('userVerificationNeeded', sessionData.userVerificationNeeded + "");
  
}

static saveDataInForgetPassToChangePass(userId:number,userPhone:string,passwordNeedChange:string){
  sessionData.userId=userId;
  sessionData.userPhone=userPhone;
  sessionData.passwordNeedChange=passwordNeedChange;
  localStorage.setItem('userId', sessionData.userId + "");
  localStorage.setItem('userPhone', sessionData.userPhone + "");
  localStorage.setItem('passwordNeedChange', sessionData.passwordNeedChange + "");
}
static saveDataInLoginToVerifyCode(userPassword:string){
  sessionData.userPassword=userPassword;
  localStorage.setItem('userPassword', sessionData.userPassword + ""); 
}

    static clearDateFromLocalStorage(){
      localStorage.setItem('userId', "");
      localStorage.setItem('userName',  "");
      localStorage.setItem('userPhone', "");
      localStorage.setItem('userGender',  "");
      localStorage.setItem('userType',  "");
      localStorage.setItem('userpictureToken',  "");
      localStorage.setItem('userNumberNotification',  "");
      localStorage.setItem('userToken', "");
      localStorage.setItem('userPassword',"");
      localStorage.setItem('userVerificationNeeded', "");
      localStorage.setItem('passwordNeedChange', "");
    }

    static clearDataInsession() {
      sessionData.userId = null;
      sessionData.userName = "";
      sessionData.userGender ="";
      sessionData.userNumberNotification = null;
      sessionData.userPhone = "";
      sessionData.userType = "";
      sessionData.userpictureToken ="";
      sessionData.userToken ="";
      sessionData.userVerificationNeeded =null;
      sessionData.notificationId="";
      sessionData.passwordNeedChange="";
    }

  
  // static setNotifyIdInSession(notifyId){
  //     sessionData.notificationId=notifyId;
  
  // }
  
  // static setNotifyIdInLocalStorage(){
  //     localStorage.setItem('notificationId', sessionData.notificationId + "");
  
  // }
  static checkPermission(navController,code){
  if (code == 1013) {
        navController.setRoot('Language');
         sessionData.clearDateFromLocalStorage();
        sessionData.getDataFromLocalstorage();
  }
  }
  
  
  
  }
  