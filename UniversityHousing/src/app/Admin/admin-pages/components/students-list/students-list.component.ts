import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

import {StudentsService} from '../../../services/studentService/students.service';
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
export class StudentsListComponent implements OnInit{
  studentList: Student[]=[];
  constructor(private studentService:StudentsService,private shareDataService:ShareDataService) {
  }
  ngOnInit() {
    this.getAllStudents();
  }
  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      res => this.studentList = res,
      error => alert(error.message)
    )
  }

}
