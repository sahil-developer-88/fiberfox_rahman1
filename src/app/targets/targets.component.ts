import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {TopicParamService} from './_shared/topicParam.service';
import {TopicParam} from './_shared/topicParam.model';
import {SubtopicService} from '../subTopic/_shared/subTopic.service';
import {Subtopic} from '../subTopic/_shared/subTopic.model';

import {SubTopicDetailService} from '../subTopicDetail/_shared/subTopicDetail.service';
import {SubTopicDetail} from '../subTopicDetail/_shared/subTopicDetail.model';

import {TopicParamDataService} from './_shared/topicParamData.service';
import {TopicParamData} from './_shared/topicParamData.model';


import {TopicParamOptionService} from '../topicParamOption/_shared/topicParamOption.service';
import {TopicParamOption} from '../topicParamOption/_shared/topicParamOption.model';

import {LocalStorageService} from '../base/_services/localstorage.service';
import {BreadCrumb} from '../base/breadcrumb/_shared/breadcrumb.model';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css'],
  providers:[TopicParamService,SubtopicService,SubTopicDetailService, TopicParamOptionService,TopicParamDataService]
})
export class TargetsComponent implements OnInit {

subTopicId:number;
subTopicDetailId:number;
active:boolean=true;
currentPage:number=5;
currentTopicParamId:number;
subTopic:Subtopic;
subTopicDetail:SubTopicDetail;
allTopicParams:TopicParam[]=[];
topicParams:TopicParam[]=[];
opositeTopicParam:TopicParam;
topicParamOptions:TopicParamOption[]=[];
allTopicParamOptions:TopicParamOption[];
constructor(private _topicParamService:TopicParamService,private _subtopicService:SubtopicService,
  private _subTopicDetailService:SubTopicDetailService,private _localStorageService:LocalStorageService,
  private _topicParamOptionService:TopicParamOptionService,private _topicParamDataService:TopicParamDataService,
  private _router:Router,private route: ActivatedRoute,private _location:Location){

 }

ngOnInit(){
  this.route.params.subscribe(params => {
    
    this.subTopicId = +params['subTopicId'];
    this.subTopicDetailId = +params['subTopicDetailId'];
    this.findSubtopicDetail(this.subTopicDetailId);
  });



}

getAllTopicParamOptions():void{
this._topicParamOptionService.getBySubTopic(this.subTopicId).subscribe((response)=> {    
      this.allTopicParamOptions=response;
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

isOpositeParam(topicParam:TopicParam,index:number):boolean{
  this.opositeTopicParam=null;
  this.opositeTopicParam=this.opositeTopicParam=this.allTopicParams.filter(d=>d.OppositeRequiredParamId==topicParam.Id)[0];
  if(this.opositeTopicParam){
   //this.getOptionsByTopicParam(this.opositeTopicParam);
   this.currentTopicParamId=topicParam.Id;
    return true;
  }
  else
    return false;
}
getBySubTopic(subtopicId:number):void{
  this._topicParamService.getBySubtopic(subtopicId).subscribe((response)=> {  
     this.topicParams= this.allTopicParams=response;
      if(this.subTopicDetail.HasTargetOptions===true){
      this.topicParams=this.topicParams.filter(d=>d.OptionsCount>0);
      }
      this.topicParams=this.topicParams.filter(d=>d.OppositeRequiredParamId==0 || d.OppositeRequiredParamId==null);

      this.getAllTopicParamOptions();
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}

// getOptionsByTopicParam(topicParam:TopicParam):number{
//   this._topicParamOptionService.getByTopicParam(topicParam.Id).subscribe((response)=> {   
//       this.topicParamOptions=response;
//       topicParam.Options=response;
//     },(errorResponse)=>{
//       return 0;
//     });
// return 1;
// }

previousView():void{
       this._location.back();
}
//in page simple form
submitForm(form:any){
  console.log('dd'); 
  var topicParamId=form.value.topicParamId;

  let model:TopicParamData={Id:0,IsActive:true,IsDeleted:false,CreatedOn:null,TopicParamId:topicParamId,Priority:null,UserId:null,TopicParamOptionId:null,SubTopicId:this.subTopicId,Value:0};
  this._topicParamDataService.create(model).subscribe((response)=> {  
    
    this._router.navigate([this.buildBoundryUrl()]);     
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });


}
//radio options separate page form 
submitOptionsForm(form:any):void{
  console.log('hi');
  let data=form.value;
 let list:TopicParamData[]=[];

 let radios:any=document.getElementsByClassName("topicParam_radio_options");
 console.log('hello'); 
for( i = 0; i < radios.length; i++ ) {
         let col =   radios[i].getAttribute('ng-reflect-value');

         if(col.toString().indexOf('_')>=0)
      {
        let topicParamId=col.split('_')[0];
        let topicParamOptionId=col.split('_')[1];
        let priority=col.split('_')[2];

        if(!radios[i].checked) 
        priority=0;

        let model:TopicParamData={Id:0,IsActive:true,IsDeleted:false,CreatedOn:null,TopicParamId:topicParamId,UserId:null,TopicParamOptionId:topicParamOptionId,
          Priority:priority,SubTopicId:this.subTopicId,Value:0};

            //validate duplicates
            let old=list.filter(d=>d.TopicParamOptionId==model.TopicParamOptionId)[0];
            if(old==undefined)
              {
                list.push(this.calculateValueBasedOnAlgo(model));
              }
              else if(parseInt(old.Priority)==0 || parseInt(old.Priority)<priority)//selected already added nowo secon radio unselected comes
              {
const index:number=list.findIndex(d=>d.TopicParamOptionId==model.TopicParamOptionId);
if(index!=-1)
{list.splice(index,1);
  list.push(this.calculateValueBasedOnAlgo(model));
}
              }
            
          
          
      }
       
    }



    if(list.length>0)
    {
      for (var i = 0; i < list.length; i++) {
        this._topicParamDataService.create(list[i]).subscribe((response)=> { 

        },(errorResponse)=>{
          
        });
      }
    }
    this._router.navigate([this.buildBoundryUrl()]);     
}
calculateValueBasedOnAlgo(topicParamData:TopicParamData):TopicParamData{
return topicParamData;
}
topicParamSelected(topicParam:TopicParam):void{
// this._router.navigate(['/boundry/'+topicParam.Id]);  
}
skipView():void{
  if(this.subTopicDetail.HasBoundaryConditions)
  this._router.navigate(['/boundary/'+this.subTopicId]);
else
this._router.navigate([this.buildBoundryUrl()]);  
  //save values to db here.
//this._router.navigate(['/boundry/'+this.subTopicId]);
}

buildBoundryUrl():string{
    console.log('sub topic detail id');
    console.log(this.subTopicDetailId);
    console.log(this.subTopicDetail.HasBoundaryConditions);

    let routeUrl:string=(this.subTopicDetailId>0 && this.subTopicDetail.HasBoundaryConditions)?('/boundary/'+this.subTopicId+'/'+this.subTopicDetailId)
                  :(this.subTopicDetailId>0?('/result/'+this.subTopicId+'/'+this.subTopicDetailId):('/result/'+this.subTopicId));
                  return routeUrl;
}

onTopicParamChange(topicParamOption:TopicParamOption):void{

}
// handleBreadCrumb(subtopicDetail:SubTopicDetail, isSave:boolean):void{
//     let breadCrumbJson=this._localStorageService.getData('breadCrumb');
//     let breadCrumbs:BreadCrumb[]=JSON.parse(breadCrumbJson) as BreadCrumb[];
    
//     let currentPath=this._location.path();
//     let currentPage=this.currentPage;
//     breadCrumbs=breadCrumbs.filter(d=>d.PageNumber<currentPage); //so it will not add double time
    
//     if(isSave)
//     {
//       let breadCrumb:BreadCrumb={Id:subtopicDetail.Id,RedirectUrl:currentPath,Name:subtopicDetail.Name,PageNumber:currentPage};
//       breadCrumbs.push(breadCrumb);
//     }
//     this._localStorageService.setData('breadCrumb',JSON.stringify(breadCrumbs),false);

//   }

}
