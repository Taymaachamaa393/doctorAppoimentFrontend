import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'project';
  userRole: string = '';
  isLoggedIn = false;
  isPublicPage: boolean = false; // هل الصفحة عامة أم لا

  user: { name: string } = { name: '' };
       
  constructor(private authService: AuthService,private router: Router) {
    this.isPublicPage = false;
  }
  
  ngOnInit(): void {
    // جلب دور المستخدم
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });

    // جلب بيانات المستخدم
    this.authService.getUser().subscribe(userData => {
      this.user = userData;
    });
    

    // تحديد إذا كان المستخدم في صفحة عامة
    const publicPages = ['/', '/home', '/about', '/contact'];
    this.isPublicPage = publicPages.includes(this.router.url);
  // قائمة بمسارات الداشبورد التي لا يجب أن تظهر فيها النافبار العامة
  const dashboardRoutes = [
    '/admin/dashboard', 
    '/doctor/home-doctor', 
    '/doctor/appointmentsDoctor', 
    '/doctor/Patients-doctor', 
    '/doctor/settings', 
    '/patient/appointments', 
    '/patient/profile', 
    '/patient/doctors', 
    '/patient/settings'
  ];

    // تحقق مما إذا كان المسار الحالي ضمن صفحات الداشبورد
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.isPublicPage = dashboardRoutes.some(route => event.url.includes(route));
      }
    });


  }

}



   
   