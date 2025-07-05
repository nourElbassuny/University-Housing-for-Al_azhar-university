import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {CardValidators} from '../../../validators/card-validators';
import {NgClass} from '@angular/common';
import {Student} from '../../../Classes/student/student';
import {StudentsService} from '../../../Admin/services/studentService/students.service';
import {CommonDataService} from '../../../Admin/services/commonDataService/common-data.service';
import {Governorate} from '../../../Classes/governorate/governorate';
import {State} from '../../../Classes/states/state';
import {Colleague} from '../../../Classes/colleague/colleague';
import {Department} from '../../../Classes/department/department';


@Component({
  selector: 'app-student-form',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './student-form.component.html',
  standalone: true,
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  checkoutFormGroup: FormGroup = new FormGroup({})
  userEmail: string = ""
  governorateData: Governorate[] = [];
  states:State[]=[];
  studentData: Student = {};
  colleagues:Colleague[]=[];
  departments:Department[]=[];

  constructor(private formBuilder: FormBuilder, private studentService: StudentsService, private commonDataService: CommonDataService) {
    this.checkoutFormGroup = this.formBuilder.group({

      arabicName: ['', [Validators.required, CardValidators.notOnlyWhiteSpace]],
      englishName: ['', [Validators.required, CardValidators.notOnlyWhiteSpace]],
      governorate: ['', [Validators.required]],
      state: ['', [Validators.required]],
      address: ['', [Validators.required, CardValidators.notOnlyWhiteSpace]],
      nationalId: ['', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
        CardValidators.notOnlyWhiteSpace,
        Validators.pattern('[0-9]*')
      ]],
      gender: ['', [Validators.required]],
      birthday: ['', [Validators.required, this.futureDateValidators]],
      phone: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        CardValidators.notOnlyWhiteSpace,
        Validators.pattern('[0-9]*')
      ]],
      colleague: ['', [Validators.required]],
      department: ['', [Validators.required]],
      stage: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      studentImage: [null, Validators.required],
      studentPdf: [null, Validators.required]
    });

  }

  errorText: string = "يجب ملء هذا الحقل";

  ngOnInit() {
    this.userEmail = localStorage.getItem('email')!;
    this.getAllGovernorate();
    this.getAllColleague();
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    this.setStudent();
    this.studentService.saveStudent(this.buildFormData()).subscribe(
      res => console.log(res.message),
      error => alert(error.message)
    );
  }

  private getAllColleague(): void {
     this.commonDataService.getAllColleague().subscribe(
      res=>this.colleagues=res,
       error => alert(error.message),
    )
  }
  private getAllDepartmentByColleagueId(id:number): void {
    this.commonDataService.getDepartmentsByColleagueId(id).subscribe(
      res=>this.departments=res,
      error => alert(error.message),
    )
  }

  private getAllGovernorate() {
    this.commonDataService.getAllGovernorate().subscribe(
      res => {
        this.governorateData = res;
      },
      error => alert(error.message)
    )
  }
  private getAllStatesByGovernorateId(id:number) {
    this.commonDataService.getStatesByGovernorateId(id).subscribe(
      res=> this.states=res,
      error => alert(error.message),
    )
  }

  private buildFormData(): FormData {
    const formData = new FormData();
    const image: File = this.checkoutFormGroup.value.studentImage;
    const file: File = this.checkoutFormGroup.value.studentPdf;
    formData.append('student', new Blob([JSON.stringify(this.studentData)], {
      type: 'application/json'
    }));
    formData.append('image', image);
    formData.append('file', file);

    return formData;
  }

  private setStudent(): void {
    this.studentData = {
      arabicName: this.checkoutFormGroup.value.arabicName,
      englishName: this.checkoutFormGroup.value.englishName,
      governorate: this.checkoutFormGroup.value.governorate,
      state: this.checkoutFormGroup.value.state,
      address: this.checkoutFormGroup.value.address,
      nationalId: this.checkoutFormGroup.value.nationalId,
      gender: this.checkoutFormGroup.value.gender,
      birthday: this.checkoutFormGroup.value.birthday,
      phone: this.checkoutFormGroup.value.phone,
      colleague: this.checkoutFormGroup.value.colleague,
      department: this.checkoutFormGroup.value.department,
      stage: this.checkoutFormGroup.value.stage,
      grade: this.checkoutFormGroup.value.grade,
      status: "UNDER_REVIEW"
    }
  }

  futureDateValidators(control
                         :
                         FormControl
  ):
    ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? {futureDate: true} : null;
  }

  onFileChange(event: Event, controlName: string
  ) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null;
    if (file) {
      this.checkoutFormGroup.get(controlName)?.setValue(file);

    } else {
      this.checkoutFormGroup.get(controlName)?.markAsTouched();
      this.checkoutFormGroup.get(controlName)?.setValue(null);
    }
  }



  getValue() {
    const getSelectedGovernorate = this.checkoutFormGroup.get('governorate')?.value;
    const getIdOfGovernorate:number = this.governorateData.find(n=>n.name===getSelectedGovernorate)?.id!;
    this.getAllStatesByGovernorateId(getIdOfGovernorate);
  }

  getDepartments() {
    const getSelectedColleague=this.checkoutFormGroup.get('colleague')?.value;
    const getIdOfDepartment:number=this.colleagues.find(n=>n.name===getSelectedColleague)?.id!;
    this.getAllDepartmentByColleagueId(getIdOfDepartment);
  }
}
