import {Component, Inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {OktaAuthStateService} from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav.component.html',
  standalone: true,
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(private oktaAuthService:OktaAuthStateService,
              @Inject(OktaAuth) private oktaAuth: OktaAuth) {
  }
  ngOnInit() {
    this.oktaAuthService.authState$.subscribe((result)=>{
      this.isAuthenticated=result.isAuthenticated!;
      this.getUserDetails();
    })
  }

  private getUserDetails() {
    if (this.isAuthenticated){
      this.oktaAuth.getUser().then(
        (res)=>{
          this.userFullName=res.name as string;
        }
      )
    }
  }
  logout():void{
    this.oktaAuth.signOut();
  }
}
