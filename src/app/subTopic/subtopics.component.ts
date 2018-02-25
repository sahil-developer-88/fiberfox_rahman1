// import { Component,Input,OnInit } from '@angular/core';
// import {Router,ActivatedRoute,ParamMap} from '@angular/router';

// import {SubtopicService} from './_shared/subTopic.service';
// import {Subtopic} from './_shared/subTopic.model';


// @Component({
//   selector: 'app-subtopic',
//   templateUrl: './subtopics.component.html',
//   styleUrls: ['./subtopics.component.css'],
//   providers:[SubtopicService]
// })
// export class TopicsComponent implements OnInit {

// active:boolean=true;
// topics:Topic[]=[];
// subTopics:Subtopic[]=[];

// @Input() topicId:number;
// @Input() subCategoryId:number;
// @Input() subCategoryId:number;
// topicType:string;
// topic:Topic;

// constructor(private _topicService:TopicService,private _subtopicService:SubtopicService,
//   private _router:Router,private route: ActivatedRoute){

//  }

// ngOnInit(){
//   this.route.params.subscribe(params => {this.topicId = +params['topicId'];
//     this.topicType=params["topicType"];//potential finding or conception or clarification
//     //this.getTopics();
//   });



// }

// getTopics():void{
// this._topicService.get().subscribe((response)=> {    
//       this.topics=response;
//     },(errorResponse)=>{
//       //this._notificationsService.success('Error occurred while getting the message!!!', 'Failed');   
//       //this.filterErrors=  errorResponse.errors;
//     });
// }
// previousView():void{
//   this._router.navigate(['/phase/'+1]);
// }

// subtopicSelected(subTopic:Subtopic):void{
// this._router.navigate(['/targets/'+1]);
// }

// }
