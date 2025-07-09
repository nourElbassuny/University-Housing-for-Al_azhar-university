import {Component, ElementRef, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ShareDataService} from '../../../services/shareDataService/share-data.service';
import {StudentsService} from '../../../services/studentService/students.service';

import {DatePipe, NgClass, NgIf} from '@angular/common';
import {QRCodeComponent} from 'angularx-qrcode';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../../../Classes/student/student';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-student-details',
  imports: [
    DatePipe,
    NgIf,
    QRCodeComponent,
    ZXingScannerModule,
    NgClass,
  ],
  templateUrl: './student-details.component.html',
  standalone: true,
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  loading = true;
  studentId: number = 0;
  student: Student = new Student();
  isAbsent!: boolean;
  pdfBlobUrl: SafeResourceUrl | null = null;
  @ViewChild('pdfIframe') pdf!: ElementRef;

  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
  }

  getStudentActive() {
    this.studentService.getStudentActive(this.studentId).subscribe(
      res => {
        this.isAbsent = res.status
      },
      error => {
        alert(error.message);
      }
    )
  }

  preparePdf() {
    const url = `http://localhost:8084/api/auth/studentFile/${this.studentId}`;
    this.http.get(url, {responseType: 'blob'}).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    });
  }

  ngOnInit(): void {
    this.getStudentId();
    this.getStudentById(this.studentId);
    this.getStudentActive();

  }

  getStudentById(id: number): void {
    this.studentService.getStudentImageById(id).subscribe(
      res => {
        this.student.image = 'data:image/jpeg;base64,' + res.image;
        this.loading = false;
      }
      , error => alert(error.message),
    );

    this.studentService.getStudentById(id).subscribe(
      data => {
        this.student = data;
      }, error => {
        alert(error.message)
      }
    );

  }

  getStudentImage(id: number): void {
    this.studentService.getStudentImageByStudentId(id).subscribe(
      data => {
        this.student.image = data
      }, error => {
        alert(error.message)
      }
    )
  }

  getStudentId() {
    this.studentId = Number(this.route.snapshot.params['id']);
  }

  viewStudentPDF() {

    const url = `http://localhost:8084/api/auth/studentFile/${this.studentId}`;

    // Method 1: Directly open in new tab (if no auth needed)
    window.open(url, '_blank');

    // 🔒 Method 2: If you need auth (e.g. Okta/JWT), use this:
    /*
    this.http.get(url, { responseType: 'blob' }).subscribe((data) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
    */
  }




  changeStudentStatus(status: string) {

    this.studentService.changeStudentStatus(this.studentId, status).subscribe(
      res => console.log(res.status),
      error => alert(error.message)
    )
  }


}
