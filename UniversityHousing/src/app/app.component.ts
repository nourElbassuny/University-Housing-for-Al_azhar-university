import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {AdminPagesComponent} from './Admin/admin-pages/admin-pages.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminPagesComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UniversityHousing';
}
