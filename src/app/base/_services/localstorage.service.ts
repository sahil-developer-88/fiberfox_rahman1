import { Injectable } from '@angular/core';

import { LoginResponseModel} from '../../account/_shared/account.model';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

setAuthToken(loginResponse:LoginResponseModel,persistent:Boolean): void {
  
  if (persistent) {
      localStorage['access_token'] = loginResponse.access_token;
  } else {
      sessionStorage['access_token'] = loginResponse.access_token;
  }
}
getAuthToken(): string {
    let access_token = sessionStorage['access_token'] || localStorage['access_token'];
    if (access_token)
        return access_token;
    else
        return null;
}

clearAuthToken() : void {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
}

setData(keyName:any, value:any, persistent:boolean) :void{
    if (persistent) {
        localStorage[keyName] = value;
    } else {
        sessionStorage[keyName] = value;
    }
}
getData(keyName:any):string {
    let value = sessionStorage[keyName] || localStorage[keyName];
    if (value)
        return value;
    else
        return null;
}
clearKey(keyName:any):void {
    localStorage.removeItem(keyName);
    sessionStorage.removeItem(keyName);
}

}