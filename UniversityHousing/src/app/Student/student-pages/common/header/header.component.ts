import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../../Uthentication/services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  dropdownOpen = false;
  firstCharacter: string="";

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



  toggleDropdown(event: Event) {
    event.preventDefault(); // stop default anchor behavior
    event.stopPropagation(); // prevent closing from window click
    this.dropdownOpen = !this.dropdownOpen;
  }


  signOut() {
    this.authService.logout();
  }
}
