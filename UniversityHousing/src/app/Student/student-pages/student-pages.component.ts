import {Component, OnInit} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from "./common/footer/footer.component";
import {HeaderComponent} from "./common/header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from '@angular/common';
import {StudentsService} from '../../Admin/services/studentService/students.service';
import {AuthService} from '../../Uthentication/services/auth.service';

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
export class StudentPagesComponent implements OnInit {
  dropdownOpen = false;
  isExpanded = true;
  isAuthenticated = false;
  userEmail: string="";
  isAdmin: boolean=false;
  constructor(private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.getUserEmail();
    this.isAdmin=this.authService.isAdmin();
  }
  private getUserEmail(){
    this.userEmail=localStorage.getItem('email')!;
    this.userEmail=this.userEmail.substr(0,this.userEmail.indexOf('@'));
  }


  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDropdown(event: Event) {
    event.preventDefault(); // stop default anchor behavior
    event.stopPropagation(); // prevent closing from window click
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen);
  }

  signOut() {
    this.authService.logout();
  }
}
