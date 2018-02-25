import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { BoundaryOptionValue } from './boundaryOptionValue.model';

@Injectable()
export class BoundaryOptionValueService {

    private url:string='BoundaryOptionValue';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: BoundaryOptionValue): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: BoundaryOptionValue): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<BoundaryOptionValue[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as BoundaryOptionValue[]);
    }

    getByBoundary(BoundaryId:number): Observable<BoundaryOptionValue[]> {

        return this.http.get(this.url+'/getByBoundary/'+ BoundaryId)
        .map(response =>JSON.parse( response.json()) as BoundaryOptionValue[]);
    }
    getBySubtopic(subTopicId:number): Observable<BoundaryOptionValue[]> {

        return this.http.get(this.url+'/getBySubtopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as BoundaryOptionValue[]);
    }
    getBySubMenu(resultSubMenuId:number): Observable<BoundaryOptionValue[]> {

        return this.http.get(this.url+'/getBySubMenu/'+ resultSubMenuId)
        .map(response =>JSON.parse( response.json()) as BoundaryOptionValue[]);
    }
    getByMenu(resultMenuId:number): Observable<BoundaryOptionValue[]> {

        return this.http.get(this.url+'/getByMenu/'+ resultMenuId)
        .map(response =>JSON.parse( response.json()) as BoundaryOptionValue[]);
    }
    
    
    find(id:number): Observable<BoundaryOptionValue> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as BoundaryOptionValue);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}