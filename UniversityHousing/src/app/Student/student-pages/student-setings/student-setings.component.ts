import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-student-setings',
  imports: [
    NgIf
  ],
  templateUrl: './student-setings.component.html',
  standalone: true,
  styleUrl: './student-setings.component.css'
})
export class StudentSetingsComponent {
  errorMessage: string="error";
  successMessage: string="success";

}
