import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import {ShareDataService} from '../../services/shareDataService/share-data.service';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-status',
  imports: [
    NgIf,
    RouterLink,
  ],
  templateUrl: './login-status.component.html',
  standalone: true,
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{
  isAuthenticated: boolean = false;
  userFullName: string = '';
  constructor(private oktaAuthService:OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth:OktaAuth,
              private shareDataService:ShareDataService) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result)=>{
        this.isAuthenticated=result.isAuthenticated!;
        this.getUserDetails();
        this.changeStatus();
      }
    )
  }

  private getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
        }
      );
    }
  }
  logout():void{
    this.oktaAuth.signOut();
  }

  changeStatus(){
    this.shareDataService.changeStatus(this.isAuthenticated);
  }

}
