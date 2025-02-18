import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { AdminService } from '../../../services/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;

  constructor(private doctorService: DoctorService, private adminService:AdminService) {}

  ngOnInit(): void {
    this.loadDoctors();
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
