import {Component, OnInit} from '@angular/core';
import {StudentAbsence, StudentsService} from '../../../Admin/services/studentService/students.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-student-holidays',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './student-holidays.component.html',
  standalone: true,
  styleUrl: './student-holidays.component.css'
})
export class StudentHolidaysComponent implements OnInit{
  checkoutForm:FormGroup;
  studentAbsences:StudentAbsence[]=[];
  constructor(private fb:FormBuilder,private studentService:StudentsService) {
    this.checkoutForm=this.fb.group({
      startDate: ['',Validators.required],
      endDate:['',Validators.required],
      reason:['']
    });

  }
  ngOnInit() {
    this.getAllAbsenceOfStudent();
  }



  getAllAbsenceOfStudent(){
    this.studentService.getCurrentStudentAbsence().subscribe(
      res=> {
        this.studentAbsences = res
        console.log(this.studentAbsences)
      },
      error => {alert(error.message)}
    )
  }

  save() {
    let data:StudentAbsence={
      startDate:this.checkoutForm.value?.startDate,
      endDate:this.checkoutForm.value?.endDate,
      reason:this.checkoutForm.value?.reason
    }
    this.studentService.saveStudentAbsence(data).subscribe(
      res=>{},
      error => {alert(error.message)}
    )
  }
}
