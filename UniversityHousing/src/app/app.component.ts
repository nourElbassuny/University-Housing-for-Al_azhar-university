import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SidebarComponent} from './components/commons/sidebar/sidebar.component';
import {HeaderComponent} from './components/commons/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UniversityHousing';
}
