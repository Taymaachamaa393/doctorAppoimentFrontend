import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // حقن الخدمة
  const token = authService.getToken(); // جلب التوكن من الخدمة

  // تعديل الطلب بإضافة الهيدر إذا كان التوكن موجودًا
  const modifiedReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(modifiedReq);
};

