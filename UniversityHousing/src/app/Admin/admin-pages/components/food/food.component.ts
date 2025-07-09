import {Component, OnInit} from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {KeyValuePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FoodService} from '../../../services/foodService/food.service';
import {FormsModule} from '@angular/forms';
import {StudentsService} from '../../../services/studentService/students.service';

@Component({
  selector: 'app-food',
  imports: [
    ZXingScannerModule,
    NgForOf,
    KeyValuePipe,
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './food.component.html',
  standalone: true,
  styleUrl: './food.component.css'
})
export class FoodComponent implements OnInit {
  selectedDevice: any = null;
  showScanner = false;
  isSubmitting = false;
  message: string = '';
  success: boolean = false;
  selectedDate: string = ''; // التاريخ الذي يختاره المستخدم
  totalScans: number = 0; // إجمالي عدد المسحات
  totalStudents!: number;
  lastScannedId!: number;
  lastScanTime!: number;


  constructor(private foodService: FoodService, private studentService: StudentsService) {
  }

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];// yyyy-MM-dd
    this.fetchScansByDate(); // تحميل عدد المسحات
    this.fetchTotalStudents(); // تحميل عدد الطلاب
  }

  toggleScanner() {

    this.showScanner = !this.showScanner;
  }

  handleScan(studentId: string) {
    const now = new Date().getTime();
    if (this.lastScannedId === +studentId && now - this.lastScanTime < 8000) {

      return;
    }

    this.lastScannedId = +studentId;
    this.lastScanTime = now;

    this.foodService.saveStudentMeal(+studentId).subscribe(
      res => {
        this.isSubmitting = true;
        this.message = res.status;
        this.success = true;
        this.isSubmitting = false;
        setTimeout(() => {
          this.message = '';
        }, 5000);

      }, error => {
        this.message = '❌ حدث خطأ أثناء التسجيل';
        this.success = false;
      }
    )

    setTimeout(() => {
      this.message = '';
    }, 5000);
  }


  fetchScansByDate() {
    this.foodService.getTotalMeals(this.selectedDate).subscribe(
      res => {
        this.totalScans = res.totalMeals
      },
      error => {
        alert(error.message);
      }
    )
  }

  private fetchTotalStudents() {
    this.studentService.getPresentStudents(this.selectedDate).subscribe(
      res => {
        this.totalStudents = res.count
      }, error => {
        alert(error.message);
      }
    )
  }
}

interface StudentScan {
  studentId: number;
  name: string;
  scanDate: string;
}
