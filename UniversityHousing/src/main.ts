/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {importProvidersFrom} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import myAppConfig from './app/config/my-app-config';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

registerLocaleData(localeAr, 'ar');
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes),importProvidersFrom(ReactiveFormsModule, OktaAuthModule), // Include OktaAuthModule
    {
      provide: OKTA_CONFIG,
      useValue: { oktaAuth }  // Provide configuration
    },
    {
      provide: OktaAuth,        // Explicitly provide OktaAuth service
      useValue: oktaAuth
    }],
}).catch((err) => {alert(err.message)});
