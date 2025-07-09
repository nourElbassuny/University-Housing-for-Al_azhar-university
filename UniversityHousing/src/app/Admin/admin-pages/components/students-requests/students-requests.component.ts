import {Component, OnInit} from '@angular/core';
import {Student} from '../../../../Classes/student/student';
import {PaginatedStudentResponse, StudentsService} from '../../../services/studentService/students.service';
import {NgForOf, NgIf} from '@angular/common';
import {CommonDataService} from '../../../services/commonDataService/common-data.service';
import {Governorate} from '../../../../Classes/governorate/governorate';
import {Colleague} from '../../../../Classes/colleague/colleague';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-students-requests',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './students-requests.component.html',
  standalone: true,
  styleUrl: './students-requests.component.css'
})
export class StudentsRequestsComponent implements OnInit {
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
    status: ''
  };

  constructor(private studentService: StudentsService, private commonDataService: CommonDataService) {
  }


  ngOnInit() {
    this.getCollage();
    this.getGovernorate();
    this.getAllStudents(0);
  }


  private getGovernorate() {
    this.commonDataService.getAllGovernorate().subscribe(
      res => this.governorateList = res,
      error => {
        alert(error.message);
      }
    )
  }

  getCollage() {
    this.commonDataService.getAllColleague().subscribe(
      res => this.collegeList = res,
      error => {
        alert(error.message);
      }
    )
  }

  private getAllStudents(page: number) {
    this.studentService.getStudents().subscribe(
      res => {
        this.studentList = res.content
        this.totalPages = res.totalPage;
        this.currentPage = res.currentPage;
      },
      error => {
        alert(error.message);
      }
    )
  }


  goToPage(number: number) {
    this.getAllStudents(number);
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
}

