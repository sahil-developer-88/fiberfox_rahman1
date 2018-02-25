import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { SubTopicDetail } from './SubTopicDetail.model';

@Injectable()
export class SubTopicDetailService {

    private url:string='SubTopicDetail';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: SubTopicDetail): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: SubTopicDetail): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<SubTopicDetail[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as SubTopicDetail[]);
    }
    
    getBySubTopic(subTopicId:number): Observable<SubTopicDetail[]> {

        return this.http.get(this.url+'/getBySubTopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as SubTopicDetail[]);
    }
    
    find(id:number): Observable<SubTopicDetail> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as SubTopicDetail);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}