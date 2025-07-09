import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from '../../../Admin/services/studentService/students.service';
import {Student} from '../../../Classes/student/student';
import {DatePipe, NgClass} from '@angular/common';
import {QRCodeComponent} from 'angularx-qrcode';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-student-profile',
  imports: [
    DatePipe,
    NgClass,
    QRCodeComponent,

  ],
  templateUrl: './student-profile.component.html',
  standalone: true,
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  @ViewChild('barcode', {static: false}) barcodeElement!: ElementRef;
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
      res => {
        this.student = res
      },
      error => alert(error.message),
    )


  }


  downloadBarcode() {
    html2canvas(this.barcodeElement.nativeElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'barcode.png';
      link.click();
    });
  }

  protected readonly String = String;
}
