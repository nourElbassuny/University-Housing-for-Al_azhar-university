import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from '../../config/my-app-config';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  oktaSignIn:any;
  constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth) {
    this.oktaSignIn=new OktaSignIn({
      logo:'assets/images/logo.ico',
      baseUrl:myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId:myAppConfig.oidc.clientId,
      redirectUri:myAppConfig.oidc.redirectUri,
      useClassicEngine: true,
      authParams:{
        pkce:true,
        issuer:myAppConfig.oidc.issuer,
        scpes:myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
      this.oktaSignIn.remove();

    this.oktaSignIn.renderEl({
        el:'#okta-sign-in-widget'},// this name should be same as div tag id in login.component.html
      (response:any)=>{
        if (response.status === 'SUCCESS'){
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error:any)=>{
        alert(error.message);
        throw error;
      }

    )
  }
}
