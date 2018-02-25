import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Router } from '@angular/router';
import {LoaderService} from '../loader/loader.service';
import {LocalStorageService} from '../../base/_services/localstorage.service';

@Injectable()
export class InterceptedHttp extends Http {
    router: Router;
    loaderService:LoaderService;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,private _router: Router,
        private _loaderService:LoaderService,private _localStorageService:LocalStorageService) {
        super(backend, defaultOptions);
        this.router = _router;
        this.loaderService=_loaderService;
    }    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        let data=body;//url.endsWith('token')?body:JSON.stringify(body);//fr token url only
        return this.intercept(super.post(url, data, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    private updateUrl(req: string) {
        this.showLoader();
        // return 'http://localhost:3000/api' +'/'+ req;
        return 'https://fiberfox-backend.herokuapp.com/api' +'/'+ req;
        
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        //options.withCredentials=true;
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', this._localStorageService.getAuthToken());
        //options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return options;
    }

    
    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        //return observable.map(response => response.json())
        return observable.catch((err, source) => {
            if (err.status === 401) {
                alert('You are not authorized to access the resource');
                this._localStorageService.clearAuthToken();
                //setTimeout(() => this.router.navigate(['/login']), 3000);
                setTimeout(() => document.location.href='/login', 500);                
                return Observable.empty();
            }
            else if (err.status === 404) {
                console.log(['http service',err]);
                 document.location.href='#/not-found';                
                return Observable.empty();
            }
             else {
                console.log(['htto errir',err]);
                err.errors=this.parseErrors(err);
                return Observable.throw(err);
            }
        }).finally(() => {
            this.onEnd();
        });
    }
     parseErrors(response:any): Array<string>
   {
   let errors:Array<string>=new Array<string>();

    if (response) {
      response=JSON.parse(response._body);
      if (response.error_description) {
        errors.push(response.error_description);
      }

      if (response.message) {
        errors.push(response.message);
      }
      for (var key in response.modelState) {
        for (var i = 0; i < response.modelState[key].length; i++) {
          errors.push(response.modelState[key][i]);
        }
      }
    }
    else {
     errors.push('Server response null');
    }
    return errors;
  }

}