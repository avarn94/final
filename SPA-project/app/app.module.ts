import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BlogComponent } from './blog/blog.component';
import { MenuComponent } from './menu/menu.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { ViewResumeComponent } from './login/view-resume/view-resume.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    ContactsComponent,
    BlogComponent,
    MenuComponent,
    ContactPageComponent,
    LoginPageComponent,
    DashboardComponent,
    ViewResumeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAA7Wy56DesaV_LLjJds_AoWxpVjZTlb2s'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
