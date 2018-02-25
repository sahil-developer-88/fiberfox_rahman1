import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import {LoginModel, LoginResponseModel } from '../_shared/account.model';
import { AccountService } from '../_shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService]
})
export class LoginComponent implements OnInit {

 myInnerHeight:number= window.innerHeight;

  loginModel: LoginModel = new LoginModel();
  active: Boolean = true;
  errors: Array<string>=new Array<string>();
  submitted:boolean=false;
  
  loginResponse: LoginResponseModel;
  
  constructor(private _accountService: AccountService, private _router: Router) {
  }

  ngOnInit() {
  }

  authenticate(): boolean {
    this.submitted=true;
    this._accountService.authenticate(this.loginModel).subscribe((response)=> {
      let data:any=response;
      this.loginResponse =JSON.parse(data);
      console.log(this.loginResponse);
      this._accountService.saveAuthInfo(this.loginResponse,this.loginModel.rememberMe);
      this.loginModel = new LoginModel();
      this.active = false;
      setTimeout(() => this.active = true, 0);
      //this._router.navigate(['/dashboard']);
     document.location.href='/dashboard';
    },(errorResponse)=>{
      this.submitted=false;
          this.errors=  errorResponse.errors;
    });
    return false;
  }

}
