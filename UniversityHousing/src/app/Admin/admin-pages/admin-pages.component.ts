import { Component } from '@angular/core';

import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/commons/header/header.component';
import {SidebarComponent} from './components/commons/sidebar/sidebar.component';


@Component({
  selector: 'app-admin-pages',
  imports: [
    HeaderComponent,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './admin-pages.component.html',
  standalone: true,
  styleUrl: './admin-pages.component.css'
})
export class AdminPagesComponent {

}
