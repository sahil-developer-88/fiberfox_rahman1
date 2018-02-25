import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { Activity } from './Activity.model';

@Injectable()
export class ActivityService {

    private url:string='Activity';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: Activity): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: Activity): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<Activity[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as Activity[]);
    }
    

    find(id:number): Observable<Activity> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as Activity);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}