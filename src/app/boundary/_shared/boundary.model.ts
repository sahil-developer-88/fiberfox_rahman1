import {BoundaryOption} from '../../BoundaryOption/_shared/BoundaryOption.model';

export class Boundary{
	Id:number;
	Name:string;
	SubTopicId:number;
	OppositeRequiredParamId:number;
	IsActive:boolean;
	IsDeleted:boolean;
	CreatedOn:Date;
	IsMultiSelect:boolean;
	MaxAllowedOptions:number;
	OptionsCount:number;
	
	Options:BoundaryOption[];
}