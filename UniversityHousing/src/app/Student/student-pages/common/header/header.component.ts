import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../../../Uthentication/services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  dropdownOpen = false;
  firstCharacter: string="";
  showNotifications = false;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    })
    this.getFirstCharacter();
  }
  getFirstCharacter(){
    if(this.isAuthenticated){
      const email:string=localStorage.getItem('email')!;
      this.firstCharacter=email.substring(0,1).toUpperCase();
    }

  }

  notifications: any[] = [
    { id: 1, message: 'New user registered', importance: 'low', timestamp: '2025-07-06 15:30' },
    { id: 2, message: 'System update required', importance: 'medium', timestamp: '2025-07-06 14:20' },
    { id: 3, message: 'Security alert: Unauthorized access attempt', importance: 'low', timestamp: '2025-07-06 13:15' }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleDropdown(event: Event) {
    event.preventDefault(); // stop default anchor behavior
    event.stopPropagation(); // prevent closing from window click
    this.dropdownOpen = !this.dropdownOpen;
  }


  signOut() {
    this.authService.logout();
  }
}
