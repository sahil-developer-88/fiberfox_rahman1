import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {BoundaryService} from './_shared/Boundary.service';
import {Boundary} from './_shared/Boundary.model';
import {SubtopicService} from '../subTopic/_shared/subTopic.service';
import {Subtopic} from '../subTopic/_shared/subTopic.model';

import {BoundaryDataService} from './_shared/boundaryData.service';
import {BoundaryData} from './_shared/boundaryData.model';

import {SubTopicDetailService} from '../subTopicDetail/_shared/subTopicDetail.service';
import {SubTopicDetail} from '../subTopicDetail/_shared/subTopicDetail.model';

import {BoundaryOptionService} from '../boundaryOption/_shared/boundaryOption.service';
import {BoundaryOption} from '../boundaryOption/_shared/boundaryOption.model';

import {LocalStorageService} from '../base/_services/localstorage.service';
import {BreadCrumb} from '../base/breadcrumb/_shared/breadcrumb.model';

@Component({
  selector: 'app-boundary',
  templateUrl: './boundary.component.html',
  styleUrls: ['./boundary.component.css'],
  providers:[SubtopicService,BoundaryService,SubTopicDetailService,BoundaryOptionService,BoundaryDataService]
})
export class BoundaryConditionsComponent implements OnInit {

  subTopicId:number;
  subTopicDetailId:number;
  boundaryId:number;
  currentPage:number=6;
  active:boolean=true;
  subTopic:Subtopic;
  subTopicDetail:SubTopicDetail;
  boundarys:Boundary[]=[];

  constructor(private _BoundaryService:BoundaryService,private _subtopicService:SubtopicService,
    private _subTopicDetailService:SubTopicDetailService, private _localStorageService:LocalStorageService,
    private _boundaryOptionService:BoundaryOptionService,private _boundaryDataService:BoundaryDataService,
    private _router:Router,private route: ActivatedRoute,private _location:Location){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.subTopicId = +params['subTopicId'];
      this.subTopicDetailId = +params['subTopicDetailId'];
      this.findSubtopic(this.subTopicId);
    });
  }

  findSubtopic(subtopicId:number):void{
    this._subtopicService.find(subtopicId).subscribe((response)=> {    
      this.subTopic=response;
      this.getBySubTopic(this.subTopicId);
    },(errorResponse)=>{
    //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
    //this.filterErrors=  errorResponse.errors;
  });
  }

  findSubtopicDetail(subTopicDetailId:number):void{
    this._subTopicDetailService.find(subTopicDetailId).subscribe((response)=> {    
      this.subTopicDetail=response;
      this.getBySubTopic(this.subTopicId);
    },(errorResponse)=>{
    //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
    //this.filterErrors=  errorResponse.errors;
  });
  }

  getBySubTopic(subtopicId:number):void{
    this._BoundaryService.getBySubtopic(subtopicId).subscribe((response)=> {  
      this.boundarys=response;
      
      if(this.subTopic.HasBoundaryOptions===true){
        this.boundarys=this.boundarys.filter(d=>d.OptionsCount>0);
        this.boundarys=this.boundarys.sort(function(a, b){return a.OptionsCount-b.OptionsCount});
      }

      for (var i = this.boundarys.length - 1; i >= 0; i--) {
        this.getBoundaryOptions(this.boundarys[i]);
      }
      
    },(errorResponse)=>{
    //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
    //this.filterErrors=  errorResponse.errors;
  });
  }

  getBoundaryOptions(boundary:Boundary):void{
    this._boundaryOptionService.getByBoundary(boundary.Id).subscribe((response)=> {  
      boundary.Options=response;
    },(errorResponse)=>{
    //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
    //this.filterErrors=  errorResponse.errors;
  });
  }

  submitForm(form:any){
  let boundaryId=form.value.boundaryId;//data.split('_')[0];
  //let boundaryOptionId=data.split('_')[1];
  let model:BoundaryData={Id:0,IsActive:true,IsDeleted:false,CreatedOn:null,BoundaryId:boundaryId,UserId:null,SubTopicId:this.subTopicId, BoundaryOptionId:null,Value:'0'};
  this._boundaryDataService.create(model).subscribe((response)=> {  
    this._router.navigate(['/boundary/'+this.subTopicId]);     
  },(errorResponse)=>{
    //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
    //this.filterErrors=  errorResponse.errors;
  });
  this._router.navigate([this.buildResultUrl()]);
}
//radio options separate page form 
submitOptionsForm(form:any):void{
  let data=form.value;
  let list:BoundaryData[]=[];
  for (var i =0; i < this.boundarys.length; i++) {
    let boundary:Boundary=this.boundarys[i];
    for (var j = 0; j < boundary.Options.length; j++) {
      let boundaryOption:BoundaryOption=boundary.Options[j];
      let defaultValue:string='0';
      let col=boundary.IsMultiSelect? data['Check_'+boundaryOption.Id+'']:data['Radio_'+boundary.Id+''];

      let boundaryId:number=boundary.Id;
      let boundaryOptionId:number=boundaryOption.Id
      let value:string='0';//default

//for radios
if(!boundary.IsMultiSelect && col.toString().indexOf('_')>=0)
{ 
  //for radio single selection
  let tempBoundaryOptionId=col.split('_')[1];
  if(!boundary.IsMultiSelect && tempBoundaryOptionId==boundaryOptionId)
    value=col.split('_')[2];
  else
    value=defaultValue;
}
else  if(boundary.IsMultiSelect)//checkbox 
{
value=col===true?boundaryOption.Value:defaultValue;//chk will return only true
}
let model:BoundaryData={Value:value,BoundaryOptionId:boundaryOptionId,CreatedOn:null,BoundaryId:boundaryId,UserId:null,SubTopicId:this.subTopicId,Id:0,IsActive:true,IsDeleted:false};
list.push(model);
}
}
if(list.length>0)
{
  for (var i = 0; i < list.length; i++) {

    this._boundaryDataService.create(list[i]).subscribe((response)=> {  
    },(errorResponse)=>{
        //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
        //this.filterErrors=  errorResponse.errors;
      });
  }
}
this._router.navigate([this.buildResultUrl()]);
}
previousView():void{
  this._location.back();
}

