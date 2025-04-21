import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from '../../config/my-app-config';
import OktaAuth from '@okta/okta-auth-js';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  oktaSignIn: any;

  constructor(@Inject(OktaAuth) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      logo: '',
      features: {
        registration: true
      },
      baseUrl: myAppConfig.oidc.issuer.split("/oauth2")[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      useClassicEngine: true,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit() {
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl({
        el: '#okta-sign-in-widget'
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {

          this.oktaAuth.signInWithRedirect();
        }
      }, (err: any) => {
        throw err;
      }
    );
  }



}
