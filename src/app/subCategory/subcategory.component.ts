import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

import {SubcategoryService} from './_shared/subCategory.service';
import {Subcategory} from './_shared/subCategory.model';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls:['./subcategory.component.css'],
  providers:[SubcategoryService]
})
export class SubcategoryComponent implements OnInit {

@Input() categoryId:number;
subCategories:Subcategory[]=[];
@Output()   onSubcategorySelected = new EventEmitter<Subcategory>();
constructor(private _subcategoryService:SubcategoryService,
  private _router:Router){

 }

ngOnInit(){
  if(this.categoryId)
  {
    // console.log(this.categoryId);
    this.getSubcategoriesByCategory(this.categoryId);
  }

}

getSubcategoriesByCategory(categoryId:number):void{
  this._subcategoryService.getByCategory(categoryId).subscribe((response)=> {   
      console.log(response);
      this.subCategories=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });

}

getSubcategories():void{
	this._subcategoryService.get().subscribe((response)=> {   
      //this.allSubCategories=response;
      console.log(this.subCategories);       
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });

}


subcategorySelected(subcategory:Subcategory):void{
  //this._router.navigate(['/phase/'+subcategory.Id]);
  //this._router.navigate(['/phase/'+subcategory.Id+'/'+subcategory.Name]);
  console.log(subcategory);
  this.onSubcategorySelected.emit(subcategory);
}

}
