import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { RatingService } from '../../../services/rating.service';
import { Rating } from '../../../models/rating.model';
import { DoctorService } from '../../../services/doctor.service';
// import { forkJoin } from 'rxjs';
import { switchMap, catchError, of, forkJoin } from 'rxjs';
import { DoctorPublic } from '../../../models/doctor.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-all-doctors',
  templateUrl: './view-all-doctors.component.html',
  styleUrl: './view-all-doctors.component.css'
})
export class ViewAllDoctorsComponent implements OnInit {
  doctorsPublic: DoctorPublic[] = [];  // تأكد أن النوع هو DoctorPublic
  loading: boolean = false;
  ratings: Rating[] = [];
  selectedDoctorId: number | null = null;
  newRating: Rating = { doctor_id: 0, rating: 0, review: '' };


  constructor(
    private sharedService: SharedService, 
    private doctorService: DoctorService, 
    private ratingService: RatingService,
    private router: Router) {}
 
  ngOnInit(): void {
    this.loadDoctors();
  }

    
  loadDoctors(): void {
    this.loading = true;
    this.doctorService.getDoctors().pipe(
      switchMap((doctors: DoctorPublic[]) => { // تحديد نوع doctors
        this.doctorsPublic = doctors;
        this.loading = false;
        const ratingObservables = doctors.map((doctor: DoctorPublic) => // تحديد نوع doctor
          this.ratingService.getDoctorRatings(doctor.id).pipe(
            catchError(() => of({ ratings: [] as Rating[] })) // تحديد نوع ratings
            
          )
        );
        return forkJoin(ratingObservables);
      })
    ).subscribe((responses: { ratings: Rating[] }[]) => { // تحديد نوع responses
      responses.forEach((response: { ratings: Rating[] }, index: number) => {
        this.doctorsPublic[index].ratings = response.ratings;
        this.loading = false;
      });
    });
  
  }

  openRatingModal(doctorId: number): void {
    this.selectedDoctorId = doctorId;
    this.newRating = { doctor_id: doctorId, rating: 0, review: '' }; 
  }

  // دالة لحجز موعد
  bookAppointment(doctorId: number) {
    console.log(`Booking appointment with doctor ID: ${doctorId}`);
    // هنا يمكنك إضافة المنطق الخاص بالحجز
  }
  
  // دالة لتقييم الطبيب
  rateDoctor(doctorId: number) {
    console.log(`Rating doctor with ID: ${doctorId}`);
    // هنا يمكنك إضافة المنطق الخاص بالتقييم
  }

  // getStarRating(rating: number): string {
  //   const fullStars = Math.floor(rating);
  //   const halfStar = rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt text-warning"></i>' : '';
  //   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  //   return '★'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  // }

  submitRating(): void {
    if (this.selectedDoctorId) {
      this.ratingService.addRating(this.selectedDoctorId, this.newRating).subscribe(response => {
        alert(response.message);
        this.selectedDoctorId = null;
      });
    }
  }

  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return `
      <span class="text-warning">
        ${'★'.repeat(fullStars)}
        ${halfStar ? '½' : ''}
        ${'☆'.repeat(emptyStars)}
      </span>
    `;
  }


  viewDoctorDetails(doctorId: number) {
  this.router.navigate(['/doctor-details', doctorId]); //  مع تمرير الـ ID التوجيه إلى صفحة التفاصيل
}

  goToSearchDoctors() {
   this.router.navigate(['/search-doctors']);
  }


}













  

  