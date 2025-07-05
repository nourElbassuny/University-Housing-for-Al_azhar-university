import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {AdminPagesComponent} from './Admin/admin-pages/admin-pages.component';
import {StudentPagesComponent} from './Student/student-pages/student-pages.component';
import {AuthService} from './Uthentication/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminPagesComponent, StudentPagesComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'UniversityHousing';
  isAdmin: boolean=false;
  goToAdminPage: boolean=false;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
   this.isAdmin=this.authService.isAdmin();
    this.goToAdminPage=this.authService.goToAdminPage();
  }


}
