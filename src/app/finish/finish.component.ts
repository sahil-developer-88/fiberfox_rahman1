import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {SubTopicDetailService} from '../subTopicDetail/_shared/subTopicDetail.service';
import {SubTopicDetail} from '../subTopicDetail/_shared/subTopicDetail.model';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css'],
  providers:[SubTopicDetailService]
})
export class FinishComponent implements OnInit {

  subTopicDetails:SubTopicDetail[]=[];
  subMenuId:number;
  subTopicId:number;
  subTopicDetailId:number;
  constructor(private _router:Router,private route: ActivatedRoute,private _location:Location,
    private _subTopicDetailService:SubTopicDetailService){

  }

  ngOnInit(){
    
    this.route.params.subscribe(params => {
      this.subTopicId = +params['subTopicId'];
      this.subTopicDetailId = +params['subTopicDetailId'];
      
      //this.getSubTopicDetailsBySubTopic(this.subTopicId);
    
    });
  }


}
