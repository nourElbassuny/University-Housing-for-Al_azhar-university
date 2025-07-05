import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registerForm: FormGroup;
  showError: boolean=false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Registering user:', formData);
      this.login(formData.email, formData.password);
    } else {
      this.registerForm.markAllAsTouched();
    }

  }

  private login(email: string, password: string) {
    let token = "";
    this.authService.login(email, password).subscribe(
      res => {
        token = res.access_token;
        if (token !== null) {
          this.showError = false;
          this.authService.getDataFromToken(token);
          if (localStorage.getItem('role') == 'ADMIN')
          this.router.navigate(['/admin/dashboard']);
          else
            this.router.navigate(['/home']);
        }

      },
      error =>{
        this.showErrorMessage(true);
        console.log(this.showError);
      }
    );

  }
  showErrorMessage(flag: boolean) {
    this.showError = flag;
    setTimeout(() => {
      this.showError = false
    }, 6000)
  }

}


