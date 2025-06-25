import { Component } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from "./common/footer/footer.component";
import {HeaderComponent} from "./common/header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-student-pages',
  imports: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    RouterLink,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './student-pages.component.html',
  standalone: true,
  styleUrl: './student-pages.component.css'
})
export class StudentPagesComponent {
  dropdownOpen = false;
  isExpanded = true;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(event: Event) {
    event.preventDefault(); // stop default anchor behavior
    event.stopPropagation(); // prevent closing from window click
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
  }
}
