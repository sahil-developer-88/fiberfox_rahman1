import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

import {TopicParamOptionService} from './_shared/topicParamOption.service';
import {TopicParamOption} from './_shared/topicParamOption.model';


@Component({
  selector: 'app-topicParamOption',
  templateUrl: './topicParamOption.component.html',
  styleUrls: ['./topicParamOption.component.css'],
    providers:[TopicParamOptionService]
  })
export class TopicParamOptionComponent implements OnInit {

  @Input() isName:boolean=true;
  @Input() topicParamId:number;
  @Input() oppositeTopicParamId:number;
  @Input() isOpposite:string;
  commonParamId:number;
  @Input() topicParamOptions:TopicParamOption[];

  @Output()   onTopicParamChange = new EventEmitter<TopicParamOption>();
  constructor(private _topicParamOptionService:TopicParamOptionService,
    private _router:Router){

  }

  ngOnInit(){
    
    if(this.isOpposite==="true")
    {
      this.commonParamId=this.oppositeTopicParamId;
    }
    else
    {
      this.commonParamId=this.topicParamId;
    }
    
      //this.getOptionsByTopicParam(this.topicParamId);
      this.topicParamOptions=this.topicParamOptions.filter(d=>d.TopicParamId==this.topicParamId);
  }

  getOptionsByTopicParam(topicParamId:number):void{
    this._topicParamOptionService.getByTopicParam(topicParamId).subscribe((response)=> {   
      this.topicParamOptions=response;
      sessionStorage['topicParamIdOptions_'+this.topicParamId]=JSON.stringify(this.topicParamOptions);
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });

  }


  optionSelected(topicParamOption:TopicParamOption):void{
    this._router.navigate(['/phase/'+topicParamOption.Id]);
  }


