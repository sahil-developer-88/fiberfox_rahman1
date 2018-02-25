export class BoundaryOptionValue{
	Id:number;
	BoundaryOptionId:number;
	AlgoValue:string; //value like 9 6 5 4
	ValueDataType:string; //int string for matcing
	ValueRangType:number;//low med high 1,2,3 //null in case common for all
	ResultMenuId:number;
	ResultSubMenuId:number;//
	IsActive:boolean;
	IsDeleted:boolean;
	CreatedOn:Date;
}