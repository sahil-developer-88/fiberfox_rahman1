import { Component,OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,} from '@angular/router';

import {LocalStorageService} from '../_services/localstorage.service';
import {BreadCrumb} from './_shared/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers:[]
})
export class BreadCrumbComponent implements OnInit {

  active:boolean=true;
  breadCrumbs:BreadCrumb[]=[];
@Input() pageNumber:number;
  constructor(private route: ActivatedRoute,private _router:Router,private _localStorageService:LocalStorageService){

this.route.params.subscribe(params => {
	//this.subCategoryId = +params['subCategoryId'];
    
});
  }

  ngOnInit(){
    let breadCrumbJson=this._localStorageService.getData('breadCrumb');
    if(breadCrumbJson){
    this.breadCrumbs=JSON.parse(breadCrumbJson) as BreadCrumb[];
    this.breadCrumbs=this.breadCrumbs.filter(d=>d.PageNumber<this.pageNumber);
  }}

}
