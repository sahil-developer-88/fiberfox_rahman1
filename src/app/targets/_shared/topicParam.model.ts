import {TopicParamOption} from '../../topicParamOption/_shared/topicParamOption.model';

export class TopicParam{
	Id:number;
	Name:string;
	SubTopicId:number;
	OppositeRequiredParamId:number;
	IsActive:boolean;
	IsDeleted:boolean;
	CreatedOn:Date;
	OptionsCount:number;
	
	Options:TopicParamOption[];
}