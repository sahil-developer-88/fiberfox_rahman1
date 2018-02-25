export class Subtopic{
	Id:number;
	Name:string;
	TopicId:number;
	IsParamRequired:boolean;
	Type:string;
	IsActive:boolean;
	IsDeleted:boolean;
	CreatedOn:Date;
	HasBoundaryOptions:boolean; //whether we need to get options for topic with topicparamoptions or topicparam as radio
}