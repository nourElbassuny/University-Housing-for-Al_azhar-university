import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {LoginStatusComponent} from '../../../../../Uthentication/login-status/login-status.component';
import {ShareDataService} from '../../../../services/shareDataService/share-data.service';


@Component({
  selector: 'app-header',
  imports: [
    DatePipe,
    LoginStatusComponent,
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  providers: [
  { provide: LOCALE_ID, useValue: 'ar' }]})

export class HeaderComponent implements OnInit {
  currentDateTime: Date = new Date();

  private intervalId: any; // To track the interval
  constructor(private sharedData: ShareDataService,) {
  }
  ngOnInit() {

    // Update time every second
    this.intervalId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);


  }

  ngOnDestroy() {
    // Clean up the interval to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
