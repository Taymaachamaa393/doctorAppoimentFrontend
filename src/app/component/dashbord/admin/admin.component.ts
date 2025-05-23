import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service';// استيراد الخدمة


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  user: { name: string } = { name: ''}; // بيانات المستخدم

  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  isCollapsed: boolean = false; // حالة الطي/التوسيع

  
  constructor(private authService: AuthService ,private doctorService: DoctorService, private adminService:AdminService, private layoutService: LayoutService) {}

  ngOnInit(): void {
        // جلب بيانات المستخدم
        this.authService.getUser().subscribe(userData => {
          this.user = userData;
        });
    this.loadDoctors();

    
   // مراقبة حالة الطي/التوسيع
   this.layoutService.isCollapsed$.subscribe(collapsed => {
    this.isCollapsed = collapsed;
  });
  }

  loadDoctors(): void {
    this.adminService.getPendingDoctors().subscribe((doctors: Doctor[]) => {
      this.doctors = doctors; // الآن `doctors` تحتوي على مصفوفة صحيحة
    });
  }
  
  

  selectDoctor(doctor: Doctor): void {
    this.selectedDoctor = doctor;
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

}



