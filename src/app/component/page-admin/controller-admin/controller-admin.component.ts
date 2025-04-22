import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor, DoctorCertificateResponse } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-controller-admin',
  templateUrl: './controller-admin.component.html',
  styleUrl: './controller-admin.component.css'
})
export class ControllerAdminComponent  implements OnInit {
  certificateUrl: string | null = null;
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;

  constructor(private doctorService: DoctorService, private adminService:AdminService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadDoctors();
  
  }

  loadDoctors(): void {
    this.adminService.getPendingDoctors().subscribe((doctors: Doctor[]) => {
      this.doctors = doctors; // الآن `doctors` تحتوي على مصفوفة صحيحة
    });
  }



  selectDoctor(doctor: Doctor): void  {
    console.log('Selected Doctor:', doctor);  // عرض بيانات الطبيب للتأكد
    this.selectedDoctor = { ...doctor }; //  نسخ الكائن لتجنب مشاكل المراجع
    // this.selectedDoctor = doctor;
      // استرجاع رابط الشهادة عند تحديد الطبيب
  // استرجاع رابط الشهادة عند تحديد الطبيب
    this.adminService.getDoctorCertificate(doctor.id).subscribe(
      (certificateUrl) => {
        if (this.selectedDoctor) { //  التأكد من أن `selectedDoctor` ليس null
          this.selectedDoctor.certificate_url = certificateUrl;
          console.log('Certificate URL:', this.selectedDoctor.certificate_url);
        }
      },
      (error) => {
        console.error('Error fetching certificate:', error);
      }
    );
  }
  

  approveDoctor(): void {
    if (confirm('هل أنت متأكد من قبول هذا الطبيب؟')) {
    if (this.selectedDoctor) {
      this.adminService.verifyDoctor(this.selectedDoctor.id).subscribe(() => {
        this.selectedDoctor = null;
        this.loadDoctors();
      });
    }
  }
}

  rejectDoctor(): void {
    if (confirm('هل أنت متأكد من رفض هذا الطبيب؟')) {
    if (this.selectedDoctor) {
      this.adminService.rejectDoctor(this.selectedDoctor.id).subscribe(() => {
        this.selectedDoctor = null;
        this.loadDoctors();
      });
    }
  }

}
getSafeUrl(url: string | undefined): SafeUrl {
  return url ? this.sanitizer.bypassSecurityTrustUrl(url) : '';
}
}
