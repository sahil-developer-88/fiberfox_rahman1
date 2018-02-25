import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {InterceptedHttp} from "./http.interceptor";
import {LoaderService} from '../loader/loader.service';
import {LocalStorageService} from '../../base/_services/localstorage.service';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,router:Router,
	loaderService:LoaderService,_localStorageService:LocalStorageService): Http {
    return new InterceptedHttp(xhrBackend, requestOptions,router,loaderService,_localStorageService);
}