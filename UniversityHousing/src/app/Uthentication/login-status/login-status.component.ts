import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

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
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean=false;
  userFullName: any;

  constructor(private authService: AuthService,private router: Router) {}

  logout() {
    this.router.navigate(['/home'])
    this.authService.logout();
  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
