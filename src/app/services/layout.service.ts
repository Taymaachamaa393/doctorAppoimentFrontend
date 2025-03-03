import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isCollapsedSubject = new BehaviorSubject<boolean>(false); // حالة الطي/التوسيع
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  private isSidebarActiveSubject = new BehaviorSubject<boolean>(false); // لن نستخدم window هنا
  isSidebarActive$ = this.isSidebarActiveSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
       // التحقق من وجود الكائن window
    if (isPlatformBrowser(this.platformId)) {
      // يمكننا الآن استخدام window لأنه في بيئة المتصفح فقط
      const isLargeScreen = window.innerWidth >= 992;
      this.isSidebarActiveSubject.next(isLargeScreen);

      window.addEventListener('resize', this.updateSidebarState.bind(this));  // مراقبة تغيير حجم الشاشة
    }
  }
   
   
    
  
        // this.updateSidebarState(); // تحديث حالة النشاط بناءً على حجم الشاشة عند التحميل
  
  
  
    
    // window.addEventListener('resize', this.updateSidebarState.bind(this));
//     1. التحقق من وجود window
// يمكننا التحقق من وجود الكائن window قبل استخدامه. إذا كان window غير معرف (في بيئة SSR)، يمكننا تجنب تنفيذ الكود المرتبط به.

  toggleCollapse(): void {
    this.isCollapsedSubject.next(!this.isCollapsedSubject.value); // تبديل حالة الطي/التوسيع
  }
  
  toggleSidebar(): void {
    this.isSidebarActiveSubject.next(!this.isSidebarActiveSubject.value); // تبديل حالة النشاط
  }

  setSidebarActive(status: boolean): void {
    this.isSidebarActiveSubject.next(status);
  }

  setCollapsed(status: boolean): void {
    this.isCollapsedSubject.next(status);
  }

  private updateSidebarState(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isLargeScreen = window.innerWidth >= 992;
      this.isSidebarActiveSubject.next(isLargeScreen); // تحديث حالة النشاط بناءً على حجم الشاشة
    }
  }

}



// 🔍 تحليل المشكلة
// HeaderComponent و SidebarComponent يتابعان حجم الشاشة بشكل منفصل
// كل واحد منهما يحتوي على MediaMatcher و isSmallScreen!
// هذا يؤدي إلى تعارض في تحديث isActive وقد لا يعمل إخفاء السيدبار كما تتوقع.
// عدم مزامنة isActive مع isCollapsed في LayoutService
// عندما يتم تحديث isActive في SidebarComponent، لا يتم إبلاغ HeaderComponent بذلك والعكس صحيح.



//  الحل الأمثل: استخدام LayoutService لمزامنة الحالة
//  خطوات الإصلاح
// اجعل LayoutService مسؤولًا عن التحكم في حالة isActive و isCollapsed
// استخدم LayoutService داخل HeaderComponent و SidebarComponent بدلًا من MediaMatcher في كل واحد منهما
// تأكد من أن toggleSidebar() يغيّر الحالة عالميًا بحيث يتم إخفاء السيدبار على الشاشات الصغيرة تلقائيًا.





// عند تحميل الصفحة، يتم تفعيل السيدبار فقط في الشاشات الكبيرة.
// عند تصغير الشاشة، يتم إخفاء السيدبار تلقائيًا.
// عند تغيير حجم النافذة، يتم تحديث حالة السيدبار.