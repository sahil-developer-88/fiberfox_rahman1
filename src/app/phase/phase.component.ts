import { Component,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {ActivityService} from './_shared/activity.service';
import {Activity} from './_shared/activity.model';

import {TopicService} from '../topics/_shared/topic.service';
import {Topic} from '../topics/_shared/topic.model';
import {SubtopicService} from '../subTopic/_shared/subTopic.service';
import {Subtopic} from '../subTopic/_shared/subTopic.model';

import {LocalStorageService} from '../base/_services/localstorage.service';
import {BreadCrumb} from '../base/breadcrumb/_shared/breadcrumb.model';


@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css'],
  providers:[ActivityService, TopicService,SubtopicService]
})
export class PhaseComponent implements OnInit,OnChanges {

active:boolean=true;
currentPage:number=2;
activities:Activity[]=[];
topics:Topic[]=[];
subTopics:Subtopic[]=[];
subCategoryId:number;
subTopicsCount:any=[];
timerClass:string='col-sm-2';
topic:Topic;
currentActivityId:number=1;

constructor(private _activityService:ActivityService,private _localStorageService:LocalStorageService,
  private _topicService:TopicService,private _subtopicService:SubtopicService,
  private _router:Router,private route: ActivatedRoute,private _location:Location){

 }

ngOnInit(){
  
  this.route.params.subscribe(params => {this.subCategoryId = +params['subCategoryId'];
    this.currentActivityId = +params['activityId'];
    if(this.currentActivityId>0)
      this.loadSubTopics(this.currentActivityId);
    this.getTopics(this.subCategoryId);
    this.getActivities();
});

}
ngOnChanges(changes:SimpleChanges){
 this.loadSubTopics(this.currentActivityId);
}
handleActivityLoaded():void{

      if(!this.currentActivityId)
      {
        let activitiy=this.activities.filter(d=>d.Name.toLowerCase().trim()=='product idea detection'
          || d.Name.toLowerCase().trim()=='produkt-idee detection')[0];
     if(activitiy){
      this.currentActivityId=activitiy.Id;
      this.loadSubTopics(this.currentActivityId);
    }
  }
}
getActivities():void{
this._activityService.get().subscribe((response)=> {    
      this.activities=response;
      let _self=this;
      setTimeout(function(){
        _self.handleActivityLoaded()
      },1000);
    
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}

getTopics(subCategoryId:number):void{
this._topicService.get().subscribe((response)=> {    
      this.topics=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}
loadSubTopics(activityId:number):void{
this.currentActivityId=activityId;

this._subtopicService.getBySubcategoryActivity(this.subCategoryId,activityId).subscribe((response)=> {          
      this.subTopics=response;
      this.filterSubtopics(activityId);      
      let topic=this.topics.filter(d=>d.Name=='Clarification')[0];
      if(topic){
      if(this.subTopics.filter(d=>d.TopicId==topic.Id)[0])
        this.timerClass='col-sm-6';
    else
    {
      let topic=this.topics.filter(d=>d.Name=='Conception')[0];
      if(topic){
      if(this.subTopics.filter(d=>d.TopicId==topic.Id)[0])
        this.timerClass='col-sm-4';
      else
        this.timerClass='col-sm-2';
    }
  }
}

    },(errorResponse)=>{this.subTopics.filter(d=>d.TopicId)
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
filterSubtopics(activityId:number):void{
  //this.subTopicsCount=[];
for (var i = 0; i < this.topics.length; i++) {
    let topic=this.topics[i];
    let count=this.subTopics.filter(d=>d.TopicId==topic.Id).length;
    //this.subTopicsCount.push({'topicId':topic.Id,'activityId':activityId,'count':count});    
    this.subTopicsCount[topic.Id+'_'+activityId]=count;
    if(count>0){
    this.subTopicsCount[activityId]={'count':count,'topicId':topic.Id};
  }

}

  
}

previousView():void{
  this.handleBreadCrumb(null,null,false)
  this._router.navigate(['/category']);
}

onPhaseSelected(topic:Topic,activity:Activity):void{
let redirectUrl='/topics/'+this.subCategoryId+'/'+activity.Id+'/'+topic.Id;
this.handleBreadCrumb(topic,activity,true);
this._router.navigate(['/topics/'+this.subCategoryId+'/'+activity.Id+'/'+topic.Id]);
}


  handleBreadCrumb(topic:Topic,activity:Activity, isSave:boolean):void{
    let breadCrumbJson=this._localStorageService.getData('breadCrumb');
    let breadCrumbs:BreadCrumb[]=JSON.parse(breadCrumbJson) as BreadCrumb[];
    let currentPath=this._location.path();
    if(breadCrumbs){
    let currentPage=this.currentPage;
    breadCrumbs=breadCrumbs.filter(d=>d.PageNumber<currentPage); //so it will not add double time
    if(isSave)
    {
      let breadCrumb:BreadCrumb={Id:topic.Id,RedirectUrl:currentPath,Name:activity.Name+'>'+ topic.Name,PageNumber:currentPage};
      breadCrumbs.push(breadCrumb);
    }
    this._localStorageService.setData('breadCrumb',JSON.stringify(breadCrumbs),false);
}
  }

}
