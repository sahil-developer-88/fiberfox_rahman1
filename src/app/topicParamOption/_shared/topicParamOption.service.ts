import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { TopicParamOption } from './TopicParamOption.model';

@Injectable()
export class TopicParamOptionService {

    private url:string='TopicParamOption';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: TopicParamOption): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: TopicParamOption): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<TopicParamOption[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as TopicParamOption[]);
    }

getByTopicParam(topicParamId:number): Observable<TopicParamOption[]> {

        return this.http.get(this.url+'/getByTopicParam/'+ topicParamId)
        .map(response =>JSON.parse( response.json()) as TopicParamOption[]);
    }
    getBySubTopic(subTopicId:number): Observable<TopicParamOption[]> {

        return this.http.get(this.url+'/getBySubTopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as TopicParamOption[]);
    }
    
    find(id:number): Observable<TopicParamOption> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as TopicParamOption);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}