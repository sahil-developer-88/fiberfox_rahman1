import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { ResultSubMenu } from './resultSubMenu.model';

@Injectable()
export class ResultSubMenuService {

    private url:string='ResultSubMenu';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: ResultSubMenu): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: ResultSubMenu): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<ResultSubMenu[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as ResultSubMenu[]);
    }

    getByMenu(menuId:number): Observable<ResultSubMenu[]> {

        return this.http.get(this.url+'/getByMenu/'+ menuId)
        .map(response =>JSON.parse( response.json()) as ResultSubMenu[]);
    }
    

    find(id:number): Observable<ResultSubMenu> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as ResultSubMenu);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}