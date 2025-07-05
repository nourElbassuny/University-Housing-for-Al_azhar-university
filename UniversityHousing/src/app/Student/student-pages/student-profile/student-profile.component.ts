import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../../../Admin/services/studentService/students.service';
import {Student} from '../../../Classes/student/student';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-student-profile',
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './student-profile.component.html',
  standalone: true,
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {

  student!: Student;

  constructor(private studentService: StudentsService) {
  }

  ngOnInit() {
    this.getStudent();
  }

  getStudent() {
    this.studentService.getStudentImage().subscribe(
      res => {
        this.student.image = 'data:image/jpeg;base64,' + res.image;
      }
      , error => alert(error.message),
    )

    this.studentService.getStudent().subscribe(
      res => this.student = res,
      error => alert(error.message),
    )



  }


  getStudentStatus(status: string): string {
    switch (status) {
      case 'PENDING_REVIEW':
        return 'جارٍ مراجعة الملف';
      case 'APPROVED':
        return 'تمت الموافقة';
      case 'REJECTED':
        return 'تم الرفض';
      default:
        return 'غير معروف';
    }
  }

}
