import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model'; 
import { authDoctor } from '../models/authDoctor.model'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'https://api-doctor.clingroup.net/api';

  // login(email: string, password: string) {
  //   return this.http.post<{ role: string }>('https://api-doctor.clingroup.net/api/login', { email, password });
  // }
  login(email: string, password: string) {
    return this.http.post<{ token: string; user: { role: string[] } }>(`${this.apiUrl}/login`,{ email, password });
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
 
  

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  
  }


  setUserRole(role: string) {
    this.userRole.next(role);
  }

  getisLoggedIn() {
    return this.loggedIn.asObservable();
  }
 
 
  getcurrentUserRole() {
    return this.userRole.asObservable();
  }

  logout() {
    this.setLoggedIn(false);
    this.setUserRole('');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // مسح التوكن عند تسجيل الخروج
  clearToken(): void {
    localStorage.removeItem('token'); // إزالة التوكن من التخزين المحلي
  }
}


