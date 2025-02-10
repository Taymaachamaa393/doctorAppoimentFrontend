import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://api-doctor.clingroup.net/api/notifications';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getNotifications(): Observable<any[]> {
    const token = this.authService.getToken();

    if (!token) {
      return new Observable<any[]>((observer) => {
        observer.error(new Error('User is not authenticated'));
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
