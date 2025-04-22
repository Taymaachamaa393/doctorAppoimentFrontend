import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Rating } from '../models/rating.model';
import { map, switchMap } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratingsUrl = 'https://api-doctor.clingroup.net/api/doctor'; // التقييمات

  constructor(private http: HttpClient) {}


  // إرسال تقييم جديد
  addRating(doctorId: number, rating: Rating ): Observable<any> {
    return this.http.post<any>(`${this.ratingsUrl}/${doctorId}/ratings`, rating);
  }

  
   // جلب التقييمات لطبيب معين
  getDoctorRatings(doctorId: number): Observable<{ratings: Rating[]}> {
    return this.http.get<{ ratings: Rating[] }>(`${this.ratingsUrl}/${doctorId}/ratings`)
  }

}

  
