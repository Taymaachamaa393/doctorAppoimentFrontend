import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; // خدمة لجلب بيانات المستخدم
import { LayoutService } from '../../../services/layout.service'; // خدمة للتحكم في حالة السيدبار
import { MediaMatcher } from '@angular/cdk/layout'; // للتحقق من حجم الشاشة
import { Observable, fromEvent, Subscription } from 'rxjs'; // للتعامل مع الأحداث القابلة للاشتراك

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
   
  isCollapsed: boolean = false; // حالة الطي/التوسيع
  userRole: string = ''; // دور المستخدم
  user: { name: string } = { name: '' }; // بيانات المستخدم
  isActive: boolean = true; // للتحكم في إظهار وإخفاء الـ Sidebar
  subscriptions: Subscription[] = [];
  isMobileMenuOpen: boolean = false; // حالة القائمة المنبثقة

  constructor(
     private authService: AuthService,
     private layoutService: LayoutService// خدمة التحكم في التخطيط  
     ){} 

  ngOnInit(): void {
    // مراقبة حالة النشاط
    this.subscriptions.push(
      this.layoutService.isSidebarActive$.subscribe(active => {
        this.isActive = active;
      })
    );

    // مراقبة حالة الطي/التوسيع
    this.subscriptions.push(
      this.layoutService.isCollapsed$.subscribe(collapsed => {
        this.isCollapsed = collapsed;
      })
    );

    // جلب دور المستخدم
    this.subscriptions.push(
      this.authService.getUserRole().subscribe(role => {
        this.userRole = role;
      })
    );
    // جلب بيانات المستخدم
    this.subscriptions.push(
      this.authService.getUser().subscribe(userData => {
        this.user = userData;
      })
    );
  }
  

  toggleCollapse(): void {
    this.layoutService.toggleCollapse(); // تبديل حالة الطي/التوسيع
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen; // تبديل حالة القائمة المنبثقة
  }

  // تنظيف الاشتراكات عند تدمير الكومبوننت
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  logout(): void {
    this.authService.logout();
  }

}






  


