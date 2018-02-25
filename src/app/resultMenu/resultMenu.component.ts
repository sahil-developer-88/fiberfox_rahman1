import { Component,EventEmitter,Output, OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {ResultMenuService} from './_shared/resultMenu.service';
import {ResultMenu} from './_shared/resultMenu.model';

import {ResultSubMenuService} from './_shared/resultSubMenu.service';
import {ResultSubMenu} from './_shared/resultSubMenu.model';

import {SubtopicService} from '../subTopic/_shared/subTopic.service';
import {Subtopic} from '../subTopic/_shared/subTopic.model';

import {SubTopicDetailService} from '../subTopicDetail/_shared/subTopicDetail.service';
import {SubTopicDetail} from '../subTopicDetail/_shared/subTopicDetail.model';

import {TopicParamOptionValueService} from './_shared/topicParamOptionValue.service';
import {TopicParamOptionValue} from './_shared/topicParamOptionValue.model';

import {TopicParamDataService} from '../targets/_shared/topicParamData.service';
import {TopicParamData} from '../targets/_shared/topicParamData.model';

import {BoundaryOptionValueService} from './_shared/boundaryOptionValue.service';
import {BoundaryOptionValue} from './_shared/boundaryOptionValue.model';

import {BoundaryDataService} from '../boundary/_shared/boundaryData.service';
import {BoundaryData} from '../boundary/_shared/boundaryData.model';

@Component({
  selector: 'app-resultMenu',
  templateUrl: './resultMenu.component.html',
  styleUrls: ['./resultMenu.component.css'],
  providers:[ResultMenuService,ResultSubMenuService,SubtopicService,SubTopicDetailService,TopicParamOptionValueService,TopicParamDataService,
  BoundaryDataService,BoundaryOptionValueService]
})
export class ResultMenuComponent implements OnInit {

  TopicParamData:TopicParamData[];
  TopicParamOptionValue:TopicParamOptionValue[];
  BoundaryData:BoundaryData[];
  BoundaryOptionValue:BoundaryOptionValue[];

  active:boolean=true;
  @Input() subTopicId:number;
  subtopic:Subtopic;
  subTopicDetail:SubTopicDetail;
  tempMenuItems:ResultMenu[]=[];
  menuItems:ResultMenu[]=[];
  tempsubMenuItems:ResultSubMenu[]=[];
  subMenuItems:ResultSubMenu[]=[];
  expandedMenuId:number;
  subMenuId:number;
  @Input() subtopicDetailId:number;
  @Output()   onShowContent = new EventEmitter<ResultSubMenu>();
  generalResultMenu:ResultMenu;
  constructor(private _router:Router,private route: ActivatedRoute,private _location:Location,
    private _resultMenuService:ResultMenuService,private _resultSubMenuService:ResultSubMenuService,
    private _subTopicDetailService:SubTopicDetailService,private _subtopicService:SubtopicService,
    private _topicParamOptionValueService:TopicParamOptionValueService,private _boundaryOptionValueService:BoundaryOptionValueService,
    private _topicParamDataService:TopicParamDataService,private _boundaryDataService:BoundaryDataService){

  }

  ngOnInit(){
    this.findSubTopicDetail(this.subtopicDetailId);
    this.findSubTopic(this.subTopicId);
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

  
  findSubTopic(subtopicId:number):void{
    this._subtopicService.find(subtopicId).subscribe((response)=> {  
      this.subtopic=response;

    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
  findSubTopicDetail(subtopicDetailId:number):void{
    this._subTopicDetailService.find(subtopicDetailId).subscribe((response)=> {  
      this.subTopicDetail=response;

      if(this.subtopicDetailId>0)
        this.getMenuBySubTopicDetail();  
      else
        this.getMenuBySubTopic(); 
      
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }

  getMenuBySubTopicDetail():void{
    this._resultMenuService.getBySubTopicDetail(this.subTopicDetail.SubTopicId,this.subtopicDetailId).subscribe((response)=> {    
      //this.tempMenuItems=response;
      this.handleGeneralContentDisplay(response);
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }

  getMenuBySubTopic():void{
    this._resultMenuService.getBySubTopic(this.subTopicDetail.SubTopicId).subscribe((response)=> {    
      //this.tempMenuItems=response;
      this.handleGeneralContentDisplay(response);
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
  getSubMenuItems(menuId:number):void{
    this._resultSubMenuService.getByMenu(menuId).subscribe((response)=> {    
      this.tempsubMenuItems=response;
      this.handleSubMenuAlgo();
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
  }
  
   //algo settings
   getTopicParamData(isSubMenu:boolean=false):void{
     this._topicParamDataService.getBySubtopic(this.subTopicDetail.SubTopicId).subscribe((response)=> {    
       this.TopicParamData=response;
       if(this.TopicParamData && this.TopicParamData.length>0)
         this.getTopicParamOptionValueBySubTopic(isSubMenu);
       else if(isSubMenu)
         this.subMenuItems=this.tempsubMenuItems;
       else
         this.menuItems=this.tempMenuItems;
     },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
   }

   getTopicParamOptionValueBySubTopic(isSubMenu:boolean=false):void{
     this._topicParamOptionValueService.getBySubtopic(this.subTopicDetail.SubTopicId).subscribe((response)=> {    
       this.TopicParamOptionValue=response;
       
       if(this.TopicParamOptionValue && this.TopicParamOptionValue.length>0)
       {
         if(isSubMenu)
           this.applySubMenuTargetRankingAlgo();
         else
           this.applyMainMenuTargetRankingAlgo();
       }
     },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
   }

   getBoundaryData(isSubMenu:boolean=false):void{
     this._boundaryDataService.getBySubtopic(this.subTopicDetail.SubTopicId).subscribe((response)=> {    
       this.BoundaryData=response;
       if(this.BoundaryData && this.BoundaryData.length>0)
         this.getBoundaryOptionValueBySubTopic(isSubMenu);
       else if(isSubMenu)
         this.subMenuItems=this.tempsubMenuItems;
       else
         this.menuItems=this.tempMenuItems;
     },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
   }
   getBoundaryOptionValueBySubTopic(isSubMenu:boolean=false):void{
     this._boundaryOptionValueService.getBySubtopic(this.subTopicDetail.SubTopicId).subscribe((response)=> {    
       this.BoundaryOptionValue=response;
       
       if(this.BoundaryOptionValue && this.BoundaryOptionValue.length>0)
       {
         if(isSubMenu)
           this.applySubMenuBoundaryRankingAlgo();
         else
           this.applyMainMenuBoundaryAlgo()

       }
     },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
   }
   
   
   handleMainMenuAlgo():void{
     if(this.subTopicDetail.HasBoundaryConditions){
       this.getBoundaryData(false);
    //this.applySubMenuTargetRankingAlgo();
  }
  else if(this.subTopicDetail.HasTargetOptions){
    this.getTopicParamData(false);
//this.applySubMenuBoundaryRankingAlgo();
}
else
  this.menuItems=this.tempMenuItems;
}


applyMainMenuTargetRankingAlgo():void{
  let _self=this;
  let topicParamOptionValtemp:TopicParamOptionValue[]=JSON.parse(JSON.stringify(_self.TopicParamOptionValue));
  topicParamOptionValtemp=topicParamOptionValtemp.filter(d=>d.ResultMenuId>0);
if(topicParamOptionValtemp.length>0)//apply only if algo based on menu otherwise may be it was based on submenu
{
  this.menuItems=[];
  for (var i = 0; i < this.tempMenuItems.length; i++) {
    let menu=this.tempMenuItems[i];
    let optionsValue:TopicParamOptionValue[]=_self.TopicParamOptionValue.filter(d=>d.ResultMenuId==menu.Id);

    let calculations=0;
    if(optionsValue && optionsValue.length>0)
    {

      for (var j = 0; j < optionsValue.length; j++) {
        
        let option=optionsValue[j];
        let data=_self.TopicParamData.filter(d=>d.TopicParamOptionId==option.TopicParamOptionId)[0];
  //debugger;
  if(data)
    calculations+=parseInt(data.Priority)*parseInt(option.AlgoValue);
}
}

menu.OrderPriority=calculations;
this.menuItems.push(menu);
}
this.menuItems.sort(function(a, b){return b.OrderPriority-a.OrderPriority});
console.log(['after algo',this.subMenuItems.filter(d=>d.OrderPriority>0)]);
}
else
  this.menuItems=this.tempMenuItems;

}
applyMainMenuBoundaryAlgo():void{
  console.log('reached12');
  let _self=this;
  let boundaryOptionValtemp:BoundaryOptionValue[]=JSON.parse(JSON.stringify(_self.BoundaryOptionValue));
  boundaryOptionValtemp=boundaryOptionValtemp.filter(d=>d.ResultMenuId>0);
if(boundaryOptionValtemp.length>0)//apply only if algo based on menu otherwise may be it was based on submenu
{console.log('reached');
  this.menuItems=[];
  for (var i = 0; i < this.tempMenuItems.length; i++) {
    let menu=this.tempMenuItems[i];
    let optionsValue:BoundaryOptionValue[]=_self.BoundaryOptionValue.filter(d=>d.ResultMenuId==menu.Id);

    let calculations=0;
    if(optionsValue && optionsValue.length>0)
    {

      for (var j = 0; j < optionsValue.length; j++) {
        
        let option=optionsValue[j];
        let data=_self.BoundaryData.filter(d=>d.BoundaryOptionId==option.BoundaryOptionId)[0];
  //debugger;
  if(data)
    calculations+=parseInt(data.Value)*parseInt(option.AlgoValue);
}
}

menu.OrderPriority=calculations;
this.menuItems.push(menu);
}
this.menuItems.sort(function(a, b){return b.OrderPriority-a.OrderPriority});
console.log(['after boundary main algo',this.subMenuItems.filter(d=>d.OrderPriority>0)]);
}
else
  this.menuItems=this.tempMenuItems;


}

handleSubMenuAlgo():void{
  
  if(this.subTopicDetail.HasBoundaryConditions){
    this.getBoundaryData(true);
    //this.applySubMenuTargetRankingAlgo();
  }
  else if(this.subTopicDetail.HasTargetOptions){
    this.getTopicParamData(true);
//this.applySubMenuBoundaryRankingAlgo();
}
else
  this.subMenuItems=this.tempsubMenuItems;

}

applySubMenuTargetRankingAlgo():void{
  let _self=this;

  let topicParamOptionValtemp:TopicParamOptionValue[]=JSON.parse(JSON.stringify(_self.TopicParamOptionValue));
  topicParamOptionValtemp=topicParamOptionValtemp.filter(d=>d.ResultSubMenuId>0);
if(topicParamOptionValtemp.length>0)//apply only if algo based on menu otherwise may be it was based on submenu
{
  this.subMenuItems=[];
  for (var i = 0; i < this.tempsubMenuItems.length; i++) {
    let subMenu=this.tempsubMenuItems[i];
    let optionsValue:TopicParamOptionValue[]=_self.TopicParamOptionValue.filter(d=>d.ResultSubMenuId==subMenu.Id);

    let calculations=0;
    if(optionsValue && optionsValue.length>0)
    {

      for (var j = 0; j < optionsValue.length; j++) {
        
        let option=optionsValue[j];
        let data=_self.TopicParamData.filter(d=>d.TopicParamOptionId==option.TopicParamOptionId)[0];
  //debugger;
  if(data)
    calculations+=parseInt(data.Priority)*parseInt(option.AlgoValue);
}
}

subMenu.OrderPriority=calculations;
this.subMenuItems.push(subMenu);
}
this.subMenuItems.sort(function(a, b){return b.OrderPriority-a.OrderPriority});
console.log(['after algo',this.subMenuItems.filter(d=>d.OrderPriority>0)]);
}
else
  this.subMenuItems=this.tempsubMenuItems;
}

applySubMenuBoundaryRankingAlgo():void{
  let _self=this;

  let boundaryOptionValtemp:BoundaryOptionValue[]=JSON.parse(JSON.stringify(_self.BoundaryOptionValue));
  boundaryOptionValtemp=boundaryOptionValtemp.filter(d=>d.ResultSubMenuId>0);
if(boundaryOptionValtemp.length>0)//apply only if algo based on menu otherwise may be it was based on submenu
{
  this.subMenuItems=[];
  for (var i = 0; i < this.tempsubMenuItems.length; i++) {
    let subMenu=this.tempsubMenuItems[i];
    let optionsValue:BoundaryOptionValue[]=_self.BoundaryOptionValue.filter(d=>d.ResultSubMenuId==subMenu.Id);

    let calculations=0;
    if(optionsValue && optionsValue.length>0)
    {

      for (var j = 0; j < optionsValue.length; j++) {
        
        let option=optionsValue[j];
        let data=_self.BoundaryData.filter(d=>d.BoundaryOptionId==option.BoundaryOptionId)[0];
  //debugger;
  if(data)
    calculations+=parseInt(data.Value)*parseInt(option.AlgoValue);
}
}

subMenu.OrderPriority=calculations;
this.subMenuItems.push(subMenu);
}
this.subMenuItems.sort(function(a, b){return b.OrderPriority-a.OrderPriority});
console.log(['after algo',this.subMenuItems.filter(d=>d.OrderPriority>0)]);
}
else
  this.subMenuItems=this.tempsubMenuItems;
}


////////////////////////Target Ranking algo ends here///////////////////////

handleGeneralContentDisplay(response:ResultMenu[]):void{
  this.generalResultMenu=response.filter(d=>d.Name=='General')[0];
  this.tempMenuItems=response.filter(d=>d.Name!='General');

  this.handleMainMenuAlgo();
  this.displayGeneralContent();
}
displayGeneralContent():void{
  if(this.generalResultMenu){

    this._resultSubMenuService.getByMenu(this.generalResultMenu.Id).subscribe((response)=> {    
      let generalSubMenu=response[0];

      if(generalSubMenu)
        this.showContent(generalSubMenu);
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });

  }
}
showContent(subMenu:ResultSubMenu):void{
  this.subMenuId=subMenu.Id;
  
  this.onShowContent.emit(subMenu);
}

previousView():void{
  this._location.back();
}


}
