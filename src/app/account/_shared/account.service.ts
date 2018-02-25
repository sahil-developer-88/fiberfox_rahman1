import { Injectable } from '@angular/core';

import { RegisterModel, LoginModel,LoginResponseModel} from './account.model';
import {LocalStorageService} from '../../base/_services/localstorage.service';

  import { Http } from '@angular/http';
  import { Observable } from "rxjs/Rx";

  @Injectable()
  export class AccountService {
private url:string='User';

    constructor(private http: Http,private localStorageService:LocalStorageService) {
      //this.localStorageService=new LocalStorageService();
    }


    registerUser(register: RegisterModel): Observable<LoginResponseModel> {
      return this.http.post(this.url, register)
      .map(response => response.json() as LoginResponseModel);
      //.catch(this.handleError);
    }

    authenticate(login: LoginModel): Observable<LoginResponseModel> {
      let data='email=' + encodeURIComponent(login.Email)+
      '&password=' + encodeURIComponent(login.password);
      return this.http.post(this.url+'/login', login)
      .map(response => response.json() as LoginResponseModel);
    }

    logOut():Observable<any>{
      let d=  this.http.post('account/Logout',{})
      .map(response => response.json());
      this.clearAuthToken();
      return d;
    }

    getUserInfo(): Observable<RegisterModel> {
      return this.http.get('manage')
      .map(response => response.json() as RegisterModel);
      //.catch(this.handleError);
    }

    findByUserName(subDomain:string): Observable<RegisterModel> {
      return this.http.get('Manage/FindByUserName/'+subDomain)
      .map(response => response.json() as RegisterModel);
      //.catch(this.handleError);
    }

    //helpers
    saveAuthInfo(loginResponse:LoginResponseModel,isPersistent:boolean):void{
      this.localStorageService.setAuthToken(loginResponse, isPersistent);
      this.localStorageService.setData('authInfo',JSON.stringify (loginResponse),isPersistent);
      //this.localStorageService.setData('userName',loginResponse.UserName,isPersistent);
      //this.localStorageService.setData('email',loginResponse.Email,isPersistent);
    }
    getAuthInfo():LoginResponseModel{
      let loginResponse:LoginResponseModel=new LoginResponseModel();
      //loginResponse.UserName=this.localStorageService.getData('userName');
      //loginResponse.roleName=this.localStorageService.getData('roleName');
      //loginResponse.UserName=this.localStorageService.getData('userName');
      loginResponse=JSON.parse(this.localStorageService.getData('authInfo'));
      if(loginResponse)
      loginResponse.IsAuthenticated=this.isAuthenticated();
    else
      loginResponse=new LoginResponseModel();
      return loginResponse;
    }
    clearAuthToken():void{
      this.localStorageService.clearAuthToken();
    }
    isAuthenticated():boolean{
      let access_tokken=this.localStorageService.getAuthToken();
      let isAuth:boolean=(access_tokken && access_tokken!=null)?true:false;
      return isAuth;
    }
  }