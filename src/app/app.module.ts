import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoaderComponent } from './common/loader/loader.component';

import { routedComponents }     from './shared/app.components.module';
import { appProviderServices }     from './shared/app.providers.module';
import { appImportsModule }     from './shared/app.imports.module';
import { EmptyGridComponent } from './common/empty-grid/empty-grid.component';


@NgModule({
  declarations: [
   AppComponent,
   routedComponents,
   EmptyGridComponent    
  ],
  imports: [appImportsModule  ],
   exports: [
        LoaderComponent
    ],
  providers: [
  appProviderServices   
],
  bootstrap: [AppComponent]
})
export class AppModule { }
