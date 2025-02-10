import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Doctor } from '../models/doctor.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'https://api-doctor.clingroup.net/api/doctors';
  private pendingDoctorsUrl = 'https://api-doctor.clingroup.net/api/admin/pending-doctors';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // جلب جميع الأطباء
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }
 
  getPendingDoctors(): Observable<Doctor[]> {
    return this.http.get<{ doctors: Doctor[] }>(this.pendingDoctorsUrl).pipe(
      map(response => response.doctors) //  استخراج المصفوفة تلقائيًا
    );
  }
  
  // جلب الأطباء المعلقين
  // getPendingDoctors(): Observable<Doctor[]> {
  //   return this.http.get<Doctor[]>(this.pendingDoctorsUrl);
  // }
  // قبول الطبيب
  approveDoctor(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approve`, {});
  }
  // رفض الطبيب
  rejectDoctor(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, {});
  }
  
}


