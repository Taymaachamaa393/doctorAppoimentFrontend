import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { SharedService } from '../../../services/shared.service';
import { DoctorPublic } from '../../../models/doctor.model';
import { RatingService } from '../../../services/rating.service';
import { Rating } from '../../../models/rating.model';
import { Doctor } from '../../../models/doctor.model';
import { switchMap, catchError, of, forkJoin } from 'rxjs';


@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})

export class DoctorDetailsComponent implements OnInit {
  doctorsPublic!: DoctorPublic;
  ratings: Rating[] = [];
  selectedDoctorId: number | null = null;
  newRating: Rating = { doctor_id: 0, rating: 0, review: '' }; 
  isLoggedIn: boolean = false;

    // doctor!: DoctorPublic; // تعريف كائن الطبيب
   
  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private sharedService: SharedService,
    private ratingService: RatingService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadDoctorDetails();
  }

 // فحص إذا كان المستخدم مسجّل الدخول  
  checkLoginStatus(): void {
    if (typeof window !== 'undefined' && localStorage) { // التحقق من البيئة
      this.isLoggedIn = !!localStorage.getItem('token');
    } else {
      this.isLoggedIn = false; // إذا كنا في بيئة السيرفر، نفترض أنه غير مسجل الدخول
    }
  }
  
    //  جلب تفاصيل الطبيب والتقييمات معًا باستخدام forkJoin
    // loadDoctorDetails(id: number): void {
    //   forkJoin({
    //     doctor: this.doctorService.getDoctorById(id).pipe(catchError(() => of(null))),
    //     ratings: this.ratingService.getDoctorRatings(id).pipe(catchError(() => of({ ratings: [] })))
    //   }).subscribe(({ doctor, ratings }) => {
    //     if (doctor) {
    //       this.doctor = { ...doctor, ratings: ratings.ratings };
    //     } else {
    //       console.error('❌ الطبيب غير موجود');
    //       this.router.navigate(['/not-found']); // توجيه لصفحة خطأ إذا لم يتم العثور على الطبيب
    //     }
    //   });
    // }
    
    
    loadDoctorDetails(): void {
      this.route.paramMap.subscribe(params => {
        const doctorId = Number(params.get('id')); // استخراج ID من الرابط
        if (doctorId) {
          this.doctorService.getDoctorById(doctorId).subscribe((doctor: DoctorPublic | undefined) => {
            if (doctor) {
              this.doctorsPublic = doctor;
            } else {
              console.error('Doctor not found');
            }
          });
    
          // جلب التقييمات الخاصة بالطبيب
          this.ratingService.getDoctorRatings(doctorId).subscribe(response => {
            this.ratings = response.ratings;
          });
        }
      });
    }
    
  
      //  دالة لحجز موعد
    bookAppointment(): void {
      if (!this.isLoggedIn) {
        this.router.navigate(['/login']);
      } else {
        console.log(`📅 حجز موعد للطبيب: ${this.doctorsPublic?.name ?? 'غير معروف'}`);
        this.router.navigate(['/patient/book-appointment-patient']); // قم بتغيير المسار حسب الحاجة
      }
    }

//  Book-appointment-patients

  //  دالة لتقييم الطبيب
 rateDoctor(): void {
    console.log(`⭐ فتح نافذة تقييم للطبيب: ${this.doctorsPublic?.name ?? 'غير معروف'}`);
  // أضف منطق التقييم هنا
 }
 
}
