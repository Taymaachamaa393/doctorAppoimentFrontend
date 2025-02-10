import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  newAppointment: Appointment = { date: '', patient: '', id: 0 };

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentsService.getAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
      },
      (error: any) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  addAppointment(): void {
    if (this.newAppointment.date && this.newAppointment.patient) {
      this.appointmentsService.addAppointment(this.newAppointment).subscribe(
        (data: Appointment) => {
          this.appointments.push(data);
          this.newAppointment = { date: '', patient: '', id: 0 };
        },
        (error: any) => {
          console.error('Error adding appointment:', error);
        }
      );
    }
  }

  deleteAppointment(id: number): void {
    this.appointmentsService.deleteAppointment(id).subscribe(
      () => {
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
      },
      (error: any) => {
        console.error('Error deleting appointment:', error);
      }
    );
  }
}
