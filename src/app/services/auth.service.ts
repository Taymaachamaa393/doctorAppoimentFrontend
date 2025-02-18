import { Injectable , Inject, PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Doctor } from '../models/doctor.model'; 
import { authDoctor } from '../models/authDoctor.model'; 
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>('');
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

        // تحديث الحالة
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
  
  // الآن يتم التحقق أولًا من صلاحية التوكن، وإذا كان منتهي الصلاحية يتم استدعاء refreshToken().
  getValidToken(): Observable<string> {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return of(token); //  التوكن صالح، استخدمه
    } else {
      console.warn("Token expired, please login again.");
      this.logout();
      return throwError(() => new Error('Token expired')); //  انتهت صلاحية التوكن، يجب تسجيل الدخول مجددًا
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

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  initializeAuthState() {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const userRole = localStorage.getItem('userRole');
      if (token && userRole) {
        this.setLoggedIn(true);
        this.setUserRole(userRole);
      }
    }
  }

  logout() {
    this.setLoggedIn(false);
    this.setUserRole('');
    this.clearToken();
    this.router.navigate(['/login']);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  setUserRole(role: string) {
    this.userRole.next(role);
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.sub,
        name: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole')
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

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

  getisLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getcurrentUserRole() {
    return this.userRole.asObservable();
  }
 
}


