import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {ActivityService} from '../phase/_shared/activity.service';
import {Activity} from '../phase/_shared/activity.model';


import {TopicService} from './_shared/topic.service';
import {Topic} from './_shared/topic.model';
import {SubtopicService} from '../subTopic/_shared/subTopic.service';
import {Subtopic} from '../subTopic/_shared/subTopic.model';


import {LocalStorageService} from '../base/_services/localstorage.service';
import {BreadCrumb} from '../base/breadcrumb/_shared/breadcrumb.model';


@Component({
  selector: 'app-topic',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers:[ActivityService,TopicService,SubtopicService]
})
export class TopicsComponent implements OnInit {

active:boolean=true;
currentPage:number=3;
activities:Activity[]=[];
topic:Topic;
subTopics:Subtopic[]=[];

activityId:number;
subCategoryId:number;
topicId:number;
topicType:string;

constructor(private _activityService:ActivityService,private _topicService:TopicService,private _subtopicService:SubtopicService,
  private _router:Router,private route: ActivatedRoute,private _location:Location,private _localStorageService:LocalStorageService){

 }

ngOnInit(){
  
  this.route.params.subscribe(params => {
    this.subCategoryId=+params['subCategoryId'];
    this.activityId= +params['activityId'];
    this.topicId = +params['topicId'];
    this.getActivities();
  this.findTopic(this.topicId);
    //this.getTopics();
  });



}

getActivities():void{
this._activityService.get().subscribe((response)=> {    
      this.activities=response;
      this.loadSubTopics(this.activities.filter(d=>d.Id==this.activityId)[0]);
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}


findTopic(topicId:number):void{
this._topicService.find(topicId).subscribe((response)=> {    
      this.topic=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}

redirectPhase(activity:Activity):void{
  //this._router.navigate(['/phase/'+this.subCategoryId+'/'+activity.Id]);
  this._location.back();
}
loadSubTopics(activity:Activity):void{
this.activityId=activity.Id;
this._subtopicService.getBySubcategoryTopicActivity(this.subCategoryId,activity.Id,this.topicId).subscribe((response)=> {          
      this.subTopics=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });


}
getSubtopics(topicId:number,subCategoryId:number,activityId:number):void{
  
this._subtopicService.getBySubcategoryTopicActivity(subCategoryId,activityId,topicId).subscribe((response)=> {          
      this.subTopics=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });

}
filterSubtopics(topic:Topic):number{
return this.subTopics.filter(d=>d.TopicId==topic.Id).length;
}
previousView():void{
  this.handleBreadCrumb(null,false);
      this._location.back();
}

subtopicSelected(subTopic:Subtopic):void{
  let redirectUrl=subTopic.IsParamRequired?'/targets/'+subTopic.Id:'/result/'+subTopic.Id;
this.handleBreadCrumb(subTopic,true);  
this._router.navigate([redirectUrl]);

}

handleBreadCrumb(subtopic:Subtopic, isSave:boolean):void{
    let breadCrumbJson=this._localStorageService.getData('breadCrumb');
    let breadCrumbs:BreadCrumb[]=JSON.parse(breadCrumbJson) as BreadCrumb[];
    
    let currentPath=this._location.path();
    let currentPage=this.currentPage;
    if(breadCrumbs){
    breadCrumbs=breadCrumbs.filter(d=>d.PageNumber<currentPage); //so it will not add double time

    if(isSave)
    {
      let breadCrumb:BreadCrumb={Id:subtopic.Id,RedirectUrl:currentPath,Name:subtopic.Name,PageNumber:currentPage};
      breadCrumbs.push(breadCrumb);
    }
    this._localStorageService.setData('breadCrumb',JSON.stringify(breadCrumbs),false);
}
  }

}
