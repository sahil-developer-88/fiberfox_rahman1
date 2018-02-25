import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import {CommonService} from '../../common/_services/common.service';
import { Subcategory } from './subcategory.model';

@Injectable()
export class SubcategoryService {

    private url:string='Subcategory';

    constructor(private http: Http,private _commonService:CommonService) {
    }


    create(data: Subcategory): Observable<any> {
        return this.http.post(this.url, data)
        .map(response => response.json());
        //.catch(this.handleError);
    }

    update(data: Subcategory): Observable<any> {
        return this.http.put(this.url, data)
        .map(response => response.json());
    }    
    delete(id:number): Observable<any> {
        return this.http.delete(this.url+'/'+ id)
        .map(response => response.json());
    }

    get(): Observable<Subcategory[]> {

        return this.http.get(this.buildRequestUrl(''))
        .map(response =>JSON.parse( response.json()) as Subcategory[]);
    }

    getByCategory(categoryId:number): Observable<Subcategory[]> {

        return this.http.get(this.url+'/getByCategory/'+ categoryId)
        .map(response =>JSON.parse( response.json()) as Subcategory[]);
    }
    

    find(id:number): Observable<Subcategory> {
        return this.http.get(this.url+'/'+ id)
        .map(response =>JSON.parse( response.json()) as Subcategory);
    }


    //helpers
    private buildRequestUrl(actionUrl: string) {        
      return this._commonService.buildRequestUrl(this.url,actionUrl);
    }

}