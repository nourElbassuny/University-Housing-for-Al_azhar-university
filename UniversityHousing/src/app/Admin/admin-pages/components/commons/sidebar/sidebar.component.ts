import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

import {RouterLink, RouterLinkActive} from '@angular/router';
import {ShareDataService} from '../../../../services/shareDataService/share-data.service';
import {AuthService} from '../../../../../Uthentication/services/auth.service';

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

  constructor(private shareDataService: ShareDataService,private authService: AuthService) {
  }
  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout():void{
    this.authService.logout();
  }
  setActive(item: string) {
    this.activeItem = item;
  }

}
