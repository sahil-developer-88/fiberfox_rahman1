import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { TopicParam } from './topicParam.model';

@Injectable()
export class TopicParamService {

    private url:string='TopicParam';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: TopicParam): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: TopicParam): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<TopicParam[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as TopicParam[]);
    }

getBySubtopic(subTopicId:number): Observable<TopicParam[]> {

        return this.http.get(this.url+'/getBySubtopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as TopicParam[]);
    }
    
    
    find(id:number): Observable<TopicParam> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as TopicParam);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}