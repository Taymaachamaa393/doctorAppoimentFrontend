import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://api-doctor.clingroup.net/api/doctor'; // الرابط المعدل ليناسب Laravel

  constructor(private http: HttpClient) {}

  // إعداد الهيدر مع التوكن
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // جلب التوكن من التخزين المحلي
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // التوكن المستخدم في الهيدر
      'Content-Type': 'application/json'
    });
  }

  // جلب مواعيد الطبيب
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/my-appointments`, {
      headers: this.getHeaders() // إضافة الهيدر مع التوكن
    });
  }

  // إضافة موعد جديد
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/create-appointment`, appointment, {
      headers: this.getHeaders() // إضافة الهيدر مع التوكن
    });
  }

  // حذف موعد
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/appointments/${id}`, {
      headers: this.getHeaders() // إضافة الهيدر مع التوكن
    });
  }

}
