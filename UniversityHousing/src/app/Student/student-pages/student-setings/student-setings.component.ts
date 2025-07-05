import {Component} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService, ChangePasswordRequest} from '../../../Uthentication/services/auth.service';

@Component({
  selector: 'app-student-setings',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './student-setings.component.html',
  standalone: true,
  styleUrl: './student-setings.component.css'
})
export class StudentSetingsComponent {
  checkFormControl: FormGroup = new FormGroup({});
  errorMessage: string = "";
  successMessage: string = "";
  notEqual: boolean = false;
  changePasswordRequest!:ChangePasswordRequest;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.checkFormControl = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  save() {
    this.notEqual = this.checkFormControl.get('currentPassword')?.value !== this.checkFormControl.get('confirmPassword')?.value;
    if (this.notEqual) {
      this.errorMessage="غير متطابق"
      return;
    }
    this.getData();
    this.authService.changePassword(this.changePasswordRequest).subscribe(
      res=> {
        this.successMessage = res.message;
        this.checkFormControl.reset();
      },
      error=>this.errorMessage=error.message,
    )

  }

  getData():void{
    this.changePasswordRequest={
      currentPassword:this.checkFormControl.get('currentPassword')?.value,
      newPassword:this.checkFormControl.get('confirmPassword')?.value,
      confirmPassword:this.checkFormControl.get('confirmPassword')?.value,
    }
  }


}
