import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { RegistertableComponent } from './components/registertable/registertable.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

//import {DataTableModule} from "primeng";

//import {DataTableModule} from "angular2-datatable";
import { DataTableModule } from 'angular-2-data-table';
//import {DataTableModule} from 'primeng/primeng';

// Import Module
//import { SpinnerComponentModule } from 'ng2-component-spinner';
//import {ImageLazyLoadModule, WebWorkerService} from 'ng2-image-lazy-load';
 

//WebWorkerService.workerUrl = '../assets/xhrWorker.js';
//WebWorkerService.enabled = true;

const appRoutes: Routes = [
  {path:'',component: HomeComponent},
  {path:'register',component: RegisterComponent},
  {path:'login',component: LoginComponent},
  {path:'dashboard',component: DashboardComponent},
  {path:'profile',component: ProfileComponent},
  {path:'registertable',component: RegistertableComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegistertableComponent,
    LoadingIndicatorComponent
  //  ImageLazyLoadModule
  ],
  exports:[LoadingIndicatorComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    DataTableModule
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
