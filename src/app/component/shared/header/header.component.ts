import { Component, AfterViewInit, HostListener, Inject, PLATFORM_ID, OnInit , OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service'; // استيراد الخدمة
import { isPlatformBrowser } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent implements OnInit, OnDestroy,AfterViewInit {

  mobileQuery!: MediaQueryList;
  userRole: string = '';
  isLoggedIn: boolean = false;
  private routerSubscription: Subscription | null = null;
  isPublicPage: boolean = false; // هل الصفحة عامة أم لا
  user: { name: string } = { name: '' };
  isCollapsed: boolean = false; // حالة الطي/التوسيع
  isSmallScreen: boolean = false; // حالة الشاشة الصغيرة
  isMobileMenuOpen: boolean = false; // حالة القائمة المنبثقة
  isDropdownOpen = false;
  selectedOption: string | null = null;
  hoveredOption: string | null = null;
  isNavbarOpen = false;

  
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


  options = [
    { label: 'Sign In', link: '/login' },
    { label: 'Sign Up Doctor', link: '/doctorSignup' },
    { label: 'Sign Up patient', link: '/patientSignup' },
    // { label: 'Log Out', link: '/login' }
  ];
  
  
     
  // قائمة الصفحات العامة
  private publicPages = ['/home', '/about-us', '/services', '/search-doctors', '/login', '/doctorSignup', '/patientSignup', '/view-all-doctors', '/doctor-details', '/patient/book-appointment-patient'];


  constructor(private authService: AuthService, private layoutService: LayoutService, private mediaMatcher: MediaMatcher,private router: Router,@Inject(PLATFORM_ID) private platformId: object, private changeDetectorRef: ChangeDetectorRef ) {
    
      // الاشتراك في NavigationEnd
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateNavbar();  // تحديث النافبار عند اكتمال التوجيه
          this.changeDetectorRef.detectChanges(); // تحفيز Angular لتحديث الواجهة
        }
      });
  }  
  


  ngOnInit(): void {
   
      // تحديث حالة `isPublicPage` مباشرة عند تحميل الصفحة
      this.isPublicPage = this.isRoutePublic(this.router.url);
      
      // الاشتراك في تغيير المسار لضبط حالة الصفحة العامة
      this.routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isPublicPage = this.isRoutePublic(event.url);
          this.updateNavbar(); // تحديث navbar بناءً على المسار
        }
      });
  
  

   this.subscriptions.add(
    this.authService.getisLoggedIn().subscribe(isLogged => {
      this.isLoggedIn = isLogged;

      if (this.isLoggedIn) {
        // تحميل بيانات المستخدم فقط عند تسجيل الدخول
        this.subscriptions.add(
          this.authService.getUserRole().subscribe(role => {
            this.userRole = role;
          })
        );
        this.subscriptions.add(
          this.authService.getUser().subscribe(userData => {
            this.user = userData;
          })
        );
      } else {
        // إعادة تعيين البيانات عند تسجيل الخروج
        this.userRole = '';
        this.user = { name: '' };
      }
    })
  );
      

   
      
    // تحقق من دور المستخدم فورًا بعد تحميل الصفحة
    // this.subscriptions.add(
    //   this.authService.getUserRole().subscribe(role => {
    //     this.userRole = role;
    //     this.isLoggedIn = !!role;
    //     this.updateNavbar(); // تأكد من تحديث حالة الشريط العلوي
    //   })
    // );


    
 
    // احصل على بيانات المستخدم
    this.subscriptions.add(
       this.authService.getUser()?.subscribe((userData: { name: string }) => {
         if (userData) {
           this.user = userData;
         }
       })
     );
   

  // لحل مشكلة عدم ظهور النافبار العام في صفحة تفاصيل الطبيب (doctor-details)، قم بتعديل الكود في ملف header.component.ts كالتالي:


  
  // 1. تحديث شرط تحديد الصفحات العامة
  // استخدم startsWith بدلًا من includes للتعامل مع المسارات الديناميكية:

  // 2. التأكد من إضافة المسار الديناميكي في publicPages
  // تأكد من أن المسار /doctor-details مضاف إلى المصفوفة publicPages بدون معلمات.
