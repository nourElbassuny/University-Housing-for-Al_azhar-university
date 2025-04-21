import {Router, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {MainPageComponent} from './components/main-page/main-page.component';
import OktaAuth from '@okta/okta-auth-js';
import {Injector} from '@angular/core';

function sendToLoginPage(oktaAuth: OktaAuth,injector:Injector) {
  const  router=injector.get(Router);
  router.navigate(['/login'])
}

export const routes: Routes = [
  {path:"mainPage",component:MainPageComponent,canActivate:[OktaAuthGuard],
    data:{onAuthRequired:sendToLoginPage}},
  {path:"login/callback",component:OktaCallbackComponent},
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/mainPage",pathMatch:"full"}
];
