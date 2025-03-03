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
      // التحقق من حالة تسجيل الدخول
      this.authService.getisLoggedIn().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجلًا
     } });
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

    registerDoctor(): void {
      // توجيه المستخدم إلى صفحة تسجيل الطبيب
      this.router.navigate(['/doctorSignup']);
    }
  
    registerPatient(): void {
      // توجيه المستخدم إلى صفحة تسجيل المريض
      this.router.navigate(['/patientSignup']);
    }
}
  





 

 
  
