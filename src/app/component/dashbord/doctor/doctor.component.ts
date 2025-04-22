import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { DoctorService } from '../../../services/doctor.service';
// import { DoctorResponse } from '../../../services/doctor.service'; // استيراد الواجهة
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms'; // تأكد من استيراد NgForm
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../../services/layout.service'; // استيراد الخدمة



@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{
    
  @ViewChild('appointmentForm') appointmentForm!: NgForm; 

  user: { name: string } = { name: ''}; // بيانات المستخدم
  notifications: string[] = [];
  appointments: any[] = []; // لتخزين المواعيد
  availableAppointments: any[] = []; // لتخزين المواعيد
  patients: any[] = []; // لتخزين بيانات المرضى
  doctorName: string = ''; // لتخزين اسم الطبيب
  doctorId: number = 0; // معرف الدكتور
  selectedDoctorId: string = '';
  newAppointment: { date: NgbDateStruct | null; time: NgbTimeStruct | null } = {
    date: null,
    time: { hour: 12, minute: 0, second: 0 } // وقت افتراضي
  };
  errorMessage: string = ''; // لتخزين رسالة الخطأ
  successMessage: string = ''; // لتخزين رسالة النجاح
  isCollapsed: boolean = false; // حالة الطي/التوسيع


  constructor(
    private notificationsService: NotificationsService,
    private doctorService: DoctorService,
    private authService: AuthService ,// لإدارة التوكن
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
   
      // جلب بيانات المستخدم
      this.authService.getUser().subscribe(userData => {
        this.user = userData;
      });
    // الحصول على معرف الدكتور الحالي
    const currentUser = this.authService.getCurrentUser();
    console.log('Current User:', currentUser);

  if (currentUser && currentUser.id) {
    this.doctorId = currentUser.id;
    this.loadAppointments(this.doctorId);
  } else {
    console.error('User data is not available.');
  }
    this.loadMyAppointments();
    // this.loadPatients();

   // مراقبة حالة الطي/التوسيع
   this.layoutService.isCollapsed$.subscribe(collapsed => {
     this.isCollapsed = collapsed;
   });
  }


    // تحميل جميع المواعيد المحجوزة وغير المحجوزة  الدكتور 
    loadMyAppointments(): void {
      this.doctorService.getMyAppointments().subscribe(
        (data) => {
          this.appointments = data; // تخزين المواعيد في المتغير
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }

    // جلب المواعيد المحجوزة للدكتور
    loadAppointments(doctorId: number): void {
      this.doctorService.getDoctorAppointments(doctorId).subscribe(
        (data) => {
          this.availableAppointments = data; // تخزين المواعيد في المتغير
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }
    
    addAppointment(): void {
      if (this.appointmentForm?.valid && this.newAppointment.date && this.newAppointment.time) {
        // تحويل التاريخ إلى تنسيق YYYY-MM-DD
        const formattedDate = `${this.newAppointment.date.year}-${this.pad(this.newAppointment.date.month)}-${this.pad(this.newAppointment.date.day)}`;
    
        // تحويل الوقت إلى تنسيق HH:mm
        const formattedTime = `${this.pad(this.newAppointment.time.hour)}:${this.pad(this.newAppointment.time.minute)}`;
    
        // إعداد البيانات المرسلة
        const appointmentData = {
          appointment_date: formattedDate, // الاسم الصحيح
          appointment_time: formattedTime  // الاسم الصحيح
        };
    
        console.log('Data being sent:', appointmentData); // تحقق من البيانات هنا
    
        this.doctorService.createAppointment(appointmentData).subscribe({
          next: (data) => {
            console.log('API Response:', data);
            this.appointments.push(data);
            this.appointmentForm.resetForm();
            alert('تم إنشاء الموعد بنجاح!');
          },
          error: (err) => {
            console.error('Error adding appointment:', err);
            if (err.error?.errors) {
              alert(`الأخطاء: ${JSON.stringify(err.error.errors)}`);
            } else {
              alert('فشل في إنشاء الموعد: ' + err.error?.message);
            }
          }
        });
      } else {
        alert('الرجاء ملء جميع الحقول المطلوبة.');
      }
    }
    
      // دالة مساعدة لإضافة صفر أمام الأرقام المفردة (1 → 01)
      private pad(num: number): string {
        return num < 10 ? `0${num}` : num.toString();
      }

      // جلب بيانات المرضى
      // loadPatients(): void {
      //   this.doctorService.getDoctorPatients(this.doctorId).subscribe(
      //     (response: DoctorResponse) => {
      //       console.log('Server Response:', response); // طباعة الاستجابة للتحقق
      //       this.doctorName = response.doctor; // تخزين اسم الطبيب
      //       this.patients = Array.isArray(response.patients) ? response.patients : [];
      //     },
      //     (error) => {
      //       console.error('Error fetching patients:', error);
      //       this.patients = [];
      //     }
      //   );
      // }

  deleteAppointment(appointmentId: number): void {
    this.doctorService.deleteAppointment(appointmentId).subscribe(
      (response) => {
        console.log('Appointment deleted successfully:', response);
        this.successMessage = 'Appointment deleted successfully.';
        this.errorMessage = '';
        this.loadMyAppointments();
      },
      (error) => {
        console.error('Error deleting appointment:', error);
        this.errorMessage = error?.error?.error || 'An error occurred while deleting the appointment.';
        this.successMessage = '';
      }
    );
  }


  
}
    
    






  // getNotifications(): void {
  //   this.notificationsService.getNotifications().subscribe(
  //     (data) => {
  //       this.notifications = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   );
  // }


