import {Component, ElementRef, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import {ShareDataService} from '../../services/shareDataService/share-data.service';
import {StudentsService} from '../../services/studentService/students.service';
import {Student} from '../../Classes/student/student';
import {DatePipe, NgIf} from '@angular/common';
import {QRCodeComponent} from 'angularx-qrcode';
import {ZXingScannerModule} from '@zxing/ngx-scanner';


@Component({
  selector: 'app-student-details',
  imports: [
    DatePipe,
    NgIf,
    QRCodeComponent,
    ZXingScannerModule,
  ],
  templateUrl: './student-details.component.html',
  standalone: true,
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  studentId: number = 0;
  student: Student = new Student();
  storage: Storage = localStorage;
  private flag: boolean = true;
  @ViewChild('pdfIframe') pdf!: ElementRef;

  constructor(private sharedData: ShareDataService,
              private studentService: StudentsService) {
  }
  ngAfterViewInit() {
    const modalElement = document.getElementById('pdfModal');
    if (modalElement) {
      modalElement.addEventListener('shown.bs.modal', () => {
        const id = JSON.parse(localStorage.getItem('student_id')!);
        this.studentId = +id;
        const pdfUrl = `http://localhost:8084/api/studentFile/${this.studentId}`;
        this.pdf.nativeElement.src = pdfUrl;
      });
    }
  }
  ngOnInit(): void {
    this.getStudentId();
    if (this.studentId) {
      this.getStudentById(this.studentId);
    } else {
      const id = JSON.parse(localStorage.getItem('student_id')!);
      this.studentId = +id;
      this.getStudentById(this.studentId);
    }
  }

  getStudentById(id: number): void {
    if (this.flag) {
      this.storage.setItem('student_id', JSON.stringify(id));
      this.flag = false;
    }
    this.studentService.getStudentById(id).subscribe(
      data => {
        this.student = data;

      }
    )
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
    this.sharedData.currentStudentId.subscribe((data) => {
      this.studentId = data;
    })
  }

  viewStudentPDF() {
    const id = JSON.parse(localStorage.getItem('student_id')!);
    this.studentId = +id;

    const url = `http://localhost:8084/api/studentFile/${this.studentId}`;

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

  scannedIds: Set<string> = new Set(); // Prevent repeated alerts

  onCodeResult(result: string) {
    if (!this.scannedIds.has(result)) {
      this.scannedIds.add(result);
      alert('Student ID: ' + result);
    }
  }
}
