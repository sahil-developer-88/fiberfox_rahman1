import { Component,Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {BoundaryOptionService} from './_shared/boundaryOption.service';
import {BoundaryOption} from './_shared/boundaryOption.model';


@Component({
  selector: 'app-boundaryOption',
  templateUrl: './boundaryOption.component.html',
  styles: [`
ul.param-options{
list-style: none;

}
ul.param-options li
{
padding: 0px;
background-color: #FFF;
border-radius: 10px;
margin: 10px auto;
}

ul.param-options li a, ul.param-options li span{
    color:darkgray;    
}


ul.param-radio{
list-style: none;
padding-left: 0px;


}

ul.param-radio.bottom{
  margin-top: 95px;
}

ul.param-radio li
{
/* padding: 7px;
border: 2px solid darkgray;
background-color: #FFF;
border-radius: 10px; */
margin: 20px auto;
}

ul.param-radio li label.radio-custom-label{
  margin:0px;
  width:33%;
  float:left;
  margin-bottom:27px;

} 
  `],
  providers:[BoundaryOptionService]
})
export class BoundaryOptionComponent implements OnInit {

@Input() isName:boolean=true;
@Input() boundaryId:number;
boundaryOptions:BoundaryOption[]=[];


constructor(private _BoundaryOptionService:BoundaryOptionService,
  private _router:Router){

 }

ngOnInit(){
  if(this.boundaryId)
  this.getOptionsByBoundary(this.boundaryId);
}

getOptionsByBoundary(boundaryId:number):void{
  this._BoundaryOptionService.getByBoundary(boundaryId).subscribe((response)=> {   
      this.boundaryOptions=response;
    },(errorResponse)=>{
      //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
      //this.filterErrors=  errorResponse.errors;
    });

}


optionSelected(boundaryOption:BoundaryOption):void{
  this._router.navigate(['/resul/'+boundaryOption.Id]);
}

}
