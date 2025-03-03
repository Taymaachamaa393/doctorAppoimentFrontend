import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { SearchDoctorsComponent } from './component/search-doctors/search-doctors.component';
import { ReportsComponent } from './component/reports/reports/reports.component';
import { PatientsComponent } from './component/dashbord/patients/patients.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DoctorComponent } from './component/dashbord/doctor/doctor.component';
import { DoctorSignupComponent } from './component/auth/doctor-signup/doctor-signup.component';
import { AdminComponent } from './component/dashbord/admin/admin.component';
import { PatientSignupComponent } from './component/auth/patient-signup/patient-signup.component';
import { LoginComponent } from './component/auth/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { roleGuard } from './guard/role.guard';
import { AppointmentsDoctorComponent } from './component/page-doctors/appointments-doctor/appointments-doctor.component';
import { CreateAppointmentComponent } from './component/page-doctors/create-appointment/create-appointment.component';
import { AllAppointmentsComponent } from './component/page-doctors/all-appointments/all-appointments.component';
import { AvailableAppointmentsComponent } from './component/page-doctors/available-appointments/available-appointments.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ServicesComponent } from './component/services/services.component';
import { PatientsDoctorComponent } from './component/page-doctors/patients-doctor/patients-doctor.component';
import { HomeDoctorComponent } from './component/page-doctors/home-doctor/home-doctor.component';
import { HomeAdminComponent } from './component/page-admin/home-admin/home-admin.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'doctorSignup', component: DoctorSignupComponent },
  { path: 'patientSignup', component: PatientSignupComponent },
  { path: 'patient', component: PatientsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent },


  // مسار عام متاح فقط للمستخدمين الذين سجلوا دخولهم
  { path: 'Patients', component: PatientsComponent,canActivate:[AuthGuard] },
  { path: 'search-doctors', component: SearchDoctorsComponent,canActivate:[AuthGuard] },


  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: { role: 'admin' },
    children: [

      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      
      { path: 'header', component: HeaderComponent},
      { path: 'homeAdmin', component:HomeAdminComponent },
      { path: 'Patients', component: PatientsComponent },

      // { path: 'search-doctors', component: SearchDoctorsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'notification', component: NotificationsComponent },
      // { path: 'appointments', component: AppointmentsComponent },

    ]
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [roleGuard],
    data: { role: 'doctor' },
    children: [
      { path: '', redirectTo: 'doctor', pathMatch: 'full' },  // المسار الافتراضي
      { path: 'header', component: HeaderComponent},
      { path: 'home-doctor', component: HomeDoctorComponent},
      { path: 'Patients-doctor', component: PatientsDoctorComponent },
      { path: 'appointmentsDoctor', component: AppointmentsDoctorComponent},
      { path: 'create-appointment', component: CreateAppointmentComponent },
      { path: 'all-appointments', component: AllAppointmentsComponent },
      { path: 'available-appointments', component: AvailableAppointmentsComponent },
      // { path: 'search-doctors', component: SearchDoctorsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'notification', component: NotificationsComponent },
      // { path: 'appointments', component: AppointmentsComponent },

    ]
  },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
