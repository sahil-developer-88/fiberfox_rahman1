import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent } from '../home/home.component';
import { CategoryComponent } from '../category/category.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { PhaseComponent } from '../phase/phase.component';
import { TopicsComponent } from '../topics/topics.component';
import { SubTopicDetailComponent } from '../subTopicDetail/subTopicDetail.component';
import { TargetsComponent } from '../targets/targets.component';
import { BoundaryConditionsComponent } from '../boundary/boundary.component';
import { ResultComponent } from '../result/result.component';
import { ThankYouComponent } from '../thankYou/thankYou.component';
import { FinishComponent } from '../finish/finish.component';

import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';

//error handling
import { NotFoundComponent } from '../base/errors/not-found/not-found.component';

const routes: Routes = [
        {path: '', redirectTo: '/home', pathMatch: 'full'},
        //errors
        {  path: 'not-found',  component: NotFoundComponent},
       
        {  path:
         'home',    component: HomeComponent,
        children:[
        ]  },
        {  path: 'login',    component: LoginComponent  },
        {  path: 'register',    component: RegisterComponent  },

        {  path: 'category',    component: CategoryComponent  },
        {  path: 'category/:categoryId',    component: CategoryComponent  },
        {  path: 'phase/:categoryId/:categoryName/:subCategoryId/:subCategoryName',    component: PhaseComponent  },
        //{  path: 'phase/:subCategoryId/:subCategoryName/:activityId/:activityName',    component: PhaseComponent  },
        {  path: 'topics/:subCategoryId/:activityId/:topicId',    component: TopicsComponent  },
        {  path: 'targets/:subTopicId',    component: SubTopicDetailComponent  },
        {  path: 'targets/:subTopicId/:subTopicDetailId',    component: TargetsComponent  },
        {  path: 'boundary/:subTopicId',    component: BoundaryConditionsComponent  },
        {  path: 'boundary/:subTopicId/:subTopicDetailId',    component: BoundaryConditionsComponent  },
        {  path: 'result/:subTopicId',    component: ResultComponent  },
        {  path: 'result/:subTopicId/:subTopicDetailId',    component: ResultComponent  },
        {  path: 'finish',    component: FinishComponent  },
        {  path: 'finish/:subTopicId/:subTopicDetailId',    component: FinishComponent  },
        {  path: 'dashboard',    component: DashboardComponent  },
        {  path: '**',  component: HomeComponent}
                //,{ path: '/**', redirectTo: 'home' }//unrecognized routes redirect to default home route.
        
];

const childRoutes:Routes=[
  //{  path: 'send-reply',  component: CreateReplyMessageComponent},
]
 
@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:true}),RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}