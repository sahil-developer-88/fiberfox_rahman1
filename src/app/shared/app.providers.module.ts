import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {Router,RouterModule} from '@angular/router';

import {LoaderService} from '../common/loader/loader.service';

import {httpFactory} from '../common/httpFactory/http.factory';

import {CommonService} from '../common/_services/common.service';
import {LocalStorageService} from '../base/_services/localstorage.service';

export const appProviderServices = [
  LoaderService,
  CommonService,//so that we can easlity access common methods
  LocalStorageService,
    {
    provide: Http,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions,Router,LoaderService,LocalStorageService ]
    },    
]