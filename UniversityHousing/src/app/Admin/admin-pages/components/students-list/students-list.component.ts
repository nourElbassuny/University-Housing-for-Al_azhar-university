import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

import {PaginatedStudentResponse, StudentsService} from '../../../services/studentService/students.service';
import {RouterLink} from '@angular/router';
import {ShareDataService} from '../../../services/shareDataService/share-data.service';
import {Student} from '../../../../Classes/student/student';

@Component({
  selector: 'app-students-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './students-list.component.html',
  standalone: true,
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit {
  studentList: Student[] = [];
  response!: PaginatedStudentResponse;
  currentPage = 0;
  size = 1;

  constructor(private studentService: StudentsService) {
  }

  ngOnInit() {
    this.getAllStudents(0);
  }

  private getAllStudents(page: number) {
    this.studentService.getStudents(page, this.size).subscribe(
      res => this.studentList = res.content,
      error => {
        alert(error.message);
      }
    )
  }



}
