import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import {LoginResponseModel, RegisterModel } from '../_shared/account.model';
import { AccountService } from '../_shared/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AccountService]
})
export class RegisterComponent implements OnInit {

 myInnerHeight:number= window.innerHeight;

  registerModel: RegisterModel = new RegisterModel();
  active: Boolean = true;
  errors: Array<string>=new Array<string>();
  submitted:boolean=false;
  loginResponse: LoginResponseModel;
  
  constructor(private _accountService: AccountService, private _router: Router) {
  }

  ngOnInit() {
  }

  registerUser(): boolean {
    this.submitted=true;
    this._accountService.registerUser(this.registerModel).subscribe((response)=> {
      let data:any=response;
      this.loginResponse =JSON.parse(data);
      this._accountService.saveAuthInfo(this.loginResponse,this.registerModel.RememberMe);
      this.registerModel = new RegisterModel();
      this.active = false;
      setTimeout(() => this.active = true, 0);
      document.location.href='/dashboard';
            //this._router.navigate(['/dashboard']);
    },(errorResponse)=>{
      this.submitted=false;
          //this.parseErrors(errorResponse);
        this.errors=  errorResponse.errors;
    });


    // https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes
    return false;
  }

}
