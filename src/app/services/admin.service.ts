import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://api-doctor.clingroup.net/api/admin'; // تحديث الرابط ليطابق السيرفر الجديد

  constructor(private http: HttpClient) {}

  // إعداد الهيدر مع التوكن
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // جلب التوكن من التخزين المحلي
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // جلب قائمة الأطباء المعلقين
  getPendingDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending-doctors`, {
      headers: this.getHeaders()
    });
  }

  // عرض شهادة طبيب معين
  getDoctorCertificate(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}/certificate`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }

  // الموافقة على طبيب
  verifyDoctor(doctorId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-doctor/${doctorId}`, {}, {
      headers: this.getHeaders()
    });
  }

  // رفض طلب طبيب
  rejectDoctor(doctorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reject-doctor/${doctorId}`, {
      headers: this.getHeaders()
    });
  }
}
