import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {SubTopicDetailService} from './_shared/subTopicDetail.service';
import {SubTopicDetail} from './_shared/subTopicDetail.model';
import {SubtopicService} from '../subTopic/_shared/subTopic.service';
import {Subtopic} from '../subTopic/_shared/subTopic.model';

import {LocalStorageService} from '../base/_services/localstorage.service';
import {BreadCrumb} from '../base/breadcrumb/_shared/breadcrumb.model';


@Component({
  selector: 'app-subTopicDetail',
  templateUrl: './subTopicDetail.component.html',
  styleUrls: ['./subTopicDetail.component.css'],
  providers:[SubTopicDetailService,SubtopicService]
})
export class SubTopicDetailComponent implements OnInit {

subTopicId:number;
active:boolean=true;
currentPage:number=4;
subTopic:Subtopic;
subTopicDetails:SubTopicDetail[]=[];

constructor(private _subTopicDetailService:SubTopicDetailService,private _subtopicService:SubtopicService,
  private _router:Router,private route: ActivatedRoute,private _location:Location,private _localStorageService:LocalStorageService){

 }

ngOnInit(){
  this.route.params.subscribe(params => {
    this.subTopicId = +params['subTopicId'];
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

getBySubTopic(subtopicId:number):void{
  this._subTopicDetailService.getBySubTopic(subtopicId).subscribe((response)=> {  
     this.subTopicDetails=response;

     //like for ribs there are no sub topic details but we added as temp in db
     //so don't show this page redirect to next tpage
    this.subTopicDetails=this.subTopicDetails.filter(d=>d.IsActive);
    if(this.subTopicDetails.length<=0)
        this.skipView();
        
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });
}

previousView():void{
  this.handleBreadCrumb(null,false);
       this._location.back();
}
//in page simple form
submitForm(form:any){
  let subTopicDetailId=form.value.subTopicDetailId;
  
  if(subTopicDetailId!="" && subTopicDetailId>0)
  {
  let subTopicDetail=this.subTopicDetails.filter(d=>d.Id==subTopicDetailId)[0];
  let redirectUrl:string=subTopicDetail.HasTargetOptions?('/targets/'+this.subTopicId+'/'+subTopicDetailId)
                    :(subTopicDetail.HasBoundaryConditions?('/boundary/'+this.subTopicId):'/result/'+this.subTopicId+'/'+subTopicDetailId);
    
    this.handleBreadCrumb(subTopicDetail,true);
    this._router.navigate([redirectUrl]);
  }
  else
    this.skipView();
}
skipView():void{
  let redirectUrl=this.subTopic.HasBoundaryOptions?'/boundary/'+this.subTopicId:'/result/'+this.subTopicId;
  //this.handleBreadCrumb(null,redirectUrl,true);
  this._router.navigate([redirectUrl]);

  //save values to db here.
//this._router.navigate(['/boundry/'+this.subTopicId]);
}

handleBreadCrumb(subTopicDetail:SubTopicDetail,isSave:boolean):void{
    let breadCrumbJson=this._localStorageService.getData('breadCrumb');
    let breadCrumbs:BreadCrumb[]=JSON.parse(breadCrumbJson) as BreadCrumb[];
    let currentPath=this._location.path();
    let currentPage=this.currentPage;
    breadCrumbs=breadCrumbs.filter(d=>d.PageNumber<currentPage); //so it will not add double time

    if(isSave)
    {
      let breadCrumb:BreadCrumb={Id:subTopicDetail.Id,RedirectUrl:currentPath,Name:subTopicDetail.Name,PageNumber:currentPage};
      breadCrumbs.push(breadCrumb);
    }
    this._localStorageService.setData('breadCrumb',JSON.stringify(breadCrumbs),false);

  }


}