//   تحقق من تعريف المسار في app-routing.module.ts
// تأكد من أن المسار معرف بشكل صحيح مع المعلمة id:
  // const routes: Routes = [
  //   { path: 'doctor-details/:id', component: DoctorDetailsComponent },
  // ];

  
// بتقلك مااريااا مافي داعي الك بعمل ريفريش وخلصت القصة
  setTimeout(() => {
    this.isPublicPage = this.isRoutePublic(this.router.url);
  }, 100);

  
  
 
    
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


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavbar();  // تأكد من تحديث الـ Navbar في كل مرة يتم فيها التوجيه
      }
  });
  
}
  // دالة للتحقق إذا كان المسار الحالي عامًا
  private isRoutePublic(route: string): boolean {
      // استخدم `startsWith` لمقارنة المسار الحالي مع المسارات العامة
      return this.publicPages.some(page => route.includes(page));
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

  goToDashboard(): void {
    this.authService.getUserRole().subscribe((userRole: string) => {
      this.userRole = userRole;
      this.updateNavbar();  // تأكد من تحديث النافبار قبل التوجيه
      
      // التوجيه بناءً على الدور
      if (userRole === 'doctor') {
        this.router.navigate(['/doctor']);
      } else if (userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'patient') {
        this.router.navigate(['/patient']);
      } else {
        this.router.navigate(['/login']);
        console.error('⚠️ الدور غير معروف:', userRole);
      }
    });
  }

    // دالة لتحديث النافبار بناءً على الدور
  private updateNavbar(): void {
    const currentUrl = this.router.url;
    
    // تحقق من ما إذا كانت الصفحة من الصفحات العامة
    this.isPublicPage = this.isRoutePublic(currentUrl);
    
    if (this.isPublicPage) {
      this.isLoggedIn = false;
      this.userRole = '';
    } else {
      // التأكد من أن دور المستخدم يتم تحميله بشكل صحيح
      this.authService.getUserRole().subscribe((role) => {
        this.userRole = role;
        this.isLoggedIn = true;
      });
    }
  }

  // private updateNavbar(): void {
  //   if (this.isPublicPage) {
  //     this.isLoggedIn = false;
  //     this.userRole = '';
  //   }
  // }
  
 
  logout(): void {
    this.authService.logout();     // ← تسجيل الخروج
    this.isMobileMenuOpen = false; // ← إغلاق المينيو بعد تسجيل الخروج
  }


  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // هذا الكود سيعمل فقط في المتصفح
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdown => {
        new (window as any).bootstrap.Dropdown(dropdown);
      });
    }
    this.changeDetectorRef.detectChanges(); 
  }
 


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false; // إغلاق القائمة بعد الاختيار
  }

   // إغلاق القائمة عند النقر في أي مكان خارجها
   @HostListener('document:click', ['$event'])
   closeDropdown(event: Event) {
     document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
       if (!menu.parentElement?.contains(event.target as Node)) {
         menu.classList.remove('show');
       }
     });
   }

 
   
    // التحكم في فتح وإغلاق النافبار
   toggleNavbar(): void {
     this.isNavbarOpen = !this.isNavbarOpen;
   }
 
   // إغلاق النافبار عند النقر على خيار من القائمة
   closeNavbarOnItemSelect(): void {
    this.isNavbarOpen = false;
  }
 
   // إغلاق النافبار عند النقر في أي مكان خارجها
   @HostListener('document:click', ['$event'])
   handleClickOutside(event: Event): void {
     const targetElement = event.target as HTMLElement;
     if (this.isNavbarOpen && !targetElement.closest('.navbar') && !targetElement.closest('.navbar-toggler')) {
       this.isNavbarOpen = false;
     }
   }


   
  // دالة إلغاء الاشتراكات في ngOnDestroy
  //  تنظيف جميع الاشتراكات عند تدمير المكون
    
    ngOnDestroy(): void {
      // تنظيف جميع الاشتراكات
      this.subscriptions.unsubscribe();
  
      // إلغاء اشتراك router.events
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
  
      // إزالة مستمع الحدث الخاص بحجم الشاشة
      if (this.mobileQuery.removeEventListener) {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
      } else {
        this.mobileQuery.removeListener(this.mobileQueryListener);
      }
    }

  }



 
   

