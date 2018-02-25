import { Component,Input } from '@angular/core';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls:[`wizard.component.css`]
})

export class WizardComponent {

@Input() id:number;
@Input() step:number;
@Input() type:string;//on which page so we can enable and disable the tabs
categoryId:number;
subCategoryId:number;
topicId:number;
subtopicId:number;
topicParamId:number;

constructor(){
    
}

getClassName(categoryName:string):string{
  let className:string='';
  switch (categoryName) {
    case "category":
      className=this.type==='category'?'selected':'disabled';
      break;
      case "phase":
      className=this.type==='phase'?'selected':'';
      break;
      case "topics":
      className=this.type==='topics'?'selected':'';
      break;
      case "targets":
      className=this.type==='targets'?'selected':'';
      break;
      case "boundary":
      className=this.type==='boundary'?'selected':'';
      break;
      case "result":
      className=this.type==='result'?'selected':'';
      break;
    default:
      break;
  }
if(className=='')
  className=this.validateDisabledClassName(categoryName);

  return className;
  
}
validateDisabledClassName(categoryName:string):string{
let className:string='';
  
  if(categoryName=== "phase" && this.step>2){
      className='disabled';
     }

  if(categoryName=== "topics" && this.step>3){
      className='disabled';
      }
      if(categoryName=== "targets"  && this.step>4){
      className='disabled';
      }
      if(categoryName=== "boundary"  && this.step>5){
      className='disabled';
      }

  return className;
}

 }
