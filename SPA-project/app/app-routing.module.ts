import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { BlogComponent } from './blog/blog.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { ViewResumeComponent } from './login/view-resume/view-resume.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'blog',
    component: BlogComponent,
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    component: ContactPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: ViewResumeComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }