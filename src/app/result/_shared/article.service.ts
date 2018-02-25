import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { Article } from './article.model';

@Injectable()
export class ArticleService {

    private url:string='Article';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: Article): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: Article): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<Article[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as Article[]);
    }

    getBySubMenu(subMenuId:number): Observable<Article[]> {

        return this.http.get(this.url+'/getBySubMenu/'+ subMenuId)
        .map(response =>JSON.parse( response.json()) as Article[]);
    }
    

    find(id:number): Observable<Article> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as Article);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}