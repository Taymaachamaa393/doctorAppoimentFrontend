import { Injectable , Inject, PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Doctor } from '../models/doctor.model'; 
import { authDoctor } from '../models/authDoctor.model'; 
import { authPatient } from '../models/authPatient.model';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>(''); // دور المستخدم
  // private user = new BehaviorSubject<{ name: string; profileImage: string }>({
  //   name: '', // سيتم ملؤه من الـ API
  //   profileImage: '' // سيتم ملؤه من الـ API
  // }); 
  private user = new BehaviorSubject<{ name: string}>({
    name: '', // سيتم ملؤه من الـ API
  }); 
  private apiUrl = 'https://api-doctor.clingroup.net/api';

  constructor(private http: HttpClient, private router: Router , @Inject(PLATFORM_ID) private platformId: any) {
    this.initializeAuthState(); 
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; user: { name: string; email: string; role: string[] } }>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      map(response => {
        console.log('Server Response:', response); //  تحقق من الاستجابة

        if (!response || !response.token) {
          throw new Error('Invalid response from server');
        }

        // تخزين التوكن في LocalStorage
        this.setToken(response.token);

        // استخراج معرف المستخدم من التوكن
        const payload = JSON.parse(atob(response.token.split('.')[1]));
        const userId = payload.sub;

        // تخزين بيانات المستخدم
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', response.user.name);
        localStorage.setItem('userRole', response.user.role[0]);
        // localStorage.setItem('profileImage', response.user.profileImage); // تخزين صورة البروفايل

        // تحديث الحالة
        // this.setUser(response.user.name, response.user.profileImage); // تحديث بيانات المستخدم
         this.setUser(response.user.name); // تحديث بيانات المستخدم

        this.setUserRole(response.user.role[0]);
        this.setLoggedIn(true);    

        return response;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
}

registerDoctor(authdoctor: authDoctor): Observable<any> {
    const formData = new FormData();
    formData.append('name', authdoctor.name);
    formData.append('license_number',authdoctor.license_number);
    formData.append('email', authdoctor.email);
    formData.append('specialization', authdoctor.specialization);
    formData.append('password',authdoctor.password);
    formData.append('certificate', authdoctor.certificate, authdoctor.certificate.name);

    return this.http.post<any>(`${this.apiUrl}/signup-doctor`, formData);
}

registerPatient(patient: authPatient): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/signup-patient`, patient);
}



   // الحصول على توكن صالح}
getValidToken(): Observable<string> {
  const token = this.getToken();
  if (token && !this.isTokenExpired(token)) {
    return of(token); // التوكن صالح
  } else {
    return this.refreshToken(); // محاولة تحديث التوكن
  }
}

 
  getToken(): string {
    if (isPlatformBrowser(this.platformId)) { // التأكد من أننا في المتصفح
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) { // التأكد من أننا في المتصفح
      localStorage.setItem('token', token);
    }
  }
 // حذف التوكن
  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  // الحصول على بيانات المستخدم الحالي
  // getUser(): Observable<{ name: string; profileImage: string }> {
  //   return this.user.asObservable();
  // }
  getUser(): Observable<{ name: string}> {
    return this.user.asObservable();
  }

  // تحديث بيانات المستخدم
  // setUser(name: string, profileImage: string): void {
  //   this.user.next({ name, profileImage });
  // }
  setUser(name: string): void {
    this.user.next({ name });
  }

   // تهيئة حالة المصادقة عند بدء التطبيق
//   initializeAuthState() {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = this.getToken();
//       const userRole = localStorage.getItem('userRole');
//       const userName = localStorage.getItem('userName');
//     const profileImage = localStorage.getItem('profileImage');
//       if (token && userRole && userName && profileImage) {
//         this.setLoggedIn(true);
//         this.setUserRole(userRole);
//         this.setUser(userName, profileImage); // تعيين بيانات المستخدم
//     }
//   }
// }
initializeAuthState() {
  if (isPlatformBrowser(this.platformId)) {
    const token = this.getToken();
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    // const profileImage = localStorage.getItem('profileImage');
    if (token && userRole && userName) {
      this.setLoggedIn(true);
      this.setUserRole(userRole);
      this.setUser(userName || ''); // تعيين بيانات المستخدم
    }
  }
}

refreshToken(): Observable<any> {
  return this.http.post<{ access_token: string, token_type: string, expires_in: number, user: string }>(
    `${this.apiUrl}/refresh`,
    {} // ما يحتاج headers لأن Interceptor بيتكفل فيه
  ).pipe(
    map(response => {
      if (!response || !response.access_token) {
        throw new Error('Invalid response from refresh endpoint');
      }

      // حفظ التوكن الجديد
      this.setToken(response.access_token);
      localStorage.setItem('userName', response.user);

      return response.access_token;
    }),
    catchError(error => {
      console.error('Refresh token failed:', error);
      this.logout(); // تسجيل خروج المستخدم إذا فشل التحديث
      return throwError(() => new Error('Token refresh failed'));
    })
  );
}


  logout() {
    this.setLoggedIn(false);
    this.setUserRole('');
    this.clearToken();
    // this.setUser('', ''); // مسح بيانات المستخدم
    this.setUser(''); // مسح بيانات المستخدم

    this.router.navigate(['/login']);
  }


//////////
  // تحديث دور المستخدم
  setUserRole(role: string): void {
    this.userRole.next(role);
  }
  // الحصول على دور المستخدم الحالي
  getUserRole(): Observable<string> {
    return this.userRole.asObservable();
  }
  getcurrentUserRole() {
    return this.userRole.asObservable();
  }
////////////
 // تحديث حالة تسجيل الدخول
 setLoggedIn(value: boolean) {
  this.loggedIn.next(value);
}

  // الحصول على حالة تسجيل الدخول
  getisLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // الحصول على بيانات المستخدم الحالي
  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub,
        name: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole'),
        profileImage: localStorage.getItem('profileImage') // إضافة صورة البروفايل
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
  
  // التحقق من انتهاء صلاحية التوكن
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() >= expirationTime;
    } catch (e) {
      console.error('Error checking token expiration:', e);
      return true;
    }
  }

}


