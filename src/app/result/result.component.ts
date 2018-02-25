import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {ResultMenuService} from './_shared/resultMenu.service';
import {ResultMenu} from './_shared/resultMenu.model';

import {ResultSubMenuService} from './_shared/resultSubMenu.service';
import {ResultSubMenu} from './_shared/resultSubMenu.model';

import {ArticleService} from './_shared/article.service';
import {Article} from './_shared/article.model';

import {SubTopicDetailService} from '../subTopicDetail/_shared/subTopicDetail.service';
import {SubTopicDetail} from '../subTopicDetail/_shared/subTopicDetail.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers:[ResultMenuService,ResultSubMenuService,ArticleService,SubTopicDetailService]
})
export class ResultComponent implements OnInit {

  active:boolean=true;
  currentPage:number=7;
  subTopicDetails:SubTopicDetail[]=[];
  menuItems:ResultMenu[]=[];
  subMenuItems:ResultSubMenu[]=[];
  article:Article;
  expandedMenuId:number;
  subMenuId:number;
  subTopicId:number;
  subTopicDetailId:number;

  constructor(private _router:Router,private route: ActivatedRoute,private _location:Location,
    private _resultMenuService:ResultMenuService,private _resultSubMenuService:ResultSubMenuService,
    private _articleService:ArticleService,private _subTopicDetailService:SubTopicDetailService){

  }

  ngOnInit(){
    
    this.route.params.subscribe(params => {
      this.subTopicId = +params['subTopicId'];
      this.subTopicDetailId = +params['subTopicDetailId'];
      
      this.getSubTopicDetailsBySubTopic(this.subTopicId);
      // if(this.subTopicDetailId>0)
      // {    this.getMenuBySubTopicDetail();  }
      //   else
      //     this.getMenuBySubTopic(); 

    });
  }

  toggleMenuItem(menuId:number):void{
    if(menuId==this.expandedMenuId)
    {
      this.expandedMenuId=0;
     }
     else
     {
      this.expandedMenuId=menuId; 
      this.getSubMenuItems(this.expandedMenuId);
     }
  }

  
  getSubTopicDetailsBySubTopic(subtopicId:number):void{
  this._subTopicDetailService.getBySubTopic(subtopicId).subscribe((response)=> {  
     this.subTopicDetails=response;
      
     if(this.subTopicDetailId>0)
       this.subTopicDetails=this.subTopicDetails.filter(d=>d.Id==this.subTopicDetailId);
     else{
       //if skipped it will come here.
       //at skipp we need to show one record only so fetch first only
       //for target page skip
       let subDetails=this.subTopicDetails.filter(d=>d.HasTargetOptions===true);
       if(subDetails.length==this.subTopicDetails.length){
        let topfirtId=this.subTopicDetails[0].Id;
         this.subTopicDetails=this.subTopicDetails.filter(d=>d.Id==topfirtId);
       }

        //for boundary skip
        subDetails=this.subTopicDetails.filter(d=>d.HasBoundaryConditions===true);
       if(subDetails.length==this.subTopicDetails.length){
        let topfirtId=this.subTopicDetails[0].Id;
         this.subTopicDetails=this.subTopicDetails.filter(d=>d.Id==topfirtId);
       }
       }

    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}

  getMenuBySubTopicDetail():void{
    this._resultMenuService.getBySubTopicDetail(this.subTopicId,this.subTopicDetailId).subscribe((response)=> {    
      this.menuItems=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }


getSubMenuItems(menuId:number):void{
    this._resultSubMenuService.getByMenu(menuId).subscribe((response)=> {    
      this.subMenuItems=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
   
showContent(subMenu:ResultSubMenu):void{
  this.subMenuId=subMenu.Id;
    this._articleService.getBySubMenu(this.subMenuId).subscribe((response)=> {    
      this.article=response[0];
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
  onShowContent(subMenu:ResultSubMenu):void{
  this.subMenuId=subMenu.Id;
    this._articleService.getBySubMenu(this.subMenuId).subscribe((response)=> {    
      this.article=response[0];
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }

    previousView():void{
       this._location.back();
}

finishResult():void{
  this._resultMenuService.endSession().subscribe((response)=> {    
  this._router.navigate(['/finish']);
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  
}

}
