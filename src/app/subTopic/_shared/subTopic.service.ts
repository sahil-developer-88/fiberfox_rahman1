import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { Subtopic } from './subTopic.model';

@Injectable()
export class SubtopicService {

    private url:string='Subtopic';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: Subtopic): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: Subtopic): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<Subtopic[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as Subtopic[]);
    }
    
    getBySubcategoryActivity(subCategoryId:number,activityId:number): Observable<Subtopic[]> {

        return this.http.get(this.url+'/getBySubcategoryActivity/'+ subCategoryId+'/'+activityId)
        .map(response =>JSON.parse( response.json()) as Subtopic[]);
    }
    getBySubcategoryTopicActivity(subCategoryId:number,activityId:number,topicId:number): Observable<Subtopic[]> {

        return this.http.get(this.url+'/getBySubcategoryTopicActivity/'+ subCategoryId+'/'+activityId+'/'+topicId)
        .map(response =>JSON.parse( response.json()) as Subtopic[]);
    }

    find(id:number): Observable<Subtopic> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as Subtopic);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}