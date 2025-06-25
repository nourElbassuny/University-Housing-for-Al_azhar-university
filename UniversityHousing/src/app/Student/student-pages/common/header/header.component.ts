import {Component, HostListener} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgClass
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownOpen = false;


  toggleDropdown(event: Event) {
    event.preventDefault(); // stop default anchor behavior
    event.stopPropagation(); // prevent closing from window click
    this.dropdownOpen = !this.dropdownOpen;
  }




}
