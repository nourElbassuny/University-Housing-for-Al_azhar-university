import {ApplicationConfig, Injector, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

import { routes } from './app.routes';
import {OKTA_CONFIG, OktaAuthGuard} from '@okta/okta-angular';
import myAppConfig from './config/my-app-config';
import OktaAuth from '@okta/okta-auth-js';
const oktaAuth = new OktaAuth(myAppConfig.oidc);

const oktaConfig=Object.assign({
  onAuthRequired: (oktaAuth:any,injector:Injector)=>{
    const router=injector.get(Router);
    router.navigate(['/login']);
  }
},myAppConfig.oidc)

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
