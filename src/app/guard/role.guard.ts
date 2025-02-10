import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role']; // الحصول على الدور المطلوب من البيانات

  // الاشتراك في حالة تسجيل الدخول والدور
  return new Observable<boolean>((observer) => {
    authService.getisLoggedIn().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        observer.next(false);
        observer.complete();
        return;
      }

      // الحصول على الدور الحالي للمستخدم
      authService.getcurrentUserRole().subscribe((userRole) => {
        if (userRole !== requiredRole) {
          router.navigate(['/login']);
          observer.next(false);
        } else {
          observer.next(true);
        }
        observer.complete();
      });
    });
  });
};


