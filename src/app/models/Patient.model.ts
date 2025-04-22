export interface AppointmentRequest {
    patient_name: string;
    patient_health_status: string;
    // appointment_type: string;
}
// export interface Appointment {
//     patient_name: string; // اسم المريض
//     patient_health_status: string; // الحالة الصحية للمريض
//   }
  
  
export interface AppointmentResponse {
    message: string;
    appointment: {
    id: number;
    doctor_id: number;
    patient_id: number;
    patient_name: string;
    patient_health_status: string;
    appointment_date: string;
    appointment_time: string;
    is_available: boolean;
    };
}
  