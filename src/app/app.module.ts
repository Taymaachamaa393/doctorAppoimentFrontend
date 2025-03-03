import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // استيراد ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


        //InterCeptor
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PatientsComponent } from './component/dashbord/patients/patients.component';
import { ReportsComponent } from './component/reports/reports/reports.component';
import { SearchDoctorsComponent } from './component/search-doctors/search-doctors.component';
import { AdminComponent } from './component/dashbord/admin/admin.component';
import { DoctorComponent } from './component/dashbord/doctor/doctor.component';
import { LoginComponent } from './component/auth/login/login.component';
import { DoctorSignupComponent } from './component/auth/doctor-signup/doctor-signup.component';
import { PatientSignupComponent } from './component/auth/patient-signup/patient-signup.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { SidebarComponent } from './component/shared/sidebar/sidebar.component';
import { AppointmentsDoctorComponent } from './component/page-doctors/appointments-doctor/appointments-doctor.component';
import { PatientsDoctorComponent } from './component/page-doctors/patients-doctor/patients-doctor.component';
import { CreateAppointmentComponent } from './component/page-doctors/create-appointment/create-appointment.component';
import { AllAppointmentsComponent } from './component/page-doctors/all-appointments/all-appointments.component';
import { AvailableAppointmentsComponent } from './component/page-doctors/available-appointments/available-appointments.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { HomeDoctorComponent } from './component/page-doctors/home-doctor/home-doctor.component';
import { HomeAdminComponent } from './component/page-admin/home-admin/home-admin.component';
import { ServicesComponent } from './component/services/services.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    NotificationsComponent,
    PatientsComponent,
    ReportsComponent,
    SearchDoctorsComponent,
    AdminComponent,
    DoctorComponent,
    LoginComponent,
    DoctorSignupComponent,
    PatientSignupComponent,
    HeaderComponent,
    SidebarComponent,
    AppointmentsDoctorComponent,
    PatientsDoctorComponent,
    CreateAppointmentComponent,
    AllAppointmentsComponent,
    AvailableAppointmentsComponent,
    AboutUsComponent,
    HomeDoctorComponent,
    HomeAdminComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    RouterModule,
    
       

  ],

  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()), // دمج withInterceptors و withFetch معًا
],

  bootstrap: [AppComponent]
})

export class AppModule { }





