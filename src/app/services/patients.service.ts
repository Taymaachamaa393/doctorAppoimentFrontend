import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private apiUrl = 'http://api-doctor.clingroup.net/api/doctor';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getPatients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/patients`, {
      headers: this.getHeaders()
    });
  }
}
