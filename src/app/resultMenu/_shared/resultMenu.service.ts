import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { ResultMenu } from './resultMenu.model';

@Injectable()
export class ResultMenuService {

    private url:string='ResultMenu';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: ResultMenu): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: ResultMenu): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<ResultMenu[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as ResultMenu[]);
    }
    getBySubTopic(SubTopicId:number): Observable<ResultMenu[]> {

        return this.http.get(this.url+'/getBySubTopic/'+ SubTopicId)
        .map(response =>JSON.parse( response.json()) as ResultMenu[]);
    }
    getBySubTopicDetail(SubTopicId:number,SubTopicDetailId:number): Observable<ResultMenu[]> {

        return this.http.get(this.url+'/getBySubTopicDetail/'+ SubTopicId+'/'+SubTopicDetailId)
        .map(response =>JSON.parse( response.json()) as ResultMenu[]);
    }
    

    find(id:number): Observable<ResultMenu> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as ResultMenu);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}