import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { LocationDetailsPageComponent } from './location-details-page/location-details-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: 'main', component: MainPageComponent, canActivate: [GuardService] },
  { path: 'location-page', component: LocationPageComponent, canActivate: [GuardService] },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'location-details-page', component: LocationDetailsPageComponent, canActivate: [GuardService] },
  { path: 'configuration-page', component: ConfigurationPageComponent, canActivate: [GuardService] },
  {
    path: '',
    redirectTo: '/login-page',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
