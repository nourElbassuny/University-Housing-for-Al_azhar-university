import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showError: boolean=false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Registering user:', formData);
      this.register(formData.email, formData.password);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private register(email: string, password: string) {
    let token = "";
    this.authService.register(email, password).subscribe(
      res => {
        token = res.access_token;
        if (token !== null) {
          this.showError = false;
          this.authService.getDataFromToken(token);
        }
        else {
          this.showErrorMessage(true);
          console.log(this.showError);
        }
      },
      error => alert(error.message)
    );
  }
  showErrorMessage(flag: boolean) {
    this.showError = flag;
    setTimeout(() => {
      this.showError = false
    }, 6000)
  }
}
