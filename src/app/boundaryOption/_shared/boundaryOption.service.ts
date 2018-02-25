import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { BoundaryOption } from './boundaryOption.model';

@Injectable()
export class BoundaryOptionService {

    private url:string='BoundaryOption';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: BoundaryOption): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: BoundaryOption): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<BoundaryOption[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as BoundaryOption[]);
    }

getByBoundary(BoundaryId:number): Observable<BoundaryOption[]> {

        return this.http.get(this.url+'/getByBoundary/'+ BoundaryId)
        .map(response =>JSON.parse( response.json()) as BoundaryOption[]);
    }
    
    
    find(id:number): Observable<BoundaryOption> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as BoundaryOption);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}