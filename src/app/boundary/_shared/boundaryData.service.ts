import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { BoundaryData } from './boundaryData.model';

@Injectable()
export class BoundaryDataService {

    private url:string='BoundaryData';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: BoundaryData): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: BoundaryData): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<BoundaryData[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as BoundaryData[]);
    }

getByTopicParam(topicParamId:number): Observable<BoundaryData[]> {

        return this.http.get(this.url+'/getByTopicParam/'+topicParamId)
        .map(response =>JSON.parse( response.json()) as BoundaryData[]);
    }

    getBySubtopic(subTopicId:number): Observable<BoundaryData[]> {

        return this.http.get(this.url+'/getBySubtopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as BoundaryData[]);
    }
    
    
    find(id:number): Observable<BoundaryData> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as BoundaryData);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}