  topicParamChange(topicParamOption:TopicParamOption,e:any):void{
    let _self=this;
    //if(sessionStorage['topicParamIdOptions_'+this.topicParamId]!=undefined){
      //let topicOptions:TopicParamOption[]= JSON.parse(sessionStorage['topicParamIdOptions_'+this.topicParamId]) as TopicParamOption[];
      
      // let col =e.target.getAttribute('ng-reflect-value');
      // let topicParamId=col.split('_')[0];
      // let topicParamOptionId=col.split('_')[1];
      // let priority=parseInt(col.split('_')[2]);
      

//get already checked checkboxes
for (var i = 1; i <= 3; i++) {
  let priority:number=i;
  let max_allowed=this.getAllowedSelectionsWithPriority(priority);
  let checkedRadioElem:any=document.querySelectorAll('div[data-topicParamId="'+this.topicParamId+'"]   input[type=radio][data-priority="'+priority+'"]:checked');
  let priorityRadios:any= document.querySelectorAll('div[data-topicParamId="'+this.topicParamId+'"]   input[type=radio][data-priority="'+priority+'"]');
  
  priorityRadios.forEach(function(radioElem:any,index:any){        
    if(!radioElem.checked && checkedRadioElem.length>=max_allowed) //reached max check limit
    {        
      _self.setOverlayToRadio(radioElem.parentElement);
    }
    else if(!radioElem.checked){      
      _self.removeOverlayFromRadio(radioElem.parentElement);
    }
  });
//}
 //this.setOverlayToElement('[data-text="'+commonTopicParamId+'"][data-isopposite="true"]',index);
}
//this.onTopicParamChange.emit(topicParamOption);
topicParamOption.isChecked=true;
}

resetOption(topicParamOption:TopicParamOption):void{
  let _self=this;
  topicParamOption.isChecked=false;
  let elem:any = document.querySelectorAll("[type='radio'][ng-reflect-name='"+topicParamOption.Id.toString()+"']:checked");
  if(elem && elem[0])
  {
    let col =elem[0].getAttribute('ng-reflect-value');
    let topicParamId=col.split('_')[0];
    let topicParamOptionId=col.split('_')[1];
    let priority=col.split('_')[2];

    let priorityRadios:any= document.querySelectorAll('div[data-topicParamId="'+topicParamOption.TopicParamId+'"]   input[type=radio][data-priority="'+priority+'"]');

    priorityRadios.forEach(function(radioElem:any,index:any){        
      if(!radioElem.checked)
      {        
        _self.removeOverlayFromRadio(radioElem.parentElement);
      }
    });

  }  
  this.resetRadioButtons(topicParamOption);
}
setOverlayToRadio(radioDivElem:any):void{

  if(radioDivElem && !this.hasClass(radioDivElem,'overlay'))
    radioDivElem.className+=' overlay';
}
removeOverlayFromRadio(radioDivElem:any):void{

  if(radioDivElem)
    this.removeClass(radioDivElem,'overlay'); 
}

/***************Old Algo Settings************/

topicParamChange1(topicParamOption:TopicParamOption,e:any):void{
  
  if(sessionStorage['topicParamIdOptions_'+this.topicParamId]!=undefined){
    let topicOptions:TopicParamOption[]= JSON.parse(sessionStorage['topicParamIdOptions_'+this.topicParamId]) as TopicParamOption[];
    
  //let oppositeTopicParam=topicOptions.filter(d=>d.TopicParamId==topicParamOption.TopicParamId);

  let index=this.topicParamOptions.findIndex(d=>d.Id==topicParamOption.Id);
  var currentElem=document.querySelectorAll('li[data-val="'+topicParamOption.Id+'"]')[0];//it will be two max one lbl and rdo
  var attrText=currentElem.getAttribute('data-text');
  var commonTopicParamId=currentElem.getAttribute('data-text');
  let isOp:any= currentElem.getAttribute('data-isopposite');

  if(isOp===true || isOp==='true')
  {
    this.setOverlayToElement1('[data-text="'+commonTopicParamId+'"][data-isopposite="false"]',index);
  }
  else{
    this.setOverlayToElement1('[data-text="'+commonTopicParamId+'"][data-isopposite="true"]',index);
  }
}
//this.onTopicParamChange.emit(topicParamOption);
topicParamOption.isChecked=true;
}
setOverlayToElement1(query:string,index:number):void{

  let currentElemlbl:any=document.querySelectorAll('li[class="lbl"]'+query)[index];
  if(currentElemlbl)
    currentElemlbl.childNodes[1].className+=' overlay';

  let currentElemrdio:any=document.querySelectorAll('li[class="rdo"]'+query)[index];
  if(currentElemrdio)
    currentElemrdio.childNodes[1].className+=' overlay';
  
}

resetOption1(topicParamOption:TopicParamOption):void{
  topicParamOption.isChecked=false;

  let index=this.topicParamOptions.findIndex(d=>d.Id==topicParamOption.Id);
  var currentElem=document.querySelectorAll('li[data-val="'+topicParamOption.Id+'"]')[0];//it will be two max one lbl and rdo

  var attrText=currentElem.getAttribute('data-text');
  var commonTopicParamId=currentElem.getAttribute('data-text');
  let isOp:any= currentElem.getAttribute('data-isopposite');

  if(isOp===true || isOp==='true')
  {
    this.removeOverlayToElement1('[data-text="'+commonTopicParamId+'"][data-isopposite="false"]',index);
  }
  else{
    this.removeOverlayToElement1('[data-text="'+commonTopicParamId+'"][data-isopposite="true"]',index);
  }
  this.resetRadioButtons(topicParamOption);

}

removeOverlayToElement1(query:string,index:number):void{

  let currentElemlbl:any=document.querySelectorAll('li[class="lbl"]'+query)[index];
  
  if(currentElemlbl)
    this.removeClass(currentElemlbl.childNodes[1],'overlay');

  let currentElemrdio:any=document.querySelectorAll('li[class="rdo"]'+query)[index];
  if(currentElemrdio)
    this.removeClass(currentElemrdio.childNodes[1],'overlay');
  
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
resetRadioButtons(topicParamOption:TopicParamOption):void{
  let ele:any = document.querySelectorAll("[type='radio'][ng-reflect-name='"+topicParamOption.Id.toString()+"']");
  for(var i=0;i<ele.length;i++)
    ele[i].checked = false;
}
getAllowedSelectionsWithPriority(priority:number):number{
  let max_allowed:number=1;
  switch (priority) {
    case 1:
    max_allowed=2;
    break;    
    case 2:
    max_allowed=1;
    break;
    case 3:
    max_allowed=1;
    break;
    default:      
    break;
  }
  return max_allowed;
}
}