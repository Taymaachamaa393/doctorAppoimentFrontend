import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit , OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service'; // استيراد الخدمة
import { isPlatformBrowser } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy,AfterViewInit {

  mobileQuery!: MediaQueryList;
  userRole: string = '';
  isLoggedIn = false;
  private routerSubscription: Subscription | null = null;
  isPublicPage: boolean = false; // هل الصفحة عامة أم لا
  user: { name: string } = { name: '' };
  isCollapsed: boolean = false; // حالة الطي/التوسيع
  isSmallScreen: boolean = false; // حالة الشاشة الصغيرة
  isMobileMenuOpen: boolean = false; // حالة القائمة المنبثقة
  private mobileQueryListener!: () => void;
  private subscriptions: Subscription = new Subscription(); //  استخدمنا Subscription هنا

  doctorLinks = [
    { name: 'Home', route: '/doctor/home-doctor', icon: 'fas fa-home' },
    { name: 'Appointments', route: '/doctor/appointmentsDoctor', icon: 'fas fa-calendar-check' },
    { name: 'Patients', route: '/doctor/Patients-doctor', icon: 'fas fa-user-injured' },
    { name: 'Settings', route: '/doctor/settings', icon: 'fas fa-cog' }
  ];
  
  adminLinks = [
    { name: 'Dashboard', route: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Users', route: '/admin/users', icon: 'fas fa-users' },
    { name: 'Reports', route: '/admin/reports', icon: 'fas fa-chart-line' },
    { name: 'Settings', route: '/admin/settings', icon: 'fas fa-cog' }
  ];
  
  patientLinks = [
    { name: 'My Appointments', route: '/patient/appointments', icon: 'fas fa-calendar-check' },
    { name: 'Profile', route: '/patient/profile', icon: 'fas fa-user' },
    { name: 'Doctors', route: '/patient/doctors', icon: 'fas fa-user-md' },
    { name: 'Settings', route: '/patient/settings', icon: 'fas fa-cog' }
  ];
  
       
  constructor(private authService: AuthService, private layoutService: LayoutService, private mediaMatcher: MediaMatcher,private router: Router,@Inject(PLATFORM_ID) private platformId: object) {
    //  this.isPublicPage = false;
  }
  
  ngOnInit(): void {
    // جلب دور المستخدم
  this.subscriptions.add(
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
      this.isLoggedIn = !!role;
    })
  );

  // جلب بيانات المستخدم
  this.subscriptions.add(
    this.authService.getUser().subscribe(userData => {
      this.user = userData;
    })
  );
  // هل الصفحة عامة
   // تحديد الصفحات العامة
   const publicPages = ['/home', '/about-us', '/services', '/search-doctors','/login','/doctorSignup','/patientSignup'];
   this.isPublicPage = publicPages.includes(this.router.url);
   
  
    // الاشتراك في أحداث التوجيه
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isPublicPage = publicPages.includes(this.router.url);
      }
  });
    

    // تحديد إذا كان المستخدم في صفحة عامة
    // const publicPages = ['/', '/home', '/about', '/contact'];
    // this.isPublicPage = publicPages.includes(this.router.url);
  
    
  // التحقق من حجم الشاشة
  this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 992px)');
  this.isSmallScreen = this.mobileQuery.matches;
  
  // إنشاء دالة التغيير
  this.mobileQueryListener = () => {
    this.isSmallScreen = this.mobileQuery.matches;
    this.layoutService.setSidebarActive(!this.isSmallScreen);
  };
  


// استخدمنا الطريقة المناسبة لإضافة أو إزالة الحدث
if (this.mobileQuery.addEventListener) {
  this.mobileQuery.addEventListener('change', this.mobileQueryListener);
} else {
  this.mobileQuery.addListener(this.mobileQueryListener);
}
  // حفظ الاشتراك لإزالته عند التدمير
//  إضافة كود التنظيف إلى `subscriptions`
this.subscriptions.add(
  new Subscription(() => {
    if (this.mobileQuery.removeEventListener) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    } else {
      this.mobileQuery.removeListener(this.mobileQueryListener);
    }
  })
);
  
    // مراقبة حالة الطي/التوسيع
  this.subscriptions.add(
    this.layoutService.isCollapsed$.subscribe(collapsed => {
      this.isCollapsed = collapsed;
    })
  );
}
     
  toggleSidebar(): void {
    this.layoutService.toggleSidebar(); // تبديل حالة النشاط
  }


  // عند الضغط على زر القائمة، نغير حالة القائمة المنسدلة
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
   // دالة لإغلاق القائمة بعد اختيار العنصر
   closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }


  logout(): void {
    this.authService.logout();
  }

  // دالة إلغاء الاشتراكات في ngOnDestroy
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); //  تنظيف جميع الاشتراكات عند تدمير المكون
    }


    ngAfterViewInit() {
      if (isPlatformBrowser(this.platformId)) {
        // هذا الكود سيعمل فقط في المتصفح
        const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
        dropdownElementList.forEach(dropdown => {
          new (window as any).bootstrap.Dropdown(dropdown);
        });
      }
    }
  }

