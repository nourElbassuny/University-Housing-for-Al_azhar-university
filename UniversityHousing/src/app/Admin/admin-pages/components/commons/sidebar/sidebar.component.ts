import {Component, Inject, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {OKTA_AUTH} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ShareDataService} from '../../../../services/shareDataService/share-data.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIf,
    RouterLink,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isAuthenticated: boolean = false;
  activeItem: string = 'home';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private shareDataService: ShareDataService) {
  }
  ngOnInit() {
    this.shareDataService.currentAuthenticated.subscribe(res=>{this.isAuthenticated=res})
  }

  logout():void{
    this.oktaAuth.signOut();
  }
  setActive(item: string) {
    this.activeItem = item;
  }

}
