export interface Rating {
  id?: number;  // اختياري عند إرسال تقييم جديد
  doctor_id: number;
  patient_id?: number; // يمكن أن يكون اختياريًا عند الإرسال
  rating: number;
  review: string;
  created_at?: string;
  updated_at?: string;
}


