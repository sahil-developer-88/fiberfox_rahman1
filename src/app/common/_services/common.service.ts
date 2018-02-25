import {Injectable} from '@angular/core';

@Injectable()
export class CommonService{

constructor(){}

//so there is not querystring in the url  so default isQuerturl is false
buildRequestUrl(url:string, actionUrl: string,isQuerturl:boolean=false) {        
        //as we always requred that in case get so. otherwise we can do accordingly
        
        let requestUrl=url+ (actionUrl!==''?'/'+actionUrl:'')
                        +(isQuerturl?'&':'?');
        
        return requestUrl;
    }
}