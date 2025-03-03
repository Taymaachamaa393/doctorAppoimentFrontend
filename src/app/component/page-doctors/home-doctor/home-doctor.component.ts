import { Component, OnInit} from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { DoctorService } from '../../../services/doctor.service';
import { DoctorResponse } from '../../../services/doctor.service'; // استيراد الواجهة
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrl: './home-doctor.component.css'
})
export class HomeDoctorComponent implements OnInit{
    

  user: { name: string } = { name: ''}; // بيانات المستخدم
  notifications: string[] = [];
 
  

  constructor(
    private notificationsService: NotificationsService,
    private doctorService: DoctorService,
    private authService: AuthService ,// لإدارة التوكن
   
  ) {}

  ngOnInit(): void {
   
      // جلب بيانات المستخدم
      this.authService.getUser().subscribe(userData => {
        this.user = userData;
      });
  
    }
  
}
    
    



