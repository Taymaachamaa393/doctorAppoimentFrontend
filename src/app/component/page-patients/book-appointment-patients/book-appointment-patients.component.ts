import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../../../services/patients.service';
import { Appointment } from '../../../models/appointment.model';  // استيراد الـ Interface
import { AppointmentRequest } from '../../../models/Patient.model';

@Component({
  selector: 'app-book-appointment-patients',
  templateUrl: './book-appointment-patients.component.html',
  styleUrl: './book-appointment-patients.component.css'
})
export class BookAppointmentPatientsComponent {

  appointmentForm: FormGroup;
  responseData: any;

  appointmentId: number = 7;  // مثال على المعرف الذي سيكون موجودًا في الرابط


  constructor(private fb: FormBuilder, private patientsService: PatientsService) {
    this.appointmentForm = this.fb.group({
      patient_name: ['', Validators.required, Validators.maxLength(255)],
      patient_health_status: ['', Validators.required],
      // appointment_type: ['offline', Validators.required]
    });
  }
 
 bookAppointment() {
//     // جلب معرف المستخدم من التخزين المحلي
//     const userId = Number(localStorage.getItem('userId')); // تحويل userId إلى رقم
//     if (!userId) {
//       console.error('User ID not found. Please log in.');
//       return;
//     }

//     console.log(`📌 حجز موعد للمريض رقم: ${userId}`); // طباعة للتأكد

//     this.patientsService.bookAppointment(userId, this.appointmentForm.value).subscribe(
//       response => {
//         this.responseData = response;
//         console.log('Appointment booked successfully:', response);
//       },
//       error => {
//         console.log('Patient ID:', `${userId}`);

//         console.error('Error booking appointment:', error);
//       }
//     );
//   }
// }


    if (this.appointmentForm.valid) {
      const patientData: AppointmentRequest = this.appointmentForm.value; // استخدام الـ Interface
      this.patientsService.bookAppointment(this.appointmentId, patientData).subscribe({
        next: (response) => {
          console.log('تم حجز الموعد بنجاح:', response);
          alert('تم حجز الموعد بنجاح!');
        },
        error: (error) => {
          console.error('خطأ في حجز الموعد:', error);
          alert('فشل حجز الموعد. حاول مرة أخرى.');
        }
      });
    } else {
      alert('يرجى تعبئة جميع الحقول بشكل صحيح.');
    }
  }
}
