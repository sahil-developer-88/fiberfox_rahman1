import { LoaderComponent } from '../common/loader/loader.component';
import { ModelErrorsComponent } from '../common/model-errors/model-errors.component';
import {NavbarComponent} from '../base/navbar/navbar.component';
import {WizardComponent} from '../base/wizard/wizard.component';
import {BreadCrumbComponent} from '../base/breadcrumb/breadcrumb.component';
//directive
import {NgInit} from '../common/InitDir/InitDir.directive';

//pipes
import{TruncatePipe} from '../base/pipes/truncate.pipe';

import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';

import { HomeComponent } from '../home/home.component';
import { CategoryComponent } from '../category/category.component';
import { SubcategoryComponent } from '../subcategory/subcategory.component';
import { TopicParamOptionComponent } from '../topicParamOption/topicParamOption.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotFoundComponent } from '../base/errors/not-found/not-found.component';

import { PhaseComponent } from '../phase/phase.component';
import { TopicsComponent } from '../topics/topics.component';
import { TargetsComponent } from '../targets/targets.component';
import { SubTopicDetailComponent } from '../subTopicDetail/subTopicDetail.component';
import { BoundaryConditionsComponent } from '../boundary/boundary.component';
import { BoundaryOptionComponent } from '../boundaryOption/boundaryOption.component';
import { ResultComponent } from '../result/result.component';
import { ResultMenuComponent } from '../resultMenu/resultMenu.component';
import { ThankYouComponent } from '../thankYou/thankYou.component';
import { FinishComponent } from '../finish/finish.component';

export const routedComponents = [
   //directive
   NgInit,
   
   //pipes
   TruncatePipe,
   
    NavbarComponent,
    WizardComponent,
    LoaderComponent,
    BreadCrumbComponent,
    ModelErrorsComponent,
    ThankYouComponent,
    FinishComponent,
    
    LoginComponent,
    RegisterComponent,

    HomeComponent,
    CategoryComponent,
    SubcategoryComponent,
    TopicParamOptionComponent,
    DashboardComponent,
    NotFoundComponent,

    PhaseComponent,
    TopicsComponent,
    SubTopicDetailComponent,
    TargetsComponent,
    BoundaryConditionsComponent,
    BoundaryOptionComponent,
    ResultComponent,
    ResultMenuComponent
    
  ];

