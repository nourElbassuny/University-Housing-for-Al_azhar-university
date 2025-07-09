import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

import {PaginatedStudentResponse, StudentsService} from '../../../services/studentService/students.service';
import {RouterLink} from '@angular/router';
import {Student} from '../../../../Classes/student/student';
import {FormsModule} from '@angular/forms';
import {CommonDataService} from '../../../services/commonDataService/common-data.service';
import {Governorate} from '../../../../Classes/governorate/governorate';
import {Colleague} from '../../../../Classes/colleague/colleague';

@Component({
  selector: 'app-students-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './students-list.component.html',
  standalone: true,
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit {
  studentList: Student[] = [];
  governorateList: Governorate[] = [];
  collegeList: Colleague[] = [];
  response!: PaginatedStudentResponse;

  currentPage = 0;
  Page: number = 1;
  size = 1;
  totalPages!: number;

  filters = {
    search: '',
    governorate: '',
    college: '',
    grade: '',
    status: 'مقبول'
  };

  constructor(private studentService: StudentsService, private commonDataService: CommonDataService) {
  }

  ngOnInit() {
    this.getGovernorate();
    this.getCollage();
    this.applyFilter();
  }

  private getAllStudents(page: number) {
    this.studentService.getStudents().subscribe(
      res => this.studentList = res.content,
      error => {
        alert(error.message);
      }
    )
  }


  applyFilter() {
    console.log(this.filters)
    this.studentService.getFilteredStudents(this.filters).subscribe(data => {
        this.studentList = data.content;
        this.totalPages = data.totalPage;
        this.currentPage = data.currentPage;
      },error => {
        alert(error.message);
      }
    );
  }

  private getGovernorate() {
    this.commonDataService.getAllGovernorate().subscribe(
      res => this.governorateList = res,
      error => {
        alert(error.message);
      }
    )
  }

 private getCollage() {
    this.commonDataService.getAllColleague().subscribe(
      res => this.collegeList = res,
      error => {
        alert(error.message);
      }
    )
  }

  goToPage(number: number) {
    this.getAllStudents(number);
  }
}
