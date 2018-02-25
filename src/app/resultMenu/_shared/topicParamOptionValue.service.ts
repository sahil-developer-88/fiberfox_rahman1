import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { TopicParamOptionValue } from './topicParamOptionValue.model';

@Injectable()
export class TopicParamOptionValueService {

    private url:string='TopicParamOptionValue';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: TopicParamOptionValue): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: TopicParamOptionValue): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<TopicParamOptionValue[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as TopicParamOptionValue[]);
    }

    getByTopicParam(topicParamId:number): Observable<TopicParamOptionValue[]> {

        return this.http.get(this.url+'/getByTopicParam/'+ topicParamId)
        .map(response =>JSON.parse( response.json()) as TopicParamOptionValue[]);
    }
    getBySubtopic(subTopicId:number): Observable<TopicParamOptionValue[]> {

        return this.http.get(this.url+'/getBySubtopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as TopicParamOptionValue[]);
    }
    getBySubMenu(resultSubMenuId:number): Observable<TopicParamOptionValue[]> {

        return this.http.get(this.url+'/getBySubMenu/'+ resultSubMenuId)
        .map(response =>JSON.parse( response.json()) as TopicParamOptionValue[]);
    }
    getByMenu(resultMenuId:number): Observable<TopicParamOptionValue[]> {

        return this.http.get(this.url+'/getByMenu/'+ resultMenuId)
        .map(response =>JSON.parse( response.json()) as TopicParamOptionValue[]);
    }
    
    
    find(id:number): Observable<TopicParamOptionValue> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as TopicParamOptionValue);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}