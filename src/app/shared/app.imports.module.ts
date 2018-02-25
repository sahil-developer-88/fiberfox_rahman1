import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { AppRoutingModule }     from '../shared/app-routing.module';


export const appImportsModule = [
 BrowserModule,
    // Animations need to be imported in to your project to use the library
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule 
]