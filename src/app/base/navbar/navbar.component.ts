import {Component, Input,OnInit,OnDestroy,OnChanges} from '@angular/core';

import {Router} from '@angular/router';

import {AccountService} from '../../account/_shared/account.service';
import {LoginResponseModel,RegisterModel} from '../../account/_shared/account.model';
import { Subscription } from 'rxjs/Subscription';
//import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers:[AccountService]
})
export class NavbarComponent implements OnInit ,OnDestroy,OnChanges{

constructor(private _router:Router, private _accountService:AccountService){
    //,private _notificationsService:NotificationsService

  }

  private subscription:Subscription;
  loginResponseModel:LoginResponseModel;


  ngOnInit():void{
    this.loginResponseModel=this._accountService.getAuthInfo();
  }


ngOnChanges(){
  
}
  ngOnDestroy() {
  }

  logOut():void{
      this._accountService.clearAuthToken();
      document.location.href='/home';
  }

}
