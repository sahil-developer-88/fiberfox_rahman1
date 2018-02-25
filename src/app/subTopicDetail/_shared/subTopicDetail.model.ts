export class SubTopicDetail{
	Id:number;
	Name:string;
	SubTopicId:number;
	IsParamRequired:boolean;
	Type:string;
	IsActive:boolean;
	IsDeleted:boolean;
	CreatedOn:Date;
	HasTargetOptions:boolean;//whether we need to get options for topic with topicparamoptions or topicparam as radio
	HasBoundaryConditions:boolean;//whether we need to get options for topic with topicparamoptions or topicparam as radio
}