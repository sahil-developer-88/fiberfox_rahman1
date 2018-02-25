import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {CategoryService} from './_shared/category.service';
import {Category} from './_shared/category.model';

import {Subcategory} from '../subCategory/_shared/subCategory.model';

import {LocalStorageService} from '../base/_services/localstorage.service';
import {BreadCrumb} from '../base/breadcrumb/_shared/breadcrumb.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

  active:boolean=true;
  categoryId:number;
  categories:Category[]=[];
  secCategories:Category[]=[];

  constructor(private _categoryService:CategoryService,private route: ActivatedRoute,
    private _router:Router,private _localStorageService:LocalStorageService,private _location:Location){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
    this.categoryId = +params['categoryId'];
    if(this.categoryId>0)
    this.findCategory(this.categoryId);
  else
    this.getCategory();
});
  }

  getCategory():void{
    this._categoryService.get().subscribe((response)=> {    
      this.categories=response;

this.categories=response.sort(function(a, b) {    return a.OrderPriority - b.OrderPriority;});
      //handle design part
      this.categories=this.categories.splice(0,2);
      this.secCategories=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
  findCategory(categoryId:number):void{
    this._categoryService.find(categoryId).subscribe((response)=> {    
      this.categories[0]=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
  onSubcategorySelected(subcategory:Subcategory,categoryStatus: any):void{
    console.log('hiii');
    
    let category;
    if(categoryStatus == 0)
    {
      console.log(this.categories);
      category=this.categories.filter(d=>d.Id==subcategory.CategoryId)[0];
    }
    else
    {
      if(categoryStatus == 1)
      {
        category=this.secCategories.filter(d=>d.Id==subcategory.CategoryId)[0];
      }      
    }
    
    
    let redirectUrl='/phase/'+category.Id+'/'+category.Name+'/'+ subcategory.Id+'/'+subcategory.Name;
    console.log('redirectUrl');
    console.log(redirectUrl);
    this.handleBreadCrumb(category,subcategory,true);
    this._router.navigate([redirectUrl]);
  }

  handleBreadCrumb(category:Category,subcategory:Subcategory, isSave:boolean):void{
    let breadCrumbJson=this._localStorageService.getData('breadCrumb');
    let breadCrumbs:BreadCrumb[]=JSON.parse(breadCrumbJson) as BreadCrumb[];

    let currentPath=this._location.path();
    breadCrumbs=[]; //so it will not add double time

    let catBreadCrumb:BreadCrumb={Id:category.Id,RedirectUrl:currentPath,Name:category.Name,PageNumber:1};
    let subBreadCrumb:BreadCrumb={Id:subcategory.Id,RedirectUrl:currentPath,Name:subcategory.Name,PageNumber:1};

    if(isSave)
    {
      breadCrumbs.push(catBreadCrumb);
      breadCrumbs.push(subBreadCrumb);
    }

    this._localStorageService.setData('breadCrumb',JSON.stringify(breadCrumbs),false);

  }

}
