import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { TopicParamData } from './TopicParamData.model';

@Injectable()
export class TopicParamDataService {

    private url:string='TopicParamData';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: TopicParamData): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: TopicParamData): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<TopicParamData[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as TopicParamData[]);
    }

getBySubtopic(subTopicId:number): Observable<TopicParamData[]> {

        return this.http.get(this.url+'/getBySubtopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as TopicParamData[]);
    }
    
    
    find(id:number): Observable<TopicParamData> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as TopicParamData);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}