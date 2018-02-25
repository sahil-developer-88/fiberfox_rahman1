import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { Boundary } from './boundary.model';

@Injectable()
export class BoundaryService {

    private url:string='Boundary';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: Boundary): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: Boundary): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<Boundary[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as Boundary[]);
    }

getByTopicParam(topicParamId:number): Observable<Boundary[]> {

        return this.http.get(this.url+'/getByTopicParam/'+topicParamId)
        .map(response =>JSON.parse( response.json()) as Boundary[]);
    }

    getBySubtopic(subTopicId:number): Observable<Boundary[]> {

        return this.http.get(this.url+'/getBySubtopic/'+ subTopicId)
        .map(response =>JSON.parse( response.json()) as Boundary[]);
    }
    
    
    find(id:number): Observable<Boundary> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as Boundary);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}