// boundarySelected(Boundary:Boundary):void{
//   this._router.navigate(['/boundary/'+Boundary.Id]);  
// }
skipView():void{
  this._router.navigate([this.buildResultUrl()]);
}
buildResultUrl():string{
  let routeUrl:string=(this.subTopicDetailId>0)?('/result/'+this.subTopicId+'/'+this.subTopicDetailId)
  :('/result/'+this.subTopicId);
  return routeUrl;
}
boundaryOptionChecked(boundary:Boundary,boundaryOption:BoundaryOption,event:any){
  
  let boundaryData:Boundary=this.boundarys.filter(d=>d.Id===boundaryOption.BoundaryId)[0];
  
  //for radios
  if(!boundary.IsMultiSelect && boundaryData && boundaryData.Options)
  {
    for (var i = 0; i < boundaryData.Options.length; i++) {
      boundaryData.Options[i].isChecked=false;
    }
    boundaryOption.isChecked=true;
  }
  
  //for checkbox max selection limit
  if(boundary.IsMultiSelect)
    boundaryOption.isChecked=event.target.checked;

  if(boundary.IsMultiSelect && boundary.MaxAllowedOptions>0)
  {
    //remove overlay from all
    for (var j = 0; j < boundaryData.Options.length; j++) {
        this.removeOverlayToElement(boundaryData.Options[j].Id.toString());  
        }

      let selectedOptions:BoundaryOption[]=JSON.parse(JSON.stringify(boundaryData.Options.filter(d=>d.isChecked)));
      if(selectedOptions.length==boundary.MaxAllowedOptions){
        let uncheckedOptions:BoundaryOption[]=JSON.parse(JSON.stringify(boundaryData.Options.filter(d=>d.isChecked!=true)));
        for (var j = 0; j < uncheckedOptions.length; j++) {
        this.setOverlayToElement(uncheckedOptions[j].Id.toString());  
        }
      }
        
  }
}
resetOption(boundary:Boundary,boundaryOption:BoundaryOption){
  boundaryOption.isChecked=false;

  this.resetRadioButtons(boundaryOption);
}
resetRadioButtons(boundaryOption:BoundaryOption){
  let ele:any = document.querySelectorAll("[type='radio'][ng-reflect-name='Radio_"+boundaryOption.BoundaryId.toString()+"']");
  
  for(var i=0;i<ele.length;i++)
    ele[i].checked = false;
}
overlayForCheckboxes():void{

}
setOverlayToElement(query:string):void{

 let currentElemDiv:any=document.querySelectorAll("div[data-id='"+query+"']");
 
 if(currentElemDiv && currentElemDiv[0])
  currentElemDiv[0].className+=' overlay';
}
removeOverlayToElement(query:string):void{

 let currentElemDiv:any=document.querySelectorAll("div[data-id='"+query+"']");
 
 if(currentElemDiv && currentElemDiv[0])
 this.removeClass(currentElemDiv[0],'overlay');

 
}

hasClass(ele:any,cls:string):void {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

removeClass(ele:any,cls:string):void {
        if (this.hasClass(ele,cls)) {
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className=ele.className.replace(reg,' ');
        }
    }

// handleBreadCrumb(boundary:Boundary, isSave:boolean):void{
//   let breadCrumbJson=this._localStorageService.getData('breadCrumb');
//   let breadCrumbs:BreadCrumb[]=JSON.parse(breadCrumbJson) as BreadCrumb[];

//   let currentPath=this._location.path();
//   let currentPage=this.currentPage;
//   breadCrumbs=breadCrumbs.filter(d=>d.PageNumber<currentPage); //so it will not add double time

//   if(isSave)
//   {
//     let breadCrumb:BreadCrumb={Id:boundary.Id,RedirectUrl:currentPath,Name:boundary.Name,PageNumber:currentPage};
//     breadCrumbs.push(breadCrumb);
//   }
//   this._localStorageService.setData('breadCrumb',JSON.stringify(breadCrumbs),false);

// }

}
