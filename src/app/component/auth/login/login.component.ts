import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe(
          (response) => {
            console.log('استجابة السيرفر:', response); 

               // حفظ التوكن
            this.authService.setToken(response.token);
            this.authService.setLoggedIn(true);
            // this.authService.setUserRole(response.role);

               // استخراج الدور من المصفوفة
           const userRole = response.user.role.length > 0 ? response.user.role[0] : '';
    
           this.authService.setUserRole(userRole);
           console.log('استجابة السيرفر:', userRole); 

  
            if (userRole === 'doctor') {
              this.router.navigate(['/doctor']);
            } else if (userRole === 'admin') {
              this.router.navigate(['/admin']);
            }else if (userRole === 'patient') {
              this.router.navigate(['/patient']);
            }else {
              console.error('الدور غير معروف:', userRole);
            }
          },
          (error) => {
            console.error('فشل تسجيل الدخول', error);
          }
        );
      }
    }
}
  
